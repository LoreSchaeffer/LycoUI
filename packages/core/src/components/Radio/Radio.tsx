import './Radio.scss';
import {forwardRef, type InputHTMLAttributes, type ReactNode, useId} from 'react';
import clsx from 'clsx';
import type {ColorVariant, SizeVariant} from "../../types/types.ts";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: ReactNode;
    variant?: ColorVariant | 'default';
    size?: SizeVariant;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((
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
            type="radio"
            id={inputId}
            disabled={disabled}
            className={clsx(
                'radio',
                isColored && `radio-${variant}`,
                size !== 'base' && `radio-${size}`,
                className
            )}
            {...props}
        />
    );

    if (!label) return inputNode;

    return (
        <label htmlFor={inputId} className={clsx('radio-wrapper', disabled && 'is-disabled')}>
            {inputNode}
            <span>{label}</span>
        </label>
    );
});

Radio.displayName = 'Radio';