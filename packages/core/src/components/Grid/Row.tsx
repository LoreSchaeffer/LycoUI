import {forwardRef, type HTMLAttributes, type ReactNode} from "react";
import clsx from "clsx";
import "./Grid.scss";

export type RowAlign = 'stretch' | 'start' | 'center' | 'end';
export type RowJustify = 'start' | 'center' | 'end' | 'between';

/**
 * Props for the Row component.
 */
export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    /** Grid columns or content */
    children: ReactNode;
    /** Vertical alignment of items in the row */
    align?: RowAlign;
    /** Horizontal justification of items in the row */
    justify?: RowJustify;
}

/**
 * Row component for flex grid layouts.
 */
export const Row = forwardRef<HTMLDivElement, RowProps>((
    {
        children,
        align = 'stretch',
        justify = 'start',
        className,
        ...props
    }, ref) => {

    return (
        <div
            ref={ref}
            className={clsx(
                'row',
                align !== 'stretch' && `row--align-${align}`,
                justify !== 'start' && `row--justify-${justify}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Row.displayName = "Row";