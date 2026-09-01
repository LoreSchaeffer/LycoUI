import './Tooltip.scss';
import type {ReactElement} from 'react';
import React, {forwardRef, memo, useCallback, useEffect, useId, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import clsx from 'clsx';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
    content: React.ReactNode;
    position?: TooltipPosition;
    children: ReactElement;
    offset?: number;
}

export const Tooltip = memo(forwardRef<HTMLDivElement, TooltipProps>((
    {className, content, position = 'top', children, offset = 8, ...props}, ref
) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({top: -9999, left: -9999});
    const [actualPosition, setActualPosition] = useState<TooltipPosition>(position);
    const generatedId = useId();
    const tooltipId = props.id || `lyco-tooltip-${generatedId}`;

    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    const updatePosition = useCallback(() => {
        if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        const vWidth = window.innerWidth;
        const vHeight = window.innerHeight;

        let targetPosition = position;

        if (position === 'top' && triggerRect.top - tooltipRect.height - offset < 0) {
            targetPosition = 'bottom';
        } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height + offset > vHeight) {
            targetPosition = 'top';
        } else if (position === 'left' && triggerRect.left - tooltipRect.width - offset < 0) {
            targetPosition = 'right';
        } else if (position === 'right' && triggerRect.right + tooltipRect.width + offset > vWidth) {
            targetPosition = 'left';
        }

        setActualPosition(targetPosition);

        const scrollY = window.scrollY || window.pageYOffset;
        const scrollX = window.scrollX || window.pageXOffset;

        let top = 0;
        let left = 0;

        switch (targetPosition) {
            case 'top':
                top = triggerRect.top + scrollY - tooltipRect.height - offset;
                left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = triggerRect.bottom + scrollY + offset;
                left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
                left = triggerRect.left + scrollX - tooltipRect.width - offset;
                break;
            case 'right':
                top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
                left = triggerRect.right + scrollX + offset;
                break;
        }

        if (left < 0) left = offset;
        if (left + tooltipRect.width > vWidth) left = vWidth - tooltipRect.width - offset;

        setCoords({top, left});
    }, [isVisible, position, offset]);

    useLayoutEffect(() => {
        updatePosition();
    }, [updatePosition]);

    useEffect(() => {
        if (isVisible) {
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isVisible, updatePosition]);

    return (
        <>
            <div
                ref={triggerRef}
                className="tooltip-wrapper"
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
                aria-describedby={isVisible ? tooltipId : undefined}
            >
                {children}
            </div>
            {isVisible && typeof document !== 'undefined' && createPortal(
                <div
                    ref={(node) => {
                        (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                        if (typeof ref === 'function') ref(node);
                        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }}
                    role="tooltip"
                    id={tooltipId}
                    className={clsx('tooltip__content', `tooltip__content--${actualPosition}`, className)}
                    style={{top: coords.top, left: coords.left}}
                    {...props}
                >
                    {content}
                </div>,
                document.body
            )}
        </>
    );
}));
Tooltip.displayName = 'Tooltip';




