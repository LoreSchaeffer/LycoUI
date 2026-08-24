/**
 * Toggles the 'aria-expanded' state of an element.
 * 
 * @param element - The element to update.
 * @param isExpanded - The boolean state representing whether the controlled element is expanded.
 */
export function setAriaExpanded(element: HTMLElement | null, isExpanded: boolean): void {
    if (!element) return;
    element.setAttribute('aria-expanded', String(isExpanded));
}

/**
 * Toggles the 'aria-hidden' state of an element.
 * 
 * @param element - The element to update.
 * @param isHidden - The boolean state representing whether the element is hidden.
 */
export function setAriaHidden(element: HTMLElement | null, isHidden: boolean): void {
    if (!element) return;
    element.setAttribute('aria-hidden', String(isHidden));
}

/**
 * Updates the 'aria-selected' state of an element.
 * 
 * @param element - The element to update.
 * @param isSelected - The boolean state representing whether the element is selected.
 */
export function setAriaSelected(element: HTMLElement | null, isSelected: boolean): void {
    if (!element) return;
    element.setAttribute('aria-selected', String(isSelected));
}

/**
 * Safely sets the 'aria-activedescendant' attribute on a container element.
 * If the activeId is null or empty, the attribute is removed.
 * 
 * @param element - The container element.
 * @param activeId - The ID of the currently active descendant element.
 */
export function setAriaActiveDescendant(element: HTMLElement | null, activeId: string | null): void {
    if (!element) return;
    if (activeId) {
        element.setAttribute('aria-activedescendant', activeId);
    } else {
        element.removeAttribute('aria-activedescendant');
    }
}
