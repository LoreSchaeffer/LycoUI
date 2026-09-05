import {Button, Col, Row, SnackbarProvider, useSnackbar} from '@loreschaeffer/lyco-ui';

export const title = 'Semantic Variants';
export const description = <p>Snackbars support semantic variants that apply a colored left-border and optional icons. Use the <code>variant</code> and <code>icon</code> properties when calling <code>showSnackbar</code>.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="snackbar snackbar--success has-icon" role="status">
  <span class="snackbar__icon">
    <!-- SVG Icon -->
  </span>
  <div class="snackbar__content">Successfully connected to database.</div>
</div>
`;

const SuccessIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg>;
const WarningIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg>;
const DangerIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
</svg>;

function Triggers() {
    const {showSnackbar} = useSnackbar();

    return (
        <Row>
            <Col span={4}>
                <Button
                    variant="success"
                    onClick={() => showSnackbar({variant: 'success', message: 'Successfully connected.', icon: <SuccessIcon/>})}
                >
                    Success Snackbar
                </Button>
            </Col>
            <Col span={4}>
                <Button
                    variant="warning"
                    onClick={() => showSnackbar({variant: 'warning', message: 'Session expiring soon.', icon: <WarningIcon/>, closable: true})}
                >
                    Warning Snackbar
                </Button>
            </Col>
            <Col span={4}>
                <Button
                    variant="danger"
                    onClick={() => showSnackbar({variant: 'danger', message: 'Failed to delete record.', icon: <DangerIcon/>})}
                >
                    Danger Snackbar
                </Button>
            </Col>
        </Row>
    );
}

export default function VariantsExample() {
    return (
        <SnackbarProvider>
            <Triggers/>
        </SnackbarProvider>
    );
}
