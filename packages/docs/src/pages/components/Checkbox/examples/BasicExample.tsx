import {Checkbox, Col, Row} from 'lyco-ui';

export const title = 'Basic Usage';
export const description = <p>Bind a label to the checkbox. Clicking the label automatically toggles the input.</p>;
export const order = 1;

export const vanillaHtml = `
<label for="c1" class="checkbox-wrapper">
    <input type="checkbox" id="c1" class="checkbox checkbox-primary">
    <span>Accept terms and conditions</span>
</label>
<label for="c2" class="checkbox-wrapper">
    <input type="checkbox" id="c2" class="checkbox checkbox-primary" checked>
    <span>Subscribe to newsletter</span>
</label>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12} className="mb-4">
                <Checkbox label="Accept terms and conditions"/>
            </Col>
            <Col span={12}>
                <Checkbox label="Subscribe to newsletter" defaultChecked/>
            </Col>
            <Col span={12}>
                <Checkbox label="Disabled" disabled/>
            </Col>
        </Row>
    );
}