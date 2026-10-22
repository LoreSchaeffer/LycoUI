let lockCount = 0;

export interface ModalLayerOptions {
  root: HTMLDialogElement;
  initialFocus?: HTMLElement;
  returnFocus?: HTMLElement;
}

export function openModalLayer({root, initialFocus, returnFocus}: ModalLayerOptions): () => void {
  if (typeof root.showModal === 'function') root.showModal();
  else root.setAttribute('open', '');
  if (lockCount++ === 0) document.body.style.overflow = 'hidden';
  queueMicrotask(() => (initialFocus ?? root).focus());
  let closed = false;
  return () => {
    if (closed) return;
    closed = true;
    if (root.open && typeof root.close === 'function') root.close();
    else root.removeAttribute('open');
    if (--lockCount === 0) document.body.style.removeProperty('overflow');
    returnFocus?.focus();
  };
}
