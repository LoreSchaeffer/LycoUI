export interface CarouselControls {
  previous?: HTMLButtonElement;
  next?: HTMLButtonElement;
  dots?: HTMLDivElement;
}

export function createCarouselControls(count: number, showArrows = true, showDots = true): CarouselControls {
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.className = `${classContract.carousel.arrow} ${classContract.carousel.arrowPrevious}`;
  previous.setAttribute('aria-label', 'Previous slide');
  previous.textContent = '‹';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = `${classContract.carousel.arrow} ${classContract.carousel.arrowNext}`;
  next.setAttribute('aria-label', 'Next slide');
  next.textContent = '›';
  const dots = document.createElement('div');
  dots.className = classContract.carousel.dots;
  for (let index = 0; index < count; index += 1) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = classContract.carousel.dot;
    dot.dataset.index = String(index);
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dots.append(dot);
  }
  return {
    previous: count > 1 && showArrows ? previous : undefined,
    next: count > 1 && showArrows ? next : undefined,
    dots: count > 1 && showDots ? dots : undefined
  };
}

export function renderCarouselState(controls: CarouselControls, index: number, count: number, infinite: boolean): void {
  if (controls.previous) controls.previous.disabled = count <= 1 || (!infinite && index === 0);
  if (controls.next) controls.next.disabled = count <= 1 || (!infinite && index === count - 1);
  [...(controls.dots?.children ?? [])].forEach((dot, dotIndex) => {
    dot.toggleAttribute('aria-current', dotIndex === index);
    dot.classList.toggle('is-active', dotIndex === index);
    (dot as HTMLButtonElement).tabIndex = dotIndex === index ? 0 : -1;
  });
}
import {classContract} from '../../styles/class-contract';

