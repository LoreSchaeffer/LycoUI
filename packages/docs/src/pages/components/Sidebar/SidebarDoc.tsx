import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

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
        />
    );
}
