import { Col, ProgressBar, Row } from 'lyco-ui';
import type { FullVariant } from 'lyco-ui';

export const title = 'Colors & Variants';
export const description = <p>Customize the color of the progress bar using the variant prop.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="mb-4">
  <div class="text-sm fw-bold mb-2 text-secondary">Success Variant</div>
  <div class="progress progress-success progress-md" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div class="progress__bar" style="width: 75%"></div>
  </div>
</div>
`;

export default function VariantsExample() {
  const variants: FullVariant[] = ['primary', 'success', 'danger', 'warning', 'info', 'green', 'purple'];

  return (
    <Row>
      {variants.map((v, i) => (
        <Col key={v} span={12} className="mb-4">
          <div className="text-sm fw-bold mb-2 text-secondary" style={{ textTransform: 'capitalize' }}>
            {v} Variant
          </div>
          <ProgressBar variant={v} value={(i + 1) * 12} />
        </Col>
      ))}
    </Row>
  );
}
