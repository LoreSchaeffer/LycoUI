import './Checkbox.scss';
import {type CSSProperties, forwardRef, type InputHTMLAttributes, memo, type ReactNode, useId} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from "../../types/types.ts";
import {getContrastColor} from '../../utils/theme.ts';

/**
 * CheckboxProps.
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * The label text or ReactNode to display next to the checkbox.
     */
    label?: ReactNode;

    /**
     * The semantic color variant of the checkbox.
     * @default 'primary'
     */
    variant?: FullVariant | 'default';

    /**
     * The size of the checkbox.
     * @default 'md'
     */
    size?: SizeVariant;

    /**
     * Whether the checkbox is in an indeterminate state.
     * Note: This prop currently handles only the type definition. Internal JS is needed for DOM indeterminate.
     */
    indeterminate?: boolean;
}

/**
 * Checkbox component.
 */
export const Checkbox = memo(forwardRef<HTMLInputElement, CheckboxProps>((
    {
        label,
        variant = 'primary',
        size = 'md',
        className,
        disabled,
        id,
        style,
        ...props
    }, ref) => {

    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isColored = variant !== 'default';

    return (
        <label
            htmlFor={inputId}
            className={clsx(
                'checkbox',
                disabled && 'is-disabled',
                size !== 'md' && `checkbox--${size}`,
                className
            )}
            style={isColored ? {
                '--checkbox-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                '--checkbox-color-contrast': getContrastColor(variant),
                ...style
            } as CSSProperties : style}
        >
            <input
                ref={ref}
                type="checkbox"
                id={inputId}
                disabled={disabled}
                className="checkbox__input"
                {...props}
            />
            <span className="checkbox__control" aria-hidden="true"/>
            {label && <span className="checkbox__label">{label}</span>}
        </label>
    );
}));

Checkbox.displayName = 'Checkbox';

