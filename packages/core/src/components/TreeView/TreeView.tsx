import React, {forwardRef, useCallback, useRef} from 'react';
import clsx from 'clsx';
import './TreeView.scss';

/**
 * Props for the TreeView component.
 */
export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
    /** The ID of the currently selected item (controlled) */
    selectedId?: string;
    /** Callback fired when an item is selected */
    onSelect?: (id: string) => void;
}

/**
 * TreeView component.
 * A UI component for LycoUI.
 */
export const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(
    ({className, selectedId, onSelect, children, ...props}, forwardedRef) => {
        const localRef = useRef<HTMLUListElement>(null);

        // Utility to combine refs
        const setRefs = useCallback(
            (node: HTMLUListElement) => {
                localRef.current = node;
                if (typeof forwardedRef === 'function') {
                    forwardedRef(node);
                } else if (forwardedRef) {
                    forwardedRef.current = node;
                }
            },
            [forwardedRef]
        );

        const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLUListElement>) => {
            const tree = localRef.current;
            if (!tree) return;

            const target = e.target as HTMLElement;
            // Ensure the event originated from a treeitem
            if (target.getAttribute('role') !== 'treeitem') return;

            // Get all visible treeitems
            // A treeitem is visible if none of its ancestor groups belong to a collapsed treeitem
            const getVisibleItems = () => {
                const allItems = Array.from(tree.querySelectorAll('[role="treeitem"]')) as HTMLElement[];
                return allItems.filter(item => {
                    let parent = item.parentElement;
                    while (parent && parent !== tree) {
                        if (parent.getAttribute('role') === 'group') {
                            const groupParent = parent.parentElement;
                            if (groupParent && groupParent.getAttribute('aria-expanded') === 'false') {
                                return false; // Hidden by collapsed ancestor
                            }
                        }
                        parent = parent.parentElement;
                    }
                    return true;
                });
            };

            const visibleItems = getVisibleItems();
            const currentIndex = visibleItems.indexOf(target);

            const setFocus = (item: HTMLElement) => {
                // Roving tabindex: set all to -1, target to 0, and focus it
                visibleItems.forEach(i => i.setAttribute('tabindex', '-1'));
                item.setAttribute('tabindex', '0');
                item.focus();
            };

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < visibleItems.length - 1) {
                        setFocus(visibleItems[currentIndex + 1]);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        setFocus(visibleItems[currentIndex - 1]);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (target.getAttribute('aria-expanded') === 'false') {
                        // It's a closed group, open it by triggering a click on the content
                        const content = target.querySelector('.treeview__item-content') as HTMLElement;
                        if (content) content.click();
                    } else if (target.getAttribute('aria-expanded') === 'true') {
                        // It's an open group, move to first child
                        if (currentIndex < visibleItems.length - 1) {
                            setFocus(visibleItems[currentIndex + 1]);
                        }
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    if (target.getAttribute('aria-expanded') === 'true') {
                        // It's an open group, close it
                        const content = target.querySelector('.treeview__item-content') as HTMLElement;
                        if (content) content.click();
                    } else {
                        // Move to parent
                        const parentGroup = target.closest('[role="group"]');
                        if (parentGroup) {
                            const parentItem = parentGroup.closest('[role="treeitem"]') as HTMLElement;
                            if (parentItem) {
                                setFocus(parentItem);
                            }
                        }
                    }
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    const content = target.querySelector('.treeview__item-content') as HTMLElement;
                    if (content) content.click();
                    break;
                case 'Home':
                    e.preventDefault();
                    if (visibleItems.length > 0) setFocus(visibleItems[0]);
                    break;
                case 'End':
                    e.preventDefault();
                    if (visibleItems.length > 0) setFocus(visibleItems[visibleItems.length - 1]);
                    break;
            }
        }, []);

        // Pass context to children via cloneElement or React Context?
        // Since we need to pass selectedId and onSelect, React Context is better.
        // But for simplicity and zero-deps, we can just export a Context in the same file.
        return (
            <TreeContext.Provider value={{selectedId, onSelect}}>
                <ul
                    ref={setRefs}
                    className={clsx('treeview', className)}
                    role="tree"
                    onKeyDown={handleKeyDown}
                    {...props}
                >
                    {children}
                </ul>
            </TreeContext.Provider>
        );
    }
);

TreeView.displayName = 'TreeView';

interface TreeContextType {
    selectedId?: string;
    onSelect?: (id: string) => void;
}

/**
 * TreeContext component.
 * A UI component for LycoUI.
 */
export const TreeContext = React.createContext<TreeContextType>({});
