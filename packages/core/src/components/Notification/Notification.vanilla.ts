import type {NotificationPosition} from '../../types/types';
import {NOTIFICATION_CLOSE_SVG, NOTIFICATION_SEMANTIC_SVG} from '../../utils/icons';
import {createSafeSvg} from '../../utils/safe-content';
import {durationToMilliseconds, TimedDismiss} from '../../interaction/timed-dismiss';

/**
 * VanillaNotificationDuration.
 */
export type VanillaNotificationDuration = 'short' | 'medium' | 'long' | number;

/**
 * VanillaNotificationOptions.
 */
export interface VanillaNotificationOptions {
    title?: string;
    message?: string | HTMLElement;
    variant?: string;
    icon?: string | HTMLElement | null;
    closable?: boolean;
    duration?: VanillaNotificationDuration;
    isFlat?: boolean;
}

class LycoNotificationManager {
    private stackContainers: Map<NotificationPosition, HTMLDivElement> = new Map();
    private position: NotificationPosition = 'bottom-right';
    private notificationCount = 0;
    private activeNotifications: Map<string, { el: HTMLDivElement, closeHandler: () => void, dismiss?: TimedDismiss, mouseEnter?: () => void, mouseLeave?: () => void, exitTimerId?: number }> = new Map();

    public destroy(): void {
        this.activeNotifications.forEach((data) => {
            data.dismiss?.destroy();
            if (data.exitTimerId) window.clearTimeout(data.exitTimerId);
            if (data.mouseEnter) data.el.removeEventListener('mouseenter', data.mouseEnter);
            if (data.mouseLeave) data.el.removeEventListener('mouseleave', data.mouseLeave);
            data.el.remove();
        });
        this.activeNotifications.clear();
        this.stackContainers.forEach(container => container.remove());
        this.stackContainers.clear();
    }

    /** Change the default position for future notifications. */
    public setPosition(pos: NotificationPosition): void {
        this.position = pos;
    }

    private getStack(pos: NotificationPosition): HTMLDivElement {
        let container = this.stackContainers.get(pos);
        if (!container) {
            container = document.createElement('div');
            container.className = `notification-stack notification-stack-${pos}`;
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('role', 'region');
            container.setAttribute('aria-label', 'Notifications');
            document.body.appendChild(container);
            this.stackContainers.set(pos, container);
        }
        return container;
    }

    private cleanupStack(pos: NotificationPosition): void {
        const container = this.stackContainers.get(pos);
        if (container && container.children.length === 0) {
            container.remove();
            this.stackContainers.delete(pos);
        }
    }

    /** Show a notification. Returns the DOM id. */
    public show(options: VanillaNotificationOptions): string {
        const pos = this.position;
        const stack = this.getStack(pos);
        const id = `notification-${++this.notificationCount}`;
        const variant = options.variant || 'secondary';
        const closable = options.closable ?? true;

        const el = document.createElement('div');
        el.className = `notification notification-enter-${pos}`;
        if (closable) el.classList.add('notification-closable');
        if (options.isFlat) el.classList.add('notification-flat');
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        el.id = id;

        el.style.setProperty('--notification-color-base', `var(--${variant}-500, var(--color-${variant}))`);

        const resolvedIcon = options.icon !== undefined
            ? options.icon
            : (NOTIFICATION_SEMANTIC_SVG[variant] ?? null);

        if (resolvedIcon) {
            el.classList.add('has-icon');
            const iconSpan = document.createElement('span');
            iconSpan.className = 'notification-icon';

            if (typeof resolvedIcon === 'string') {
                const safeSvg = createSafeSvg(resolvedIcon);
                if (safeSvg) {
                    iconSpan.appendChild(safeSvg);
                } else {
                    iconSpan.textContent = resolvedIcon;
                }
            } else if (resolvedIcon instanceof HTMLElement) {
                iconSpan.appendChild(resolvedIcon);
            }
            el.appendChild(iconSpan);
        }

        const body = document.createElement('div');
        body.className = 'notification-body';

        if (options.title) {
            const titleEl = document.createElement('strong');
            titleEl.className = 'notification-title';
            titleEl.textContent = options.title;
            body.appendChild(titleEl);
        }

        if (options.message !== undefined) {
            const msgEl = document.createElement('p');
            msgEl.className = 'notification-message';
            if (typeof options.message === 'string') {
                msgEl.textContent = options.message;
            } else {
                msgEl.appendChild(options.message);
            }
            body.appendChild(msgEl);
        }
        el.appendChild(body);

        let dismiss: TimedDismiss | undefined;
        let exitTimerId: number | undefined;
        const closeHandler = (): void => {
            if (el.classList.contains('is-exiting')) return;
            const active = this.activeNotifications.get(id);
            active?.dismiss?.destroy();
            dismiss?.destroy();
            if (closeBtn) closeBtn.removeEventListener('click', closeHandler);

            el.className = el.className.replace(/notification-enter--[\w-]+/, '').trim();
            el.classList.add(`notification-exit-${pos}`);
            el.classList.add('is-exiting');

            exitTimerId = window.setTimeout(() => {
                el.remove();
                this.cleanupStack(pos);
                this.activeNotifications.delete(id);
            }, 300);

            if (active) active.exitTimerId = exitTimerId;
        };

        let closeBtn: HTMLButtonElement | null = null;
        if (closable) {
            closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'notification-close';
            closeBtn.setAttribute('aria-label', 'Close notification');
            closeBtn.innerHTML = NOTIFICATION_CLOSE_SVG;
            closeBtn.addEventListener('click', closeHandler);
            el.appendChild(closeBtn);
        }

        const durationMs = durationToMilliseconds(options.duration);
        const durationSec = durationMs / 1000;

        let progressBar: HTMLDivElement | undefined;
        if (durationMs > 0) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'notification-progress';
            progressBar = document.createElement('div');
            progressBar.className = 'notification-progress-bar';
            progressBar.style.animationDuration = `${durationSec}s`;
            progressContainer.appendChild(progressBar);
            el.appendChild(progressContainer);
        }

        const mouseEnter = () => {
            if (progressBar) progressBar.style.animationPlayState = 'paused';
            dismiss?.pause();
        };

        const mouseLeave = () => {
            if (progressBar) progressBar.style.animationPlayState = 'running';
            dismiss?.resume();
        };

        el.addEventListener('mouseenter', mouseEnter);
        el.addEventListener('mouseleave', mouseLeave);

        const isBottom = pos.startsWith('bottom');
        if (isBottom) {
            stack.appendChild(el);
        } else {
            stack.insertBefore(el, stack.firstChild);
        }

        dismiss = new TimedDismiss(durationMs, closeHandler);
        this.activeNotifications.set(id, {el, closeHandler, dismiss, mouseEnter, mouseLeave});
        dismiss.start();

        return id;
    }

    /** Programmatically close a notification by id. */
    public close(id: string): void {
        const active = this.activeNotifications.get(id);
        if (active) {
            active.closeHandler();
            return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        const match = el.className.match(/notification-(?:enter|exit)--([\w-]+)/);
        const pos = (match ? match[1] : this.position) as NotificationPosition;

        el.className = el.className.replace(/notification-enter--[\w-]+/, '').trim();
        el.classList.add(`notification-exit-${pos}`);

        window.setTimeout(() => {
            el.remove();
            this.cleanupStack(pos);
        }, 300);
    }
}

export const notification = new LycoNotificationManager();


