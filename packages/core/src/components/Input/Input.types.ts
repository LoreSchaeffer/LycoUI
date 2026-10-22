import type {InputHTMLAttributes, ReactNode} from 'react';
import type {FullVariant, SizeVariant} from '../../types/types';
import type {SpinnerType} from '../Spinner';

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
    iconStart?: ReactNode;
    /** An icon element to display at the end (right) of the input. */
    iconEnd?: ReactNode;
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
