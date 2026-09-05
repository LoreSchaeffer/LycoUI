import {SnackbarProvider} from '@loreschaeffer/lyco-ui';
import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function SnackbarDoc() {
    return (
        <SnackbarProvider>
            <DocTemplate
                title="Snackbar"
                description="A floating, auto-dismissible alert for brief messages."
                importCode="import { Snackbar } from '@loreschaeffer/lyco-ui';"
                a11yNotes={`Uses \`role="status"\` (ARIA live region) to announce temporary messages without interrupting the user's workflow.`}
                exampleModules={exampleModules}
                rawSources={rawSources as Record<string, string>}
                apiConfig={apiConfig}
            />
        </SnackbarProvider>
    );
}
