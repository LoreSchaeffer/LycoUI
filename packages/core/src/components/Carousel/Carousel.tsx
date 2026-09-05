import React, {Children, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import './Carousel.scss';

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
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isJumping = useRef(false);

    const childrenArray = Children.toArray(children);
    const count = childrenArray.length;

    const domItems = useMemo(() => {
        if (!infinite || count <= 1) return childrenArray;
        const first = childrenArray[0];
        const last = childrenArray[count - 1];

        return [
            React.cloneElement(last as React.ReactElement, {key: 'clone-prev'}),
            ...childrenArray,
            React.cloneElement(first as React.ReactElement, {key: 'clone-next'})
        ];
    }, [childrenArray, infinite, count]);

    const scrollToDomIndex = useCallback((domIndex: number, behavior: ScrollBehavior = 'smooth') => {
        if (!trackRef.current) return;
        const track = trackRef.current;
        const child = track.children[domIndex] as HTMLElement;
        if (child) {
            track.scrollTo({
                left: child.offsetLeft - track.offsetLeft - (track.clientWidth - child.clientWidth) / 2,
                behavior
            });
        }
    }, []);

    useEffect(() => {
        if (infinite && count > 1) {
            isJumping.current = true;
            scrollToDomIndex(1, 'auto');
            requestAnimationFrame(() => {
                isJumping.current = false;
            });
        }
    }, [infinite, count, scrollToDomIndex]);

    const handleScroll = useCallback(() => {
        if (!trackRef.current || isJumping.current) return;
        const track = trackRef.current;
        const trackCenter = track.scrollLeft + track.clientWidth / 2;

        let closestDomIndex = 0;
        let minDistance = Infinity;

        Array.from(track.children).forEach((child, index) => {
            const htmlChild = child as HTMLElement;
            const childCenter = htmlChild.offsetLeft - track.offsetLeft + htmlChild.clientWidth / 2;
            const distance = Math.abs(trackCenter - childCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestDomIndex = index;
            }
        });

        let newLogicIndex = closestDomIndex;
        if (infinite && count > 1) {
            if (closestDomIndex === 0) {
                newLogicIndex = count - 1;
                isJumping.current = true;
                scrollToDomIndex(count, 'auto');
                requestAnimationFrame(() => {
                    isJumping.current = false;
                });
            } else if (closestDomIndex === count + 1) {
                newLogicIndex = 0;
                isJumping.current = true;
                scrollToDomIndex(1, 'auto');
                requestAnimationFrame(() => {
                    isJumping.current = false;
                });
            } else {
                newLogicIndex = closestDomIndex - 1;
            }
        }

        if (newLogicIndex !== activeIndex) {
            setActiveIndex(newLogicIndex);
        }
    }, [activeIndex, infinite, count, scrollToDomIndex]);

    const scrollPrev = () => {
        if (!trackRef.current) return;
        if (infinite && count > 1) {
            const currentDomIndex = activeIndex + 1;
            scrollToDomIndex(currentDomIndex - 1, 'smooth');
        } else if (activeIndex > 0) {
            scrollToDomIndex(activeIndex - 1, 'smooth');
        }
    };

    const scrollNext = () => {
        if (!trackRef.current) return;
        if (infinite && count > 1) {
            const currentDomIndex = activeIndex + 1;
            scrollToDomIndex(currentDomIndex + 1, 'smooth');
        } else if (activeIndex < count - 1) {
            scrollToDomIndex(activeIndex + 1, 'smooth');
        }
    };

    const goToIndex = (index: number) => {
        const targetDomIndex = infinite ? index + 1 : index;
        scrollToDomIndex(targetDomIndex, 'smooth');
    };

    useEffect(() => {
        const track = trackRef.current;
        if (track) {
            let timeoutId: ReturnType<typeof setTimeout>;
            const listener = () => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    handleScroll();
                }, 50);
            };

            track.addEventListener('scroll', listener, {passive: true});
            return () => {
                clearTimeout(timeoutId);
                track.removeEventListener('scroll', listener);
            }
        }
    }, [handleScroll]);

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
                    let itemLogicIndex = index;
                    if (infinite && count > 1) {
                        if (index === 0) itemLogicIndex = count - 1;
                        else if (index === count + 1) itemLogicIndex = 0;
                        else itemLogicIndex = index - 1;
                    }

                    return (
                        <div
                            className={clsx('carousel__slide', {
                                'is-active': activeIndex === itemLogicIndex
                            })}
                            key={React.isValidElement(child) ? child.key : index}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${itemLogicIndex + 1} of ${count}`}
                        >
                            {child}
                        </div>
                    );
                })}
            </div>

            {showArrows && count > 1 && (
                <>
                    <button
                        className="carousel__arrow carousel__arrow--prev"
                        onClick={scrollPrev}
                        disabled={!infinite && activeIndex === 0}
                        aria-label="Previous slide"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button
                        className="carousel__arrow carousel__arrow--next"
                        onClick={scrollNext}
                        disabled={!infinite && activeIndex === count - 1}
                        aria-label="Next slide"
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </>
            )}

            {showDots && count > 1 && (
                <div className="carousel__dots">
                    {Array.from({length: count}).map((_, idx) => (
                        <button
                            key={idx}
                            className={clsx('carousel__dot', {'is-active': activeIndex === idx})}
                            onClick={() => goToIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

Carousel.displayName = 'Carousel';

