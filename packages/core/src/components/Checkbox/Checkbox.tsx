import './Checkbox.scss';
import {forwardRef, type InputHTMLAttributes, type ReactNode, useId} from 'react';
import clsx from 'clsx';
import type {ColorVariant, SizeVariant} from "../../types/types.ts";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: ReactNode;
    variant?: ColorVariant | 'default';
    size?: SizeVariant;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((
    {
        label,
        variant = 'primary',
        size = 'base',
        className,
        disabled,
        id,
        ...props
    }, ref) => {

    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isColored = variant !== 'default';

    const inputNode = (
        <input
            ref={ref}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            className={clsx(
                'checkbox',
                isColored && `checkbox-${variant}`,
                size !== 'base' && `checkbox-${size}`,
                className
            )}
            {...props}
        />
    );

    if (!label) return inputNode;

    return (
        <label htmlFor={inputId} className={clsx('checkbox-wrapper', disabled && 'is-disabled')}>
            {inputNode}
            <span>{label}</span>
        </label>
    );
});

Checkbox.displayName = 'Checkbox';