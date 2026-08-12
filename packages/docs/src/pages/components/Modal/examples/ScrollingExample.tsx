import React, { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'lyco-ui';

export const title = 'Scrolling Long Content';
export const description = (
    <p>
        When modals become too long for the user's viewport or device, they scroll independent of the page itself. You can also create a scrollable modal that allows the modal body to scroll by adding <code>.modal__dialog--scrollable</code> or using the <code>scrollable</code> prop.
    </p>
);
export const order = 4;

export const vanillaHtml = `
<button class="btn btn-primary" data-lyco-toggle="modal" data-lyco-target="#scrollableModal">Open Scrollable Modal</button>

<div class="modal hidden" id="scrollableModal" tabindex="-1">
    <div class="modal__dialog modal__dialog--scrollable modal__dialog--centered">
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">Scrollable Modal</h3>
                <button type="button" class="modal__close" data-lyco-dismiss="modal" aria-label="Close">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal__body">
                <p>This is some placeholder content to show the scrolling behavior for modals.</p>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <p>More content down here...</p>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <p>Even more content!</p>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <p>Almost at the bottom...</p>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <p>You've reached the end!</p>
            </div>
            <div class="modal__footer">
                <button class="btn btn-neutral" data-lyco-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`;

export default function ScrollingExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setIsOpen(true)}>
                Open Scrollable Modal
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} scrollable>
                <ModalHeader>
                    <ModalTitle>Scrollable Modal</ModalTitle>
                    <button type="button" className="modal__close" onClick={() => setIsOpen(false)} aria-label="Close">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <p>This is some placeholder content to show the scrolling behavior for modals.</p>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p>More content down here...</p>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p>Even more content!</p>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p>Almost at the bottom...</p>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p>You've reached the end!</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="neutral" onClick={() => setIsOpen(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
