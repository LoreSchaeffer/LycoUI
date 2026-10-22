/**
 * Removes surrounding blank lines and the common indentation introduced by
 * template literals from a code snippet.
 */
export const dedent = (code: string): string => {
    const lines = code.replace(/\r\n/g, '\n').split('\n');
    while (lines.length > 0 && lines[0].trim() === '') lines.shift();
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
    if (lines.length === 0) return '';

    const indentation = lines
        .filter((line) => line.trim().length > 0)
        .reduce<number | undefined>((minimum, line) => {
            const leadingWhitespace = line.match(/^[ \t]*/)?.[0].length ?? 0;
            return minimum === undefined ? leadingWhitespace : Math.min(minimum, leadingWhitespace);
        }, undefined);

    if (!indentation) return lines.join('\n');
    return lines.map((line) => line.slice(indentation)).join('\n');
};
