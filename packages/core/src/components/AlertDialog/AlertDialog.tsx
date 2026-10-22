import React from 'react';
import {Modal} from '../Modal';
import {AlertDialogAction, AlertDialogCancel, type AlertDialogActionProps} from './AlertDialogActions';
import {AlertDialogProvider, useAlertDialogContext, type AlertDialogProviderProps} from './AlertDialogContext';

export interface AlertDialogProps extends AlertDialogProviderProps {}
export const AlertDialog = AlertDialogProvider;

export interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { children: React.ReactElement; asChild?: boolean; }
export const AlertDialogTrigger = React.forwardRef<HTMLElement, AlertDialogTriggerProps>(({children, asChild = false, onClick, ...props}, ref) => {
    const {setIsOpen} = useAlertDialogContext();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => { onClick?.(event as React.MouseEvent<HTMLButtonElement>); setIsOpen(true); };
    if (asChild && React.isValidElement(children)) return React.cloneElement(children, {...props, onClick: handleClick, ref} as React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>);
    return <button {...props} ref={ref as React.Ref<HTMLButtonElement>} onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}>{children}</button>;
});
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

export interface AlertDialogContentProps { children: React.ReactNode; className?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; }
export const AlertDialogContent = React.forwardRef<HTMLDialogElement, AlertDialogContentProps>(({children, className = '', size = 'md'}, ref) => {
    const {isOpen, setIsOpen} = useAlertDialogContext();
    return <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} closeOnOverlayClick={false} closeOnEscape={false} role="alertdialog" size={size} className={className} ref={ref}>{children}</Modal>;
});
AlertDialogContent.displayName = 'AlertDialogContent';
export const AlertDialogHeader = Modal.Header;
export const AlertDialogTitle = Modal.Title;
export const AlertDialogBody = Modal.Body;
export const AlertDialogFooter = Modal.Footer;
export {AlertDialogAction, AlertDialogCancel, type AlertDialogActionProps};
