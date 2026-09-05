import './GridDoc.scss';
import React from 'react';
import {DocTemplate} from "../../../components/DocTemplate.tsx";
import {apiConfig} from "./api.tsx";

const exampleModules = import.meta.glob('./examples/*.tsx', {eager: true});
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true
});

const GridDoc: React.FC = () => {
    return (
        <DocTemplate
            title={"Grid System"}
            description={<p>A responsive 12-column grid system built on CSS Flexbox for building layouts of all shapes and sizes.</p>}
            a11yNotes="Layout grids are purely presentational and use generic DOM elements by default."
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
            extraSections={[{
                title: 'How it works',
                description: (
                    <>
                        <p className="text-secondary mb-4">
                            Lyco UI’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive.
                        </p>
                        <ul className="text-secondary mb-6" style={{paddingLeft: 'var(--spacing-6)'}}>
                            <li className="mb-2"><strong>Rows are wrappers for columns.</strong> Each column has horizontal padding (called a gutter) for controlling the space between them.</li>
                            <li className="mb-2"><strong>Columns are incredibly flexible.</strong> There are 12 template columns available per row (e.g. <code>.col--6</code>, <code>.col--md-4</code>), allowing you to create different
                                combinations of elements that span any number of columns.
                            </li>
                            <li className="mb-2"><strong>Gutters are powered by spacing tokens.</strong> The default gap uses <code>var(--spacing-4)</code> for a consistent, precise layout across the library.</li>
                        </ul>
                    </>
                ),
                order: -1
            }]}
        />
    );
};

export default GridDoc;
