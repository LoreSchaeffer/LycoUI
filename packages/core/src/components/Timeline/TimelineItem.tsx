import React, {forwardRef} from 'react';
import clsx from 'clsx';

/**
 * Props for the TimelineItem component.
 */
export interface TimelineItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
    /** The title or main content of the event */
    title: React.ReactNode;
    /** The timestamp or date of the event */
    time?: React.ReactNode;
    /** Custom icon to display instead of the default dot */
    icon?: React.ReactNode;
    /** Custom theme color name to override the default primary color for this specific item */
    color?: string;
}

/**
 * TimelineItem represents a single event within a Timeline.
 * It is meant to be used as a direct child of the Timeline component.
 */
export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
    (
        {
            title,
            time,
            icon,
            color,
            className,
            style,
            ...props
        },
        ref
    ) => {
        const customStyle = color
            ? {...style, '--timeline-color-base': `var(--${color}-500, var(--color-${color}))`} as React.CSSProperties
            : style;

        return (
            <li
                ref={ref}
                className={clsx('timeline__item', {'has-color': !!color}, className)}
                style={customStyle}
                {...props}
            >
                <div className="timeline__icon-wrapper">
                    <div className="timeline__icon">
                        {icon}
                    </div>
                </div>
                <div className="timeline__content">
                    <div className="timeline__title">{title}</div>
                    {time && (
                        <div className="timeline__time">
                            {typeof time === 'string' ? <time>{time}</time> : time}
                        </div>
                    )}
                </div>
            </li>
        );
    }
);

TimelineItem.displayName = 'TimelineItem';
