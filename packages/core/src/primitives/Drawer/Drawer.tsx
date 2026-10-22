import React, {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {openModalLayer} from '../../interaction/modal-layer';
import {useFocusTrap} from '../../hooks/useFocusTrap';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
  role?: 'dialog' | 'alertdialog';
  closeOnOverlayClick?: boolean;
}

/** A portal layer that shares modal focus, scroll-lock, and return-focus behavior. */
export function Drawer({isOpen, onClose, children, className = '', id, role = 'dialog', closeOnOverlayClick = true}: DrawerProps): React.ReactElement | null {
  const root = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | undefined>(undefined);
  useFocusTrap(root, isOpen);

  useEffect(() => {
    const element = root.current;
    if (!isOpen || !element) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    return openModalLayer({root: element, returnFocus: returnFocus.current});
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;
  return createPortal(
    <dialog ref={root} id={id} className={`drawer ${className}`} role={role} aria-modal="true" onCancel={(event) => {
      event.preventDefault();
      onClose();
    }} onClick={(event) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
    }}>
      <div className="drawer-panel">{children}</div>
    </dialog>,
    document.body
  );
}
