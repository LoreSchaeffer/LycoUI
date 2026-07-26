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
            description={<p>Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, five default responsive tiers, Sass variables and mixins, and dozens of predefined classes.</p>}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
            extraSections={[{
                title: 'How it works',
                description: (
                    <>
                        <p className="lyco-text-secondary lyco-mb-4">
                            Lyco UI’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive.
                        </p>
                        <ul className="lyco-text-secondary lyco-mb-6" style={{paddingLeft: 'var(--spacing-6)'}}>
                            <li className="lyco-mb-2"><strong>Rows are wrappers for columns.</strong> Each column has horizontal padding (called a gutter) for controlling the space between them.</li>
                            <li className="lyco-mb-2"><strong>Columns are incredibly flexible.</strong> There are 12 template columns available per row, allowing you to create different combinations of elements that span any number of columns.</li>
                            <li className="lyco-mb-2"><strong>Gutters are responsive and customizable.</strong> Gutter classes are available across all breakpoints, with all the same sizes as our margin and padding spacing.</li>
                        </ul>
                    </>
                ),
                order: -1
            }]}
        />
    );
};

export default GridDoc;