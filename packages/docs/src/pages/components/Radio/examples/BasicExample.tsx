import {Col, Radio, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>Group radio buttons using the same <code>name</code> attribute.</p>;
export const order = 1;

export const vanillaHtml = `
<label for="plan-basic" class="radio radio--primary">
    <input type="radio" id="plan-basic" name="subscription-plan" value="basic" class="radio__input" checked>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Basic Plan ($9/mo)</span>
</label>
<label for="plan-pro" class="radio radio--primary">
    <input type="radio" id="plan-pro" name="subscription-plan" value="pro" class="radio__input">
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Pro Plan ($29/mo)</span>
</label>
<label for="plan-enterprise" class="radio radio--primary is-disabled">
    <input type="radio" id="plan-enterprise" name="subscription-plan" value="enterprise" class="radio__input" disabled>
    <span class="radio__control" aria-hidden="true"></span>
    <span class="radio__label">Enterprise Plan (Contact Sales)</span>
</label>
`;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12} md={4} className="mb-4">
                <Radio name="subscription-plan" value="basic" label="Basic Plan ($9/mo)" defaultChecked/>
            </Col>
            <Col span={12} md={4} className="mb-4">
                <Radio name="subscription-plan" value="pro" label="Pro Plan ($29/mo)"/>
            </Col>
            <Col span={12} md={4} className="mb-4">
                <Radio name="subscription-plan" value="enterprise" label="Enterprise Plan (Contact Sales)" disabled/>
            </Col>
        </Row>
    );
}
