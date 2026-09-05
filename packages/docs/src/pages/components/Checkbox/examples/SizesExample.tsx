import type {SizeVariant} from '@loreschaeffer/lyco-ui';
import {Checkbox, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Sizes';
export const description = <p>Use the <code>size</code> prop to scale the checkbox proportionally.</p>;
export const order = 3;

export const vanillaHtml = `
<label for="c-sm" class="checkbox checkbox--primary checkbox--sm">
    <input type="checkbox" id="c-sm" class="checkbox__input">
    <span class="checkbox__control" aria-hidden="true"></span>
    <span class="checkbox__label">Size sm</span>
</label>
<label for="c-md" class="checkbox checkbox--primary">
    <input type="checkbox" id="c-md" class="checkbox__input">
    <span class="checkbox__control" aria-hidden="true"></span>
    <span class="checkbox__label">Size md</span>
</label>
<label for="c-lg" class="checkbox checkbox--primary checkbox--lg">
    <input type="checkbox" id="c-lg" class="checkbox__input">
    <span class="checkbox__control" aria-hidden="true"></span>
    <span class="checkbox__label">Size lg</span>
</label>
`;

export default function SizesExample() {
    const sizes: SizeVariant[] = ['sm', 'md', 'lg'];

    return (
        <Row align="center">
            {sizes.map((s) => (
                <Col key={s} span={12} sm={6} md={4} className="mb-4">
                    <Checkbox size={s} label={`Size ${s}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}
