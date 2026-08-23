import { Alert, Col, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Closable Alerts';
export const description = <p>Add the <code>closable</code> prop to allow users to dismiss the alert.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="alert alert--warning alert--closable" role="alert">
  <div class="alert__content">
    <div class="alert__title">Storage Warning</div>
    <div class="alert__description">You are running low on disk space.</div>
  </div>
  <button type="button" class="alert__close" aria-label="Close">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>
</div>
`;

export default function ClosableExample() {
  return (
    <Row>
      <Col span={6}>
        <Alert variant="warning" closable>
          <div className="alert__title">Storage Warning</div>
          <div className="alert__description">You are running low on disk space. Please clear some files.</div>
        </Alert>
      </Col>
      <Col span={6}>
        <Alert variant="info" closable>
          <div className="alert__title">Update Available</div>
          <div className="alert__description">A new version of the app is ready to install.</div>
        </Alert>
      </Col>
    </Row>
  );
}
