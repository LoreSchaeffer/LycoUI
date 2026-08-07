import { Col, Input, Row } from 'lyco-ui';

export const title = 'Basic Usage';
export const description = <p>Simple text inputs with different color variants. The input border and focus ring reflect the chosen variant.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="mb-4">
  <input type="text" class="input-custom" data-variant="primary" placeholder="Type something..." />
</div>
<div class="mb-4">
  <input type="text" class="input-custom" data-variant="success" placeholder="Type something..." />
</div>
<div class="mb-4">
  <input type="text" class="input-custom" data-variant="purple" placeholder="Type something..." />
</div>
<div class="mb-4">
  <input type="text" class="input-custom" data-variant="primary" placeholder="Read-only input..." readonly value="Cannot edit this" />
</div>
<div>
  <input type="text" class="input-custom" data-variant="primary" placeholder="Cannot type here" disabled />
</div>
`;

export default function BasicExample() {
  return (
    <Row>
      <Col span={12} md={6} className="mb-4">
        <Input placeholder="Type something..." />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <Input variant="success" placeholder="Type something..." />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <Input variant="purple" placeholder="Type something..." />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <Input readOnly value="Cannot edit this" placeholder="Read-only input..." />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <Input placeholder="Cannot type here" disabled />
      </Col>
    </Row>
  );
}
