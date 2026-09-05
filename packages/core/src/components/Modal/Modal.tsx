import React, {useCallback, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {FOCUSABLE_ELEMENTS_SELECTOR, trapFocus} from '../../utils/keyboard';
import './Modal.scss';

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
    const dialogRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') {
            onClose();
        }

        if (dialogRef.current) {
            trapFocus(e, dialogRef.current);
        }
    }, [onClose, closeOnEscape]);

    useEffect(() => {
        if (isOpen) {
            previouslyFocusedElement.current = document.activeElement as HTMLElement;
            document.addEventListener('keydown', handleKeyDown);
            document.body.classList.add('modal-open');

            setTimeout(() => {
                if (dialogRef.current) {
                    const autoFocusElement = dialogRef.current.querySelector('[autofocus]') as HTMLElement;
                    if (autoFocusElement) {
                        autoFocusElement.focus();
                        return;
                    }

                    const focusableElements = dialogRef.current.querySelectorAll(
                        FOCUSABLE_ELEMENTS_SELECTOR
                    ) as NodeListOf<HTMLElement>;

                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    } else {
                        dialogRef.current.focus();
                    }
                }
            }, 0);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('modal-open');
            if (previouslyFocusedElement.current) {
                previouslyFocusedElement.current.focus();
                previouslyFocusedElement.current = null;
            }
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.classList.remove('modal-open');
        };
    }, [isOpen, handleKeyDown]);

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
            onClick={handleBackdropClick}
            ref={ref}
        >
            <div
                className={`modal__dialog modal__dialog--${size} ${centered ? 'modal__dialog--centered' : ''} ${scrollable ? 'modal__dialog--scrollable' : ''}`}
                ref={dialogRef}
                tabIndex={-1}
            >
                <div className="modal__content">
                    {children}
                </div>
            </div>
        </dialog>
    );

    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
});
ModalBase.displayName = 'Modal';

/**
 * Props for the ModalHeader component.
 */
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

/**
 * ModalHeader component.
 * Acts as the structural container for the modal's title and contextual actions.
 */
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
    ({children, className = '', ...props}, ref) => (
        <div ref={ref} className={`modal__header ${className}`} {...props}>
            {children}
        </div>
    )
);
ModalHeader.displayName = 'ModalHeader';

/**
 * Props for the ModalTitle component.
 */
export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * ModalTitle component.
 * Renders the accessible semantic heading for the modal. Defaults to an h3 tag.
 */
export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
    ({children, className = '', as: Component = 'h3', ...props}, ref) => (
        <Component ref={ref} className={`modal__title ${className}`} {...props}>
            {children}
        </Component>
    )
);
ModalTitle.displayName = 'ModalTitle';

/**
 * Props for the ModalBody component.
 */
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

/**
 * ModalBody component.
 * Container for the primary content of the modal. Scrollable if the modal is configured as scrollable.
 */
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
    ({children, className = '', ...props}, ref) => (
        <div ref={ref} className={`modal__body ${className}`} {...props}>
            {children}
        </div>
    )
);
ModalBody.displayName = 'ModalBody';

/**
 * Props for the ModalFooter component.
 */
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

/**
 * ModalFooter component.
 * Typically used to anchor primary and secondary action buttons at the bottom of the modal.
 */
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
    ({children, className = '', ...props}, ref) => (
        <div ref={ref} className={`modal__footer ${className}`} {...props}>
            {children}
        </div>
    )
);
ModalFooter.displayName = 'ModalFooter';

const ModalCompound = Object.assign(ModalBase, {
    Header: ModalHeader,
    Title: ModalTitle,
    Body: ModalBody,
    Footer: ModalFooter
});

export {ModalCompound as Modal};
