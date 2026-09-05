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
                        <p className="mb-0">The Q3 Marketing Campaign has reached 85% of its engagement targets. Early metrics indicate strong performance in the EMEA region.</p>
                    </Card.Body>
                    <Card.Footer className="text-secondary">Last updated by Admin • 2 days ago</Card.Footer>
                </Card>
            </Col>
            <Col span={6} className="mb-4">
                <Card>
                    <Card.Body>
                        <h4 className="mb-2">API Documentation</h4>
                        <p className="text-secondary mb-0">Learn how to authenticate and start making requests to our GraphQL endpoints.</p>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
