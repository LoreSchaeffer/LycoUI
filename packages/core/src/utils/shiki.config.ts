import type {HighlighterCore} from 'shiki/core';
import type {LanguageRegistration, ShikiTransformer, ThemeRegistrationRaw} from 'shiki';
import {createOnigurumaEngine} from 'shiki/engine/oniguruma';
import {bundledLanguages} from 'shiki';

const lycoDarkTheme: ThemeRegistrationRaw = {
    name: 'lyco-dark',
    type: 'dark',
    colors: {
        'editor.background': 'transparent',
        'editor.foreground': 'var(--color-text-primary)',
    },
    settings: [
        {
            scope: ['comment', 'punctuation.definition.comment'],
            settings: {fontStyle: 'italic', foreground: 'var(--color-text-muted)'}
        },
        {
            scope: ['string', 'punctuation.definition.string'],
            settings: {foreground: 'var(--color-success)'}
        },
        {
            scope: ['keyword', 'storage', 'storage.type', 'modifier', 'keyword.control'],
            settings: {foreground: 'var(--color-primary)'}
        },
        {
            scope: ['entity.name.function', 'support.function', 'meta.function-call.generic'],
            settings: {foreground: 'var(--color-info)'}
        },
        {
            scope: ['variable', 'variable.parameter', 'entity.name.variable', 'variable.other.object.property'],
            settings: {foreground: 'var(--color-text-secondary)'}
        },
        {
            scope: ['constant', 'support.constant', 'variable.other.constant', 'constant.numeric', 'constant.language'],
            settings: {foreground: 'var(--color-warning)'}
        },
        {
            scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
            settings: {foreground: 'var(--color-warning)'}
        },
        {
            scope: ['entity.other.attribute-name', 'meta.attribute'],
            settings: {foreground: 'var(--color-info)'}
        },
        {
            scope: ['entity.name.tag', 'punctuation.definition.tag'],
            settings: {foreground: 'var(--color-primary)'}
        },
        {
            scope: ['punctuation', 'meta.brace'],
            settings: {foreground: 'var(--color-text-secondary)'}
        }
    ]
};

let highlighterPromise: Promise<HighlighterCore> | null = null;
const loadingLangs = new Map<string, Promise<void>>();

export const customLanguages: LanguageRegistration[] = [];
export const customTransformers: ShikiTransformer[] = [];

export const registerShikiLanguage = (lang: LanguageRegistration) => customLanguages.push(lang);
export const registerShikiTransformer = (transformer: ShikiTransformer) => customTransformers.push(transformer);

export const getShikiHighlighter = async (langs: string[]): Promise<HighlighterCore> => {
    if (!highlighterPromise) {
        highlighterPromise = import('shiki/core').then(async ({createHighlighterCore}) => {
            return await createHighlighterCore({
                themes: [lycoDarkTheme],
                langs: customLanguages,
                engine: createOnigurumaEngine(import('shiki/wasm')),
            });
        });
    }

    const highlighter = await highlighterPromise;

    const loadedLangs = highlighter.getLoadedLanguages();
    const missingLangs = langs.filter(lang => !loadedLangs.includes(lang));

    if (missingLangs.length > 0) {
        await Promise.all(
            missingLangs.map(async (lang) => {
                if (loadingLangs.has(lang)) {
                    await loadingLangs.get(lang);
                    return;
                }

                const loadPromise = (async () => {
                    const loadFn = bundledLanguages[lang as keyof typeof bundledLanguages];
                    if (!loadFn) {
                        // Language not supported
                        return;
                    }
                    const langModule = await loadFn();
                    await highlighter.loadLanguage(langModule.default);
                })();

                loadingLangs.set(lang, loadPromise);
                try {
                    await loadPromise;
                } catch {
                    loadingLangs.delete(lang);
                }
            })
        );
    }

    return highlighter;
};