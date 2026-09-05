import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const SpinnerDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Spinner"
            description={<p>Indicate the loading state of a component or page with spinners, built entirely with crisp CSS animations. Designed with our high-end Linear-style aesthetic, featuring a subtle 2px track
                using <code>--color-border-subtle</code> and smooth easing.</p>}
            importCode="import { Spinner } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Uses \`role="status"\` and \`aria-live="polite"\` with visually hidden text (e.g., "Loading...") to announce background processes.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default SpinnerDoc;
