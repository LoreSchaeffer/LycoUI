import {DocTemplate, type ExtraSection} from '../../../components/DocTemplate';
import {apiConfig} from './api';
import {Code} from '@loreschaeffer/lyco-ui';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

const routingIntegrationSection: ExtraSection = {
    title: 'Routing Integration',
    order: 0,
    description: (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <p>
                Components like <code>Navbar.Link</code> and <code>Navbar.DropdownItem</code> are polymorphic and accept an <code>as</code> prop to seamlessly integrate with third-party routers (e.g., <code>react-router-dom</code>, Next.js) without losing base styles.
            </p>
            <div style={{padding: '1rem', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)'}}>
                <Code language="tsx" inline={false}>
                    {`import { Link } from 'react-router-dom';
import { Navbar } from '@loreschaeffer/lyco-ui';

export function NavigationExample() {
  return (
    <Navbar>
      <Navbar.Nav>
        <Navbar.Item>
          {/* Using react-router-dom Link via the 'as' prop */}
          <Navbar.Link active as={Link} to="/dashboard">
            Dashboard
          </Navbar.Link>
        </Navbar.Item>
        <Navbar.Item>
          <Navbar.DropdownItem as={Link} to="/profile">
            Profile
          </Navbar.DropdownItem>
        </Navbar.Item>
      </Navbar.Nav>
    </Navbar>
  );
}`}
                </Code>
            </div>
        </div>
    )
};

export default function NavbarDoc() {
    return (
        <DocTemplate
            title="Navbar"
            description={<p>A responsive navigation header positioned at the top of the page, containing branding, links, and actions.</p>}
            a11yNotes={`Uses the \`<nav>\` element with a clear \`aria-label\`. Interactive elements must be keyboard accessible.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
            extraSections={[routingIntegrationSection]}
        />
    );
}
