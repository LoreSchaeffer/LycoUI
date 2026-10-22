import React, {Children, useMemo} from 'react';
import clsx from 'clsx';
import './Carousel.scss';
import {CarouselControls} from './CarouselControls';
import {useCarouselScroll} from './useCarouselScroll';
import {canLoop, toLogicalIndex} from './carousel-model';

/**
 * CarouselProps.
 */
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Whether to show Prev/Next arrows.
     * @default true
     */
    showArrows?: boolean;
    /**
     * Whether to show bottom pagination dots.
     * @default true
     */
    showDots?: boolean;
    /**
     * Space between slides.
     * @default 'var(--spacing-4)'
     */
    gap?: string;
    /**
     * Width of each slide. Defaults to 100%. Useful if you want multiple items visible.
     * @default '100%'
     */
    slideWidth?: string;
    /**
     * When true, the active slide is centered and adjacent slides peek from the edges.
     * @default false
     */
    centerMode?: boolean;
    /**
     * When true, scrolling wraps around infinitely.
     * @default false
     */
    infinite?: boolean;
}

/**
 * Carousel component.
 */
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({
                                                                             children,
                                                                             showArrows = true,
                                                                             showDots = true,
                                                                             gap = 'var(--spacing-4)',
                                                                             slideWidth = '100%',
                                                                             centerMode = false,
                                                                             infinite = false,
                                                                             className,
                                                                             style,
                                                                             'aria-label': ariaLabel = 'Carousel',
                                                                             ...props
                                                                         }, ref) => {
    const childrenArray = Children.toArray(children);
    const count = childrenArray.length;
    const {trackRef, activeIndex, goTo, move} = useCarouselScroll({count, infinite});

    const domItems = useMemo(() => {
        if (!canLoop(count, infinite)) return childrenArray;
        const first = childrenArray[0];
        const last = childrenArray[count - 1];

        return [
            React.cloneElement(last as React.ReactElement, {key: 'clone-prev'}),
            ...childrenArray,
            React.cloneElement(first as React.ReactElement, {key: 'clone-next'})
        ];
    }, [childrenArray, infinite, count]);

    return (
        <div
            ref={ref}
            className={clsx('carousel', {
                'carousel--center-mode': centerMode,
            }, className)}
            role="region"
            aria-roledescription="carousel"
            aria-label={ariaLabel}
            style={{
                '--carousel-gap': gap,
                '--carousel-slide-width': slideWidth,
                ...style
            } as React.CSSProperties}
            {...props}
        >
            <div className="carousel__track" ref={trackRef}>
                {domItems.map((child, index) => {
                    const itemLogicIndex = toLogicalIndex(index, count, infinite);

                    return (
                        <div
                            className={clsx('carousel__slide', {
                                'is-active': activeIndex === itemLogicIndex
                            })}
                            key={React.isValidElement(child) ? child.key : index}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${itemLogicIndex + 1} of ${count}`}
                            aria-hidden={canLoop(count, infinite) && (index === 0 || index === count + 1) ? true : undefined}
                            inert={canLoop(count, infinite) && (index === 0 || index === count + 1) || undefined}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>

            <CarouselControls count={count} index={activeIndex} infinite={infinite} showArrows={showArrows} showDots={showDots} onMove={move} onSelect={goTo}/>
        </div>
    );
});

Carousel.displayName = 'Carousel';

