import type {ReactNode} from 'react';

interface InputAdornmentProps {
    position: 'start' | 'end';
    children: ReactNode;
    onClick?: () => void;
}

export function InputAdornment({position, children, onClick}: InputAdornmentProps) {
    const className = `input-icon input-icon-${position}`;
    if (!onClick) return <span className={className}>{children}</span>;
    return <button type="button" className={`${className} input-icon-clickable`} onClick={onClick} aria-label="Input action">{children}</button>;
}

