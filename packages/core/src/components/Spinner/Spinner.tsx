import {forwardRef, type HTMLAttributes} from 'react';
import clsx from 'clsx';
import './Spinner.scss';
import type {ColorVariant, SizeVariant} from "../../types/types.ts";

export type SpinnerType = 'classic' | 'growing';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
    type?: SpinnerType;
    variant?: ColorVariant;
    size?: SizeVariant;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>((
    {
        type = 'classic',
        variant = 'primary',
        size = 'base',
        className,
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
                `spinner-${type}`,
                variant && `spinner-${variant}`,
                size !== 'base' && `spinner-${size}`,
                className
            )}
            {...props}
        />
    );
});

Spinner.displayName = 'Spinner';