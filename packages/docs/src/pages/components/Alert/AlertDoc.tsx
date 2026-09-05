import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
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
            a11yNotes={`Uses \`role="alert"\` for immediate screen reader announcements. If closable, the close button is explicitly labeled with \`aria-label="Close"\`.`}
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
