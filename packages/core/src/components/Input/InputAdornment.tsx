import type {ReactNode} from 'react';

interface InputAdornmentProps {
    position: 'start' | 'end';
    children: ReactNode;
    onClick?: () => void;
}

export function InputAdornment({position, children, onClick}: InputAdornmentProps) {
    const className = `input__icon input__icon--${position}`;
    if (!onClick) return <span className={className}>{children}</span>;
    return <button type="button" className={`${className} input__icon--clickable`} onClick={onClick} aria-label="Input action">{children}</button>;
}
