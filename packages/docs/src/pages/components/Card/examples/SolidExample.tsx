import type {FullVariant} from '@loreschaeffer/lyco-ui';
import {Card, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Solid Mode';
export const description = <p>Set <code>isDim={`{false}`}</code> to force a solid background color. Typography contrast is handled automatically.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="card card-elevation-1 card-padding-md card-variant card-solid card-primary">
    <h4 class="mb-2">primary</h4>
    <p class="mb-0">Solid variant with automatic contrast.</p>
</div>
<div class="card card-elevation-1 card-padding-md card-variant card-solid card-warning">...</div>
`;

export default function SolidExample() {
    const variants: FullVariant[] = ['primary', 'warning', 'success', 'danger', 'purple', 'neutral'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={12} md={4} className="mb-4">
                    <Card variant={v} isDim={false}>
                        <h4 className="mb-2" style={{textTransform: 'capitalize'}}>{v}</h4>
                        <p className="mb-0">Solid variant with automatic contrast.</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}