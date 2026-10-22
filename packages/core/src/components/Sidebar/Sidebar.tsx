import './Sidebar.scss';
import React, {forwardRef, useMemo} from 'react';
import clsx from 'clsx';
import {useSidebarResize} from './useSidebarResize';
import {SidebarContext} from './SidebarContext';


/**
 * SidebarProps.
 */
import {SidebarContent, SidebarDropdown, SidebarDropdownItem, SidebarFooter, SidebarHeader, SidebarIcon, SidebarItem, SidebarLabel, SidebarLink, SidebarNav} from './SidebarRegions';
export type {SidebarDropdownItemProps, SidebarDropdownProps, SidebarIconProps, SidebarItemProps, SidebarLabelProps, SidebarLinkProps, SidebarNavProps, SidebarRegionProps} from './SidebarRegions';
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    /** Controls if the sidebar is open (for overlay mode) */
    isOpen?: boolean;
    /** Controls if the sidebar is in mini (icon-only) mode */
    isMini?: boolean;
    /** Scale factor applied to icons when in mini mode (e.g., 1.25 for 125% zoom) */
    miniIconScale?: number;
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
        miniIconScale,
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
    const resize = useSidebarResize({initialWidth: defaultWidth, minWidth, maxWidth});

    const contextValue = useMemo(() => ({isMini}), [isMini]);

    const sidebarStyle = useMemo(() => {
        const customStyle: React.CSSProperties & Record<string, string | number | undefined> = {
            ...style,
            '--sidebar-width': `${resize.width}px`
        };

        if (miniIconScale !== undefined) {
            customStyle['--sidebar-mini-icon-scale'] = miniIconScale;
        }

        return customStyle as React.CSSProperties;
    }, [resize.width, miniIconScale, style]);

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
                    `sidebar-${variant}`,
                    isOpen && 'is-open',
                    isMini && 'is-mini',
                    resize.isResizing && 'sidebar-resizing',
                    className
                )}
                style={sidebarStyle}
                {...props}
            >
                {children}
                {resizable && !isMini && (
                    <div
                        className="sidebar-resizer sidebar-resizer"
                        onPointerDown={isMini ? undefined : resize.begin}
                        onPointerMove={resize.move}
                        onPointerUp={resize.end}
                        onPointerCancel={resize.end}
                        onKeyDown={resize.keyboard}
                        role="separator"
                        tabIndex={0}
                        aria-orientation="vertical"
                        aria-valuemin={minWidth}
                        aria-valuemax={maxWidth}
                        aria-valuenow={resize.width}
                    />
                )}
            </aside>
        </SidebarContext.Provider>
    );
});
SidebarComponent.displayName = 'Sidebar';


/**
 * SidebarRegionProps.
 */
export const Sidebar = Object.assign(SidebarComponent, {
    Header: SidebarHeader,
    Content: SidebarContent,
    Footer: SidebarFooter,
    Nav: SidebarNav,
    Item: SidebarItem,
    Link: SidebarLink,
    Icon: SidebarIcon,
    Label: SidebarLabel,
    Dropdown: SidebarDropdown,
    DropdownItem: SidebarDropdownItem,
});


