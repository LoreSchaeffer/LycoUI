export type FieldValidationMode = 'disabled' | 'auto' | 'valid' | 'invalid';
export type FieldValidationState = 'valid' | 'invalid' | null;

export interface FieldValidationInput {
    mode: FieldValidationMode;
    hasBlurred: boolean;
    nativeValid: boolean;
    nativeMessage: string;
    customMessage?: string | null;
    explicitMessage?: string;
}

export interface FieldValidationResult {
    state: FieldValidationState;
    message: string;
}

/** Resolves native, custom, and explicit validation without coupling to a view. */
export function resolveFieldValidation(input: FieldValidationInput): FieldValidationResult {
    if (input.mode === 'disabled') return {state: null, message: ''};
    if (input.mode === 'valid') return {state: 'valid', message: input.explicitMessage ?? ''};
    if (input.mode === 'invalid') return {state: 'invalid', message: input.explicitMessage ?? ''};
    if (!input.hasBlurred) return {state: null, message: input.explicitMessage ?? ''};
    const message = !input.nativeValid ? input.nativeMessage : input.customMessage ?? '';
    return {state: message ? 'invalid' : 'valid', message: input.explicitMessage ?? message};
}
