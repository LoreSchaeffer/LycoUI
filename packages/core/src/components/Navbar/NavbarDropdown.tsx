import type React from 'react';

export function NavbarDropdownCaret({direction = 'down'}: {direction?: 'down' | 'right'}): React.ReactElement {
  const points = direction === 'right' ? '9 18 15 12 9 6' : '6 9 12 15 18 9';
  return <svg className="navbar-dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points={points}/></svg>;
}
