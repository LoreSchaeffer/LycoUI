import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const PaginationDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Pagination"
            description={<p>A navigation component that allows users to navigate through multi-page content.</p>}
            a11yNotes={`Uses a \`<nav>\` element with \`aria-label="Pagination"\`. The current page is marked with \`aria-current="page"\`. Previous and Next buttons are explicitly labeled and correctly use \`aria-disabled\`.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default PaginationDoc;
