import {FOCUSABLE_ELEMENTS_SELECTOR, trapFocus} from '../../utils/keyboard';

/** Extends HTMLElement to include the attached controller reference. */
interface LycoModalElement extends HTMLElement {
    lycoModal?: LycoModalController;
}

export function initLycoModals() {
    const modals = document.querySelectorAll<HTMLElement>('.modal:not([data-lyco-initialized])');
    modals.forEach(modal => {
        if (!modal.dataset.lycoInitialized) {
            new LycoModalController(modal);
            (modal as LycoModalElement).lycoModal = new LycoModalController(modal);
            modal.dataset.lycoInitialized = 'true';
        }
    });

    const toggles = document.querySelectorAll<HTMLElement>('[data-lyco-toggle="modal"]');
    toggles.forEach(toggle => {
        if (toggle.dataset.lycoToggleInitialized) return;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSelector = toggle.getAttribute('data-lyco-target');
            if (!targetSelector) return;

            const targetModal = document.querySelector<HTMLElement>(targetSelector);
            if (targetModal) {
                let controller = (targetModal as LycoModalElement).lycoModal;
                if (!controller) {
                    controller = new LycoModalController(targetModal);
                    (targetModal as LycoModalElement).lycoModal = controller;
                    targetModal.dataset.lycoInitialized = 'true';
                }
                controller.show();
            }
        });
        toggle.dataset.lycoToggleInitialized = 'true';
    });
}

/**
 * Controller for the Vanilla JS LycoModal component.
 */
export class LycoModalController {
    private readonly modal: HTMLElement;
    private readonly dialog: HTMLElement | null;
    private isOpen: boolean = false;
    private previouslyFocusedElement: HTMLElement | null = null;
    private focusTimeoutId?: number;

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

        if (this.modal.style.display !== 'none' && !this.modal.classList.contains('hidden')) {
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
        if (this.focusTimeoutId) window.clearTimeout(this.focusTimeoutId);
        this.modal.removeEventListener('click', this._onBackdropClick);
        const closeButtons = this.modal.querySelectorAll('[data-lyco-dismiss="modal"]');
        closeButtons.forEach(btn => btn.removeEventListener('click', this._onCloseClick as EventListener));

        if (this.isOpen) {
            this.hide();
        }
        delete this.modal.dataset.lycoInitialized;
        delete (this.modal as LycoModalElement).lycoModal;
    }

    public show(): void {
        if (this.isOpen) return;
        this.isOpen = true;
        this.previouslyFocusedElement = document.activeElement as HTMLElement;

        this.modal.style.display = 'flex';
        this.modal.classList.remove('hidden');
        this.modal.removeAttribute('aria-hidden');
        this.modal.setAttribute('aria-modal', 'true');

        document.body.classList.add('modal-open');
        document.addEventListener('keydown', this._onKeyDown);

        void this.modal.offsetWidth;

        if (this.focusTimeoutId) window.clearTimeout(this.focusTimeoutId);
        this.focusTimeoutId = window.setTimeout(() => {
            if (this.dialog) {
                const autoFocusElement = this.dialog.querySelector('[autofocus]') as HTMLElement;
                if (autoFocusElement) {
                    autoFocusElement.focus();
                    return;
                }

                const focusableElements = this.dialog.querySelectorAll(
                    FOCUSABLE_ELEMENTS_SELECTOR
                ) as NodeListOf<HTMLElement>;

                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                } else {
                    this.dialog.focus();
                }
            }
        }, 50);
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
        const closeOnOverlayClick = this.modal.getAttribute('data-lyco-close-on-overlay-click') !== 'false';
        if (closeOnOverlayClick && e.target === this.modal) {
            this.hide();
        }
    }

    private handleKeyDown(e: KeyboardEvent): void {
        const closeOnEscape = this.modal.getAttribute('data-lyco-close-on-escape') !== 'false';
        if (closeOnEscape && e.key === 'Escape') {
            this.hide();
        }

        if (this.dialog) {
            trapFocus(e, this.dialog);
        }
    }
}

