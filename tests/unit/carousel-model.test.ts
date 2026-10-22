import {describe, expect, it} from 'vitest';
import {nextIndex, toDomIndex, toLogicalIndex} from '../../packages/core/src/components/Carousel/carousel-model.ts';
describe('carousel model', () => {
    it('maps cloned edges and wraps logical indexes', () => {
        expect(toDomIndex(0, 3, true)).toBe(1);
        expect(toLogicalIndex(0, 3, true)).toBe(2);
        expect(toLogicalIndex(4, 3, true)).toBe(0);
        expect(nextIndex(2, 3, 1, true)).toBe(0);
    });
    it('clamps non-infinite indexes and handles empty carousels', () => {
        expect(nextIndex(0, 0, 1, false)).toBe(0);
        expect(nextIndex(0, 2, -1, false)).toBe(0);
        expect(nextIndex(1, 2, 1, false)).toBe(1);
    });
});
