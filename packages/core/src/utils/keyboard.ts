/**
 * Handles WAI-ARIA compliant arrow key navigation for Vanilla JS lists and menus.
 * 
 * @param e - The KeyboardEvent triggered on the container.
 * @param container - The container element holding the items.
 * @param itemSelector - CSS selector to identify navigable items (e.g., '[role="tab"]:not(:disabled)').
 * @param horizontal - If true, uses ArrowLeft/ArrowRight; otherwise uses ArrowUp/ArrowDown.
 * @param loop - If true, navigation wraps around at the edges.
 * @param onFocus - Optional callback fired when an item receives focus (e.g., to click it).
 */
export function handleListKeyboardNav(
    e: KeyboardEvent,
    container: HTMLElement,
    itemSelector: string,
    horizontal: boolean = false,
    loop: boolean = true,
    onFocus?: (item: HTMLElement) => void
): void {
    const prevKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';

    if (e.key !== prevKey && e.key !== nextKey) return;

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
}
