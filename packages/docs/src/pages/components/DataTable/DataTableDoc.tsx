import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function DataTableDoc() {
    return (
        <DocTemplate
            title="Data Table"
            description="A premium, feature-rich data grid component supporting sorting, pagination, search filtering, row selection, and drag-and-drop reordering out of the box."
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
