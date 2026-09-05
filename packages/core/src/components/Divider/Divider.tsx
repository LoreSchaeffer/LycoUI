import React, {forwardRef, memo} from 'react';
import clsx from 'clsx';
import './Divider.scss';

/**
 * DividerProps.
 */
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
    /**
     * The orientation of the divider.
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Determines the margin around the line.
     * @default 'md'
     */
    spacing?: 'none' | 'sm' | 'md' | 'lg';
    /**
     * Determines the size of the line itself.
     * @default 'full'
     */
    length?: 'sm' | 'md' | 'lg' | 'full';
    /**
     * Custom color for the divider.
     */
    color?: string;
    /**
     * Thickness of the divider.
     * @default '1px'
     */
    thickness?: string | number;
}

/**
 * Divider component.
 */
export const Divider = memo(forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(({
                                                                                          orientation = 'horizontal',
                                                                                          spacing = 'md',
                                                                                          length = 'full',
                                                                                          color,
                                                                                          thickness = '1px',
                                                                                          className,
                                                                                          style,
                                                                                          ...props
                                                                                      }, ref) => {
    const Component = orientation === 'horizontal' ? 'hr' : 'div';

    return (
        <Component
            ref={ref as React.Ref<HTMLHRElement & HTMLDivElement>}
            role="separator"
            aria-orientation={orientation}
            className={clsx(
                'divider',
                `divider--${orientation}`,
                `divider--spacing-${spacing}`,
                `divider--length-${length}`,
                className
            )}
            style={{
                '--divider-thickness': typeof thickness === 'number' ? `${thickness}px` : thickness,
                ...(color ? {'--divider-color': color} : {}),
                ...style
            } as React.CSSProperties}
            {...props}
        />
    );
}));

Divider.displayName = 'Divider';



