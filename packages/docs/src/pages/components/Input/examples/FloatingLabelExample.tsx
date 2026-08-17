import { Col, Input, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Floating Labels';
export const description = <p>Floating labels animate above the field when the input is focused or has a value. Without a label, the input acts as a standard text field with a placeholder.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="mb-4">
  <input type="text" class="input-custom" data-label="Full Name" placeholder="John Doe" />
</div>
<div class="mb-4">
  <input type="email" class="input-custom" data-label="Email Address" placeholder="email@example.com" />
</div>
<div>
  <input type="text" class="input-custom" placeholder="No label, just placeholder" />
</div>
`;

export default function FloatingLabelExample() {
  return (
    <Row>
      <Col span={12} md={6} className="mb-4">
        <Input label="Full Name" placeholder="John Doe" />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <Input label="Email Address" type="email" placeholder="email@example.com" />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <Input placeholder="No label, just placeholder" />
      </Col>
    </Row>
  );
}
