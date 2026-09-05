import './Select.scss';
import {type ChangeEvent, type CSSProperties, forwardRef, type HTMLAttributes, type KeyboardEvent, type ReactNode, useCallback, useEffect, useId, useRef, useState} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types.ts';

/**
 * Represents a single item in the Select dropdown.
 */
export interface SelectOption {
    /** The text displayed for the option. */
    label?: string;
    /** The underlying value of the option. Must be unique. */
    value?: string | number;
    /** An optional icon element to render next to the label. */
    icon?: ReactNode;
    /** If true, the option cannot be selected or focused. */
    disabled?: boolean;
    /** If true, renders a non-interactive semantic separator. */
    isSpacer?: boolean;
    /** The semantic color variant of the option. */
    variant?: FullVariant;
}

/**
 * Props for the Select component.
 */
export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
    /** An array of option objects to display in the dropdown list. */
    options: SelectOption[];
    /** The currently selected value (controlled). */
    value?: string | number;
    /** Callback fired when an option is selected. */
    onChange?: (value: string | number) => void;
    /** Placeholder text displayed when no option is selected. */
    placeholder?: string;
    /** An optional icon to display inside the Select trigger button. */
    icon?: ReactNode;
    /** The semantic color variant of the Select component. */
    variant?: FullVariant | 'default';
    /** The size of the Select component (sm, md, lg). Default is 'md'. */
    size?: SizeVariant;
    /** If true, the entire Select component is disabled. */
    disabled?: boolean;
    /** If true, enables searching/filtering of options. */
    searchable?: boolean;
    /** If true, allows selecting free-text values not present in the options list (requires searchable). */
    allowCustomValues?: boolean;
    /** Optional validation function for custom values. Returns an error message string if invalid, or null if valid. */
    validate?: (value: string) => string | null;
}

/**
 * Select component.
 */
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

    const generatedId = useId();
    const selectId = id ?? generatedId;
    const dropdownId = `${selectId}-listbox`;

    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const filteredOptions = searchable && isOpen
        ? options.filter(opt => opt.isSpacer || (opt.label || String(opt.value)).toLowerCase().includes(inputValue.toLowerCase()))
        : options;

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
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                handleBlurCommit();
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen, handleBlurCommit]);

    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && listboxRef.current) {
            const focusedEl = listboxRef.current.children[focusedIndex] as HTMLElement;
            if (focusedEl) {
                focusedEl.scrollIntoView({block: 'nearest'});
            }
        }
    }, [focusedIndex, isOpen, filteredOptions.length]);

    const findNextValidIndex = useCallback((start: number, direction: 1 | -1, includeStart: boolean = false): number => {
        let idx = includeStart ? start : start + direction;
        while (idx >= 0 && idx < filteredOptions.length) {
            if (!filteredOptions[idx].disabled && !filteredOptions[idx].isSpacer) return idx;
            idx += direction;
        }
        return start;
    }, [filteredOptions]);

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

    const activeIcon = selectedOption?.icon || icon;
    const activeDescendant = (isOpen && focusedIndex >= 0) ? `${dropdownId}-opt-${focusedIndex}` : undefined;

    return (
        <div
            ref={mergedRef}
            className={clsx(
                'select',
                size !== 'md' && `select--${size}`,
                disabled && 'is-disabled',
                isOpen && 'is-open',
                error && 'is-error',
                className
            )}
            style={isColored ? {
                '--select-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                ...props.style
            } as CSSProperties : props.style}
            {...props}
        >
            <div
                className="select__trigger"
                onClick={searchable ? handleInputClick : handleToggle}
                onKeyDown={handleKeyDown}
                tabIndex={searchable || disabled ? -1 : 0}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                aria-activedescendant={activeDescendant}
            >
                <div className="select__content">
                    {activeIcon && <span className="select__icon select__icon--start">{activeIcon}</span>}

                    {searchable ? (
                        <input
                            ref={inputRef}
                            type="text"
                            className="select__input"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            disabled={disabled}
                            autoComplete="off"
                            role="textbox"
                        />
                    ) : (
                        <span className={clsx('select__value', !selectedOption && 'select__placeholder')}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className="select__chevron-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggle();
                    }}
                    disabled={disabled}
                    tabIndex={-1}
                    aria-label="Toggle dropdown"
                >
                    <svg className="select__chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>
            </div>

            <ul
                ref={listboxRef}
                id={dropdownId}
                className="select__dropdown"
                role="listbox"
                hidden={!isOpen}
                aria-hidden={!isOpen}
            >
                {filteredOptions.length === 0 ? (
                    <li className="select__option is-disabled" role="option" aria-disabled="true">
                        <span>No options found</span>
                    </li>
                ) : (
                    filteredOptions.map((option, index) => {
                        if (option.isSpacer) {
                            return <li key={`spacer-${index}`} className="select__spacer" role="separator"/>;
                        }

                        const isSelected = option.value === value;
                        const isFocused = index === focusedIndex;
                        const optionId = `${dropdownId}-opt-${index}`;

                        return (
                            <li
                                key={option.value}
                                id={optionId}
                                role="option"
                                aria-selected={isSelected}
                                aria-disabled={option.disabled}
                                className={clsx(
                                    'select__option',
                                    option.variant && 'select__option--variant',
                                    isSelected && 'is-selected',
                                    isFocused && 'is-focused',
                                    option.disabled && 'is-disabled'
                                )}
                                style={option.variant ? {
                                    '--select-option-color': `var(--${option.variant}-500, var(--color-${option.variant}))`,
                                } as CSSProperties : undefined}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(option);
                                }}
                                onMouseEnter={() => setFocusedIndex(index)}
                            >
                                {option.icon && <span className="select__icon select__icon--option">{option.icon}</span>}
                                <span>{option.label}</span>
                            </li>
                        );
                    })
                )}
            </ul>

            {error && <div className="select__error-message">{error}</div>}
        </div>
    );
});

Select.displayName = 'Select';