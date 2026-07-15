import './Button.scss';
import {type ButtonHTMLAttributes, forwardRef, type ReactNode} from 'react';
import clsx from 'clsx';
import type {ColorVariant, SizeVariant} from "../../types/types.ts";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ColorVariant;
    size?: SizeVariant;
    isFlat?: boolean;
    isLoading?: boolean;
    iconStart?: ReactNode;
    iconEnd?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
    {
        children,
        variant = 'primary',
        size = 'base',
        isFlat = false,
        isLoading = false,
        iconStart,
        iconEnd,
        className,
        disabled,
        ...props
    }, ref) => {

    const isDisabled = disabled || isLoading;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            className={clsx(
                'lyco-btn',
                `lyco-btn--${variant}`,
                `lyco-btn--${size}`,
                isFlat && 'lyco-btn--flat',
                isLoading && 'lyco-btn--loading',
                className
            )}
            {...props}
        >
            {/*
              Placeholder for Spinner.
              When implemented, conditionally render Spinner here if isLoading is true.
              Often, the spinner replaces iconStart or appears absolutely centered.
            */}
            {isLoading && (
                <span className="lyco-btn__spinner-placeholder" aria-hidden="true">
                    ⏳
                </span>
            )}

            {!isLoading && iconStart && (
                <span className="lyco-btn__icon lyco-btn__icon--start">
                    {iconStart}
                </span>
            )}

            <span className="lyco-btn__content">{children}</span>

            {!isLoading && iconEnd && (
                <span className="lyco-btn__icon lyco-btn__icon--end">
                    {iconEnd}
                </span>
            )}
        </button>
    );
});

Button.displayName = 'Button';