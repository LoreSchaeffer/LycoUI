import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const SwitchDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Switch"
            description={<p>A CSS-only customizable switch component with accessible label bindings and theme variants.</p>}
            importCode="import { Switch } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Uses \`role="switch"\` along with \`aria-checked\`. Fully operable via the \`Space\` key when focused.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default SwitchDoc;
