import './Navbar.scss';
import React, {type CSSProperties, forwardRef, useCallback, useEffect, useId, useMemo, useState} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types';
import {NavbarContext} from './NavbarContext';
import {NavbarContainer} from './NavbarRegions';

import {NavbarBrand, NavbarCollapse, NavbarDropdown, NavbarDropdownItem, NavbarDropdownSubMenu, NavbarItem, NavbarLink, NavbarNav, NavbarToggle} from './NavbarRegions';
export type {NavbarBrandProps, NavbarCollapseProps, NavbarDropdownItemProps, NavbarDropdownProps, NavbarDropdownSubMenuProps, NavbarItemProps, NavbarLinkProps, NavbarNavProps, NavbarToggleProps} from './NavbarRegions';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    /** Visual color variant */
    variant?: 'base' | 'dark' | 'light' | 'transparent' | FullVariant;
    /** Use dim version of the color variant */
    dim?: boolean;
    /** Shadow elevation */
    elevation?: '0' | '1' | '2' | '3' | '4';
    /** Positioning of the navbar */
    position?: 'static' | 'sticky' | 'fixed';
    /** Breakpoint at which the navbar expands from mobile to desktop */
    expand?: 'sm' | 'md' | 'lg' | 'xl' | 'always' | 'never';
    /** Defines the fixed height of the navbar. @default "md" */
    size?: 'sm' | 'md' | 'lg' | number | string;
}

const NavbarComponent = forwardRef<HTMLElement, NavbarProps>((
    {
        className,
        children,
        variant = 'base',
        dim = false,
        elevation = '1',
        position = 'static',
        expand = 'lg',
        size = 'md',
        id: propId,
        ...props
    },
    ref
) => {
    const [isOpen, setIsOpen] = useState(false);
    const generatedId = `lyco-navbar-${useId().replace(/:/g, '')}`;
    const id = propId || generatedId;

    const toggle = useCallback(() => setIsOpen(prev => !prev), []);
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (e: MouseEvent) => {
            const navElement = document.getElementById(id);
            if (navElement && !navElement.contains(e.target as Node)) {
                close();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen, id, close]);

    const contextValue = useMemo(() => ({isOpen, toggle, close, id}), [isOpen, toggle, close, id]);

    const isBaseVariant = ['base', 'dark', 'light', 'transparent'].includes(variant);
    const isPredefinedSize = size === 'sm' || size === 'md' || size === 'lg';

    const customSizeStyle = !isPredefinedSize && size
        ? { ['--navbar-height' as string]: typeof size === 'number' ? `${size}px` : size }
        : {};

    return (
        <NavbarContext.Provider value={contextValue}>
            <nav
                ref={ref}
                className={clsx(
                    'navbar',
                    isBaseVariant ? `navbar-${variant}` : `navbar-variant ${dim ? 'navbar-dim' : 'navbar-solid'}`,
                    `navbar-elevation-${elevation}`,
                    position !== 'static' && `navbar-${position}`,
                    expand !== 'never' && `navbar-expand-${expand}`,
                    isPredefinedSize && `navbar-${size}`,
                    className
                )}
                id={id}
                style={{
                    ...(!isBaseVariant && {
                        '--navbar-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                        '--navbar-color-dim': `color-mix(in srgb, var(--${variant}-500, var(--color-${variant})) 15%, transparent)`,
                    }),
                    ...customSizeStyle,
                    ...props.style
                } as CSSProperties}
                {...props}
            >
                <NavbarContainer>{children}</NavbarContainer>
            </nav>
        </NavbarContext.Provider>
    );
});
NavbarComponent.displayName = 'Navbar';


export const Navbar = Object.assign(NavbarComponent, {
    Brand: NavbarBrand,
    Toggle: NavbarToggle,
    Collapse: NavbarCollapse,
    Nav: NavbarNav,
    Item: NavbarItem,
    Link: NavbarLink,
    Dropdown: NavbarDropdown,
    DropdownSubMenu: NavbarDropdownSubMenu,
    DropdownItem: NavbarDropdownItem,
});
