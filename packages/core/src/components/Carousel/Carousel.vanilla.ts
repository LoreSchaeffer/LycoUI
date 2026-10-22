import {canLoop, nextIndex, toDomIndex, toLogicalIndex} from './carousel-model';
import {createCarouselControls, renderCarouselState, type CarouselControls} from './CarouselRenderer';
import {controllerRegistry} from '../../vanilla/controller-registry';

export class LycoCarouselController {
  private readonly root: HTMLElement;
  private readonly slides: HTMLElement[];
  private readonly controls: CarouselControls;
  private readonly infinite: boolean;
  private readonly track: HTMLElement;
  private readonly createdTrack: boolean;
  private readonly resizeObserver: ResizeObserver;
  private readonly clones: HTMLElement[] = [];
  private readonly originalRootAttributes: Record<string, string | null>;
  private readonly originalSlideState = new Map<HTMLElement, {active: boolean; attributes: Record<string, string | null>}>();
  private animationFrame: number | undefined;
  private jumping = false;
  private index = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    this.originalRootAttributes = {
      role: root.getAttribute('role'),
      'aria-roledescription': root.getAttribute('aria-roledescription'),
      'aria-label': root.getAttribute('aria-label')
    };
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'carousel');
    if (!root.hasAttribute('aria-label')) root.setAttribute('aria-label', 'Carousel');
    const authoredTrack = root.querySelector<HTMLElement>(':scope > .carousel-track');
    this.createdTrack = !authoredTrack;
    this.track = authoredTrack ?? document.createElement('div');
    if (!this.track.parentElement) {
      this.track.className = 'carousel-track';
      [...root.querySelectorAll<HTMLElement>(':scope > .carousel-slide, :scope > [data-lyco-carousel-slide]')].forEach((slide) => this.track.append(slide));
      root.append(this.track);
    }
    this.slides = [...this.track.querySelectorAll<HTMLElement>(':scope > .carousel-slide, :scope > [data-lyco-carousel-slide]')];
    this.slides.forEach((slide) => this.originalSlideState.set(slide, {
      active: slide.classList.contains('is-active'),
      attributes: {
        role: slide.getAttribute('role'),
        'aria-roledescription': slide.getAttribute('aria-roledescription'),
        'aria-label': slide.getAttribute('aria-label'),
        'aria-hidden': slide.getAttribute('aria-hidden'),
        inert: slide.getAttribute('inert')
      }
    }));
    this.infinite = root.dataset.infinite === 'true';
    if (this.infinite && this.slides.length > 1) {
      const previousClone = this.createClone(this.slides[this.slides.length - 1]!);
      const nextClone = this.createClone(this.slides[0]!);
      this.track.prepend(previousClone);
      this.track.append(nextClone);
      this.clones.push(previousClone, nextClone);
    }
    this.controls = createCarouselControls(
      this.slides.length,
      root.dataset.showArrows !== 'false',
      root.dataset.showDots !== 'false'
    );
    [this.controls.previous, this.controls.next, this.controls.dots].forEach((control) => control && root.append(control));
    this.controls.previous?.addEventListener('click', this.onPrevious);
    this.controls.next?.addEventListener('click', this.onNext);
    this.controls.dots?.addEventListener('click', this.onDotClick);
    root.addEventListener('keydown', this.onKeyDown);
    this.track.addEventListener('scroll', this.onScroll, {passive: true});
    this.resizeObserver = new ResizeObserver(() => this.render());
    this.resizeObserver.observe(this.track);
    if (canLoop(this.slides.length, this.infinite)) this.scrollTo(toDomIndex(this.index, this.slides.length, this.infinite), 'auto');
    this.render();
  }

  private readonly onPrevious = (): void => this.goTo(nextIndex(this.index, this.slides.length, -1, this.infinite));
  private readonly onNext = (): void => this.goTo(nextIndex(this.index, this.slides.length, 1, this.infinite));
  private readonly onDotClick = (event: Event): void => {
    const dot = (event.target as Element).closest<HTMLButtonElement>('[data-index]');
    if (dot) this.goTo(Number(dot.dataset.index));
  };
  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); this.onPrevious(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); this.onNext(); }
  };
  private readonly onScroll = (): void => {
    if (this.animationFrame !== undefined) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(() => this.syncFromScroll());
  };

  private createClone(slide: HTMLElement): HTMLElement {
    const clone = slide.cloneNode(true) as HTMLElement;
    clone.dataset.lycoCarouselClone = 'true';
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('inert', '');
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
    return clone;
  }

  goTo(index: number): void {
    this.index = Math.max(0, Math.min(index, this.slides.length - 1));
    this.render();
    this.root.dispatchEvent(new CustomEvent('lyco:carousel-change', {bubbles: true, detail: {index: this.index}}));
  }

  private render(): void {
    this.slides.forEach((slide, index) => {
      const active = index === this.index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} of ${this.slides.length}`);
      slide.removeAttribute('aria-hidden');
    });
    renderCarouselState(this.controls, this.index, this.slides.length, this.infinite);
    this.scrollTo(toDomIndex(this.index, this.slides.length, this.infinite));
  }

  private scrollTo(domIndex: number, behavior: ScrollBehavior = 'smooth'): void {
    const child = this.track.children[domIndex] as HTMLElement | undefined;
    if (!child) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    this.track.scrollTo({
      left: child.offsetLeft - this.track.offsetLeft - (this.track.clientWidth - child.clientWidth) / 2,
      behavior: reduced ? 'auto' : behavior
    });
  }

  private syncFromScroll(): void {
    this.animationFrame = undefined;
    if (this.jumping || this.slides.length === 0) return;
    const center = this.track.scrollLeft + this.track.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    [...this.track.children].forEach((child, domIndex) => {
      const item = child as HTMLElement;
      const current = Math.abs(center - (item.offsetLeft - this.track.offsetLeft + item.clientWidth / 2));
      if (current < distance) { distance = current; closest = domIndex; }
    });
    const logical = toLogicalIndex(closest, this.slides.length, this.infinite);
    this.index = logical;
    this.renderState();
    if (canLoop(this.slides.length, this.infinite) && (closest === 0 || closest === this.slides.length + 1)) {
      this.jumping = true;
      this.scrollTo(toDomIndex(logical, this.slides.length, this.infinite), 'auto');
      requestAnimationFrame(() => { this.jumping = false; });
    }
  }

  private renderState(): void {
    this.slides.forEach((slide, index) => slide.classList.toggle('is-active', index === this.index));
    renderCarouselState(this.controls, this.index, this.slides.length, this.infinite);
  }

  destroy(): void {
    this.controls.previous?.removeEventListener('click', this.onPrevious);
    this.controls.next?.removeEventListener('click', this.onNext);
    this.controls.dots?.removeEventListener('click', this.onDotClick);
    this.root.removeEventListener('keydown', this.onKeyDown);
    this.track.removeEventListener('scroll', this.onScroll);
    if (this.animationFrame !== undefined) cancelAnimationFrame(this.animationFrame);
    this.resizeObserver.disconnect();
    this.controls.previous?.remove(); this.controls.next?.remove(); this.controls.dots?.remove();
    this.clones.forEach((clone) => clone.remove());
    this.slides.forEach((slide) => {
      const original = this.originalSlideState.get(slide);
      if (!original) return;
      slide.classList.toggle('is-active', original.active);
      Object.entries(original.attributes).forEach(([name, value]) => {
        if (value === null) slide.removeAttribute(name); else slide.setAttribute(name, value);
      });
    });
    if (this.createdTrack) {
      this.slides.forEach((slide) => this.root.append(slide));
      this.track.remove();
    }
    Object.entries(this.originalRootAttributes).forEach(([name, value]) => {
      if (value === null) this.root.removeAttribute(name); else this.root.setAttribute(name, value);
    });
  }
}

export function initLycoCarousels(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('.carousel, [data-lyco-carousel]').forEach((carousel) => {
    if (!controllerRegistry.get(carousel, 'carousel')) controllerRegistry.register(carousel, 'carousel', new LycoCarouselController(carousel));
  });
}
