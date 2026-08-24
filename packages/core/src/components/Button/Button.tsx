import './Button.scss';
import {type ButtonHTMLAttributes, forwardRef, type ReactNode} from 'react';
import clsx from 'clsx';
import type {Alignment, FullVariant, SizeVariant} from '../../types/types';
import {Spinner, type SpinnerType} from '../Spinner';

/**
 * Props for the Button component.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** The content of the button. */
    children?: ReactNode;
    /** The semantic color variant of the button. Default is 'primary'. */
    variant?: FullVariant;
    /** The size of the button (sm, md, lg). Default is 'md'. */
    size?: SizeVariant;
    /** Text alignment inside the button. Default is 'center'. */
    align?: Alignment;
    /** If true, renders an outlined button instead of a solid filled one. */
    outlined?: boolean;
    /** If true, renders a borderless transparent ghost button. */
    ghost?: boolean;
    /** If true, renders the button with fully rounded pill-shaped corners. */
    rounded?: boolean;
    /** If true, disables hover and active state styles, making the button static. */
    static?: boolean;
    /** If true, shows a loading spinner and disables the button. */
    isLoading?: boolean;
    /** An icon element to display in the button. Overrides children if children is empty. */
    icon?: ReactNode;
    /** An icon element to display at the start (left) of the text. */
    iconStart?: ReactNode;
    /** An icon element to display at the end (right) of the text. */
    iconEnd?: ReactNode;
    /** The visual style of the loading spinner. */
    spinnerType?: SpinnerType;
    /** If true, renders the button without elevation/shadow. */
    flat?: boolean;
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