import React, {createContext, useContext} from 'react';

/**
 * ContextMenuItemDef.
 */
export interface ContextMenuItemDef {
    id: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    danger?: boolean;
    type?: 'item' | 'separator';
    submenu?: ContextMenuItemDef[];
}

/**
 * ContextMenuState.
 */
export interface ContextMenuState {
    isOpen: boolean;
    x: number;
    y: number;
    items: ContextMenuItemDef[];
}

/**
 * ContextMenuContextValue.
 */
export interface ContextMenuContextValue {
    showContextMenu: (e: React.MouseEvent, items: ContextMenuItemDef[]) => void;
    hideContextMenu: () => void;
}

/**
 * ContextMenuContext component.
 */
export const ContextMenuContext = createContext<ContextMenuContextValue | undefined>(undefined);
ContextMenuContext.displayName = 'ContextMenuContext';

export const useContextMenu = () => {
    const context = useContext(ContextMenuContext);
    if (!context) {
        throw new Error('useContextMenu must be used within a ContextMenuProvider');
    }
    return context;
};
