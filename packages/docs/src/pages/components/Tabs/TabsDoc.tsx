import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function TabsDoc() {
    return (
        <DocTemplate
            title="Tabs"
            description="A navigation component that allows users to switch between different views within the same context."
            importCode="import { Tabs, TabsList, TabTrigger, TabContent } from '@loreschaeffer/lyco-ui';"
            apiConfig={apiConfig}
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
        />
    );
}
