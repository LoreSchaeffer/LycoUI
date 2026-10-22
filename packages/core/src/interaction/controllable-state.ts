export type StateUpdater<T> = T | ((previous: T) => T);

export function resolveStateUpdate<T>(previous: T, update: StateUpdater<T>): T {
  return typeof update === 'function' ? (update as (value: T) => T)(previous) : update;
}
