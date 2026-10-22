import React, {forwardRef} from 'react';
import clsx from 'clsx';

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
export {SidebarLink} from './SidebarLink';
export type {SidebarLinkProps} from './SidebarLink';
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
export {SidebarDropdown, SidebarDropdownItem} from './SidebarDropdown';
export type {SidebarDropdownItemProps, SidebarDropdownProps} from './SidebarDropdown';
