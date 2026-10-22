import type {LanguageRegistration, ShikiTransformer, ThemeRegistrationRaw} from 'shiki';
import {customLanguages} from '../../utils/shiki.config';

const lycoDarkTheme: ThemeRegistrationRaw = {
    name: 'lyco-dark',
    type: 'dark',
    colors: {'editor.background': 'transparent', 'editor.foreground': 'var(--color-text-primary)'},
    settings: [],
};

let highlighterPromise: Promise<import('shiki/core').HighlighterCore> | null = null;
const loadingLanguages = new Map<string, Promise<void>>();

async function getHighlighter() {
    if (!highlighterPromise) {
        highlighterPromise = Promise.all([
            import('shiki/core'),
            import('shiki/engine/oniguruma'),
            import('shiki/wasm'),
        ]).then(async ([{createHighlighterCore}, {createOnigurumaEngine}, wasm]) => createHighlighterCore({
            themes: [lycoDarkTheme],
            langs: customLanguages,
            engine: createOnigurumaEngine(Promise.resolve(wasm.default)),
        }));
    }
    return highlighterPromise;
}

async function loadLanguages(highlighter: import('shiki/core').HighlighterCore, languages: string[]) {
    const {bundledLanguages} = await import('shiki');
    await Promise.all(languages.filter(Boolean).filter(language => !highlighter.getLoadedLanguages().includes(language)).map(async language => {
        if (loadingLanguages.has(language)) return loadingLanguages.get(language);
        const loader = bundledLanguages[language as keyof typeof bundledLanguages];
        if (!loader) return;
        const pending = loader().then(languageModule => highlighter.loadLanguage(languageModule.default));
        loadingLanguages.set(language, pending);
        try { await pending; } finally { loadingLanguages.delete(language); }
    }));
}

async function loadTheme(highlighter: import('shiki/core').HighlighterCore, theme: string) {
    if (theme === 'lyco-dark' || highlighter.getLoadedThemes().includes(theme)) return theme;
    const {bundledThemes} = await import('shiki');
    const loader = bundledThemes[theme as keyof typeof bundledThemes];
    if (!loader) return null;
    const themeModule = await loader();
    await highlighter.loadTheme(themeModule.default);
    return theme;
}

export interface HighlightRequest {
    code: string;
    language: string;
    theme: string;
    languages: string[];
    transformers?: ShikiTransformer[];
}

/** Dynamically loads Shiki only when a Code component requests highlighting. */
export async function highlightCode({code, language, theme, languages, transformers = []}: HighlightRequest): Promise<string | null> {
    try {
        const highlighter = await getHighlighter();
        await loadLanguages(highlighter, [...languages, language]);
        const loadedTheme = await loadTheme(highlighter, theme);
        if (!highlighter.getLoadedLanguages().includes(language) || !loadedTheme) return null;
        return highlighter.codeToHtml(code, {lang: language, theme: loadedTheme, transformers});
    } catch {
        return null;
    }
}

export type {LanguageRegistration};
