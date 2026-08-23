import { Col, Range, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Tooltip Sizes';
export const description = <p>Range supports multiple sizes for the droplet tooltip: <code>sm</code>, <code>md</code> (default), and <code>lg</code>.</p>;
export const order = 5;

export const vanillaHtml = `
<input type="range" class="range-custom" data-tooltip-size="sm" min="0" max="100" value="25" />
<input type="range" class="range-custom" data-tooltip-size="md" min="0" max="100" value="50" />
<input type="range" class="range-custom" data-tooltip-size="lg" min="0" max="100" value="75" />
`;

export default function TooltipSizesExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Small Tooltip (sm)</div>
        <Range tooltipSize="sm" defaultValue={25} />
      </Col>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Medium Tooltip (md)</div>
        <Range tooltipSize="md" defaultValue={50} />
      </Col>
      <Col span={6}>
        <div className="text-sm fw-bold mb-2 text-secondary">Large Tooltip (lg)</div>
        <Range tooltipSize="lg" defaultValue={75} />
      </Col>
    </Row>
  );
}
