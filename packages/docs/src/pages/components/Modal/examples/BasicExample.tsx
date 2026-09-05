import React, {useState} from 'react';
import {Button, Col, Input, Modal, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Modal';
export const description = (
    <p>
        A standard modal with a header, body, and footer using the compound component architecture (<code>Modal.Header</code>, etc.).
    </p>
);
export const order = 1;

export const vanillaHtml = `
<!-- Trigger Button -->
<button class="button button--primary" data-lyco-toggle="modal" data-lyco-target="#basicModal">
    Edit Profile
</button>

<!-- Modal -->
<div class="modal hidden" id="basicModal" tabindex="-1">
    <div class="modal__dialog modal__dialog--md modal__dialog--centered">
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">Edit Profile</h3>
                <button type="button" class="modal__close" data-lyco-dismiss="modal" aria-label="Close">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal__body">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">Full Name</label>
                    <input type="text" class="input__field" placeholder="John Doe" style="width: 100%;" />
                </div>
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">Email Address</label>
                    <input type="email" class="input__field" placeholder="john@example.com" style="width: 100%;" />
                </div>
            </div>
            <div class="modal__footer">
                <button class="button button--neutral" data-lyco-dismiss="modal">Cancel</button>
                <button class="button button--primary">Save Changes</button>
            </div>
        </div>
    </div>
</div>
`;

export default function BasicExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Row>
            <Col span={6}>
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                    Edit Profile
                </Button>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
                    <Modal.Header>
                        <Modal.Title>Edit Profile</Modal.Title>
                        <button type="button" className="modal__close" onClick={() => setIsOpen(false)} aria-label="Close">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{marginBottom: '1rem'}}>
                            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)'}}>Full Name</label>
                            <Input placeholder="John Doe"/>
                        </div>
                        <div>
                            <label style={{display: 'block', marginBottom: '0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)'}}>Email Address</label>
                            <Input type="email" placeholder="john@example.com"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={() => setIsOpen(false)}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
    );
}
