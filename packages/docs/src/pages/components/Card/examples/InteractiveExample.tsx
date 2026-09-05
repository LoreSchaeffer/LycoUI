import {Card, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Interactive States';
export const description = <p>Use the <code>interactive</code> prop to enable smooth hover effects, elevating the card and strengthening its border.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="card card--interactive card--elevation-1">
    <div class="card__body">
        <h4 class="mb-2">Hover me</h4>
        <p class="text-secondary mb-0">This card is interactive and will elevate slightly.</p>
    </div>
</div>
`;

export default function InteractiveExample() {
    return (
        <Row>
            <Col span={6} className="mb-4">
                <Card interactive>
                    <Card.Body>
                        <h4 className="mb-2">View Analytics</h4>
                        <p className="text-secondary mb-0">Click to explore detailed traffic and conversion reports.</p>
                    </Card.Body>
                </Card>
            </Col>
            <Col span={6} className="mb-4">
                <Card interactive elevation={2}>
                    <Card.Body>
                        <h4 className="mb-2">Manage Subscription</h4>
                        <p className="text-secondary mb-0">Upgrade your plan to unlock premium integrations.</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
