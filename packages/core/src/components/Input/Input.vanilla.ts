import {BaseController} from '../../vanilla/BaseController';
import {controllerRegistry} from '../../vanilla/controller-registry';
import {createSafeSvg} from '../../utils/safe-content';
import {resolveFieldValidation, type FieldValidationMode} from '../../interaction/field-validation';
import {createFieldLabel, ensureFieldId, renderFieldMessage} from './InputRenderer';
export function initLycoInputs(root: ParentNode = document): void {
    const nativeInputs = root.querySelectorAll<HTMLInputElement>('input.input-custom');
    nativeInputs.forEach(input => {
        if (!controllerRegistry.get(input, 'input')) {
            const controller = new LycoInputController(input);
            controllerRegistry.register(input, 'input', controller);
            input.dataset.lycoInitialized = 'true';
        }
    });
}
class LycoInputController extends BaseController {
    private readonly nativeInput: HTMLInputElement;
    private readonly wrapper: HTMLDivElement;
    private readonly container: HTMLDivElement;
    private messageEl?: HTMLDivElement;
    private upBtn: HTMLButtonElement | null = null;
    private downBtn: HTMLButtonElement | null = null;
    private readonly _onFocus: () => void;
    private readonly _onBlur: () => void;
    private readonly _onInput: () => void;
    private readonly _onUpStep: () => void;
    private readonly _onDownStep: () => void;
    private hasBlurred = false;
    private validation: FieldValidationMode;
    constructor(nativeInput: HTMLInputElement) {
        super();
        this.nativeInput = nativeInput;
        this.wrapper = document.createElement('div');
        this.container = document.createElement('div');
        const validation = nativeInput.getAttribute('data-validation');
        this.validation = validation === 'auto' || validation === 'valid' || validation === 'invalid' ? validation : 'disabled';
        this._onFocus = () => this.handleFocus();
        this._onBlur = () => this.handleBlur();
        this._onInput = () => this.handleInput();
        this._onUpStep = () => this.handleStep(1);
        this._onDownStep = () => this.handleStep(-1);
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
        ensureFieldId(this.nativeInput);
        const hasIconStart = Boolean(iconStartSvg);
        const hasIconEnd = Boolean(iconEndSvg);
        const showSteps = isNumber && showStepButtons && !isDisabled && !isReadonly;
        this.wrapper.className = 'input-wrapper';
        const containerClasses = [
            'input',
            size && size !== 'md' ? `input-${size}` : '',
        ].filter(Boolean);
        if (flat) containerClasses.push('input-flat');
        if (isDisabled) containerClasses.push('is-disabled');
        if (isReadonly) containerClasses.push('is-readonly');
        if (hasIconStart) containerClasses.push('input-has-icon-start');
        if (hasIconEnd || showSteps) containerClasses.push('input-has-icon-end');
        this.container.className = containerClasses.join(' ');
        if (variant) {
            this.container.style.setProperty('--input-color-base', `var(--${variant}-500, var(--color-${variant}))`);
        }
        this.nativeInput.parentNode?.insertBefore(this.wrapper, this.nativeInput);
        if (hasIconStart && iconStartSvg) {
            const iconEl = document.createElement('span');
            iconEl.className = 'input-icon input-icon-start';
            const safeSvg = createSafeSvg(iconStartSvg);
            if (safeSvg) iconEl.appendChild(safeSvg);
            this.container.appendChild(iconEl);
        }
        this.nativeInput.classList.remove('input-custom');
        this.nativeInput.classList.add('input-field');
        this.container.appendChild(this.nativeInput);
        if (labelText) {
            this.container.appendChild(createFieldLabel('input-label', this.nativeInput, labelText));
        }
        if (hasIconEnd && !showSteps && iconEndSvg) {
            const iconEl = document.createElement('span');
            iconEl.className = 'input-icon input-icon-end';
            const safeSvg = createSafeSvg(iconEndSvg);
            if (safeSvg) iconEl.appendChild(safeSvg);
            this.container.appendChild(iconEl);
        }
        if (showSteps) {
            const stepContainer = document.createElement('div');
            stepContainer.className = 'input-step-buttons';
            this.upBtn = document.createElement('button');
            this.upBtn.type = 'button';
            this.upBtn.className = 'input-step-btn input-step-btn-up';
            this.upBtn.setAttribute('aria-label', 'Increment');
            this.upBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
            this.listen(this.upBtn, 'click', this._onUpStep);
            this.downBtn = document.createElement('button');
            this.downBtn.type = 'button';
            this.downBtn.className = 'input-step-btn input-step-btn-down';
            this.downBtn.setAttribute('aria-label', 'Decrement');
            this.downBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
            this.listen(this.downBtn, 'click', this._onDownStep);
            stepContainer.appendChild(this.upBtn);
            stepContainer.appendChild(this.downBtn);
            this.container.appendChild(stepContainer);
        }
        this.wrapper.appendChild(this.container);
        this.syncValidation();
    }
    private bindEvents(): void {
        this.listen(this.nativeInput, 'focus', this._onFocus);
        this.listen(this.nativeInput, 'blur', this._onBlur);
        this.listen(this.nativeInput, 'input', this._onInput);
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
        this.nativeInput.dispatchEvent(new Event('input', {bubbles: true}));
        this.nativeInput.dispatchEvent(new Event('change', {bubbles: true}));
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
        this.syncValidation();
    }
    private syncValidation(): void {
        const nativeValid = this.nativeInput.checkValidity();
        const fnName = this.nativeInput.getAttribute('data-validation-fn');
        let customMessage: string | null = null;
        if (fnName && typeof window.lycoValidators?.[fnName] === 'function') {
            customMessage = window.lycoValidators[fnName](this.nativeInput.value) ?? null;
        }
        const result = resolveFieldValidation({
            mode: this.validation,
            hasBlurred: this.hasBlurred,
            nativeValid,
            nativeMessage: this.nativeInput.validationMessage,
            customMessage,
            explicitMessage: this.nativeInput.getAttribute('data-validation-message') || undefined,
        });
        this.container.classList.toggle('is-valid', result.state === 'valid');
        this.container.classList.toggle('is-invalid', result.state === 'invalid');
        this.messageEl = renderFieldMessage(this.wrapper, this.nativeInput, this.messageEl, 'input-message', result);
    }
    public override destroy(): void {
        super.destroy();
        this.nativeInput.classList.remove('input-field');
        this.nativeInput.classList.add('input-custom');
        this.wrapper.parentNode?.insertBefore(this.nativeInput, this.wrapper);
        this.wrapper.remove();
        delete this.nativeInput.dataset.lycoInitialized;
    }
}


