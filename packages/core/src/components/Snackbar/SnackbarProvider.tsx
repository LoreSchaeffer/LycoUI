import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SnackbarContext, type SnackbarOptions} from './SnackbarContext';
import {Snackbar} from './Snackbar';
import {createPortal} from 'react-dom';
import {durationToMilliseconds, TimedDismiss} from '../../interaction/timed-dismiss';

interface ActiveSnackbar extends SnackbarOptions {
    id: string;
    isExiting: boolean;
}

/**
 * SnackbarProvider component.
 */
export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [snackbars, setSnackbars] = useState<ActiveSnackbar[]>([]);

    const timersRef = useRef<Map<string, TimedDismiss>>(new Map());

    const closeSnackbar = useCallback((id: string) => {
        timersRef.current.get(id)?.destroy();
        timersRef.current.delete(id);

        setSnackbars(prev => prev.map(sb => sb.id === id ? {...sb, isExiting: true} : sb));

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

        const dismiss = new TimedDismiss(durationToMilliseconds(options.duration), () => closeSnackbar(id));
        timersRef.current.set(id, dismiss);
        dismiss.start();

        return id;
    }, [closeSnackbar]);

    useEffect(() => {
        const timers = timersRef.current;
        return () => {
            timers.forEach(timer => timer.destroy());
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
SnackbarProvider.displayName = 'SnackbarProvider';
