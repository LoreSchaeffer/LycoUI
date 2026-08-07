import './Alert.scss';
import React, { forwardRef, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import type { FullVariant } from '../../types/types';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: FullVariant | 'white';
  icon?: React.ReactNode;
  closable?: boolean;
  duration?: number;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>((
  {
    className,
    variant = 'primary',
    icon,
    closable = false,
    duration,
    onClose,
    children,
    ...props
  },
  ref
) => {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (duration && duration > 0) {
      timerRef.current = window.setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration * 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, onClose]);

  const handleClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      className={clsx(
        'alert',
        `alert-${variant}`,
        (closable || duration) && 'alert-closable',
        icon && 'has-icon',
        className
      )}
      role="alert"
      {...(duration ? { 'data-duration': duration } : {})}
      {...props}
    >
      {icon && <span className="alert__icon">{icon}</span>}
      <div className="alert__content">{children}</div>
      {closable && (
        <button type="button" className="alert__close" aria-label="Close" onClick={handleClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
      {duration && duration > 0 && (
        <div className="alert__progress" style={{ animationDuration: `${duration}s` }} />
      )}
    </div>
  );
});
Alert.displayName = 'Alert';
