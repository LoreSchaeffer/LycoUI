import './Table.scss';
import {
    createElement,
    forwardRef,
    memo,
    type HTMLAttributes,
    type TdHTMLAttributes,
} from 'react';
import clsx from 'clsx';
import type { FullVariant } from '../../types/types.ts';

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

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

    return (
        <div className="table-wrapper">
            <div className="table-responsive">
                <table ref={ref} className={tableClasses} {...props} />
            </div>
        </div>
    );
});

Table.displayName = 'Table';

// ---------------------------------------------------------------------------
// TableHead
// ---------------------------------------------------------------------------

export const TableHead = memo(forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    { className, ...props }, ref
) => (
    <thead ref={ref} className={className} {...props} />
)));
TableHead.displayName = 'TableHead';

// ---------------------------------------------------------------------------
// TableBody
// ---------------------------------------------------------------------------

export const TableBody = memo(forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    { className, ...props }, ref
) => (
    <tbody ref={ref} className={className} {...props} />
)));
TableBody.displayName = 'TableBody';

// ---------------------------------------------------------------------------
// TableFoot
// ---------------------------------------------------------------------------

export const TableFoot = memo(forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    { className, ...props }, ref
) => (
    <tfoot ref={ref} className={className} {...props} />
)));
TableFoot.displayName = 'TableFoot';

// ---------------------------------------------------------------------------
// TableRow
// ---------------------------------------------------------------------------

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /** Contextual variant color for the row */
    variant?: FullVariant;
}

export const TableRow = memo(forwardRef<HTMLTableRowElement, TableRowProps>((
    { variant, className, ...props }, ref
) => (
    <tr
        ref={ref}
        className={clsx(variant && `table-${variant}`, className)}
        {...props}
    />
)));
TableRow.displayName = 'TableRow';

// ---------------------------------------------------------------------------
// TableCell
// ---------------------------------------------------------------------------

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    /** Contextual variant color for the cell */
    variant?: FullVariant;
    /** If true, renders as <th> instead of <td> */
    isHeader?: boolean;
    /** Explicitly set the HTML element */
    as?: 'td' | 'th';
    /** Scope attribute for header cells (e.g. "col", "row"). Auto-set to "col" when isHeader is true. */
    scope?: string;
}

export const TableCell = memo(forwardRef<HTMLTableCellElement, TableCellProps>((
    { variant, isHeader, as: tag, scope, className, ...props }, ref
) => {
    const element = tag ?? (isHeader ? 'th' : 'td');

    // Auto-apply scope="col" when rendering as a header and no explicit scope is provided
    const resolvedScope = scope ?? (element === 'th' ? 'col' : undefined);

    return createElement(element, {
        ref,
        scope: resolvedScope,
        className: clsx(variant && `table-${variant}`, className),
        ...props,
    });
}));
TableCell.displayName = 'TableCell';
