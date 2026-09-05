import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const CheckboxDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Checkbox"
            description={<p>A CSS-only customizable checkbox component with accessible label bindings and theme variants.</p>}
            importCode="import { Checkbox } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Uses the native \`<input type="checkbox">\` wrapped securely with a \`<label>\`. Supports keyboard navigation (Space to toggle) and uses \`aria-checked\` and \`aria-disabled\`.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default CheckboxDoc;
