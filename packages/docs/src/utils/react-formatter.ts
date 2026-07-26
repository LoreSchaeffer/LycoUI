export const formatReact = (code: string): string => {
    return code
        .replace(/export\s+const\s+(title|description|order)\s*=\s*[^;]+;\r?\n?/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
};