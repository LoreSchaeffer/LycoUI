import {Col, Row, Switch} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>Bind a label to the switch. Clicking the label automatically toggles the input.</p>;
export const order = 1;

export const vanillaHtml = `
<label class="switch" for="s1" style="--switch-color-base: var(--color-primary); --switch-color-contrast: var(--white);">
    <input type="checkbox" role="switch" id="s1" class="switch__input">
    <span class="switch__control" aria-hidden="true"></span>
    <span class="switch__label">Wi-Fi</span>
</label>
<label class="switch" for="s2" style="--switch-color-base: var(--color-primary); --switch-color-contrast: var(--white);">
    <input type="checkbox" role="switch" id="s2" class="switch__input" checked>
    <span class="switch__control" aria-hidden="true"></span>
    <span class="switch__label">Bluetooth</span>
</label>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12} className="mb-4">
                <Switch label="Enable two-factor authentication"/>
            </Col>
            <Col span={12} className="mb-4">
                <Switch label="Receive email notifications" defaultChecked/>
            </Col>
            <Col span={12} className="mb-4">
                <Switch label="Share anonymous usage data (Disabled)" disabled/>
            </Col>
        </Row>
    );
}
