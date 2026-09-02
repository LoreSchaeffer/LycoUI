export function initLycoFileUploads(): void {
    const dropzones = document.querySelectorAll<HTMLLabelElement>('label.fileupload:not([data-lyco-initialized])');
    dropzones.forEach(dropzone => {
        if (!dropzone.dataset.lycoInitialized) {
            new LycoFileUploadController(dropzone);
            dropzone.dataset.lycoInitialized = 'true';
        }
    });
}

export class LycoFileUploadController {
    private readonly container: HTMLLabelElement;
    private readonly input: HTMLInputElement | null;
    private isDragActive = false;

    private readonly _onDragEnter: (e: DragEvent) => void;
    private readonly _onDragLeave: (e: DragEvent) => void;
    private readonly _onDragOver: (e: DragEvent) => void;
    private readonly _onDrop: (e: DragEvent) => void;
    private readonly _onKeyDown: (e: KeyboardEvent) => void;

    constructor(container: HTMLLabelElement) {
        this.container = container;
        this.input = container.querySelector<HTMLInputElement>('input[type="file"]');

        this._onDragEnter = (e) => this.handleDragEnter(e);
        this._onDragLeave = (e) => this.handleDragLeave(e);
        this._onDragOver = (e) => this.handleDragOver(e);
        this._onDrop = (e) => this.handleDrop(e);
        this._onKeyDown = (e) => this.handleKeyDown(e);

        this.bindEvents();
    }

    private bindEvents(): void {
        this.container.addEventListener('dragenter', this._onDragEnter);
        this.container.addEventListener('dragleave', this._onDragLeave);
        this.container.addEventListener('dragover', this._onDragOver);
        this.container.addEventListener('drop', this._onDrop);
        this.container.addEventListener('keydown', this._onKeyDown);
    }

    private handleDragEnter(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();
        if (this.isDisabled()) return;
        this.setDragActive(true);
    }

    private handleDragLeave(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();
        if (this.isDisabled()) return;
        
        // Prevent flickering when dragging over child elements
        if (this.container.contains(e.relatedTarget as Node)) {
            return;
        }
        this.setDragActive(false);
    }

    private handleDragOver(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();
        if (this.isDisabled()) return;
        if (!this.isDragActive) {
            this.setDragActive(true);
        }
    }

    private handleDrop(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();
        if (this.isDisabled()) return;
        this.setDragActive(false);

        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            if (this.input) {
                const filesArray = Array.from(e.dataTransfer.files);
                const isMultiple = this.input.multiple;
                const selectedFiles = isMultiple ? filesArray : [filesArray[0]];
                
                try {
                    const dt = new DataTransfer();
                    selectedFiles.forEach(file => dt.items.add(file));
                    this.input.files = dt.files;
                    this.input.dispatchEvent(new Event('change', { bubbles: true }));
                } catch (err) {
                    // Ignore, fallback for browsers that don't support DataTransfer constructor
                }
            }
            
            // Dispatch a custom event on the container for vanilla users to hook into
            const dropEvent = new CustomEvent('lyco:drop', {
                detail: { files: e.dataTransfer.files },
                bubbles: true
            });
            this.container.dispatchEvent(dropEvent);
        }
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (this.isDisabled()) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.input?.click();
        }
    }

    private isDisabled(): boolean {
        return this.container.classList.contains('is-disabled') || (this.input?.disabled ?? false);
    }

    private setDragActive(active: boolean): void {
        this.isDragActive = active;
        if (active) {
            this.container.classList.add('is-drag-active');
        } else {
            this.container.classList.remove('is-drag-active');
        }
    }

    public destroy(): void {
        this.container.removeEventListener('dragenter', this._onDragEnter);
        this.container.removeEventListener('dragleave', this._onDragLeave);
        this.container.removeEventListener('dragover', this._onDragOver);
        this.container.removeEventListener('drop', this._onDrop);
        this.container.removeEventListener('keydown', this._onKeyDown);
        delete this.container.dataset.lycoInitialized;
    }
}
