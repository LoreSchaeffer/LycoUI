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
                Components like <code>Sidebar.Link</code> and <code>Sidebar.DropdownItem</code> are polymorphic and accept an <code>as</code> prop to seamlessly integrate with third-party routers (e.g., <code>react-router-dom</code>, Next.js) without losing base styles.
            </p>
            <div style={{padding: '1rem', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)'}}>
                <Code language="tsx" inline={false}>
                    {`import { Link } from 'react-router-dom';
import { Sidebar } from '@loreschaeffer/lyco-ui';

export function SidebarExample() {
  return (
    <Sidebar>
      <Sidebar.Nav>
        <Sidebar.Item>
          {/* Using react-router-dom Link via the 'as' prop */}
          <Sidebar.Link active as={Link} to="/dashboard">
            Dashboard
          </Sidebar.Link>
        </Sidebar.Item>
        <Sidebar.Dropdown title="Account">
          <Sidebar.DropdownItem as={Link} to="/profile">
            Profile
          </Sidebar.DropdownItem>
        </Sidebar.Dropdown>
      </Sidebar.Nav>
    </Sidebar>
  );
}`}
                </Code>
            </div>
        </div>
    )
};

export default function SidebarDoc() {
    return (
        <DocTemplate
            title="Sidebar"
            description="A flexible, resizable, and collapsable navigation component. Use it to build complex layouts, dashboards, and mobile-friendly side menus."
            importCode="import { Sidebar } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Uses \`<aside>\` or \`<nav>\`. If collapsible, the toggle button uses \`aria-expanded\` and \`aria-controls\`. When used as a mobile drawer, focus is trapped.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
            extraSections={[routingIntegrationSection]}
        />
    );
}
