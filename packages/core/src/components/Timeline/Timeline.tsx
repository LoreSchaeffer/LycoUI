import './Timeline.scss';
import React, {forwardRef} from 'react';
import clsx from 'clsx';

/**
 * Props for the Timeline component.
 */
export interface TimelineProps extends React.OlHTMLAttributes<HTMLOListElement> {
    /** The orientation of the timeline */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The alignment of the timeline items.
     * 'alternate' only applies to vertical orientation.
     */
    align?: 'left' | 'right' | 'alternate';
    /** The TimelineItem components to be rendered */
    children?: React.ReactNode;
}

/**
 * Timeline is a component that visualizes a sequence of events over time.
 * It supports vertical (default, left or alternating) and horizontal layouts.
 */
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(
    (
        {
            orientation = 'vertical',
            align = 'left',
            children,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <ol
                ref={ref}
                className={clsx(
                    'timeline',
                    `timeline--${orientation}`,
                    orientation === 'vertical' && align === 'alternate' && 'timeline--alternate',
                    className
                )}
                {...props}
            >
                {children}
            </ol>
        );
    }
);

Timeline.displayName = 'Timeline';
