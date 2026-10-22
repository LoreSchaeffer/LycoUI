import type {FieldValidationResult} from '../../interaction/field-validation';

let fieldId = 0;

export function ensureFieldId(field: HTMLInputElement, prefix = 'lyco-input'): string {
    if (!field.id) field.id = `${prefix}-${++fieldId}`;
    return field.id;
}

export function createFieldLabel(className: string, field: HTMLInputElement, text: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.className = className;
    label.htmlFor = ensureFieldId(field);
    label.append(text);
    if (field.required) {
        const required = document.createElement('span');
        required.className = className.replace('__label', '__required');
        required.setAttribute('aria-hidden', 'true');
        required.textContent = ' *';
        label.append(required);
    }
    return label;
}

export function renderFieldMessage(wrapper: HTMLElement, field: HTMLInputElement, message: HTMLDivElement | undefined, className: string, result: FieldValidationResult): HTMLDivElement | undefined {
    const messageId = `${ensureFieldId(field)}-message`;
    if (!result.message) {
        message?.remove();
        field.removeAttribute('aria-describedby');
        field.toggleAttribute('aria-invalid', result.state === 'invalid');
        return undefined;
    }
    const next = message ?? document.createElement('div');
    next.id = messageId;
    next.className = `${className} ${className}--${result.state}`;
    next.setAttribute('role', result.state === 'invalid' ? 'alert' : 'status');
    next.textContent = result.message;
    if (!next.parentNode) wrapper.append(next);
    field.setAttribute('aria-describedby', messageId);
    field.toggleAttribute('aria-invalid', result.state === 'invalid');
    return next;
}
