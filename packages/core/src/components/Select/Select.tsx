import './Select.scss';
import {type ChangeEvent, type CSSProperties, forwardRef, type HTMLAttributes, type KeyboardEvent, type ReactNode, useCallback, useEffect, useId, useLayoutEffect, useRef, useState} from 'react';
import type {FullVariant, SizeVariant} from '../../types/types.ts';
import {useSelectState} from './useSelectState';
import {SelectRenderer} from './SelectRenderer';
export interface SelectOption { label?: string; value?: string | number; icon?: ReactNode; disabled?: boolean; isSpacer?: boolean; variant?: FullVariant; }
export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> { options: SelectOption[]; value?: string | number; onChange?: (value: string | number) => void; placeholder?: string; icon?: ReactNode; variant?: FullVariant | 'default'; size?: SizeVariant; disabled?: boolean; searchable?: boolean; allowCustomValues?: boolean; validate?: (value: string) => string | null; }
export const Select = forwardRef<HTMLDivElement, SelectProps>((
    {
        options,
        value,
        onChange,
        placeholder = 'Select an option...',
        icon,
        variant = 'primary',
        size = 'md',
        disabled = false,
        searchable = false,
        allowCustomValues = false,
        validate,
        className,
        id,
        ...props
    }, ref) => {
    const dropdownId = `${id ?? useId()}-listbox`;
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropdownStyles, setDropdownStyles] = useState<CSSProperties>({});
    const updatePosition = useCallback(() => {
        if (!isOpen || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const nextStyles: CSSProperties = {
            position: 'absolute',
            top: `${rect.bottom + window.scrollY + 8}px`, // +8px for var(--spacing-2)
            left: `${rect.left + window.scrollX}px`,
            width: `${rect.width}px`,
            zIndex: 'var(--z-dropdown, 1050)'
        };
        if (listboxRef.current) {
            Object.assign(listboxRef.current.style, nextStyles);
        }
        setDropdownStyles(nextStyles);
    }, [isOpen]);
    useLayoutEffect(() => {
        if (isOpen) {
            updatePosition();
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            return () => {
                window.removeEventListener('scroll', updatePosition, true);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isOpen, updatePosition]);
    const mergedRef = (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };
    const isColored = variant !== 'default';
    const selectedOption = options.find(opt => opt.value === value && !opt.isSpacer);
    useEffect(() => {
        if (!isOpen) {
            if (selectedOption) {
                setInputValue(selectedOption.label || String(selectedOption.value));
            } else if (value !== undefined && allowCustomValues) {
                setInputValue(String(value));
            } else {
                setInputValue('');
            }
            setError(null);
        }
    }, [value, selectedOption, isOpen, allowCustomValues]);
    const {visibleOptions: filteredOptions, nextIndex: findNextValidIndex} = useSelectState(options, inputValue, searchable, isOpen);
    const commitCustomValue = useCallback((val: string) => {
        if (!allowCustomValues) return false;
        if (!val.trim()) {
            onChange?.('');
            return true;
        }
        if (validate) {
            const validationError = validate(val);
            if (validationError) {
                setError(validationError);
                return false;
            }
        }
        setError(null);
        onChange?.(val);
        return true;
    }, [allowCustomValues, validate, onChange]);
    const handleSelect = useCallback((option: SelectOption) => {
        if (option.disabled || option.isSpacer || option.value === undefined) return;
        setError(null);
        onChange?.(option.value);
        setIsOpen(false);
    }, [onChange]);
    const handleBlurCommit = useCallback(() => {
        if (!searchable || !isOpen) return;
        const matchingOption = filteredOptions.find(opt => !opt.isSpacer && (opt.label === inputValue || String(opt.value) === inputValue));
        if (matchingOption) {
            handleSelect(matchingOption);
        } else if (allowCustomValues && inputValue !== (selectedOption?.label || value)) {
            const success = commitCustomValue(inputValue);
            if (success) {
                setIsOpen(false);
            }
        } else if (!allowCustomValues) {
            setInputValue(selectedOption?.label || (value !== undefined ? String(value) : ''));
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
    }, [searchable, isOpen, filteredOptions, inputValue, selectedOption, value, allowCustomValues, commitCustomValue, handleSelect]);
    useEffect(() => {
        if (!isOpen) return;
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node) &&
                !listboxRef.current?.contains(e.target as Node)
            ) {
                handleBlurCommit();
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen, handleBlurCommit]);
    useLayoutEffect(() => {
        if (isOpen && focusedIndex >= 0 && listboxRef.current) {
            const focusedEl = listboxRef.current.children[focusedIndex] as HTMLElement;
            if (focusedEl) {
                focusedEl.scrollIntoView({block: 'nearest'});
            }
        }
    }, [focusedIndex, isOpen, filteredOptions.length]);
    const handleToggle = useCallback(() => {
        if (disabled) return;
        setIsOpen(prev => {
            const opening = !prev;
            if (opening) {
                if (searchable && inputRef.current) {
                    inputRef.current.focus();
                }
                const currentIndex = filteredOptions.findIndex(opt => opt.value === value && !opt.isSpacer);
                setFocusedIndex(findNextValidIndex(currentIndex >= 0 ? currentIndex : 0, 1, true));
            } else {
                handleBlurCommit();
            }
            return opening;
        });
    }, [disabled, filteredOptions, value, findNextValidIndex, searchable, handleBlurCommit]);
    const handleInputClick = useCallback(() => {
        if (disabled) return;
        if (!isOpen) {
            setIsOpen(true);
            const currentIndex = filteredOptions.findIndex(opt => opt.value === value && !opt.isSpacer);
            setFocusedIndex(findNextValidIndex(currentIndex >= 0 ? currentIndex : 0, 1, true));
        }
    }, [disabled, isOpen, filteredOptions, value, findNextValidIndex]);
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
        if (disabled) return;
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (isOpen && focusedIndex >= 0 && !filteredOptions[focusedIndex].disabled && !filteredOptions[focusedIndex].isSpacer) {
                    handleSelect(filteredOptions[focusedIndex]);
                } else if (searchable && allowCustomValues) {
                    const success = commitCustomValue(inputValue);
                    if (success) setIsOpen(false);
                } else if (!isOpen) {
                    handleToggle();
                }
                break;
            case ' ':
                if (!searchable) {
                    e.preventDefault();
                    if (isOpen && focusedIndex >= 0 && !filteredOptions[focusedIndex].disabled && !filteredOptions[focusedIndex].isSpacer) {
                        handleSelect(filteredOptions[focusedIndex]);
                    } else {
                        handleToggle();
                    }
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setFocusedIndex(findNextValidIndex(0, 1, true));
                } else {
                    setFocusedIndex(prev => findNextValidIndex(prev, 1));
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (isOpen) {
                    setFocusedIndex(prev => findNextValidIndex(prev, -1));
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                handleBlurCommit();
                break;
            case 'Tab':
                setIsOpen(false);
                handleBlurCommit();
                break;
        }
    }, [disabled, isOpen, focusedIndex, filteredOptions, handleSelect, searchable, allowCustomValues, commitCustomValue, inputValue, handleToggle, findNextValidIndex, handleBlurCommit]);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (!isOpen) setIsOpen(true);
        setFocusedIndex(0);
        setError(null);
    };
    return <SelectRenderer rootRef={mergedRef} className={className} style={isColored ? {'--select-color-base': `var(--${variant}-500, var(--color-${variant}))`, ...props.style} as CSSProperties : props.style} options={filteredOptions} value={value} placeholder={placeholder} icon={icon} size={size} disabled={disabled} searchable={searchable} open={isOpen} error={error} dropdownId={dropdownId} focusedIndex={focusedIndex} inputValue={inputValue} dropdownStyles={dropdownStyles} inputRef={inputRef} listboxRef={listboxRef} onToggle={handleToggle} onInputClick={handleInputClick} onKeyDown={handleKeyDown} onInputChange={handleInputChange} onSelect={handleSelect} onFocus={setFocusedIndex}/>;
});
Select.displayName = 'Select';
