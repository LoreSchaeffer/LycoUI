import { Alert } from '@loreschaeffer/lyco-ui';

export const title = 'Closable Alerts';
export const description = <p>Add the <code>closable</code> prop to display a close button. You can provide an <code>onClose</code> callback to perform actions when the alert is dismissed.</p>;
export const order = 3;

export const vanillaHtml = `
<!-- The Vanilla controller will automatically bind the close button if it exists -->
<div class="alert alert-primary alert-dim alert-closable" role="alert">
  <div class="alert__content">You can close this alert.</div>
  <button type="button" class="alert__close" aria-label="Close">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </button>
</div>
`;

export default function ClosableExample() {
  return (
    <Alert 
      variant="purple" 
      closable 
      onClose={() => alert('Alert closed manually!')}
    >
      Click the 'X' button on the right to dismiss this message.
    </Alert>
  );
}
