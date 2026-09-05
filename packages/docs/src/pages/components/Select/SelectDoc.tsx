import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const SelectDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Select"
            description={<p>A fully accessible custom select dropdown with support for icons, spacers, and keyboard navigation. Automatically degrades to a styled native select in Vanilla HTML environments.</p>}
            importCode="import { Select } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Custom select mimics the native \`<select>\` using \`role="listbox"\` and \`role="option"\`. Fully supports \`ArrowUp\`, \`ArrowDown\`, \`Enter\`, and \`Escape\`. The trigger has \`aria-haspopup="listbox"\`.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default SelectDoc;
