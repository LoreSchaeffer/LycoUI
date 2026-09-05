import './Snackbar.scss';
import React, {type CSSProperties, forwardRef} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types';
import {getContrastColor} from '../../utils/theme.ts';

/**
 * SnackbarProps.
 */
export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Semantic color variant */
    variant?: FullVariant | 'white';
    /** Icon to display at the start */
    icon?: React.ReactNode;
    /** Shows a close button */
    closable?: boolean;
    /** Uses a flat style instead of elevated */
    isFlat?: boolean;
    /** Indicates if the snackbar is animating out */
    isExiting?: boolean;
    /** Callback when the close button is clicked */
    onClose?: () => void;
}

/**
 * Snackbar component.
 */
export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((
    {
        className,
        variant = 'secondary',
        icon,
        closable = false,
        isFlat = false,
        isExiting = false,
        onClose,
        children,
        style,
        ...props
    },
    ref
) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'snackbar',
                closable && 'snackbar--closable',
                icon && 'has-icon',
                isFlat && 'snackbar--flat',
                isExiting && 'is-exiting',
                className
            )}
            role="status"
            aria-live="polite"
            style={{
                '--snackbar-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                '--snackbar-color-contrast': getContrastColor(variant),
                ...style
            } as CSSProperties}
            {...props}
        >
            {icon && <span className="snackbar__icon">{icon}</span>}
            <div className="snackbar__content">{children}</div>
            {closable && (
                <button
                    type="button"
                    className="snackbar__close"
                    aria-label="Close"
                    onClick={onClose}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            )}
        </div>
    );
});
Snackbar.displayName = 'Snackbar';
