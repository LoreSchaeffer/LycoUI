import './Navbar.scss';
import React, { forwardRef, useState, useCallback, useMemo, createContext, useContext, useEffect } from 'react';
import clsx from 'clsx';
import type { Alignment, FullVariant } from '../../types/types';

// Context to share state between Navbar and its children (e.g. for Collapse)
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

// --- Navbar Root ---

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
    id: propId,
    ...props
  },
  ref
) => {
  const [isOpen, setIsOpen] = useState(false);
  // Generate a stable ID for ARIA linking
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

  const contextValue = useMemo(() => ({ isOpen, toggle, close, id }), [isOpen, toggle, close, id]);
  
  const isBaseVariant = ['base', 'dark', 'light', 'transparent'].includes(variant);

  return (
    <NavbarContext.Provider value={contextValue}>
      <nav
        ref={ref}
        className={clsx(
          'navbar',
          isBaseVariant ? `navbar--${variant}` : `navbar-variant navbar-${variant} ${dim ? 'navbar-dim' : 'navbar-solid'}`,
          `navbar-elevation-${elevation}`,
          position !== 'static' && `navbar--${position}`,
          expand !== 'never' && `navbar--expand-${expand}`,
          className
        )}
        id={id}
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

// --- Navbar Brand ---

export interface NavbarBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Custom component to render as (e.g., React Router Link) */
  as?: React.ElementType;
  /** Centers the brand absolutely within the navbar */
  centered?: boolean;
}

const NavbarBrand = forwardRef<HTMLAnchorElement, NavbarBrandProps>((
  { className, as: Component = 'a', centered, children, ...props },
  ref
) => {
  return (
    <Component
      ref={ref}
      className={clsx('navbar__brand', centered && 'navbar__brand--centered', className)}
      {...props}
    >
      {children}
    </Component>
  );
});
NavbarBrand.displayName = 'Navbar.Brand';

// --- Navbar Toggle ---

export interface NavbarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const NavbarToggle = forwardRef<HTMLButtonElement, NavbarToggleProps>((
  { className, onClick, 'aria-controls': ariaControls, ...props },
  ref
) => {
  const { isOpen, toggle, id } = useNavbarContext();

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
      <span />
      <span />
      <span />
    </button>
  );
});
NavbarToggle.displayName = 'Navbar.Toggle';

// --- Navbar Collapse ---

export interface NavbarCollapseProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavbarCollapse = forwardRef<HTMLDivElement, NavbarCollapseProps>((
  { className, children, id: propId, ...props },
  ref
) => {
  const { isOpen, id: contextId } = useNavbarContext();
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

// --- Navbar Nav ---

export interface NavbarNavProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Alignment of the nav items */
  align?: Alignment;
}

const NavbarNav = forwardRef<HTMLUListElement, NavbarNavProps>((
  { className, children, align = 'start', ...props },
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

// --- Navbar Item ---

export interface NavbarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const NavbarItem = forwardRef<HTMLLIElement, NavbarItemProps>((
  { className, children, ...props },
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

// --- Navbar Link ---

export interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Custom component to render as (e.g., React Router Link) */
  as?: React.ElementType;
  /** Whether the link is currently active */
  active?: boolean;
}

const NavbarLink = forwardRef<HTMLAnchorElement, NavbarLinkProps>((
  { className, as: Component = 'a', active = false, children, onClick, ...props },
  ref
) => {
  const { close } = useNavbarContext();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    close();
    onClick?.(e);
  }, [close, onClick]);

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
});
NavbarLink.displayName = 'Navbar.Link';

// Assemble compound component
export const Navbar = Object.assign(NavbarComponent, {
  Brand: NavbarBrand,
  Toggle: NavbarToggle,
  Collapse: NavbarCollapse,
  Nav: NavbarNav,
  Item: NavbarItem,
  Link: NavbarLink,
});
