import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {NotificationContext, type NotificationOptions} from './NotificationContext';
import {Notification} from './Notification';
import type {NotificationPosition} from '../../types/types';
import {durationToMilliseconds, TimedDismiss} from '../../interaction/timed-dismiss';

interface ActiveNotification extends NotificationOptions {
    id: string;
    isExiting: boolean;
    durationMs: number;
    durationSec: number;
}

/**
 * NotificationProviderProps.
 */
export interface NotificationProviderProps {
    children: React.ReactNode;
    /** Screen corner for the notification stack. */
    position?: NotificationPosition;
    /** Maximum visible notifications. Oldest are evicted when exceeded. */
    maxNotifications?: number;
}

let idCounter = 0;

/**
 * NotificationProvider component.
 */
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
                                                                              children,
                                                                              position = 'bottom-right',
                                                                              maxNotifications = 5,
                                                                          }) => {
    const [notifications, setNotifications] = useState<ActiveNotification[]>([]);
    const timersRef = useRef<Map<string, TimedDismiss>>(new Map());

    const closeNotification = useCallback((id: string) => {
        timersRef.current.get(id)?.destroy();
        timersRef.current.delete(id);

        setNotifications(prev => prev.map(n => (n.id === id ? {...n, isExiting: true} : n)));

        window.setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 300);
    }, []);

    const showNotification = useCallback((options: NotificationOptions): string => {
        const id = `notification-${++idCounter}`;

        const durationMs = durationToMilliseconds(options.duration);
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
                        timersRef.current.get(n.id)?.destroy();
                        timersRef.current.delete(n.id);
                    }
                });
                return next.slice(next.length - maxNotifications);
            }
            return next;
        });

        const dismiss = new TimedDismiss(durationMs, () => closeNotification(id));
        timersRef.current.set(id, dismiss);
        dismiss.start();

        return id;
    }, [closeNotification, maxNotifications]);

    useEffect(() => {
        const timers = timersRef.current;
        return () => {
            timers.forEach(timer => timer.destroy());
            timers.clear();
        };
    }, []);

    const contextValue = useMemo(
        () => ({showNotification, closeNotification}),
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
                            {n.description || n.message}
                        </Notification>
                    ))}
                </div>,
                document.body
            )}
        </NotificationContext.Provider>
    );
};
NotificationProvider.displayName = 'NotificationProvider';
