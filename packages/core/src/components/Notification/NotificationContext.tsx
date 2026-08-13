import React, { createContext, useContext } from 'react';
import type { FullVariant } from '../../types/types';

export type NotificationDuration = 'short' | 'medium' | 'long' | number;

export interface NotificationOptions {
  /** Bold heading displayed above the message. */
  title?: React.ReactNode;
  /** Body text of the notification. */
  message: React.ReactNode;
  /** Color variant. Semantic variants auto-assign an icon. */
  variant?: FullVariant | 'white';
  /** Custom icon. Overrides the auto-semantic icon if provided. Pass `null` to suppress. */
  icon?: React.ReactNode;
  /** Show the close button. Defaults to `true`. */
  closable?: boolean;
  /** Auto-dismiss duration. Named presets: short=3s, medium=5s, long=8s. Number = seconds. Defaults to 'short'. */
  duration?: NotificationDuration;
  /** Remove shadows and borders. */
  isFlat?: boolean;
}

export interface NotificationContextValue {
  /** Show a notification and return its unique ID. */
  showNotification: (options: NotificationOptions) => string;
  /** Programmatically close a notification by ID. */
  closeNotification: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

/**
 * Hook to imperatively show and close notifications.
 * Must be used inside a `<NotificationProvider>`.
 */
export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a <NotificationProvider>.');
  }
  return context;
};
