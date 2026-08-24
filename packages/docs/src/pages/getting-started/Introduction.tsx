import React from 'react';
import { Code } from '@loreschaeffer/lyco-ui';

const Introduction: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">
                Introduction
            </h1>

            <p className="text-secondary mb-6">
                Lyco UI is an agnostic, scalable, and performance-focused UI component library
                designed for modern 2026 web applications.
            </p>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">
                    Installation
                </h2>

                <p className="text-secondary mb-6">
                    Lyco UI is hosted on <strong>GitHub Packages</strong>. Before installing, configure
                    your project to use the GitHub npm registry for
                    the <code>@loreschaeffer</code> scope.
                </p>

                <p className="text-secondary mb-6">
                    Create or edit <code>.npmrc</code> in your project root:
                </p>

                <Code language="ini" code={'@loreschaeffer:registry=https://npm.pkg.github.com'} />

                <p className="text-secondary mb-6">
                    Then install the package:
                </p>

                <Code language="bash" code="npm install @loreschaeffer/lyco-ui" />

                <p className="text-secondary mb-6">
                    For detailed setup instructions including authentication and peer dependencies,
                    see the <a href="/docs/installation">Installation</a> page.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">
                    Usage
                </h2>

                <h3 className="mt-8 mb-4">React</h3>

                <p className="text-secondary mb-6">
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

                <h3 className="mt-8 mb-4">Vanilla HTML/CSS/JS</h3>

                <p className="text-secondary mb-6">
                    Include the CSS and JS files directly. No build tools or framework required.
                </p>

                <Code
                    language="html"
                    code={`<link rel="stylesheet" href="node_modules/@loreschaeffer/lyco-ui/dist/lyco-ui.css">
<script type="module" src="node_modules/@loreschaeffer/lyco-ui/dist/vanilla.es.js"></script>`}
                />
            </section>

            <section>
                <h2 className="mt-12 mb-6">
                    Design Philosophy
                </h2>

                <p className="text-secondary mb-6">
                    The visual language introduces a modern, depth-oriented aesthetic.
                    It leverages subtle gradients, multi-layered box-shadows, and noise textures
                    to achieve a tactile feel without relying on pure glassmorphism.
                </p>

                <ul className="text-secondary pl-6 space-y-2">
                    <li>
                        <strong>Depth & Textures:</strong> Heavy reliance on advanced CSS rendering.
                    </li>
                    <li>
                        <strong>Rounded Geometry:</strong> Fluid, organic appearance via high border-radius.
                    </li>
                    <li>
                        <strong>Flat Fallback:</strong> Built-in <code>isFlat</code> prop for solid-color rendering.
                    </li>
                    <li>
                        <strong>Zero-Runtime CSS:</strong> All styling is handled via pure CSS modules and SCSS preprocessing, ensuring zero overhead at runtime.
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default Introduction;