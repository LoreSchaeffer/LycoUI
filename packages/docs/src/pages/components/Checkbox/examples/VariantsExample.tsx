import type {FullVariant} from '@loreschaeffer/lyco-ui';
import {Checkbox, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Colors & Variants';
export const description = <p>Use the <code>variant</code> prop to apply semantic colors to the active state.</p>;
export const order = 2;

export const vanillaHtml = `
<label for="c-green" class="checkbox checkbox--green">
    <input type="checkbox" id="c-green" class="checkbox__input" checked>
    <span class="checkbox__control" aria-hidden="true"></span>
    <span class="checkbox__label">Variant green</span>
</label>
<label for="c-red" class="checkbox checkbox--red">
    <input type="checkbox" id="c-red" class="checkbox__input" checked>
    <span class="checkbox__control" aria-hidden="true"></span>
    <span class="checkbox__label">Variant red</span>
</label>
<label for="c-success" class="checkbox checkbox--success">
    <input type="checkbox" id="c-success" class="checkbox__input" checked>
    <span class="checkbox__control" aria-hidden="true"></span>
    <span class="checkbox__label">Variant success</span>
</label>
`;

export default function VariantsExample() {
    const variants: FullVariant[] = ['primary', 'success', 'danger', 'warning', 'info', 'green', 'purple'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={6} md={4} lg={3} className="mb-4">
                    <Checkbox variant={v} label={`Variant ${v}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}
