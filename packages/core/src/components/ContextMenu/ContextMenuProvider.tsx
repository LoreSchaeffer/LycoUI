import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ContextMenuContext } from './ContextMenuContext';
import type { ContextMenuState, ContextMenuItemDef } from './ContextMenuContext';
import { ContextMenu } from './ContextMenu';

export interface ContextMenuProviderProps {
    children: React.ReactNode;
}

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({ children }) => {
    const [state, setState] = useState<ContextMenuState>({
        isOpen: false,
        x: 0,
        y: 0,
        items: []
    });

    const hideContextMenu = useCallback(() => {
        setState(prev => prev.isOpen ? { ...prev, isOpen: false } : prev);
    }, []);

    const showContextMenu = useCallback((e: React.MouseEvent, items: ContextMenuItemDef[]) => {
        e.preventDefault();
        e.stopPropagation();
        
        setState({
            isOpen: true,
            x: e.clientX,
            y: e.clientY,
            items
        });
    }, []);

    useEffect(() => {
        if (!state.isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') hideContextMenu();
        };

        const handleOutsideClick = () => {
            hideContextMenu();
        };

        const handleScroll = () => {
            hideContextMenu();
        };

        const handleBlur = () => {
            hideContextMenu();
        };

        const timeoutId = setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('contextmenu', handleOutsideClick);
        }, 10);

        document.addEventListener('keydown', handleEscape);
        window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        window.addEventListener('blur', handleBlur);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('contextmenu', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
            window.removeEventListener('scroll', handleScroll, { capture: true });
            window.removeEventListener('blur', handleBlur);
        };
    }, [state.isOpen, hideContextMenu]);

    const contextValue = useMemo(() => ({
        showContextMenu,
        hideContextMenu
    }), [showContextMenu, hideContextMenu]);

    return (
        <ContextMenuContext.Provider value={contextValue}>
            {children}
            {state.isOpen && typeof document !== 'undefined' && createPortal(
                <ContextMenu 
                    items={state.items} 
                    x={state.x} 
                    y={state.y} 
                    onClose={hideContextMenu}
                    isRoot 
                />,
                document.body
            )}
        </ContextMenuContext.Provider>
    );
};
ContextMenuProvider.displayName = 'ContextMenuProvider';
