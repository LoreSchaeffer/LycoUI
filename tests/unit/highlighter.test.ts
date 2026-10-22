import {describe, expect, it} from 'vitest';
import {highlightCode} from '../../packages/core/src/components/Code/highlighter';

describe('Code highlighter', () => {
    it('emits token color styles for the default lyco-dark theme', async () => {
        const html = await highlightCode({
            code: 'const answer = 42;',
            language: 'typescript',
            theme: 'lyco-dark',
            languages: ['typescript'],
        });

        expect(html).toContain('#569CD6');
    });
});
