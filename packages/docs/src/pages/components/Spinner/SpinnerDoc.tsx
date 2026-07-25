import React from 'react';
import {CodeExample} from '../../../components/CodeExample.tsx';
import {PropsTable} from '../../../components/api-reference/ApiReference.tsx';
import {spinnerExamples} from "./SpinnerExamples.tsx";
import {spinnerPropsData} from "./SpinnerApi.tsx";

const SpinnerDoc: React.FC = () => {
    return (
        <article>
            <h1>Spinner</h1>
            <p className="lyco-text-lead lyco-mb-8">
                Indicate the loading state of a component or page with spinners, built entirely with CSS and SVG animations.
            </p>

            <section className="lyco-mb-10">
                <h2>Types</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Choose between the <code>classic</code> rotating SVG circle with rounded stroke caps, or the <code>growing</code> CSS scaling animation.
                </p>
                <CodeExample
                    title="Animation Types"
                    reactCode={spinnerExamples.types.reactCode}
                    htmlHint="<!-- Rendered as .lyco-spinner--classic or .lyco-spinner--growing -->"
                >
                    {spinnerExamples.types.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Color Variants</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Spinners inherit the <code>currentColor</code> by default, but can be explicitly mapped to the design system's hues via the <code>variant</code> prop.
                </p>
                <CodeExample
                    title="Theme Variants"
                    reactCode={spinnerExamples.variants.reactCode}
                    htmlHint="<!-- Applies .lyco-spinner--{variant} classes -->"
                >
                    {spinnerExamples.variants.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Sizes</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Scale the spinner proportionally using the <code>size</code> prop to match surrounding typography or component dimensions.
                </p>
                <CodeExample
                    title="Size Scaling"
                    reactCode={spinnerExamples.sizes.reactCode}
                    htmlHint="<!-- Uses classes: .lyco-spinner--sm, .lyco-spinner--base, .lyco-spinner--lg -->"
                >
                    {spinnerExamples.sizes.preview}
                </CodeExample>
            </section>

            <section className="lyco-mt-10">
                <h2 className="lyco-mb-2">API Reference</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Comprehensive list of props for the Spinner component.
                </p>

                <PropsTable
                    title="Spinner Props"
                    data={spinnerPropsData}
                />
            </section>
        </article>
    );
};

export default SpinnerDoc;