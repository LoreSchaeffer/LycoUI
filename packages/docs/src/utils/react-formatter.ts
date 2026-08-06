export const formatReact = (code: string): string => {
    return code
        .replace(/export\s+const\s+(title|description|order)\s*=\s*[^;]+;\s*/g, '')
        .replace(/export\s+const\s+vanillaHtml\s*=\s*`[\s\S]*?`;\s*/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};