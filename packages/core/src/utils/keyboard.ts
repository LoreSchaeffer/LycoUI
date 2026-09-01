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

export const FOCUSABLE_ELEMENTS_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus within a container.
 * Must be called inside a keydown event listener.
 *
 * @param e - The KeyboardEvent.
 * @param container - The container element to trap focus within.
 */
export function trapFocus(e: KeyboardEvent, container: HTMLElement): void {
    if (e.key !== 'Tab') return;

    const focusableElements = container.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR) as NodeListOf<HTMLElement>;
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === firstElement || document.activeElement === container) {
            lastElement.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
}
