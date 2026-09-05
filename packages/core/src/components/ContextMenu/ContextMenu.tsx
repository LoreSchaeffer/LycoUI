import React, {useLayoutEffect, useRef, useState} from 'react';
import {useKeyboardNav} from '../../hooks/useKeyboardNav';
import type {ContextMenuItemDef} from './ContextMenuContext';
import {ContextMenuItem} from './ContextMenuItem';
import './ContextMenu.scss';

/**
 * Props for the ContextMenu component.
 */
export interface ContextMenuProps extends React.HTMLAttributes<HTMLUListElement> {
    /** List of items to display in the menu */
    items: ContextMenuItemDef[];
    /** X coordinate for the menu's position */
    x: number | string;
    /** Y coordinate for the menu's position */
    y: number | string;
    /** Callback fired when the menu should close */
    onClose: () => void;
    /** True if this is the root context menu, determining boundary checks */
    isRoot?: boolean;
}

/**
 * ContextMenu component.
 */
export const ContextMenu = React.forwardRef<HTMLUListElement, ContextMenuProps>(
    ({items, x, y, onClose, isRoot = false, ...props}, ref) => {
        const internalRef = useRef<HTMLUListElement>(null);
        const [position, setPosition] = useState<{ top: number | string, left: number | string, right?: number | string }>({top: y, left: x});
        const [opacity, setOpacity] = useState(0);

        useLayoutEffect(() => {
            if (!internalRef.current) return;

            const rect = internalRef.current.getBoundingClientRect();

            if (isRoot) {
                let newLeft = typeof x === 'number' ? x : 0;
                let newTop = typeof y === 'number' ? y : 0;

                if (newLeft + rect.width > window.innerWidth) {
                    newLeft = newLeft - rect.width;
                }

                if (newTop + rect.height > window.innerHeight) {
                    newTop = newTop - rect.height;
                }

                setPosition({top: Math.max(8, newTop), left: Math.max(8, newLeft)});
            } else {
                let rightOverflow = rect.right > window.innerWidth;
                let bottomOverflow = rect.bottom > window.innerHeight;

                const newPos: { top: number | string, left: number | string, right?: number | string } = {top: y, left: x};

                if (rightOverflow) {
                    newPos.left = 'auto';
                    newPos.right = '100%';
                }

                if (bottomOverflow) {
                    const overflowAmount = rect.bottom - window.innerHeight + 8;
                    newPos.top = `calc(0px - ${overflowAmount}px)`;
                }

                setPosition(newPos);
            }

            setOpacity(1);
        }, [x, y, isRoot]);

        const setRefs = (node: HTMLUListElement | null) => {
            internalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLUListElement | null>).current = node;
        };

        const handleKeyDown = useKeyboardNav({
            horizontal: false,
            itemSelector: ':scope > [role="menuitem"]:not(.is-disabled)'
        });

        return (
            <ul
                ref={setRefs}
                className="context-menu"
                role="menu"
                style={{
                    ...position,
                    opacity,
                    position: isRoot ? 'fixed' : 'absolute'
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onKeyDown={(e) => {
                    handleKeyDown(e);
                    props.onKeyDown?.(e);
                }}
                {...props}
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
    });
ContextMenu.displayName = 'ContextMenu';
