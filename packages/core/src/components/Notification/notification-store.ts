export interface TimedNotification {
    id: string;
}

export function appendWithMaximum<T extends TimedNotification>(items: readonly T[], next: T, maximum: number): {items: T[]; evicted: T[]} {
    const combined = [...items, next];
    const keep = Math.max(1, maximum);
    const evicted = combined.slice(0, Math.max(0, combined.length - keep));
    return {items: combined.slice(-keep), evicted};
}
