import './Table.scss';
import {createElement, type CSSProperties, forwardRef, type HTMLAttributes, memo, type TdHTMLAttributes,} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types.ts';

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
        style,
        ...props
    }, ref) => {
    const tableClasses = clsx(
        'table',
        variant && 'table-variant',
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
                <table
                    ref={ref}
                    className={tableClasses}
                    style={variant ? {
                        '--table-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                        ...style
                    } as CSSProperties : style}
                    {...props}
                />
            </div>
        </div>
    );
});
Table.displayName = 'Table';
export const TableHead = memo(forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    {className, ...props}, ref
) => (
    <thead ref={ref} className={className} {...props} />
)));
TableHead.displayName = 'TableHead';
export const TableBody = memo(forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    {className, ...props}, ref
) => (
    <tbody ref={ref} className={className} {...props} />
)));
TableBody.displayName = 'TableBody';
export const TableFoot = memo(forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((
    {className, ...props}, ref
) => (
    <tfoot ref={ref} className={className} {...props} />
)));
TableFoot.displayName = 'TableFoot';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /** Contextual variant color for the row */
    variant?: FullVariant;
    hover?: boolean;
}

export const TableRow = memo(forwardRef<HTMLTableRowElement, TableRowProps>((
    {variant, className, style, ...props}, ref
) => (
    <tr
        ref={ref}
        className={clsx(variant && 'table-variant', className)}
        style={variant ? {
            '--table-color-base': `var(--${variant}-500, var(--color-${variant}))`,
            ...style
        } as CSSProperties : style}
        {...props}
    />
)));
TableRow.displayName = 'TableRow';

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
    {variant, isHeader, as: tag, scope, className, style, ...props}, ref
) => {
    const element = tag ?? (isHeader ? 'th' : 'td');
    const resolvedScope = scope ?? (element === 'th' ? 'col' : undefined);
    return createElement(element, {
        ref,
        scope: resolvedScope,
        className: clsx(variant && 'table-variant', className),
        style: variant ? {
            '--table-color-base': `var(--${variant}-500, var(--color-${variant}))`,
            ...style
        } as CSSProperties : style,
        ...props,
    });
}));
TableCell.displayName = 'TableCell';
