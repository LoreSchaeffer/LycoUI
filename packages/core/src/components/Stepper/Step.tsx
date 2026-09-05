import React, {forwardRef} from 'react';
import clsx from 'clsx';

/**
 * Props for the Step component.
 */
export interface StepProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
    /** The title of the step */
    title: React.ReactNode;
    /** An optional description for the step */
    description?: React.ReactNode;
    /** Custom icon to override the default step number */
    icon?: React.ReactNode;
    /** Indicates if the step is in an error state */
    isError?: boolean;
    /** Indicates if the step was successful */
    isSuccess?: boolean;
    /** Indicates if the step is in a warning state */
    isWarning?: boolean;
    /** Whether to hide the default numerical index inside the circle */
    hideNumbers?: boolean;
    /** The zero-based index of the step (injected automatically by Stepper) */
    index?: number;
    /** Indicates if the step is currently active (injected automatically by Stepper) */
    isActive?: boolean;
    /** Indicates if the step has been completed (injected automatically by Stepper) */
    isCompleted?: boolean;
    /** Indicates if the step is the last one in the list (injected automatically by Stepper) */
    isLast?: boolean;
}

/**
 * Step represents an individual step within a Stepper component.
 * It is meant to be used as a direct child of the Stepper.
 */
export const Step = forwardRef<HTMLLIElement, StepProps>(
    (
        {
            title,
            description,
            icon,
            isError,
            isSuccess,
            isWarning,
            hideNumbers,
            index = 0,
            isActive,
            isCompleted,
            isLast,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <li
                ref={ref}
                className={clsx(
                    'step',
                    {
                        'is-active': isActive,
                        'is-completed': isCompleted,
                        'is-error': isError,
                        'is-success': isSuccess,
                        'is-warning': isWarning,
                    },
                    className
                )}
                aria-current={isActive ? 'step' : undefined}
                {...props}
            >
                {/* Visually hidden text for screen readers when completed */}
                {isCompleted && <span className="hidden">Completed: </span>}

                <div className="step__header">
                    <div className="step__icon">
                        {icon ? icon : (!hideNumbers ? index + 1 : null)}
                    </div>
                </div>

                <div className="step__content">
                    <div className="step__title">{title}</div>
                    {description && <div className="step__description">{description}</div>}
                </div>
            </li>
        );
    }
);
Step.displayName = 'Step';
