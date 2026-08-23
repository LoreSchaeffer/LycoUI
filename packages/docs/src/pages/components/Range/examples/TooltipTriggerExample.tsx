import { Col, Range, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Tooltip Triggers & Visibility';
export const description = <p>The tooltip is shown by default when interacting with the slider (<code>active</code>). You can also show it on hover using <code>tooltipTrigger="hover"</code>, or hide it entirely using <code>showTooltip={'{'}false{'}'}</code>.</p>;
export const order = 7;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Hover Trigger</div>
  <input type="range" class="range-custom" data-tooltip-trigger="hover" min="0" max="100" value="30" />
</div>
<div>
  <div class="text-sm fw-bold mb-2">Hidden Tooltip</div>
  <input type="range" class="range-custom" data-show-tooltip="false" min="0" max="100" value="80" />
</div>
`;

export default function TooltipTriggerExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Hover Trigger</div>
        <Range defaultValue={30} tooltipTrigger="hover" />
      </Col>
      <Col span={6}>
        <div className="text-sm fw-bold mb-2 text-secondary">Hidden Tooltip</div>
        <Range defaultValue={80} showTooltip={false} />
      </Col>
    </Row>
  );
}
