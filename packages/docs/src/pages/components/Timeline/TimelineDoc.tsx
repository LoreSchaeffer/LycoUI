import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const TimelineDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Timeline"
            description={<p>The Timeline component displays a list of events in chronological order. It supports vertical and horizontal orientations, as well as alternating alignments for vertical timelines.</p>}
            importCode="import { Timeline } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Uses a semantic list (\`<ul>\` or \`<ol>\`). Events are presented in logical chronological order. Icons are hidden via \`aria-hidden="true"\` if purely decorative.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default TimelineDoc;
