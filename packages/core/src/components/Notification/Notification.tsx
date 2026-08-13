import './Notification.scss';
import React, { forwardRef, useCallback } from 'react';
import clsx from 'clsx';
import type { FullVariant, NotificationPosition } from '../../types/types';

// ── Semantic SVG Icons ──
const CheckIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertTriangleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const XCircleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const SEMANTIC_ICONS: Record<string, React.ReactNode> = {
  success: <CheckIcon />,
  warning: <AlertTriangleIcon />,
  danger: <XCircleIcon />,
  info: <InfoIcon />,
};

const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Public semantic icon SVG strings for Vanilla parity ──
export const NOTIFICATION_SEMANTIC_SVG: Record<string, string> = {
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
  danger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
};

export const NOTIFICATION_CLOSE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

// ── Props ──
export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: FullVariant | 'white';
  icon?: React.ReactNode;
  title?: React.ReactNode;
  closable?: boolean;
  isFlat?: boolean;
  isExiting?: boolean;
  duration?: number;
  position?: NotificationPosition;
  onClose?: () => void;
}

// ── Component ──
export const Notification = forwardRef<HTMLDivElement, NotificationProps>((
  {
    className,
    variant = 'neutral',
    icon,
    title,
    closable = true,
    isFlat = false,
    isExiting = false,
    duration,
    position = 'bottom-right',
    onClose,
    children,
    ...props
  },
  ref
) => {
  const resolvedIcon = icon !== undefined ? icon : SEMANTIC_ICONS[variant] ?? null;
  const animClass = isExiting
    ? `notification-exit--${position}`
    : `notification-enter--${position}`;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={clsx(
        'notification',
        `notification-${variant}`,
        animClass,
        closable && 'notification-closable',
        resolvedIcon && 'has-icon',
        isFlat && 'notification-flat',
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      {resolvedIcon && <span className="notification__icon">{resolvedIcon}</span>}
      <div className="notification__body">
        {title && <strong className="notification__title">{title}</strong>}
        <p className="notification__message">{children}</p>
      </div>
      {closable && (
        <button
          type="button"
          className="notification__close"
          aria-label="Close notification"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
      )}
      {duration != null && duration > 0 && (
        <div className="notification__progress">
          <div
            className="notification__progress-bar"
            style={{ animationDuration: `${duration}s` }}
          />
        </div>
      )}
    </div>
  );
});
Notification.displayName = 'Notification';
