import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';
// No specific example imports needed, handled by import.meta.glob

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function TableDoc() {
    return (
        <DocTemplate
            title="Table"
            description="Documentation and examples for the Table component, a responsive and customizable tabular data viewer."
            apiConfig={apiConfig}
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
        />
    );
}
