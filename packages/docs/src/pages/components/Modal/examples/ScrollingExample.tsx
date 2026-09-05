import React, {useState} from 'react';
import {Button, Col, Modal, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Scrolling Content';
export const description = <p>When modals become too long for the user's viewport or device, they scroll independent of the page itself. Use <code>scrollable</code> to only scroll the modal body.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="modal hidden" id="scrollModal" tabindex="-1">
    <div class="modal__dialog modal__dialog--scrollable modal__dialog--centered">
        <div class="modal__content">
            <div class="modal__header">...</div>
            <div class="modal__body">
                <!-- Long content here -->
            </div>
            <div class="modal__footer">...</div>
        </div>
    </div>
</div>
`;

export default function ScrollingExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Row>
            <Col span={12}>
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                    Launch Scrollable Modal
                </Button>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} scrollable>
                    <Modal.Header>
                        <Modal.Title>Scrollable Modal</Modal.Title>
                        <button type="button" className="modal__close" onClick={() => setIsOpen(false)} aria-label="Close">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{height: '150vh', background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, var(--color-surface-hover) 10px, var(--color-surface-hover) 20px)'}}>
                            <span style={{display: 'block', padding: '1rem', background: 'var(--color-bg-surface)'}}>
                                The modal body has a fixed max-height and scrolls internally, while the header and footer remain pinned to the top and bottom.
                            </span>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
    );
}
