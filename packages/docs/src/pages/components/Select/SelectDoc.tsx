import React from 'react';
import { DocTemplate } from "../../../components/DocTemplate.tsx";
import { apiConfig } from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
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
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default SelectDoc;