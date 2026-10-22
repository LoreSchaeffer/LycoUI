export type PageToken = number | 'ellipsis-start' | 'ellipsis-end';

export function clampPage(page: number, totalPages: number): number {
    return Math.max(1, Math.min(Math.max(1, totalPages), page || 1));
}

/** Converts a compact-editor value into an in-range page, or preserves a cancelled edit. */
export function normalizePageEdit(value: string, totalPages: number): number | null {
    const page = Number.parseInt(value, 10);
    return Number.isNaN(page) ? null : clampPage(page, totalPages);
}

export function pageWindow(totalPages: number, currentPage: number, siblingCount: number): PageToken[] {
    const total = Math.max(1, totalPages);
    const current = clampPage(currentPage, total);
    if (total <= siblingCount * 2 + 5) return Array.from({length: total}, (_, index) => index + 1);
    const start = Math.max(2, current - siblingCount);
    const end = Math.min(total - 1, current + siblingCount);
    return [1, ...(start > 2 ? ['ellipsis-start' as const] : []), ...Array.from({length: end - start + 1}, (_, index) => start + index), ...(end < total - 1 ? ['ellipsis-end' as const] : []), total];
}
