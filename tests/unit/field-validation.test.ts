import {describe, expect, it} from 'vitest';
import {resolveFieldValidation} from '../../packages/core/src/interaction/field-validation.ts';

describe('resolveFieldValidation', () => {
    it('waits for blur before auto validation and preserves native errors', () => {
        expect(resolveFieldValidation({mode: 'auto', hasBlurred: false, nativeValid: false, nativeMessage: 'Required'})).toEqual({state: null, message: ''});
        expect(resolveFieldValidation({mode: 'auto', hasBlurred: true, nativeValid: false, nativeMessage: 'Required'})).toEqual({state: 'invalid', message: 'Required'});
    });

    it('uses custom and explicit messages predictably', () => {
        expect(resolveFieldValidation({mode: 'auto', hasBlurred: true, nativeValid: true, nativeMessage: '', customMessage: 'Taken'})).toEqual({state: 'invalid', message: 'Taken'});
        expect(resolveFieldValidation({mode: 'valid', hasBlurred: true, nativeValid: false, nativeMessage: 'Bad', explicitMessage: 'Good'})).toEqual({state: 'valid', message: 'Good'});
    });
});
