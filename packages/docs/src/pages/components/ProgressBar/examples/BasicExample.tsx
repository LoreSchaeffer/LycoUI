import { Col, ProgressBar, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Progress';
export const description = <p>A simple progress bar to indicate task completion. Use <code>value</code> and <code>max</code> to determine the percentage.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2">Downloading...</div>
  <div class="progress" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
    <div class="progress__bar" style="width: 45%;"></div>
  </div>
</div>
`;

export default function BasicExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <div className="text-sm fw-bold mb-2 text-secondary">Downloading... (45%)</div>
        <ProgressBar value={45} max={100} />
      </Col>
      <Col span={6}>
        <div className="text-sm fw-bold mb-2 text-secondary">Uploading... (80%)</div>
        <ProgressBar value={80} max={100} />
      </Col>
    </Row>
  );
}
