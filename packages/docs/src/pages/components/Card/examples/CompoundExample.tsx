import {Card, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Compound Architecture';
export const description = <p>Structure your cards gracefully using <code>Card.Header</code>, <code>Card.Body</code>, and <code>Card.Footer</code>.</p>;
export const order = 0;

export const vanillaHtml = `
<div class="card card--elevation-1">
    <div class="card__header">Project Overview</div>
    <div class="card__body">
        <p class="mb-0">This is the main content area of the card.</p>
    </div>
    <div class="card__footer text-secondary">Last updated 2 days ago</div>
</div>
`;

export default function CompoundExample() {
    return (
        <Row>
            <Col span={6} className="mb-4">
                <Card>
                    <Card.Header>Project Overview</Card.Header>
                    <Card.Body>
                        <p className="mb-0">This is the main content area of the card. It automatically scales and fills the available space.</p>
                    </Card.Body>
                    <Card.Footer className="text-secondary">Last updated 2 days ago</Card.Footer>
                </Card>
            </Col>
            <Col span={6} className="mb-4">
                <Card>
                    <Card.Body>
                        <h4 className="mb-2">Simple Card</h4>
                        <p className="text-secondary mb-0">Sometimes a simple body is all you need.</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
