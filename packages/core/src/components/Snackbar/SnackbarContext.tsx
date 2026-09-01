import React, {createContext, useContext} from 'react';
import type {FullVariant} from '../../types/types';

export type SnackbarDuration = 'short' | 'medium' | 'long' | number;

export interface SnackbarOptions {
    message: React.ReactNode;
    variant?: FullVariant;
    icon?: React.ReactNode;
    closable?: boolean;
    duration?: SnackbarDuration;
    isFlat?: boolean;
}

export interface SnackbarContextValue {
    showSnackbar: (options: SnackbarOptions) => string;
    closeSnackbar: (id: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);
SnackbarContext.displayName = 'SnackbarContext';

export const useSnackbar = (): SnackbarContextValue => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
