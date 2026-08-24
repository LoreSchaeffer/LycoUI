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
    
    private readonly _onMouseDown: (e: MouseEvent) => void;
    private readonly _onMouseMove: (e: MouseEvent) => void;
    private readonly _onMouseUp: (e: MouseEvent) => void;
    
    private startX: number = 0;
    private startWidth: number = 0;

    constructor(sidebar: HTMLElement) {
        this.sidebar = sidebar;
        this.resizer = sidebar.querySelector<HTMLElement>('.sidebar__resizer');
        
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
        delete this.sidebar.dataset.lycoInitialized;
    }
}
