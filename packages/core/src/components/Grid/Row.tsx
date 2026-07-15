import {forwardRef, type HTMLAttributes, type ReactNode} from "react";
import clsx from "clsx";
import "./Grid.scss";

export type RowAlign = 'stretch' | 'start' | 'center' | 'end';
export type RowJustify = 'start' | 'center' | 'end' | 'between';

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    /** Vertical alignment of columns within the row */
    align?: RowAlign;
    /** Horizontal alignment and distribution of columns */
    justify?: RowJustify;
}

export const Row = forwardRef<HTMLDivElement, RowProps>((
    {
        children,
        align = 'stretch',
        justify,
        className,
        ...props
    }, ref) => {

    return (
        <div
            ref={ref}
            className={clsx(
                'lyco-row',
                `lyco-row--align-${align}`,
                justify && `lyco-row--justify-${justify}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Row.displayName = "Row";