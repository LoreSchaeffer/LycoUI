/**
 * Shared viewport-aware positioning helpers for floating elements
 * (flyouts, popovers, dropdowns). Framework-agnostic so that React
 * components and Vanilla controllers compute identical positions.
 */

/** Minimum distance (px) a floating element keeps from the viewport edges. */
export const VIEWPORT_GUTTER = 8;

/** Gap (px) between the trigger and a side flyout. Mirrors `--spacing-2`. */
export const FLYOUT_GAP = 8;

/**
 * Inline style values for a side flyout, expressed as plain strings so they
 * can be applied both as a React `CSSProperties` object and via `element.style`.
 */
export interface SideFlyoutPosition {
    top: string;
    left: string;
    maxHeight: string;
}

/**
 * Computes a `position: fixed` placement for a flyout opening to the side of
 * its trigger, guaranteeing it never overflows the viewport:
 *
 * - **Horizontal:** opens to the right of the trigger; flips to the left when
 *   there is not enough room, then clamps to the viewport gutter.
 * - **Vertical:** aligns its top with the trigger's top; when it would overflow
 *   the bottom edge it aligns its bottom with the trigger's bottom instead
 *   (opening upward, e.g. for footer menus), then clamps to the viewport gutter.
 * - **Height:** constrained to the available viewport height so very long
 *   menus scroll instead of overflowing.
 */
export function computeSideFlyoutPosition(trigger: HTMLElement, flyout: HTMLElement): SideFlyoutPosition {
    const triggerRect = trigger.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;

    const maxHeight = viewportHeight - VIEWPORT_GUTTER * 2;
    const flyoutWidth = flyout.offsetWidth;
    const flyoutHeight = Math.min(flyout.scrollHeight, maxHeight);

    let left = triggerRect.right + FLYOUT_GAP;
    if (left + flyoutWidth > viewportWidth - VIEWPORT_GUTTER) {
        left = triggerRect.left - FLYOUT_GAP - flyoutWidth;
    }
    left = clamp(left, VIEWPORT_GUTTER, viewportWidth - VIEWPORT_GUTTER - flyoutWidth);

    let top = triggerRect.top;
    if (top + flyoutHeight > viewportHeight - VIEWPORT_GUTTER) {
        top = triggerRect.bottom - flyoutHeight;
    }
    top = clamp(top, VIEWPORT_GUTTER, viewportHeight - VIEWPORT_GUTTER - flyoutHeight);

    return {
        top: `${top}px`,
        left: `${left}px`,
        maxHeight: `${maxHeight}px`,
    };
}

function clamp(value: number, min: number, max: number): number {
    // When the element is larger than the available space, `min` wins.
    return Math.max(min, Math.min(value, max));
}
