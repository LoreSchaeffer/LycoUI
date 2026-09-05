import {Checkbox, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>Bind a label to the checkbox. Clicking the label automatically toggles the input.</p>;
export const order = 1;

export const vanillaHtml = `
<label for="c1" class="checkbox checkbox--primary">
    <input type="checkbox" id="c1" class="checkbox__input">
    <span class="checkbox__control" aria-hidden="true"></span>
    <span class="checkbox__label">Accept terms and conditions</span>
</label>
<label for="c2" class="checkbox checkbox--primary">
    <input type="checkbox" id="c2" class="checkbox__input" checked>
    <span class="checkbox__control" aria-hidden="true"></span>
    <span class="checkbox__label">Subscribe to newsletter</span>
</label>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12} md={4} className="mb-4">
                <Checkbox label="Accept terms and conditions"/>
            </Col>
            <Col span={12} md={4} className="mb-4">
                <Checkbox label="Subscribe to newsletter" defaultChecked/>
            </Col>
            <Col span={12} md={4} className="mb-4">
                <Checkbox label="Disabled" disabled/>
            </Col>
        </Row>
    );
}
