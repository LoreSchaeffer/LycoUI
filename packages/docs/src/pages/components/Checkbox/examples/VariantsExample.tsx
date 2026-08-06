import type {FullVariant} from 'lyco-ui';
import {Checkbox, Col, Row} from 'lyco-ui';

export const title = 'Colors & Variants';
export const description = <p>Use the <code>variant</code> prop to apply semantic colors to the active state.</p>;
export const order = 2;

export const vanillaHtml = `
<label for="c-green" class="checkbox-wrapper">
    <input type="checkbox" id="c-green" class="checkbox checkbox-green" checked>
    <span>Variant green</span>
</label>
<label for="c-red" class="checkbox-wrapper">
    <input type="checkbox" id="c-red" class="checkbox checkbox-red" checked>
    <span>Variant red</span>
</label>
<label for="c-success" class="checkbox-wrapper">
    <input type="checkbox" id="c-success" class="checkbox checkbox-success" checked>
    <span>Variant success</span>
</label>
`;

export default function VariantsExample() {
    const variants: FullVariant[] = ['primary', 'success', 'danger', 'warning', 'info', 'green', 'purple'];

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