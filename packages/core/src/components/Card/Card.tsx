import './Card.scss';
import {forwardRef, type HTMLAttributes, type ReactNode} from 'react';
import clsx from 'clsx';
import type {ColorVariant} from '../../types/types.ts';

export type CardElevation = 0 | 1 | 2 | 3 | 4;
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    elevation?: CardElevation;
    variant?: ColorVariant | 'default';
    isDim?: boolean;
    padding?: CardPadding;
}

export const Card = forwardRef<HTMLDivElement, CardProps>((
    {
        children,
        elevation = 1,
        variant = 'default',
        isDim = true,
        padding = 'md',
        className,
        ...props
    }, ref) => {

    const isColored = variant !== 'default';

    return (
        <div
            ref={ref}
            className={clsx(
                'card',
                `card-elevation-${elevation}`,
                `card-padding-${padding}`,
                isColored && [
                    'card-variant',
                    `card-${variant}`,
                    isDim ? 'card-dim' : 'card-solid'
                ],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';