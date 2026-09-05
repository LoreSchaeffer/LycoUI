import {DocTemplate} from '../../../components/DocTemplate';
import {apiConfig} from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

export default function TooltipDoc() {
    return (
        <DocTemplate
            title="Tooltip"
            description="A brief, informative message that appears when a user interacts with an element."
            importCode="import { Tooltip } from '@loreschaeffer/lyco-ui';"
            apiConfig={apiConfig}
            a11yNotes={`Uses \`role="tooltip"\`. Trigger element uses \`aria-describedby\` pointing to the tooltip ID. Appears on both \`hover\` and \`focus\` events, and can be dismissed via \`Escape\`.`}
            exampleModules={exampleModules}
            rawSources={rawSources as Record<string, string>}
        />
    );
}
