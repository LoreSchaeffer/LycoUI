import {FOCUSABLE_ELEMENTS_SELECTOR, trapFocus} from '../../utils/keyboard';
import {BaseController} from '../../vanilla/BaseController';
import {controllerRegistry} from '../../vanilla/controller-registry';

/** Extends HTMLElement to include the attached controller reference. */
interface LycoModalElement extends HTMLElement {
    lycoModal?: LycoModalController;
}

export function initLycoModals(root: ParentNode = document): void {
    const modals = root.querySelectorAll<HTMLElement>('.modal');
    modals.forEach(modal => {
        if (!controllerRegistry.get(modal, 'modal')) {
            const controller = new LycoModalController(modal);
            (modal as LycoModalElement).lycoModal = controller;
            controllerRegistry.register(modal, 'modal', controller);
            modal.dataset.lycoInitialized = 'true';
        }
    });

    const toggles = root.querySelectorAll<HTMLElement>('[data-lyco-toggle="modal"]');
    toggles.forEach(toggle => {
        if (controllerRegistry.get(toggle, 'modal-trigger')) return;
        const trigger = new BaseController();
        trigger.listen(toggle, 'click', ((e: Event) => {
            e.preventDefault();
            const targetSelector = toggle.getAttribute('data-lyco-target');
            if (!targetSelector) return;

            const targetModal = document.querySelector<HTMLElement>(targetSelector);
            if (targetModal) {
                let controller = (targetModal as LycoModalElement).lycoModal;
                if (!controller) {
                    controller = new LycoModalController(targetModal);
                    (targetModal as LycoModalElement).lycoModal = controller;
                    controllerRegistry.register(targetModal, 'modal', controller);
                    targetModal.dataset.lycoInitialized = 'true';
                }
                controller.show();
            }
        }) as EventListener);
        controllerRegistry.register(toggle, 'modal-trigger', trigger);
        toggle.dataset.lycoToggleInitialized = 'true';
    });
}

/**
 * Controller for the Vanilla JS LycoModal component.
 */
export class LycoModalController extends BaseController {
    private readonly modal: HTMLElement;
    private readonly dialog: HTMLElement | null;
    private isOpen: boolean = false;
    private previouslyFocusedElement: HTMLElement | null = null;
    private focusTimeoutId?: number;

    private readonly _onKeyDown: (e: KeyboardEvent) => void;
    private readonly _onBackdropClick: (e: MouseEvent) => void;
    private readonly _onCloseClick: (e: MouseEvent) => void;

    constructor(modalElement: HTMLElement) {
        super();
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
        this.listen(this.modal, 'click', this._onBackdropClick as EventListener);

        const closeButtons = this.modal.querySelectorAll('[data-lyco-dismiss="modal"]');
        closeButtons.forEach(btn => this.listen(btn, 'click', this._onCloseClick as EventListener));
    }

    public override destroy(): void {
        if (this.focusTimeoutId) window.clearTimeout(this.focusTimeoutId);
        if (this.isOpen) {
            this.hide();
        }
        super.destroy();
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

