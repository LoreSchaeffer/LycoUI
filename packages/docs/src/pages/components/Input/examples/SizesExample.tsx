import {Col, Input, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Sizes';
export const description = <p>The input supports three sizes: <code>sm</code>, <code>md</code> (default), and <code>lg</code>.</p>;
export const order = 4;

export const vanillaHtml = `
<div class="mb-4">
  <input type="text" class="input-custom" data-size="sm" placeholder="Small..." />
</div>
<div class="mb-4">
  <input type="text" class="input-custom" data-size="md" placeholder="Medium..." />
</div>
<div>
  <input type="text" class="input-custom" data-size="lg" placeholder="Large..." />
</div>
`;

export default function SizesExample() {
    return (
        <Row>
            <Col span={12} md={6} className="mb-4">
                <div className="text-sm fw-bold mb-2 text-secondary">Small (sm)</div>
                <Input size="sm" placeholder="Small..."/>
            </Col>
            <Col span={12} md={6} className="mb-4">
                <div className="text-sm fw-bold mb-2 text-secondary">Medium (md)</div>
                <Input size="md" placeholder="Medium..."/>
            </Col>
            <Col span={12} md={6} className="mb-4">
                <div className="text-sm fw-bold mb-2 text-secondary">Large (lg)</div>
                <Input size="lg" placeholder="Large..."/>
            </Col>
        </Row>
    );
}
