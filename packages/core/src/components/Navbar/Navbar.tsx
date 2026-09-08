import './Navbar.scss';
import React, {createContext, type CSSProperties, forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import type {Alignment, FullVariant} from '../../types/types';
import type {PolymorphicProps, PolymorphicRef} from '../../types/polymorphic';

interface NavbarContextType {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
    id: string;
}

const NavbarContext = createContext<NavbarContextType | null>(null);

function useNavbarContext() {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('Navbar compound components must be rendered within a Navbar');
    }
    return context;
}


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
    const generatedId = useMemo(() => `lyco-navbar-${Math.random().toString(36).substr(2, 9)}`, []);
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
                    isBaseVariant ? `navbar--${variant}` : `navbar-variant ${dim ? 'navbar-dim' : 'navbar-solid'}`,
                    `navbar-elevation-${elevation}`,
                    position !== 'static' && `navbar--${position}`,
                    expand !== 'never' && `navbar--expand-${expand}`,
                    isPredefinedSize && `navbar--${size}`,
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
                <div className="navbar__container">
                    {children}
                </div>
            </nav>
        </NavbarContext.Provider>
    );
});
NavbarComponent.displayName = 'Navbar';


export type NavbarBrandProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, {
    /** Centers the brand absolutely within the navbar */
    centered?: boolean;
}>;

type NavbarBrandComponent = <C extends React.ElementType = 'a'>(props: NavbarBrandProps<C> & { ref?: PolymorphicRef<C> }) => React.ReactElement;

const NavbarBrand = forwardRef((
    {className, as, centered, children, ...props}: any,
    ref: any
) => {
    const Component = as || 'a';
    return (
        <Component
            ref={ref}
            className={clsx('navbar__brand', centered && 'navbar__brand--centered', className)}
            {...props}
        >
            {children}
        </Component>
    );
}) as any as NavbarBrandComponent & { displayName?: string };
NavbarBrand.displayName = 'Navbar.Brand';


export interface NavbarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const NavbarToggle = forwardRef<HTMLButtonElement, NavbarToggleProps>((
    {className, onClick, 'aria-controls': ariaControls, ...props},
    ref
) => {
    const {isOpen, toggle, id} = useNavbarContext();

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        toggle();
        onClick?.(e);
    }, [toggle, onClick]);

    return (
        <button
            ref={ref}
            type="button"
            className={clsx('navbar__toggle', className)}
            onClick={handleClick}
            aria-expanded={isOpen}
            aria-controls={ariaControls || `${id}-collapse`}
            aria-label="Toggle navigation"
            {...props}
        >
            <span/>
            <span/>
            <span/>
        </button>
    );
});
NavbarToggle.displayName = 'Navbar.Toggle';


export interface NavbarCollapseProps extends React.HTMLAttributes<HTMLDivElement> {
}

const NavbarCollapse = forwardRef<HTMLDivElement, NavbarCollapseProps>((
    {className, children, id: propId, ...props},
    ref
) => {
    const {isOpen, id: contextId} = useNavbarContext();
    const id = propId || `${contextId}-collapse`;

    return (
        <div
            ref={ref}
            className={clsx('navbar__collapse', isOpen && 'is-open', className)}
            id={id}
            {...props}
        >
            <div className="navbar__collapse-inner">
                {children}
            </div>
        </div>
    );
});
NavbarCollapse.displayName = 'Navbar.Collapse';


export interface NavbarNavProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Alignment of the nav items */
    align?: Alignment;
}

const NavbarNav = forwardRef<HTMLUListElement, NavbarNavProps>((
    {className, children, align = 'start', ...props},
    ref
) => {
    return (
        <ul
            ref={ref}
            className={clsx('navbar__nav', `navbar__nav--align-${align}`, className)}
            {...props}
        >
            {children}
        </ul>
    );
});
NavbarNav.displayName = 'Navbar.Nav';


export interface NavbarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
}

const NavbarItem = forwardRef<HTMLLIElement, NavbarItemProps>((
    {className, children, ...props},
    ref
) => {
    return (
        <li
            ref={ref}
            className={clsx('navbar__item', className)}
            {...props}
        >
            {children}
        </li>
    );
});
NavbarItem.displayName = 'Navbar.Item';


export type NavbarLinkProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, {
    /** Whether the link is currently active */
    active?: boolean;
}>;

type NavbarLinkComponent = <C extends React.ElementType = 'a'>(props: NavbarLinkProps<C> & { ref?: PolymorphicRef<C> }) => React.ReactElement;

const NavbarLink = forwardRef((
    {className, as, active = false, children, onClick, ...props}: any,
    ref: any
) => {
    const {close} = useNavbarContext();

    const handleClick = useCallback((e: any) => {
        close();
        if (onClick) onClick(e);
    }, [close, onClick]);

    const Component = as || 'a';

    return (
        <Component
            ref={ref}
            className={clsx('navbar__link', active && 'is-active', className)}
            aria-current={active ? 'page' : undefined}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Component>
    );
}) as any as NavbarLinkComponent & { displayName?: string };
NavbarLink.displayName = 'Navbar.Link';


const NavbarDropdownContext = createContext<{ isOpen: boolean; toggle: () => void; close: () => void } | null>(null);

export interface NavbarDropdownProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
    /** The content of the trigger button */
    title: React.ReactNode;
    /** If true, strips default padding/background from the trigger button for custom trigger layouts */
    unstyled?: boolean;
    /** Align the dropdown menu to the left or right of its trigger. Defaults to left. */
    align?: 'left' | 'right';
    /** Hide the default dropdown caret icon */
    hideCaret?: boolean;
}

const NavbarDropdown = forwardRef<HTMLLIElement, NavbarDropdownProps>((
    {className, title, unstyled = false, align = 'left', hideCaret = false, children, ...props},
    ref
) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    const toggle = useCallback(() => setIsOpen(p => !p), []);
    const close = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (!isOpen) return;
        const handleOutsideClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                close();
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen, close]);

    const contextValue = useMemo(() => ({isOpen, toggle, close}), [isOpen, toggle, close]);

    return (
        <NavbarDropdownContext.Provider value={contextValue}>
            <li
                ref={(node) => {
                    dropdownRef.current = node;
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLLIElement | null>).current = node;
                }}
                className={clsx('navbar__item', 'navbar__dropdown', isOpen && 'is-open', className)}
                {...props}
            >
                <button
                    type="button"
                    className={clsx('navbar__link', 'navbar__dropdown-trigger', unstyled && 'navbar__dropdown-trigger--unstyled')}
                    onClick={toggle}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    {title}
                    {!hideCaret && (
                        <svg className="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    )}
                </button>
                <div className={clsx('navbar__dropdown-menu', isOpen && 'is-open', align === 'right' && 'navbar__dropdown-menu--right')}>
                    {children}
                </div>
            </li>
        </NavbarDropdownContext.Provider>
    );
});
NavbarDropdown.displayName = 'Navbar.Dropdown';

export type NavbarDropdownItemProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, {
    /** Visual intent of the dropdown item. @default "base" */
    variant?: 'base' | 'danger' | 'success' | 'warning' | 'primary';
}>;

type NavbarDropdownItemComponent = <C extends React.ElementType = 'a'>(props: NavbarDropdownItemProps<C> & { ref?: PolymorphicRef<C> }) => React.ReactElement;

const NavbarDropdownItem = forwardRef((
    {className, as, variant = 'base', onClick, children, ...props}: any,
    ref: any
) => {
    const context = useContext(NavbarDropdownContext);

    const handleClick = useCallback((e: any) => {
        context?.close();
        if (onClick) onClick(e);
    }, [context, onClick]);

    const Component = as || 'a';

    return (
        <Component
            ref={ref}
            className={clsx('navbar__dropdown-item', variant !== 'base' && `navbar__dropdown-item--${variant}`, className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Component>
    );
}) as any as NavbarDropdownItemComponent & { displayName?: string };
NavbarDropdownItem.displayName = 'Navbar.DropdownItem';

export interface NavbarDropdownSubMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** The content of the submenu trigger */
    title: React.ReactNode;
}

const NavbarDropdownSubMenu = forwardRef<HTMLDivElement, NavbarDropdownSubMenuProps>((
    {className, title, children, ...props},
    ref
) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggle = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(p => !p);
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            if (rect.right > viewportWidth) {
                setIsFlipped(true);
            }
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsFlipped(false);
    }, []);

    return (
        <div
            ref={ref}
            className={clsx('navbar__dropdown-submenu', isFlipped && 'navbar__dropdown-submenu--flip-left', isOpen && 'is-open', className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <button
                type="button"
                className="navbar__dropdown-submenu-trigger"
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={toggle}
            >
                <span>{title}</span>
                <svg className="navbar__dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div
                ref={menuRef}
                className={clsx('navbar__dropdown-menu navbar__dropdown-menu--nested', isOpen && 'is-open')}
            >
                {children}
            </div>
        </div>
    );
});
NavbarDropdownSubMenu.displayName = 'Navbar.DropdownSubMenu';

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
