import { Col, Range, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>A simple range slider with a droplet tooltip.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Primary Variant (Default)</div>
  <input type="range" class="range-custom" data-variant="primary" min="0" max="100" value="50" />
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Success Variant</div>
  <input type="range" class="range-custom" data-variant="success" min="0" max="100" value="75" />
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Danger Variant (No Tooltip)</div>
  <input type="range" class="range-custom" data-variant="danger" data-show-tooltip="false" min="0" max="100" value="40" />
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Purple Variant (Unfilled Track)</div>
  <input type="range" class="range-custom" data-variant="purple" data-filled="false" min="0" max="100" value="60" />
</div>
<div>
  <div class="text-sm fw-bold mb-2">Disabled State</div>
  <input type="range" class="range-custom" disabled min="0" max="100" value="25" />
</div>
`;

export default function BasicExample() {
  return (
    <Row>
      <Col span={12} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Primary Variant (Default)</div>
        <Range defaultValue={50} variant="primary" />
      </Col>
      <Col span={12} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Success Variant</div>
        <Range defaultValue={75} variant="success" />
      </Col>
      <Col span={12} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Danger Variant (No Tooltip)</div>
        <Range defaultValue={40} variant="danger" showTooltip={false} />
      </Col>
      <Col span={12} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Purple Variant (Unfilled Track)</div>
        <Range defaultValue={60} variant="purple" filled={false} />
      </Col>
      <Col span={12}>
        <div className="text-sm fw-bold mb-2 text-secondary">Disabled State</div>
        <Range defaultValue={25} disabled />
      </Col>
    </Row>
  );
}
