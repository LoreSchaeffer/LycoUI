import './Table.scss';
import { forwardRef, type HTMLAttributes, type TdHTMLAttributes } from 'react';
import clsx from 'clsx';
import type { FullVariant } from '../../types/types.ts';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    /** Contextual variant color for the entire table */
    variant?: FullVariant;
    /** Adds zebra-striping to table rows */
    striped?: boolean;
    /** Enables hover state on table rows */
    hover?: boolean;
    /** Adds borders to inner columns to create a full grid */
    bordered?: boolean;
    /** Removes all internal horizontal borders */
    borderless?: boolean;
    /** Makes table more compact by cutting cell padding in half */
    size?: 'sm' | 'md';
}

export const Table = forwardRef<HTMLTableElement, TableProps>((
    {
        variant,
        striped,
        hover = true,
        bordered,
        borderless,
        size,
        className,
        ...props
    }, ref) => {

    const tableClasses = clsx(
        'table',
        variant && `table-${variant}`,
        striped && 'table-striped',
        hover && 'table-hover',
        bordered && 'table-bordered',
        borderless && 'table-borderless',
        size === 'sm' && 'table-sm',
        className
    );

    const table = <table ref={ref} className={tableClasses} {...props} />;

    return (
        <div className="table-container">
            {table}
        </div>
    );
});

Table.displayName = 'Table';

// --- TableHead ---
export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    { className, ...props }, ref
) => (
    <thead ref={ref} className={className} {...props} />
));
TableHead.displayName = 'TableHead';

// --- TableBody ---
export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    { className, ...props }, ref
) => (
    <tbody ref={ref} className={className} {...props} />
));
TableBody.displayName = 'TableBody';

// --- TableFoot ---
export const TableFoot = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    { className, ...props }, ref
) => (
    <tfoot ref={ref} className={className} {...props} />
));
TableFoot.displayName = 'TableFoot';

// --- TableRow ---
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /** Contextual variant color for the row */
    variant?: FullVariant;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>((
    { variant, className, ...props }, ref
) => (
    <tr
        ref={ref}
        className={clsx(variant && `table-${variant}`, className)}
        {...props}
    />
));
TableRow.displayName = 'TableRow';

// --- TableCell ---
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    /** Contextual variant color for the cell */
    variant?: FullVariant;
    /** If true, renders as <th> instead of <td> */
    isHeader?: boolean;
    /** Explicitly set the HTML element */
    as?: 'td' | 'th';
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>((
    { variant, isHeader, as: Component = isHeader ? 'th' : 'td', className, ...props }, ref
) => {
    // @ts-ignore
    return (
        <Component
            ref={ref}
            className={clsx(variant && `table-${variant}`, className)}
            {...props}
        />
    );
});
TableCell.displayName = 'TableCell';
