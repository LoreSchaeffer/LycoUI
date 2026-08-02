import type {ColorVariant} from 'lyco-ui';
import {Card, Col, Row} from 'lyco-ui';

export const title = 'Variants (Dim Mode)';
export const description = <p>By default, applying a <code>variant</code> renders the card in dim mode, utilizing a subtle transparency layer based on the global tokens.</p>;
export const order = 2;

export default function VariantsExample() {
    const variants: ColorVariant[] = ['primary', 'green', 'yellow', 'red', 'cyan', 'purple'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={12} md={4} className="mb-4">
                    <Card variant={v}>
                        <h4 className="mb-2" style={{textTransform: 'capitalize'}}>{v}</h4>
                        <p className="mb-0">Dim variant applied.</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}