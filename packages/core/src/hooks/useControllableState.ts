import {useCallback, useState} from 'react';
import {resolveStateUpdate, type StateUpdater} from '../interaction/controllable-state';

export interface ControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({value, defaultValue, onChange}: ControllableStateOptions<T>): readonly [T, (next: StateUpdater<T>) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const current = value ?? uncontrolledValue;
  const setValue = useCallback((next: StateUpdater<T>) => {
    const resolved = resolveStateUpdate(current, next);
    if (value === undefined) setUncontrolledValue(resolved);
    onChange?.(resolved);
  }, [current, onChange, value]);
  return [current, setValue] as const;
}
