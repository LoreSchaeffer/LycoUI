const focusable = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function trapFocus(event: KeyboardEvent, root: HTMLElement): void {
  if (event.key !== 'Tab') return;
  const items = [...root.querySelectorAll<HTMLElement>(focusable)].filter((item) => !item.hidden && !item.hasAttribute('inert'));
  if (items.length === 0) { event.preventDefault(); root.focus(); return; }
  const current = document.activeElement;
  if (event.shiftKey && current === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
  if (!event.shiftKey && current === items.at(-1)) { event.preventDefault(); items[0].focus(); }
}
