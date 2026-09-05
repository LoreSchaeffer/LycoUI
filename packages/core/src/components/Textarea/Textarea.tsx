import './Textarea.scss';
import type {TextareaHTMLAttributes} from 'react';
import React, {type CSSProperties, forwardRef, useCallback, useEffect, useId, useRef, useState} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types';

/**
 * TextareaValidation state options.
 */
export type TextareaValidation = 'disabled' | 'auto' | 'valid' | 'invalid';

/**
 * Resize options for the textarea.
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Props for the Textarea component.
 */
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /** The semantic color variant of the textarea. */
    variant?: FullVariant;
    /** The size of the textarea (sm, md, lg). Default is 'md'. */
    size?: SizeVariant;
    /** Label text for the textarea. Will float if the textarea has a value. */
    label?: string;
    /** The validation state of the textarea ('valid', 'invalid', 'auto', 'disabled'). */
    validation?: TextareaValidation;
    /** A custom validation function that returns an error message string or null. */
    validationFn?: (value: string) => string | null;
    /** A static validation message to display. */
    validationMessage?: string;
    /** If true, renders a flat version of the textarea without borders. */
    flat?: boolean;
    /** Controls the resizability of the textarea. */
    resize?: TextareaResize;
}

/**
 * Textarea component.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            label,
            validation = 'disabled',
            validationFn,
            validationMessage,
            flat = false,
            resize = 'both',
            disabled,
            readOnly,
            value,
            defaultValue,
            onChange,
            onBlur,
            onFocus,
            id,
            style,
            required,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const textareaId = id ?? generatedId;
        const messageId = `${textareaId}-message`;

        const innerRef = useRef<HTMLTextAreaElement>(null);
        const [isFocused, setIsFocused] = useState(false);
        const [isFilled, setIsFilled] = useState(
            () => Boolean(value !== undefined ? value : defaultValue)
        );
        const [autoValidationState, setAutoValidationState] = useState<'valid' | 'invalid' | null>(null);
        const [autoValidationMessage, setAutoValidationMessage] = useState<string>('');
        const [hasBlurred, setHasBlurred] = useState(false);

        const mergedRef = useCallback((node: HTMLTextAreaElement | null) => {
            (innerRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }, [ref]);

        useEffect(() => {
            if (value !== undefined) {
                setIsFilled(String(value).length > 0);
            }
        }, [value]);

        const runAutoValidation = useCallback((textareaEl: HTMLTextAreaElement) => {
            const nativeValid = textareaEl.checkValidity();
            if (!nativeValid) {
                setAutoValidationState('invalid');
                setAutoValidationMessage(textareaEl.validationMessage);
                return;
            }

            if (validationFn) {
                const customError = validationFn(textareaEl.value);
                if (customError) {
                    setAutoValidationState('invalid');
                    setAutoValidationMessage(customError);
                    return;
                }
            }

            setAutoValidationState('valid');
            setAutoValidationMessage('');
        }, [validationFn]);

        const handleFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(true);
            onFocus?.(e);
        }, [onFocus]);

        const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(false);
            setHasBlurred(true);

            if (validation === 'auto') {
                runAutoValidation(e.target);
            }

            onBlur?.(e);
        }, [onBlur, validation, runAutoValidation]);

        const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setIsFilled(e.target.value.length > 0);

            if (validation === 'auto' && hasBlurred) {
                runAutoValidation(e.target);
            }

            onChange?.(e);
        }, [onChange, validation, hasBlurred, runAutoValidation]);

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

        return (
            <div className="textarea-wrapper" style={style}>
                <div
                    className={clsx(
                        'textarea',
                        size && size !== 'md' && `textarea--${size}`,
                        flat && 'textarea--flat',
                        isFocused && 'is-focused',
                        isFilled && 'is-filled',
                        disabled && 'is-disabled',
                        readOnly && 'is-readonly',
                        visualValidation === 'valid' && 'is-valid',
                        visualValidation === 'invalid' && 'is-invalid',
                        `textarea--resize-${resize}`,
                        className
                    )}
                    style={{
                        '--textarea-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                    } as CSSProperties}
                >
                    <textarea
                        ref={mergedRef}
                        id={textareaId}
                        className="textarea__field"
                        disabled={disabled}
                        readOnly={readOnly}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required={required}
                        aria-invalid={visualValidation === 'invalid' ? true : undefined}
                        aria-describedby={displayMessage ? messageId : undefined}
                        {...props}
                    />

                    {label && (
                        <label className="textarea__label" htmlFor={textareaId}>
                            {label}
                            {required && <span className="textarea__required" aria-hidden="true"> *</span>}
                        </label>
                    )}
                </div>

                {displayMessage && (
                    <div
                        id={messageId}
                        className={clsx(
                            'textarea__message',
                            visualValidation === 'valid' && 'textarea__message--valid',
                            visualValidation === 'invalid' && 'textarea__message--invalid'
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
Textarea.displayName = 'Textarea';
