import {getContrastColor} from '../../utils/theme';

export function initLycoPagination() {
    const paginations = document.querySelectorAll<HTMLElement>('.pagination-custom:not([data-lyco-initialized])');
    paginations.forEach(el => {
        if (!el.dataset.lycoInitialized) {
            new LycoPaginationController(el);
            el.dataset.lycoInitialized = 'true';
        }
    });
}

class LycoPaginationController {
    private readonly container: HTMLElement;
    private variant: 'standard' | 'compact';
    private currentPage: number;
    private totalPages: number;
    private siblingCount: number;
    private disabled: boolean;

    private isEditing: boolean = false;
    private currentInput: HTMLInputElement | null = null;
    private currentSpan: HTMLSpanElement | null = null;
    private focusTimeoutId?: number;

    private listeners: { el: HTMLElement | Window, type: string, fn: EventListenerOrEventListenerObject }[] = [];

    constructor(container: HTMLElement) {
        this.container = container;

        this.variant = (this.container.getAttribute('data-variant') as 'standard' | 'compact') || 'standard';
        this.currentPage = parseInt(this.container.getAttribute('data-current-page') || '1', 10);
        this.totalPages = parseInt(this.container.getAttribute('data-total-pages') || '1', 10);
        this.siblingCount = parseInt(this.container.getAttribute('data-sibling-count') || '1', 10);
        this.disabled = this.container.hasAttribute('disabled') || this.container.getAttribute('aria-disabled') === 'true' || this.container.classList.contains('is-disabled');

        this.currentPage = Math.max(1, Math.min(this.currentPage, Math.max(1, this.totalPages)));

        this.buildUI();
    }

    private addListener(el: HTMLElement | Window, type: string, fn: EventListenerOrEventListenerObject) {
        el.addEventListener(type, fn);
        this.listeners.push({el, type, fn});
    }

    public destroy(): void {
        if (this.focusTimeoutId) window.clearTimeout(this.focusTimeoutId);
        this.listeners.forEach(({el, type, fn}) => {
            el.removeEventListener(type, fn);
        });
        this.listeners = [];
        this.container.innerHTML = '';
        delete this.container.dataset.lycoInitialized;
    }

    private dispatchChange(page: number) {
        this.currentPage = page;
        this.container.setAttribute('data-current-page', page.toString());
        this.container.dispatchEvent(new CustomEvent('pageChange', {
            detail: {page},
            bubbles: true
        }));
        this.buildUI();
    }

    private handlePageChange(page: number) {
        if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
            this.dispatchChange(page);
        }
    }

    private buildUI(): void {
        if (this.focusTimeoutId) window.clearTimeout(this.focusTimeoutId);
        this.listeners.forEach(({el, type, fn}) => {
            el.removeEventListener(type, fn);
        });
        this.listeners = [];
        this.container.innerHTML = '';
        this.currentInput = null;
        this.currentSpan = null;

        const colorVariant = this.container.getAttribute('data-color-variant') || 'primary';
        const size = this.container.getAttribute('data-size') || 'md';
        this.disabled = this.container.hasAttribute('disabled') || this.container.getAttribute('aria-disabled') === 'true' || this.container.classList.contains('is-disabled');

        this.container.className = this.container.className
            .split(' ')
            .filter(c => !c.startsWith('pagination-') || c === 'pagination-custom')
            .join(' ');

        this.container.classList.add('pagination');
        if (colorVariant) {
            this.container.style.setProperty('--pagination-color-base', `var(--${colorVariant}-500, var(--color-${colorVariant}))`);
            this.container.style.setProperty('--pagination-color-contrast', getContrastColor(colorVariant));
        }
        if (size !== 'md') {
            this.container.classList.add(`pagination-${size}`);
        }
        if (this.variant === 'compact') {
            this.container.classList.add('pagination-compact');
            this.container.style.setProperty('--compact-digits', this.totalPages.toString().length.toString());
        } else {
            this.container.style.removeProperty('--compact-digits');
        }
        if (this.disabled) {
            this.container.classList.add('is-disabled');
            this.container.setAttribute('aria-disabled', 'true');
        }

        if (this.variant === 'standard') {
            this.buildStandard();
        } else {
            this.buildCompact();
        }
    }

    private getChevronLeft(): string {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
    }

    private getChevronRight(): string {
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    }

    private createButton(isNext: boolean, isLimitReached: boolean): HTMLButtonElement {
        const btn = document.createElement('button');
        btn.className = `pagination__btn pagination__btn--${isNext ? 'next' : 'prev'}`;
        const shouldDisable = this.disabled || isLimitReached;
        if (shouldDisable) {
            btn.classList.add('is-disabled');
            btn.disabled = true;
        }
        btn.setAttribute('aria-label', isNext ? 'Next page' : 'Previous page');
        btn.innerHTML = isNext ? this.getChevronRight() : this.getChevronLeft();

        this.addListener(btn, 'click', () => {
            this.handlePageChange(isNext ? this.currentPage + 1 : this.currentPage - 1);
        });

        return btn;
    }

    private buildStandard(): void {
        const ul = document.createElement('ul');
        ul.className = 'pagination__list';

        const liPrev = document.createElement('li');
        liPrev.className = 'pagination__item';
        liPrev.appendChild(this.createButton(false, this.currentPage <= 1));
        ul.appendChild(liPrev);

        const totalNumbers = this.siblingCount * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        let pages: (number | string)[] = [];

        if (this.totalPages > totalBlocks) {
            const startPage = Math.max(2, this.currentPage - this.siblingCount);
            const endPage = Math.min(this.totalPages - 1, this.currentPage + this.siblingCount);

            pages.push(1);
            if (startPage > 2) pages.push('ellipsis-start');
            for (let i = startPage; i <= endPage; i++) pages.push(i);
            if (endPage < this.totalPages - 1) pages.push('ellipsis-end');
            pages.push(this.totalPages);
        } else {
            for (let i = 1; i <= this.totalPages; i++) pages.push(i);
        }

        pages.forEach(page => {
            const li = document.createElement('li');
            li.className = 'pagination__item';

            if (typeof page === 'string') {
                const span = document.createElement('span');
                span.className = 'pagination__link pagination__ellipsis';
                span.setAttribute('aria-hidden', 'true');
                span.textContent = '...';
                li.appendChild(span);
            } else {
                const btn = document.createElement('button');
                btn.className = 'pagination__link';
                if (page === this.currentPage) {
                    btn.classList.add('is-active');
                    btn.setAttribute('aria-current', 'page');
                }
                if (this.disabled) {
                    btn.classList.add('is-disabled');
                    btn.disabled = true;
                }
                btn.setAttribute('aria-label', `Page ${page}`);
                btn.textContent = page.toString();
                this.addListener(btn, 'click', () => this.handlePageChange(page));
                li.appendChild(btn);
            }

            ul.appendChild(li);
        });

        const liNext = document.createElement('li');
        liNext.className = 'pagination__item';
        liNext.appendChild(this.createButton(true, this.currentPage >= this.totalPages));
        ul.appendChild(liNext);

        this.container.appendChild(ul);
    }

    private buildCompact(): void {
        this.container.appendChild(this.createButton(false, this.currentPage <= 1));

        const info = document.createElement('div');
        info.className = 'pagination__compact-info';

        if (this.isEditing) {
            this.currentInput = document.createElement('input');
            this.currentInput.type = 'number';
            this.currentInput.className = 'pagination__current-page--input';
            this.currentInput.value = this.currentPage.toString();
            this.currentInput.min = '1';
            this.currentInput.max = this.totalPages.toString();
            this.currentInput.setAttribute('aria-label', 'Current page');

            this.addListener(this.currentInput, 'blur', this.handleInputBlur.bind(this));
            this.addListener(this.currentInput, 'keydown', this.handleInputKeyDown.bind(this));

            info.appendChild(this.currentInput);

            this.focusTimeoutId = window.setTimeout(() => {
                if (this.currentInput) {
                    this.currentInput.focus();
                    this.currentInput.select();
                }
            }, 0);
        } else {
            this.currentSpan = document.createElement('span');
            this.currentSpan.className = 'pagination__current-page';
            if (this.disabled) {
                this.currentSpan.classList.add('is-disabled');
            }
            this.currentSpan.tabIndex = this.disabled ? -1 : 0;
            this.currentSpan.setAttribute('aria-label', `Page ${this.currentPage} of ${this.totalPages}. Click to jump to page.`);
            if (this.disabled) {
                this.currentSpan.setAttribute('aria-disabled', 'true');
            }
            this.currentSpan.textContent = this.currentPage.toString();

            if (!this.disabled) {
                this.addListener(this.currentSpan, 'click', () => {
                    this.isEditing = true;
                    this.buildUI();
                });
                this.addListener(this.currentSpan, 'keydown', (e: Event) => {
                    const kbEvent = e as KeyboardEvent;
                    if (kbEvent.key === 'Enter' || kbEvent.key === ' ') {
                        kbEvent.preventDefault();
                        this.isEditing = true;
                        this.buildUI();
                    }
                });
            }

            info.appendChild(this.currentSpan);
        }

        const separator = document.createElement('span');
        separator.className = 'pagination__separator';
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '/';
        info.appendChild(separator);

        const total = document.createElement('span');
        total.className = 'pagination__total-pages';
        total.textContent = this.totalPages.toString();
        info.appendChild(total);

        this.container.appendChild(info);
        this.container.appendChild(this.createButton(true, this.currentPage >= this.totalPages));
    }

    private handleInputBlur(): void {
        this.isEditing = false;
        if (this.currentInput) {
            const val = parseInt(this.currentInput.value, 10);
            if (!isNaN(val)) {
                this.handlePageChange(val);
                return;
            }
        }
        this.buildUI();
    }

    private handleInputKeyDown(e: Event): void {
        const kbEvent = e as KeyboardEvent;
        if (kbEvent.key === 'Enter') {
            this.handleInputBlur();
        } else if (kbEvent.key === 'Escape') {
            this.isEditing = false;
            this.buildUI();
        }
    }
}

