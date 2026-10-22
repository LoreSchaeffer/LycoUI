export function canLoop(count: number, infinite: boolean): boolean {
    return infinite && count > 1;
}

export function toDomIndex(index: number, count: number, infinite: boolean): number {
    return canLoop(count, infinite) ? index + 1 : index;
}

export function toLogicalIndex(domIndex: number, count: number, infinite: boolean): number {
    if (!canLoop(count, infinite)) return Math.max(0, Math.min(domIndex, count - 1));
    if (domIndex === 0) return count - 1;
    if (domIndex === count + 1) return 0;
    return domIndex - 1;
}

export function nextIndex(index: number, count: number, direction: 1 | -1, infinite: boolean): number {
    if (count <= 1) return 0;
    const next = index + direction;
    if (canLoop(count, infinite)) return (next + count) % count;
    return Math.max(0, Math.min(next, count - 1));
}
