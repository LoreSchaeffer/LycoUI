import {createContext, useContext} from 'react';

/**
 * DropdownMenuContextValue.
 */
export interface DropdownMenuContextValue {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    closeMenu: () => void;
    triggerRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * DropdownMenuContext component.
 * A UI component for LycoUI.
 */
export const DropdownMenuContext = createContext<DropdownMenuContextValue | undefined>(undefined);

export const useDropdownMenuContext = (): DropdownMenuContextValue => {
    const context = useContext(DropdownMenuContext);
    if (!context) {
        throw new Error('DropdownMenu components must be used within a DropdownMenu wrapper');
    }
    return context;
};
