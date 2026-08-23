import {Col, Radio, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>Group radio buttons using the same <code>name</code> attribute.</p>;
export const order = 1;

export const vanillaHtml = `
<label for="r1" class="radio radio--primary">
    <input type="radio" id="r1" name="demo-group" value="option-1" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Option 1</span>
</label>
<label for="r2" class="radio radio--primary">
    <input type="radio" id="r2" name="demo-group" value="option-2" class="radio__input">
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Option 2</span>
</label>
<label for="r3" class="radio radio--primary is-disabled">
    <input type="radio" id="r3" name="demo-group" value="option-3" class="radio__input" disabled>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Option 3 (Disabled)</span>
</label>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12} md={4} className="mb-4">
                <Radio name="demo-group" value="option-1" label="Option 1" defaultChecked/>
            </Col>
            <Col span={12} md={4} className="mb-4">
                <Radio name="demo-group" value="option-2" label="Option 2"/>
            </Col>
            <Col span={12} md={4} className="mb-4">
                <Radio name="demo-group" value="option-3" label="Option 3 (Disabled)" disabled/>
            </Col>
        </Row>
    );
}