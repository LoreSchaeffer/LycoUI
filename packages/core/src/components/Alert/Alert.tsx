import './Alert.scss';
import React, {type CSSProperties, forwardRef, memo, useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types';
import {getContrastColor, getVariantColor} from '../../utils/theme';
import {TimedDismiss} from '../../interaction/timed-dismiss';

/**
 * AlertProps.
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The semantic color variant of the alert.
     * @default 'primary'
     */
    variant?: FullVariant | 'white';

    /**
     * An optional icon to display alongside the alert content.
     */
    icon?: React.ReactNode;

    /**
     * If true, displays a close button.
     * @default false
     */
    closable?: boolean;

    /**
     * Duration in seconds before the alert automatically closes.
     */
    duration?: number;

    /**
     * Callback fired when the alert is closed.
     */
    onClose?: () => void;
}

/**
 * Alert component.
 */
export const Alert = memo(forwardRef<HTMLDivElement, AlertProps>((
    {
        className,
        variant = 'primary',
        icon,
        closable = false,
        duration,
        onClose,
        children,
        style,
        ...props
    },
    ref
) => {
    const [isVisible, setIsVisible] = useState(true);
    const dismissRef = useRef<TimedDismiss | undefined>(undefined);

    useEffect(() => {
        dismissRef.current?.destroy();
        if (duration !== undefined) {
            const dismiss = new TimedDismiss(duration * 1000, () => {
                setIsVisible(false);
                onClose?.();
            });
            dismissRef.current = dismiss;
            dismiss.start();
        }
        return () => {
            dismissRef.current?.destroy();
            dismissRef.current = undefined;
        };
    }, [duration, onClose]);

    const handleClose = useCallback(() => {
        if (dismissRef.current) dismissRef.current.close();
        else {
            setIsVisible(false);
            onClose?.();
        }
    }, [onClose]);

    if (!isVisible) return null;

    return (
        <div
            ref={ref}
            className={clsx(
                'alert',
                (closable || duration) && 'alert-closable',
                icon && 'has-icon',
                className
            )}
            role="alert"
            style={{
                '--alert-color-base': getVariantColor(variant),
                '--alert-color-contrast': getContrastColor(variant),
                ...style
            } as CSSProperties}
            {...(duration ? {'data-duration': duration} : {})}
            {...props}
        >
            {icon && <span className="alert-icon">{icon}</span>}
            <div className="alert-content">{children}</div>
            {closable && (
                <button type="button" className="alert-close" aria-label="Close" onClick={handleClose}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            )}
            {duration && duration > 0 && (
                <div className="alert-progress" style={{animationDuration: `${duration}s`}}/>
            )}
        </div>
    );
}));
Alert.displayName = 'Alert';




