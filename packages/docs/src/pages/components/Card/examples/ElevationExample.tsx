import type {CardElevation} from 'lyco-ui';
import {Card, Col, Row} from 'lyco-ui';

export const title = 'Elevations';
export const description = <p>Use the <code>elevation</code> prop to control the perceived depth of the card.</p>;
export const order = 0;

export const vanillaHtml = `
<div class="card card-elevation-0 card-padding-md">
    <h3 class="mb-2">Elevation 0</h3>
    <p class="text-secondary mb-0">Surface depth and shadow adjustments.</p>
</div>
<div class="card card-elevation-1 card-padding-md">...</div>
`;

export default function ElevationsExample() {
    const elevations: CardElevation[] = [0, 1, 2, 3, 4];

    return (
        <Row>
            {elevations.map((level) => (
                <Col key={level} span={12} md={4} className="mb-4">
                    <Card elevation={level}>
                        <h3 className="mb-2">Elevation {level}</h3>
                        <p className="text-secondary mb-0">Surface depth and shadow adjustments.</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}