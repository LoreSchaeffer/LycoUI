import './FileUpload.scss';
import React, {forwardRef, useCallback, useRef, useState} from 'react';
import type {InputHTMLAttributes, DragEvent, KeyboardEvent, ChangeEvent} from 'react';
import clsx from 'clsx';
import type {FullVariant} from '../../types/types';

/**
 * Props for the FileUpload component.
 */
export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** The semantic color variant of the dropzone. */
    variant?: FullVariant;
    /** Callback fired when files are dropped or selected. */
    onDropFiles?: (files: File[]) => void;
    /** Callback fired when the drag state changes. */
    onDragStateChange?: (isDragActive: boolean) => void;
    /** Children to render inside the dropzone container. */
    children?: React.ReactNode;
}

/**
 * FileUpload component providing a drag-and-drop zone and click-to-select functionality.
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
    (
        {
            className,
            variant = 'primary',
            onDropFiles,
            onDragStateChange,
            children,
            disabled,
            multiple,
            accept,
            onChange,
            ...props
        },
        ref
    ) => {
        const innerRef = useRef<HTMLInputElement>(null);
        const [isDragActive, setIsDragActive] = useState(false);

        const mergedRef = useCallback((node: HTMLInputElement | null) => {
            (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }, [ref]);

        const handleDragEnter = useCallback((e: DragEvent<HTMLLabelElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled) return;
            setIsDragActive(true);
            onDragStateChange?.(true);
        }, [disabled, onDragStateChange]);

        const handleDragLeave = useCallback((e: DragEvent<HTMLLabelElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled) return;
            // Prevent flickering when dragging over child elements
            if (e.currentTarget.contains(e.relatedTarget as Node)) {
                return;
            }
            setIsDragActive(false);
            onDragStateChange?.(false);
        }, [disabled, onDragStateChange]);

        const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled) return;
            if (!isDragActive) {
                setIsDragActive(true);
                onDragStateChange?.(true);
            }
        }, [disabled, isDragActive, onDragStateChange]);

        const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled) return;
            setIsDragActive(false);
            onDragStateChange?.(false);

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                const filesArray = Array.from(e.dataTransfer.files);
                
                // If not multiple, only take the first file
                const selectedFiles = multiple ? filesArray : [filesArray[0]];

                onDropFiles?.(selectedFiles);
                
                // Sync to native input if needed
                if (innerRef.current) {
                    // Updating file input programmatically is restricted for security,
                    // but we can dispatch the files using DataTransfer if supported.
                    try {
                        const dataTransfer = new DataTransfer();
                        selectedFiles.forEach(file => dataTransfer.items.add(file));
                        innerRef.current.files = dataTransfer.files;
                        innerRef.current.dispatchEvent(new Event('change', {bubbles: true}));
                    } catch (err) {
                        // Ignore, fallback for browsers that don't support DataTransfer
                    }
                }
            }
        }, [disabled, multiple, onDropFiles, onDragStateChange]);

        const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const filesArray = Array.from(e.target.files);
                onDropFiles?.(filesArray);
            }
            onChange?.(e);
        }, [onChange, onDropFiles]);

        const handleKeyDown = useCallback((e: KeyboardEvent<HTMLLabelElement>) => {
            if (disabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                innerRef.current?.click();
            }
        }, [disabled]);

        return (
            <label
                className={clsx(
                    'fileupload',
                    isDragActive && 'is-drag-active',
                    disabled && 'is-disabled',
                    className
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                style={{
                    '--fileupload-color-base': `var(--${variant}-500, var(--color-${variant}))`,
                } as React.CSSProperties}
            >
                <input
                    ref={mergedRef}
                    type="file"
                    className="sr-only"
                    disabled={disabled}
                    multiple={multiple}
                    accept={accept}
                    onChange={handleChange}
                    tabIndex={-1}
                    {...props}
                />
                {children}
            </label>
        );
    }
);
FileUpload.displayName = 'FileUpload';
