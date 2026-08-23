import { Col, ProgressBar, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Sizes';
export const description = <p>Adjust the thickness and border-radius using the <code>size</code> prop: <code>sm</code>, <code>md</code> (default), or <code>lg</code>.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="progress progress--sm" role="progressbar" aria-valuenow="50">
  <div class="progress__bar" style="width: 50%;"></div>
</div>
`;

export default function SizesExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Small (sm)</div>
        <ProgressBar value={30} size="sm" variant="info" />
      </Col>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Medium (md - Default)</div>
        <ProgressBar value={50} size="md" variant="info" />
      </Col>
      <Col span={6}>
        <div className="text-sm fw-bold mb-2 text-secondary">Large (lg)</div>
        <ProgressBar value={80} size="lg" variant="info" />
      </Col>
    </Row>
  );
}
