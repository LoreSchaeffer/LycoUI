import React, { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'lyco-ui';

export const title = 'Basic Modal';
export const description = (
    <p>
        A standard modal with a header, body, and footer. Try navigating with the keyboard (Tab, Shift+Tab, Esc).
    </p>
);
export const order = 1;

export const vanillaHtml = `
<!-- Trigger Button -->
<button class="btn btn-primary" data-lyco-toggle="modal" data-lyco-target="#basicModal">
    Open Modal
</button>

<!-- Modal -->
<div class="modal hidden" id="basicModal" tabindex="-1">
    <div class="modal__dialog modal__dialog--md modal__dialog--centered">
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">Modal Title</h3>
                <button type="button" class="modal__close" data-lyco-dismiss="modal" aria-label="Close">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal__body">
                <p>This is the modal body content. It can contain text, forms, or any other elements.</p>
            </div>
            <div class="modal__footer">
                <button class="btn btn-neutral" data-lyco-dismiss="modal">Close</button>
                <button class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
`;

export default function BasicExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                Open Modal
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
                <ModalHeader>
                    <ModalTitle>React Modal Title</ModalTitle>
                    <button type="button" className="modal__close" onClick={() => setIsOpen(false)} aria-label="Close">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <p>This is a React-controlled modal. The state `isOpen` controls its visibility.</p>
                    <p>Try pressing the <strong>Escape</strong> key or clicking outside this dialog.</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="neutral" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
