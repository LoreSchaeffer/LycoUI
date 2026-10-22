import {useCallback, useState} from 'react';

export function usePickerField<T>({value, defaultValue, onChange, validate}: {value?: T; defaultValue: T; onChange?: (value: T) => void; validate?: (value: T) => boolean}) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const current = value === undefined ? uncontrolledValue : value;
  const [isOpen, setOpen] = useState(false);
  const setValue = useCallback((next: T) => {
    if (validate && !validate(next)) return false;
    if (value === undefined) setUncontrolledValue(next);
    onChange?.(next);
    return true;
  }, [onChange, validate, value]);
  return {value: current, setValue, isOpen, setOpen};
}
