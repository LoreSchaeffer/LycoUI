import './Radio.scss';
import {type CSSProperties, forwardRef, type InputHTMLAttributes, memo, type ReactNode, useId} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from "../../types/types.ts";
import {getContrastColor} from '../../utils/theme.ts';

/**
 * RadioProps.
 */
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * The label text or ReactNode to display next to the radio button.
     */
    label?: ReactNode;

    /**
     * The semantic color variant of the radio button.
     * @default 'primary'
     */
    variant?: FullVariant | 'default';

    /**
     * The size of the radio button.
     * @default 'md'
     */
    size?: SizeVariant;
}

/**
 * Radio component.
 */
export const Radio = memo(forwardRef<HTMLInputElement, RadioProps>((
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
                'radio',
                disabled && 'is-disabled',
                size !== 'md' && `radio--${size}`,
                className
            )}
            style={isColored ? {
                '--radio-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                '--radio-color-contrast': getContrastColor(variant),
                ...style
            } as CSSProperties : style}
        >
            <input
                ref={ref}
                type="radio"
                id={inputId}
                disabled={disabled}
                className="radio__input"
                {...props}
            />
            <span className="radio__control" aria-hidden="true"/>
            {label && <span className="radio__label">{label}</span>}
        </label>
    );
}));

Radio.displayName = 'Radio';

