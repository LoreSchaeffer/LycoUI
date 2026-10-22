import {BaseController} from '../../vanilla/BaseController';
import {controllerRegistry} from '../../vanilla/controller-registry';

export function initLycoTextareas(root: ParentNode = document): void {
    root.querySelectorAll<HTMLTextAreaElement>('textarea.textarea-custom').forEach(textarea => {
        if (controllerRegistry.get(textarea, 'textarea')) return;
        controllerRegistry.register(textarea, 'textarea', new LycoTextareaController(textarea));
        textarea.dataset.lycoInitialized = 'true';
    });
}

export class LycoTextareaController extends BaseController {
    private readonly textarea: HTMLTextAreaElement;
    private readonly wrapper = document.createElement('div');
    private readonly field = document.createElement('div');
    private readonly label?: HTMLLabelElement;
    private readonly message?: HTMLDivElement;
    private readonly id: string;
    constructor(textarea: HTMLTextAreaElement) {
        super();
        this.textarea = textarea;
        this.id = textarea.id || `lyco-textarea-${Math.random().toString(36).slice(2)}`;
        textarea.id = this.id;
        this.wrapper.className = 'textarea-wrapper'; this.field.className = 'textarea';
        const labelText = textarea.dataset.label;
        if (labelText) { this.label = document.createElement('label'); this.label.className = 'textarea-label'; this.label.htmlFor = this.id; this.label.textContent = labelText; }
        if (textarea.dataset.validation !== 'disabled') { this.message = document.createElement('div'); this.message.className = 'textarea-message'; this.message.id = `${this.id}-message`; this.message.setAttribute('role', 'status'); textarea.setAttribute('aria-describedby', this.message.id); }
        textarea.parentNode?.insertBefore(this.wrapper, textarea); this.wrapper.append(this.field); this.field.append(textarea); if (this.label) this.field.append(this.label); if (this.message) this.wrapper.append(this.message);
        this.listen(textarea, 'focus', () => this.field.classList.add('is-focused'));
        this.listen(textarea, 'blur', () => { this.field.classList.remove('is-focused'); this.validate(); });
        this.listen(textarea, 'input', () => { this.field.classList.toggle('is-filled', Boolean(textarea.value)); if (textarea.dataset.validation === 'auto') this.validate(); });
        this.field.classList.toggle('is-filled', Boolean(textarea.value));
    }
    private validate(): void {
        if (!this.message || this.textarea.dataset.validation === 'disabled') return;
        const invalid = !this.textarea.checkValidity(); this.field.classList.toggle('is-invalid', invalid); this.field.classList.toggle('is-valid', !invalid); this.textarea.setAttribute('aria-invalid', String(invalid)); this.message.textContent = invalid ? this.textarea.validationMessage : '';
    }
    public override destroy(): void { super.destroy(); this.textarea.removeAttribute('aria-invalid'); this.textarea.removeAttribute('aria-describedby'); this.wrapper.before(this.textarea); this.wrapper.remove(); delete this.textarea.dataset.lycoInitialized; }
}
