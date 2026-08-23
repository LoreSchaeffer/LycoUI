import { Col, Range, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Track & Thumb Customization';
export const description = <p>Customize the track to be unfilled using <code>filled={'{'}false{'}'}</code>. By default, the thumb inherits the track's filled color logic, but you can override it explicitly with <code>coloredThumb</code>.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Unfilled Track (Default Colored Thumb)</div>
  <input type="range" class="range-custom" data-variant="info" data-filled="false" min="0" max="100" value="40" />
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Filled Track (Forced Colored Thumb)</div>
  <input type="range" class="range-custom" data-variant="danger" data-colored-thumb="true" min="0" max="100" value="70" />
</div>
<div>
  <div class="text-sm fw-bold mb-2">Unfilled Track (Forced White Thumb)</div>
  <input type="range" class="range-custom" data-variant="purple" data-filled="false" data-colored-thumb="false" min="0" max="100" value="55" />
</div>
`;

export default function TrackAndThumbExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Unfilled Track (Default Colored Thumb)</div>
        <Range defaultValue={40} variant="info" filled={false} />
      </Col>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Filled Track (Forced Colored Thumb)</div>
        <Range defaultValue={70} variant="danger" coloredThumb={true} />
      </Col>
      <Col span={6}>
        <div className="text-sm fw-bold mb-2 text-secondary">Unfilled Track (Forced White Thumb)</div>
        <Range defaultValue={55} variant="purple" filled={false} coloredThumb={false} />
      </Col>
    </Row>
  );
}
