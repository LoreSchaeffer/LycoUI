import { Alert } from 'lyco-ui';

export const title = 'Basic Alerts';
export const description = <p>Alerts use an elegant and subtle dim styling by default. You can use any semantic color variant, including <code>white</code>.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="alert alert-success" role="alert">
  <div class="alert__content">This is a success alert.</div>
</div>
<div class="alert alert-white" role="alert">
  <div class="alert__content">This is a white alert.</div>
</div>
`;

export default function BasicExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="success">
        This is a default success alert. Notice the light background and accent border.
      </Alert>
      <Alert variant="danger">
        A destructive alert, perfect for non-intrusive validation errors.
      </Alert>
      <Alert variant="white">
        This is a white alert.
      </Alert>
    </div>
  );
}
