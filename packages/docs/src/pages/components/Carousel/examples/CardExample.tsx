import {Button, Card, Carousel} from '@loreschaeffer/lyco-ui';

export const title = 'Card Carousel with Center Mode';
export const description = <p>Using <code>centerMode</code> combined with <code>infinite</code> looping creates a premium peeking layout. The active card is centered and visually promoted, while adjacent cards are dimmed and pushed to the
    edges. Arrows are automatically pushed into the gutters, ensuring they never overlap your actionable content.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="carousel carousel--center-mode" style="--carousel-gap: var(--spacing-6); --carousel-slide-width: 70%;">
  <div class="carousel__track">
    <!-- Note: In a vanilla environment with infinite mode, DOM nodes must be duplicated at boundaries -->
    <div class="carousel__slide is-active">
      <div class="card card--elevated">
        <h3>Feature A</h3>
        <p>Description of feature A.</p>
        <button class="button button--primary">Learn More</button>
      </div>
    </div>
    <div class="carousel__slide">
      <div class="card card--elevated">
        <h3>Feature B</h3>
        <p>Description of feature B.</p>
        <button class="button button--primary">Learn More</button>
      </div>
    </div>
    <div class="carousel__slide">
      <div class="card card--elevated">
        <h3>Feature C</h3>
        <p>Description of feature C.</p>
        <button class="button button--primary">Learn More</button>
      </div>
    </div>
  </div>
</div>
`;

export default function CardExample() {
    return (
        <Carousel gap="var(--spacing-6)" slideWidth="70%" showDots={false} centerMode infinite>
            <Card elevation={2}>
                <Card.Body>
                    <h4 className="mb-2">Advanced Analytics</h4>
                    <p className="text-secondary mb-4">Leverage our machine learning models to predict customer churn before it happens.</p>
                    <Button variant="primary">Explore Analytics</Button>
                </Card.Body>
            </Card>

            <Card elevation={2}>
                <Card.Body>
                    <h4 className="mb-2">Automated Workflows</h4>
                    <p className="text-secondary mb-4">Connect your favorite tools and trigger actions automatically across your tech stack.</p>
                    <Button variant="primary">View Integrations</Button>
                </Card.Body>
            </Card>

            <Card elevation={2}>
                <Card.Body>
                    <h4 className="mb-2">Enterprise Security</h4>
                    <p className="text-secondary mb-4">Bank-grade encryption and SOC2 Type II compliance built-in from day one.</p>
                    <Button variant="primary">Read Security Paper</Button>
                </Card.Body>
            </Card>

            <Card elevation={2}>
                <Card.Body>
                    <h4 className="mb-2">24/7 Priority Support</h4>
                    <p className="text-secondary mb-4">Get dedicated account managers and guaranteed 15-minute response times.</p>
                    <Button variant="primary">Contact Sales</Button>
                </Card.Body>
            </Card>
        </Carousel>
    );
}
