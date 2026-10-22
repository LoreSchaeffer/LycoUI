import {createContext, useContext} from 'react';

export interface SidebarContextValue { isMini: boolean; }

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarContext(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('Sidebar compound components must be rendered within a Sidebar');
  return context;
}
