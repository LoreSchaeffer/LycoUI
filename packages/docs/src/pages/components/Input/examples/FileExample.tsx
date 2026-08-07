import { Col, Input, Row } from 'lyco-ui';

export const title = 'File Input';
export const description = <p>The Input component fully supports <code>type="file"</code>. The file selector button is styled to match the component's variant, and placeholders are hidden automatically.</p>;
export const order = 8;

export const vanillaHtml = `
<div class="mb-4">
  <input type="file" class="input-custom" />
</div>
<div class="mb-4">
  <input type="file" class="input-custom" data-variant="success" />
</div>
<div class="mb-4">
  <input type="file" class="input-custom" data-variant="purple" data-size="sm" />
</div>
<div class="mb-4">
  <input type="file" class="input-custom" data-variant="primary" data-size="lg" />
</div>
`;

export default function FileExample() {
  return (
    <Row>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Default (md)</div>
        <Input type="file" />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Success Variant</div>
        <Input type="file" variant="success" />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Purple Variant (sm)</div>
        <Input type="file" variant="purple" size="sm" />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Primary Variant (lg)</div>
        <Input type="file" size="lg" />
      </Col>
    </Row>
  );
}
