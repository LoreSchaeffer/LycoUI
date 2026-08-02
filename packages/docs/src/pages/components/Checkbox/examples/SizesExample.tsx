import type {SizeVariant} from 'lyco-ui';
import {Checkbox, Col, Row} from 'lyco-ui';

export const title = 'Sizes';
export const description = <p>Use the <code>size</code> prop to scale the checkbox proportionally.</p>;
export const order = 3;

export default function SizesExample() {
    const sizes: SizeVariant[] = ['sm', 'base', 'lg'];

    return (
        <Row align="center">
            {sizes.map((s) => (
                <Col key={s} span={12} md={4} className="mb-4">
                    <Checkbox size={s} label={`Size ${s}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}