import React from 'react';
import {AlertDialog, AlertDialogAction, AlertDialogBody, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button} from '@loreschaeffer/lyco-ui';

export const title = 'Destructive Action';
export const description = <p>Use for destructive actions like deleting an account. Focus is safely trapped and defaults to the <strong>Cancel</strong> button to prevent accidental data loss. Requires explicit user confirmation before
    proceeding.</p>;
export const order = 2;

export const vanillaHtml = `
<button class="button button--danger" data-lyco-toggle="modal" data-lyco-target="#delete-account-alert">
    Delete Account
</button>

<dialog class="modal" id="delete-account-alert" role="alertdialog" data-lyco-close-on-overlay-click="false" data-lyco-close-on-escape="false">
    <div class="modal__dialog modal__dialog--md modal__dialog--centered">
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">Are you absolutely sure?</h3>
            </div>
            <div class="modal__body">
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </div>
            <div class="modal__footer" style="display: flex; justify-content: flex-end; gap: 8px;">
                <button class="button button--secondary" data-lyco-dismiss="modal" autofocus>Cancel</button>
                <button class="button button--danger" data-lyco-dismiss="modal">Yes, delete account</button>
            </div>
        </div>
    </div>
</dialog>
`;

export default function DestructiveExample() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="danger">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogBody>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogBody>
                <AlertDialogFooter style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
                    <AlertDialogCancel asChild>
                        <Button variant="secondary">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant="danger">Yes, delete account</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
