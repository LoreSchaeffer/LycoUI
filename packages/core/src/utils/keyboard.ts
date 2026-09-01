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
