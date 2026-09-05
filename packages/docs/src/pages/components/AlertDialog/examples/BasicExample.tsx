import React from 'react';
import {AlertDialog, AlertDialogAction, AlertDialogBody, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Confirmation';
export const description = <p>A standard alert dialog used to confirm user intentions before executing a critical but non-destructive action. It requires a clear, unambiguous response.</p>;
export const order = 1;

export const vanillaHtml = `
<button class="button button--primary" data-lyco-toggle="modal" data-lyco-target="#publish-post-alert">
    Publish Post
</button>

<dialog class="modal" id="publish-post-alert" role="alertdialog" data-lyco-close-on-overlay-click="false" data-lyco-close-on-escape="false">
    <div class="modal__dialog modal__dialog--md modal__dialog--centered">
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">Publish this article?</h3>
            </div>
            <div class="modal__body">
                This will make the article visible to all users. Notifications will be sent to your subscribers immediately.
            </div>
            <div class="modal__footer" style="display: flex; justify-content: flex-end; gap: 8px;">
                <button class="button button--secondary" data-lyco-dismiss="modal" autofocus>Cancel</button>
                <button class="button button--primary" data-lyco-dismiss="modal">Publish Now</button>
            </div>
        </div>
    </div>
</dialog>
`;

export default function BasicExample() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="primary">Publish Post</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Publish this article?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogBody>
                    This will make the article visible to all users. Notifications will be sent to your subscribers immediately.
                </AlertDialogBody>
                <AlertDialogFooter style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
                    <AlertDialogCancel asChild>
                        <Button variant="secondary">Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant="primary">Publish Now</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
