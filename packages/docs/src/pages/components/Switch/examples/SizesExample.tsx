import {Col, Row, Switch} from '@loreschaeffer/lyco-ui';

export const title = 'Sizes';
export const description = <p>Switches come in three sizes: small, medium (default), and large.</p>;
export const order = 2;

export const vanillaHtml = `
<label class="switch switch--sm" for="s_sm" style="--switch-color-base: var(--color-primary); --switch-color-contrast: var(--white);">
    <input type="checkbox" role="switch" id="s_sm" class="switch__input">
    <span class="switch__control" aria-hidden="true"></span>
    <span class="switch__label">Small</span>
</label>
<label class="switch" for="s_md" style="--switch-color-base: var(--color-primary); --switch-color-contrast: var(--white);">
    <input type="checkbox" role="switch" id="s_md" class="switch__input">
    <span class="switch__control" aria-hidden="true"></span>
    <span class="switch__label">Medium</span>
</label>
<label class="switch switch--lg" for="s_lg" style="--switch-color-base: var(--color-primary); --switch-color-contrast: var(--white);">
    <input type="checkbox" role="switch" id="s_lg" class="switch__input">
    <span class="switch__control" aria-hidden="true"></span>
    <span class="switch__label">Large</span>
</label>
`;

export default function SizesExample() {
    return (
        <Row>
            <Col span={12} md={4} className="mb-4">
                <Switch size="sm" label="Small" defaultChecked/>
            </Col>
            <Col span={12} md={4} className="mb-4">
                <Switch size="md" label="Medium" defaultChecked/>
            </Col>
            <Col span={12} md={4} className="mb-4">
                <Switch size="lg" label="Large" defaultChecked/>
            </Col>
        </Row>
    );
}
