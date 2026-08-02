import type {ColorVariant} from 'lyco-ui';
import {Col, Radio, Row} from 'lyco-ui';

export const title = 'Colors & Variants';
export const description = <p>Customize the active color using the <code>variant</code> prop.</p>;
export const order = 2;

export default function VariantsExample() {
    const variants: ColorVariant[] = ['primary', 'green', 'yellow', 'red', 'cyan', 'teal'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={12} md={4} className="mb-4">
                    <Radio variant={v} name={`variant-group-${v}`} label={`Variant ${v}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}