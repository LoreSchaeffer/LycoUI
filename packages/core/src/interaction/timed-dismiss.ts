export interface TimedDismissScheduler {
    now(): number;
    set(callback: () => void, delay: number): number;
    clear(id: number): void;
}

const browserScheduler: TimedDismissScheduler = {
    now: () => Date.now(),
    set: (callback, delay) => window.setTimeout(callback, delay),
    clear: (id) => window.clearTimeout(id),
};

/** Owns one timeout and makes close/pause/resume/destroy idempotent. */
export class TimedDismiss {
    private timer?: number;
    private remaining: number;
    private startedAt?: number;
    private closed = false;
    private readonly onClose: () => void;
    private readonly scheduler: TimedDismissScheduler;

    public constructor(durationMs: number, onClose: () => void, scheduler: TimedDismissScheduler = browserScheduler) {
        this.remaining = Math.max(0, durationMs);
        this.onClose = onClose;
        this.scheduler = scheduler;
    }

    public start(): void {
        if (this.closed || this.timer !== undefined) return;
        if (this.remaining === 0) {
            this.close();
            return;
        }
        this.startedAt = this.scheduler.now();
        this.timer = this.scheduler.set(() => this.close(), this.remaining);
    }

    public pause(): void {
        if (this.closed || this.timer === undefined || this.startedAt === undefined) return;
        this.remaining = Math.max(0, this.remaining - (this.scheduler.now() - this.startedAt));
        this.scheduler.clear(this.timer);
        this.timer = undefined;
        this.startedAt = undefined;
    }

    public resume(): void {
        this.start();
    }

    public close(): void {
        if (this.closed) return;
        this.closed = true;
        if (this.timer !== undefined) this.scheduler.clear(this.timer);
        this.timer = undefined;
        this.startedAt = undefined;
        this.onClose();
    }

    public destroy(): void {
        if (this.timer !== undefined) this.scheduler.clear(this.timer);
        this.timer = undefined;
        this.startedAt = undefined;
        this.closed = true;
    }
}

export function durationToMilliseconds(duration: 'short' | 'medium' | 'long' | number | undefined): number {
    if (typeof duration === 'number') return Math.max(0, duration * 1000);
    return ({short: 3000, medium: 5000, long: 8000}[duration ?? 'short']);
}
