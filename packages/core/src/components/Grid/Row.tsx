import {forwardRef, type HTMLAttributes, type ReactNode} from "react";
import clsx from "clsx";
import "./Grid.scss";

export type RowAlign = 'stretch' | 'start' | 'center' | 'end';
export type RowJustify = 'start' | 'center' | 'end' | 'between';

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    align?: RowAlign;
    justify?: RowJustify;
}

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
                align !== 'stretch' && `row-align-${align}`,
                justify !== 'start' && `row-justify-${justify}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Row.displayName = "Row";