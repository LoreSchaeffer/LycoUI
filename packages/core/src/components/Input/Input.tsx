import './Input.scss';
import React, {type CSSProperties, forwardRef, useCallback, useId, useRef} from 'react';
import clsx from 'clsx';
import {Spinner} from '../Spinner';
import {useFieldValidation} from '../../hooks/useFieldValidation';

/**
 * InputValidation.
 */
import type {InputProps} from './Input.types';
import {FieldLabel} from './FieldLabel';
import {FieldMessage} from './FieldMessage';
import {InputAdornment} from './InputAdornment';
import {InputStepButtons} from './InputStepButtons';
import {useInputState} from './useInputState';
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
        const {isFocused, isFilled, focus, blur, input: syncInputState} = useInputState(value, defaultValue);
        const {hasBlurred, markBlurred, validate, validation: fieldValidation} = useFieldValidation(validation, validationFn, validationMessage);

        const mergedRef = useCallback((node: HTMLInputElement | null) => {
            (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }, [ref]);

        const handleIconStartClick = useCallback(() => {
            if (disabled || loading || readOnly) return;
            if (onIconStartClick) onIconStartClick();
        }, [disabled, loading, readOnly, onIconStartClick]);

        const handleIconEndClick = useCallback(() => {
            if (disabled || loading || readOnly) return;
            if (onIconEndClick) onIconEndClick();
        }, [disabled, loading, readOnly, onIconEndClick]);

        const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
            focus();
            onFocus?.(e);
        }, [onFocus]);

        const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
            blur();
            markBlurred();

            if (validation === 'auto') {
                validate(e.target);
            }

            onBlur?.(e);
        }, [onBlur, validation, validate]);

        const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            syncInputState(e.target.value);

            if (validation === 'auto' && hasBlurred) {
                validate(e.target);
            }

            onChange?.(e);
        }, [onChange, validation, hasBlurred, validate]);

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

            syncInputState(input.value);

            if (validation === 'auto' && hasBlurred) {
                validate(input);
            }
        }, [disabled, loading, readOnly, validation, hasBlurred, validate]);

        const {state: visualValidation, message: displayMessage} = fieldValidation;

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
                        <InputAdornment position="start" onClick={onIconStartClick && !loading ? handleIconStartClick : undefined}>
                                {showSpinnerStart
                                    ? <Spinner size={size} type={spinnerType} className="input__spinner"/>
                                    : iconStart}
                        </InputAdornment>
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
                    {label && <FieldLabel className="input__label" htmlFor={inputId} label={label} required={required}/>} 

                    {/* Icon End */}
                    {(hasIconEnd && !showSteps) && (
                        <InputAdornment position="end" onClick={onIconEndClick && !loading ? handleIconEndClick : undefined}>
                                {(showSpinnerEnd || (loading && !iconStart && !iconEnd))
                                    ? <Spinner size={size} type={spinnerType} className="input__spinner"/>
                                    : iconEnd}
                        </InputAdornment>
                    )}

                    {/* Step Buttons for Number */}
                    {showSteps && (
                        <InputStepButtons onStep={handleStep}/>
                    )}
                </div>

                {/* Validation Message */}
                <FieldMessage id={messageId} className="input__message" state={visualValidation}>{displayMessage}</FieldMessage>
            </div>
        );
    }
);
Input.displayName = 'Input';

export type {InputProps, InputValidation} from './Input.types';
