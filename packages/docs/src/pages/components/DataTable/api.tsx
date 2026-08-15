import type { PropDefinition } from '../../../components/api-reference/ApiReference.tsx';

export const dataTableProps: PropDefinition[] = [
    {
        name: 'columns',
        type: 'DataTableColumn<T>[]',
        description: 'Array of column definitions. Each column specifies its id, header text, and optional rendering/sorting/search behavior.',
    },
    {
        name: 'data',
        type: 'T[]',
        description: 'Array of row data objects. Each object\'s keys should match the column id values.',
    },
    {
        name: 'searchable',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Shows the search input in the toolbar. Set to false to hide it.',
    },
    {
        name: 'searchPlaceholder',
        type: 'string',
        defaultValue: "'Search...'",
        description: 'Placeholder text for the search input.',
    },
    {
        name: 'defaultSearchQuery',
        type: 'string',
        defaultValue: "''",
        description: 'Initial search query value.',
    },
    {
        name: 'onSearchChange',
        type: '(query: string) => void',
        description: 'Fires whenever the search query changes. Use this callback to persist the search query externally (e.g. to localStorage, URL params, or state management).',
    },
    {
        name: 'defaultSortColumn',
        type: 'string',
        description: 'Column id to sort by initially. Defaults to the first sortable column.',
    },
    {
        name: 'defaultSortDirection',
        type: "'asc' | 'desc'",
        defaultValue: "'asc'",
        description: 'Initial sort direction.',
    },
    {
        name: 'onSortChange',
        type: '(columnId: string, direction: SortDirection) => void',
        description: 'Fires whenever the sort column or direction changes. Use this callback to persist sort state externally.',
    },
    {
        name: 'pageSizeOptions',
        type: 'number[]',
        defaultValue: '[10, 25, 50, 100]',
        description: 'Array of page size options shown in the rows-per-page dropdown.',
    },
    {
        name: 'defaultPageSize',
        type: 'number',
        defaultValue: '25',
        description: 'Initial number of rows per page.',
    },
    {
        name: 'onPageChange',
        type: '(page: number, pageSize: number) => void',
        description: 'Fires whenever the current page changes. Receives the 1-indexed page number and the current page size.',
    },
    {
        name: 'onPageSizeChange',
        type: '(pageSize: number) => void',
        description: 'Fires whenever the page size changes. Use this callback to persist the page size externally (e.g. to localStorage).',
    },
    {
        name: 'loading',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Shows a centered loading Spinner instead of rows.',
    },
    {
        name: 'emptyMessage',
        type: 'string',
        defaultValue: "'No data available'",
        description: 'Message displayed when data is empty and not loading.',
    },
    {
        name: 'rowKey',
        type: '(row: T, index: number) => string | number',
        description: 'Custom key extractor for rows. Falls back to row.id if present, or the row index.',
    },
    {
        name: 'rowClassName',
        type: '(row: T) => string | undefined',
        description: 'Returns additional CSS class(es) to apply to a row.',
    },
    {
        name: 'onRowClick',
        type: '(event: MouseEvent, row: T, index: number) => void',
        description: 'Fires when a row is clicked. Adds a pointer cursor to rows.',
    },
    {
        name: 'onRowContextMenu',
        type: '(event: MouseEvent, row: T, index: number) => void',
        description: 'Fires when a row is right-clicked.',
    },
    {
        name: 'onRowReorder',
        type: '(sourceIndex: number, destIndex: number) => void',
        description: 'Enables drag-and-drop row reordering. When provided, pagination and sorting are disabled. Receives the drag source and destination indices.',
    },
    {
        name: 'variant',
        type: 'FullVariant',
        typeLink: '/docs/custom-types/full-variant',
        description: 'Applies a contextual color variant to the underlying Table.',
    },
    {
        name: 'striped',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Adds zebra-striping to rows.',
    },
    {
        name: 'hover',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Enables hover effect on rows.',
    },
    {
        name: 'bordered',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Adds borders to all cells.',
    },
    {
        name: 'size',
        type: "'sm' | 'md'",
        defaultValue: "'md'",
        description: 'Table size. Use sm for a more compact layout.',
    },
    {
        name: 'stickyToolbar',
        type: 'boolean',
        defaultValue: 'false',
        description: 'Makes the search/pagination toolbar sticky at the top when scrolling.',
    },
];

export const dataTableColumnProps: PropDefinition[] = [
    {
        name: 'id',
        type: 'string',
        description: 'Unique column identifier. Also used as the default key to access row[id] for display and search.',
    },
    {
        name: 'header',
        type: 'string',
        description: 'Display text for the column header.',
    },
    {
        name: 'sortable',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether the column is sortable by clicking its header.',
    },
    {
        name: 'searchable',
        type: 'boolean',
        defaultValue: 'true',
        description: 'Whether this column is included in text search filtering.',
    },
    {
        name: 'render',
        type: '(row: T, index: number) => ReactNode',
        description: 'Custom cell renderer. Overrides the default display of row[id].',
    },
    {
        name: 'compare',
        type: '(a: T, b: T) => number',
        description: 'Custom sort comparator function. Should return a negative, zero, or positive value.',
    },
    {
        name: 'searchValue',
        type: '(row: T) => string',
        description: 'Custom search value extractor. Overrides the default row[id] lookup for search filtering.',
    },
    {
        name: 'minWidth',
        type: 'string',
        description: 'Minimum CSS width for the column (e.g. "120px", "8rem").',
    },
];

export const dataTableRefProps: PropDefinition[] = [
    {
        name: 'setSearch',
        type: '(query: string) => void',
        description: 'Programmatically set the search query. Also resets the current page to 1.',
    },
    {
        name: 'setPage',
        type: '(page: number) => void',
        description: 'Programmatically navigate to a specific page (1-indexed).',
    },
];

export const apiConfig = [
    { name: 'DataTableProps', data: dataTableProps },
    { name: 'DataTableColumn', data: dataTableColumnProps },
    { name: 'DataTableRef', data: dataTableRefProps },
];
