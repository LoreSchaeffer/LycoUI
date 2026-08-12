export function initLycoModals() {
    // 1. Initialize modals based on their own elements if they want programatic access later
    const modals = document.querySelectorAll<HTMLElement>('.modal');
    modals.forEach(modal => {
        if (!modal.dataset.lycoInitialized) {
            new LycoModalController(modal);
            // We do NOT set dataset.lycoInitialized here, because we want it on the controller mapping
            // Actually, for simplicity we attach the controller to the DOM element
            (modal as any).lycoModal = new LycoModalController(modal);
            modal.dataset.lycoInitialized = 'true';
        }
    });

    // 2. Bind toggle buttons
    const toggles = document.querySelectorAll<HTMLElement>('[data-lyco-toggle="modal"]');
    toggles.forEach(toggle => {
        if (toggle.dataset.lycoToggleInitialized) return;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSelector = toggle.getAttribute('data-lyco-target');
            if (!targetSelector) return;

            const targetModal = document.querySelector<HTMLElement>(targetSelector);
            if (targetModal) {
                let controller = (targetModal as any).lycoModal as LycoModalController;
                if (!controller) {
                    controller = new LycoModalController(targetModal);
                    (targetModal as any).lycoModal = controller;
                    targetModal.dataset.lycoInitialized = 'true';
                }
                controller.show();
            }
        });
        toggle.dataset.lycoToggleInitialized = 'true';
    });
}

export class LycoModalController {
    private readonly modal: HTMLElement;
    private readonly dialog: HTMLElement | null;
    private isOpen: boolean = false;
    private previouslyFocusedElement: HTMLElement | null = null;
    
    private readonly _onKeyDown: (e: KeyboardEvent) => void;
    private readonly _onBackdropClick: (e: MouseEvent) => void;
    private readonly _onCloseClick: (e: MouseEvent) => void;

    constructor(modalElement: HTMLElement) {
        this.modal = modalElement;
        this.dialog = this.modal.querySelector('.modal__dialog');
        
        this._onKeyDown = (e: KeyboardEvent) => this.handleKeyDown(e);
        this._onBackdropClick = (e: MouseEvent) => this.handleBackdropClick(e);
        this._onCloseClick = (e: MouseEvent) => {
            e.preventDefault();
            this.hide();
        };

        // Initialize state based on DOM
        if (this.modal.style.display !== 'none' && !this.modal.classList.contains('hidden')) {
            // We assume it starts hidden in vanilla by having `style="display: none;"` or `hidden` attribute
            this.modal.style.display = 'none';
        }
        
        this.bindEvents();
    }

    private bindEvents(): void {
        this.modal.addEventListener('click', this._onBackdropClick);
        
        const closeButtons = this.modal.querySelectorAll('[data-lyco-dismiss="modal"]');
        closeButtons.forEach(btn => btn.addEventListener('click', this._onCloseClick as EventListener));
    }

    public destroy(): void {
        this.modal.removeEventListener('click', this._onBackdropClick);
        const closeButtons = this.modal.querySelectorAll('[data-lyco-dismiss="modal"]');
        closeButtons.forEach(btn => btn.removeEventListener('click', this._onCloseClick as EventListener));
        
        if (this.isOpen) {
            this.hide();
        }
        delete this.modal.dataset.lycoInitialized;
        delete (this.modal as any).lycoModal;
    }

    public show(): void {
        if (this.isOpen) return;
        this.isOpen = true;
        this.previouslyFocusedElement = document.activeElement as HTMLElement;

        this.modal.style.display = 'flex'; // It's display flex in SCSS
        this.modal.classList.remove('hidden');
        this.modal.removeAttribute('aria-hidden');
        this.modal.setAttribute('aria-modal', 'true');
        
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', this._onKeyDown);

        // Reset animation by triggering reflow
        void this.modal.offsetWidth;

        // Ensure focus
        setTimeout(() => {
            if (this.dialog) {
                const focusableElements = this.dialog.querySelectorAll(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                ) as NodeListOf<HTMLElement>;
                
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                } else {
                    this.dialog.focus();
                }
            }
        }, 50); // slight delay for animation frame
    }

    public hide(): void {
        if (!this.isOpen) return;
        this.isOpen = false;

        this.modal.style.display = 'none';
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.removeAttribute('aria-modal');

        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', this._onKeyDown);

        if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
            this.previouslyFocusedElement = null;
        }
    }

    private handleBackdropClick(e: MouseEvent): void {
        if (e.target === this.modal) {
            this.hide();
        }
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (e.key === 'Escape') {
            this.hide();
        }
        
        if (e.key === 'Tab' && this.dialog) {
            const focusableElements = this.dialog.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ) as NodeListOf<HTMLElement>;

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement || document.activeElement === this.dialog) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
}
