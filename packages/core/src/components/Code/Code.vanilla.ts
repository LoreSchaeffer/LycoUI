export function initLycoCodes(): void {
  const codes = document.querySelectorAll<HTMLDivElement>('.lyco-code:not([data-lyco-initialized])');
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

  constructor(element: HTMLDivElement) {
    this.element = element;
    
    this.select = element.querySelector<HTMLSelectElement>('.lyco-code__lang-select');
    this.copyBtn = element.querySelector<HTMLButtonElement>('.lyco-code__action[aria-label="Copy code"]');
    this.downloadBtn = element.querySelector<HTMLButtonElement>('.lyco-code__action[aria-label="Download code"]');
    this.textarea = element.querySelector<HTMLTextAreaElement>('.lyco-code__textarea');

    this._onSelectChange = (e: Event) => {
      const lang = (e.target as HTMLSelectElement).value;
      this.element.setAttribute('data-language', lang);
    };

    this._onCopyClick = async () => {
      const codeElement = this.element.querySelector('.lyco-code__body pre');
      if (codeElement && codeElement.textContent) {
        try {
          await navigator.clipboard.writeText(codeElement.textContent);
          if (this.copyBtn) {
            this.copyBtn.classList.add('is-copied');
            setTimeout(() => {
              if (this.copyBtn) this.copyBtn.classList.remove('is-copied');
            }, 2000);
          }
        } catch (e) {
          console.error('Failed to copy', e);
        }
      }
    };

    this._onDownloadClick = () => {
      const codeElement = this.element.querySelector('.lyco-code__body pre');
      if (codeElement && codeElement.textContent) {
        const lang = this.element.getAttribute('data-language') || 'txt';
        const blob = new Blob([codeElement.textContent], { type: 'text/plain' });
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
        const pre = this.element.querySelector<HTMLPreElement>('.lyco-code__highlight pre');
        if (pre) {
          pre.scrollTop = this.textarea.scrollTop;
          pre.scrollLeft = this.textarea.scrollLeft;
        }
      }
    };

    if (this.select) this.select.addEventListener('change', this._onSelectChange);
    if (this.copyBtn) this.copyBtn.addEventListener('click', this._onCopyClick);
    if (this.downloadBtn) this.downloadBtn.addEventListener('click', this._onDownloadClick);
    if (this.textarea) this.textarea.addEventListener('scroll', this._onTextareaScroll);
  }

  public destroy(): void {
    if (this.select) this.select.removeEventListener('change', this._onSelectChange);
    if (this.copyBtn) this.copyBtn.removeEventListener('click', this._onCopyClick);
    if (this.downloadBtn) this.downloadBtn.removeEventListener('click', this._onDownloadClick);
    if (this.textarea) this.textarea.removeEventListener('scroll', this._onTextareaScroll);
    delete this.element.dataset.lycoInitialized;
  }
}
