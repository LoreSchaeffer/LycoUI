import "./Grid.scss";
import {forwardRef, type HTMLAttributes, type ReactNode} from "react";
import clsx from "clsx";

export type RowAlign = 'stretch' | 'start' | 'center' | 'end';

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    align?: RowAlign;
}

export const Row = forwardRef<HTMLDivElement, RowProps>((
    {
        children,
        align = 'stretch',
        className,
        ...props
    }: RowProps, ref) => {

    return (
        <div
            ref={ref}
            className={clsx('row', `row--${align}`, className)}
            {...props}
        >
            {children}
        </div>
    )
});

Row.displayName = "Row";