import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const TreeViewDoc: React.FC = () => {
    return (
        <DocTemplate
            title="TreeView"
            description={<p>A hierarchical list component following the W3C Tree pattern. Supports infinite nesting, robust keyboard navigation, and custom icons.</p>}
            importCode="import { TreeView } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Implements WAI-ARIA Tree View pattern. Uses \`role="tree"\`, \`role="treeitem"\`, and \`role="group"\`. Fully supports \`ArrowUp\`, \`ArrowDown\`, \`ArrowRight\` (expand), and \`ArrowLeft\` (collapse).`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default TreeViewDoc;
