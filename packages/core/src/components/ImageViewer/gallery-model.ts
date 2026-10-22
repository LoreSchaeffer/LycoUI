export function clampGalleryIndex(index: number, length: number): number {
    return length <= 0 ? 0 : Math.max(0, Math.min(index, length - 1));
}

export function nextGalleryIndex(index: number, length: number, direction: 1 | -1, loop = true): number {
    if (length <= 1) return 0;
    const next = index + direction;
    return loop ? (next + length) % length : clampGalleryIndex(next, length);
}
