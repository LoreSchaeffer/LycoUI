import './Button.scss';
import {type ButtonHTMLAttributes, forwardRef, type ReactNode} from 'react';
import clsx from 'clsx';
import type {Alignment, FullVariant, SizeVariant} from '../../types/types';
import {Spinner, type SpinnerType} from '../Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: FullVariant;
    size?: SizeVariant;
    align?: Alignment;
    outlined?: boolean;
    ghost?: boolean;
    rounded?: boolean;
    static?: boolean;
    isLoading?: boolean;
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
        outlined = false,
        ghost = false,
        rounded = false,
        'static': btnStatic = false,
        isLoading = false,
        icon,
        iconStart,
        iconEnd,
        spinnerType = 'classic',
        className,
        disabled,
        style,
        ...props
    }, ref) => {
    
    const isDisabled = disabled || isLoading;
    const isIconOnly = Boolean(icon && !children);

    const showSpinnerStart = isLoading && (Boolean(iconStart) || !iconEnd);
    const showSpinnerEnd = isLoading && Boolean(iconEnd) && !iconStart;

    const mergedStyle = align !== 'center'
        ? { justifyContent: align === 'start' ? 'flex-start' : 'flex-end', ...style }
        : style;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            className={clsx(
                'btn',
                variant && `btn--${variant}`,
                size && size !== 'md' && `btn--${size}`,
                outlined && 'btn--outlined',
                ghost && 'btn--ghost',
                rounded && 'btn--rounded',
                btnStatic && 'btn--static',
                isLoading && 'btn--loading',
                isIconOnly && 'btn--icon-only',
                className
            )}
            style={mergedStyle}
            {...props}
        >
            {isIconOnly && (
                <span className="btn__icon">
                    {isLoading ? <Spinner size={size} type={spinnerType} className="btn__spinner"/> : icon}
                </span>
            )}

            {!isIconOnly && (
                <>
                    {(showSpinnerStart || (!isLoading && iconStart)) && (
                        <span className="btn__icon btn__icon--start">
                            {showSpinnerStart ? <Spinner size={size} type={spinnerType} className="btn__spinner"/> : iconStart}
                        </span>
                    )}

                    {children}

                    {(showSpinnerEnd || (!isLoading && iconEnd)) && (
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