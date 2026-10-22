import React, {forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties} from 'react';
import {createPortal} from 'react-dom';
import {DropdownMenuContext} from './DropdownMenuContext';
import {useKeyboardNav} from '../../hooks/useKeyboardNav';
import {classContract} from '../../styles/class-contract';

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

/**
 * DropdownMenuContent component.
 * A UI component for LycoUI.
 */
export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
    ({children, className = '', ...props}, ref) => {
        const context = React.useContext(DropdownMenuContext);
        if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu');

        const {isOpen, menuId, closeMenu, triggerRef} = context;
        const contentRef = useRef<HTMLDivElement>(null);

        const handleRef = (node: HTMLDivElement) => {
            contentRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        const [dropdownStyles, setDropdownStyles] = useState<CSSProperties>({});

        const updatePosition = useCallback(() => {
            if (!isOpen || !triggerRef.current) return;
            const rect = triggerRef.current.getBoundingClientRect();
            const nextStyles: CSSProperties = {
                position: 'absolute',
                top: `${rect.bottom + window.scrollY + 4}px`, // +4px spacing
                left: `${rect.left + window.scrollX}px`,
                zIndex: 'var(--z-dropdown, 1050)'
            };
            if (contentRef.current) {
                contentRef.current.style.position = 'absolute';
                contentRef.current.style.top = nextStyles.top as string;
                contentRef.current.style.left = nextStyles.left as string;
                contentRef.current.style.zIndex = nextStyles.zIndex as string;
            }
            setDropdownStyles(nextStyles);
        }, [isOpen, triggerRef]);

        useLayoutEffect(() => {
            if (isOpen) {
                updatePosition();
                const firstItem = contentRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
                firstItem?.focus();
                window.addEventListener('scroll', updatePosition, true);
                window.addEventListener('resize', updatePosition);
                return () => {
                    window.removeEventListener('scroll', updatePosition, true);
                    window.removeEventListener('resize', updatePosition);
                };
            }
        }, [isOpen, updatePosition]);

        // Click outside to close
        useEffect(() => {
            if (!isOpen) return;

            const handleDocumentClick = (e: MouseEvent) => {
                if (
                    contentRef.current &&
                    !contentRef.current.contains(e.target as Node) &&
                    triggerRef.current &&
                    !triggerRef.current.contains(e.target as Node)
                ) {
                    closeMenu(false);
                }
            };

            document.addEventListener('mousedown', handleDocumentClick);
            return () => document.removeEventListener('mousedown', handleDocumentClick);
        }, [isOpen, closeMenu, triggerRef]);

        // Escape to close
        useEffect(() => {
            if (!isOpen) return;
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    closeMenu();
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }, [isOpen, closeMenu]);

        // Keyboard navigation
        const handleKeyDown = useKeyboardNav({
            itemSelector: '[role="menuitem"]:not([aria-disabled="true"])',
            loop: true
        });

        if (!isOpen) return null;

        return createPortal(
            <div
                ref={handleRef}
                className={`${classContract.dropdown.menu} ${className}`}
                role="menu"
                onKeyDown={handleKeyDown}
                style={{ ...dropdownStyles, ...props.style }}
                {...props}
                id={menuId}
            >
                {children}
            </div>,
            document.body
        );
    }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

/**
 * Props for the DropdownMenuItem component.
 */
