import {describe, expect, it} from 'vitest';
import {formatReact} from '../../packages/docs/src/utils/react-formatter';
import {formatHtml} from '../../packages/docs/src/utils/html-formatter';

describe('documentation code formatting', () => {
    it('trims and dedents React snippets', () => {
        const source = `
            export function Example() {
                return <Button>Save</Button>;
            }
        `;

        expect(formatReact(source)).toBe([
            'export function Example() {',
            '    return <Button>Save</Button>;',
            '}',
        ].join('\n'));
    });

    it('trims and dedents generated HTML snippets', () => {
        const source = `
            <section>
                <button>Save</button>
            </section>
        `;

        expect(formatHtml(source)).toBe([
            '<section>',
            '    <button>Save</button>',
            '</section>',
        ].join('\n'));
    });

    it('preserves intentionally spaced HTML comments and blank lines', () => {
        const source = `
            <!-- Keep this comment aligned -->

            <section>
                <button>Save</button>
            </section>
        `;

        expect(formatHtml(source)).toBe([
            '<!-- Keep this comment aligned -->',
            '',
            '<section>',
            '    <button>Save</button>',
            '</section>',
        ].join('\n'));
    });

    it('removes metadata exports without orphaning blank lines', () => {
        const source = `
            import {Button} from '@loreschaeffer/lyco-ui';

            export const title = 'Example';
            export const description = 'Description';
            export const order = 1;
            export const vanillaHtml = \`
                <button>Save</button>
            \`;

            export function Example() {
                return <Button>Save</Button>;
            }
        `;

        expect(formatReact(source)).toBe([
            "import {Button} from '@loreschaeffer/lyco-ui';",
            '',
            'export function Example() {',
            '    return <Button>Save</Button>;',
            '}',
        ].join('\n'));
    });
});
