import './Button.scss';
import {type ButtonHTMLAttributes, forwardRef, type ReactNode} from 'react';
import clsx from 'clsx';
import type {Alignment, FullVariant, SizeVariant} from '../../types/types.ts';
import {Spinner, type SpinnerType} from '../Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: FullVariant;
    size?: SizeVariant;
    align?: Alignment;
    flat?: boolean;
    static?: boolean;
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
        size = 'md',
        align = 'center',
        flat = false,
        'static': btnStatic = false,
        outlined = false,
        rounded = false,
        loading = false,
        icon,
        iconStart,
        iconEnd,
        spinnerType = 'classic',
        className,
        disabled,
        style,
        ...props
    }, ref) => {
    const isDisabled = disabled || loading;
    const isIconOnly = Boolean(icon && !children);

    const showSpinnerStart = loading && (Boolean(iconStart) || !iconEnd);
    const showSpinnerEnd = loading && Boolean(iconEnd) && !iconStart;

    const mergedStyle = align !== 'center'
        ? { justifyContent: align === 'start' ? 'flex-start' : 'flex-end', ...style }
        : style;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            className={clsx(
                'btn',
                `btn-${variant}`,
                size !== 'md' && `btn-${size}`,
                flat && 'btn-flat',
                btnStatic && 'btn-static',
                rounded && 'btn-rounded',
                outlined && 'btn-outlined',
                loading && 'btn-loading',
                isIconOnly && 'btn-icon-only',
                className
            )}
            style={mergedStyle}
            {...props}
        >
            {isIconOnly && (
                <span className="btn__icon">
                    {loading ? <Spinner size={size} type={spinnerType} className="btn__spinner"/> : icon}
                </span>
            )}

            {!isIconOnly && (
                <>
                    {(showSpinnerStart || (!loading && iconStart)) && (
                        <span className="btn__icon btn__icon--start">
                            {showSpinnerStart ? <Spinner size={size} type={spinnerType} className="btn__spinner"/> : iconStart}
                        </span>
                    )}

                    {children}

                    {(showSpinnerEnd || (!loading && iconEnd)) && (
                        <span className="btn__icon btn__icon--end">
                            {showSpinnerEnd ? <Spinner size={size} type={spinnerType} className="btn__spinner"/> : iconEnd}
                        </span>
                    )}
                </>
            )}
        </button>
    );
});

Button.displayName = 'Button';