import React, {useState} from 'react';
import {Button, Col, Modal, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Modal Sizes';
export const description = <p>Use the <code>size</code> prop to control the modal's maximum width: <code>sm</code>, <code>md</code> (default), <code>lg</code>, or <code>xl</code>.</p>;
export const order = 2;

export const vanillaHtml = `
<!-- Trigger Buttons -->
<button class="button button--primary" data-lyco-toggle="modal" data-lyco-target="#smallModal">Small</button>
<button class="button button--primary" data-lyco-toggle="modal" data-lyco-target="#largeModal">Large</button>

<!-- Small Modal -->
<div class="modal hidden" id="smallModal" tabindex="-1">
    <div class="modal__dialog modal__dialog--sm modal__dialog--centered">
        <!-- content -->
    </div>
</div>
`;

export default function SizesExample() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);

    return (
        <Row>
            <Col span={6} className="mb-4">
                <div className="text-sm fw-bold mb-2 text-secondary">Small (sm)</div>
                <Button variant="primary" onClick={() => setSize('sm')}>Open Small Modal</Button>
            </Col>
            <Col span={6} className="mb-4">
                <div className="text-sm fw-bold mb-2 text-secondary">Large (lg)</div>
                <Button variant="primary" onClick={() => setSize('lg')}>Open Large Modal</Button>
            </Col>

            <Modal isOpen={size !== null} onClose={() => setSize(null)} size={size || 'md'}>
                <Modal.Header>
                    <Modal.Title>Modal Size: {size}</Modal.Title>
                    <button type="button" className="modal__close" onClick={() => setSize(null)} aria-label="Close">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <p>This modal is using the <code>{size}</code> size variant.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSize(null)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
}
