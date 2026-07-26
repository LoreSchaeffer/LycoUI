import './Introduction.scss';
import React from 'react';

const Introduction: React.FC = () => {
    return (
        <article className="docs-intro">
            {/* TODO: Replace with <Typography variant="h1"> */}
            <h1 className="docs-intro__title">
                Introduction
            </h1>

            {/* TODO: Replace with <Typography variant="lead"> */}
            <p className="docs-intro__lead">
                Lyco UI is an agnostic, scalable, and performance-focused UI component library
                designed for modern 2026 web applications.
            </p>

            {/* TODO: Replace with <Section> or <Card> component */}
            <section className="docs-intro__section">
                {/* TODO: Replace with <Typography variant="h2"> */}
                <h2 className="docs-intro__section-title">
                    Installation
                </h2>

                {/* TODO: Replace with standard <Text> component */}
                <p className="docs-intro__text">
                    Install Lyco UI via your preferred package manager. Ensure you have React and ReactDOM installed as peer dependencies.
                </p>

                {/* TODO: Replace with <CodeBlock language="bash"> */}
                <pre className="docs-intro__code-block">
                    <code>
                        npm install lyco-ui
                    </code>
                </pre>
            </section>

            {/* TODO: Replace with <Section> or <Card> component */}
            <section className="docs-intro__section">
                {/* TODO: Replace with <Typography variant="h2"> */}
                <h2 className="docs-intro__section-title">
                    Usage
                </h2>

                {/* TODO: Replace with standard <Text> component */}
                <p className="docs-intro__text">
                    To use Lyco UI, you must first import the global stylesheet at the root of your application (e.g., inside <code>main.tsx</code> or <code>App.tsx</code>). This initializes the CSS variables required by all components.
                </p>

                {/* TODO: Replace with <CodeBlock language="tsx"> */}
                <pre className="docs-intro__code-block">
                    <code>
                        {`// main.tsx\nimport 'lyco-ui/dist/styles/global.css';\nimport { Button } from 'lyco-ui';\n\nexport const App = () => (\n  <Button variant="primary">Click Me</Button>\n);`}
                    </code>
                </pre>
            </section>

            {/* TODO: Replace with <Section> or <Card> component */}
            <section className="docs-intro__section docs-intro__section--last">
                {/* TODO: Replace with <Typography variant="h2"> */}
                <h2 className="docs-intro__section-title">
                    Design Philosophy
                </h2>

                {/* TODO: Replace with standard <Text> component */}
                <p className="docs-intro__text">
                    The visual language introduces a modern, depth-oriented aesthetic.
                    It leverages subtle gradients, multi-layered box-shadows, and noise textures
                    to achieve a tactile feel without relying on pure glassmorphism.
                </p>

                {/* TODO: Replace with <List> component */}
                <ul className="docs-intro__list">
                    <li className="docs-intro__list-item">
                        <strong>Depth & Textures:</strong> Heavy reliance on advanced CSS rendering.
                    </li>
                    <li className="docs-intro__list-item">
                        <strong>Rounded Geometry:</strong> Fluid, organic appearance via high border-radius.
                    </li>
                    <li className="docs-intro__list-item">
                        <strong>Flat Fallback:</strong> Built-in <code>isFlat</code> prop for solid-color rendering.
                    </li>
                    <li className="docs-intro__list-item">
                        <strong>Zero-Runtime CSS:</strong> All styling is handled via pure CSS modules and SCSS preprocessing, ensuring zero overhead at runtime.
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default Introduction;