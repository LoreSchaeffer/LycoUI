import {compile} from 'sass';
import {describe, expect, it} from 'vitest';

const css = compile('packages/core/src/styles/global.scss', {style: 'expanded'}).css;
const neutralSteps = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950];

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

        for (const step of neutralSteps) {
            expect(root).toMatch(new RegExp(`--neutral-${step}: #[0-9a-f]{6};`));
        }
    });

    it.each(['gray', 'zinc'])('remaps every neutral step when data-theme is %s', (theme) => {
        const block = declarationBlock(`html\\[data-theme=${theme}\\]`);

        for (const step of neutralSteps) {
            expect(block).toMatch(new RegExp(`--neutral-${step}: #[0-9a-f]{6};`));
        }
    });
});
