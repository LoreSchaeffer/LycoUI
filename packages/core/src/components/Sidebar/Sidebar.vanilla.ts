import {computeSideFlyoutPosition} from '../../utils/floating';
import {SidebarResizeController} from './SidebarResizeController';

export function initLycoSidebars(): void {
    const sidebars = document.querySelectorAll<HTMLElement>('.sidebar:not([data-lyco-initialized])');
    sidebars.forEach(sidebar => {
        if (!sidebar.dataset.lycoInitialized) {
            new LycoSidebarController(sidebar);
            sidebar.dataset.lycoInitialized = 'true';
        }
    });
}

interface DropdownListeners {
    el: HTMLElement;
    triggerEl?: HTMLElement;
    click?: (e: MouseEvent) => void;
    /** Repositions the mini-mode flyout; bound to `mouseenter` and `focusin`. */
    reposition?: () => void;
}

/**
 * Controller for the Vanilla JS LycoSidebar component.
 */
export class LycoSidebarController {
    private readonly sidebar: HTMLElement;
    private readonly resizer: HTMLElement | null;
    private readonly dropdowns: NodeListOf<HTMLElement>;

    private readonly _onMouseDown: (e: MouseEvent) => void;
    private readonly _onMouseMove: (e: MouseEvent) => void;
    private readonly _onMouseUp: (e: MouseEvent) => void;
    private readonly _dropdownListeners: DropdownListeners[] = [];

    private startWidth: number = 0;
    private readonly resizeController: SidebarResizeController;

    constructor(sidebar: HTMLElement) {
        this.sidebar = sidebar;
        this.resizer = sidebar.querySelector<HTMLElement>('.sidebar__resizer, .sidebar-resizer');
        this.dropdowns = sidebar.querySelectorAll<HTMLElement>('.sidebar__dropdown, .sidebar-dropdown');
        const defaultWidth = Number(this.sidebar.dataset.defaultWidth) || 256;
        const minWidth = Number(this.sidebar.dataset.minWidth) || 200;
        const maxWidth = Number(this.sidebar.dataset.maxWidth) || 400;
        this.resizeController = new SidebarResizeController({
            initialWidth: defaultWidth,
            minWidth,
            maxWidth,
            onChange: (width) => this.sidebar.style.setProperty('--sidebar-width', `${width}px`)
        });

        const datasetScale = this.sidebar.dataset.miniIconScale;
        if (datasetScale) {
            this.sidebar.style.setProperty('--sidebar-mini-icon-scale', datasetScale);
        }

        this._onMouseMove = (e: MouseEvent) => {
            this.resizeController.move(e.clientX);
        };

        this._onMouseUp = () => {
            this.resizeController.end();
            this.sidebar.classList.remove('sidebar-resizing');
            document.removeEventListener('mousemove', this._onMouseMove);
            document.removeEventListener('mouseup', this._onMouseUp);
        };

        this._onMouseDown = (e: MouseEvent) => {
            if (this.sidebar.classList.contains('is-mini')) return;

            this.sidebar.classList.add('sidebar-resizing');
            this.startWidth = this.sidebar.offsetWidth;
            this.resizeController.set(this.startWidth);
            this.resizeController.begin(e.clientX);

            document.addEventListener('mousemove', this._onMouseMove);
            document.addEventListener('mouseup', this._onMouseUp);
        };

        if (this.resizer) {
            this.resizer.addEventListener('mousedown', this._onMouseDown);
        }

        this.dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector<HTMLElement>('.sidebar__dropdown-trigger, .sidebar-dropdown-trigger');
            const menu = dropdown.querySelector<HTMLElement>('.sidebar__dropdown-menu-wrapper, .sidebar-dropdown-menu-wrapper');

            const listeners: DropdownListeners = {el: dropdown};

            if (trigger) {
                const onClick = (e: MouseEvent) => {
                    if (this.sidebar.classList.contains('is-mini')) return;
                    e.preventDefault();
                    dropdown.classList.toggle('is-open');
                    const isOpen = dropdown.classList.contains('is-open');
                    trigger.setAttribute('aria-expanded', String(isOpen));
                };
                trigger.addEventListener('click', onClick);
                listeners.triggerEl = trigger;
                listeners.click = onClick;
            }

            if (trigger && menu) {
                const updateFlyoutPosition = () => {
                    if (this.sidebar.classList.contains('is-mini')) {
                        const {top, left, maxHeight} = computeSideFlyoutPosition(trigger, menu);
                        menu.style.position = 'fixed';
                        menu.style.width = '12rem';
                        menu.style.margin = '0';
                        menu.style.top = top;
                        menu.style.left = left;
                        menu.style.maxHeight = maxHeight;
                    } else {
                        menu.style.position = '';
                        menu.style.width = '';
                        menu.style.margin = '';
                        menu.style.top = '';
                        menu.style.left = '';
                        menu.style.maxHeight = '';
                    }
                };
                dropdown.addEventListener('mouseenter', updateFlyoutPosition);
                dropdown.addEventListener('focusin', updateFlyoutPosition);
                listeners.reposition = updateFlyoutPosition;
            }

            this._dropdownListeners.push(listeners);
        });
    }

    public toggle(): void {
        this.sidebar.classList.toggle('is-open');
        const backdrop = this.sidebar.previousElementSibling;
        if (backdrop && backdrop.classList.contains('sidebar-backdrop')) {
            backdrop.classList.toggle('is-open');
        }
    }

    public toggleMini(): void {
        this.sidebar.classList.toggle('is-mini');
    }

    public destroy(): void {
        if (this.resizer) {
            this.resizer.removeEventListener('mousedown', this._onMouseDown);
        }
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
        this.resizeController.destroy();

        this._dropdownListeners.forEach(({el, triggerEl, click, reposition}) => {
            if (triggerEl && click) triggerEl.removeEventListener('click', click);
            if (reposition) {
                el.removeEventListener('mouseenter', reposition);
                el.removeEventListener('focusin', reposition);
            }
        });

        delete this.sidebar.dataset.lycoInitialized;
    }
}
