import './Snackbar.scss';
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { FullVariant } from '../../types/types';

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: FullVariant | 'white';
  icon?: React.ReactNode;
  closable?: boolean;
  isFlat?: boolean;
  isExiting?: boolean;
  onClose?: () => void;
}

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((
  {
    className,
    variant = 'neutral',
    icon,
    closable = false,
    isFlat = false,
    isExiting = false,
    onClose,
    children,
    ...props
  },
  ref
) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'snackbar',
        `snackbar--${variant}`,
        closable && 'snackbar--closable',
        icon && 'has-icon',
        isFlat && 'snackbar--flat',
        isExiting && 'is-exiting',
        className
      )}
      role="status"
      aria-live="polite"
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
});
Snackbar.displayName = 'Snackbar';
