import React, {forwardRef, useCallback, useContext, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import {Button} from '../Button/Button';
import {computeSideFlyoutPosition} from '../../utils/floating';
import type {PolymorphicProps, PolymorphicRef} from '../../types/polymorphic';
import {SidebarContext} from './SidebarContext';

function extractInitials(children: React.ReactNode): string {
  const text = React.Children.toArray(children).filter((child): child is string | number => typeof child === 'string' || typeof child === 'number').join('');
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length < 2 ? (words[0] ?? '').slice(0, 2).toUpperCase() : `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}`.toUpperCase();
}

export interface SidebarDropdownProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
    title: React.ReactNode;
    icon?: React.ReactNode;
}

export const SidebarDropdown = forwardRef<HTMLLIElement, SidebarDropdownProps>((
    {className, title, icon, children, ...props},
    ref
) => {
    const context = useContext(SidebarContext);
    const isMini = context?.isMini || false;
    const [isOpen, setIsOpen] = useState(false);
    const [flyoutStyle, setFlyoutStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLButtonElement>(null);
    const flyoutRef = useRef<HTMLDivElement>(null);

    const renderedIcon = useMemo(() => {
        if (icon) return icon;
        return extractInitials(title);
    }, [icon, title]);

    const toggle = useCallback((e: React.MouseEvent) => {
        if (isMini) return;
        e.preventDefault();
        setIsOpen(p => !p);
    }, [isMini]);

    const updateFlyoutPosition = useCallback(() => {
        if (!isMini || !triggerRef.current || !flyoutRef.current) return;
        setFlyoutStyle({
            position: 'fixed',
            width: '12rem',
            margin: 0,
            ...computeSideFlyoutPosition(triggerRef.current, flyoutRef.current),
        });
    }, [isMini]);

    return (
        <li
            ref={ref}
            className={clsx('sidebar-item', 'sidebar-item', 'sidebar-dropdown', 'sidebar-dropdown', isOpen && 'is-open', className)}
            onMouseEnter={updateFlyoutPosition}
            onFocus={updateFlyoutPosition}
            {...props}
        >
            <Button
                ref={triggerRef as React.Ref<HTMLButtonElement>}
                type="button"
                ghost
                className="sidebar-dropdown-trigger sidebar-dropdown-trigger"
                onClick={toggle}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="sidebar-icon sidebar-icon">{renderedIcon}</span>
                {!isMini && <span className="sidebar-label sidebar-label">{title}</span>}
                {!isMini && <svg className="sidebar-dropdown-caret sidebar-dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>}
            </Button>
            <div ref={flyoutRef} className="sidebar-dropdown-menu-wrapper sidebar-dropdown-menu-wrapper" style={isMini ? flyoutStyle : undefined}>
                <div className="sidebar-dropdown-menu sidebar-dropdown-menu">
                    {children}
                </div>
            </div>
        </li>
    );
});
SidebarDropdown.displayName = 'Sidebar.Dropdown';


/**
 * Props for the SidebarDropdownItem component. Polymorphic via `as`.
 */
export type SidebarDropdownItemProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, {
    active?: boolean;
    disabled?: boolean;
    /** Visual intent of the dropdown item. @default "default" */
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}>;

type SidebarDropdownItemComponent = <C extends React.ElementType = 'a'>(props: SidebarDropdownItemProps<C> & { ref?: PolymorphicRef<C> }) => React.ReactElement;

type SidebarDropdownItemInnerProps = React.ComponentPropsWithoutRef<'a'> & {
    as?: React.ElementType;
    active?: boolean;
    disabled?: boolean;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
};

export const SidebarDropdownItem = forwardRef<HTMLElement, SidebarDropdownItemInnerProps>((
    {className, as: Component = 'a', active, disabled, variant = 'default', children, ...props},
    ref
) => {
    return (
        <Component
            ref={ref}
            className={clsx(
                'sidebar-dropdown-item',
                'sidebar-dropdown-item',
                variant !== 'default' && `sidebar-dropdown-item--${variant}`,
                active && 'is-active',
                disabled && 'is-disabled',
                className
            )}
            aria-current={active ? 'page' : undefined}
            aria-disabled={disabled ? 'true' : undefined}
            tabIndex={disabled ? -1 : props.tabIndex}
            {...props}
        >
            {children}
        </Component>
    );
}) as unknown as SidebarDropdownItemComponent & { displayName?: string };
SidebarDropdownItem.displayName = 'Sidebar.DropdownItem';

/**
 * Sidebar component.
 */

