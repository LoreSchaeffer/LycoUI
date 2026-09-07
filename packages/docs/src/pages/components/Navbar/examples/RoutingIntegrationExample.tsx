import React from 'react';
import {Col, Navbar, Row} from '@loreschaeffer/lyco-ui';
// In a real application, you would import Link from your routing library:
// import { Link } from 'react-router-dom';

// A mock Link component to demonstrate polymorphic behavior without installing react-router-dom in docs
const MockRouterLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }>(
    ({ to, children, ...props }, ref) => (
        <a ref={ref} href={to} {...props} data-routed="true">
            {children}
        </a>
    )
);
MockRouterLink.displayName = 'MockRouterLink';

export const title = 'Routing Integration';
export const description = <p>Navbar components are polymorphic and support seamless integration with external routing libraries like <code>react-router-dom</code> or <code>Next.js</code>. Pass your routing component to the <code>as</code> prop and supply routing-specific props like <code>to</code> instead of <code>href</code>.</p>;
export const order = 10;

export const vanillaHtml = `
<!-- Vanilla JS applications typically use standard anchor tags for routing,
     but the React implementation supports polymorphic integration with client-side routers -->
<nav class="navbar navbar--base navbar--expand-lg">
  <div class="navbar__container">
    <a class="navbar__brand" href="/home">LycoUI</a>
    <!-- ... -->
  </div>
</nav>
`;

export default function RoutingIntegrationExample() {
    return (
        <Row>
            <Col span={12}>
                <div style={{minHeight: '350px', display: 'flex', flexDirection: 'column', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)'}}>
                    <Navbar expand="always">
                        <Navbar.Brand as={MockRouterLink} to="/home">LycoUI</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <Navbar.Nav>
                                <Navbar.Item>
                                    <Navbar.Link as={MockRouterLink} to="/dashboard" active>Dashboard</Navbar.Link>
                                </Navbar.Item>
                                <Navbar.Item>
                                    <Navbar.Link as={MockRouterLink} to="/projects">Projects</Navbar.Link>
                                </Navbar.Item>
                                <Navbar.Dropdown title="Account">
                                    <Navbar.DropdownItem as={MockRouterLink} to="/profile">Profile</Navbar.DropdownItem>
                                    <Navbar.DropdownItem as={MockRouterLink} to="/settings">Settings</Navbar.DropdownItem>
                                </Navbar.Dropdown>
                            </Navbar.Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div style={{padding: '2rem', flex: 1, backgroundColor: 'var(--color-bg-base)'}}>
                        <p className="text-secondary">Inspect the links in this example. They use a mock router link component via the <code>as</code> prop and the <code>to</code> prop instead of standard anchors and <code>href</code>.</p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
