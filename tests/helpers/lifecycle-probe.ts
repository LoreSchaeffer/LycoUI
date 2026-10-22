export interface LifecycleProbe {
  snapshot(): Readonly<Record<string, number>>;
  restore(): void;
}

export function installLifecycleProbe(target: Window = window): LifecycleProbe {
  const counts = new Map<string, number>();
  const originalAdd = EventTarget.prototype.addEventListener;
  const originalRemove = EventTarget.prototype.removeEventListener;
  const increment = (key: string, delta: number): void => {
    counts.set(key, (counts.get(key) ?? 0) + delta);
  };

  EventTarget.prototype.addEventListener = function patchedAdd(type, listener, options) {
    increment(`listener:${type}`, 1);
    return originalAdd.call(this, type, listener, options);
  };
  EventTarget.prototype.removeEventListener = function patchedRemove(type, listener, options) {
    increment(`listener:${type}`, -1);
    return originalRemove.call(this, type, listener, options);
  };

  return {
    snapshot: () => Object.fromEntries(counts),
    restore: () => {
      EventTarget.prototype.addEventListener = originalAdd;
      EventTarget.prototype.removeEventListener = originalRemove;
      target.dispatchEvent(new Event('lyco-lifecycle-probe-restored'));
    },
  };
}
