import { Col, ProgressBar, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Variants';
export const description = <p>ProgressBar supports all theme color variants via the <code>variant</code> prop.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="mb-4">
  <div class="progress progress--success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
    <div class="progress__bar" style="width: 100%;"></div>
  </div>
</div>
`;

export default function VariantsExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Success</div>
        <ProgressBar value={100} variant="success" />
      </Col>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Warning</div>
        <ProgressBar value={60} variant="warning" />
      </Col>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Danger</div>
        <ProgressBar value={25} variant="danger" />
      </Col>
      <Col span={6}>
        <div className="text-sm fw-bold mb-2 text-secondary">Purple</div>
        <ProgressBar value={75} variant="purple" />
      </Col>
    </Row>
  );
}
