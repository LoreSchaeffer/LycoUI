import './Button.scss';
import {type ButtonHTMLAttributes, forwardRef, type ReactNode} from 'react';
import clsx from 'clsx';
import type {ColorVariant, SizeVariant} from '../../types/types.ts';
import {Spinner, type SpinnerType} from '../Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: ColorVariant;
    size?: SizeVariant;
    flat?: boolean;
    outlined?: boolean;
    rounded?: boolean;
    loading?: boolean;
    icon?: ReactNode;
    iconStart?: ReactNode;
    iconEnd?: ReactNode;
    spinnerType?: SpinnerType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
    {
        children,
        variant = 'primary',
        size = 'base',
        flat = false,
        outlined = false,
        rounded = false,
        loading = false,
        icon,
        iconStart,
        iconEnd,
        spinnerType = 'classic',
        className,
        disabled,
        ...props
    }, ref) => {
    const isDisabled = disabled || loading;
    const isIconOnly = Boolean(icon && !children);

    const showSpinnerStart = loading && (Boolean(iconStart) || !iconEnd);
    const showSpinnerEnd = loading && Boolean(iconEnd) && !iconStart;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            className={clsx(
                'lyco-btn',
                `lyco-btn--${variant}`,
                `lyco-btn--${size}`,
                flat && 'lyco-btn--flat',
                rounded && 'lyco-btn--rounded',
                outlined && 'lyco-btn--outlined',
                loading && 'lyco-btn--loading',
                isIconOnly && 'lyco-btn--icon-only',
                className
            )}
            {...props}
        >
            {isIconOnly && (
                <span className="lyco-btn__icon">
                    {loading ? <Spinner size={size} type={spinnerType} className="lyco-btn__spinner"/> : icon}
                </span>
            )}

            {!isIconOnly && (
                <>
                    {(showSpinnerStart || (!loading && iconStart)) && (
                        <span className="lyco-btn__icon lyco-btn__icon--start">
                            {showSpinnerStart ? <Spinner size={size} type={spinnerType} className="lyco-btn__spinner"/> : iconStart}
                        </span>
                    )}

                    {children}

                    {(showSpinnerEnd || (!loading && iconEnd)) && (
                        <span className="lyco-btn__icon lyco-btn__icon--end">
                            {showSpinnerEnd ? <Spinner size={size} type={spinnerType} className="lyco-btn__spinner"/> : iconEnd}
                        </span>
                    )}
                </>
            )}
        </button>
    );
});

Button.displayName = 'Button';