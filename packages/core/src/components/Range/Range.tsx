import './Range.scss';
import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types';

/**
 * Props for the Range component.
 */
export interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /** Semantic color variant */
    variant?: FullVariant;
    /** Thickness of the track and thumb */
    size?: SizeVariant;
    /** Function to format the tooltip value */
    tooltipFormatter?: (value: number) => React.ReactNode;
    /** Whether to show the tooltip */
    showTooltip?: boolean;
    /** Size of the tooltip */
    tooltipSize?: SizeVariant;
    /** Interaction that triggers the tooltip */
    tooltipTrigger?: 'active' | 'hover';
    /** Whether the track is filled from the start to the thumb */
    filled?: boolean;
    /** Forces the thumb to use the variant color */
    coloredThumb?: boolean;
}

/**
 * Range component.
 */
export const Range = forwardRef<HTMLInputElement, RangeProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            min = 0,
            max = 100,
            step = 1,
            value,
            defaultValue,
            onChange,
            onInput,
            tooltipFormatter,
            showTooltip = true,
            tooltipSize = 'md',
            tooltipTrigger = 'active',
            filled = true,
            coloredThumb,
            disabled,
            style,
            ...props
        },
        ref
    ) => {
        const internalRef = React.useRef<HTMLInputElement>(null);
        const [currentValue, setCurrentValue] = useState<number>(
            value !== undefined ? Number(value) : defaultValue !== undefined ? Number(defaultValue) : Number(min)
        );
        const [isHovered, setIsHovered] = useState(false);

        const setRefs = useCallback((node: HTMLInputElement | null) => {
            internalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }, [ref]);

        useEffect(() => {
            if (value !== undefined) {
                setCurrentValue(Number(value));
            }
        }, [value]);

        const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if (value === undefined) {
                setCurrentValue(Number(e.target.value));
            }
            onInput?.(e as unknown as React.InputEvent<HTMLInputElement>);
            onChange?.(e);
        }, [value, onInput, onChange]);

        const numericMin = Number(min);
        const numericMax = Number(max);
        const percent = Math.max(0, Math.min(100, ((currentValue - numericMin) / (numericMax - numericMin)) * 100));

        const handlePointerMove = useCallback((e: React.PointerEvent<HTMLInputElement>) => {
            if (tooltipTrigger !== 'hover' || !internalRef.current) return;
            const rect = internalRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;

            const thumbSizeMap = {sm: 12, md: 16, lg: 20};
            const thumbSize = thumbSizeMap[size as keyof typeof thumbSizeMap] || 16;
            const thumbX = (percent / 100) * (rect.width - thumbSize) + (thumbSize / 2);

            setIsHovered(Math.abs(x - thumbX) <= thumbSize / 2 + 4);
        }, [tooltipTrigger, size, percent]);

        const tooltipValue = tooltipFormatter ? tooltipFormatter(currentValue) : currentValue.toString();

        const charCount = typeof tooltipValue === 'string' || typeof tooltipValue === 'number'
            ? String(tooltipValue).length
            : 2;

        const isThumbColored = coloredThumb ?? !filled;

        return (
            <div
                className={clsx(
                    'range',
                    `range--${size}`,
                    `range--tooltip-${tooltipSize}`,
                    !filled && 'range--unfilled',
                    !isThumbColored && 'range--thumb-white',
                    (isHovered && tooltipTrigger === 'hover') && 'range--tooltip-visible',
                    disabled && 'is-disabled',
                    className
                )}
                style={{
                    ...style,
                    '--range-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                    '--range-progress': `${percent}%`,
                    '--range-progress-ratio': percent / 100,
                    '--char-count': charCount
                } as React.CSSProperties}
            >
                <input
                    type="range"
                    className="range__input"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    onChange={handleInput}
                    onPointerMove={handlePointerMove}
                    onPointerLeave={() => setIsHovered(false)}
                    ref={setRefs}
                    aria-valuemin={numericMin}
                    aria-valuemax={numericMax}
                    aria-valuenow={currentValue}
                    {...props}
                />
                {showTooltip && (
                    <div className="range__tooltip" aria-hidden="true">
                        <span className="range__tooltip-value">{tooltipValue}</span>
                    </div>
                )}
            </div>
        );
    }
);

Range.displayName = 'Range';
