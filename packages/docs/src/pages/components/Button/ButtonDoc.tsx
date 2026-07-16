import React from 'react';
import {CodeExample} from '../../../components/CodeExample.tsx';
import {PropsTable} from '../../../components/api-reference/ApiReference.tsx';
import {buttonExamples} from "./ButtonExamples.tsx";
import {buttonGroupPropsData, buttonPropsData} from "./ButtonApi.tsx";

const ButtonDoc: React.FC = () => {
    return (
        <article>
            <h1>Button</h1>
            <p className="lyco-text-lead lyco-mb-8">
                Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, icons, and dynamic color scaling.
            </p>

            <section className="lyco-mb-10">
                <h2>Color Variants</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Buttons inherit the high-depth, textured styling dictated by the design philosophy. The <code>variant</code> prop dynamically maps to global theme hues and automatically calculates optimal text contrast.
                </p>
                <CodeExample
                    title="Theme Colors"
                    reactCode={buttonExamples.variants.reactCode}
                    htmlCode="<!-- Auto-generated output dynamically maps to BEM classes (e.g. .lyco-btn--red) -->"
                >
                    {buttonExamples.variants.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Outlined Variants</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Use the <code>isOutlined</code> prop to remove background colors and apply an inset border. Hovering inverses the colors.
                </p>
                <CodeExample
                    title="Outlined Buttons"
                    reactCode={buttonExamples.outlined.reactCode}
                    htmlCode="<!-- Applies .lyco-btn--outlined modifier -->"
                >
                    {buttonExamples.outlined.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Rounded Variants</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Use the <code>rounded</code> prop to apply a maximum border-radius. This creates a pill shape for text buttons or a perfect circle for icon-only buttons.
                </p>
                <CodeExample
                    title="Rounded Buttons"
                    reactCode={buttonExamples.rounded.reactCode}
                    htmlCode="<!-- Applies .lyco-btn--rounded modifier -->"
                >
                    {buttonExamples.rounded.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Sizes</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Scale buttons proportionally using the <code>size</code> prop. Padding, font sizes, and border-radii adjust automatically.
                </p>
                <CodeExample
                    title="Size Scaling"
                    reactCode={buttonExamples.sizes.reactCode}
                    htmlCode="<!-- Uses classes: .lyco-btn--sm, .lyco-btn--base, .lyco-btn--lg -->"
                >
                    {buttonExamples.sizes.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Icons</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Pass React elements to <code>iconStart</code>, <code>iconEnd</code>, or use <code>icon</code> without children to create a perfectly square icon-only button.
                </p>
                <CodeExample
                    title="Icon Placement & Square Buttons"
                    reactCode={buttonExamples.icons.reactCode}
                    htmlCode="<!-- Renders internal spans for structured alignment or .lyco-btn--icon-only -->"
                >
                    {buttonExamples.icons.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>States & Modifiers</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Trigger layout changes for loading logic, disable interaction, or strip textures for a minimalist flat design.
                </p>
                <CodeExample
                    title="Flat, Loading & Disabled"
                    reactCode={buttonExamples.states.reactCode}
                    htmlCode="<!-- Applies .lyco-btn--flat, .lyco-btn--loading, or standard disabled attributes -->"
                >
                    {buttonExamples.states.preview}
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <h2>Button Group</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Group a series of buttons together on a single line or stack them in a vertical column. The <code>ButtonGroup</code> component automatically handles nested radius resets and visual separators.
                </p>
                <CodeExample
                    title="Orientation Options"
                    reactCode={buttonExamples.groups.reactCode}
                    htmlCode="<!-- Uses .lyco-btn-group wrapper modifying internal radii -->"
                >
                    {buttonExamples.groups.preview}
                </CodeExample>
            </section>

            <section className="lyco-mt-10">
                <h2 className="lyco-mb-2">API Reference</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Comprehensive list of props for Button and ButtonGroup[cite: 37].
                </p>

                <PropsTable
                    title="Button Props"
                    data={buttonPropsData}
                />

                <PropsTable
                    title="ButtonGroup Props"
                    data={buttonGroupPropsData}
                />
            </section>
        </article>
    );
};

export default ButtonDoc;