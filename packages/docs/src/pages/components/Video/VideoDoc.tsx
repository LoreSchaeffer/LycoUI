import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const VideoDoc: React.FC = () => {
    return (
        <DocTemplate
            title="Video"
            description={<p>A responsive video component for embedding iframes, HTML5 videos, and other media while maintaining a specific aspect ratio.</p>}
            importCode="import { Video } from '@loreschaeffer/lyco-ui';"
            a11yNotes={`Native \`<video>\` element. Ensure closed captions or transcripts are provided for audio content. Custom controls must be fully keyboard operable.`}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
};

export default VideoDoc;
