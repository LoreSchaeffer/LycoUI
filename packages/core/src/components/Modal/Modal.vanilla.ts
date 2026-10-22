import {openModalLayer} from '../../interaction/modal-layer';
import {trapFocus} from '../../interaction/focus-scope';
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
    private disposeLayer?: () => void;

    private readonly _onKeyDown: (e: KeyboardEvent) => void;
    private readonly _onBackdropClick: (e: MouseEvent) => void;
    private readonly _onCloseClick: (e: MouseEvent) => void;

    constructor(modalElement: HTMLElement) {
        super();
        this.modal = modalElement;
        this.dialog = this.modal.querySelector('.modal-dialog');
        this.modal.setAttribute('role', this.modal.getAttribute('role') || 'dialog');
        this.modal.setAttribute('aria-modal', 'true');

        this._onKeyDown = (e: KeyboardEvent) => this.handleKeyDown(e);
        this._onBackdropClick = (e: MouseEvent) => this.handleBackdropClick(e);
        this._onCloseClick = (e: MouseEvent) => {
            e.preventDefault();
            const target = e.currentTarget as HTMLElement;
            if (!target.matches('button, a, input, select, textarea, summary') && e.target !== target) return;
            this.hide();
        };

        if (this.modal.style.display !== 'none' && !this.modal.classList.contains('hidden')) {
            this.modal.style.display = 'none';
        }

        this.bindEvents();
    }

    private bindEvents(): void {
        this.listen(this.modal, 'click', this._onBackdropClick as EventListener);
        this.listen(this.modal, 'keydown', this._onKeyDown as EventListener);

        const closeButtons = this.modal.querySelectorAll('[data-lyco-dismiss="modal"]');
        closeButtons.forEach(btn => this.listen(btn, 'click', this._onCloseClick as EventListener));
    }

    public override destroy(): void {
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
        const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
        this.disposeLayer = openModalLayer({
            root: this.modal,
            initialFocus: this.dialog ?? undefined,
            returnFocus,
            onOpen: () => {
                this.modal.style.display = 'flex';
                this.modal.classList.remove('hidden');
                this.modal.removeAttribute('aria-hidden');
                this.modal.setAttribute('aria-modal', 'true');
                document.body.classList.add('modal-open');
            },
            onClose: () => {
                this.modal.style.display = 'none';
                this.modal.setAttribute('aria-hidden', 'true');
                this.modal.setAttribute('aria-modal', 'true');
                document.body.classList.remove('modal-open');
            }
        });
    }

    public hide(): void {
        if (!this.isOpen) return;
        this.isOpen = false;

        this.disposeLayer?.();
        this.disposeLayer = undefined;
    }

    private handleBackdropClick(e: MouseEvent): void {
        const closeOnOverlayClick = this.modal.getAttribute('data-lyco-close-on-overlay-click') !== 'false';
        if (closeOnOverlayClick && e.target === this.modal) {
            this.hide();
        }
    }

    private handleKeyDown(e: KeyboardEvent): void {
        const closeOnEscape = this.modal.getAttribute('data-lyco-close-on-escape') !== 'false';
        if (!this.isOpen) return;
        if (closeOnEscape && e.key === 'Escape') {
            this.hide();
        }

        if (this.dialog) {
            trapFocus(e, this.dialog);
        }
    }
}


