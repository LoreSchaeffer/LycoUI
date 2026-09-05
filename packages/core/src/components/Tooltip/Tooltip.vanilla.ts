/**
 * Controller for the Vanilla JS Tooltip component.
 */
export class TooltipController {
    private element: HTMLElement;
    private content: string;
    private position: string;
    private tooltipEl: HTMLElement | null = null;
    private boundShow: (e: Event) => void;
    private boundHide: (e: Event) => void;
    private boundUpdatePosition: () => void;

    constructor(element: HTMLElement) {
        this.element = element;
        this.content = this.element.dataset.lycoTooltip || '';
        this.position = this.element.dataset.lycoTooltipPosition || 'top';

        if (!this.element.id) {
            this.element.id = `lyco-tooltip-trigger-${Math.random().toString(36).substr(2, 9)}`;
        }

        this.boundShow = this.show.bind(this);
        this.boundHide = this.hide.bind(this);
        this.boundUpdatePosition = this.updatePosition.bind(this);

        if (this.element.dataset.lycoInitialized === 'true') return;

        this.init();
    }

    private init() {
        this.element.addEventListener('mouseenter', this.boundShow);
        this.element.addEventListener('focus', this.boundShow);
        this.element.addEventListener('mouseleave', this.boundHide);
        this.element.addEventListener('blur', this.boundHide);

        this.element.dataset.lycoInitialized = 'true';
    }

    private show() {
        if (this.tooltipEl) return;
        if (!this.content) return;

        this.tooltipEl = document.createElement('div');
        this.tooltipEl.className = `tooltip__content tooltip__content--${this.position}`;
        this.tooltipEl.setAttribute('role', 'tooltip');

        const tooltipId = `lyco-tooltip-${Math.random().toString(36).substr(2, 9)}`;
        this.tooltipEl.id = tooltipId;
        this.element.setAttribute('aria-describedby', tooltipId);

        this.tooltipEl.innerHTML = this.content;

        document.body.appendChild(this.tooltipEl);
        this.updatePosition();

        window.addEventListener('scroll', this.boundUpdatePosition, true);
        window.addEventListener('resize', this.boundUpdatePosition);
    }

    private updatePosition() {
        if (!this.tooltipEl) return;

        const rect = this.element.getBoundingClientRect();
        const tooltipRect = this.tooltipEl.getBoundingClientRect();

        const offset = 8;
        const vWidth = window.innerWidth;
        const vHeight = window.innerHeight;

        let targetPosition = this.position;

        if (this.position === 'top' && rect.top - tooltipRect.height - offset < 0) {
            targetPosition = 'bottom';
        } else if (this.position === 'bottom' && rect.bottom + tooltipRect.height + offset > vHeight) {
            targetPosition = 'top';
        } else if (this.position === 'left' && rect.left - tooltipRect.width - offset < 0) {
            targetPosition = 'right';
        } else if (this.position === 'right' && rect.right + tooltipRect.width + offset > vWidth) {
            targetPosition = 'left';
        }

        this.tooltipEl.className = `tooltip__content tooltip__content--${targetPosition}`;

        const scrollY = window.scrollY || window.pageYOffset;
        const scrollX = window.scrollX || window.pageXOffset;

        let top = 0;
        let left = 0;

        switch (targetPosition) {
            case 'top':
                top = rect.top + scrollY - tooltipRect.height - offset;
                left = rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = rect.bottom + scrollY + offset;
                left = rect.left + scrollX + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + scrollY + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left + scrollX - tooltipRect.width - offset;
                break;
            case 'right':
                top = rect.top + scrollY + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + scrollX + offset;
                break;
        }

        if (left < 0) left = offset;
        if (left + tooltipRect.width > vWidth) left = vWidth - tooltipRect.width - offset;

        this.tooltipEl.style.top = `${top}px`;
        this.tooltipEl.style.left = `${left}px`;
        this.tooltipEl.style.bottom = 'auto';
        this.tooltipEl.style.right = 'auto';
    }

    private hide() {
        if (this.tooltipEl) {
            this.tooltipEl.remove();
            this.tooltipEl = null;
            this.element.removeAttribute('aria-describedby');
        }
        window.removeEventListener('scroll', this.boundUpdatePosition, true);
        window.removeEventListener('resize', this.boundUpdatePosition);
    }

    public destroy() {
        this.hide();
        this.element.removeEventListener('mouseenter', this.boundShow);
        this.element.removeEventListener('focus', this.boundShow);
        this.element.removeEventListener('mouseleave', this.boundHide);
        this.element.removeEventListener('blur', this.boundHide);
        delete this.element.dataset.lycoInitialized;
    }
}

export const initTooltips = () => {
    const elements = document.querySelectorAll('[data-lyco-tooltip]:not([data-lyco-initialized])');
    elements.forEach(element => {
        new TooltipController(element as HTMLElement);
    });
};
