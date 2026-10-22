import React from 'react';
import {useAlertDialogContext} from './AlertDialogContext';
export interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; }
const DialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(({children, onClick, ...props}, ref) => {
    const {setIsOpen} = useAlertDialogContext();
    return <button {...props} ref={ref} onClick={event => { onClick?.(event); setIsOpen(false); }}>{children}</button>;
});
DialogAction.displayName = 'AlertDialogAction';
export const AlertDialogAction = DialogAction;
export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>((props, ref) => <DialogAction {...props} ref={ref} autoFocus={props.autoFocus ?? true}/>);
AlertDialogCancel.displayName = 'AlertDialogCancel';
