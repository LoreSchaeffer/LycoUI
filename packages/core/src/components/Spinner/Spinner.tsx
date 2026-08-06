import {forwardRef, memo, type HTMLAttributes} from 'react';
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
                size !== 'md' && `spinner-${size}`,
                className
            )}
            {...props}
        />
    );
}));

Spinner.displayName = 'Spinner';