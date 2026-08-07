import { Col, ProgressBar, Row } from 'lyco-ui';

export const title = 'Basic Usage';
export const description = <p>A basic progress bar to indicate task completion.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="progress progress-primary progress-md" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
  <div class="progress__bar" style="width: 50%"></div>
</div>
`;

export default function BasicExample() {
  return (
    <Row>
      <Col span={12}>
        <ProgressBar value={50} />
      </Col>
    </Row>
  );
}
