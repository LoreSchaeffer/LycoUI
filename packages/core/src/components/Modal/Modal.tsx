import React, {useEffect, useImperativeHandle, useRef} from 'react';
import {createPortal} from 'react-dom';
import {openModalLayer} from '../../interaction/modal-layer';
import {useFocusTrap} from '../../hooks/useFocusTrap';
import './Modal.scss';
import {ModalBody, ModalFooter, ModalHeader, ModalTitle} from './ModalRegions';
export type {ModalBodyProps, ModalFooterProps, ModalHeaderProps, ModalTitleProps} from './ModalRegions';

/**
 * Props for the Modal component.
 */
export interface ModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Callback fired when the modal requests to be closed (e.g. Esc key or backdrop click) */
    onClose: () => void;
    /** Size of the modal */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Vertically center the modal */
    centered?: boolean;
    /** Make the modal body scrollable while keeping header and footer fixed */
    scrollable?: boolean;
    /** Modal content */
    children: React.ReactNode;
    /** Optional CSS class */
    className?: string;
    /** Element ID */
    id?: string;
    /** Role attribute for the dialog (defaults to 'dialog') */
    role?: 'dialog' | 'alertdialog';
    /** Whether clicking the backdrop overlay closes the modal */
    closeOnOverlayClick?: boolean;
    /** Whether pressing the Escape key closes the modal */
    closeOnEscape?: boolean;
}

/**
 * Base Modal component.
 * Handles focus trapping, keyboard navigation (Escape to close), and backdrop click interactions.
 */
export const ModalBase = React.forwardRef<HTMLDialogElement, ModalProps>(({
                                                                              isOpen,
                                                                              onClose,
                                                                              size = 'md',
                                                                              centered = true,
                                                                              scrollable = false,
                                                                              children,
                                                                              className = '',
                                                                              id,
                                                                              role = 'dialog',
                                                                              closeOnOverlayClick = true,
                                                                              closeOnEscape = true
                                                                          }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);
    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement, []);
    useFocusTrap(dialogRef, isOpen);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!isOpen || !dialog) return;
        previouslyFocusedElement.current = document.activeElement as HTMLElement;
        return openModalLayer({
            root: dialog,
            returnFocus: previouslyFocusedElement.current ?? undefined,
            onOpen: () => document.body.classList.add('modal-open'),
            onClose: () => document.body.classList.remove('modal-open')
        });
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;
        const dialog = dialogRef.current;
        if (!dialog) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        dialog.addEventListener('keydown', onKeyDown);
        return () => dialog.removeEventListener('keydown', onKeyDown);
    }, [closeOnEscape, isOpen, onClose]);

    const handleBackdropClick = React.useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose, closeOnOverlayClick]);

    if (!isOpen) return null;

    const modalContent = (
        <dialog
            className={`modal ${className}`}
            id={id}
            role={role}
            aria-modal="true"
            tabIndex={-1}
            onCancel={(event) => {
                event.preventDefault();
                if (closeOnEscape) onClose();
            }}
            onClick={handleBackdropClick}
            ref={dialogRef}
        >
            <div
                className={`modal-dialog modal-dialog-${size} ${centered ? 'modal-dialog-centered' : ''} ${scrollable ? 'modal-dialog-scrollable' : ''}`}
                tabIndex={-1}
            >
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </dialog>
    );

    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
});
ModalBase.displayName = 'Modal';

const ModalCompound = Object.assign(ModalBase, {
    Header: ModalHeader,
    Title: ModalTitle,
    Body: ModalBody,
    Footer: ModalFooter
});

export {ModalCompound as Modal};


