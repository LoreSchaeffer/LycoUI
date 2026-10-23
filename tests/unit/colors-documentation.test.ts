import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';

const colorsDocumentation = resolve(process.cwd(), 'packages/docs/src/pages/getting-started/Colors.tsx');

describe('neutral palette documentation', () => {
    it('supports hexadecimal copy mode and displays the hexadecimal value on hover', async () => {
        const source = await readFile(colorsDocumentation, 'utf8');

        expect(source).toContain('copyHexValues');
        expect(source).toContain('Copy HEX values');
        expect(source).toContain('hexValue');
        expect(source).toContain('onMouseEnter={handleMouseEnter}');
        expect(source).toContain('navigator.clipboard.writeText(copyValue)');
    });

    it('shows semantic HEX values with independent copy targets', async () => {
        const source = await readFile(colorsDocumentation, 'utf8');

        expect(source).toContain('semanticHex');
        expect(source).toContain('onClick={handleCopyVar}');
        expect(source).toContain('onClick={handleCopyHex}');
        expect(source).toContain('getComputedStyle(colorRef.current).backgroundColor');
    });

    it('uses distinct typography and affordances for semantic values', async () => {
        const source = await readFile(colorsDocumentation, 'utf8');

        expect(source).toContain('docs-colors__semantic-value');
        expect(source).toContain('fontFamily: \'var(--font-mono)\'');
        expect(source).toContain('aria-label={`Copy var(${color.var})`}');
        expect(source).toContain('aria-label={`Copy HEX value ${semanticHex}`}');
    });

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
