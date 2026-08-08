import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SnackbarContext, type SnackbarOptions} from './SnackbarContext';
import {Snackbar} from './Snackbar';
import {createPortal} from 'react-dom';

interface ActiveSnackbar extends SnackbarOptions {
    id: string;
    isExiting: boolean;
}

const DURATION_MAP: Record<string, number> = {
    short: 3000,
    medium: 5000,
    long: 8000,
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [snackbars, setSnackbars] = useState<ActiveSnackbar[]>([]);

    // Ref to hold timers for each snackbar to ensure proper cleanup
    const timersRef = useRef<Map<string, number>>(new Map());

    const closeSnackbar = useCallback((id: string) => {
        // Clear timeout if it exists
        if (timersRef.current.has(id)) {
            window.clearTimeout(timersRef.current.get(id));
            timersRef.current.delete(id);
        }

        setSnackbars(prev => prev.map(sb => sb.id === id ? {...sb, isExiting: true} : sb));

        // Remove from DOM after exit animation completes (duration-fast is typically 150-250ms, let's wait 300ms)
        window.setTimeout(() => {
            setSnackbars(prev => prev.filter(sb => sb.id !== id));
        }, 300);
    }, []);

    const showSnackbar = useCallback((options: SnackbarOptions) => {
        const id = Math.random().toString(36).substring(2, 9);

        const newSnackbar: ActiveSnackbar = {
            ...options,
            id,
            isExiting: false,
        };

        setSnackbars(prev => [...prev, newSnackbar]);

        const durationType = options.duration || 'short';
        let durationMs: number;

        if (typeof durationType === 'number') {
            durationMs = durationType * 1000;
        } else {
            durationMs = DURATION_MAP[durationType] || DURATION_MAP.short;
        }

        const timerId = window.setTimeout(() => {
            closeSnackbar(id);
        }, durationMs);

        timersRef.current.set(id, timerId);

        return id;
    }, [closeSnackbar]);

    // Clean up timers on unmount
    useEffect(() => {
        const timers = timersRef.current;
        return () => {
            timers.forEach(timerId => {
                window.clearTimeout(timerId);
            });
            timers.clear();
        };
    }, []);

    const contextValue = useMemo(() => ({showSnackbar, closeSnackbar}), [showSnackbar, closeSnackbar]);

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
            {typeof document !== 'undefined' && createPortal(
                <div className="snackbar-stack" aria-live="polite">
                    {snackbars.map(sb => (
                        <Snackbar
                            key={sb.id}
                            variant={sb.variant}
                            icon={sb.icon}
                            closable={sb.closable}
                            isFlat={sb.isFlat}
                            isExiting={sb.isExiting}
                            onClose={() => closeSnackbar(sb.id)}
                        >
                            {sb.message}
                        </Snackbar>
                    ))}
                </div>,
                document.body
            )}
        </SnackbarContext.Provider>
    );
};
