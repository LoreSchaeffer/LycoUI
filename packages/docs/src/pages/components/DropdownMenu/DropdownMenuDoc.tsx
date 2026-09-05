import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const DropdownMenuDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Dropdown Menu"
            description={<p>Displays a menu to the user—such as a set of actions or functions—triggered by a button.</p>}
            a11yNotes={`Uses standard ARIA roles (menu, menuitem). Keyboard navigation (Arrow keys, Enter, Space, Escape) is fully supported.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default DropdownMenuDoc;
