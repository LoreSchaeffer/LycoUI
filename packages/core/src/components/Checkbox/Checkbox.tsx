import './Checkbox.scss';
import {forwardRef, memo, type InputHTMLAttributes, type ReactNode, useId} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from "../../types/types.ts";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: ReactNode;
    variant?: FullVariant | 'default';
    size?: SizeVariant;
    indeterminate?: boolean;
}

export const Checkbox = memo(forwardRef<HTMLInputElement, CheckboxProps>((
    {
        label,
        variant = 'primary',
        size = 'md',
        className,
        disabled,
        id,
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
                isColored && `checkbox--${variant}`,
                size !== 'md' && `checkbox--${size}`,
                className
            )}
        >
            <input
                ref={ref}
                type="checkbox"
                id={inputId}
                disabled={disabled}
                className="checkbox__input"
                {...props}
            />
            <span className="checkbox__control" aria-hidden="true" />
            {label && <span className="checkbox__label">{label}</span>}
        </label>
    );
}));

Checkbox.displayName = 'Checkbox';