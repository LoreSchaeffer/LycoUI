import {BaseController} from '../../vanilla/BaseController';
import {controllerRegistry} from '../../vanilla/controller-registry';
import {filterSelectOptions, findSelectableOption} from './select-model';

export function initLycoSelects(root: ParentNode = document): void {
    root.querySelectorAll<HTMLSelectElement>('select.select-custom').forEach(select => {
        if (controllerRegistry.get(select, 'select')) return;
        const controller = new LycoSelectController(select);
        controllerRegistry.register(select, 'select', controller);
        select.dataset.lycoInitialized = 'true';
    });
}

export class LycoSelectController extends BaseController {
    private readonly nativeSelect: HTMLSelectElement;
    private readonly container = document.createElement('div');
    private readonly trigger = document.createElement('div');
    private readonly dropdown = document.createElement('ul');
    private readonly entries: HTMLLIElement[] = [];
    private readonly searchable: boolean;
    private readonly allowCustomValues: boolean;
    private readonly input: HTMLInputElement | null;
    private readonly value: HTMLSpanElement | null;
    private focused = -1;
    private openState = false;

    constructor(nativeSelect: HTMLSelectElement) {
        super();
        this.nativeSelect = nativeSelect;
        this.searchable = nativeSelect.dataset.searchable === 'true';
        this.allowCustomValues = nativeSelect.dataset.allowCustom === 'true';
        this.input = this.searchable ? document.createElement('input') : null;
        this.value = this.searchable ? null : document.createElement('span');
        this.build();
        this.listen(nativeSelect, 'change', () => this.sync());
        this.listen(document, 'mousedown', event => {
            if (this.openState && !this.container.contains(event.target as Node) && !this.dropdown.contains(event.target as Node)) this.close(true);
        });
        this.sync();
    }

    private build(): void {
        const {dataset, disabled} = this.nativeSelect;
        this.nativeSelect.style.display = 'none';
        this.container.className = `select${dataset.size && dataset.size !== 'md' ? ` select-${dataset.size}` : ''}`;
        if (disabled) this.container.classList.add('is-disabled');
        if (dataset.variant && dataset.variant !== 'default') this.container.style.setProperty('--select-color-base', `var(--${dataset.variant}-500, var(--color-${dataset.variant}))`);
        const listboxId = `${this.nativeSelect.id || 'lyco-select'}-listbox`;
        this.trigger.className = 'select-trigger';
        this.trigger.tabIndex = this.searchable || disabled ? -1 : 0;
        this.trigger.setAttribute('role', 'combobox');
        this.trigger.setAttribute('aria-haspopup', 'listbox');
        this.trigger.setAttribute('aria-controls', listboxId);
        this.trigger.setAttribute('aria-expanded', 'false');
        const content = document.createElement('div'); content.className = 'select-content';
        if (this.input) {
            this.input.type = 'text'; this.input.className = 'select-input'; this.input.placeholder = dataset.placeholder || 'Select an option...'; this.input.disabled = disabled; this.input.autocomplete = 'off';
            content.append(this.input);
            this.listen(this.input, 'input', () => { if (!this.openState) this.open(); this.renderOptions(); });
        } else if (this.value) { this.value.className = 'select-value select-placeholder'; content.append(this.value); }
        const chevron = document.createElement('button'); chevron.type = 'button'; chevron.className = 'select-chevron-btn'; chevron.tabIndex = -1; chevron.disabled = disabled; chevron.setAttribute('aria-label', 'Toggle dropdown'); chevron.textContent = '⌄';
        this.trigger.append(content, chevron);
        this.listen(this.trigger, 'click', () => this.searchable ? this.open() : this.toggle());
        this.listen(chevron, 'click', event => { event.stopPropagation(); this.toggle(); });
        this.listen(this.trigger, 'keydown', event => this.handleKey(event as KeyboardEvent));
        this.dropdown.className = 'select-dropdown'; this.dropdown.id = listboxId; this.dropdown.setAttribute('role', 'listbox');
        this.container.append(this.trigger); this.nativeSelect.after(this.container);
    }

    private options() {
        return Array.from(this.nativeSelect.options).map((option, index) => ({id: String(index), label: option.text, value: option.value, disabled: option.disabled, isSpacer: option.hasAttribute('data-spacer')}));
    }

    private renderOptions(): void {
        const query = this.input?.value || '';
        const options = filterSelectOptions(this.options(), query);
        this.entries.length = 0; this.dropdown.replaceChildren();
        if (!options.some(option => !option.isSpacer)) {
            const empty = document.createElement('li'); empty.className = 'select-option is-disabled'; empty.setAttribute('role', 'option'); empty.setAttribute('aria-disabled', 'true'); empty.textContent = 'No options found'; this.dropdown.append(empty); return;
        }
        for (const option of options) {
            const entry = document.createElement('li'); entry.dataset.index = option.id;
            if (option.isSpacer) { entry.className = 'select-spacer'; entry.setAttribute('role', 'separator'); }
            else {
                entry.id = `${this.dropdown.id}-option-${option.id}`; entry.className = 'select-option'; entry.setAttribute('role', 'option'); entry.setAttribute('aria-selected', String(this.nativeSelect.value === option.value));
                if (option.disabled) { entry.classList.add('is-disabled'); entry.setAttribute('aria-disabled', 'true'); }
                if (option.id === String(this.nativeSelect.selectedIndex)) entry.classList.add('is-selected');
                entry.textContent = option.label;
                this.listen(entry, 'click', event => { event.stopPropagation(); this.select(Number(option.id)); });
                this.listen(entry, 'mouseenter', () => this.setFocus(this.entries.indexOf(entry)));
            }
            this.entries.push(entry); this.dropdown.append(entry);
        }
    }

    private open(): void {
        if (this.nativeSelect.disabled || this.openState) return;
        this.openState = true; this.container.classList.add('is-open'); this.trigger.setAttribute('aria-expanded', 'true');
        const rect = this.container.getBoundingClientRect();
        Object.assign(this.dropdown.style, {position: 'absolute', top: `${rect.bottom + window.scrollY + 8}px`, left: `${rect.left + window.scrollX}px`, width: `${rect.width}px`, zIndex: 'var(--z-dropdown, 1050)'});
        document.body.append(this.dropdown); this.renderOptions();
        this.focused = findSelectableOption(this.entries.map((entry, index) => ({id: String(index), disabled: entry.classList.contains('is-disabled'), isSpacer: entry.classList.contains('select-spacer')})), this.entries.findIndex(entry => entry.dataset.index === String(this.nativeSelect.selectedIndex)), 1, true);
        this.setFocus(this.focused); this.input?.focus();
    }

    private close(commit = false): void {
        if (!this.openState) return;
        if (commit) this.commitInput();
        this.openState = false; this.container.classList.remove('is-open'); this.trigger.setAttribute('aria-expanded', 'false'); this.trigger.removeAttribute('aria-activedescendant'); this.dropdown.remove();
    }

    private toggle(): void { this.openState ? this.close(true) : this.open(); }
    private select(index: number): void { const option = this.nativeSelect.options[index]; if (!option || option.disabled || option.hasAttribute('data-spacer')) return; this.nativeSelect.selectedIndex = index; this.nativeSelect.dispatchEvent(new Event('change', {bubbles: true})); this.close(); }
    private commitInput(): void {
        if (!this.input) return;
        const match = Array.from(this.nativeSelect.options).findIndex(option => option.text === this.input!.value || option.value === this.input!.value);
        if (match >= 0) { this.select(match); return; }
        if (!this.allowCustomValues) { this.sync(); return; }
        const option = new Option(this.input.value, this.input.value, true, true); option.dataset.custom = 'true'; this.nativeSelect.add(option); this.nativeSelect.dispatchEvent(new Event('change', {bubbles: true}));
    }
    private sync(): void { const option = this.nativeSelect.selectedOptions[0]; if (this.input) this.input.value = option?.text || ''; if (this.value) { this.value.textContent = option?.text || this.nativeSelect.dataset.placeholder || 'Select an option...'; this.value.classList.toggle('select-placeholder', !option?.text); } if (this.openState) this.renderOptions(); }
    private setFocus(index: number): void { if (index < 0 || index >= this.entries.length) return; this.focused = index; this.entries.forEach((entry, itemIndex) => entry.classList.toggle('is-focused', itemIndex === index)); const active = this.entries[index]; if (active.id) this.trigger.setAttribute('aria-activedescendant', active.id); active.scrollIntoView({block: 'nearest'}); }
    private handleKey(event: KeyboardEvent): void {
        if (this.nativeSelect.disabled) return;
        if (event.key === 'Escape') { event.preventDefault(); this.close(true); return; }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); if (!this.openState) this.open(); else this.setFocus(findSelectableOption(this.entries.map((entry, index) => ({id: String(index), disabled: entry.classList.contains('is-disabled'), isSpacer: entry.classList.contains('select-spacer')})), this.focused, event.key === 'ArrowDown' ? 1 : -1)); return; }
        if (event.key === 'Enter' && this.openState) { event.preventDefault(); const entry = this.entries[this.focused]; if (entry?.dataset.index) this.select(Number(entry.dataset.index)); else this.commitInput(); }
    }
    public override destroy(): void { super.destroy(); this.dropdown.remove(); this.container.remove(); this.nativeSelect.style.display = ''; delete this.nativeSelect.dataset.lycoInitialized; }
}
