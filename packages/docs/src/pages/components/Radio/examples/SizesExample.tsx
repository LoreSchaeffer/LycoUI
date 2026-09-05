import type {SizeVariant} from '@loreschaeffer/lyco-ui';
import {Col, Radio, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Sizes';
export const description = <p>Adjust the dimensions using the <code>size</code> prop.</p>;
export const order = 3;

export const vanillaHtml = `
<label for="r-sm" class="radio radio--primary radio--sm">
    <input type="radio" id="r-sm" name="size-group" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Size sm</span>
</label>
<label for="r-md" class="radio radio--primary">
    <input type="radio" id="r-md" name="size-group" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Size md</span>
</label>
<label for="r-lg" class="radio radio--primary radio--lg">
    <input type="radio" id="r-lg" name="size-group" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Size lg</span>
</label>
`;

export default function SizesExample() {
    const sizes: SizeVariant[] = ['sm', 'md', 'lg'];

    return (
        <Row align="center">
            {sizes.map((s) => (
                <Col key={s} span={12} sm={6} md={4} className="mb-4">
                    <Radio size={s} name="size-group" label={`Size ${s}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}
