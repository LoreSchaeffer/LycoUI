import './Badge.scss';
import React, {type CSSProperties, forwardRef, memo} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types';
import {getContrastColor} from '../../utils/theme';

/**
 * BadgeProps.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * The visual style of the badge.
     * @default 'primary'
     */
    variant?: FullVariant | 'white';

    /**
     * Use fully rounded borders for a pill-like appearance.
     * @default false
     */
    pill?: boolean;

    /**
     * Use a subtle dimmed background color instead of a solid color.
     * @default false
     */
    dim?: boolean;
}

/**
 * Badge component.
 * Used to highlight small snippets of information, states, or counts.
 */
export const Badge = memo(forwardRef<HTMLSpanElement, BadgeProps>((
    {
        className,
        variant = 'primary',
        pill = false,
        dim = false,
        children,
        style,
        ...props
    },
    ref
) => {
    return (
        <span
            ref={ref}
            className={clsx(
                'badge',
                pill && 'badge--pill',
                dim && 'badge--dim',
                className
            )}
            style={{
                '--badge-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                '--badge-color-contrast': getContrastColor(variant),
                ...style
            } as CSSProperties}
            {...props}
        >
      {children}
    </span>
    );
}));

Badge.displayName = 'Badge';

