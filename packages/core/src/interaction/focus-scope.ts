export const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)]
    .filter((item) => !item.hidden && !item.hasAttribute('inert'));
}

export function trapFocus(event: KeyboardEvent, root: HTMLElement): void {
  if (event.key !== 'Tab') return;
  const items = getFocusableElements(root);
  if (items.length === 0) { event.preventDefault(); root.focus(); return; }
  const current = document.activeElement;
  if (event.shiftKey && current === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
  if (!event.shiftKey && current === items.at(-1)) { event.preventDefault(); items[0].focus(); }
}
