export interface Controller {
  destroy(): void;
}

interface ListenerCleanup {
  target: EventTarget;
  type: string;
  listener: EventListener;
  options?: AddEventListenerOptions | boolean;
}

export class BaseController implements Controller {
  private readonly listenerCleanups: ListenerCleanup[] = [];
  private readonly cleanups: Array<() => void> = [];
  private destroyed = false;

  public listen(
    target: EventTarget,
    type: string,
    listener: EventListener,
    options?: AddEventListenerOptions | boolean,
  ): void {
    if (this.destroyed) return;
    target.addEventListener(type, listener, options);
    this.listenerCleanups.push({ target, type, listener, options });
  }

  public addCleanup(cleanup: () => void): void {
    if (this.destroyed) {
      cleanup();
      return;
    }
    this.cleanups.push(cleanup);
  }

  public destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    for (const { target, type, listener, options } of this.listenerCleanups.splice(0)) {
      target.removeEventListener(type, listener, options);
    }
    for (const cleanup of this.cleanups.splice(0)) cleanup();
  }
}
