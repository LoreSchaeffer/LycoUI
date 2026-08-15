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
            title="DataTable"
            description={
                <p>
                    A high-level, data-driven table component with built-in search, sortable columns,
                    pagination, loading states, and optional drag-and-drop reordering. Composes the
                    existing <code>Table</code>, <code>Input</code>, <code>Select</code>,
                    <code>Pagination</code>, and <code>Spinner</code> components internally.
                </p>
            }
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
