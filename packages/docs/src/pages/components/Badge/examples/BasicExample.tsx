import {Badge, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Badges';
export const description = <p>Badges support all standard theme colors. By default, they have a solid background, a subtle shadow, and a top highlight. Use them to draw attention to status, categorizations, or counts.</p>;
export const order = 1;

export const vanillaHtml = `
<span class="badge badge--primary">New Feature</span>
<span class="badge badge--success">Completed</span>
<span class="badge badge--danger">Failed</span>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12}>
                <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <Badge variant="primary">New Feature</Badge>
                    <Badge variant="secondary">Draft</Badge>
                    <Badge variant="danger">Failed</Badge>
                    <Badge variant="warning">Action Required</Badge>
                    <Badge variant="success">Completed</Badge>
                    <Badge variant="info">In Progress</Badge>
                    <Badge variant="white">Archived</Badge>
                </div>
            </Col>
        </Row>
    );
}
