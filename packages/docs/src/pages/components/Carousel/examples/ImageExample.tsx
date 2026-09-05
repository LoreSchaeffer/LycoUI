import {Carousel} from '@loreschaeffer/lyco-ui';

export const title = 'Image Carousel';
export const description = <p>A basic implementation holding high-quality images. The carousel automatically creates a sliding track and adds interactive overlay controls.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="carousel" style="--carousel-gap: var(--spacing-4); --carousel-slide-width: 100%;">
  <div class="carousel__track">
    <div class="carousel__slide">
      <img src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba" alt="Slide 1" style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-lg);" />
    </div>
    <div class="carousel__slide">
      <img src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538" alt="Slide 2" style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-lg);" />
    </div>
    <div class="carousel__slide">
      <img src="https://images.unsplash.com/photo-1682687220199-d0124f48f95b" alt="Slide 3" style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-lg);" />
    </div>
  </div>
  
  <!-- JavaScript is required to wire up these buttons in Vanilla environments -->
  <button class="carousel__arrow carousel__arrow--prev" aria-label="Previous slide">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
  <button class="carousel__arrow carousel__arrow--next" aria-label="Next slide">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
  
  <div class="carousel__dots">
    <button class="carousel__dot is-active" aria-label="Go to slide 1"></button>
    <button class="carousel__dot" aria-label="Go to slide 2"></button>
    <button class="carousel__dot" aria-label="Go to slide 3"></button>
  </div>
</div>
`;

export default function ImageExample() {
    return (
        <Carousel gap="0">
            <img
                src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=1200"
                alt="Desert landscape"
                style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)'}}
            />
            <img
                src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=1200"
                alt="Mountain view"
                style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)'}}
            />
            <img
                src="https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&q=80&w=1200"
                alt="Ocean waves"
                style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius-lg)'}}
            />
        </Carousel>
    );
}
