import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const StepperDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Stepper"
            description={<p>The Stepper component displays progress through a multi-step process or wizard. It supports horizontal and vertical layouts and indicates the current, completed, and upcoming steps.</p>}
            importCode="import { Stepper } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Uses \`role="list"\` for the steps. Completed steps can be indicated with hidden text or \`aria-current="step"\` for the active step.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default StepperDoc;
