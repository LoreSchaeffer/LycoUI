import './DropdownMenu.scss';
import React, {forwardRef, useCallback, useRef} from 'react';
import {DropdownMenuContext} from './DropdownMenuContext';
import {useControllableState} from '../../hooks/useControllableState';
import {classContract} from '../../styles/class-contract';

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
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useControllableState({
        value: controlledIsOpen,
        defaultValue: false,
        onChange: onOpenChange
    });

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        triggerRef.current?.focus();
    }, [setIsOpen]);

    return (
        <DropdownMenuContext.Provider value={{isOpen, setIsOpen, closeMenu, triggerRef}}>
            <div className={classContract.dropdown.root}>
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
                className={`${classContract.dropdown.trigger} ${isOpen ? 'is-open' : ''} ${className}`}
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
export {DropdownMenuContent, type DropdownMenuContentProps} from './DropdownMenuContent';
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
                className={`${classContract.dropdown.item} ${disabled ? 'is-disabled' : ''} ${destructive ? 'dropdown-item-destructive' : ''} ${className}`}
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
                className={`${classContract.dropdown.divider} ${className}`}
                {...props}
            />
        );
    }
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/**
 * Props for the DropdownMenuSubMenu component.
 */
export {DropdownMenuSubMenu, type DropdownMenuSubMenuProps} from './DropdownMenuSubMenu';


