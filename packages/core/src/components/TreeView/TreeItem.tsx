import React, {forwardRef, useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import {TreeContext} from './TreeView';

/**
 * Props for the TreeItem component.
 */
export interface TreeItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'id' | 'onSelect' | 'onToggle'> {
    /** Unique identifier for the item */
    id: string;
    /** The label to display */
    label: React.ReactNode;
    /** Optional custom icon. If undefined, a default chevron is used if it has children. */
    icon?: React.ReactNode;
    /** Whether the item is expanded by default (uncontrolled) */
    defaultExpanded?: boolean;
    /** Whether the item is currently expanded (controlled) */
    expanded?: boolean;
    /** Callback fired when expansion state changes */
    onToggle?: (expanded: boolean) => void;
    /** Nested TreeItem components */
    children?: React.ReactNode;
}

const DefaultChevron = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
    </svg>
);

/**
 * TreeItem component.
 * A UI component for LycoUI.
 */
export const TreeItem = forwardRef<HTMLLIElement, TreeItemProps>(
    (
        {
            id,
            label,
            icon,
            defaultExpanded = false,
            expanded,
            onToggle,
            children,
            className,
            ...props
        },
        ref
    ) => {
        const {selectedId, onSelect} = useContext(TreeContext);

        const [isExpandedInternal, setIsExpandedInternal] = useState(defaultExpanded);
        const isExpanded = expanded !== undefined ? expanded : isExpandedInternal;
        const isSelected = selectedId === id;

        const hasChildren = React.Children.count(children) > 0;

        const handleToggle = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (hasChildren) {
                const newState = !isExpanded;
                if (expanded === undefined) {
                    setIsExpandedInternal(newState);
                }
                onToggle?.(newState);
            }
            if (onSelect) {
                onSelect(id);
            }
        };

        // When focusing the tree, the first item should be focusable
        useEffect(() => {
            // This is handled via roving tabindex, but we need an initial state
            // It will be managed by the parent, but we start with 0 for the first item, -1 for others
            // For simplicity, we can let the parent script or user tab into the first item.
            // By default W3C tree requires the first element to have tabindex 0 initially.
        }, []);

        return (
            <li
                ref={ref}
                className={clsx('treeview__item', className)}
                role="treeitem"
                aria-expanded={hasChildren ? isExpanded : undefined}
                aria-selected={isSelected}
                tabIndex={-1} // Handled by TreeView roving tabindex
                id={id}
                {...props}
            >
                <div
                    className={clsx('treeview__item-content', {'is-selected': isSelected})}
                    onClick={handleToggle}
                >
                    <span className={clsx('treeview__icon', {'treeview__icon--chevron': !icon && hasChildren})}>
                        {icon ? icon : (hasChildren ? <DefaultChevron/> : null)}
                    </span>
                    <span className="treeview__label">{label}</span>
                </div>
                {hasChildren && (
                    <ul className="treeview__group" role="group">
                        {children}
                    </ul>
                )}
            </li>
        );
    }
);

TreeItem.displayName = 'TreeItem';
