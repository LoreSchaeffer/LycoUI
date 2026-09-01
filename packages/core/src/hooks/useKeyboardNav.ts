import {useCallback} from 'react';

/**
 * Options for configuring keyboard navigation within a list.
 */
export interface UseKeyboardNavOptions {
    /** Whether to use ArrowLeft/ArrowRight instead of ArrowUp/ArrowDown (e.g., for horizontal Tabs) */
    horizontal?: boolean;
    /** Selector to identify navigable items within the container (e.g., '[role="tab"]:not(:disabled)') */
    itemSelector: string;
    /** Whether navigation should wrap around from the end back to the start */
    loop?: boolean;
    /** Action to perform when an item is focused (e.g., auto-click for tabs) */
    onFocus?: (item: HTMLElement) => void;
}

/**
 * React hook that provides WAI-ARIA compliant arrow key navigation for lists and menus.
 *
 * @param options - Configuration options for the navigation behavior.
 * @returns A keydown event handler to attach to the container element.
 */
export function useKeyboardNav({horizontal = false, itemSelector, loop = true, onFocus}: UseKeyboardNavOptions) {
    return useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        const prevKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
        const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';

        if (e.key !== prevKey && e.key !== nextKey) return;

        const container = e.currentTarget;
        const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
        if (!items.length) return;

        e.preventDefault();
        const currentIndex = items.findIndex(item => item === document.activeElement);
        let nextIndex = 0;

        if (e.key === nextKey) {
            nextIndex = (currentIndex === -1 || currentIndex === items.length - 1)
                ? (loop ? 0 : currentIndex)
                : currentIndex + 1;
        } else {
            nextIndex = currentIndex <= 0
                ? (loop ? items.length - 1 : currentIndex)
                : currentIndex - 1;
        }

        const nextItem = items[nextIndex];
        if (nextItem) {
            nextItem.focus();
            onFocus?.(nextItem);
        }
    }, [horizontal, itemSelector, loop, onFocus]);
}
