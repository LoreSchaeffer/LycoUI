export function initLycoInputs(): void {
    const nativeInputs = document.querySelectorAll<HTMLInputElement>('input.input-custom');
    nativeInputs.forEach(input => {
        if (!input.dataset.lycoInitialized) {
            new LycoInputController(input);
            input.dataset.lycoInitialized = 'true';
        }
    });
}

class LycoInputController {
    private readonly nativeInput: HTMLInputElement;
    private readonly wrapper: HTMLDivElement;
    private readonly container: HTMLDivElement;
    private messageEl?: HTMLDivElement;

    private readonly _onFocus: () => void;
    private readonly _onBlur: () => void;
    private readonly _onInput: () => void;

    private hasBlurred = false;
    private validation: string;

    constructor(nativeInput: HTMLInputElement) {
        this.nativeInput = nativeInput;
        this.wrapper = document.createElement('div');
        this.container = document.createElement('div');
        this.validation = nativeInput.getAttribute('data-validation') || 'disabled';

        this._onFocus = () => this.handleFocus();
        this._onBlur = () => this.handleBlur();
        this._onInput = () => this.handleInput();

        this.buildUI();
        this.bindEvents();
        this.syncFilledState();
    }

    private buildUI(): void {
        const variant = this.nativeInput.getAttribute('data-variant') || 'primary';
        const size = this.nativeInput.getAttribute('data-size') || 'md';
        const labelText = this.nativeInput.getAttribute('data-label') || '';
        const flat = this.nativeInput.getAttribute('data-flat') === 'true';
        const showStepButtons = this.nativeInput.getAttribute('data-show-step-buttons') !== 'false';
        const isNumber = this.nativeInput.type === 'number';
        const iconStartSvg = this.nativeInput.getAttribute('data-icon-start');
        const iconEndSvg = this.nativeInput.getAttribute('data-icon-end');
        const isDisabled = this.nativeInput.disabled;
        const isReadonly = this.nativeInput.hasAttribute('readonly');

        const hasIconStart = Boolean(iconStartSvg);
        const hasIconEnd = Boolean(iconEndSvg);
        const showSteps = isNumber && showStepButtons && !isDisabled && !isReadonly;

        // Build wrapper
        this.wrapper.className = 'input-wrapper';

        // Build container
        const containerClasses = [
            'input',
            `input-${variant}`,
            `input-${size}`,
        ];
        if (flat) containerClasses.push('input-flat');
        if (isDisabled) containerClasses.push('is-disabled');
        if (isReadonly) containerClasses.push('is-readonly');
        if (hasIconStart) containerClasses.push('input-has-icon-start');
        if (hasIconEnd || showSteps) containerClasses.push('input-has-icon-end');
        this.container.className = containerClasses.join(' ');

        // Insert wrapper before native input, then move input inside
        this.nativeInput.parentNode?.insertBefore(this.wrapper, this.nativeInput);

        // Icon start
        if (hasIconStart) {
            const iconEl = document.createElement('span');
            iconEl.className = 'input__icon input__icon--start';
            iconEl.innerHTML = iconStartSvg!;
            this.container.appendChild(iconEl);
        }

        // Move native input inside container
        this.nativeInput.classList.remove('input-custom');
        this.nativeInput.classList.add('input__field');
        this.container.appendChild(this.nativeInput);

        // Floating label
        if (labelText) {
            const label = document.createElement('label');
            label.className = 'input__label';
            label.textContent = labelText;
            if (this.nativeInput.id) {
                label.setAttribute('for', this.nativeInput.id);
            }
            if (this.nativeInput.required) {
                const req = document.createElement('span');
                req.className = 'input__required';
                req.setAttribute('aria-hidden', 'true');
                req.textContent = ' *';
                label.appendChild(req);
            }
            this.container.appendChild(label);
        }

        // Icon end
        if (hasIconEnd && !showSteps) {
            const iconEl = document.createElement('span');
            iconEl.className = 'input__icon input__icon--end';
            iconEl.innerHTML = iconEndSvg!;
            this.container.appendChild(iconEl);
        }

        // Step buttons for number
        if (showSteps) {
            const stepContainer = document.createElement('div');
            stepContainer.className = 'input__step-buttons';

            const upBtn = document.createElement('button');
            upBtn.type = 'button';
            upBtn.className = 'input__step-btn input__step-btn--up';
            upBtn.setAttribute('aria-label', 'Increment');
            upBtn.tabIndex = -1;
            upBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
            upBtn.addEventListener('click', () => this.handleStep(1));

            const downBtn = document.createElement('button');
            downBtn.type = 'button';
            downBtn.className = 'input__step-btn input__step-btn--down';
            downBtn.setAttribute('aria-label', 'Decrement');
            downBtn.tabIndex = -1;
            downBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
            downBtn.addEventListener('click', () => this.handleStep(-1));

            stepContainer.appendChild(upBtn);
            stepContainer.appendChild(downBtn);
            this.container.appendChild(stepContainer);
        }

        this.wrapper.appendChild(this.container);

        // Validation message element (created lazily if needed)
        const validationMsg = this.nativeInput.getAttribute('data-validation-message');
        if (this.validation !== 'disabled' || validationMsg) {
            this.messageEl = document.createElement('div');
            this.messageEl.className = 'input__message';
            this.wrapper.appendChild(this.messageEl);
        }

        // Apply manual validation states
        if (this.validation === 'valid') {
            this.container.classList.add('is-valid');
            if (this.messageEl && validationMsg) {
                this.messageEl.textContent = validationMsg;
                this.messageEl.classList.add('input__message--valid');
            }
        } else if (this.validation === 'invalid') {
            this.container.classList.add('is-invalid');
            if (this.messageEl && validationMsg) {
                this.messageEl.textContent = validationMsg;
                this.messageEl.classList.add('input__message--invalid');
            }
        }
    }

    private bindEvents(): void {
        this.nativeInput.addEventListener('focus', this._onFocus);
        this.nativeInput.addEventListener('blur', this._onBlur);
        this.nativeInput.addEventListener('input', this._onInput);
    }

    private handleFocus(): void {
        this.container.classList.add('is-focused');
    }

    private handleBlur(): void {
        this.container.classList.remove('is-focused');
        this.hasBlurred = true;
        this.syncFilledState();

        if (this.validation === 'auto') {
            this.runAutoValidation();
        }
    }

    private handleInput(): void {
        this.syncFilledState();

        if (this.validation === 'auto' && this.hasBlurred) {
            this.runAutoValidation();
        }
    }

    private handleStep(direction: 1 | -1): void {
        if (this.nativeInput.disabled || this.nativeInput.hasAttribute('readonly')) return;

        if (direction === 1) {
            this.nativeInput.stepUp();
        } else {
            this.nativeInput.stepDown();
        }

        this.nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
        this.syncFilledState();

        if (this.validation === 'auto' && this.hasBlurred) {
            this.runAutoValidation();
        }
    }

    private syncFilledState(): void {
        if (this.nativeInput.value.length > 0) {
            this.container.classList.add('is-filled');
        } else {
            this.container.classList.remove('is-filled');
        }
    }

    private runAutoValidation(): void {
        this.container.classList.remove('is-valid', 'is-invalid');
        if (this.messageEl) {
            this.messageEl.classList.remove('input__message--valid', 'input__message--invalid');
            this.messageEl.textContent = '';
        }

        const overrideMsg = this.nativeInput.getAttribute('data-validation-message');
        const nativeValid = this.nativeInput.checkValidity();

        if (!nativeValid) {
            this.container.classList.add('is-invalid');
            if (this.messageEl) {
                this.messageEl.textContent = overrideMsg || this.nativeInput.validationMessage;
                this.messageEl.classList.add('input__message--invalid');
            }
            return;
        }

        // Check custom validation function if registered
        const fnName = this.nativeInput.getAttribute('data-validation-fn');
        if (fnName && typeof (window as any).lycoValidators?.[fnName] === 'function') {
            const customError = (window as any).lycoValidators[fnName](this.nativeInput.value);
            if (customError) {
                this.container.classList.add('is-invalid');
                if (this.messageEl) {
                    this.messageEl.textContent = overrideMsg || customError;
                    this.messageEl.classList.add('input__message--invalid');
                }
                return;
            }
        }

        this.container.classList.add('is-valid');
        if (this.messageEl && overrideMsg) {
            this.messageEl.textContent = overrideMsg;
            this.messageEl.classList.add('input__message--valid');
        }
    }

    public destroy(): void {
        this.nativeInput.removeEventListener('focus', this._onFocus);
        this.nativeInput.removeEventListener('blur', this._onBlur);
        this.nativeInput.removeEventListener('input', this._onInput);
    }
}
