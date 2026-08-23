import './Radio.scss';
import {forwardRef, memo, type InputHTMLAttributes, type ReactNode, useId} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from "../../types/types.ts";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: ReactNode;
    variant?: FullVariant | 'default';
    size?: SizeVariant;
}

export const Radio = memo(forwardRef<HTMLInputElement, RadioProps>((
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
                'radio', 
                disabled && 'is-disabled',
                isColored && `radio--${variant}`,
                size !== 'md' && `radio--${size}`,
                className
            )}
        >
            <input
                ref={ref}
                type="radio"
                id={inputId}
                disabled={disabled}
                className="radio__input"
                {...props}
            />
            <span className="radio__control" aria-hidden="true" />
            {label && <span className="radio__label">{label}</span>}
        </label>
    );
}));

Radio.displayName = 'Radio';