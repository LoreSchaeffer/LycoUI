import './ButtonGroup.scss';
import {forwardRef, type HTMLAttributes, type ReactNode} from 'react';
import clsx from 'clsx';
import type {Orientation} from "../../types/types.ts";

/**
 * ButtonGroupProps.
 */
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    orientation?: Orientation;
}

/**
 * ButtonGroup component.
 */
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
                orientation === 'vertical' ? 'btn-group-vertical' : 'btn-group',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

ButtonGroup.displayName = 'ButtonGroup';