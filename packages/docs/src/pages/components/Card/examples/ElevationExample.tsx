import type {CardElevation} from '@loreschaeffer/lyco-ui';
import {Card, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Elevations';
export const description = <p>Use the <code>elevation</code> prop to control the perceived depth of the card.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="card card--elevation-0">
    <div class="card__body">
        <h3 class="mb-2">Elevation 0</h3>
        <p class="text-secondary mb-0">Surface depth and shadow adjustments.</p>
    </div>
</div>
`;

export default function ElevationsExample() {
    const elevations: CardElevation[] = [0, 1, 2, 3, 4];

    return (
        <Row>
            {elevations.map((level) => (
                <Col key={level} span={6} className="mb-4">
                    <Card elevation={level}>
                        <Card.Body>
                            <h4 className="mb-2">Layer {level}</h4>
                            <p className="text-secondary mb-0">Simulates elevation {level} with adjusted shadows.</p>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
