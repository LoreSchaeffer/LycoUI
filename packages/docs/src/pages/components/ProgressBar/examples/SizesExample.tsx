import { Col, ProgressBar, Row } from 'lyco-ui';

export const title = 'Sizes';
export const description = <p>Progress bars support multiple sizes: <code>sm</code>, <code>md</code> (default), and <code>lg</code>.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2 text-secondary">Small (sm)</div>
  <div class="progress progress-primary progress-sm" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
    <div class="progress__bar" style="width: 25%"></div>
  </div>
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2 text-secondary">Medium (md)</div>
  <div class="progress progress-primary progress-md" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <div class="progress__bar" style="width: 50%"></div>
  </div>
</div>
<div class="mb-4">
  <div class="text-sm fw-bold mb-2 text-secondary">Large (lg)</div>
  <div class="progress progress-primary progress-lg" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div class="progress__bar" style="width: 75%"></div>
  </div>
</div>
`;

export default function SizesExample() {
  return (
    <Row>
      <Col span={12} className="mb-6">
        <div className="text-sm fw-bold mb-2 text-secondary">Small (sm)</div>
        <ProgressBar size="sm" value={25} />
      </Col>
      <Col span={12} className="mb-6">
        <div className="text-sm fw-bold mb-2 text-secondary">Medium (md)</div>
        <ProgressBar size="md" value={50} />
      </Col>
      <Col span={12} className="mb-6">
        <div className="text-sm fw-bold mb-2 text-secondary">Large (lg)</div>
        <ProgressBar size="lg" value={75} />
      </Col>
    </Row>
  );
}
