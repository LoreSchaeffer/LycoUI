import './DataTable.scss';
import {type DragEvent, forwardRef, type HTMLAttributes, type ReactElement, type ReactNode, type Ref, useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types.ts';
import {Table, TableBody, TableCell, TableHead, TableRow} from '../Table';
import {Input} from '../Input';
import {Select, type SelectOption} from '../Select';
import {Pagination} from '../Pagination';
import {Spinner} from '../Spinner';
import {Checkbox} from '../Checkbox';
import {deriveRows} from './data-model.ts';
import {useRowSelection} from './useRowSelection.ts';


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


const SortAscIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15"/>
    </svg>
);

const SortDescIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

const SortNeutralIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
         style={{opacity: 0.35}}>
        <polyline points="8 6 12 2 16 6"/>
        <polyline points="8 18 12 22 16 18"/>
    </svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

const ClearIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

const DragHandleIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16">
        <circle cx="9" cy="6" r="1.5"/>
        <circle cx="15" cy="6" r="1.5"/>
        <circle cx="9" cy="12" r="1.5"/>
        <circle cx="15" cy="12" r="1.5"/>
        <circle cx="9" cy="18" r="1.5"/>
        <circle cx="15" cy="18" r="1.5"/>
    </svg>
);


function getRowValue<T>(row: T, colId: string): unknown {
    return (row as Record<string, unknown>)[colId];
}

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];


function DataTableInner<T>(
    {
        columns,
        data = [],

        searchable = true,
        searchPlaceholder = 'Search...',
        defaultSearchQuery = '',
        onSearchChange,

        defaultSortColumn,
        defaultSortDirection = 'asc',
        onSortChange,

        pageSizeOptions = DEFAULT_PAGE_SIZES,
        defaultPageSize = 25,
        onPageChange,
        onPageSizeChange,
        paginationPosition = 'top',
        paginationInfo = 'full',

        localization,

        loading = false,
        emptyMessage = 'No data available',

        rowKey,
        rowClassName,
        onRowClick,
        onRowContextMenu,

        selectable = false,
        selectedRowKeys,
        defaultSelectedRowKeys = [],
        onSelectionChange,

        onRowReorder,

        variant,
        striped = false,
        hover = true,
        bordered = false,
        borderless = false,
        size,
        stickyToolbar = false,

        className,
        ...props
    }: DataTableProps<T>,
    ref: Ref<DataTableRef>
) {
    const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
    const [sortColumn, setSortColumn] = useState<string | undefined>(
        defaultSortColumn ?? columns.find(c => c.sortable !== false)?.id
    );
    const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSortDirection);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [currentPage, setCurrentPage] = useState(1);

    const {keys: activeSelectedKeys, toggle: toggleSelection, toggleAll: toggleAllSelection} = useRowSelection(selectedRowKeys, defaultSelectedRowKeys, onSelectionChange);

    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const toolbarRef = useRef<HTMLDivElement>(null);
    const isDragEnabled = Boolean(onRowReorder);

    useImperativeHandle(ref, () => ({
        setSearch: (query: string) => {
            setSearchQuery(query);
            setCurrentPage(1);
            onSearchChange?.(query);
        },
        setPage: (page: number) => {
            setCurrentPage(page);
        },
    }));

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
        onSearchChange?.(query);
    }, [onSearchChange]);

    const handleSort = useCallback((columnId: string) => {
        if (isDragEnabled) return;

        setSortColumn(prev => {
            const newDirection = prev === columnId
                ? (sortDirection === 'asc' ? 'desc' : 'asc')
                : 'asc';

            setSortDirection(newDirection);
            onSortChange?.(columnId, newDirection);
            return columnId;
        });
    }, [sortDirection, onSortChange, isDragEnabled]);

    const handlePageSizeChange = useCallback((value: string | number) => {
        const newSize = Number(value);
        setPageSize(newSize);
        setCurrentPage(1);
        onPageSizeChange?.(newSize);
    }, [onPageSizeChange]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        onPageChange?.(page, pageSize);
    }, [pageSize, onPageChange]);

    const derivedRows = useMemo(() => deriveRows(data, columns, {query: searchQuery, sortColumn, sortDirection, page: currentPage, pageSize}), [data, columns, currentPage, pageSize, searchQuery, sortColumn, sortDirection]);
    const sortedData = isDragEnabled ? data : deriveRows(data, columns, {query: searchQuery, sortColumn, sortDirection}).rows;
    const totalPages = isDragEnabled ? 1 : derivedRows.totalPages;
    const activePage = isDragEnabled ? 1 : derivedRows.page;
    const paginatedData = isDragEnabled ? data : derivedRows.rows;

    const getRowKey = useCallback((row: T, idx: number): string | number => {
        if (rowKey) return rowKey(row, idx);
        const r = row as Record<string, unknown>;
        if (r.id !== undefined) return `id_${r.id}`;
        return `idx_${idx}`;
    }, [rowKey]);

    const pageSizeSelectOptions: SelectOption[] = useMemo(() =>
            pageSizeOptions.map(s => ({
                label: String(s),
                value: s,
            })),
        [pageSizeOptions]);

    const handleDragStart = useCallback((e: DragEvent<HTMLTableRowElement>, index: number) => {
        setDragIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(index));
        requestAnimationFrame(() => {
            const target = e.target as HTMLElement;
            target.classList.add('is-dragging');
        });
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLTableRowElement>, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverIndex(index);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragOverIndex(null);
    }, []);

    const handleDrop = useCallback((e: DragEvent<HTMLTableRowElement>, destIndex: number) => {
        e.preventDefault();
        if (dragIndex !== null && dragIndex !== destIndex) {
            onRowReorder?.(dragIndex, destIndex);
        }
        setDragIndex(null);
        setDragOverIndex(null);
    }, [dragIndex, onRowReorder]);

    const handleDragEnd = useCallback(() => {
        setDragIndex(null);
        setDragOverIndex(null);
    }, []);

    const handleSelectAll = useCallback((checked: boolean) => {
        const allKeys = sortedData.map((row, idx) => getRowKey(row, idx));
        toggleAllSelection(allKeys, checked);
    }, [sortedData, getRowKey, toggleAllSelection]);

    const isAllSelected = useMemo(() =>
            sortedData.length > 0 && sortedData.every((row, idx) => activeSelectedKeys.includes(getRowKey(row, idx))),
        [sortedData, activeSelectedKeys, getRowKey]);

    const isSomeSelected = useMemo(() =>
            sortedData.length > 0 && sortedData.some((row, idx) => activeSelectedKeys.includes(getRowKey(row, idx))) && !isAllSelected,
        [sortedData, activeSelectedKeys, getRowKey, isAllSelected]);

    const resultsStart = isDragEnabled ? (sortedData.length ? 1 : 0) : derivedRows.from;
    const resultsEnd = isDragEnabled ? sortedData.length : derivedRows.to;
    const totalResults = sortedData.length;

    const renderPaginationInfo = () => {
        if (totalResults === 0 || paginationInfo === 'none') return null;

        if (paginationInfo === 'compact') {
            return (
                <div className="data-table__results-info">
                    {resultsStart}–{resultsEnd} of {totalResults}
                </div>
            );
        }

        const defaultShowingResults = (from: number, to: number, total: number) => (
            <span>Showing <strong>{from}</strong> to <strong>{to}</strong> of <strong>{total}</strong> results</span>
        );

        return (
            <div className="data-table__results-info">
                {localization?.showingResults
                    ? localization.showingResults(resultsStart, resultsEnd, totalResults)
                    : defaultShowingResults(resultsStart, resultsEnd, totalResults)
                }
            </div>
        );
    };

    const renderPaginationControls = () => {
        return (
            <div className="data-table__controls">
                {/* Page size select */}
                <div className="data-table__page-size">
                    <span className="data-table__page-size-label">
                        {localization?.rowsPerPage || 'Rows per page:'}
                    </span>
                    <Select
                        options={pageSizeSelectOptions}
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        size="sm"
                        variant="default"
                    />
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        variant="compact"
                        currentPage={activePage}
                        totalPages={totalPages}
                        onChange={handlePageChange}
                        size="sm"
                    />
                )}
            </div>
        );
    };

    return (
        <div
            className={clsx(
                'data-table',
                stickyToolbar && 'is-sticky',
                isDragEnabled && 'is-drag-enabled',
                className
            )}
            {...props}
        >
            <div ref={toolbarRef} className="data-table__toolbar">
                {/* Search */}
                {searchable && !isDragEnabled && (
                    <div className="data-table__search">
                        <Input
                            size="sm"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            iconStart={<SearchIcon/>}
                            iconEnd={searchQuery.length > 0 ? <ClearIcon/> : undefined}
                            onIconEndClick={searchQuery.length > 0 ? () => handleSearch('') : undefined}
                        />
                    </div>
                )}

                {/* Right controls (Pagination top) */}
                {!isDragEnabled && paginationPosition === 'top' && (
                    <div className="data-table__toolbar-actions">
                        {renderPaginationInfo()}
                        {renderPaginationControls()}
                    </div>
                )}

                {/* Drag mode toolbar */}
                {isDragEnabled && (
                    <div className="data-table__drag-info">
                        <DragHandleIcon/>
                        <span>Drag rows to reorder</span>
                    </div>
                )}
            </div>

            {/* ========== TABLE ========== */}
            <div className="data-table__container">
                <Table
                    variant={variant}
                    striped={!isDragEnabled && striped}
                    hover={hover}
                    bordered={bordered}
                    borderless={borderless}
                    size={size}
                >
                    <TableHead>
                        <TableRow>
                            {isDragEnabled && (
                                <TableCell isHeader className="data-table__drag-header" aria-label="Drag handle">
                                    {/* Empty visually, used for accessibility label */}
                                </TableCell>
                            )}
                            {selectable && (
                                <TableCell isHeader className="data-table__select-cell">
                                    <Checkbox
                                        checked={isAllSelected}
                                        indeterminate={isSomeSelected}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        aria-label="Select all rows"
                                    />
                                </TableCell>
                            )}
                            {columns.map(col => {
                                const isSortable = !isDragEnabled && col.sortable !== false;
                                const isSorted = sortColumn === col.id;

                                return (
                                    <TableCell
                                        key={col.id}
                                        isHeader
                                        className={clsx(
                                            'data-table__th',
                                            isSortable && 'data-table__th--sortable',
                                            isSorted && 'data-table__th--sorted'
                                        )}
                                        style={col.minWidth ? {minWidth: col.minWidth} : undefined}
                                        onClick={isSortable ? () => handleSort(col.id) : undefined}
                                        aria-sort={
                                            isSorted
                                                ? (sortDirection === 'asc' ? 'ascending' : 'descending')
                                                : undefined
                                        }
                                    >
                                        <span className="data-table__th-content">
                                            <span>{col.header}</span>
                                            {isSortable && (
                                                <span className="data-table__sort-icon">
                                                    {isSorted
                                                        ? (sortDirection === 'asc'
                                                            ? <SortAscIcon/>
                                                            : <SortDescIcon/>)
                                                        : <SortNeutralIcon/>
                                                    }
                                                </span>
                                            )}
                                        </span>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (isDragEnabled ? 1 : 0)}
                                    className="data-table__empty-cell"
                                >
                                    <Spinner size="lg"/>
                                </TableCell>
                            </TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((row, idx) => {
                                const absoluteIndex = isDragEnabled
                                    ? idx
                                    : (activePage - 1) * pageSize + idx;
                                const key = getRowKey(row, absoluteIndex);
                                const extraClass = rowClassName ? rowClassName(row) : undefined;
                                const isDragged = dragIndex === absoluteIndex;
                                const isDragOver = dragOverIndex === absoluteIndex;

                                return (
                                    <TableRow
                                        key={key}
                                        className={clsx(
                                            extraClass,
                                            onRowClick && 'data-table__row--clickable',
                                            isDragged && 'is-dragging',
                                            isDragOver && 'is-drag-over'
                                        )}
                                        onClick={onRowClick ? (e) => onRowClick(e, row, absoluteIndex) : undefined}
                                        onContextMenu={onRowContextMenu ? (e) => onRowContextMenu(e, row, absoluteIndex) : undefined}
                                        draggable={isDragEnabled}
                                        onDragStart={isDragEnabled ? (e) => handleDragStart(e as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined}
                                        onDragOver={isDragEnabled ? (e) => handleDragOver(e as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined}
                                        onDragLeave={isDragEnabled ? handleDragLeave : undefined}
                                        onDrop={isDragEnabled ? (e) => handleDrop(e as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined}
                                        onDragEnd={isDragEnabled ? handleDragEnd : undefined}
                                    >
                                        {isDragEnabled && (
                                            <TableCell className="data-table__drag-cell">
                                                <DragHandleIcon/>
                                            </TableCell>
                                        )}
                                        {selectable && (
                                            <TableCell className="data-table__select-cell" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={activeSelectedKeys.includes(key)}
                                                    onChange={(e) => toggleSelection(key, e.target.checked)}
                                                    aria-label={`Select row ${String(key)}`}
                                                />
                                            </TableCell>
                                        )}
                                        {columns.map(col => (
                                            <TableCell key={`${key}_${col.id}`}>
                                                {col.render
                                                    ? col.render(row, absoluteIndex)
                                                    : getRowValue(row, col.id) as ReactNode
                                                }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (isDragEnabled ? 1 : 0)}
                                    className="data-table__empty-cell"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ========== FOOTER ========== */}
            {!isDragEnabled && paginationPosition === 'bottom' && (
                <div className="data-table__footer">
                    {renderPaginationInfo()}
                    <div className="data-table__footer-controls">
                        {renderPaginationControls()}
                    </div>
                </div>
            )}
        </div>
    );
}


export const DataTable = forwardRef(DataTableInner) as <T>(
    props: DataTableProps<T> & { ref?: Ref<DataTableRef> }
) => ReactElement;

(DataTable as { displayName?: string }).displayName = 'DataTable';

