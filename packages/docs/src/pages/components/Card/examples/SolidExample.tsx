import type {ColorVariant} from 'lyco-ui';
import {Card, Col, Row} from 'lyco-ui';

export const title = 'Solid Mode';
export const description = <p>Set <code>isDim={`{false}`}</code> to force a solid background color. Typography contrast is handled automatically.</p>;
export const order = 3;

export default function SolidExample() {
    const variants: ColorVariant[] = ['primary', 'yellow', 'green', 'red', 'purple', 'neutral'];

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