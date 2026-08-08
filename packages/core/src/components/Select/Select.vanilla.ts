export function initLycoSelects() {
    const nativeSelects = document.querySelectorAll<HTMLSelectElement>('select.select-custom');
    nativeSelects.forEach(select => {
        if (!select.dataset.lycoInitialized) {
            new LycoSelectController(select);
            select.dataset.lycoInitialized = 'true';
        }
    });
}

function parseSafeSvg(svgString: string): SVGSVGElement | null {
    const template = document.createElement('template');
    template.innerHTML = svgString;
    const svg = template.content.querySelector('svg');
    if (!svg) return null;
    
    svg.querySelectorAll('script').forEach(s => s.remove());
    Array.from(svg.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) svg.removeAttribute(attr.name);
    });
    return svg;
}

class LycoSelectController {
    private readonly nativeSelect: HTMLSelectElement;
    private readonly customContainer: HTMLDivElement;
    private trigger!: HTMLDivElement;
    private valueElement!: HTMLSpanElement;
    private dropdown!: HTMLUListElement;
    private options: HTMLLIElement[] = [];
    private optionListeners: { el: HTMLLIElement, click: () => void, mouseenter: () => void }[] = [];

    private isOpen: boolean = false;
    private focusedIndex: number = -1;
    
    private readonly _onOutsideClick: (e: MouseEvent) => void;
    private readonly _onChange: () => void;
    private readonly _onKeyDown: (e: KeyboardEvent) => void;
    private readonly _onToggle: () => void;

    constructor(nativeSelect: HTMLSelectElement) {
        this.nativeSelect = nativeSelect;
        this.customContainer = document.createElement('div');

        this._onOutsideClick = (e: MouseEvent) => {
            if (this.isOpen && !this.customContainer.contains(e.target as Node)) {
                this.close();
            }
        };
        this._onChange = () => this.syncFromNative();
        this._onKeyDown = (e: KeyboardEvent) => this.handleKeyDown(e);
        this._onToggle = () => this.toggle();

        this.buildCustomUI();
        this.bindEvents();
        this.syncFromNative();
    }

    private buildCustomUI(): void {
        this.nativeSelect.style.display = 'none';

        const variant = this.nativeSelect.getAttribute('data-variant') || 'primary';
        const size = this.nativeSelect.getAttribute('data-size') || 'md';

        this.customContainer.className = `select select-${variant} select-${size}`;
        if (this.nativeSelect.disabled) this.customContainer.classList.add('is-disabled');
        this.customContainer.setAttribute('tabindex', this.nativeSelect.disabled ? '-1' : '0');
        this.customContainer.setAttribute('role', 'combobox');
        this.customContainer.setAttribute('aria-haspopup', 'listbox');
        this.customContainer.setAttribute('aria-expanded', 'false');

        const dropdownId = `lyco-select-${Math.random().toString(36).slice(2)}`;
        this.customContainer.setAttribute('aria-controls', dropdownId);

        this.trigger = document.createElement('div');
        this.trigger.className = 'select__trigger';

        const content = document.createElement('div');
        content.className = 'select__content';

        this.valueElement = document.createElement('span');
        this.valueElement.className = 'select__value';

        const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        chevron.setAttribute('class', 'select__chevron');
        chevron.setAttribute('viewBox', '0 0 24 24');
        chevron.setAttribute('fill', 'none');
        chevron.setAttribute('stroke', 'currentColor');
        chevron.setAttribute('stroke-width', '2');
        chevron.setAttribute('stroke-linecap', 'round');
        chevron.setAttribute('stroke-linejoin', 'round');
        chevron.setAttribute('aria-hidden', 'true');
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '6 9 12 15 18 9');
        chevron.appendChild(polyline);

        content.appendChild(this.valueElement);
        this.trigger.appendChild(content);
        this.trigger.appendChild(chevron);

        this.dropdown = document.createElement('ul');
        this.dropdown.className = 'select__dropdown';
        this.dropdown.id = dropdownId;
        this.dropdown.setAttribute('role', 'listbox');
        this.dropdown.hidden = true;

        Array.from(this.nativeSelect.options).forEach((opt, nativeIndex) => {
            const li = document.createElement('li');
            // We use nativeIndex to unambiguously map li -> native option
            li.setAttribute('data-native-index', nativeIndex.toString());

            if (opt.hasAttribute('data-spacer')) {
                li.className = 'select__spacer';
                li.setAttribute('role', 'separator');
                this.options.push(li);
                this.dropdown.appendChild(li);
                return;
            }

            const optionId = `${dropdownId}-opt-${nativeIndex}`;
            li.id = optionId;
            li.className = 'select__option';
            li.setAttribute('role', 'option');
            li.setAttribute('data-value', opt.value);
            if (opt.disabled) {
                li.classList.add('is-disabled');
                li.setAttribute('aria-disabled', 'true');
            }

            const variant = opt.getAttribute('data-variant');
            if (variant) {
                li.classList.add(`select__option-${variant}`);
            }

            const iconContent = opt.getAttribute('data-icon');
            if (iconContent) {
                const iconSpan = document.createElement('span');
                iconSpan.className = 'select__icon select__icon--option';
                const safeSvg = parseSafeSvg(iconContent);
                if (safeSvg) iconSpan.appendChild(safeSvg);
                li.appendChild(iconSpan);
            }

            const textSpan = document.createElement('span');
            textSpan.textContent = opt.text;
            li.appendChild(textSpan);

            this.options.push(li);
            this.dropdown.appendChild(li);
        });

        this.customContainer.appendChild(this.trigger);
        this.customContainer.appendChild(this.dropdown);

        this.nativeSelect.parentNode?.insertBefore(this.customContainer, this.nativeSelect.nextSibling);
    }

    private bindEvents(): void {
        this.trigger.addEventListener('click', this._onToggle);
        document.addEventListener('mousedown', this._onOutsideClick);

        this.options.forEach((optEl, listIndex) => {
            if (optEl.classList.contains('select__spacer')) return;
            const clickFn = () => this.selectOption(listIndex);
            const mouseFn = () => this.updateFocus(listIndex);
            optEl.addEventListener('click', clickFn);
            optEl.addEventListener('mouseenter', mouseFn);
            this.optionListeners.push({ el: optEl, click: clickFn, mouseenter: mouseFn });
        });

        this.customContainer.addEventListener('keydown', this._onKeyDown);
        this.nativeSelect.addEventListener('change', this._onChange);
    }

    public destroy(): void {
        document.removeEventListener('mousedown', this._onOutsideClick);
        this.trigger.removeEventListener('click', this._onToggle);
        this.customContainer.removeEventListener('keydown', this._onKeyDown);
        this.nativeSelect.removeEventListener('change', this._onChange);
        this.optionListeners.forEach(({ el, click, mouseenter }) => {
            el.removeEventListener('click', click);
            el.removeEventListener('mouseenter', mouseenter);
        });
        this.customContainer.remove();
        this.nativeSelect.style.display = '';
        delete this.nativeSelect.dataset.lycoInitialized;
    }

    private toggle(): void {
        if (this.nativeSelect.disabled) return;
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    private open(): void {
        this.isOpen = true;
        this.customContainer.classList.add('is-open');
        this.customContainer.setAttribute('aria-expanded', 'true');
        this.dropdown.hidden = false;

        const selectedNativeIndex = this.nativeSelect.selectedIndex;
        const initialListIndex = this.options.findIndex(
            opt => opt.getAttribute('data-native-index') === selectedNativeIndex.toString()
        );

        this.updateFocus(this.findNextValidIndex(initialListIndex >= 0 ? initialListIndex : 0, 1, true));
    }

    private close(): void {
        this.isOpen = false;
        this.customContainer.classList.remove('is-open');
        this.customContainer.setAttribute('aria-expanded', 'false');
        this.dropdown.hidden = true;
        this.customContainer.removeAttribute('aria-activedescendant');
    }

    private selectOption(listIndex: number): void {
        const li = this.options[listIndex];
        if (!li || li.classList.contains('is-disabled') || li.classList.contains('select__spacer')) return;

        const nativeIndexStr = li.getAttribute('data-native-index');
        if (nativeIndexStr == null) return;
        
        const nativeIndex = parseInt(nativeIndexStr, 10);
        this.nativeSelect.selectedIndex = nativeIndex;
        this.nativeSelect.dispatchEvent(new Event('change', {bubbles: true}));

        this.syncFromNative();
        this.close();
    }

    private syncFromNative(): void {
        const selectedIndex = this.nativeSelect.selectedIndex;
        if (selectedIndex < 0) return;

        const targetNativeOpt = this.nativeSelect.options[selectedIndex];

        this.options.forEach((optEl) => {
            if (optEl.classList.contains('select__spacer')) return;
            const isSelected = optEl.getAttribute('data-native-index') === selectedIndex.toString();
            optEl.classList.toggle('is-selected', isSelected);
            optEl.setAttribute('aria-selected', isSelected.toString());
        });

        const existingIcon = this.trigger.querySelector('.select__icon--start');
        if (existingIcon) existingIcon.remove();

        this.valueElement.textContent = '';
        const iconContent = targetNativeOpt.getAttribute('data-icon');
        if (iconContent) {
            const iconSpan = document.createElement('span');
            iconSpan.className = 'select__icon select__icon--start';
            const safeSvg = parseSafeSvg(iconContent);
            if (safeSvg) iconSpan.appendChild(safeSvg);
            this.valueElement.parentNode?.insertBefore(iconSpan, this.valueElement);
        }

        this.valueElement.textContent = targetNativeOpt.text;
        this.valueElement.classList.remove('select__placeholder');
    }

    private updateFocus(listIndex: number): void {
        if (listIndex < 0 || listIndex >= this.options.length) return;

        this.focusedIndex = listIndex;
        let activeId = '';

        this.options.forEach((opt, i) => {
            const isFocused = i === this.focusedIndex;
            opt.classList.toggle('is-focused', isFocused);
            if (isFocused && opt.id) {
                activeId = opt.id;
            }
        });

        if (activeId) {
            this.customContainer.setAttribute('aria-activedescendant', activeId);
        }

        if (this.focusedIndex >= 0) {
            this.options[this.focusedIndex].scrollIntoView({block: 'nearest'});
        }
    }

    private findNextValidIndex(start: number, direction: 1 | -1, includeStart: boolean = false): number {
        let index = includeStart ? start : start + direction;
        while (index >= 0 && index < this.options.length) {
            const opt = this.options[index];
            if (!opt.classList.contains('is-disabled') && !opt.classList.contains('select__spacer')) {
                return index;
            }
            index += direction;
        }
        return start;
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (this.nativeSelect.disabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (this.isOpen && this.focusedIndex >= 0) {
                    this.selectOption(this.focusedIndex);
                } else {
                    this.toggle();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!this.isOpen) this.open();
                else this.updateFocus(this.findNextValidIndex(this.focusedIndex, 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (this.isOpen) this.updateFocus(this.findNextValidIndex(this.focusedIndex, -1));
                break;
            case 'Escape':
                e.preventDefault();
                this.close();
                break;
            case 'Tab':
                this.close();
                break;
        }
    }
}