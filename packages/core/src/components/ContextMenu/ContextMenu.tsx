import React, { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { ContextMenuItemDef } from './ContextMenuContext';
import { ContextMenuItem } from './ContextMenuItem';
import './ContextMenu.scss';

export interface ContextMenuProps {
    items: ContextMenuItemDef[];
    x: number | string;
    y: number | string;
    onClose: () => void;
    isRoot?: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, x, y, onClose, isRoot = false }) => {
    const menuRef = useRef<HTMLUListElement>(null);
    const [position, setPosition] = useState<{ top: number | string, left: number | string, right?: number | string }>({ top: y, left: x });
    const [opacity, setOpacity] = useState(0); 

    useLayoutEffect(() => {
        if (!menuRef.current) return;
        
        const rect = menuRef.current.getBoundingClientRect();
        
        if (isRoot) {
            let newLeft = typeof x === 'number' ? x : 0;
            let newTop = typeof y === 'number' ? y : 0;

            if (newLeft + rect.width > window.innerWidth) {
                // Flip to the left of the cursor
                newLeft = newLeft - rect.width;
            }

            if (newTop + rect.height > window.innerHeight) {
                // Flip upwards from the cursor
                newTop = newTop - rect.height;
            }

            setPosition({ top: Math.max(8, newTop), left: Math.max(8, newLeft) });
        } else {
            // It's a submenu. The initial position (e.g. left: 100%, top: 0) is applied.
            // We check if it overflows the window.
            let rightOverflow = rect.right > window.innerWidth;
            let bottomOverflow = rect.bottom > window.innerHeight;
            
            const newPos: any = { top: y, left: x };

            if (rightOverflow) {
                newPos.left = 'auto';
                newPos.right = '100%';
            }

            if (bottomOverflow) {
                // Shift it up by the overflow amount
                const overflowAmount = rect.bottom - window.innerHeight + 8;
                // If y is 0 (relative), we can just apply a negative top margin or transform, 
                // but setting a negative top is easiest.
                newPos.top = `calc(0px - ${overflowAmount}px)`;
            }

            setPosition(newPos);
        }
        
        setOpacity(1);
    }, [x, y, isRoot]);

    return (
        <ul 
            className="context-menu" 
            ref={menuRef}
            style={{ 
                ...position,
                opacity,
                position: isRoot ? 'fixed' : 'absolute'
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            {items.map((item, idx) => (
                <ContextMenuItem 
                    key={item.id || idx} 
                    item={item} 
                    onClose={onClose} 
                />
            ))}
        </ul>
    );
};
