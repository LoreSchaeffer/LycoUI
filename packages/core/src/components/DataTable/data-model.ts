export type DataTableSortDirection = 'asc' | 'desc';

export interface DataTableModelColumn<T> {
    id: string;
    sortable?: boolean;
    searchable?: boolean;
    compare?: (a: T, b: T) => number;
    searchValue?: (row: T) => string;
}

export interface DeriveRowsOptions {
    query?: string;
    sortColumn?: string;
    sortDirection?: DataTableSortDirection;
    page?: number;
    pageSize?: number;
}

export interface DerivedRows<T> {
    rows: T[];
    total: number;
    page: number;
    totalPages: number;
    from: number;
    to: number;
}

export function normalizeDataTableText(value: unknown): string {
    return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function valueFor<T>(row: T, id: string): unknown {
    return (row as Record<string, unknown>)[id];
}

/** A stable, framework-free filter/sort/page pipeline. */
export function deriveRows<T>(rows: readonly T[], columns: readonly DataTableModelColumn<T>[], options: DeriveRowsOptions = {}): DerivedRows<T> {
    const query = normalizeDataTableText(options.query);
    const filtered = query
        ? rows.filter((row) => columns.some((column) => column.searchable !== false && normalizeDataTableText(column.searchValue?.(row) ?? valueFor(row, column.id)).includes(query)))
        : [...rows];
    const column = columns.find((candidate) => candidate.id === options.sortColumn && candidate.sortable !== false);
    const direction = options.sortDirection === 'desc' ? -1 : 1;
    const sorted = column
        ? filtered.map((row, index) => ({row, index})).sort((left, right) => {
            const compared = column.compare ? column.compare(left.row, right.row) : compareValues(valueFor(left.row, column.id), valueFor(right.row, column.id));
            return compared === 0 ? left.index - right.index : compared * direction;
        }).map(({row}) => row)
        : filtered;
    const pageSize = Math.max(1, options.pageSize ?? Math.max(sorted.length, 1));
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const page = Math.min(Math.max(1, options.page ?? 1), totalPages);
    const from = sorted.length === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, sorted.length);
    return {rows: sorted.slice(from === 0 ? 0 : from - 1, to), total: sorted.length, page, totalPages, from, to};
}

function compareValues(left: unknown, right: unknown): number {
    if (left == null && right == null) return 0;
    if (left == null) return 1;
    if (right == null) return -1;
    if (typeof left === 'number' && typeof right === 'number') return left - right;
    return String(left).localeCompare(String(right));
}
