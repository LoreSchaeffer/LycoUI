import type {ReactElement} from 'react';
import clsx from 'clsx';
import {Checkbox} from '../Checkbox';
import {TableCell, TableHead as TableHeadRegion, TableRow} from '../Table';
import type {DataTableColumn, SortDirection} from './DataTable.types.ts';

function SortIcon({sorted, direction}: {sorted: boolean; direction: SortDirection}): ReactElement {
    if (!sorted) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{opacity: 0.35}}><polyline points="8 6 12 2 16 6"/><polyline points="8 18 12 22 16 18"/></svg>;
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points={direction === 'asc' ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}/></svg>;
}

export interface DataTableHeadProps<T> {
    columns: readonly DataTableColumn<T>[];
    dragEnabled: boolean;
    selectable: boolean;
    allSelected: boolean;
    someSelected: boolean;
    sortColumn?: string;
    sortDirection: SortDirection;
    onSort: (columnId: string) => void;
    onSelectAll: (checked: boolean) => void;
}

export function DataTableHead<T>({columns, dragEnabled, selectable, allSelected, someSelected, sortColumn, sortDirection, onSort, onSelectAll}: DataTableHeadProps<T>): ReactElement {
    return <TableHeadRegion><TableRow>
        {dragEnabled && <TableCell isHeader className="data-table__drag-header" aria-label="Drag handle"/>}
        {selectable && <TableCell isHeader className="data-table__select-cell"><Checkbox checked={allSelected} indeterminate={someSelected} onChange={(event) => onSelectAll(event.target.checked)} aria-label="Select all rows"/></TableCell>}
        {columns.map((column) => {
            const sortable = !dragEnabled && column.sortable !== false;
            const sorted = sortColumn === column.id;
            return <TableCell key={column.id} isHeader className={clsx('data-table__th', sortable && 'data-table__th--sortable', sorted && 'data-table__th--sorted')} style={column.minWidth ? {minWidth: column.minWidth} : undefined} onClick={sortable ? () => onSort(column.id) : undefined} aria-sort={sorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}>
                <span className="data-table__th-content"><span>{column.header}</span>{sortable && <span className="data-table__sort-icon"><SortIcon sorted={sorted} direction={sortDirection}/></span>}</span>
            </TableCell>;
        })}
    </TableRow></TableHeadRegion>;
}
