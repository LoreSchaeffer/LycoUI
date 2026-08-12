import React, { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'lyco-ui';

export const title = 'Alignment';
export const description = (
    <p>
        By default, modals are vertically centered in the viewport. You can disable this by removing the <code>.modal__dialog--centered</code> class in HTML, or passing <code>centered={`{false}`}</code> in React.
    </p>
);
export const order = 3;

export const vanillaHtml = `
<button class="btn btn-primary" data-lyco-toggle="modal" data-lyco-target="#topModal">Top Aligned Modal</button>

<div class="modal hidden" id="topModal" tabindex="-1">
    <!-- Notice the absence of modal__dialog--centered -->
    <div class="modal__dialog modal__dialog--md">
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">Top Aligned Modal</h3>
                <button type="button" class="modal__close" data-lyco-dismiss="modal" aria-label="Close">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal__body">
                <p>This modal is aligned to the top of the viewport instead of being centered.</p>
            </div>
        </div>
    </div>
</div>
`;

export default function AlignmentExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                Open Top-Aligned Modal
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} centered={false}>
                <ModalHeader>
                    <ModalTitle>Top Aligned Modal</ModalTitle>
                    <button type="button" className="modal__close" onClick={() => setIsOpen(false)} aria-label="Close">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <p>This modal appears near the top of the screen because <code>centered={`{false}`}</code> was passed.</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="neutral" onClick={() => setIsOpen(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
