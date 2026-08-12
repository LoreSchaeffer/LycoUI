import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

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

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    size = 'md',
    centered = true,
    scrollable = false,
    children,
    className = '',
    id
}) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
        
        // Focus trap
        if (e.key === 'Tab' && dialogRef.current) {
            const focusableElements = dialogRef.current.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ) as NodeListOf<HTMLElement>;

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement || document.activeElement === dialogRef.current) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            previouslyFocusedElement.current = document.activeElement as HTMLElement;
            document.addEventListener('keydown', handleKeyDown);
            document.body.classList.add('modal-open');
            
            // Wait for next tick to ensure modal is rendered
            setTimeout(() => {
                if (dialogRef.current) {
                    const focusableElements = dialogRef.current.querySelectorAll(
                        'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div 
            className={`modal ${className}`}
            id={id}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onClick={handleBackdropClick}
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
        </div>
    );

    // Render directly or via portal if React 18 createPortal is available.
    // For LycoUI, we'll use a Portal to match standard Modal practices.
    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export interface ModalHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className = '' }) => (
    <div className={`modal__header ${className}`}>
        {children}
    </div>
);

export interface ModalTitleProps {
    children: React.ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const ModalTitle: React.FC<ModalTitleProps> = ({ children, className = '', as: Component = 'h3' }) => (
    <Component className={`modal__title ${className}`}>
        {children}
    </Component>
);

export interface ModalBodyProps {
    children: React.ReactNode;
    className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className = '' }) => (
    <div className={`modal__body ${className}`}>
        {children}
    </div>
);

export interface ModalFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = '' }) => (
    <div className={`modal__footer ${className}`}>
        {children}
    </div>
);
