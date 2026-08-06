import type {FullVariant} from 'lyco-ui';
import {Col, Radio, Row} from 'lyco-ui';

export const title = 'Colors & Variants';
export const description = <p>Customize the active color using the <code>variant</code> prop.</p>;
export const order = 2;

export const vanillaHtml = `
<label for="r-green" class="radio-wrapper">
    <input type="radio" id="r-green" name="variant-group-green" class="radio radio-green" checked>
    <span>Variant green</span>
</label>
<label for="r-red" class="radio-wrapper">
    <input type="radio" id="r-red" name="variant-group-red" class="radio radio-red" checked>
    <span>Variant red</span>
</label>
<label for="r-success" class="radio-wrapper">
    <input type="radio" id="r-success" name="variant-group-success" class="radio radio-success" checked>
    <span>Variant success</span>
</label>
`;

export default function VariantsExample() {
    const variants: FullVariant[] = ['primary', 'success', 'danger', 'warning', 'info', 'green', 'teal'];

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