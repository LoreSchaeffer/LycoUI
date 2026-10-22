import type {HTMLAttributes, ReactNode} from 'react';
import type {FullVariant} from '../../types/types.ts';

export type SortDirection = 'asc' | 'desc';

export interface DataTableColumn<T> {
    /** Unique column identifier. Used to access `row[id]` by default. */
    id: string;
    /** Display text for the column header. */
    header: string;
    /** Enable sorting on this column. Defaults to `true`. */
    sortable?: boolean;
    /** Include this column in search filtering. Defaults to `true`. */
    searchable?: boolean;
    /** Custom cell renderer. Receives the full row object. */
    render?: (row: T, rowIndex: number) => ReactNode;
    /** Custom sort comparator. Return negative, zero, or positive. */
    compare?: (a: T, b: T) => number;
    /** Custom search value extractor. Override the default `row[id]` lookup. */
    searchValue?: (row: T) => string;
    /** Minimum width for the column. Applied as CSS `min-width`. */
    minWidth?: string;
}

export interface DataTableProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Column definitions. */
    columns: DataTableColumn<T>[];
    /** Array of row data objects. */
    data: T[];

    /** Show the search input. Defaults to `true`. */
    searchable?: boolean;
    /** Placeholder text for the search input. */
    searchPlaceholder?: string;
    /** Initial search query. */
    defaultSearchQuery?: string;
    /**
     * Fires whenever the search query changes.
     * Use this to persist the search query externally (e.g. URL params, localStorage).
     */
    onSearchChange?: (query: string) => void;

    /** Column `id` to sort by initially. */
    defaultSortColumn?: string;
    /** Initial sort direction. Defaults to `'asc'`. */
    defaultSortDirection?: SortDirection;
    /**
     * Fires whenever the sort state changes.
     * Receives the column `id` and direction.
     * Use this to persist sort state externally.
     */
    onSortChange?: (columnId: string, direction: SortDirection) => void;

    /** Available page size options. Defaults to `[10, 25, 50, 100]`. */
    pageSizeOptions?: number[];
    /** Initial page size. Defaults to `25`. */
    defaultPageSize?: number;
    /**
     * Fires whenever the current page changes.
     * Receives the new page number (1-indexed) and the current page size.
     */
    onPageChange?: (page: number, pageSize: number) => void;
    /**
     * Fires whenever the page size changes.
     * Receives the new page size.
     * Use this to persist page size externally (e.g. localStorage).
     */
    onPageSizeChange?: (pageSize: number) => void;
    /** Where to position the pagination controls. Defaults to `'top'`. */
    paginationPosition?: 'top' | 'bottom';
    /**
     * How to display the results info text.
     * `'full'`: "Showing 1 to 10 of 15 results"
     * `'compact'`: "1-10 of 15"
     * `'none'`: Hides the info text.
     * Defaults to `'full'`.
     */
    paginationInfo?: 'full' | 'compact' | 'none';

    /**
     * Override default English text for i18n support.
     */
    localization?: {
        rowsPerPage?: string;
        showingResults?: (from: number, to: number, total: number) => string;
    };

    /** Shows a loading spinner instead of rows. */
    loading?: boolean;
    /** Message shown when `data` is empty and not loading. */
    emptyMessage?: string;

    /** Key extractor for rows. Falls back to `row.id` or the row index. */
    rowKey?: (row: T, index: number) => string | number;
    /** Returns additional CSS class(es) for a row. */
    rowClassName?: (row: T) => string | undefined;
    /** Fires when a row is clicked. */
    onRowClick?: (event: React.MouseEvent, row: T, index: number) => void;
    /** Fires when a row is right-clicked. */
    onRowContextMenu?: (event: React.MouseEvent, row: T, index: number) => void;

    /** Enable row selection checkboxes. */
    selectable?: boolean;
    /** Controlled array of selected row keys. */
    selectedRowKeys?: (string | number)[];
    /** Uncontrolled initial array of selected row keys. */
    defaultSelectedRowKeys?: (string | number)[];
    /** Fires when the selection changes. */
    onSelectionChange?: (keys: (string | number)[]) => void;

    /**
     * Fires when a row is dragged and dropped to a new position.
     * Providing this prop enables drag-and-drop reordering on the table.
     * Receives the source index and destination index (based on the full data array).
     *
     * **Important:** When using `onRowReorder`, pagination and sorting are disabled
     * because reordering operates on the original data array indices.
     */
    onRowReorder?: (sourceIndex: number, destinationIndex: number) => void;

    /** Color variant for the table. */
    variant?: FullVariant;
    /** Adds zebra-striping to rows. Defaults to `false`. */
    striped?: boolean;
    /** Enables hover effect on rows. Defaults to `true`. */
    hover?: boolean;
    /** Adds borders to all cells. Defaults to `false`. */
    bordered?: boolean;
    /** Removes all borders from the table (except the outer wrapper). Defaults to `false`. */
    borderless?: boolean;
    /** Uses compact table size. */
    size?: 'sm' | 'md';
    /** Makes the toolbar sticky at the top when scrolling. */
    stickyToolbar?: boolean;
}

/** Imperative handle for programmatic control. */
export interface DataTableRef {
    /** Programmatically set the search query. */
    setSearch: (query: string) => void;
    /** Programmatically navigate to a page (1-indexed). */
    setPage: (page: number) => void;
}

export type {VanillaDataTableColumn} from './DataTableRenderer';
export type {VanillaDataTableOptions} from './DataTable.vanilla';


