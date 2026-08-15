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
            description={<p>Navigate through multiple pages of content with a standard list style or an interactive compact style.</p>}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default PaginationDoc;
