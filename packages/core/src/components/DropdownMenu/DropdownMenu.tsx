import './DropdownMenu.scss';
import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import {DropdownMenuContext} from './DropdownMenuContext';
import {useKeyboardNav} from '../../hooks/useKeyboardNav';

/**
 * Props for the DropdownMenu component.
 */
export interface DropdownMenuProps {
    children: React.ReactNode;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

/**
 * DropdownMenu component.
 * A UI component for LycoUI.
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({children, isOpen: controlledIsOpen, onOpenChange}) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

    const setIsOpen = useCallback((newIsOpen: boolean) => {
        if (!isControlled) {
            setUncontrolledIsOpen(newIsOpen);
        }
        onOpenChange?.(newIsOpen);
    }, [isControlled, onOpenChange]);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        triggerRef.current?.focus();
    }, [setIsOpen]);

    return (
        <DropdownMenuContext.Provider value={{isOpen, setIsOpen, closeMenu, triggerRef}}>
            <div className="dropdown-menu">
                {children}
            </div>
        </DropdownMenuContext.Provider>
    );
};
DropdownMenu.displayName = 'DropdownMenu';

/**
 * Props for the DropdownMenuTrigger component.
 */
export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    asChild?: boolean;
}

/**
 * DropdownMenuTrigger component.
 * A UI component for LycoUI.
 */
export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
    ({children, asChild, onClick, className = '', ...props}, ref) => {
        const context = React.useContext(DropdownMenuContext);
        if (!context) throw new Error('DropdownMenuTrigger must be used within DropdownMenu');

        const {isOpen, setIsOpen, triggerRef} = context;

        const handleRef = (node: HTMLButtonElement) => {
            triggerRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            setIsOpen(!isOpen);
            onClick?.(e);
        };

        if (asChild) {
            if (!React.isValidElement(children)) {
                console.error('DropdownMenuTrigger with asChild=true requires a single React Element as a child.');
                return null;
            }

            const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;

            return React.cloneElement(child, {
                ref: (node: HTMLElement) => {
                    handleRef(node as HTMLButtonElement);
                    const childRef = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
                    if (typeof childRef === 'function') {
                        childRef(node);
                    } else if (childRef) {
                        (childRef as React.MutableRefObject<HTMLElement>).current = node;
                    }
                },
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
                    if (child.props.onClick) {
                        child.props.onClick(e);
                    }
                },
                'aria-haspopup': 'menu',
                'aria-expanded': isOpen,
                ...props
            } as React.HTMLAttributes<HTMLElement>);
        }

        return (
            <button
                ref={handleRef}
                className={`dropdown-menu__trigger ${isOpen ? 'is-open' : ''} ${className}`}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={handleClick}
                {...props}
            >
                {children}
            </button>
        );
    }
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

/**
 * Props for the DropdownMenuContent component.
 */
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

        return (
            <div
                ref={handleRef}
                className={`dropdown-menu__content ${className}`}
                role="menu"
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </div>
        );
    }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

/**
 * Props for the DropdownMenuItem component.
 */
export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    disabled?: boolean;
    destructive?: boolean;
}

/**
 * DropdownMenuItem component.
 * A UI component for LycoUI.
 */
export const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
    ({children, disabled = false, destructive = false, className = '', onClick, onKeyDown, ...props}, ref) => {
        const context = React.useContext(DropdownMenuContext);
        if (!context) throw new Error('DropdownMenuItem must be used within DropdownMenu');

        const {closeMenu} = context;

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) {
                e.preventDefault();
                return;
            }
            onClick?.(e);
            closeMenu();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (disabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
            }
            onKeyDown?.(e);
        };

        return (
            <button
                ref={ref}
                type="button"
                role="menuitem"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
                disabled={disabled}
                className={`dropdown-menu__item ${disabled ? 'is-disabled' : ''} ${destructive ? 'dropdown-menu__item--destructive' : ''} ${className}`}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </button>
        );
    }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

/**
 * Props for the DropdownMenuSeparator component.
 */
export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
}

/**
 * DropdownMenuSeparator component.
 * A UI component for LycoUI.
 */
export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
    ({className = '', ...props}, ref) => {
        return (
            <div
                ref={ref}
                role="separator"
                className={`dropdown-menu__separator ${className}`}
                {...props}
            />
        );
    }
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/**
 * Props for the DropdownMenuSubMenu component.
 */
export interface DropdownMenuSubMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The content of the submenu trigger */
    title: React.ReactNode;
}

/**
 * DropdownMenuSubMenu component.
 * A UI component for LycoUI.
 */
export const DropdownMenuSubMenu = forwardRef<HTMLDivElement, DropdownMenuSubMenuProps>(
    ({className = '', title, children, ...props}, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isFlipped, setIsFlipped] = useState(false);
        const menuRef = useRef<HTMLDivElement>(null);

        const handleMouseEnter = useCallback(() => {
            if (menuRef.current) {
                const rect = menuRef.current.getBoundingClientRect();
                const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (rect.right > viewportWidth) {
                    setIsFlipped(true);
                }
            }
            setIsOpen(true);
        }, []);

        const handleMouseLeave = useCallback(() => {
            setIsFlipped(false);
            setIsOpen(false);
        }, []);

        return (
            <div
                ref={ref}
                className={`dropdown-menu__submenu ${isFlipped ? 'dropdown-menu__submenu--flip-left' : ''} ${className}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <button
                    type="button"
                    className="dropdown-menu__submenu-trigger"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    <span>{title}</span>
                    <svg className="dropdown-menu__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <div
                    ref={menuRef}
                    className={`dropdown-menu__submenu-content ${isOpen ? 'is-open' : ''}`}
                >
                    {children}
                </div>
            </div>
        );
    }
);
DropdownMenuSubMenu.displayName = 'DropdownMenuSubMenu';
