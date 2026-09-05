import './Stepper.scss';
import React, {forwardRef} from 'react';
import clsx from 'clsx';
import type {StepProps} from './Step';
import {Step} from './Step';

/**
 * Props for the Stepper component.
 */
export interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
    /** The orientation of the stepper */
    orientation?: 'horizontal' | 'vertical';
    /** The zero-based index of the currently active step */
    activeStep?: number;
    /** If true, the stepper uses a significantly smaller visual footprint */
    compact?: boolean;
    /** If true, hides the default numerical index inside the step circles */
    hideNumbers?: boolean;
    /** Custom theme color name to override the default primary color */
    color?: string;
    /** The Step components to be rendered */
    children?: React.ReactNode;
}

/**
 * Stepper is a component that visualizes a multi-step process or wizard.
 * It automatically manages the states (active, completed) of its Step children.
 */
export const Stepper = forwardRef<HTMLOListElement, StepperProps>(
    (
        {
            orientation = 'horizontal',
            activeStep = 0,
            compact = false,
            hideNumbers = false,
            color,
            children,
            className,
            style,
            ...props
        },
        ref
    ) => {
        // Map over children to inject props
        const steps = React.Children.toArray(children).filter(React.isValidElement);

        const mappedChildren = steps.map((child, index) => {
            const childProps = (child.props || {}) as Record<string, unknown>;
            if (child.type === Step || 'title' in childProps) {
                // Determine step state
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                const isLast = index === steps.length - 1;

                const childElement = child as React.ReactElement<StepProps>;

                return React.cloneElement(childElement, {
                    index,
                    isActive,
                    isCompleted,
                    isLast,
                    hideNumbers: childElement.props.hideNumbers ?? hideNumbers,
                });
            }
            return child;
        });

        const customStyle = color
            ? {...style, '--stepper-color-base': `var(--${color}-500, var(--color-${color}))`} as React.CSSProperties
            : style;

        return (
            <ol
                ref={ref}
                className={clsx(
                    'stepper',
                    `stepper--${orientation}`,
                    compact && 'stepper--compact',
                    className
                )}
                style={customStyle}
                {...props}
            >
                {mappedChildren}
            </ol>
        );
    }
);
Stepper.displayName = 'Stepper';
