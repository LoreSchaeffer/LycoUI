import {describe, expect, it} from 'vitest';
import {highlightCode} from '../../packages/core/src/components/Code/highlighter.ts';

describe('highlightCode', () => {
    it('falls back to plain text for unsupported language or theme values', async () => {
        await expect(highlightCode({
            code: 'const answer = 42;',
            language: 'not-a-language',
            theme: 'not-a-theme',
            languages: [],
        })).resolves.toBeNull();
    });
});
