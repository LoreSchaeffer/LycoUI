import './ProgressBar.scss';
import React, {type CSSProperties, forwardRef, memo} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    variant?: FullVariant;
    size?: SizeVariant;
}

export const ProgressBar = memo(forwardRef<HTMLDivElement, ProgressBarProps>(
    (
        {
            className,
            value = 0,
            max = 100,
            variant = 'primary',
            size = 'md',
            style,
            ...props
        },
        ref
    ) => {
        const percent = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));

        return (
            <div
                className={clsx(
                    'progress',
                    `progress--${size}`,
                    className
                )}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                ref={ref}
                style={{
                    '--progress-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                    ...style
                } as CSSProperties}
                {...props}
            >
                <div
                    className="progress__bar"
                    style={{transform: `scaleX(${percent / 100})`}}
                />
            </div>
        );
    }
));
ProgressBar.displayName = 'ProgressBar';




