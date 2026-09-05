import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import type {ContextMenuItemDef} from './ContextMenuContext';
import {ContextMenu} from './ContextMenu';

/**
 * ContextMenuItemProps.
 */
export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
    item: ContextMenuItemDef;
    onClose: () => void;
}

/**
 * ContextMenuItem component.
 */
export const ContextMenuItem = React.forwardRef<HTMLLIElement, ContextMenuItemProps>(
    ({item, onClose, ...props}, ref) => {
        const [isHovered, setIsHovered] = useState(false);
        const hoverTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);


        const hasSubmenu = item.submenu && item.submenu.length > 0;

        const handleMouseEnter = useCallback(() => {
            if (item.disabled) return;
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = setTimeout(() => {
                setIsHovered(true);
            }, 150);
        }, [item.disabled]);

        const handleMouseLeave = useCallback(() => {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = setTimeout(() => {
                setIsHovered(false);
            }, 150);
        }, []);

        const handleClick = useCallback((e: React.MouseEvent) => {
            e.stopPropagation();
            if (item.disabled) return;

            if (hasSubmenu) {
                return;
            }

            if (item.onClick) {
                item.onClick(e);
            }
            onClose();
        }, [item, hasSubmenu, onClose]);

        useEffect(() => {
            return () => clearTimeout(hoverTimeout.current);
        }, []);

        if (item.type === 'separator') {
            return <li ref={ref} className="context-menu__separator" role="separator" {...props} />;
        }

        return (
            <li
                ref={ref}
                className={clsx(
                    'context-menu__item',
                    item.danger && 'context-menu__item--danger',
                    item.disabled && 'is-disabled',
                    isHovered && 'is-hovered',
                    hasSubmenu && 'context-menu__item--has-submenu'
                )}
                role="menuitem"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                aria-disabled={item.disabled}
                aria-haspopup={hasSubmenu}
                aria-expanded={isHovered}
                {...props}
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
                        y={-4}
                        onClose={onClose}
                        isRoot={false}
                    />
                )}
            </li>
        );
    });
ContextMenuItem.displayName = 'ContextMenuItem';

