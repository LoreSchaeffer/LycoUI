import {forwardRef, type HTMLAttributes, type ReactNode} from "react";
import clsx from "clsx";

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
        align,
        className,
        ...props
    }, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'lyco-col',
                span && `lyco-col-${span}`,
                sm && `lyco-col-sm-${sm}`,
                md && `lyco-col-md-${md}`,
                lg && `lyco-col-lg-${lg}`,
                xl && `lyco-col-xl-${xl}`,
                xxl && `lyco-col-xxl-${xxl}`,
                stretch && 'lyco-col--stretch',
                align && `lyco-col--align-${align}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Col.displayName = "Col";