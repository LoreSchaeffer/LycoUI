import {Avatar, Col, Navbar, Row} from '@loreschaeffer/lyco-ui';
import {FiChevronDown, FiLogOut, FiSettings, FiUser} from 'react-icons/fi';

export const title = 'Custom Trigger (Avatar)';
export const description = <p>Use the <code>unstyled</code> prop on <code>Navbar.Dropdown</code> to replace the default trigger with a fully custom layout. This example shows a user profile trigger with an avatar, name, and a caret icon — a
    common pattern in application navbars.</p>;
export const order = 2;

export const vanillaHtml = `
<nav class="navbar navbar--base navbar--expand-lg">
  <div class="navbar__container">
    <a class="navbar__brand" href="#">LycoUI</a>
    <button type="button" class="navbar__toggle" aria-expanded="false" aria-controls="navbar-collapse-avatar">
      <span></span><span></span><span></span>
    </button>
    <div class="navbar__collapse" id="navbar-collapse-avatar">
      <div class="navbar__collapse-inner">
        <ul class="navbar__nav">
          <li class="navbar__item">
            <a class="navbar__link is-active" href="#" aria-current="page">Dashboard</a>
          </li>
          <li class="navbar__item">
            <a class="navbar__link" href="#">Projects</a>
          </li>
        </ul>
        <ul class="navbar__nav navbar__nav--align-end">
          <li class="navbar__item navbar__dropdown">
            <button type="button" class="navbar__dropdown-trigger navbar__dropdown-trigger--unstyled" aria-expanded="false" aria-haspopup="true">
              <span style="display:flex;align-items:center;gap:0.5rem;">
                <div class="avatar avatar--md avatar--circle" aria-hidden="true">
                  <div class="avatar__fallback">LR</div>
                </div>
                <span style="font-size:0.875rem;font-weight:500;color:var(--color-text-primary);">Lorenzo R.</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </button>
            <div class="navbar__dropdown-menu">
              <a href="#" class="navbar__dropdown-item">Profile</a>
              <a href="#" class="navbar__dropdown-item">Settings</a>
              <a href="#" class="navbar__dropdown-item" style="color: var(--color-danger);">Sign Out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;


const triggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-2, 0.5rem)',
};

const nameStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)' as React.CSSProperties['fontWeight'],
    color: 'var(--color-text-primary)',
};

const caretStyle: React.CSSProperties = {
    color: 'var(--color-text-secondary)',
    transition: 'transform var(--duration-fast) var(--ease-default)',
    flexShrink: 0,
};

function AvatarTrigger({isOpen}: { isOpen?: boolean }) {
    return (
        <span style={triggerStyle}>
      <Avatar fallback="RA" size="md" aria-hidden="true"/>
      <span style={nameStyle}>Ricky A.</span>
      <FiChevronDown
          size={16}
          style={{
              ...caretStyle,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
      />
    </span>
    );
}

export default function AvatarTriggerExample() {
    return (
        <Row>
            <Col span={12}>
                <div style={{height: '300px', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}>
                    <Navbar expand="always">
                        <Navbar.Brand href="#">LycoUI</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item>
                                    <Navbar.Link href="#" active>Dashboard</Navbar.Link>
                                </Navbar.Item>
                                <Navbar.Item>
                                    <Navbar.Link href="#">Projects</Navbar.Link>
                                </Navbar.Item>
                            </Navbar.Nav>
                            <Navbar.Nav align="end">
                                <Navbar.Dropdown
                                    unstyled
                                    title={<AvatarTrigger/>}
                                >
                                    <Navbar.DropdownItem href="#">
                                        <FiUser size={14} style={{marginRight: 'var(--spacing-2, 0.5rem)', opacity: 0.7}}/>
                                        Profile
                                    </Navbar.DropdownItem>
                                    <Navbar.DropdownItem href="#">
                                        <FiSettings size={14} style={{marginRight: 'var(--spacing-2, 0.5rem)', opacity: 0.7}}/>
                                        Settings
                                    </Navbar.DropdownItem>
                                    <Navbar.DropdownItem href="#" style={{color: 'var(--color-danger)'}}>
                                        <FiLogOut size={14} style={{marginRight: 'var(--spacing-2, 0.5rem)', opacity: 0.7}}/>
                                        Sign Out
                                    </Navbar.DropdownItem>
                                </Navbar.Dropdown>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div style={{padding: '2rem', flex: 1, backgroundColor: 'var(--color-bg-base)'}}>
                        <p className="text-secondary">Click the avatar above to open the user menu.</p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
