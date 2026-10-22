import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {query: '?raw', import: 'default', eager: true});

export default function FileUploadDoc() {
    return (
        <DocTemplate
            title="FileUpload"
            description={<p>A drag-and-drop file input that preserves native file constraints and callbacks.</p>}
            a11yNotes="The dropzone is keyboard operable and contains a native file input for form and assistive-technology support."
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
