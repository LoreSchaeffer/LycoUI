import React from 'react';
import {CodeExample} from "../../../components/CodeExample.tsx";
import {gridExamples} from "./GridExamples.tsx";
import {CssVarsTable, PropsTable} from "../../../components/api-reference/ApiReference.tsx";
import {colPropsData, gridCssVarsData, rowPropsData} from "./GridApi.tsx";

const GridDoc: React.FC = () => {
    return (
        <article>
            <h1>Grid System</h1>
            <p className="lyco-text-lead lyco-mb-8">
                Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, five default responsive tiers, Sass variables and mixins, and dozens of predefined classes.
            </p>

            <section className="lyco-mb-10">
                <h2>How it works</h2>
                <p className="lyco-text-secondary lyco-mb-4">
                    Lyco UI’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive.
                </p>
                <ul className="lyco-text-secondary lyco-mb-6" style={{paddingLeft: 'var(--spacing-6)'}}>
                    <li className="lyco-mb-2"><strong>Rows are wrappers for columns.</strong> Each column has horizontal padding (called a gutter) for controlling the space between them.</li>
                    <li className="lyco-mb-2"><strong>Columns are incredibly flexible.</strong> There are 12 template columns available per row, allowing you to create different combinations of elements that span any number of columns.</li>
                    <li className="lyco-mb-2"><strong>Gutters are responsive and customizable.</strong> Gutter classes are available across all breakpoints, with all the same sizes as our margin and padding spacing.</li>
                </ul>
            </section>

            <section className="lyco-mb-10">
                <h2>Auto-layout columns</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered class like <code>.lyco-col-sm-6</code>.
                </p>
                <CodeExample
                    title="Equal-width"
                    description={<p>For example, here are two grid layouts that apply to every device and viewport. Add any number of unit-less classes and every column will be the same width.</p>}
                    reactCode={gridExamples.autoLayout.reactCode}
                    htmlCode={gridExamples.autoLayout.htmlCode}
                >
                    {gridExamples.autoLayout.preview}
                </CodeExample>

                <CodeExample
                    title="Setting one column width"
                    description={<p>Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it.</p>}
                    reactCode={gridExamples.settingOneColumnWidth.reactCode}
                    htmlCode={gridExamples.settingOneColumnWidth.htmlCode}
                >
                    {gridExamples.settingOneColumnWidth.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Responsive classes</h2>
                <CodeExample
                    title="Stacked to horizontal"
                    description={<p>Using a single set of <code>md</code> props, you can create a basic grid system that starts out stacked on mobile devices and tablet devices before becoming horizontal on desktop.</p>}
                    reactCode={gridExamples.responsiveSizing.reactCode}
                    htmlCode={gridExamples.responsiveSizing.htmlCode}
                >
                    {gridExamples.responsiveSizing.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Alignment</h2>
                <CodeExample
                    title="Vertical alignment"
                    description={<p>Use the <code>align</code> prop to change the vertical alignment of columns within a row.</p>}
                    reactCode={gridExamples.alignment.reactCode}
                    htmlCode={gridExamples.alignment.htmlCode}
                >
                    {gridExamples.alignment.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Column Stretching</h2>
                <CodeExample
                    title="Stretch to match siblings"
                    description={<p>The <code>stretch</code> prop transforms the column into a flex container, automatically forcing any direct child element to grow and fill the vertical space.</p>}
                    reactCode={gridExamples.stretching.reactCode}
                    htmlCode={gridExamples.stretching.htmlCode}
                >
                    {gridExamples.stretching.preview}
                </CodeExample>
            </section>

            <section className="lyco-mt-10">
                <h2 className="lyco-mb-2">API Reference</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Comprehensive list of props and CSS classes for Grid components.
                </p>

                <PropsTable
                    title="Row Props"
                    data={rowPropsData}
                />

                <PropsTable
                    title="Col Props"
                    data={colPropsData}
                />

                <CssVarsTable
                    title="CSS Variables"
                    data={gridCssVarsData}
                />
            </section>
        </article>
    );
};

export default GridDoc;