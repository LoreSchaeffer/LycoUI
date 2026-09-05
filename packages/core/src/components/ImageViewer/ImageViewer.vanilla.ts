interface LycoImageViewerElement extends HTMLElement {
    lycoImageViewer?: LycoImageViewerController;
}

export function initLycoImageViewers() {
    const viewers = document.querySelectorAll<HTMLElement>('.image-viewer:not([data-lyco-initialized])');
    viewers.forEach(viewer => {
        if (!viewer.dataset.lycoInitialized) {
            new LycoImageViewerController(viewer);
            (viewer as LycoImageViewerElement).lycoImageViewer = new LycoImageViewerController(viewer);
            viewer.dataset.lycoInitialized = 'true';
        }
    });
}

/**
 * Controller for the Vanilla JS LycoImageViewer component.
 */
export class LycoImageViewerController {
    private readonly viewer: HTMLElement;
    private readonly wrapper: HTMLElement | null;
    private readonly mainImage: HTMLImageElement | null;
    private readonly prevBtn: HTMLButtonElement | null;
    private readonly nextBtn: HTMLButtonElement | null;
    private readonly thumbnails: HTMLButtonElement[];

    private currentIndex: number = 0;
    private scale: number = 1;
    private position: { x: number; y: number } = {x: 0, y: 0};
    private isDragging: boolean = false;
    private dragStart: { x: number; y: number } = {x: 0, y: 0};

    private readonly _onWheel: (e: WheelEvent) => void;
    private readonly _onPointerDown: (e: PointerEvent) => void;
    private readonly _onPointerMove: (e: PointerEvent) => void;
    private readonly _onPointerUp: (e: PointerEvent) => void;
    private readonly _onPrevClick: (e: MouseEvent) => void;
    private readonly _onNextClick: (e: MouseEvent) => void;
    private readonly _thumbnailListeners: ((e: MouseEvent) => void)[] = [];

    constructor(viewerElement: HTMLElement) {
        this.viewer = viewerElement;
        this.wrapper = this.viewer.querySelector('.image-viewer__image-wrapper');
        this.mainImage = this.viewer.querySelector('.image-viewer__image');

        this.prevBtn = this.viewer.querySelector('.image-viewer__nav--prev');
        this.nextBtn = this.viewer.querySelector('.image-viewer__nav--next');
        this.thumbnails = Array.from(this.viewer.querySelectorAll('.image-viewer__thumbnail'));

        this._onWheel = (e: WheelEvent) => this.handleWheel(e);
        this._onPointerDown = (e: PointerEvent) => this.handlePointerDown(e);
        this._onPointerMove = (e: PointerEvent) => this.handlePointerMove(e);
        this._onPointerUp = (e: PointerEvent) => this.handlePointerUp(e);
        this._onPrevClick = (e: MouseEvent) => {
            e.stopPropagation();
            this.navigate(-1);
        };
        this._onNextClick = (e: MouseEvent) => {
            e.stopPropagation();
            this.navigate(1);
        };

        // Determine initial index
        const activeIndex = this.thumbnails.findIndex(btn => btn.classList.contains('is-active'));
        if (activeIndex > -1) {
            this.currentIndex = activeIndex;
        }

        this.bindEvents();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
                    if (this.viewer.style.display === 'none' || this.viewer.classList.contains('hidden')) {
                        this.resetTransform();
                    }
                }
            });
        });
        observer.observe(this.viewer, {attributes: true});

        this.updateGalleryState();
    }

    private bindEvents(): void {
        if (this.prevBtn) this.prevBtn.addEventListener('click', this._onPrevClick);
        if (this.nextBtn) this.nextBtn.addEventListener('click', this._onNextClick);

        this.thumbnails.forEach((thumb, index) => {
            const listener = (e: MouseEvent) => {
                e.stopPropagation();
                this.goToIndex(index);
            };
            this._thumbnailListeners.push(listener);
            thumb.addEventListener('click', listener);
        });

        if (this.wrapper) {
            this.wrapper.addEventListener('wheel', this._onWheel);
            this.wrapper.addEventListener('pointerdown', this._onPointerDown);
            this.wrapper.addEventListener('pointermove', this._onPointerMove);
            this.wrapper.addEventListener('pointerup', this._onPointerUp);
            this.wrapper.addEventListener('pointercancel', this._onPointerUp);
        }
    }

    private updateTransform(): void {
        if (!this.wrapper) return;
        this.wrapper.style.transform = `translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`;
        this.wrapper.style.transition = this.isDragging ? 'none' : 'transform 0.1s ease-out';
    }

    private resetTransform(): void {
        this.scale = 1;
        this.position = {x: 0, y: 0};
        this.updateTransform();
    }

    private navigate(direction: number): void {
        const newIndex = this.currentIndex + direction;
        if (newIndex >= 0 && newIndex < this.thumbnails.length) {
            this.goToIndex(newIndex);
        }
    }

    private goToIndex(index: number): void {
        if (index === this.currentIndex) return;
        this.currentIndex = index;

        // Update main image source
        const thumb = this.thumbnails[this.currentIndex];
        if (thumb && this.mainImage) {
            const highResUrl = thumb.getAttribute('data-image-src');
            if (highResUrl) {
                this.mainImage.src = highResUrl;
            }
        }

        this.resetTransform();
        this.updateGalleryState();
    }

    private updateGalleryState(): void {
        if (this.thumbnails.length <= 1) {
            if (this.prevBtn) this.prevBtn.style.display = 'none';
            if (this.nextBtn) this.nextBtn.style.display = 'none';
        } else {
            if (this.prevBtn) {
                this.prevBtn.style.display = this.currentIndex === 0 ? 'none' : 'flex';
            }
            if (this.nextBtn) {
                this.nextBtn.style.display = this.currentIndex === this.thumbnails.length - 1 ? 'none' : 'flex';
            }
        }

        this.thumbnails.forEach((thumb, index) => {
            if (index === this.currentIndex) {
                thumb.classList.add('is-active');
                thumb.setAttribute('aria-current', 'true');
            } else {
                thumb.classList.remove('is-active');
                thumb.removeAttribute('aria-current');
            }
        });
    }

    private handleWheel(e: WheelEvent): void {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.1 : -0.1;
        this.scale = Math.min(Math.max(this.scale + delta, 0.5), 4);
        if (this.scale <= 1) {
            this.position = {x: 0, y: 0};
        }
        this.updateTransform();
    }

    private handlePointerDown(e: PointerEvent): void {
        if (this.scale > 1 && this.wrapper) {
            this.isDragging = true;
            this.dragStart = {
                x: e.clientX - this.position.x,
                y: e.clientY - this.position.y
            };
            this.wrapper.setPointerCapture(e.pointerId);
        }
    }

    private handlePointerMove(e: PointerEvent): void {
        if (!this.isDragging) return;
        this.position = {
            x: e.clientX - this.dragStart.x,
            y: e.clientY - this.dragStart.y
        };
        this.updateTransform();
    }

    private handlePointerUp(e: PointerEvent): void {
        if (!this.isDragging) return;
        this.isDragging = false;
        if (this.wrapper) {
            this.wrapper.releasePointerCapture(e.pointerId);
            this.updateTransform();
        }
    }

    public destroy(): void {
        if (this.prevBtn) this.prevBtn.removeEventListener('click', this._onPrevClick);
        if (this.nextBtn) this.nextBtn.removeEventListener('click', this._onNextClick);

        if (this.wrapper) {
            this.wrapper.removeEventListener('wheel', this._onWheel);
            this.wrapper.removeEventListener('pointerdown', this._onPointerDown);
            this.wrapper.removeEventListener('pointermove', this._onPointerMove);
            this.wrapper.removeEventListener('pointerup', this._onPointerUp);
            this.wrapper.removeEventListener('pointercancel', this._onPointerUp);
        }

        this.thumbnails.forEach((thumb, index) => {
            if (this._thumbnailListeners[index]) {
                thumb.removeEventListener('click', this._thumbnailListeners[index]);
            }
        });
        this._thumbnailListeners.length = 0;

        delete this.viewer.dataset.lycoInitialized;
        delete (this.viewer as LycoImageViewerElement).lycoImageViewer;
    }
}
