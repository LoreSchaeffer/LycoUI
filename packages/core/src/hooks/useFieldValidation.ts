import {useCallback, useMemo, useState} from 'react';
import {resolveFieldValidation, type FieldValidationMode} from '../interaction/field-validation';

type ValidatableField = HTMLInputElement | HTMLTextAreaElement;

export function useFieldValidation(mode: FieldValidationMode, customValidator?: (value: string) => string | null, explicitMessage?: string) {
    const [hasBlurred, setHasBlurred] = useState(false);
    const [nativeValid, setNativeValid] = useState(true);
    const [nativeMessage, setNativeMessage] = useState('');
    const validate = useCallback((field: ValidatableField) => {
        const customMessage = field.checkValidity() ? customValidator?.(field.value) ?? '' : '';
        setNativeValid(field.checkValidity() && !customMessage);
        setNativeMessage(customMessage || field.validationMessage);
    }, [customValidator]);
    const validation = useMemo(() => resolveFieldValidation({mode, hasBlurred, nativeValid, nativeMessage, explicitMessage}), [explicitMessage, hasBlurred, mode, nativeMessage, nativeValid]);
    return {hasBlurred, markBlurred: () => setHasBlurred(true), validate, validation};
}
