import { Col, Range, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Color Variants';
export const description = <p>Range supports all theme color variants via the <code>variant</code> prop.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Success</div>
  <input type="range" class="range-custom" data-variant="success" min="0" max="100" value="60" />
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Warning</div>
  <input type="range" class="range-custom" data-variant="warning" min="0" max="100" value="75" />
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Danger</div>
  <input type="range" class="range-custom" data-variant="danger" min="0" max="100" value="40" />
</div>
<div>
  <div class="text-sm fw-bold mb-2">Purple</div>
  <input type="range" class="range-custom" data-variant="purple" min="0" max="100" value="85" />
</div>
`;

export default function VariantsExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Success Variant</div>
        <Range defaultValue={60} variant="success" />
      </Col>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Warning Variant</div>
        <Range defaultValue={75} variant="warning" />
      </Col>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Danger Variant</div>
        <Range defaultValue={40} variant="danger" />
      </Col>
      <Col span={6}>
        <div className="text-sm fw-bold mb-2 text-secondary">Purple Variant</div>
        <Range defaultValue={85} variant="purple" />
      </Col>
    </Row>
  );
}
