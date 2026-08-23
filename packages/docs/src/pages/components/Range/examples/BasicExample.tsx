import { Col, Range, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>A simple range slider. Use the <code>defaultValue</code> for uncontrolled usage, or <code>value</code> and <code>onChange</code> for controlled usage.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Default Range</div>
  <input type="range" class="range-custom" min="0" max="100" value="50" />
</div>
<div>
  <div class="text-sm fw-bold mb-2">Disabled State</div>
  <input type="range" class="range-custom" disabled min="0" max="100" value="25" />
</div>
`;

export default function BasicExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Default Range</div>
        <Range defaultValue={50} />
      </Col>
      <Col span={6}>
        <div className="text-sm fw-bold mb-2 text-secondary">Disabled State</div>
        <Range defaultValue={25} disabled />
      </Col>
    </Row>
  );
}
