import type {FullVariant} from '@loreschaeffer/lyco-ui';
import {Card, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Variants (Dim Mode)';
export const description = <p>By default, applying a <code>variant</code> renders the card in dim mode, utilizing a subtle transparency layer based on the global tokens.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="card card--elevation-1 card--variant card--dim card--primary">
    <div class="card__body">
        <h4 class="mb-2">primary</h4>
        <p class="mb-0">Dim variant applied.</p>
    </div>
</div>
`;

export default function VariantsExample() {
    const variants: FullVariant[] = ['primary', 'success', 'warning', 'danger', 'info', 'purple'];

    return (
        <Row>
            {variants.map((v) => (
                <Col key={v} span={6} className="mb-4">
                    <Card variant={v}>
                        <Card.Body>
                            <h4 className="mb-2" style={{textTransform: 'capitalize'}}>{v} Alert</h4>
                            <p className="mb-0">A <strong>{v}</strong> state notification for the user dashboard.</p>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
