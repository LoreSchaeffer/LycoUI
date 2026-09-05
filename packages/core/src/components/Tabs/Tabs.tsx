import './Tabs.scss';
import React, {createContext, forwardRef, useCallback, useContext, useMemo, useState} from 'react';
import {useKeyboardNav} from '../../hooks/useKeyboardNav';
import clsx from 'clsx';
import type {SemanticVariant} from '../../types/types';

interface TabsContextValue {
    value: string;
    setValue: (key: string) => void;
    idPrefix: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Props for the Tabs component.
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** The value of the tab that should be active initially (uncontrolled mode) */
    defaultValue?: string;
    /** The value of the tab that is currently active (controlled mode) */
    value?: string;
    /** The color variant for the active tab indicator */
    color?: SemanticVariant;
    /** Callback fired when the active tab changes */
    onChange?: (value: string) => void;
}

/**
 * Tabs component.
 * A UI component for LycoUI.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>((
    {
        className,
        defaultValue = '',
        value: controlledValue,
        color = 'primary',
        onChange,
        children,
        style,
        ...props
    },
    ref
) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const idPrefix = React.useId();

    const setValue = useCallback((newValue: string) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    }, [isControlled, onChange]);

    const contextValue = useMemo(() => ({
        value: currentValue,
        setValue,
        idPrefix
    }), [currentValue, setValue, idPrefix]);

    return (
        <TabsContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={clsx('tabs', color && `tabs--${color}`, className)}
                {...props}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
});
Tabs.displayName = 'Tabs';

/**
 * Props for the TabsList component.
 */
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
}

/**
 * TabsList component.
 * A UI component for LycoUI.
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>((
    {className, onKeyDown, ...props}, ref
) => {
    const handleKeyDown = useKeyboardNav({
        horizontal: true,
        itemSelector: '[role="tab"]:not(:disabled)',
        onFocus: (item) => item.click()
    });

    return (
        <div
            ref={ref}
            className={clsx('tabs__list', className)}
            role="tablist"
            onKeyDown={(e) => {
                handleKeyDown(e);
                onKeyDown?.(e);
            }}
            {...props}
        />
    );
});
TabsList.displayName = 'TabsList';

/**
 * Props for the TabTrigger component.
 */
export interface TabTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
    /** Unique identifier for the tab, matches a TabContent value */
    value: string;
}

/**
 * TabTrigger component.
 * A UI component for LycoUI.
 */
export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>((
    {className, value, children, disabled, onClick, ...props}, ref
) => {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error('TabTrigger must be used within Tabs');

    const isActive = ctx.value === value;

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled) {
            ctx.setValue(value);
            onClick?.(e);
        }
    }, [disabled, ctx, value, onClick]);

    return (
        <button
            ref={ref}
            type="button"
            role="tab"
            id={`${ctx.idPrefix}-tab-${value}`}
            aria-controls={`${ctx.idPrefix}-panel-${value}`}
            aria-selected={isActive}
            disabled={disabled}
            className={clsx('tabs__trigger', isActive && 'is-active', disabled && 'is-disabled', className)}
            onClick={handleClick}
            data-lyco-tab-value={value}
            {...props}
        >
            {children}
        </button>
    );
});
TabTrigger.displayName = 'TabTrigger';

/**
 * Props for the TabContent component.
 */
export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Unique identifier for the tab content, matches a TabTrigger value */
    value: string;
}

/**
 * TabContent component.
 * A UI component for LycoUI.
 */
export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((
    {className, value, children, ...props}, ref
) => {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error('TabContent must be used within Tabs');

    const isActive = ctx.value === value;

    return (
        <div
            ref={ref}
            role="tabpanel"
            id={`${ctx.idPrefix}-panel-${value}`}
            aria-labelledby={`${ctx.idPrefix}-tab-${value}`}
            className={clsx('tabs__content', className)}
            data-lyco-tab-value={value}
            hidden={!isActive}
            aria-hidden={!isActive}
            style={{display: isActive ? undefined : 'none', ...props.style}}
            {...props}
        >
            {children}
        </div>
    );
});
TabContent.displayName = 'TabContent';
