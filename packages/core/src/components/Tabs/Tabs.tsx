import './Tabs.scss';
import React, { createContext, forwardRef, useCallback, useContext, useState, useMemo } from 'react';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';
import clsx from 'clsx';

interface TabsContextValue {
  activeKey: string;
  setActiveKey: (key: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>((
  { className, defaultActiveKey = '', activeKey: controlledKey, onChange, children, ...props }, ref
) => {
  const [internalKey, setInternalKey] = useState<string>(defaultActiveKey);
  const isControlled = controlledKey !== undefined;
  const currentKey = isControlled ? controlledKey : internalKey;

  const setActiveKey = useCallback((key: string) => {
    if (!isControlled) {
      setInternalKey(key);
    }
    onChange?.(key);
  }, [isControlled, onChange]);

  const contextValue = useMemo(() => ({
    activeKey: currentKey,
    setActiveKey
  }), [currentKey, setActiveKey]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div ref={ref} className={clsx('tabs', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>((
  { className, onKeyDown, ...props }, ref
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

export interface TabTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  eventKey: string;
}

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>((
  { className, eventKey, children, disabled, onClick, ...props }, ref
) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabTrigger must be used within Tabs');

  const isActive = ctx.activeKey === eventKey;

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      ctx.setActiveKey(eventKey);
      onClick?.(e);
    }
  }, [disabled, ctx, eventKey, onClick]);

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={clsx('tabs__trigger', isActive && 'is-active', disabled && 'is-disabled', className)}
      onClick={handleClick}
      data-lyco-tab-trigger={eventKey}
      {...props}
    >
      {children}
    </button>
  );
});
TabTrigger.displayName = 'TabTrigger';

export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  eventKey: string;
}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>((
  { className, eventKey, children, ...props }, ref
) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabContent must be used within Tabs');

  const isActive = ctx.activeKey === eventKey;

  if (!isActive) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={clsx('tabs__content', className)}
      data-lyco-tab-content={eventKey}
      {...props}
    >
      {children}
    </div>
  );
});
TabContent.displayName = 'TabContent';
