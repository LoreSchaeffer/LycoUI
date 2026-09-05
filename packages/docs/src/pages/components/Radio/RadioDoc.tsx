import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const RadioDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Radio"
            description={<p>A group of mutually exclusive options where only one can be selected at a time.</p>}
            a11yNotes={`Uses native \`<input type="radio">\`. The group must be wrapped in a \`<fieldset>\` or use \`role="radiogroup"\` with an accessible name.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default RadioDoc;
