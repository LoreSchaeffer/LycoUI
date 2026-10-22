import React, {forwardRef, useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {createPortal} from 'react-dom';
import {DropdownMenuContext} from './DropdownMenuContext';
import {useKeyboardNav} from '../../hooks/useKeyboardNav';

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

        const {isOpen, closeMenu, triggerRef} = context;
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
            setDropdownStyles({
                position: 'absolute',
                top: `${rect.bottom + window.scrollY + 4}px`, // +4px spacing
                left: `${rect.left + window.scrollX}px`,
                zIndex: 'var(--z-dropdown, 1050)'
            });
        }, [isOpen, triggerRef]);

        useEffect(() => {
            if (isOpen) {
                updatePosition();
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
                    closeMenu();
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

        // Focus management and keyboard navigation
        const handleKeyDown = useKeyboardNav({
            itemSelector: '[role="menuitem"]:not([aria-disabled="true"])',
            loop: true
        });

        useEffect(() => {
            if (isOpen && contentRef.current) {
                // Focus first item if available
                const firstItem = contentRef.current.querySelector('[role="menuitem"]:not([aria-disabled="true"])') as HTMLElement;
                if (firstItem) {
                    firstItem.focus();
                }
            }
        }, [isOpen]);

        if (!isOpen) return null;

        return createPortal(
            <div
                ref={handleRef}
                className={`dropdown-menu__content ${className}`}
                role="menu"
                onKeyDown={handleKeyDown}
                style={{ ...dropdownStyles, ...props.style }}
                {...props}
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
