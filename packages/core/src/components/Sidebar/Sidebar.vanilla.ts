export function initLycoSidebars(): void {
    const sidebars = document.querySelectorAll<HTMLElement>('.sidebar:not([data-lyco-initialized])');
    sidebars.forEach(sidebar => {
        if (!sidebar.dataset.lycoInitialized) {
            new LycoSidebarController(sidebar);
            sidebar.dataset.lycoInitialized = 'true';
        }
    });
}

export class LycoSidebarController {
    private readonly sidebar: HTMLElement;
    private readonly resizer: HTMLElement | null;
    private readonly dropdowns: NodeListOf<HTMLElement>;

    private readonly _onMouseDown: (e: MouseEvent) => void;
    private readonly _onMouseMove: (e: MouseEvent) => void;
    private readonly _onMouseUp: (e: MouseEvent) => void;
    private readonly _dropdownListeners: { el: HTMLElement, triggerEl?: HTMLElement, click?: (e: MouseEvent) => void, mouseenter?: () => void }[] = [];

    private startX: number = 0;
    private startWidth: number = 0;

    constructor(sidebar: HTMLElement) {
        this.sidebar = sidebar;
        this.resizer = sidebar.querySelector<HTMLElement>('.sidebar__resizer');
        this.dropdowns = sidebar.querySelectorAll<HTMLElement>('.sidebar__dropdown');

        this._onMouseMove = (e: MouseEvent) => {
            const newWidth = this.startWidth + (e.clientX - this.startX);
            if (newWidth >= 200 && newWidth <= 500) {
                this.sidebar.style.setProperty('--sidebar-width', `${newWidth}px`);
            }
        };

        this._onMouseUp = () => {
            this.sidebar.classList.remove('sidebar-resizing');
            document.removeEventListener('mousemove', this._onMouseMove);
            document.removeEventListener('mouseup', this._onMouseUp);
        };

        this._onMouseDown = (e: MouseEvent) => {
            if (this.sidebar.classList.contains('is-mini')) return;

            this.sidebar.classList.add('sidebar-resizing');
            this.startX = e.clientX;
            this.startWidth = this.sidebar.offsetWidth;

            document.addEventListener('mousemove', this._onMouseMove);
            document.addEventListener('mouseup', this._onMouseUp);
        };

        if (this.resizer) {
            this.resizer.addEventListener('mousedown', this._onMouseDown);
        }

        this.dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector<HTMLElement>('.sidebar__dropdown-trigger');
            const menu = dropdown.querySelector<HTMLElement>('.sidebar__dropdown-menu-wrapper');

            const listeners: any = {el: dropdown};

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
                const onMouseEnter = () => {
                    if (this.sidebar.classList.contains('is-mini')) {
                        const rect = trigger.getBoundingClientRect();
                        menu.style.position = 'fixed';
                        menu.style.top = `${rect.top}px`;
                        menu.style.left = `${rect.right}px`;
                        menu.style.width = '12rem';
                        menu.style.marginTop = '0';
                        menu.style.marginLeft = 'var(--spacing-2)';
                    } else {
                        menu.style.position = '';
                        menu.style.top = '';
                        menu.style.left = '';
                        menu.style.width = '';
                        menu.style.marginTop = '';
                        menu.style.marginLeft = '';
                    }
                };
                dropdown.addEventListener('mouseenter', onMouseEnter);
                listeners.mouseenter = onMouseEnter;
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

        this._dropdownListeners.forEach(({el, triggerEl, click, mouseenter}) => {
            if (triggerEl && click) triggerEl.removeEventListener('click', click);
            if (mouseenter) el.removeEventListener('mouseenter', mouseenter);
        });

        delete this.sidebar.dataset.lycoInitialized;
    }
}
