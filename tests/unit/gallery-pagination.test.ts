import {describe, expect, it} from 'vitest';
import {clampGalleryIndex, nextGalleryIndex} from '../../packages/core/src/components/ImageViewer/gallery-model.ts';
import {clampPage, normalizePageEdit, pageWindow} from '../../packages/core/src/components/Pagination/pagination-model.ts';
describe('gallery and pagination models', () => {
    it('clamps empty and changed gallery indexes', () => {
        expect(clampGalleryIndex(4, 0)).toBe(0);
        expect(clampGalleryIndex(4, 2)).toBe(1);
        expect(nextGalleryIndex(0, 3, -1)).toBe(2);
    });
    it('builds sibling page windows and clamps page edits', () => {
        expect(clampPage(9, 3)).toBe(3);
        expect(pageWindow(10, 5, 1)).toEqual([1, 'ellipsis-start', 4, 5, 6, 'ellipsis-end', 10]);
        expect(normalizePageEdit('99', 3)).toBe(3);
        expect(normalizePageEdit('not-a-page', 3)).toBeNull();
    });
});
