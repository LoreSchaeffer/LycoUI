import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {NotificationContext, type NotificationOptions} from './NotificationContext';
import type {NotificationPosition} from '../../types/types';
import {durationToMilliseconds, TimedDismiss} from '../../interaction/timed-dismiss';
import {appendWithMaximum} from './notification-store';
import {NotificationRenderer, type RenderableNotification} from './NotificationRenderer';

type ActiveNotification = RenderableNotification & {durationMs: number};

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
            const result = appendWithMaximum(prev, newNotification, maxNotifications);
            result.evicted.forEach((notification) => {
                timersRef.current.get(notification.id)?.destroy();
                timersRef.current.delete(notification.id);
            });
            return result.items;
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

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            {typeof document !== 'undefined' && createPortal(
                <NotificationRenderer items={notifications} position={position} onClose={closeNotification}/>,
                document.body
            )}
        </NotificationContext.Provider>
    );
};
NotificationProvider.displayName = 'NotificationProvider';
