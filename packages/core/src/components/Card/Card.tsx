import './Card.scss';
import {forwardRef, type HTMLAttributes, type ReactNode} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types.ts';

export type CardElevation = 0 | 1 | 2 | 3 | 4;
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    elevation?: CardElevation;
    variant?: FullVariant | 'default';
    isDim?: boolean;
    isFlat?: boolean;
    padding?: CardPadding;
    interactive?: boolean;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>((
    {
        children,
        elevation = 1,
        variant = 'default',
        isDim = true,
        isFlat = false,
        padding = 'none',
        interactive = false,
        className,
        ...props
    }, ref) => {

    const isColored = variant !== 'default';

    return (
        <div
            ref={ref}
            className={clsx(
                'card',
                `card--elevation-${elevation}`,
                `card--padding-${padding}`,
                interactive && 'card--interactive',
                isColored && [
                    'card--variant',
                    `card--${variant}`,
                    isDim ? 'card--dim' : 'card--solid'
                ],
                isFlat && 'card--flat',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

CardRoot.displayName = 'Card';

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('card__header', className)} {...props}>
        {children}
    </div>
));
CardHeader.displayName = 'CardHeader';

const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('card__body', className)} {...props}>
        {children}
    </div>
));
CardBody.displayName = 'CardBody';

const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('card__footer', className)} {...props}>
        {children}
    </div>
));
CardFooter.displayName = 'CardFooter';

export const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter
});