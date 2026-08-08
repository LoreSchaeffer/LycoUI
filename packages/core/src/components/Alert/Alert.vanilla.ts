export function initLycoAlerts(): void {
    const alerts = document.querySelectorAll<HTMLDivElement>('.alert:not([data-lyco-initialized])');
    alerts.forEach(alert => {
        const durationAttr = alert.getAttribute('data-duration');
        const hasCloseBtn = alert.querySelector('.alert__close') !== null;
        
        if (durationAttr || hasCloseBtn) {
            new LycoAlertController(alert);
            alert.dataset.lycoInitialized = 'true';
        }
    });
}

class LycoAlertController {
    private readonly element: HTMLDivElement;
    private timerId?: number;
    private readonly closeBtn: HTMLButtonElement | null;
    private readonly _onCloseClick: () => void;

    constructor(element: HTMLDivElement) {
        this.element = element;
        this.closeBtn = element.querySelector<HTMLButtonElement>('.alert__close');
        
        this._onCloseClick = () => this.close();

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this._onCloseClick);
        }

        const durationStr = element.getAttribute('data-duration');
        if (durationStr) {
            const duration = parseFloat(durationStr);
            if (!isNaN(duration) && duration > 0) {
                this.startTimer(duration);
            }
        }
    }

    private startTimer(durationSeconds: number): void {
        // If the HTML doesn't have the progress bar, inject it automatically for vanilla users
        let progress = this.element.querySelector<HTMLDivElement>('.alert__progress');
        if (!progress) {
            progress = document.createElement('div');
            progress.className = 'alert__progress';
            progress.style.animationDuration = `${durationSeconds}s`;
            this.element.appendChild(progress);
        }

        this.timerId = window.setTimeout(() => {
            this.close();
        }, durationSeconds * 1000);
    }

    public destroy(): void {
        if (this.timerId) {
            window.clearTimeout(this.timerId);
        }
        if (this.closeBtn) {
            this.closeBtn.removeEventListener('click', this._onCloseClick);
        }
        delete this.element.dataset.lycoInitialized;
    }

    public close(): void {
        this.destroy();
        // Remove from DOM safely
        this.element.remove();
    }
}
