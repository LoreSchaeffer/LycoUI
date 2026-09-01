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
    size?: 'sm' | 'md' | 'lg';
    /** Vertically center the modal */
    centered?: boolean;
    /** Make the modal body scrollable while keeping header and footer fixed */
    scrollable?: boolean;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const ModalBase = React.forwardRef<HTMLDialogElement, ModalProps>(({
                                                                              isOpen,
                                                                              onClose,
                                                                              size = 'md',
                                                                              centered = true,
                                                                              scrollable = false,
                                                                              children,
                                                                              className = '',
                                                                              id
                                                                          }, ref) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }

        if (dialogRef.current) {
            trapFocus(e, dialogRef.current);
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            previouslyFocusedElement.current = document.activeElement as HTMLElement;
            document.addEventListener('keydown', handleKeyDown);
            document.body.classList.add('modal-open');

            setTimeout(() => {
                if (dialogRef.current) {
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
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    if (!isOpen) return null;

    const modalContent = (
        <dialog
            className={`modal ${className}`}
            id={id}
            role="dialog"
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

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
    ({children, className = '', ...props}, ref) => (
        <div ref={ref} className={`modal__header ${className}`} {...props}>
            {children}
        </div>
    )
);
ModalHeader.displayName = 'ModalHeader';

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
    ({children, className = '', as: Component = 'h3', ...props}, ref) => (
        <Component ref={ref} className={`modal__title ${className}`} {...props}>
            {children}
        </Component>
    )
);
ModalTitle.displayName = 'ModalTitle';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
    ({children, className = '', ...props}, ref) => (
        <div ref={ref} className={`modal__body ${className}`} {...props}>
            {children}
        </div>
    )
);
ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

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
