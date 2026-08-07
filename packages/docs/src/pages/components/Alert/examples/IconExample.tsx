import { Alert } from 'lyco-ui';

export const title = 'Alerts with Icons';
export const description = <p>Provide a <code>ReactNode</code> to the <code>icon</code> prop to render a left-aligned icon.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="alert alert-info alert-dim has-icon" role="alert">
  <span class="alert__icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  </span>
  <div class="alert__content">A new software update is available.</div>
</div>
`;

export default function IconExample() {
  const InfoIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );

  return (
    <Alert variant="info" icon={InfoIcon}>
      A new software update is available. Please restart your application.
    </Alert>
  );
}
