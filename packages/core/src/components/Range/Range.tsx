import './Range.scss';
import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import type { FullVariant, SizeVariant } from '../../types/types';

export interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  variant?: FullVariant;
  size?: SizeVariant;
  tooltipFormatter?: (value: number) => React.ReactNode;
  showTooltip?: boolean;
  tooltipSize?: SizeVariant;
  filled?: boolean;
}

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
      filled = true,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<number>(
      value !== undefined ? Number(value) : defaultValue !== undefined ? Number(defaultValue) : Number(min)
    );

    useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(Number(value));
      }
    }, [value]);

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
         setCurrentValue(Number(e.target.value));
      }
      onInput?.(e as any);
      onChange?.(e);
    }, [value, onInput, onChange]);

    const numericMin = Number(min);
    const numericMax = Number(max);
    const percent = Math.max(0, Math.min(100, ((currentValue - numericMin) / (numericMax - numericMin)) * 100));

    const tooltipValue = tooltipFormatter ? tooltipFormatter(currentValue) : currentValue.toString();
    
    // Calculate char count for dynamic font sizing
    const charCount = typeof tooltipValue === 'string' || typeof tooltipValue === 'number' 
      ? String(tooltipValue).length 
      : 2;

    return (
      <div 
        className={clsx(
          'range',
          `range-${variant}`,
          `range-${size}`,
          `range-tooltip-${tooltipSize}`,
          !filled && 'range-unfilled',
          disabled && 'is-disabled',
          className
        )}
        style={{ 
          ...style,
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
          ref={ref}
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
