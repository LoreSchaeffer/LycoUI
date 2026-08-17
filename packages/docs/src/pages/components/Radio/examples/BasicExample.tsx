import {Col, Radio, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>Group radio buttons using the same <code>name</code> attribute.</p>;
export const order = 1;

export const vanillaHtml = `
<label for="r1" class="radio-wrapper">
    <input type="radio" id="r1" name="demo-group" value="option-1" class="radio radio-primary" checked>
    <span>Option 1</span>
</label>
<label for="r2" class="radio-wrapper">
    <input type="radio" id="r2" name="demo-group" value="option-2" class="radio radio-primary">
    <span>Option 2</span>
</label>
<label for="r3" class="radio-wrapper is-disabled">
    <input type="radio" id="r3" name="demo-group" value="option-3" class="radio radio-primary" disabled>
    <span>Option 3 (Disabled)</span>
</label>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12} className="mb-4">
                <Radio name="demo-group" value="option-1" label="Option 1" defaultChecked/>
            </Col>
            <Col span={12} className="mb-4">
                <Radio name="demo-group" value="option-2" label="Option 2"/>
            </Col>
            <Col span={12}>
                <Radio name="demo-group" value="option-3" label="Option 3 (Disabled)" disabled/>
            </Col>
        </Row>
    );
}