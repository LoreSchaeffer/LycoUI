import type {SizeVariant} from 'lyco-ui';
import {Col, Radio, Row} from 'lyco-ui';

export const title = 'Sizes';
export const description = <p>Adjust the dimensions using the <code>size</code> prop.</p>;
export const order = 3;

export default function SizesExample() {
    const sizes: SizeVariant[] = ['sm', 'base', 'lg'];

    return (
        <Row align="center">
            {sizes.map((s) => (
                <Col key={s} span={12} md={4} className="mb-4">
                    <Radio size={s} name="size-group" label={`Size ${s}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}