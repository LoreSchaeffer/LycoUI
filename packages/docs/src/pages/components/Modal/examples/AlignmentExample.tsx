import React, { useState } from 'react';
import { Modal, Button, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Vertical Alignment';
export const description = <p>Modals are vertically centered by default. You can disable this by passing <code>centered={'{'}false{'}'}</code>.</p>;
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
                <Button variant="primary" onClick={() => setIsOpen(true)}>
                    Launch Top-Aligned Modal
                </Button>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} centered={false}>
                    <Modal.Header>
                        <Modal.Title>Top Aligned</Modal.Title>
                        <button type="button" className="modal__close" onClick={() => setIsOpen(false)} aria-label="Close">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>This modal appears near the top of the viewport instead of being vertically centered.</p>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
}
