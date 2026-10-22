import {describe, expect, test} from 'vitest';
import {getVariantColor} from '../../packages/core/src/utils/theme';

describe('getVariantColor', () => {
    test('resolves the white variant to the defined white token', () => {
        expect(getVariantColor('white')).toBe('var(--white, #ffffff)');
    });

    test('preserves the semantic color fallback for colored variants', () => {
        expect(getVariantColor('success')).toBe('var(--success-500, var(--color-success))');
    });
});
