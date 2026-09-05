import {Col, Range, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Sizes';
export const description = <p>Range supports multiple sizes: <code>sm</code>, <code>md</code> (default), and <code>lg</code>.</p>;
export const order = 4;

export const vanillaHtml = `
<input type="range" class="range-custom" data-size="sm" min="0" max="100" value="25" />
<input type="range" class="range-custom" data-size="md" min="0" max="100" value="50" />
<input type="range" class="range-custom" data-size="lg" min="0" max="100" value="75" />
`;

export default function SizesExample() {
    return (
        <Row>
            <Col span={12} className="mb-8">
                <Range size="sm" defaultValue={25}/>
            </Col>
            <Col span={12} className="mb-8">
                <Range size="md" defaultValue={50}/>
            </Col>
            <Col span={12}>
                <Range size="lg" defaultValue={75}/>
            </Col>
        </Row>
    );
}
