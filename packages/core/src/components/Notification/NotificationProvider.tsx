import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NotificationContext, type NotificationOptions } from './NotificationContext';
import { Notification } from './Notification';
import type { NotificationPosition } from '../../types/types';

// ── Duration presets (seconds → ms) ──
const DURATION_MAP: Record<string, number> = {
  short: 3000,
  medium: 5000,
  long: 8000,
};

// ── Internal state shape ──
interface ActiveNotification extends NotificationOptions {
  id: string;
  isExiting: boolean;
  durationMs: number;
  durationSec: number;
}

// ── Provider props ──
export interface NotificationProviderProps {
  children: React.ReactNode;
  /** Screen corner for the notification stack. */
  position?: NotificationPosition;
  /** Maximum visible notifications. Oldest are evicted when exceeded. */
  maxNotifications?: number;
}

let idCounter = 0;

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  position = 'bottom-right',
  maxNotifications = 5,
}) => {
  const [notifications, setNotifications] = useState<ActiveNotification[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  // ── Close with exit animation ──
  const closeNotification = useCallback((id: string) => {
    if (timersRef.current.has(id)) {
      window.clearTimeout(timersRef.current.get(id));
      timersRef.current.delete(id);
    }

    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isExiting: true } : n)));

    window.setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 300);
  }, []);

  // ── Show a new notification ──
  const showNotification = useCallback((options: NotificationOptions): string => {
    const id = `notification-${++idCounter}`;

    const durationType = options.duration ?? 'short';
    let durationMs: number;
    if (typeof durationType === 'number') {
      durationMs = durationType * 1000;
    } else {
      durationMs = DURATION_MAP[durationType] ?? DURATION_MAP.short;
    }
    const durationSec = durationMs / 1000;

    const newNotification: ActiveNotification = {
      ...options,
      id,
      isExiting: false,
      durationMs,
      durationSec,
    };

    setNotifications(prev => {
      const next = [...prev, newNotification];
      if (next.length > maxNotifications) {
        const evicted = next.slice(0, next.length - maxNotifications);
        evicted.forEach(n => {
          if (timersRef.current.has(n.id)) {
            window.clearTimeout(timersRef.current.get(n.id));
            timersRef.current.delete(n.id);
          }
        });
        return next.slice(next.length - maxNotifications);
      }
      return next;
    });

    const timerId = window.setTimeout(() => {
      closeNotification(id);
    }, durationMs);
    timersRef.current.set(id, timerId);

    return id;
  }, [closeNotification, maxNotifications]);

  // ── Cleanup on unmount ──
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(timerId => window.clearTimeout(timerId));
      timers.clear();
    };
  }, []);

  const contextValue = useMemo(
    () => ({ showNotification, closeNotification }),
    [showNotification, closeNotification]
  );

  const isBottom = position.startsWith('bottom');
  const orderedNotifications = isBottom ? notifications : [...notifications].reverse();

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div
          className={`notification-stack notification-stack--${position}`}
          aria-live="polite"
          role="region"
          aria-label="Notifications"
        >
          {orderedNotifications.map(n => (
            <Notification
              key={n.id}
              variant={n.variant}
              icon={n.icon}
              title={n.title}
              closable={n.closable ?? true}
              isFlat={n.isFlat}
              isExiting={n.isExiting}
              duration={n.durationSec}
              position={position}
              onClose={() => closeNotification(n.id)}
            >
              {n.message}
            </Notification>
          ))}
        </div>,
        document.body
      )}
    </NotificationContext.Provider>
  );
};
