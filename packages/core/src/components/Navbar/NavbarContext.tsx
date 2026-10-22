import {createContext, useContext} from 'react';

export interface NavbarContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  id: string;
}

export const NavbarContext = createContext<NavbarContextValue | null>(null);

export function useNavbarContext(): NavbarContextValue {
  const context = useContext(NavbarContext);
  if (!context) throw new Error('Navbar compound components must be rendered within a Navbar');
  return context;
}
