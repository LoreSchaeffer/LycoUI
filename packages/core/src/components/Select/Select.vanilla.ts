export function initLycoSelects() {
    const nativeSelects = document.querySelectorAll<HTMLSelectElement>('select.select-custom:not([data-lyco-initialized])');
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
    private contentContainer!: HTMLDivElement;
    private valueElement!: HTMLSpanElement | HTMLInputElement;
    private chevronBtn!: HTMLButtonElement;
    private dropdown!: HTMLUListElement;
    private errorElement?: HTMLDivElement;
    private options: HTMLLIElement[] = [];
    private optionListeners: { el: HTMLLIElement, click: (e: MouseEvent) => void, mouseenter: () => void }[] = [];

    private isOpen: boolean = false;
    private focusedIndex: number = -1;
    private searchable: boolean = false;
    private allowCustomValues: boolean = false;
    private validatePattern: RegExp | null = null;
    private validateMessage: string = 'Invalid format';

    private readonly _onOutsideClick: (e: MouseEvent) => void;
    private readonly _onChange: () => void;
    private readonly _onKeyDown: (e: KeyboardEvent) => void;
    private readonly _onTriggerClick: (e: MouseEvent) => void;
    private readonly _onChevronClick: (e: MouseEvent) => void;
    private readonly _onInput: (e: Event) => void;

    constructor(nativeSelect: HTMLSelectElement) {
        this.nativeSelect = nativeSelect;
        this.customContainer = document.createElement('div');
        this.searchable = this.nativeSelect.getAttribute('data-searchable') === 'true';
        this.allowCustomValues = this.nativeSelect.getAttribute('data-allow-custom') === 'true';

        const pattern = this.nativeSelect.getAttribute('data-validate-pattern');
        if (pattern) {
            this.validatePattern = new RegExp(pattern);
            this.validateMessage = this.nativeSelect.getAttribute('data-validate-message') || 'Invalid format';
        }

        this._onOutsideClick = (e: MouseEvent) => {
            if (this.isOpen && !this.customContainer.contains(e.target as Node)) {
                this.handleBlurCommit();
                this.close();
            }
        };
        this._onChange = () => this.syncFromNative();
        this._onKeyDown = (e: KeyboardEvent) => this.handleKeyDown(e);
        this._onTriggerClick = () => {
            if (this.searchable) {
                if (!this.isOpen && !this.nativeSelect.disabled) {
                    this.open();
                }
            } else {
                this.toggle();
            }
        };
        this._onChevronClick = (e: MouseEvent) => {
            e.stopPropagation();
            this.toggle();
        };
        this._onInput = () => this.handleInput();

        this.buildCustomUI();
        this.bindEvents();
        this.syncFromNative();
    }

    private buildCustomUI(): void {
        this.nativeSelect.style.display = 'none';

        const variant = this.nativeSelect.getAttribute('data-variant') || 'primary';
        const size = this.nativeSelect.getAttribute('data-size') || 'md';

        this.customContainer.className = `select ${size !== 'md' ? `select--${size}` : ''}`.trim();
        if (variant !== 'default') {
            this.customContainer.style.setProperty('--select-color-base', `var(--${variant}-500, var(--color-${variant}))`);
        }
        if (this.nativeSelect.disabled) this.customContainer.classList.add('is-disabled');

        const dropdownId = `lyco-select-${Math.random().toString(36).slice(2)}`;

        this.trigger = document.createElement('div');
        this.trigger.className = 'select__trigger';
        this.trigger.setAttribute('tabindex', this.searchable || this.nativeSelect.disabled ? '-1' : '0');
        this.trigger.setAttribute('role', 'combobox');
        this.trigger.setAttribute('aria-haspopup', 'listbox');
        this.trigger.setAttribute('aria-expanded', 'false');
        this.trigger.setAttribute('aria-controls', dropdownId);

        this.contentContainer = document.createElement('div');
        this.contentContainer.className = 'select__content';

        if (this.searchable) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'select__input';
            input.disabled = this.nativeSelect.disabled;
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('role', 'textbox');
            const placeholder = this.nativeSelect.getAttribute('data-placeholder') || 'Select an option...';
            input.placeholder = placeholder;
            this.valueElement = input;
        } else {
            this.valueElement = document.createElement('span');
            this.valueElement.className = 'select__value select__placeholder';
        }

        this.chevronBtn = document.createElement('button');
        this.chevronBtn.type = 'button';
        this.chevronBtn.className = 'select__chevron-btn';
        this.chevronBtn.tabIndex = -1;
        this.chevronBtn.disabled = this.nativeSelect.disabled;
        this.chevronBtn.setAttribute('aria-label', 'Toggle dropdown');

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
        this.chevronBtn.appendChild(chevron);

        this.contentContainer.appendChild(this.valueElement);
        this.trigger.appendChild(this.contentContainer);
        this.trigger.appendChild(this.chevronBtn);

        this.dropdown = document.createElement('ul');
        this.dropdown.className = 'select__dropdown';
        this.dropdown.id = dropdownId;
        this.dropdown.setAttribute('role', 'listbox');
        this.dropdown.hidden = true;
        this.dropdown.setAttribute('aria-hidden', 'true');

        Array.from(this.nativeSelect.options).forEach((opt, nativeIndex) => {
            if (opt.value === '' && !opt.text) return; // Skip empty placeholder option
            const li = document.createElement('li');
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
                li.classList.add('select__option--variant');
                li.style.setProperty('--select-option-color', `var(--${variant}-500, var(--color-${variant}))`);
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

        // Add "No options found" item
        const noOptionsLi = document.createElement('li');
        noOptionsLi.className = 'select__option is-disabled no-options';
        noOptionsLi.setAttribute('role', 'option');
        noOptionsLi.setAttribute('aria-disabled', 'true');
        noOptionsLi.style.display = 'none';
        const noOptionsSpan = document.createElement('span');
        noOptionsSpan.textContent = 'No options found';
        noOptionsLi.appendChild(noOptionsSpan);
        this.dropdown.appendChild(noOptionsLi);

        this.customContainer.appendChild(this.trigger);
        this.customContainer.appendChild(this.dropdown);

        this.nativeSelect.parentNode?.insertBefore(this.customContainer, this.nativeSelect.nextSibling);
    }

    private bindEvents(): void {
        this.trigger.addEventListener('click', this._onTriggerClick);
        this.chevronBtn.addEventListener('click', this._onChevronClick);
        document.addEventListener('mousedown', this._onOutsideClick);

        if (this.searchable) {
            this.valueElement.addEventListener('input', this._onInput);
        }

        this.options.forEach((optEl, listIndex) => {
            if (optEl.classList.contains('select__spacer')) return;
            const clickFn = (e: MouseEvent) => {
                e.stopPropagation();
                this.selectOption(listIndex);
            };
            const mouseFn = () => this.updateFocus(listIndex);
            optEl.addEventListener('click', clickFn);
            optEl.addEventListener('mouseenter', mouseFn);
            this.optionListeners.push({el: optEl, click: clickFn, mouseenter: mouseFn});
        });

        this.customContainer.addEventListener('keydown', this._onKeyDown);
        this.nativeSelect.addEventListener('change', this._onChange);
    }

    public destroy(): void {
        document.removeEventListener('mousedown', this._onOutsideClick);
        this.trigger.removeEventListener('click', this._onTriggerClick);
        this.chevronBtn.removeEventListener('click', this._onChevronClick);
        if (this.searchable) {
            this.valueElement.removeEventListener('input', this._onInput);
        }
        this.customContainer.removeEventListener('keydown', this._onKeyDown);
        this.nativeSelect.removeEventListener('change', this._onChange);
        this.optionListeners.forEach(({el, click, mouseenter}) => {
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
            this.handleBlurCommit();
            this.close();
        } else {
            this.open();
        }
    }

    private open(): void {
        this.isOpen = true;
        this.customContainer.classList.add('is-open');
        this.trigger.setAttribute('aria-expanded', 'true');
        this.dropdown.hidden = false;
        this.dropdown.setAttribute('aria-hidden', 'false');

        if (this.searchable) {
            (this.valueElement as HTMLInputElement).focus();
            this.filterOptions();
        }

        const selectedNativeIndex = this.nativeSelect.selectedIndex;
        const initialListIndex = this.options.findIndex(
            opt => opt.getAttribute('data-native-index') === selectedNativeIndex.toString()
        );

        this.updateFocus(this.findNextValidIndex(initialListIndex >= 0 ? initialListIndex : 0, 1, true));
    }

    private close(): void {
        this.isOpen = false;
        this.customContainer.classList.remove('is-open');
        this.trigger.setAttribute('aria-expanded', 'false');
        this.dropdown.hidden = true;
        this.dropdown.setAttribute('aria-hidden', 'true');
        this.trigger.removeAttribute('aria-activedescendant');
    }

    private handleInput(): void {
        if (!this.isOpen) this.open();
        this.clearError();
        this.filterOptions();
        this.updateFocus(this.findNextValidIndex(0, 1, true));
    }

    private filterOptions(): void {
        if (!this.searchable) return;
        const query = (this.valueElement as HTMLInputElement).value.toLowerCase();
        let visibleCount = 0;

        this.options.forEach(opt => {
            if (opt.classList.contains('select__spacer')) {
                opt.style.display = '';
                return;
            }
            const text = opt.textContent?.toLowerCase() || '';
            if (text.includes(query)) {
                opt.style.display = '';
                visibleCount++;
            } else {
                opt.style.display = 'none';
            }
        });

        const noOptions = this.dropdown.querySelector('.no-options') as HTMLElement;
        if (noOptions) {
            noOptions.style.display = visibleCount === 0 ? '' : 'none';
        }
    }

    private getVisibleOptions(): HTMLLIElement[] {
        return this.options.filter(opt => opt.style.display !== 'none');
    }

    private findNextValidIndex(start: number, direction: 1 | -1, includeStart: boolean = false): number {
        const visibleOpts = this.getVisibleOptions();
        if (visibleOpts.length === 0) return -1;

        // Find index in visible array
        let visibleIndex = -1;
        if (start >= 0) {
            const target = this.options[start];
            visibleIndex = visibleOpts.indexOf(target);
        }
        if (visibleIndex === -1) visibleIndex = direction === 1 ? 0 : visibleOpts.length - 1;

        let index = includeStart ? visibleIndex : visibleIndex + direction;
        while (index >= 0 && index < visibleOpts.length) {
            const opt = visibleOpts[index];
            if (!opt.classList.contains('is-disabled') && !opt.classList.contains('select__spacer')) {
                return this.options.indexOf(opt); // Return global index
            }
            index += direction;
        }
        return start; // Fallback
    }

    private selectOption(listIndex: number): void {
        const li = this.options[listIndex];
        if (!li || li.classList.contains('is-disabled') || li.classList.contains('select__spacer')) return;

        const nativeIndexStr = li.getAttribute('data-native-index');
        if (nativeIndexStr == null) return;

        this.clearError();
        const nativeIndex = parseInt(nativeIndexStr, 10);
        this.nativeSelect.selectedIndex = nativeIndex;
        this.nativeSelect.dispatchEvent(new Event('change', {bubbles: true}));

        this.syncFromNative();
        this.close();
    }

    private handleBlurCommit(): void {
        if (!this.searchable) return;
        const val = (this.valueElement as HTMLInputElement).value;

        // See if it matches an existing option exactly
        const matchingIndex = this.options.findIndex(opt => !opt.classList.contains('select__spacer') && opt.textContent === val);

        if (matchingIndex >= 0) {
            this.selectOption(matchingIndex);
        } else if (this.allowCustomValues) {
            this.commitCustomValue(val);
        } else {
            // Revert
            this.syncFromNative();
        }
    }

    private commitCustomValue(val: string): boolean {
        if (!val.trim()) {
            this.nativeSelect.value = '';
            this.nativeSelect.dispatchEvent(new Event('change', {bubbles: true}));
            this.syncFromNative();
            return true;
        }

        if (this.validatePattern && !this.validatePattern.test(val)) {
            this.showError(this.validateMessage);
            return false;
        }

        this.clearError();

        // Create custom option if it doesn't exist
        let customOpt = Array.from(this.nativeSelect.options).find(opt => opt.value === val);
        if (!customOpt) {
            customOpt = document.createElement('option');
            customOpt.value = val;
            customOpt.text = val;
            customOpt.setAttribute('data-custom', 'true');
            this.nativeSelect.appendChild(customOpt);

            // Note: we don't strictly need to add it to this.options dropdown list,
            // since it's a free-text custom value, but for robust sync it helps.
            // We'll just rely on syncFromNative to handle the value.
        }

        this.nativeSelect.value = val;
        this.nativeSelect.dispatchEvent(new Event('change', {bubbles: true}));
        this.syncFromNative();
        return true;
    }

    private showError(msg: string): void {
        this.customContainer.classList.add('is-error');
        if (!this.errorElement) {
            this.errorElement = document.createElement('div');
            this.errorElement.className = 'select__error-message';
            this.customContainer.appendChild(this.errorElement);
        }
        this.errorElement.textContent = msg;
    }

    private clearError(): void {
        this.customContainer.classList.remove('is-error');
        if (this.errorElement) {
            this.errorElement.remove();
            this.errorElement = undefined;
        }
    }

    private syncFromNative(): void {
        const selectedIndex = this.nativeSelect.selectedIndex;

        // Reset all visible
        if (this.searchable) {
            this.options.forEach(opt => opt.style.display = '');
        }

        if (selectedIndex < 0) return;

        const targetNativeOpt = this.nativeSelect.options[selectedIndex];

        this.options.forEach((optEl) => {
            if (optEl.classList.contains('select__spacer')) return;
            const isSelected = optEl.getAttribute('data-native-index') === selectedIndex.toString();
            optEl.classList.toggle('is-selected', isSelected);
            optEl.setAttribute('aria-selected', isSelected.toString());
        });

        const existingIcon = this.contentContainer.querySelector('.select__icon--start');
        if (existingIcon) existingIcon.remove();

        const iconContent = targetNativeOpt.getAttribute('data-icon');
        if (iconContent) {
            const iconSpan = document.createElement('span');
            iconSpan.className = 'select__icon select__icon--start';
            const safeSvg = parseSafeSvg(iconContent);
            if (safeSvg) iconSpan.appendChild(safeSvg);
            this.contentContainer.insertBefore(iconSpan, this.valueElement);
        }

        if (this.searchable) {
            (this.valueElement as HTMLInputElement).value = targetNativeOpt.text;
        } else {
            this.valueElement.textContent = targetNativeOpt.text || (this.nativeSelect.getAttribute('data-placeholder') || 'Select an option...');
            this.valueElement.classList.toggle('select__placeholder', !targetNativeOpt.text);
        }
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
            this.trigger.setAttribute('aria-activedescendant', activeId);
        }

        if (this.focusedIndex >= 0) {
            this.options[this.focusedIndex].scrollIntoView({block: 'nearest'});
        }
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (this.nativeSelect.disabled) return;

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (this.isOpen && this.focusedIndex >= 0 && this.options[this.focusedIndex].style.display !== 'none') {
                    this.selectOption(this.focusedIndex);
                } else if (this.searchable && this.allowCustomValues) {
                    const success = this.commitCustomValue((this.valueElement as HTMLInputElement).value);
                    if (success) this.close();
                } else if (!this.isOpen) {
                    this.toggle();
                }
                break;
            case ' ':
                if (!this.searchable) {
                    e.preventDefault();
                    if (this.isOpen && this.focusedIndex >= 0) {
                        this.selectOption(this.focusedIndex);
                    } else {
                        this.toggle();
                    }
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
                this.handleBlurCommit();
                this.close();
                break;
            case 'Tab':
                this.handleBlurCommit();
                this.close();
                break;
        }
    }
}