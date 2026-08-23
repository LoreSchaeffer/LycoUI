import type {FullVariant} from '@loreschaeffer/lyco-ui';
import {Card, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Solid Mode';
export const description = <p>Set <code>isDim={`{false}`}</code> to force a solid background color. Typography contrast is handled automatically.</p>;
export const order = 4;

export const vanillaHtml = `
<div class="card card--elevation-1 card--variant card--solid card--primary">
    <div class="card__body">
        <h4 class="mb-2">primary</h4>
        <p class="mb-0">Solid variant with automatic contrast.</p>
    </div>
</div>
`;

export default function SolidExample() {
    const variants: FullVariant[] = ['primary', 'warning', 'success', 'danger', 'purple', 'neutral'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={6} className="mb-4">
                    <Card variant={v} isDim={false}>
                        <Card.Body>
                            <h4 className="mb-2" style={{textTransform: 'capitalize'}}>{v}</h4>
                            <p className="mb-0">Solid variant with automatic contrast.</p>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}