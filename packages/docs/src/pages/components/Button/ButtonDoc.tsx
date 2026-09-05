import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const ButtonDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Button"
            description={<p>Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, icons, and dynamic color scaling.</p>}
            a11yNotes={`Uses the native \`<button>\` element. State changes (disabled, loading) are correctly reflected via the \`disabled\` attribute and \`aria-disabled\`. Loading spinners use \`aria-hidden="true"\`.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default ButtonDoc;
