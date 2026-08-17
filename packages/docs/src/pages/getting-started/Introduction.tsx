import './Introduction.scss';
import React from 'react';
import { Code } from '@loreschaeffer/lyco-ui';

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
                    Lyco UI is hosted on <strong>GitHub Packages</strong>. Before installing, configure
                    your project to use the GitHub npm registry for
                    the <code>@loreschaeffer</code> scope.
                </p>

                <p className="docs-intro__text">
                    Create or edit <code>.npmrc</code> in your project root:
                </p>

                <Code language="ini" code={'@loreschaeffer:registry=https://npm.pkg.github.com'} />

                <p className="docs-intro__text">
                    Then install the package:
                </p>

                <Code language="bash" code="npm install @loreschaeffer/lyco-ui" />

                <p className="docs-intro__text">
                    For detailed setup instructions including authentication and peer dependencies,
                    see the <a href="/docs/installation">Installation</a> page.
                </p>
            </section>

            {/* TODO: Replace with <Section> or <Card> component */}
            <section className="docs-intro__section">
                {/* TODO: Replace with <Typography variant="h2"> */}
                <h2 className="docs-intro__section-title">
                    Usage
                </h2>

                <h3 className="docs-intro__subsection-title">React</h3>

                {/* TODO: Replace with standard <Text> component */}
                <p className="docs-intro__text">
                    Import the global stylesheet at the root of your application (e.g.,
                    inside <code>main.tsx</code> or <code>App.tsx</code>), then import components
                    as needed.
                </p>

                <Code
                    language="tsx"
                    code={`// main.tsx
import '@loreschaeffer/lyco-ui/style.css';
import { Button } from '@loreschaeffer/lyco-ui';

export const App = () => (
  <Button variant="primary">Click Me</Button>
);`}
                />

                <h3 className="docs-intro__subsection-title">Vanilla HTML/CSS/JS</h3>

                {/* TODO: Replace with standard <Text> component */}
                <p className="docs-intro__text">
                    Include the CSS and JS files directly. No build tools or framework required.
                </p>

                <Code
                    language="html"
                    code={`<link rel="stylesheet" href="node_modules/@loreschaeffer/lyco-ui/dist/lyco-ui.css">
<script type="module" src="node_modules/@loreschaeffer/lyco-ui/dist/vanilla.es.js"></script>`}
                />
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