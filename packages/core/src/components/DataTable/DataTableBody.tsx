import type {DragEvent, ReactElement, ReactNode} from 'react';
import clsx from 'clsx';
import {Checkbox} from '../Checkbox';
import {Spinner} from '../Spinner';
import {TableBody as TableBodyRegion, TableCell, TableRow} from '../Table';
import type {DataTableColumn} from './DataTable.types.ts';
import type {RowKey} from './useRowSelection.ts';

function DragHandleIcon(): ReactElement {
    return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>;
}

export interface DataTableBodyProps<T> {
    columns: readonly DataTableColumn<T>[];
    rows: readonly T[];
    loading: boolean;
    emptyMessage: string;
    dragEnabled: boolean;
    selectable: boolean;
    selectedKeys: readonly RowKey[];
    rowOffset: number;
    draggedIndex: number | null;
    dragOverIndex: number | null;
    getRowKey: (row: T, index: number) => RowKey;
    rowClassName?: (row: T) => string | undefined;
    onRowClick?: (event: React.MouseEvent, row: T, index: number) => void;
    onRowContextMenu?: (event: React.MouseEvent, row: T, index: number) => void;
    onToggleSelection: (key: RowKey, checked: boolean) => void;
    onDragStart: (event: DragEvent<HTMLTableRowElement>, index: number) => void;
    onDragOver: (event: DragEvent<HTMLTableRowElement>, index: number) => void;
    onDragLeave: () => void;
    onDrop: (event: DragEvent<HTMLTableRowElement>, index: number) => void;
    onDragEnd: () => void;
}

export function DataTableBody<T>({columns, rows, loading, emptyMessage, dragEnabled, selectable, selectedKeys, rowOffset, draggedIndex, dragOverIndex, getRowKey, rowClassName, onRowClick, onRowContextMenu, onToggleSelection, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd}: DataTableBodyProps<T>): ReactElement {
    const columnSpan = columns.length + (dragEnabled ? 1 : 0);
    if (loading) return <TableBodyRegion><TableRow><TableCell colSpan={columnSpan} className="data-table__empty-cell"><Spinner size="lg"/></TableCell></TableRow></TableBodyRegion>;
    if (!rows.length) return <TableBodyRegion><TableRow><TableCell colSpan={columnSpan} className="data-table__empty-cell">{emptyMessage}</TableCell></TableRow></TableBodyRegion>;
    return <TableBodyRegion>{rows.map((row, index) => {
        const absoluteIndex = dragEnabled ? index : rowOffset + index;
        const key = getRowKey(row, absoluteIndex);
        return <TableRow key={key} className={clsx(rowClassName?.(row), onRowClick && 'data-table__row--clickable', draggedIndex === absoluteIndex && 'is-dragging', dragOverIndex === absoluteIndex && 'is-drag-over')} onClick={onRowClick ? (event) => onRowClick(event, row, absoluteIndex) : undefined} onContextMenu={onRowContextMenu ? (event) => onRowContextMenu(event, row, absoluteIndex) : undefined} draggable={dragEnabled} onDragStart={dragEnabled ? (event) => onDragStart(event as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined} onDragOver={dragEnabled ? (event) => onDragOver(event as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined} onDragLeave={dragEnabled ? onDragLeave : undefined} onDrop={dragEnabled ? (event) => onDrop(event as unknown as DragEvent<HTMLTableRowElement>, absoluteIndex) : undefined} onDragEnd={dragEnabled ? onDragEnd : undefined}>
            {dragEnabled && <TableCell className="data-table__drag-cell"><DragHandleIcon/></TableCell>}
            {selectable && <TableCell className="data-table__select-cell" onClick={(event) => event.stopPropagation()}><Checkbox checked={selectedKeys.includes(key)} onChange={(event) => onToggleSelection(key, event.target.checked)} aria-label={`Select row ${String(key)}`}/></TableCell>}
            {columns.map((column) => <TableCell key={`${key}_${column.id}`}>{column.render ? column.render(row, absoluteIndex) : valueFor(row, column.id) as ReactNode}</TableCell>)}
        </TableRow>;
    })}</TableBodyRegion>;
}

function valueFor<T>(row: T, id: string): unknown {
    return (row as Record<string, unknown>)[id];
}
