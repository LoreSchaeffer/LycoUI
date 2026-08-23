import './ProgressBar.scss';
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { FullVariant, SizeVariant } from '../../types/types';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: FullVariant;
  size?: SizeVariant;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = 'primary',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const percent = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));

    return (
      <div
        className={clsx(
          'progress',
          `progress--${variant}`,
          `progress--${size}`,
          className
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        ref={ref}
        {...props}
      >
        <div 
          className="progress__bar" 
          style={{ width: `${percent}%` }}
        />
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
