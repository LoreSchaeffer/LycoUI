import React, {createContext, useCallback, useContext, useRef, useState} from 'react';
import {Modal} from '../Modal';

interface AlertDialogContextValue {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(undefined);

export const useAlertDialogContext = () => {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error('AlertDialog components must be used within an AlertDialog provider');
    }
    return context;
};

/**
 * Props for the AlertDialog component.
 */
export interface AlertDialogProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

/**
 * AlertDialog component.
 * A UI component for LycoUI.
 */
export const AlertDialog = ({children, defaultOpen = false, open, onOpenChange}: AlertDialogProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : uncontrolledOpen;

    const setIsOpen = useCallback((newOpen: boolean) => {
        if (!isControlled) {
            setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    }, [isControlled, onOpenChange]);

    return (
        <AlertDialogContext.Provider value={{isOpen, setIsOpen}}>
            {children}
        </AlertDialogContext.Provider>
    );
};
AlertDialog.displayName = 'AlertDialog';

/**
 * Props for the AlertDialogTrigger component.
 */
export interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactElement;
    asChild?: boolean;
}

/**
 * AlertDialogTrigger component.
 * A UI component for LycoUI.
 */
export const AlertDialogTrigger = React.forwardRef<HTMLElement, AlertDialogTriggerProps>(
    ({children, asChild = false, onClick, ...props}, ref) => {
        const {setIsOpen} = useAlertDialogContext();
        const handleClick = (e: React.MouseEvent<HTMLElement>) => {
            onClick?.(e as React.MouseEvent<HTMLButtonElement>);
            setIsOpen(true);
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, {
                ...props,
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    handleClick(e);
                    const childElement = children as React.ReactElement<React.HTMLProps<HTMLElement>>;
                    if (childElement.props.onClick) childElement.props.onClick(e);
                },
                ref: (node: HTMLElement) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;

                    const childRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref;
                    if (typeof childRef === 'function') childRef(node);
                    else if (childRef && 'current' in childRef) (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
                }
            } as React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>);
        }

        return (
            <button {...props} onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>} ref={ref as React.Ref<HTMLButtonElement>}>
                {children}
            </button>
        );
    }
);
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

/**
 * Props for the AlertDialogContent component.
 */
export interface AlertDialogContentProps {
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * AlertDialogContent component.
 * A UI component for LycoUI.
 */
export const AlertDialogContent = React.forwardRef<HTMLDialogElement, AlertDialogContentProps>(
    ({children, className = '', size = 'md'}, ref) => {
        const {isOpen, setIsOpen} = useAlertDialogContext();
        return (
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                closeOnOverlayClick={false}
                closeOnEscape={false}
                role="alertdialog"
                size={size}
                className={className}
                ref={ref}
            >
                {children}
            </Modal>
        );
    }
);
AlertDialogContent.displayName = 'AlertDialogContent';

/**
 * AlertDialogHeader component.
 * A UI component for LycoUI.
 */
export const AlertDialogHeader = Modal.Header;
/**
 * AlertDialogTitle component.
 * A UI component for LycoUI.
 */
export const AlertDialogTitle = Modal.Title;
/**
 * AlertDialogBody component.
 * A UI component for LycoUI.
 */
export const AlertDialogBody = Modal.Body;
/**
 * AlertDialogFooter component.
 * A UI component for LycoUI.
 */
export const AlertDialogFooter = Modal.Footer;

/**
 * Props for the AlertDialogAction component.
 */
export interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

/**
 * AlertDialogAction component.
 * A UI component for LycoUI.
 */
export const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
    ({children, asChild, onClick, ...props}, ref) => {
        const {setIsOpen} = useAlertDialogContext();
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            setIsOpen(false);
        };

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, {
                ...props,
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
                    const childElement = children as React.ReactElement<React.HTMLProps<HTMLElement>>;
                    if (childElement.props.onClick) childElement.props.onClick(e);
                },
                ref: (node: HTMLButtonElement) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                    const childRef = (children as unknown as { ref?: React.Ref<HTMLButtonElement> }).ref;
                    if (typeof childRef === 'function') childRef(node);
                    else if (childRef && 'current' in childRef) (childRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }
            } as React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLButtonElement>);
        }
        return <button onClick={handleClick} {...props} ref={ref as React.Ref<HTMLButtonElement>}>{children}</button>;
    }
);
AlertDialogAction.displayName = 'AlertDialogAction';

/**
 * Props for the AlertDialogCancel component.
 */
export interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

/**
 * AlertDialogCancel component.
 * A UI component for LycoUI.
 */
export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
    ({children, asChild, onClick, ...props}, ref) => {
        const {setIsOpen} = useAlertDialogContext();
        const internalRef = useRef<HTMLButtonElement>(null);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            onClick?.(e);
            setIsOpen(false);
        };

        const setRefs = useCallback(
            (node: HTMLButtonElement) => {
                internalRef.current = node;
                if (typeof ref === 'function') {
                    ref(node);
                } else if (ref) {
                    (ref as React.MutableRefObject<HTMLButtonElement>).current = node;
                }
            },
            [ref]
        );

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, {
                ...props,
                autoFocus: true,
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
                    const childElement = children as React.ReactElement<React.HTMLProps<HTMLElement>>;
                    if (childElement.props.onClick) childElement.props.onClick(e);
                },
                ref: (node: HTMLButtonElement) => {
                    setRefs(node);
                    const childRef = (children as unknown as { ref?: React.Ref<HTMLButtonElement> }).ref;
                    if (typeof childRef === 'function') childRef(node);
                    else if (childRef && 'current' in childRef) (childRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                }
            } as React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLButtonElement>);
        }

        return <button autoFocus onClick={handleClick} {...props} ref={setRefs}>{children}</button>;
    }
);
AlertDialogCancel.displayName = 'AlertDialogCancel';
