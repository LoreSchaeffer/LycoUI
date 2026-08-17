import type {CardPadding} from '@loreschaeffer/lyco-ui';
import {Card, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Paddings';
export const description = <p>Control the internal spacing of the card using the <code>padding</code> prop.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="card card-elevation-1 card-padding-none">
    <p class="text-center mb-0">Padding: <strong>none</strong></p>
</div>
<div class="card card-elevation-1 card-padding-md">
    <p class="text-center mb-0">Padding: <strong>md</strong></p>
</div>
`;

export default function PaddingsExample() {
    const paddings: CardPadding[] = ['none', 'sm', 'md', 'lg'];

    return (
        <Row align="end">
            {paddings.map((pad) => (
                <Col key={pad} span={12} md={3} className="mb-4">
                    <Card padding={pad}>
                        <p className="text-center mb-0">Padding: <strong>{pad}</strong></p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}