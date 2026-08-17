import React, { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from '@loreschaeffer/lyco-ui';

export const title = 'Modal Sizes';
export const description = (
    <p>
        Modals have four optional sizes, available via modifier classes to be placed on a <code>.modal__dialog</code> or the <code>size</code> prop in React.
    </p>
);
export const order = 2;

export const vanillaHtml = `
<!-- Extra large modal -->
<button class="btn btn-primary" data-lyco-toggle="modal" data-lyco-target="#modalXl">Extra large modal</button>

<div class="modal hidden" id="modalXl" tabindex="-1">
    <div class="modal__dialog modal__dialog--xl modal__dialog--centered">
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">Extra large modal</h3>
                <button type="button" class="modal__close" data-lyco-dismiss="modal" aria-label="Close">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal__body">
                ...
            </div>
        </div>
    </div>
</div>
`;

export default function SizesExample() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);

    const close = () => setSize(null);

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => setSize('xl')}>Extra large modal</Button>
            <Button variant="primary" onClick={() => setSize('lg')}>Large modal</Button>
            <Button variant="primary" onClick={() => setSize('sm')}>Small modal</Button>

            <Modal isOpen={!!size} onClose={close} size={size || 'md'}>
                <ModalHeader>
                    <ModalTitle>Modal Size: {size}</ModalTitle>
                    <button type="button" className="modal__close" onClick={close} aria-label="Close">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <p>This modal is using the <code>{size}</code> size variant.</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="neutral" onClick={close}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
