import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';

const colorsDocumentation = resolve(process.cwd(), 'packages/docs/src/pages/getting-started/Colors.tsx');

describe('neutral palette documentation', () => {
    it('keeps palette labels concise and reserves space for them', async () => {
        const source = await readFile(colorsDocumentation, 'utf8');

        expect(source).toContain("{name: 'Slate'");
        expect(source).toContain("{name: 'Gray'");
        expect(source).toContain("{name: 'Zinc'");
        expect(source).not.toMatch(/\((?:Cool|Neutral|Warm)\)/);
        expect(source).toContain("minWidth: '80px'");
        expect(source).toContain("flexShrink: 0");
    });

    it('contains the 19-swatch grid within a horizontally scrollable strip', async () => {
        const source = await readFile(colorsDocumentation, 'utf8');

        expect(source).toContain("gridTemplateColumns: 'repeat(19, minmax(48px, 1fr))'");
        expect(source).toContain("overflowX: 'auto'");
        expect(source).toContain("minWidth: 0");
    });
});
