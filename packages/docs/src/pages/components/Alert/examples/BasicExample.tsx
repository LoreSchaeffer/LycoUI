import {Alert, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Alerts';
export const description = <p>Alerts use an elegant and subtle dim styling by default. Use <code>alert-title</code> and <code>alert-description</code> for typography.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="alert alert-success" role="alert">
  <div class="alert-content">
    <div class="alert-title">Operation Successful</div>
    <div class="alert-description">Your profile has been updated.</div>
  </div>
</div>
<div class="alert alert-white" role="alert">
  <div class="alert-content">
    <div class="alert-title">Standard Notice</div>
    <div class="alert-description">This is a standard white alert.</div>
  </div>
</div>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={6} className="mb-8">
                <Alert variant="success">
                    <div className="alert-title">Operation Successful</div>
                    <div className="alert-description">Your profile has been updated successfully.</div>
                </Alert>
            </Col>
            <Col span={6} className="mb-8">
                <Alert variant="danger">
                    <div className="alert-title">Action Required</div>
                    <div className="alert-description">Please update your payment method to continue.</div>
                </Alert>
            </Col>
            <Col span={6}>
                <Alert variant="primary">
                    <div className="alert-title">New Feature</div>
                    <div className="alert-description">Check out our new dark mode settings.</div>
                </Alert>
            </Col>
            <Col span={6}>
                <Alert variant="white">
                    <div className="alert-title">System Notice</div>
                    <div className="alert-description">Scheduled maintenance in 2 hours.</div>
                </Alert>
            </Col>
        </Row>
    );
}
