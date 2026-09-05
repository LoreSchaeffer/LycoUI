import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const BreadcrumbsDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Breadcrumbs"
            description={<p>Breadcrumbs provide hierarchical navigation, helping users understand their current location within a website or application. Includes fully composable items and separators with accessible semantic HTML.</p>}
            a11yNotes={`Uses a \`<nav aria-label="Breadcrumb">\` wrapper. Items are presented in a list (\`ol\` or \`ul\`), and the current page is marked with \`aria-current="page"\`.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default BreadcrumbsDoc;
