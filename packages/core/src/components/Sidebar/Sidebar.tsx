import './Sidebar.scss';
import React, { forwardRef, useState, useCallback, useMemo, createContext, useContext, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface SidebarContextType {
  isMini: boolean;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar compound components must be rendered within a Sidebar');
  }
  return context;
}

// --- Sidebar Root ---

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Controls if the sidebar is open (for overlay mode) */
  isOpen?: boolean;
  /** Controls if the sidebar is in mini (icon-only) mode */
  isMini?: boolean;
  /** Enable drag-to-resize handle */
  resizable?: boolean;
  /** Behavior variant */
  variant?: 'overlay' | 'push' | 'fixed';
  /** Called when the backdrop is clicked (in overlay mode) */
  onClose?: () => void;
  /** Default width in pixels */
  defaultWidth?: number;
  /** Minimum width in pixels */
  minWidth?: number;
  /** Maximum width in pixels */
  maxWidth?: number;
}

const SidebarComponent = forwardRef<HTMLElement, SidebarProps>((
  {
    className,
    children,
    isOpen = false,
    isMini = false,
    resizable = false,
    variant = 'fixed',
    onClose,
    defaultWidth = 256,
    minWidth = 200,
    maxWidth = 400,
    style,
    ...props
  },
  ref
) => {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMini) return;
    
    setIsResizing(true);
    startX.current = e.clientX;
    startWidth.current = width;

    const handleMouseMove = (e: MouseEvent) => {
      let newWidth = startWidth.current + (e.clientX - startX.current);
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isMini, width, minWidth, maxWidth]);

  const contextValue = useMemo(() => ({ isMini }), [isMini]);

  const sidebarStyle = useMemo(() => ({
    ...style,
    '--sidebar-width': `${width}px`
  } as React.CSSProperties), [width, style]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {variant === 'overlay' && (
        <div 
          className={clsx('sidebar-backdrop', isOpen && 'is-open')}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        ref={ref}
        className={clsx(
          'sidebar',
          `sidebar--${variant}`,
          isOpen && 'is-open',
          isMini && 'is-mini',
          isResizing && 'sidebar-resizing',
          className
        )}
        style={sidebarStyle}
        {...props}
      >
        {children}
        {resizable && !isMini && (
          <div 
            className="sidebar__resizer" 
            onMouseDown={handleMouseDown}
            aria-hidden="true"
          />
        )}
      </aside>
    </SidebarContext.Provider>
  );
});
SidebarComponent.displayName = 'Sidebar';

// --- Sidebar Regions ---

export interface SidebarRegionProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarRegionProps>((
  { className, children, ...props },
  ref
) => (
  <div ref={ref} className={clsx('sidebar__header', className)} {...props}>
    {children}
  </div>
));
SidebarHeader.displayName = 'Sidebar.Header';

const SidebarContent = forwardRef<HTMLDivElement, SidebarRegionProps>((
  { className, children, ...props },
  ref
) => (
  <div ref={ref} className={clsx('sidebar__content', className)} {...props}>
    {children}
  </div>
));
SidebarContent.displayName = 'Sidebar.Content';

const SidebarFooter = forwardRef<HTMLDivElement, SidebarRegionProps>((
  { className, children, ...props },
  ref
) => (
  <div ref={ref} className={clsx('sidebar__footer', className)} {...props}>
    {children}
  </div>
));
SidebarFooter.displayName = 'Sidebar.Footer';

// --- Sidebar Navigation ---

export interface SidebarNavProps extends React.HTMLAttributes<HTMLUListElement> {}

const SidebarNav = forwardRef<HTMLUListElement, SidebarNavProps>((
  { className, children, ...props },
  ref
) => (
  <ul ref={ref} className={clsx('sidebar__nav', className)} {...props}>
    {children}
  </ul>
));
SidebarNav.displayName = 'Sidebar.Nav';

export interface SidebarItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

const SidebarItem = forwardRef<HTMLLIElement, SidebarItemProps>((
  { className, children, ...props },
  ref
) => (
  <li ref={ref} className={clsx('sidebar__item', className)} {...props}>
    {children}
  </li>
));
SidebarItem.displayName = 'Sidebar.Item';

// --- Sidebar Link ---

export interface SidebarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Custom component to render as */
  as?: React.ElementType;
  /** Active state */
  active?: boolean;
  /** Optional icon element */
  icon?: React.ReactNode;
}

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

const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>((
  { className, as: Component = 'a', active = false, icon, children, ...props },
  ref
) => {
  const renderedIcon = useMemo(() => {
    if (icon) return icon;
    return extractInitials(children);
  }, [icon, children]);

  return (
    <Component
      ref={ref}
      className={clsx('sidebar__link', active && 'is-active', className)}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      <span className="sidebar__icon">{renderedIcon}</span>
      <span className="sidebar__label">{children}</span>
    </Component>
  );
});
SidebarLink.displayName = 'Sidebar.Link';

// Assemble compound component
export const Sidebar = Object.assign(SidebarComponent, {
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Nav: SidebarNav,
  Item: SidebarItem,
  Link: SidebarLink,
});
