import type React from 'react';

export function FieldLabel({className, htmlFor, label, required}: {className: string; htmlFor: string; label: string; required?: boolean}): React.ReactElement {
    return <label className={className} htmlFor={htmlFor}>{label}{required && <span className={className.replace('__label', '__required')} aria-hidden="true"> *</span>}</label>;
}
