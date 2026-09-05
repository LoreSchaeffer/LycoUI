import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function RangeDoc() {
    return (
        <DocTemplate
            title="Range"
            description="An interactive slider component with a customizable droplet tooltip."
            importCode="import { Range } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Uses \`<input type="range">\` (slider). Keyboard accessible via Arrow keys, Page Up/Down, Home, and End. Ensures \`aria-valuemin\`, \`aria-valuemax\`, and \`aria-valuenow\` are present.`}
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
            apiConfig={apiConfig}
        />
    );
}
