import {Col, Radio, Row} from 'lyco-ui';

export const title = 'Basic Usage';
export const description = <p>Group radio buttons using the same <code>name</code> attribute.</p>;
export const order = 1;

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