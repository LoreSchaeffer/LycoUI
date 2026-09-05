import './Input.scss';
import type {InputHTMLAttributes} from 'react';
import React, {type CSSProperties, forwardRef, useCallback, useEffect, useId, useRef, useState} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types';
import {Spinner, type SpinnerType} from '../Spinner';

/**
 * InputValidation.
 */
export type InputValidation = 'disabled' | 'auto' | 'valid' | 'invalid';

/**
 * Props for the Input component.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The semantic color variant of the input. */
    variant?: FullVariant;
    /** The size of the input (sm, md, lg). Default is 'md'. */
    size?: SizeVariant;
    /** Label text for the input. Will float if the input has a value. */
    label?: string;
    /** An icon element to display at the start (left) of the input. */
    iconStart?: React.ReactNode;
    /** An icon element to display at the end (right) of the input. */
    iconEnd?: React.ReactNode;
    /** Callback fired when the start icon is clicked. */
    onIconStartClick?: () => void;
    /** Callback fired when the end icon is clicked. */
    onIconEndClick?: () => void;
    /** If true, displays a loading spinner. */
    loading?: boolean;
    /** The visual style of the loading spinner. */
    spinnerType?: SpinnerType;
    /** Where to place the spinner ('start' or 'end'). Default is 'end'. */
    spinnerPlacement?: 'start' | 'end';
    /** The validation state of the input ('valid', 'invalid', 'auto', 'disabled'). */
    validation?: InputValidation;
    /** A custom validation function that returns an error message string or null. */
    validationFn?: (value: string) => string | null;
    /** A static validation message to display. */
    validationMessage?: string;
    /** If true, shows numeric up/down step buttons for type="number". */
    showStepButtons?: boolean;
    /** If true, renders a flat version of the input without borders. */
    flat?: boolean;
}

/**
 * Input component.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            type = 'text',
            label,
            iconStart,
            iconEnd,
            onIconStartClick,
            onIconEndClick,
            loading = false,
            spinnerType = 'classic',
            spinnerPlacement = 'end',
            validation = 'disabled',
            validationFn,
            validationMessage,
            showStepButtons = true,
            flat = false,
            disabled,
            readOnly,
            value,
            defaultValue,
            onChange,
            onBlur,
            onFocus,
            id,
            style,
            min,
            max,
            step,
            required,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id ?? generatedId;
        const messageId = `${inputId}-message`;

        const innerRef = useRef<HTMLInputElement>(null);
        const [isFocused, setIsFocused] = useState(false);
        const [isFilled, setIsFilled] = useState(
            () => Boolean(value !== undefined ? value : defaultValue)
        );
        const [autoValidationState, setAutoValidationState] = useState<'valid' | 'invalid' | null>(null);
        const [autoValidationMessage, setAutoValidationMessage] = useState<string>('');
        const [hasBlurred, setHasBlurred] = useState(false);

        const mergedRef = useCallback((node: HTMLInputElement | null) => {
            (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }, [ref]);

        useEffect(() => {
            if (value !== undefined) {
                setIsFilled(String(value).length > 0);
            }
        }, [value]);

        const handleIconStartClick = useCallback(() => {
            if (disabled || loading || readOnly) return;
            if (onIconStartClick) onIconStartClick();
        }, [disabled, loading, readOnly, onIconStartClick]);

        const handleIconEndClick = useCallback(() => {
            if (disabled || loading || readOnly) return;
            if (onIconEndClick) onIconEndClick();
        }, [disabled, loading, readOnly, onIconEndClick]);

        const runAutoValidation = useCallback((inputEl: HTMLInputElement) => {
            const nativeValid = inputEl.checkValidity();
            if (!nativeValid) {
                setAutoValidationState('invalid');
                setAutoValidationMessage(inputEl.validationMessage);
                return;
            }

            if (validationFn) {
                const customError = validationFn(inputEl.value);
                if (customError) {
                    setAutoValidationState('invalid');
                    setAutoValidationMessage(customError);
                    return;
                }
            }

            setAutoValidationState('valid');
            setAutoValidationMessage('');
        }, [validationFn]);

        const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            onFocus?.(e);
        }, [onFocus]);

        const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            setHasBlurred(true);

            if (validation === 'auto') {
                runAutoValidation(e.target);
            }

            onBlur?.(e);
        }, [onBlur, validation, runAutoValidation]);

        const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            setIsFilled(e.target.value.length > 0);

            if (validation === 'auto' && hasBlurred) {
                runAutoValidation(e.target);
            }

            onChange?.(e);
        }, [onChange, validation, hasBlurred, runAutoValidation]);

        const handleStep = useCallback((e: React.MouseEvent, direction: 1 | -1) => {
            e.preventDefault();
            const input = innerRef.current;
            if (disabled || loading || readOnly || !input) return;

            if (direction === 1) {
                input.stepUp();
            } else {
                input.stepDown();
            }

            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            if (nativeInputValueSetter) {
                nativeInputValueSetter.call(input, input.value);
            }
            input.dispatchEvent(new Event('input', {bubbles: true}));

            setIsFilled(input.value.length > 0);

            if (validation === 'auto' && hasBlurred) {
                runAutoValidation(input);
            }
        }, [disabled, loading, readOnly, validation, hasBlurred, runAutoValidation]);

        let visualValidation: 'valid' | 'invalid' | null = null;
        if (validation === 'valid') {
            visualValidation = 'valid';
        } else if (validation === 'invalid') {
            visualValidation = 'invalid';
        } else if (validation === 'auto' && hasBlurred) {
            visualValidation = autoValidationState;
        }

        let displayMessage = '';
        if (validation !== 'disabled') {
            if (validationMessage) {
                displayMessage = validationMessage;
            } else if (validation === 'auto' && autoValidationMessage) {
                displayMessage = autoValidationMessage;
            }
        }

        const showSpinnerStart = loading && spinnerPlacement === 'start';
        const showSpinnerEnd = loading && spinnerPlacement === 'end';

        const isNumberType = type === 'number';
        const showSteps = isNumberType && showStepButtons && !disabled && !loading && !readOnly;

        const hasIconStart = Boolean(iconStart) || showSpinnerStart;
        const hasIconEnd = Boolean(iconEnd) || showSpinnerEnd || (loading && !iconStart && !iconEnd);

        return (
            <div className="input-wrapper" style={style}>
                <div
                    className={clsx(
                        'input',
                        size && size !== 'md' && `input--${size}`,
                        flat && 'input--flat',
                        isFocused && 'is-focused',
                        isFilled && 'is-filled',
                        disabled && 'is-disabled',
                        readOnly && 'is-readonly',
                        loading && 'is-loading',
                        visualValidation === 'valid' && 'is-valid',
                        visualValidation === 'invalid' && 'is-invalid',
                        hasIconStart && 'input--has-icon-start',
                        (hasIconEnd || showSteps) && 'input--has-icon-end',
                        className
                    )}
                    style={{
                        '--input-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                    } as CSSProperties}
                >
                    {/* Icon Start */}
                    {hasIconStart && (
                        onIconStartClick && !loading ? (
                            <button
                                type="button"
                                className="input__icon input__icon--start input__icon--clickable"
                                onClick={handleIconStartClick}
                                tabIndex={-1}
                                aria-label="Input action"
                            >
                                {showSpinnerStart
                                    ? <Spinner size={size} type={spinnerType} className="input__spinner"/>
                                    : iconStart}
                            </button>
                        ) : (
                            <span className="input__icon input__icon--start">
                {showSpinnerStart
                    ? <Spinner size={size} type={spinnerType} className="input__spinner"/>
                    : iconStart}
              </span>
                        )
                    )}

                    {/* Native Input */}
                    <input
                        ref={mergedRef}
                        id={inputId}
                        type={type}
                        className="input__field"
                        disabled={disabled || loading}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        min={min}
                        max={max}
                        step={step}
                        required={required}
                        aria-invalid={visualValidation === 'invalid' ? true : undefined}
                        aria-describedby={displayMessage ? messageId : undefined}
                        {...props}
                    />

                    {/* Floating Label */}
                    {label && (
                        <label className="input__label" htmlFor={inputId}>
                            {label}
                            {required && <span className="input__required" aria-hidden="true"> *</span>}
                        </label>
                    )}

                    {/* Icon End */}
                    {(hasIconEnd && !showSteps) && (
                        onIconEndClick && !loading ? (
                            <button
                                type="button"
                                className="input__icon input__icon--end input__icon--clickable"
                                onClick={handleIconEndClick}
                                tabIndex={-1}
                                aria-label="Input action"
                            >
                                {(showSpinnerEnd || (loading && !iconStart && !iconEnd))
                                    ? <Spinner size={size} type={spinnerType} className="input__spinner"/>
                                    : iconEnd}
                            </button>
                        ) : (
                            <span className="input__icon input__icon--end">
                {(showSpinnerEnd || (loading && !iconStart && !iconEnd))
                    ? <Spinner size={size} type={spinnerType} className="input__spinner"/>
                    : iconEnd}
              </span>
                        )
                    )}

                    {/* Step Buttons for Number */}
                    {showSteps && (
                        <div className="input__step-buttons">
                            <button
                                type="button"
                                className="input__step-btn input__step-btn--up"
                                onClick={(e) => handleStep(e, 1)}
                                tabIndex={-1}
                                aria-label="Increment"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="18 15 12 9 6 15"/>
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="input__step-btn input__step-btn--down"
                                onClick={(e) => handleStep(e, -1)}
                                tabIndex={-1}
                                aria-label="Decrement"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Validation Message */}
                {displayMessage && (
                    <div
                        id={messageId}
                        className={clsx(
                            'input__message',
                            visualValidation === 'valid' && 'input__message--valid',
                            visualValidation === 'invalid' && 'input__message--invalid'
                        )}
                        role={visualValidation === 'invalid' ? 'alert' : 'status'}
                    >
                        {displayMessage}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';
