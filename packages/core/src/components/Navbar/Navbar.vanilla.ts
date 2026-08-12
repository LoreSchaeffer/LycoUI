export function initLycoNavbars(): void {
    const navbars = document.querySelectorAll<HTMLElement>('.navbar');
    navbars.forEach(navbar => {
        if (!navbar.dataset.lycoInitialized) {
            new LycoNavbarController(navbar);
            navbar.dataset.lycoInitialized = 'true';
        }
    });
}

export class LycoNavbarController {
    private readonly navbar: HTMLElement;
    private readonly toggles: NodeListOf<HTMLButtonElement>;
    private readonly collapses: NodeListOf<HTMLElement>;
    private readonly links: NodeListOf<HTMLAnchorElement>;
    private readonly _onClickMap = new Map<HTMLButtonElement, () => void>();
    private readonly _onDocumentClick: (e: MouseEvent) => void;
    private readonly _onLinkClick: (e: MouseEvent) => void;

    constructor(navbar: HTMLElement) {
        this.navbar = navbar;
        
        // Find toggles inside this navbar
        this.toggles = navbar.querySelectorAll<HTMLButtonElement>('.navbar__toggle');
        this.collapses = navbar.querySelectorAll<HTMLElement>('.navbar__collapse');

        this.toggles.forEach(toggle => {
            const onClick = () => this.handleToggle(toggle);
            this._onClickMap.set(toggle, onClick);
            toggle.addEventListener('click', onClick);
        });

        this.links = navbar.querySelectorAll<HTMLAnchorElement>('.navbar__link');
        
        this._onDocumentClick = (e: MouseEvent) => {
            if (!this.navbar.contains(e.target as Node)) {
                this.closeAll();
            }
        };
        document.addEventListener('mousedown', this._onDocumentClick);

        this._onLinkClick = () => {
            this.closeAll();
        };
        this.links.forEach(link => {
            link.addEventListener('click', this._onLinkClick);
        });
    }

    private handleToggle(toggle: HTMLButtonElement): void {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        const nextState = !isExpanded;
        
        // Update aria-expanded on toggle
        toggle.setAttribute('aria-expanded', String(nextState));

        // Find associated collapse (if aria-controls is set) or just toggle all collapses in this navbar
        const controlsId = toggle.getAttribute('aria-controls');
        if (controlsId) {
            const target = document.getElementById(controlsId);
            if (target && target.classList.contains('navbar__collapse')) {
                this.toggleCollapse(target, nextState);
                return;
            }
        }
        
        // Fallback: toggle all collapses in this navbar
        this.collapses.forEach(collapse => this.toggleCollapse(collapse, nextState));
    }

    private toggleCollapse(collapse: HTMLElement, isOpen: boolean): void {
        if (isOpen) {
            collapse.classList.add('is-open');
        } else {
            collapse.classList.remove('is-open');
        }
    }

    private closeAll(): void {
        this.toggles.forEach(t => {
            if (t.getAttribute('aria-expanded') === 'true') {
                t.setAttribute('aria-expanded', 'false');
            }
        });
        this.collapses.forEach(c => c.classList.remove('is-open'));
    }

    public destroy(): void {
        this.toggles.forEach(toggle => {
            const onClick = this._onClickMap.get(toggle);
            if (onClick) {
                toggle.removeEventListener('click', onClick);
            }
        });
        this._onClickMap.clear();
        
        document.removeEventListener('mousedown', this._onDocumentClick);
        this.links.forEach(link => link.removeEventListener('click', this._onLinkClick));
        
        delete this.navbar.dataset.lycoInitialized;
    }
}
