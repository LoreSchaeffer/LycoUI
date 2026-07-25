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
        ...props
    }, ref) => {

    return (
        <span
            ref={ref}
            role="status"
            aria-label="Loading"
            className={clsx(
                'lyco-spinner',
                `lyco-spinner--${type}`,
                `lyco-spinner--${variant}`,
                `lyco-spinner--${size}`,
                className
            )}
            {...props}
        >
            {type === 'classic' ? (
                <svg className="lyco-spinner__svg" viewBox="25 25 50 50">
                    <circle
                        className="lyco-spinner__circle"
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                        strokeMiterlimit="10"
                    />
                </svg>
            ) : (
                <span className="lyco-spinner__grow"/>
            )}
        </span>
    );
});

Spinner.displayName = 'Spinner';