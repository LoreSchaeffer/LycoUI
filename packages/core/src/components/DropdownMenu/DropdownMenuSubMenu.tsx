import React, {forwardRef, useCallback, useRef, useState} from 'react';

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
                className={`dropdown-submenu ${isFlipped ? 'dropdown-submenu-flip-left' : ''} ${className}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <button
                    type="button"
                    className="dropdown-submenu-trigger"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    <span>{title}</span>
                    <svg className="dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <div
                    ref={menuRef}
                    className={`dropdown-submenu-content ${isOpen ? 'is-open' : ''}`}
                >
                    {children}
                </div>
            </div>
        );
    }
);
DropdownMenuSubMenu.displayName = 'DropdownMenuSubMenu';
