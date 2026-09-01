export function initLycoRanges() {
    const nativeRanges = document.querySelectorAll<HTMLInputElement>('input[type="range"].range-custom:not([data-lyco-initialized])');
    nativeRanges.forEach(range => {
        if (!range.dataset.lycoInitialized) {
            new LycoRangeController(range);
            range.dataset.lycoInitialized = 'true';
        }
    });
}

class LycoRangeController {
    private readonly nativeInput: HTMLInputElement;
    private readonly customContainer: HTMLDivElement;
    private tooltipValue?: HTMLSpanElement;

    private readonly _onInput: () => void;

    constructor(nativeInput: HTMLInputElement) {
        this.nativeInput = nativeInput;
        this.customContainer = document.createElement('div');
        this._onInput = () => this.sync();

        this.buildUI();
        this.bindEvents();
        this.sync();
    }

    private buildUI(): void {
        const variant = this.nativeInput.getAttribute('data-variant') || 'primary';
        const size = this.nativeInput.getAttribute('data-size') || 'md';
        const tooltipSize = this.nativeInput.getAttribute('data-tooltip-size') || 'md';
        const filled = this.nativeInput.getAttribute('data-filled') !== 'false';
        const showTooltip = this.nativeInput.getAttribute('data-show-tooltip') !== 'false';

        this.customContainer.className = `range ${size !== 'md' ? `range--${size}` : ''} range--tooltip-${tooltipSize}`;
        this.customContainer.style.setProperty('--range-color-base', `var(--${variant}-500, var(--color-${variant}))`);
        if (!filled) {
            this.customContainer.classList.add('range--unfilled');
        }
        if (this.nativeInput.disabled) {
            this.customContainer.classList.add('is-disabled');
        }

        this.nativeInput.parentNode?.insertBefore(this.customContainer, this.nativeInput);

        this.nativeInput.classList.remove('lyco-range-custom');
        this.nativeInput.classList.add('range__input');

        this.customContainer.appendChild(this.nativeInput);

        if (showTooltip) {
            const tooltip = document.createElement('div');
            tooltip.className = 'range__tooltip';
            tooltip.setAttribute('aria-hidden', 'true');

            this.tooltipValue = document.createElement('span');
            this.tooltipValue.className = 'range__tooltip-value';

            tooltip.appendChild(this.tooltipValue);
            this.customContainer.appendChild(tooltip);
        }
    }

    private bindEvents(): void {
        this.nativeInput.addEventListener('input', this._onInput);
    }

    private sync(): void {
        const min = parseFloat(this.nativeInput.min) || 0;
        const max = parseFloat(this.nativeInput.max) || 100;
        const value = parseFloat(this.nativeInput.value) || 0;

        const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

        this.customContainer.style.setProperty('--range-progress', `${percent}%`);
        this.customContainer.style.setProperty('--range-progress-ratio', `${percent / 100}`);
        this.nativeInput.setAttribute('aria-valuenow', value.toString());
        this.nativeInput.setAttribute('aria-valuemin', min.toString());
        this.nativeInput.setAttribute('aria-valuemax', max.toString());

        let displayValue: string | number = value;

        const formatterName = this.nativeInput.getAttribute('data-tooltip-format');
        if (formatterName && typeof window.lycoFormatters?.[formatterName] === 'function') {
            displayValue = window.lycoFormatters[formatterName](Number(value));
        }

        const displayString = String(displayValue);
        if (this.tooltipValue) {
            this.tooltipValue.textContent = displayString;
            this.customContainer.style.setProperty('--char-count', displayString.length.toString());
        }
    }

    public destroy(): void {
        this.nativeInput.removeEventListener('input', this._onInput);
        this.nativeInput.classList.remove('range__input');
        this.nativeInput.classList.add('range-custom');
        this.customContainer.parentNode?.insertBefore(this.nativeInput, this.customContainer);
        this.customContainer.remove();
        delete this.nativeInput.dataset.lycoInitialized;
    }
}
