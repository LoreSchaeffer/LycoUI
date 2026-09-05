import './Breadcrumbs.scss';
import React, {forwardRef} from 'react';
import clsx from 'clsx';

/**
 * Props for the main Breadcrumbs wrapper component.
 */
export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
    /** The breadcrumb items and separators */
    children?: React.ReactNode;
}

/**
 * The Breadcrumbs component acts as a navigation wrapper for breadcrumb items.
 * It provides the correct semantic `<nav>` and `<ol>` structure.
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
    ({children, className, ...props}, ref) => {
        return (
            <nav
                ref={ref}
                aria-label="Breadcrumb"
                className={clsx('breadcrumbs', className)}
                {...props}
            >
                <ol className="breadcrumbs__list">{children}</ol>
            </nav>
        );
    }
);
Breadcrumbs.displayName = 'Breadcrumbs';

/**
 * Props for the BreadcrumbItem component.
 */
export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** The content of the breadcrumb item, typically an `<a>` tag or text */
    children?: React.ReactNode;
    /** Marks the item as the current page for accessibility and styling */
    isCurrentPage?: boolean;
}

/**
 * BreadcrumbItem represents an individual link or text within a Breadcrumbs component.
 */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
    ({children, isCurrentPage, className, ...props}, ref) => {
        return (
            <li
                ref={ref}
                className={clsx(
                    'breadcrumbs__item',
                    isCurrentPage && 'is-current',
                    className
                )}
                aria-current={isCurrentPage ? 'page' : undefined}
                {...props}
            >
                {children}
            </li>
        );
    }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

/**
 * Props for the BreadcrumbSeparator component.
 */
export interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Custom separator content. Defaults to a slash `/` */
    children?: React.ReactNode;
}

/**
 * BreadcrumbSeparator creates a visual divider between BreadcrumbItems.
 * It is hidden from screen readers automatically.
 */
export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
    ({children, className, ...props}, ref) => {
        return (
            <li
                ref={ref}
                aria-hidden="true"
                className={clsx('breadcrumbs__separator', className)}
                {...props}
            >
                {children || '/'}
            </li>
        );
    }
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
