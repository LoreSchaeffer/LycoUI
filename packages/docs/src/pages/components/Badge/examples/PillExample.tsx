import {Badge, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Pill & Dim Variations';
export const description = <p>Use the <code>pill</code> prop to make badges fully rounded. Use the <code>dim</code> prop for a softer look with a semi-transparent background. These props can be combined to indicate secondary statuses.</p>;
export const order = 2;

export const vanillaHtml = `
<!-- Pill -->
<span class="badge badge--primary badge--pill">Pro</span>

<!-- Dim -->
<span class="badge badge--success badge--dim">Healthy</span>

<!-- Dim Pill -->
<span class="badge badge--danger badge--pill badge--dim">Offline</span>
`;

export default function PillExample() {
    return (
        <Row>
            <Col span={12} md={4} className="mb-4">
                <h4 className="mb-3">Solid Pill</h4>
                <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <Badge variant="primary" pill>Pro</Badge>
                    <Badge variant="secondary" pill>Free</Badge>
                    <Badge variant="danger" pill>Banned</Badge>
                </div>
            </Col>

            <Col span={12} md={4} className="mb-4">
                <h4 className="mb-3">Dim Square</h4>
                <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <Badge variant="primary" dim>Verified</Badge>
                    <Badge variant="secondary" dim>Pending</Badge>
                    <Badge variant="warning" dim>Review</Badge>
                </div>
            </Col>

            <Col span={12} md={4}>
                <h4 className="mb-3">Dim Pill</h4>
                <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <Badge variant="success" pill dim>Healthy</Badge>
                    <Badge variant="info" pill dim>Syncing</Badge>
                    <Badge variant="white" pill dim>Unknown</Badge>
                </div>
            </Col>
        </Row>
    );
}
