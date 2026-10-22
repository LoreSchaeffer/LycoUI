import React, {forwardRef, useContext, useMemo} from 'react';
import clsx from 'clsx';
import type {PolymorphicProps, PolymorphicRef} from '../../types/polymorphic';
import {SidebarContext} from './SidebarContext';

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
