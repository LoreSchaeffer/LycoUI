import type { NotificationPosition } from '../../types/types';
import { NOTIFICATION_SEMANTIC_SVG, NOTIFICATION_CLOSE_SVG } from './Notification';

const DURATION_MAP: Record<string, number> = {
  short: 3000,
  medium: 5000,
  long: 8000,
};

export type VanillaNotificationDuration = 'short' | 'medium' | 'long' | number;

export interface VanillaNotificationOptions {
  title?: string;
  message: string | HTMLElement;
  variant?: string;
  icon?: string | HTMLElement | null;
  closable?: boolean;
  duration?: VanillaNotificationDuration;
  isFlat?: boolean;
}

function parseSafeSvg(svgString: string): SVGSVGElement | null {
  const template = document.createElement('template');
  template.innerHTML = svgString.trim();
  const svg = template.content.querySelector('svg');
  if (!svg) return null;
  svg.querySelectorAll('script').forEach(s => s.remove());
  Array.from(svg.attributes).forEach(attr => {
    if (attr.name.startsWith('on')) svg.removeAttribute(attr.name);
  });
  return svg;
}

class LycoNotificationManager {
  private stackContainers: Map<NotificationPosition, HTMLDivElement> = new Map();
  private position: NotificationPosition = 'bottom-right';
  private notificationCount = 0;

  /** Change the default position for future notifications. */
  public setPosition(pos: NotificationPosition): void {
    this.position = pos;
  }

  private getStack(pos: NotificationPosition): HTMLDivElement {
    let container = this.stackContainers.get(pos);
    if (!container) {
      container = document.createElement('div');
      container.className = `notification-stack notification-stack--${pos}`;
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
    const variant = options.variant || 'neutral';
    const closable = options.closable ?? true;

    const el = document.createElement('div');
    el.className = `notification notification-${variant} notification-enter--${pos}`;
    if (closable) el.classList.add('notification-closable');
    if (options.isFlat) el.classList.add('notification-flat');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.id = id;

    const resolvedIcon = options.icon !== undefined
      ? options.icon
      : (NOTIFICATION_SEMANTIC_SVG[variant] ?? null);

    if (resolvedIcon) {
      el.classList.add('has-icon');
      const iconSpan = document.createElement('span');
      iconSpan.className = 'notification__icon';

      if (typeof resolvedIcon === 'string') {
        const safeSvg = parseSafeSvg(resolvedIcon);
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
    body.className = 'notification__body';

    if (options.title) {
      const titleEl = document.createElement('strong');
      titleEl.className = 'notification__title';
      titleEl.textContent = options.title;
      body.appendChild(titleEl);
    }

    const msgEl = document.createElement('p');
    msgEl.className = 'notification__message';
    if (typeof options.message === 'string') {
      msgEl.textContent = options.message;
    } else {
      msgEl.appendChild(options.message);
    }
    body.appendChild(msgEl);
    el.appendChild(body);

    let timerId: number | undefined;
    const closeHandler = (): void => {
      if (timerId) window.clearTimeout(timerId);
      if (closeBtn) closeBtn.removeEventListener('click', closeHandler);

      el.className = el.className.replace(/notification-enter--[\w-]+/, '').trim();
      el.classList.add(`notification-exit--${pos}`);

      window.setTimeout(() => {
        el.remove();
        this.cleanupStack(pos);
      }, 300);
    };

    let closeBtn: HTMLButtonElement | null = null;
    if (closable) {
      closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'notification__close';
      closeBtn.setAttribute('aria-label', 'Close notification');
      closeBtn.innerHTML = NOTIFICATION_CLOSE_SVG;
      closeBtn.addEventListener('click', closeHandler);
      el.appendChild(closeBtn);
    }

    const durationType = options.duration ?? 'short';
    const durationMs = typeof durationType === 'number'
      ? durationType * 1000
      : (DURATION_MAP[durationType] ?? DURATION_MAP.short);
    const durationSec = durationMs / 1000;

    const progressContainer = document.createElement('div');
    progressContainer.className = 'notification__progress';
    const progressBar = document.createElement('div');
    progressBar.className = 'notification__progress-bar';
    progressBar.style.animationDuration = `${durationSec}s`;
    progressContainer.appendChild(progressBar);
    el.appendChild(progressContainer);

    el.addEventListener('mouseenter', () => {
      progressBar.style.animationPlayState = 'paused';
      if (timerId) {
        window.clearTimeout(timerId);
        timerId = undefined;
      }
    });

    el.addEventListener('mouseleave', () => {
      progressBar.style.animationPlayState = 'running';
      const computed = getComputedStyle(progressBar);
      const matrix = computed.transform;
      let scaleX = 1;
      if (matrix && matrix !== 'none') {
        const values = matrix.match(/matrix\(([^)]+)\)/);
        if (values) {
          const parts = values[1].split(',').map(Number);
          scaleX = parts[0];
        }
      }
      const remaining = scaleX * durationMs;
      if (remaining > 0) {
        timerId = window.setTimeout(closeHandler, remaining);
      } else {
        closeHandler();
      }
    });

    const isBottom = pos.startsWith('bottom');
    if (isBottom) {
      stack.appendChild(el);
    } else {
      stack.insertBefore(el, stack.firstChild);
    }

    timerId = window.setTimeout(closeHandler, durationMs);

    return id;
  }

  /** Programmatically close a notification by id. */
  public close(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const match = el.className.match(/notification-(?:enter|exit)--([\w-]+)/);
    const pos = (match ? match[1] : this.position) as NotificationPosition;

    el.className = el.className.replace(/notification-enter--[\w-]+/, '').trim();
    el.classList.add(`notification-exit--${pos}`);

    window.setTimeout(() => {
      el.remove();
      this.cleanupStack(pos);
    }, 300);
  }
}

export const notification = new LycoNotificationManager();
