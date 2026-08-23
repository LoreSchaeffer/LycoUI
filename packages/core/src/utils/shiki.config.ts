export const lycoDarkTheme = {
  name: 'lyco-dark',
  type: 'dark',
  colors: {
    // We rely on CSS for the actual background, but Shiki needs these defined
    'editor.background': 'transparent', 
    'editor.foreground': 'var(--color-text-primary)',
  },
  settings: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { fontStyle: 'italic', foreground: 'var(--color-text-muted)' }
    },
    {
      scope: ['string', 'punctuation.definition.string'],
      settings: { foreground: 'var(--color-success)' }
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'modifier', 'keyword.control'],
      settings: { foreground: 'var(--color-primary)' }
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call.generic'],
      settings: { foreground: 'var(--color-info)' }
    },
    {
      scope: ['variable', 'variable.parameter', 'entity.name.variable', 'variable.other.object.property'],
      settings: { foreground: 'var(--color-text-secondary)' }
    },
    {
      scope: ['constant', 'support.constant', 'variable.other.constant', 'constant.numeric', 'constant.language'],
      settings: { foreground: 'var(--color-warning)' }
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
      settings: { foreground: 'var(--color-warning)' }
    },
    {
      scope: ['entity.other.attribute-name', 'meta.attribute'],
      settings: { foreground: 'var(--color-info)' }
    },
    {
      scope: ['entity.name.tag', 'punctuation.definition.tag'],
      settings: { foreground: 'var(--color-primary)' }
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: { foreground: 'var(--color-text-secondary)' }
    }
  ]
};

let highlighterPromise: Promise<any> | null = null;

export const getShikiHighlighter = async (langs: string[]): Promise<any> => {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(async ({ createHighlighter }) => {
      const highlighter = await createHighlighter({
        themes: [lycoDarkTheme],
        langs,
      });
      return highlighter;
    });
  }
  
  const highlighter = await highlighterPromise;
  
  // Ensure requested languages are loaded
  const loadedLangs = highlighter.getLoadedLanguages();
  const missingLangs = langs.filter(lang => !loadedLangs.includes(lang));
  
  if (missingLangs.length > 0) {
    try {
      await highlighter.loadLanguage(...missingLangs);
    } catch (e) {
      console.warn('Failed to load some shiki languages:', missingLangs, e);
    }
  }
  
  return highlighter;
};
