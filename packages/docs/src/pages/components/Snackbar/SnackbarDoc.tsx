import {SnackbarProvider} from 'lyco-ui';
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
                exampleModules={exampleModules}
                rawSources={rawSources as any}
                apiConfig={apiConfig as any}
            />
        </SnackbarProvider>
    );
}
