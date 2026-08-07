import './Accordion.scss';
import React, { createContext, forwardRef, useCallback, useContext, useId, useState, useMemo } from 'react';
import clsx from 'clsx';
import type { FullVariant } from '../../types/types';

interface AccordionContextValue {
  activeKeys: string[];
  toggleKey: (key: string) => void;
  variant: FullVariant;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant?: FullVariant;
  flush?: boolean;
  allowMultiple?: boolean;
  defaultActiveKeys?: string[];
  activeKeys?: string[];
  onChange?: (keys: string[]) => void;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>((
  {
    className,
    variant = 'primary',
    flush = false,
    allowMultiple = false,
    defaultActiveKeys = [],
    activeKeys: controlledKeys,
    onChange,
    children,
    ...props
  },
  ref
) => {
  const [internalKeys, setInternalKeys] = useState<string[]>(defaultActiveKeys);
  const isControlled = controlledKeys !== undefined;
  const currentKeys = isControlled ? controlledKeys : internalKeys;

  const toggleKey = useCallback((key: string) => {
    let newKeys: string[];
    if (allowMultiple) {
      if (currentKeys.includes(key)) {
        newKeys = currentKeys.filter(k => k !== key);
      } else {
        newKeys = [...currentKeys, key];
      }
    } else {
      if (currentKeys.includes(key)) {
        newKeys = [];
      } else {
        newKeys = [key];
      }
    }

    if (!isControlled) {
      setInternalKeys(newKeys);
    }
    onChange?.(newKeys);
  }, [allowMultiple, currentKeys, isControlled, onChange]);

  const contextValue = useMemo(() => ({
    activeKeys: currentKeys,
    toggleKey,
    variant
  }), [currentKeys, toggleKey, variant]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <div 
        ref={ref}
        className={clsx(
          'accordion',
          flush && 'accordion-flush',
          `accordion-${variant}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  eventKey?: string;
  disabled?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>((
  {
    className,
    title,
    eventKey,
    disabled = false,
    children,
    ...props
  },
  ref
) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const generatedId = useId();
  const key = eventKey ?? generatedId;
  const headerId = `${key}-header`;
  const collapseId = `${key}-collapse`;
  
  const isOpen = ctx.activeKeys.includes(key);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      ctx.toggleKey(key);
    }
  }, [disabled, ctx, key]);

  return (
    <div
      ref={ref}
      className={clsx(
        'accordion__item',
        isOpen && 'is-open',
        disabled && 'is-disabled',
        className
      )}
      {...props}
    >
      <h2 className="accordion__header" id={headerId}>
        <button
          type="button"
          className="accordion__button"
          aria-expanded={isOpen}
          aria-controls={collapseId}
          disabled={disabled}
          onClick={handleToggle}
        >
          {title}
          <svg 
            className="accordion__chevron" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </h2>
      <div 
        className="accordion__collapse" 
        id={collapseId}
        aria-labelledby={headerId}
        role="region"
      >
        <div className="accordion__collapse-inner">
          <div className="accordion__body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});
AccordionItem.displayName = 'AccordionItem';
