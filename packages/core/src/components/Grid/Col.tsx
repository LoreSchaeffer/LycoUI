import {forwardRef, type HTMLAttributes, type ReactNode} from "react";
import clsx from "clsx";
import "./Grid.scss";

export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColumnAlign = 'auto' | 'start' | 'center' | 'end' | 'stretch';

/**
 * Props for the Col component.
 */
export interface ColProps extends HTMLAttributes<HTMLDivElement> {
    /** Content of the column */
    children: ReactNode;
    /** Span across all viewports if specific breakpoints are not set */
    span?: ColumnSpan;
    /** Span for sm breakpoint */
    sm?: ColumnSpan;
    /** Span for md breakpoint */
    md?: ColumnSpan;
    /** Span for lg breakpoint */
    lg?: ColumnSpan;
    /** Span for xl breakpoint */
    xl?: ColumnSpan;
    /** Span for xxl breakpoint */
    xxl?: ColumnSpan;
    /** Whether the column should stretch to fill the height */
    stretch?: boolean;
    /** Alignment of the column content */
    align?: ColumnAlign;
}

/**
 * Col component for flex grid layouts.
 */
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
                span && `col--${span}`,
                sm && `col--sm-${sm}`,
                md && `col--md-${md}`,
                lg && `col--lg-${lg}`,
                xl && `col--xl-${xl}`,
                xxl && `col--xxl-${xxl}`,
                stretch && 'col--stretch',
                align !== 'auto' && `col--align-${align}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Col.displayName = "Col";