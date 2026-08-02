import type {ColorVariant} from 'lyco-ui';
import {Checkbox, Col, Row} from 'lyco-ui';

export const title = 'Colors & Variants';
export const description = <p>Use the <code>variant</code> prop to apply semantic colors to the active state.</p>;
export const order = 2;

export default function VariantsExample() {
    const variants: ColorVariant[] = ['primary', 'green', 'yellow', 'red', 'cyan', 'purple'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={12} md={4} className="mb-4">
                    <Checkbox variant={v} label={`Variant ${v}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}