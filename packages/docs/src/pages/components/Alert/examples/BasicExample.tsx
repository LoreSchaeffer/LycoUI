import { Alert, Col, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Alerts';
export const description = <p>Alerts use an elegant and subtle dim styling by default. Use <code>alert__title</code> and <code>alert__description</code> for typography.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="alert alert--success" role="alert">
  <div class="alert__content">
    <div class="alert__title">Operation Successful</div>
    <div class="alert__description">Your profile has been updated.</div>
  </div>
</div>
<div class="alert alert--white" role="alert">
  <div class="alert__content">
    <div class="alert__title">Standard Notice</div>
    <div class="alert__description">This is a standard white alert.</div>
  </div>
</div>
`;

export default function BasicExample() {
  return (
    <Row>
      <Col span={6} className="mb-8">
        <Alert variant="success">
          <div className="alert__title">Operation Successful</div>
          <div className="alert__description">Your profile has been updated successfully.</div>
        </Alert>
      </Col>
      <Col span={6} className="mb-8">
        <Alert variant="danger">
          <div className="alert__title">Action Required</div>
          <div className="alert__description">Please update your payment method to continue.</div>
        </Alert>
      </Col>
      <Col span={6}>
        <Alert variant="primary">
          <div className="alert__title">New Feature</div>
          <div className="alert__description">Check out our new dark mode settings.</div>
        </Alert>
      </Col>
      <Col span={6}>
        <Alert variant="white">
          <div className="alert__title">System Notice</div>
          <div className="alert__description">Scheduled maintenance in 2 hours.</div>
        </Alert>
      </Col>
    </Row>
  );
}
