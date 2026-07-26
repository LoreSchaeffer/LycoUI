export const formatHtml = (html: string): string => {
    let indentLevel = 0;
    const tab = '  ';

    return html
        // Normalize spaces between tags
        .replace(/>\s+</g, '><')
        // Convert empty tag pairs into self-closing tags using capture groups
        // Group 1: Tag name ([^\s>]+)
        // Group 2: Attributes ([^>]*)
        .replace(/<([^\s>]+)([^>]*)><\/\1>/g, '<$1$2/>')
        // Force line breaks between adjacent tags
        .replace(/></g, '>\n<')
        .split('\n')
        .map((line) => {
            const isClosing = /^<\//.test(line);
            const isSelfClosing = /\/>$/.test(line) || /^<(input|img|br|hr|meta|link)\b/.test(line);
            const hasClosingTagOnSameLine = /<\/[^>]+>$/.test(line);
            const isOpening = /^<[^/]/.test(line) && !isSelfClosing && !hasClosingTagOnSameLine;

            if (isClosing) indentLevel = Math.max(indentLevel - 1, 0);

            const currentIndent = tab.repeat(indentLevel);

            if (isOpening) indentLevel++;

            return `${currentIndent}${line}`;
        })
        .join('\n');
};