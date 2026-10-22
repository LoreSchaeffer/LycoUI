import {dedent} from './code-formatter';

export const formatReact = (code: string): string => {
    return dedent(code)
        .replace(/^[ \t]*export\s+const\s+(title|description|order)\s*=\s*[^;]+;[ \t]*\r?\n?/gm, '')
        .replace(/^[ \t]*export\s+const\s+vanillaHtml\s*=\s*`[\s\S]*?`[ \t]*;[ \t]*\r?\n?/gm, '')
        .replace(/(?:\n[ \t]*){3,}/g, '\n\n')
        .trim();
};
