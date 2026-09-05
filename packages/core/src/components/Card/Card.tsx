import './Card.scss';
import {type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types.ts';

/**
 * CardElevation.
 */
export type CardElevation = 0 | 1 | 2 | 3 | 4;
/**
 * CardPadding.
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * CardProps.
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Content of the card */
    children?: ReactNode;
    /** Box shadow elevation of the card */
    elevation?: CardElevation;
    /** Semantic color variant */
    variant?: FullVariant | 'default';
    /** If true and using a variant, uses a dimmed background instead of solid color */
    isDim?: boolean;
    /** If true, renders without elevation (deprecated, use flat instead) */
    isFlat?: boolean;
    /** Padding applied inside the card */
    padding?: CardPadding;
    /** If true, adds hover and active scale effects */
    interactive?: boolean;
    /** If true, renders without elevation */
    flat?: boolean;
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
        flat = false,
        className,
        style,
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
                    isDim ? 'card--dim' : 'card--solid'
                ],
                (isFlat || flat) && 'card--flat',
                className
            )}
            style={isColored ? {
                '--card-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                ...style
            } as CSSProperties : style}
            {...props}
        >
            {children}
        </div>
    );
});

CardRoot.displayName = 'Card';

/**
 * CardSectionProps.
 */
export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
    /** Content of the card section */
    children?: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(({children, className, ...props}, ref) => (
    <div ref={ref} className={clsx('card__header', className)} {...props}>
        {children}
    </div>
));
CardHeader.displayName = 'CardHeader';

const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(({children, className, ...props}, ref) => (
    <div ref={ref} className={clsx('card__body', className)} {...props}>
        {children}
    </div>
));
CardBody.displayName = 'CardBody';

const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(({children, className, ...props}, ref) => (
    <div ref={ref} className={clsx('card__footer', className)} {...props}>
        {children}
    </div>
));
CardFooter.displayName = 'CardFooter';

/**
 * Card component.
 */
export const Card = Object.assign(CardRoot, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter
});

