import type {FullVariant} from '@loreschaeffer/lyco-ui';
import {Card, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Variants (Dim Mode)';
export const description = <p>By default, applying a <code>variant</code> renders the card in dim mode, utilizing a subtle transparency layer based on the global tokens.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="card card-elevation-1 card-padding-md card-variant card-dim card-primary">
    <h4 class="mb-2">primary</h4>
    <p class="mb-0">Dim variant applied.</p>
</div>
<div class="card card-elevation-1 card-padding-md card-variant card-dim card-success">...</div>
`;

export default function VariantsExample() {
    const variants: FullVariant[] = ['primary', 'success', 'warning', 'danger', 'info', 'purple'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={12} md={4} className="mb-4">
                    <Card variant={v}>
                        <h4 className="mb-2" style={{textTransform: 'capitalize'}}>{v}</h4>
                        <p className="mb-0">Dim variant applied.</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}