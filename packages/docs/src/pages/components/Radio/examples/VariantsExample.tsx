import type {FullVariant} from '@loreschaeffer/lyco-ui';
import {Col, Radio, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Colors & Variants';
export const description = <p>Customize the active color using the <code>variant</code> prop.</p>;
export const order = 2;

export const vanillaHtml = `
<label for="r-info" class="radio radio--info">
    <input type="radio" id="r-info" name="notification-pref-info" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Email Notifications (Info)</span>
</label>
<label for="r-success" class="radio radio--success">
    <input type="radio" id="r-success" name="notification-pref-success" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">SMS Alerts (Success)</span>
</label>
<label for="r-danger" class="radio radio--danger">
    <input type="radio" id="r-danger" name="notification-pref-danger" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Do Not Disturb (Danger)</span>
</label>
`;

export default function VariantsExample() {
    const variants: FullVariant[] = ['primary', 'success', 'danger', 'warning', 'info', 'green', 'teal'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={12} md={6} lg={4} className="mb-4">
                    <Radio variant={v} name={`variant-group-${v}`} label={`Project tag: ${v}`} defaultChecked/>
                </Col>
            ))}
        </Row>
    );
}
