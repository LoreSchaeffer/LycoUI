import {compile} from 'sass';
import {describe, expect, it} from 'vitest';

const css = compile('packages/core/src/styles/global.scss', {style: 'expanded'}).css;

const declarationBlock = (selector: string) => {
    const match = css.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\n\\}`, 'm'));
    expect(match, `Expected ${selector} to be emitted`).not.toBeNull();
    return match![1];
};

describe('neutral theme token contract', () => {
    it('uses the preserved slate dark values by default', () => {
        const root = declarationBlock(':root');

        expect(root).toContain('--neutral-950: #0f1011;');
        expect(root).toContain('--neutral-900: #161718;');
        expect(root).toContain('--neutral-800: #23252a;');
    });

    it.each(['gray', 'zinc'])('remaps every neutral step when data-theme is %s', (theme) => {
        const block = declarationBlock(`html\\[data-theme=${theme}\\]`);

        for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) {
            expect(block).toMatch(new RegExp(`--neutral-${step}: #[0-9a-f]{6};`));
        }
    });
});
