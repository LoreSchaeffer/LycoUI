import './DataTable.scss';
import {type DragEvent, forwardRef, type ReactElement, type ReactNode, type Ref, useCallback, useImperativeHandle, useMemo, useState} from 'react';
import clsx from 'clsx';
import {Table, TableBody, TableCell, TableRow} from '../Table';
import {Select, type SelectOption} from '../Select';
import {Pagination} from '../Pagination';
import {Spinner} from '../Spinner';
import {Checkbox} from '../Checkbox';
import {deriveRows} from './data-model.ts';
import {useRowSelection} from './useRowSelection.ts';
import {useRowReorder} from './useRowReorder.ts';
import {DataTableToolbar} from './DataTableToolbar.tsx';
import {DataTableHead} from './DataTableHead.tsx';


import type {DataTableProps, DataTableRef, SortDirection} from './DataTable.types.ts';
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

    const {dragIndex, dragOverIndex, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd} = useRowReorder(onRowReorder);

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
            <DataTableToolbar
                searchable={searchable}
                dragEnabled={isDragEnabled}
                searchPlaceholder={searchPlaceholder}
                searchQuery={searchQuery}
                onSearch={handleSearch}
                topActions={paginationPosition === 'top' ? <>{renderPaginationInfo()}{renderPaginationControls()}</> : undefined}
                dragInfo={<><DragHandleIcon/><span>Drag rows to reorder</span></>}
            />

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
                    <DataTableHead
                        columns={columns}
                        dragEnabled={isDragEnabled}
                        selectable={selectable}
                        allSelected={isAllSelected}
                        someSelected={isSomeSelected}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                        onSelectAll={handleSelectAll}
                    />
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
                                        onDragStart={isDragEnabled ? (e) => onDragStart(e as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined}
                                        onDragOver={isDragEnabled ? (e) => onDragOver(e as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined}
                                        onDragLeave={isDragEnabled ? onDragLeave : undefined}
                                        onDrop={isDragEnabled ? (e) => onDrop(e as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined}
                                        onDragEnd={isDragEnabled ? onDragEnd : undefined}
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


export type {DataTableColumn, DataTableProps, DataTableRef, SortDirection} from './DataTable.types.ts';
