import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const CardDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Card"
            description={<p>A premium layout component with a compound architecture (Header, Body, Footer), interactive states, and semantic variants.</p>}
            a11yNotes={`Serves as a generic container. Ensure logical heading structures inside the card. If the entire card is actionable, it should be wrapped in an \`<a>\` or \`<button>\` element with appropriate focus rings.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default CardDoc;
