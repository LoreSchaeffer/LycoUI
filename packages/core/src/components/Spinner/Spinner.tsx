import {type CSSProperties, forwardRef, type HTMLAttributes, memo} from 'react';
import clsx from 'clsx';
import './Spinner.scss';
import type {FullVariant, SizeVariant} from "../../types/types.ts";

/**
 * SpinnerType.
 */
export type SpinnerType = 'classic' | 'growing';

/**
 * SpinnerProps.
 */
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * The visual style of the spinner.
     * @default 'classic'
     */
    type?: SpinnerType;

    /**
     * The semantic color variant of the spinner.
     * @default 'primary'
     */
    variant?: FullVariant;

    /**
     * The size of the spinner.
     * @default 'md'
     */
    size?: SizeVariant;
}

/**
 * Spinner component.
 */
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
