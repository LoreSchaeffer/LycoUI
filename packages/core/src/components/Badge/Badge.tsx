import './Badge.scss';
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import type { FullVariant } from '../../types/types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The visual style of the badge.
   * @default 'primary'
   */
  variant?: FullVariant | 'white' | 'neutral';
  
  /**
   * Use fully rounded borders for a pill-like appearance.
   * @default false
   */
  pill?: boolean;

  /**
   * Use a subtle dimmed background color instead of a solid color.
   * @default false
   */
  dim?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((
  { 
    className, 
    variant = 'primary', 
    pill = false, 
    dim = false, 
    children, 
    ...props 
  }, 
  ref
) => {
  return (
    <span
      ref={ref}
      className={clsx(
        'badge',
        `badge-${variant}`,
        pill && 'badge-pill',
        dim && 'badge-dim',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
