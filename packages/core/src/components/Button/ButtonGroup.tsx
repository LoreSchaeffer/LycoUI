import './ButtonGroup.scss';
import {forwardRef, type HTMLAttributes, type ReactNode} from 'react';
import clsx from 'clsx';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    orientation?: 'horizontal' | 'vertical';
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((
    {
        children,
        orientation = 'horizontal',
        className,
        ...props
    }, ref) => {
    return (
        <div
            ref={ref}
            role="group"
            className={clsx(
                'lyco-btn-group',
                `lyco-btn-group--${orientation}`,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

ButtonGroup.displayName = 'ButtonGroup';