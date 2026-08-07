import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function AlertDoc() {
    return (
        <DocTemplate
            title="Alert"
            description="Contextual feedback messages for typical user actions, featuring icons, manual closing, and timed progress bars."
            importCode="import { Alert } from 'lyco-ui';"
            exampleModules={exampleModules}
            rawSources={rawSources as any}
            apiConfig={apiConfig}
        />
    );
}
