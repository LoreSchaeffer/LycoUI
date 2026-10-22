import {getContrastColor} from '../../utils/theme';
import {BaseController} from '../../vanilla/BaseController';
import {controllerRegistry} from '../../vanilla/controller-registry';
import {clampPage, pageWindow} from './pagination-model';

export function initLycoPagination(root: ParentNode = document) {
    root.querySelectorAll<HTMLElement>('.pagination-custom:not([data-lyco-initialized])').forEach(element => {
        if (controllerRegistry.get(element, 'pagination')) return;
        const controller = new LycoPaginationController(element);
        controllerRegistry.register(element, 'pagination', controller);
        element.dataset.lycoInitialized = 'true';
    });
}

export class LycoPaginationController extends BaseController {
    private readonly container: HTMLElement;
    private currentPage: number;
    private readonly totalPages: number;
    private readonly siblingCount: number;
    private readonly variant: 'standard' | 'compact';
    private readonly disabled: boolean;
    private editing = false;
    constructor(container: HTMLElement) {
        super();
        this.container = container;
        this.variant = container.dataset.variant === 'compact' ? 'compact' : 'standard';
        this.totalPages = Math.max(1, Number.parseInt(container.dataset.totalPages || '1', 10));
        this.currentPage = clampPage(Number.parseInt(container.dataset.currentPage || '1', 10), this.totalPages);
        this.siblingCount = Math.max(0, Number.parseInt(container.dataset.siblingCount || '1', 10));
        this.disabled = container.hasAttribute('disabled') || container.getAttribute('aria-disabled') === 'true' || container.classList.contains('is-disabled');
        this.render();
    }
    private button(label: string, content: string, page?: number, current = false): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = label.startsWith('Page') ? 'pagination-link' : `pagination-btn pagination-btn-${label === 'Next page' ? 'next' : 'prev'}`;
        const blocked = this.disabled || page === undefined || page < 1 || page > this.totalPages;
        if (blocked) { button.disabled = true; button.classList.add('is-disabled'); }
        if (current) { button.classList.add('is-active'); button.setAttribute('aria-current', 'page'); }
        button.setAttribute('aria-label', label); button.textContent = content;
        if (!blocked && page !== undefined) button.addEventListener('click', () => this.change(page));
        return button;
    }
    private change(page: number) {
        const next = clampPage(page, this.totalPages);
        if (next === this.currentPage || this.disabled) return;
        this.currentPage = next; this.container.dataset.currentPage = String(next);
        this.container.dispatchEvent(new CustomEvent('pageChange', {detail: {page: next}, bubbles: true})); this.render();
    }
    private renderStandard() {
        const list = document.createElement('ul'); list.className = 'pagination-list';
        const append = (child: HTMLElement) => { const item = document.createElement('li'); item.className = 'pagination-item'; item.append(child); list.append(item); };
        append(this.button('Previous page', '‹', this.currentPage - 1));
        pageWindow(this.totalPages, this.currentPage, this.siblingCount).forEach(token => {
            if (typeof token === 'string') { const span = document.createElement('span'); span.className = 'pagination-link pagination-ellipsis'; span.setAttribute('aria-hidden', 'true'); span.textContent = '...'; append(span); }
            else append(this.button(`Page ${token}`, String(token), token, token === this.currentPage));
        });
        append(this.button('Next page', '›', this.currentPage + 1)); this.container.append(list);
    }
    private renderCompact() {
        this.container.append(this.button('Previous page', '‹', this.currentPage - 1));
        const info = document.createElement('div'); info.className = 'pagination-compact-info';
        if (this.editing) {
            const input = document.createElement('input'); input.type = 'number'; input.className = 'pagination-current-page-input'; input.value = String(this.currentPage); input.min = '1'; input.max = String(this.totalPages); input.setAttribute('aria-label', 'Current page');
            input.addEventListener('blur', () => { this.editing = false; this.change(Number.parseInt(input.value, 10)); });
            input.addEventListener('keydown', event => { const key = event as KeyboardEvent; if (key.key === 'Enter') input.blur(); if (key.key === 'Escape') { this.editing = false; this.render(); } });
            info.append(input); window.setTimeout(() => input.focus(), 0);
        } else { const page = document.createElement('span'); page.className = 'pagination-current-page'; page.tabIndex = this.disabled ? -1 : 0; page.textContent = String(this.currentPage); page.setAttribute('aria-label', `Page ${this.currentPage} of ${this.totalPages}. Click to jump to page.`); if (!this.disabled) page.addEventListener('click', () => { this.editing = true; this.render(); }); info.append(page); }
        const separator = document.createElement('span'); separator.className = 'pagination-separator'; separator.textContent = '/'; separator.setAttribute('aria-hidden', 'true'); const total = document.createElement('span'); total.className = 'pagination-total-pages'; total.textContent = String(this.totalPages); info.append(separator, total); this.container.append(info, this.button('Next page', '›', this.currentPage + 1));
    }
    private render() {
        this.container.replaceChildren(); this.container.classList.add('pagination'); this.container.setAttribute('aria-label', 'Pagination'); this.container.style.setProperty('--pagination-color-base', `var(--${this.container.dataset.colorVariant || 'primary'}-500)`); this.container.style.setProperty('--pagination-color-contrast', getContrastColor(this.container.dataset.colorVariant || 'primary'));
        if (this.variant === 'compact') { this.container.classList.add('pagination-compact'); this.renderCompact(); } else this.renderStandard();
    }
    public override destroy() { super.destroy(); delete this.container.dataset.lycoInitialized; }
}


