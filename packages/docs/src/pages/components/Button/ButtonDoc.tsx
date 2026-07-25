import React from 'react';
import {buttonGroupPropsData, buttonPropsData} from './api';
import {CodeExample} from "../../../components/CodeExample.tsx";
import {PropsTable} from "../../../components/api-reference/ApiReference.tsx";
import VariantsExample from './examples/VariantsExample';
import variantsExampleCode from './examples/VariantsExample?raw';
import OutlinedExample from './examples/OutlinedExample';
import outlinedExampleCode from './examples/OutlinedExample?raw';
import RoundedExample from "./examples/RoundedExample.tsx";
import roundedExampleCode from "./examples/RoundedExample?raw";
import SizesExample from "./examples/SizesExample.tsx";
import sizesExampleCode from "./examples/SizesExample?raw";
import IconsExample from "./examples/IconsExample.tsx";
import iconsExampleCode from "./examples/IconsExample?raw";
import StatesExample from "./examples/StatesExample.tsx";
import statesExampleCode from "./examples/StatesExample?raw";
import GroupsExample from "./examples/GroupsExample.tsx";
import groupsExampleCode from "./examples/GroupsExample?raw";

const ButtonDoc: React.FC = () => {
    return (
        <article>
            <h1>Button</h1>
            <p className="lyco-text-lead lyco-mb-8">
                Custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, icons, and dynamic color scaling.
            </p>

            <section className="lyco-mb-10">
                <CodeExample
                    title="Color Variants"
                    description={<p>The <code>variant</code> prop dynamically maps to global theme hues and automatically calculates optimal text contrast.</p>}
                    reactCode={variantsExampleCode}
                >
                    <VariantsExample/>
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <CodeExample
                    title="Outlined Variants"
                    description={<p>Use the <code>outlined</code> prop to remove background colors and apply an inset border. Hovering inverses the colors.</p>}
                    reactCode={outlinedExampleCode}
                >
                    <OutlinedExample/>
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <CodeExample
                    title="Rounded Buttons"
                    description={<p>Use the <code>rounded</code> prop to apply a maximum border-radius. This creates a pill shape for text buttons or a perfect circle for icon-only buttons.</p>}
                    reactCode={roundedExampleCode}
                >
                    <RoundedExample/>
                </CodeExample>
            </section>

            <section className={"lyco-mb-10"}>
                <CodeExample
                    title="Size Scaling"
                    description={<p>Scale buttons proportionally using the <code>size</code> prop. Padding, font sizes, and border-radii adjust automatically.</p>}
                    reactCode={sizesExampleCode}
                >
                    <SizesExample/>
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <CodeExample
                    title="Icons"
                    description={<p>Pass React elemets to <code>iconStart</code>, <code>iconEnd</code>, or use <code>icon</code> without children to create a perfectly square icon-only button.</p>}
                    reactCode={iconsExampleCode}
                >
                    <IconsExample/>
                </CodeExample>
            </section>

            <section className={"lyco-mb-10"}>
                <CodeExample
                    title="States & Modifiers"
                    description={<p>Use the <code>flat</code> for flat colors, <code>loading</code> to show a spinner inside the button, and <code>disabled</code> to disable the button.</p>}
                    reactCode={statesExampleCode}
                >
                    <StatesExample/>
                </CodeExample>
            </section>

            <section className="lyco-mb-10">
                <CodeExample
                    title="Button Groups"
                    description={<p>Use the <code>ButtonGroup</code> component to group buttons together. It automatically applies spacing and rounded corners to the first and last buttons.</p>}
                    reactCode={groupsExampleCode}
                >
                    <GroupsExample/>
                </CodeExample>
            </section>

            <section className="lyco-mt-10">
                <h2 className="lyco-mb-2">API Reference</h2>
                <p className="lyco-text-secondary lyco-mb-6">
                    Comprehensive list of props for Button and ButtonGroup.
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
    )
        ;
};

export default ButtonDoc;