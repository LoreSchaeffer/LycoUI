import {forwardRef, type HTMLAttributes, type ReactNode} from "react";
import clsx from "clsx";
import "./Grid.scss";

export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColumnAlign = 'auto' | 'start' | 'center' | 'end' | 'stretch';

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    span?: ColumnSpan;
    sm?: ColumnSpan;
    md?: ColumnSpan;
    lg?: ColumnSpan;
    xl?: ColumnSpan;
    xxl?: ColumnSpan;
    stretch?: boolean;
    align?: ColumnAlign;
}

export const Col = forwardRef<HTMLDivElement, ColProps>((
    {
        children,
        span,
        sm,
        md,
        lg,
        xl,
        xxl,
        stretch = false,
        align = 'auto',
        className,
        ...props
    }, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'col',
                span && `col-${span}`,
                sm && `col-sm-${sm}`,
                md && `col-md-${md}`,
                lg && `col-lg-${lg}`,
                xl && `col-xl-${xl}`,
                xxl && `col-xxl-${xxl}`,
                stretch && 'col-stretch',
                align !== 'auto' && `col-align-${align}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Col.displayName = "Col";