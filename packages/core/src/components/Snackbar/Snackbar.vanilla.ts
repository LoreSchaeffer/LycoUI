export type SnackbarDurationVanilla = 'short' | 'medium' | 'long' | number;

export interface VanillaSnackbarOptions {
    message: string | HTMLElement;
    variant?: string;
    icon?: string | HTMLElement;
    closable?: boolean;
    duration?: SnackbarDurationVanilla;
    isFlat?: boolean;
}

const DURATION_MAP: Record<string, number> = {
    short: 3000,
    medium: 5000,
    long: 8000,
};

function parseSafeSvg(svgString: string): SVGSVGElement | null {
    const template = document.createElement('template');
    template.innerHTML = svgString;
    const svg = template.content.querySelector('svg');
    if (!svg) return null;
    
    svg.querySelectorAll('script').forEach(s => s.remove());
    Array.from(svg.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) svg.removeAttribute(attr.name);
    });
    return svg;
}

class LycoSnackbarManager {
    private stackContainer: HTMLDivElement | null = null;
    private snackbarCount = 0;

    private ensureStackContainer(): HTMLDivElement {
        if (!this.stackContainer) {
            this.stackContainer = document.createElement('div');
            this.stackContainer.className = 'snackbar-stack';
            this.stackContainer.setAttribute('aria-live', 'polite');
            document.body.appendChild(this.stackContainer);
        }
        return this.stackContainer;
    }

    public show(options: VanillaSnackbarOptions): string {
        const stack = this.ensureStackContainer();
        const id = `snackbar-${++this.snackbarCount}`;
        
        const snackbar = document.createElement('div');
        snackbar.className = `snackbar snackbar--${options.variant || 'neutral'}`;
        if (options.closable) snackbar.classList.add('snackbar--closable');
        if (options.icon) snackbar.classList.add('has-icon');
        if (options.isFlat) snackbar.classList.add('snackbar--flat');
        snackbar.setAttribute('role', 'status');
        snackbar.id = id;

        if (options.icon) {
            const iconSpan = document.createElement('span');
            iconSpan.className = 'snackbar__icon';
            if (typeof options.icon === 'string') {
                const safeSvg = parseSafeSvg(options.icon);
                if (safeSvg) {
                    iconSpan.appendChild(safeSvg);
                } else {
                    iconSpan.textContent = options.icon;
                }
            } else {
                iconSpan.appendChild(options.icon);
            }
            snackbar.appendChild(iconSpan);
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'snackbar__content';
        if (typeof options.message === 'string') {
            contentDiv.textContent = options.message;
        } else {
            contentDiv.appendChild(options.message);
        }
        snackbar.appendChild(contentDiv);

        let closeBtn: HTMLButtonElement | null = null;
        let timerId: number | undefined;

        const closeHandler = () => {
            if (timerId) window.clearTimeout(timerId);
            if (closeBtn) closeBtn.removeEventListener('click', closeHandler);
            
            snackbar.classList.add('is-exiting');
            window.setTimeout(() => {
                snackbar.remove();
                if (stack.children.length === 0) {
                    stack.remove();
                    this.stackContainer = null;
                }
            }, 300); // Wait for exit animation
        };

        if (options.closable) {
            closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'snackbar__close';
            closeBtn.setAttribute('aria-label', 'Close');
            closeBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
            closeBtn.addEventListener('click', closeHandler);
            snackbar.appendChild(closeBtn);
        }

        stack.appendChild(snackbar);

        const durationType = options.duration || 'short';
        const durationMs = typeof durationType === 'number' ? durationType * 1000 : (DURATION_MAP[durationType] || DURATION_MAP.short);

        timerId = window.setTimeout(() => {
            closeHandler();
        }, durationMs);

        return id;
    }
}

export const snackbar = new LycoSnackbarManager();
