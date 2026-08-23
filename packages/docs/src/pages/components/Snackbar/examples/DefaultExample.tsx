import { SnackbarProvider, useSnackbar, Button, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Snackbar';
export const description = <p>Use the <code>useSnackbar</code> hook inside a <code>SnackbarProvider</code> to trigger transient messages at the bottom of the screen.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="snackbar-stack">
  <div class="snackbar snackbar--neutral" role="status">
    <div class="snackbar__content">Your preferences have been saved.</div>
  </div>
</div>
`;

function TriggerButton() {
  const { showSnackbar } = useSnackbar();
  
  return (
    <Button variant="primary" onClick={() => showSnackbar({ message: 'Your preferences have been saved.', duration: 5 })}>
      Show Default Snackbar
    </Button>
  );
}

export default function DefaultExample() {
  return (
    <SnackbarProvider>
      <Row>
        <Col span={12}>
          <TriggerButton />
        </Col>
      </Row>
    </SnackbarProvider>
  );
}
