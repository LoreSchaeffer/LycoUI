import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import type { ContextMenuItemDef } from './ContextMenuContext';
import { ContextMenu } from './ContextMenu';

export interface ContextMenuItemProps {
    item: ContextMenuItemDef;
    onClose: () => void;
}

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ item, onClose }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef<any>(null);

    if (item.type === 'separator') {
        return <li className="context-menu__separator" role="separator" />;
    }

    const hasSubmenu = item.submenu && item.submenu.length > 0;

    const handleMouseEnter = () => {
        if (item.disabled) return;
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(true);
        }, 150); // 150ms intent delay
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 150);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (item.disabled) return;

        if (hasSubmenu) {
            return;
        }

        if (item.onClick) {
            item.onClick(e);
        }
        onClose();
    };

    useEffect(() => {
        return () => clearTimeout(hoverTimeout.current);
    }, []);

    return (
        <li 
            className={clsx('context-menu__item', {
                'context-menu__item--danger': item.danger,
                'is-disabled': item.disabled,
                'is-hovered': isHovered
            })}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            role="menuitem"
            aria-disabled={item.disabled}
            aria-haspopup={hasSubmenu}
            aria-expanded={isHovered}
        >
            {item.icon && (
                <span className="context-menu__icon">
                    {item.icon}
                </span>
            )}
            
            <span className="context-menu__label">
                {item.label}
            </span>

            {hasSubmenu && (
                <span className="context-menu__arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </span>
            )}

            {hasSubmenu && isHovered && (
                <ContextMenu 
                    items={item.submenu!} 
                    x="100%" 
                    y={-4} // minor offset to align borders
                    onClose={onClose} 
                    isRoot={false} 
                />
            )}
        </li>
    );
};
