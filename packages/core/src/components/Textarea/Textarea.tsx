import './Textarea.scss';
import type {TextareaHTMLAttributes} from 'react';
import React, {type CSSProperties, forwardRef, useCallback, useId, useRef} from 'react';
import clsx from 'clsx';
import type {FullVariant, SizeVariant} from '../../types/types';
import {useFieldValidation} from '../../hooks/useFieldValidation';
import {FieldLabel} from '../Input/FieldLabel';
import {FieldMessage} from '../Input/FieldMessage';
import {useInputState} from '../Input/useInputState';

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
        const {isFocused, isFilled, focus, blur, input: syncInputState} = useInputState(value, defaultValue);
        const {hasBlurred, markBlurred, validate, validation: fieldValidation} = useFieldValidation(validation, validationFn, validationMessage);

        const mergedRef = useCallback((node: HTMLTextAreaElement | null) => {
            (innerRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }, [ref]);

        const handleFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
            focus();
            onFocus?.(e);
        }, [onFocus]);

        const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
            blur();
            markBlurred();

            if (validation === 'auto') {
                validate(e.target);
            }

            onBlur?.(e);
        }, [onBlur, validation, validate]);

        const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
            syncInputState(e.target.value);

            if (validation === 'auto' && hasBlurred) {
                validate(e.target);
            }

            onChange?.(e);
        }, [onChange, validation, hasBlurred, validate]);

        const {state: visualValidation, message: displayMessage} = fieldValidation;

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

                    {label && <FieldLabel className="textarea__label" htmlFor={textareaId} label={label} required={required}/>} 
                </div>

                <FieldMessage id={messageId} className="textarea__message" state={visualValidation}>{displayMessage}</FieldMessage>
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';
