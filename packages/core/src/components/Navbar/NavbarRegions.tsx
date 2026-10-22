import type React from 'react';

export function NavbarContainer({children}: {children: React.ReactNode}): React.ReactElement {
  return <div className="navbar-container">{children}</div>;
}
