import {Alert, Button, Col, Row} from '@loreschaeffer/lyco-ui';
import {useState} from 'react';

export const title = 'Auto-Dismiss Duration';
export const description = <p>Provide a <code>duration</code> (in seconds) to automatically dismiss the alert. An animated progress bar will indicate the remaining time.</p>;
export const order = 4;

export const vanillaHtml = `
<div class="alert alert-purple alert-closable" role="alert" data-duration="5">
  <div class="alert-content">
    <div class="alert-title">Auto-saving</div>
    <div class="alert-description">Draft saved automatically.</div>
  </div>
  <div class="alert-progress" style="animation-duration: 5s"></div>
</div>
`;

export default function DurationExample() {
    const [key, setKey] = useState(0);

    return (
        <div style={{minHeight: '180px', width: '100%'}}>
            <div style={{marginBottom: '1.5rem'}}>
                <Button variant="primary" onClick={() => setKey(k => k + 1)}>
                    Restart Timers
                </Button>
            </div>
            <Row key={key}>
                <Col span={6}>
                    <Alert variant="purple" duration={5} closable>
                        <div className="alert-title">Draft Saved</div>
                        <div className="alert-description">Your changes have been saved automatically.</div>
                    </Alert>
                </Col>
                <Col span={6}>
                    <Alert variant="info" duration={10} closable>
                        <div className="alert-title">Uploading File</div>
                        <div className="alert-description">The file is being processed in the background.</div>
                    </Alert>
                </Col>
            </Row>
        </div>
    );
}
