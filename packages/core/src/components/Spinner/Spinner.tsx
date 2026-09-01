import {type CSSProperties, forwardRef, type HTMLAttributes, memo} from 'react';
import clsx from 'clsx';
import './Spinner.scss';
import type {FullVariant, SizeVariant} from "../../types/types.ts";

export type SpinnerType = 'classic' | 'growing';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    type?: SpinnerType;
    variant?: FullVariant;
    size?: SizeVariant;
}

export const Spinner = memo(forwardRef<HTMLSpanElement, SpinnerProps>((
    {
        type = 'classic',
        variant = 'primary',
        size = 'md',
        className,
        style,
        'aria-label': ariaLabel = 'Loading',
        ...props
    }, ref) => {

    return (
        <span
            ref={ref}
            role="status"
            aria-label={ariaLabel}
            className={clsx(
                'spinner',
                type && `spinner--${type}`,
                size && size !== 'md' && `spinner--${size}`,
                className
            )}
            style={{
                '--spinner-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                ...style
            } as CSSProperties}
            {...props}
        />
    );
}));

Spinner.displayName = 'Spinner';
