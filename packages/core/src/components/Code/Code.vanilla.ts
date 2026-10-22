export function initLycoCodes(): void {
    const codes = document.querySelectorAll<HTMLDivElement>('.code:not([data-lyco-initialized])');
    codes.forEach(code => {
        new LycoCodeController(code);
        code.setAttribute('data-lyco-initialized', 'true');
    });
}

class LycoCodeController {
    private readonly element: HTMLDivElement;
    private readonly select: HTMLSelectElement | null;
    private readonly copyBtn: HTMLButtonElement | null;
    private readonly downloadBtn: HTMLButtonElement | null;
    private readonly textarea: HTMLTextAreaElement | null;

    private readonly _onSelectChange: (e: Event) => void;
    private readonly _onCopyClick: (e: MouseEvent) => void;
    private readonly _onDownloadClick: (e: MouseEvent) => void;
    private readonly _onTextareaScroll: (e: Event) => void;
    private readonly _onTextareaInput: (e: Event) => void;

    private copyTimeoutId?: number;

    constructor(element: HTMLDivElement) {
        this.element = element;

        this.select = element.querySelector<HTMLSelectElement>('.code-lang-select');
        this.copyBtn = element.querySelector<HTMLButtonElement>('.code-action[aria-label="Copy code"]');
        this.downloadBtn = element.querySelector<HTMLButtonElement>('.code-action[aria-label="Download code"]');
        this.textarea = element.querySelector<HTMLTextAreaElement>('.code-textarea');

        this._onSelectChange = (e: Event) => {
            const lang = (e.target as HTMLSelectElement).value;
            this.element.setAttribute('data-language', lang);
            this.element.dispatchEvent(new CustomEvent('lyco:code-language-change', {detail: {language: lang}, bubbles: true}));
        };

        this._onCopyClick = async () => {
            const codeElement = this.element.querySelector('.code-body pre');
            if (codeElement && codeElement.textContent) {
                try {
                    await navigator.clipboard.writeText(codeElement.textContent);
                    if (this.copyBtn) {
                        this.copyBtn.classList.add('is-copied');
                        if (this.copyTimeoutId) window.clearTimeout(this.copyTimeoutId);
                        this.copyTimeoutId = window.setTimeout(() => {
                            if (this.copyBtn) this.copyBtn.classList.remove('is-copied');
                            this.copyTimeoutId = undefined;
                        }, 2000);
                    }
                } catch (e) {
                    console.error('Failed to copy', e);
                }
            }
        };

        this._onDownloadClick = () => {
            const codeElement = this.element.querySelector('.code-body pre');
            if (codeElement && codeElement.textContent) {
                const lang = this.element.getAttribute('data-language') || 'txt';
                const blob = new Blob([codeElement.textContent], {type: 'text/plain'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `snippet.${lang}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        };

        this._onTextareaScroll = () => {
            if (this.textarea) {
                const pre = this.element.querySelector<HTMLPreElement>('.code-highlight pre');
                if (pre) {
                    pre.scrollTop = this.textarea.scrollTop;
                    pre.scrollLeft = this.textarea.scrollLeft;
                }
            }
        };
        this._onTextareaInput = () => {
            if (!this.textarea) return;
            const pre = this.element.querySelector<HTMLPreElement>('.code-highlight pre, .code-body pre');
            if (pre) pre.textContent = this.textarea.value;
            this.element.dispatchEvent(new CustomEvent('lyco:code-change', {detail: {code: this.textarea.value}, bubbles: true}));
        };

        if (this.select) this.select.addEventListener('change', this._onSelectChange);
        if (this.copyBtn) this.copyBtn.addEventListener('click', this._onCopyClick);
        if (this.downloadBtn) this.downloadBtn.addEventListener('click', this._onDownloadClick);
        if (this.textarea) this.textarea.addEventListener('scroll', this._onTextareaScroll);
        if (this.textarea) this.textarea.addEventListener('input', this._onTextareaInput);
    }

    public destroy(): void {
        if (this.copyTimeoutId) window.clearTimeout(this.copyTimeoutId);
        if (this.select) this.select.removeEventListener('change', this._onSelectChange);
        if (this.copyBtn) this.copyBtn.removeEventListener('click', this._onCopyClick);
        if (this.downloadBtn) this.downloadBtn.removeEventListener('click', this._onDownloadClick);
        if (this.textarea) this.textarea.removeEventListener('scroll', this._onTextareaScroll);
        if (this.textarea) this.textarea.removeEventListener('input', this._onTextareaInput);
        delete this.element.dataset.lycoInitialized;
    }
}

