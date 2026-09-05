import type {FullVariant} from '@loreschaeffer/lyco-ui';
import {Col, Row, Switch} from '@loreschaeffer/lyco-ui';

export const title = 'Variants';
export const description = <p>Switches support all semantic color variants.</p>;
export const order = 3;

export const vanillaHtml = `
<label class="switch" for="s_success" style="--switch-color-base: var(--color-success); --switch-color-contrast: var(--black);">
    <input type="checkbox" role="switch" id="s_success" class="switch__input" checked>
    <span class="switch__control" aria-hidden="true"></span>
    <span class="switch__label">Success</span>
</label>
`;

export default function VariantsExample() {
    const variants: FullVariant[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

    return (
        <Row>
            {variants.map((variant) => (
                <Col span={12} md={3} key={variant} className="mb-4">
                    <Switch
                        variant={variant}
                        label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                        defaultChecked
                    />
                </Col>
            ))}
        </Row>
    );
}
