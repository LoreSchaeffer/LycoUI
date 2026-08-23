import { Carousel, Card, Button } from '@loreschaeffer/lyco-ui';

export const title = 'Card Carousel with Center Mode';
export const description = <p>Using <code>centerMode</code> combined with <code>infinite</code> looping creates a premium peeking layout. The active card is centered and visually promoted, while adjacent cards are dimmed and pushed to the edges. Arrows are automatically pushed into the gutters, ensuring they never overlap your actionable content.</p>;
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
      <Card elevation="elevated">
        <h3>Feature A</h3>
        <p>This is a detailed description of feature A highlighting its premium architecture.</p>
        <Button variant="primary">Learn More</Button>
      </Card>

      <Card elevation="elevated">
        <h3>Feature B</h3>
        <p>This is a detailed description of feature B highlighting its fast performance.</p>
        <Button variant="primary">Learn More</Button>
      </Card>

      <Card elevation="elevated">
        <h3>Feature C</h3>
        <p>This is a detailed description of feature C highlighting its beautiful design.</p>
        <Button variant="primary">Learn More</Button>
      </Card>

      <Card elevation="elevated">
        <h3>Feature D</h3>
        <p>This is a detailed description of feature D showing the infinite loop in action.</p>
        <Button variant="primary">Learn More</Button>
      </Card>
    </Carousel>
  );
}
