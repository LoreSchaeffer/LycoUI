import {getFocusableElements} from './focus-scope';
import {lockBodyScroll} from './body-scroll-lock';

export interface ModalLayerOptions {
  root: HTMLElement;
  initialFocus?: HTMLElement;
  returnFocus?: HTMLElement;
  onOpen?: () => void;
  onClose?: () => void;
}

export function openModalLayer({root, initialFocus, returnFocus, onOpen, onClose}: ModalLayerOptions): () => void {
  const dialog = root as HTMLDialogElement;
  if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
  else root.setAttribute('open', '');
  const releaseBodyScroll = lockBodyScroll();
  onOpen?.();
  queueMicrotask(() => (initialFocus ?? root.querySelector<HTMLElement>('[autofocus]') ?? getFocusableElements(root)[0] ?? root).focus());
  let closed = false;
  return () => {
    if (closed) return;
    closed = true;
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else root.removeAttribute('open');
    releaseBodyScroll();
    onClose?.();
    returnFocus?.focus();
  };
}
