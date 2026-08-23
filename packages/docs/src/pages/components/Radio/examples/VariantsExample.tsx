import type {FullVariant} from '@loreschaeffer/lyco-ui';
import {Col, Radio, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Colors & Variants';
export const description = <p>Customize the active color using the <code>variant</code> prop.</p>;
export const order = 2;

export const vanillaHtml = `
<label for="r-green" class="radio radio--green">
    <input type="radio" id="r-green" name="variant-group-green" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Variant green</span>
</label>
<label for="r-red" class="radio radio--red">
    <input type="radio" id="r-red" name="variant-group-red" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Variant red</span>
</label>
<label for="r-success" class="radio radio--success">
    <input type="radio" id="r-success" name="variant-group-success" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Variant success</span>
</label>
`;

export default function VariantsExample() {
    const variants: FullVariant[] = ['primary', 'success', 'danger', 'warning', 'info', 'green', 'teal'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={6} md={4} lg={3} className="mb-4">
                    <Radio variant={v} name={`variant-group-${v}`} label={`Variant ${v}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}