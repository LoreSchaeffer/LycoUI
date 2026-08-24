import './Select.scss';
import {
    forwardRef,
    useState,
    useRef,
    useEffect,
    useId,
    useCallback,
    type ReactNode,
    type KeyboardEvent,
    type HTMLAttributes
} from 'react';
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
}

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
        className,
        id,
        ...props
    }, ref) => {

    const generatedId = useId();
    const selectId = id ?? generatedId;
    const dropdownId = `${selectId}-listbox`;

    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    const mergedRef = (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const isColored = variant !== 'default';
    const selectedOption = options.find(opt => opt.value === value && !opt.isSpacer);

    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && listboxRef.current) {
            const focusedEl = listboxRef.current.children[focusedIndex] as HTMLElement;
            if (focusedEl) {
                focusedEl.scrollIntoView({block: 'nearest'});
            }
        }
    }, [focusedIndex, isOpen]);

    const findNextValidIndex = useCallback((start: number, direction: 1 | -1, includeStart: boolean = false): number => {
        let idx = includeStart ? start : start + direction;
        while (idx >= 0 && idx < options.length) {
            if (!options[idx].disabled && !options[idx].isSpacer) return idx;
            idx += direction;
        }
        return start;
    }, [options]);

    const handleToggle = useCallback(() => {
        if (disabled) return;
        setIsOpen(prev => {
            const opening = !prev;
            if (opening) {
                const currentIndex = options.findIndex(opt => opt.value === value && !opt.isSpacer);
                setFocusedIndex(findNextValidIndex(currentIndex >= 0 ? currentIndex : 0, 1, true));
            }
            return opening;
        });
    }, [disabled, options, value, findNextValidIndex]);

    const handleSelect = useCallback((option: SelectOption) => {
        if (option.disabled || option.isSpacer || option.value === undefined) return;
        onChange?.(option.value);
        setIsOpen(false);
    }, [onChange]);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (isOpen && focusedIndex >= 0 && !options[focusedIndex].disabled && !options[focusedIndex].isSpacer) {
                    handleSelect(options[focusedIndex]);
                } else {
                    handleToggle();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    handleToggle();
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
                break;
            case 'Tab':
                setIsOpen(false);
                break;
        }
    }, [disabled, isOpen, focusedIndex, options, handleSelect, handleToggle, findNextValidIndex]);

    const activeIcon = selectedOption?.icon || icon;
    const activeDescendant = (isOpen && focusedIndex >= 0) ? `${dropdownId}-opt-${focusedIndex}` : undefined;

    return (
        <div
            ref={mergedRef}
            className={clsx(
                'select',
                isColored && `select--${variant}`,
                size !== 'md' && `select--${size}`,
                disabled && 'is-disabled',
                isOpen && 'is-open',
                className
            )}
            {...props}
        >
            <button 
                type="button" 
                className="select__trigger" 
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-haspopup="listbox" 
                aria-expanded={isOpen} 
                aria-controls={dropdownId}
                aria-activedescendant={activeDescendant}
                disabled={disabled}
            >
                <div className="select__content">
                    {activeIcon && <span className="select__icon select__icon--start">{activeIcon}</span>}
                    <span className={clsx('select__value', !selectedOption && 'select__placeholder')}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>

                <svg className="select__chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </button>

            <ul 
                ref={listboxRef} 
                id={dropdownId} 
                className="select__dropdown" 
                role="listbox"
                hidden={!isOpen}
                aria-hidden={!isOpen}
            >
                {options.map((option, index) => {
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
                                option.variant && `select__option--${option.variant}`,
                                isSelected && 'is-selected',
                                isFocused && 'is-focused',
                                option.disabled && 'is-disabled'
                            )}
                            onClick={() => handleSelect(option)}
                            onMouseEnter={() => setFocusedIndex(index)}
                        >
                            {option.icon && <span className="select__icon select__icon--option">{option.icon}</span>}
                            <span>{option.label}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});

Select.displayName = 'Select';