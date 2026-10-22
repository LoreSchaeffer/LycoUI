import React, {createContext, useCallback, useContext, useState} from 'react';

interface AlertDialogContextValue { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }
const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(undefined);
export const useAlertDialogContext = () => {
    const context = useContext(AlertDialogContext);
    if (!context) throw new Error('AlertDialog components must be used within an AlertDialog provider');
    return context;
};
export interface AlertDialogProviderProps { children: React.ReactNode; defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void; }
export const AlertDialogProvider = ({children, defaultOpen = false, open, onOpenChange}: AlertDialogProviderProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const setIsOpen = useCallback((value: boolean) => { if (!isControlled) setUncontrolledOpen(value); onOpenChange?.(value); }, [isControlled, onOpenChange]);
    return <AlertDialogContext.Provider value={{isOpen: isControlled ? open : uncontrolledOpen, setIsOpen}}>{children}</AlertDialogContext.Provider>;
};
