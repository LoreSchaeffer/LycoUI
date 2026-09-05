import React, {useState} from 'react';
import {Button, Col, Modal, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Vertical Alignment';
export const description = <p>Modals are vertically centered by default. You can disable this by passing <code>centered={'{'}false{'}'}</code>. Here we also demonstrate a destructive "Danger" modal.</p>;
export const order = 4;

export const vanillaHtml = `
<!-- Remove modal__dialog--centered class for top-aligned modal -->
<div class="modal hidden" id="topModal" tabindex="-1">
    <div class="modal__dialog modal__dialog--md">
        <!-- content -->
    </div>
</div>
`;

export default function AlignmentExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Row>
            <Col span={12}>
                <Button variant="danger" onClick={() => setIsOpen(true)}>
                    Delete Account
                </Button>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} centered={false}>
                    <Modal.Header>
                        <Modal.Title style={{color: 'var(--color-danger)'}}>Confirm Account Deletion</Modal.Title>
                        <button type="button" className="modal__close" onClick={() => setIsOpen(false)} aria-label="Close">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{color: 'var(--color-text-secondary)'}}>Are you sure you want to permanently delete your account? This action cannot be undone and you will lose all of your data.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button variant="danger" onClick={() => setIsOpen(false)}>Yes, delete account</Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
    );
}
