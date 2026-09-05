import './Switch.scss';
import {type CSSProperties, forwardRef, type InputHTMLAttributes, memo, type ReactNode, useId} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from "../../types/types.ts";
import {getContrastColor} from '../../utils/theme.ts';

/**
 * SwitchProps.
 */
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * The label text or ReactNode to display next to the switch.
     */
    label?: ReactNode;

    /**
     * The semantic color variant of the switch.
     * @default 'primary'
     */
    variant?: FullVariant | 'default';

    /**
     * The size of the switch.
     * @default 'md'
     */
    size?: SizeVariant;
}

/**
 * Switch component.
 */
export const Switch = memo(forwardRef<HTMLInputElement, SwitchProps>((
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
                'switch',
                disabled && 'is-disabled',
                size !== 'md' && `switch--${size}`,
                className
            )}
            style={isColored ? {
                '--switch-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                '--switch-color-contrast': getContrastColor(variant),
                ...style
            } as CSSProperties : style}
        >
            <input
                ref={ref}
                type="checkbox"
                role="switch"
                id={inputId}
                disabled={disabled}
                className="switch__input"
                {...props}
            />
            <span className="switch__control" aria-hidden="true"/>
            {label && <span className="switch__label">{label}</span>}
        </label>
    );
}));

Switch.displayName = 'Switch';
