export function initLycoAlerts(): void {
    const alerts = document.querySelectorAll<HTMLDivElement>('.alert:not([data-lyco-initialized])');
    alerts.forEach(alert => {
        const durationAttr = alert.getAttribute('data-duration');
        const hasCloseBtn = alert.querySelector('.alert-close') !== null;

        if (durationAttr || hasCloseBtn) {
            new LycoAlertController(alert);
            alert.dataset.lycoInitialized = 'true';
        }
    });
}

class LycoAlertController {
    private readonly element: HTMLDivElement;
    private dismiss?: TimedDismiss;
    private readonly closeBtn: HTMLButtonElement | null;
    private readonly _onCloseClick: () => void;

    constructor(element: HTMLDivElement) {
        this.element = element;
        this.closeBtn = element.querySelector<HTMLButtonElement>('.alert-close');

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
        let progress = this.element.querySelector<HTMLDivElement>('.alert-progress');
        if (!progress) {
            progress = document.createElement('div');
            progress.className = 'alert-progress';
            progress.style.animationDuration = `${durationSeconds}s`;
            this.element.appendChild(progress);
        }

        this.dismiss = new TimedDismiss(durationSeconds * 1000, () => this.close());
        this.dismiss.start();
    }

    public destroy(): void {
        this.dismiss?.destroy();
        this.dismiss = undefined;
        if (this.closeBtn) {
            this.closeBtn.removeEventListener('click', this._onCloseClick);
        }
        delete this.element.dataset.lycoInitialized;
    }

    public close(): void {
        this.destroy();
        this.element.remove();
    }
}
import {TimedDismiss} from '../../interaction/timed-dismiss';


