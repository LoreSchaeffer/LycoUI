import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function ContextMenuDoc() {
    return (
        <DocTemplate
            title="Context Menu"
            description={<p>A global, highly-advanced context menu system utilizing React Context and Portals. It supports infinite recursion for submenus, smart edge-collision detection, and keyboard accessibility.</p>}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
