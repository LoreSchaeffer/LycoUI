import {forwardRef, type HTMLAttributes, type ReactNode} from "react";
import clsx from "clsx";

export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    span?: ColumnSpan;
    sm?: ColumnSpan;
    md?: ColumnSpan;
    lg?: ColumnSpan;
    xl?: ColumnSpan;
    xxl?: ColumnSpan;
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
        className,
        ...props
    }: ColProps, ref) => {
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
                xxl && `col-2xl-${xxl}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Col.displayName = "Col";