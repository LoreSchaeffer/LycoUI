import React, {forwardRef, useCallback, useContext, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import {Button} from '../Button/Button';
import {computeSideFlyoutPosition} from '../../utils/floating';
import type {PolymorphicProps, PolymorphicRef} from '../../types/polymorphic';
import {SidebarContext} from './SidebarContext';

export interface SidebarRegionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarRegionProps>((
    {className, children, ...props},
    ref
) => (
    <div ref={ref} className={clsx('sidebar-header', 'sidebar-header', className)} {...props}>
        {children}
    </div>
));
SidebarHeader.displayName = 'Sidebar.Header';

export const SidebarContent = forwardRef<HTMLDivElement, SidebarRegionProps>((
    {className, children, ...props},
    ref
) => (
    <div ref={ref} className={clsx('sidebar-content', 'sidebar-content', className)} {...props}>
        {children}
    </div>
));
SidebarContent.displayName = 'Sidebar.Content';

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarRegionProps>((
    {className, children, ...props},
    ref
) => (
    <div ref={ref} className={clsx('sidebar-footer', 'sidebar-footer', className)} {...props}>
        {children}
    </div>
));
SidebarFooter.displayName = 'Sidebar.Footer';


/**
 * SidebarNavProps.
 */
export interface SidebarNavProps extends React.HTMLAttributes<HTMLUListElement> {
}

export const SidebarNav = forwardRef<HTMLUListElement, SidebarNavProps>((
    {className, children, ...props},
    ref
) => (
    <ul ref={ref} className={clsx('sidebar-nav', 'sidebar-nav', className)} {...props}>
        {children}
    </ul>
));
SidebarNav.displayName = 'Sidebar.Nav';

/**
 * SidebarItemProps.
 */
export interface SidebarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
}

export const SidebarItem = forwardRef<HTMLLIElement, SidebarItemProps>((
    {className, children, ...props},
    ref
) => (
    <li ref={ref} className={clsx('sidebar-item', 'sidebar-item', className)} {...props}>
        {children}
    </li>
));
SidebarItem.displayName = 'Sidebar.Item';


/**
 * SidebarLinkProps. Polymorphic: pass `as` to render a custom component (e.g. a router Link).
 */
export type SidebarLinkProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, {
    /** Active state */
    active?: boolean;
    /** Optional icon element */
    icon?: React.ReactNode;
}>;

type SidebarLinkComponent = <C extends React.ElementType = 'a'>(props: SidebarLinkProps<C> & { ref?: PolymorphicRef<C> }) => React.ReactElement;

type SidebarLinkInnerProps = React.ComponentPropsWithoutRef<'a'> & {
    as?: React.ElementType;
    active?: boolean;
    icon?: React.ReactNode;
};

function extractInitials(children: React.ReactNode): string {
    let text = '';
    React.Children.forEach(children, child => {
        if (typeof child === 'string') text += child;
        else if (typeof child === 'number') text += child.toString();
    });

    const words = text.trim().split(/\\s+/);
    if (words.length === 0 || !words[0]) return '';
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + (words[1]?.[0] || '')).toUpperCase();
}

export const SidebarLink = forwardRef<HTMLElement, SidebarLinkInnerProps>((
    {className, as: Component = 'a', active = false, icon, children, ...props},
    ref
) => {
    const context = useContext(SidebarContext);
    const isMini = context?.isMini || false;

    const renderedIcon = useMemo(() => {
        if (icon) return icon;
        return extractInitials(children);
    }, [icon, children]);

    return (
        <Component
            ref={ref}
            className={clsx('sidebar-link', 'sidebar-link', active && 'is-active', className)}
            aria-current={active ? 'page' : undefined}
            {...props}
        >
            <span className="sidebar-icon sidebar-icon">{renderedIcon}</span>
            {!isMini && <span className="sidebar-label sidebar-label">{children}</span>}
        </Component>
    );
}) as unknown as SidebarLinkComponent & { displayName?: string };
SidebarLink.displayName = 'Sidebar.Link';


/**
 * SidebarIconProps.
 */
export interface SidebarIconProps extends React.HTMLAttributes<HTMLSpanElement> {
}

export const SidebarIcon = forwardRef<HTMLSpanElement, SidebarIconProps>((
    {className, children, ...props},
    ref
) => (
    <span ref={ref} className={clsx('sidebar-icon', 'sidebar-icon', className)} {...props}>
        {children}
    </span>
));
SidebarIcon.displayName = 'Sidebar.Icon';

/**
 * SidebarLabelProps.
 */
export interface SidebarLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
}

export const SidebarLabel = forwardRef<HTMLSpanElement, SidebarLabelProps>((
    {className, children, ...props},
    ref
) => (
    <span ref={ref} className={clsx('sidebar-label', 'sidebar-label', className)} {...props}>
        {children}
    </span>
));
SidebarLabel.displayName = 'Sidebar.Label';


/**
 * Props for the SidebarDropdown component.
 */
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

