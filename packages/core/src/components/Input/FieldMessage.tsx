import type React from 'react';
import clsx from 'clsx';
import type {FieldValidationState} from '../../interaction/field-validation';

export function FieldMessage({id, className, state, children}: {id: string; className: string; state: FieldValidationState; children: React.ReactNode}): React.ReactElement | null {
    if (!children) return null;
    return <div id={id} className={clsx(className, state === 'valid' && `${className}--valid`, state === 'invalid' && `${className}--invalid`)} role={state === 'invalid' ? 'alert' : 'status'}>{children}</div>;
}
