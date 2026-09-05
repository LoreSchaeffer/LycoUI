import {Alert, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Alerts with Icons';
export const description = <p>Use the <code>icon</code> prop to render an icon in the alert. The icon color will automatically map to the alert variant.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="alert alert--success has-icon" role="alert">
  <span class="alert__icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  </span>
  <div class="alert__content">
    <div class="alert__title">Payment Processed</div>
    <div class="alert__description">Your receipt has been sent via email.</div>
  </div>
</div>
`;

const SuccessIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg>;
const ErrorIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
</svg>;

export default function IconExample() {
    return (
        <Row>
            <Col span={6}>
                <Alert variant="success" icon={<SuccessIcon/>}>
                    <div className="alert__title">Payment Processed</div>
                    <div className="alert__description">Your receipt has been sent via email.</div>
                </Alert>
            </Col>
            <Col span={6}>
                <Alert variant="danger" icon={<ErrorIcon/>}>
                    <div className="alert__title">Connection Failed</div>
                    <div className="alert__description">Could not connect to the database.</div>
                </Alert>
            </Col>
        </Row>
    );
}
