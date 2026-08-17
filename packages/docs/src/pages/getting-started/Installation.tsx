import './Installation.scss';
import React from 'react';
import { Code } from '@loreschaeffer/lyco-ui';

const Installation: React.FC = () => {
    return (
        <article className="docs-install">
            <h1 className="docs-install__title">
                Installation
            </h1>

            <p className="docs-install__lead">
                Step-by-step guide to install and configure Lyco UI in your project.
                Lyco UI is published on <strong>GitHub Packages</strong> under the
                {' '}<code>@loreschaeffer</code> scope.
            </p>

            {/* Prerequisites */}
            <section className="docs-install__section">
                <h2 className="docs-install__section-title">
                    Prerequisites
                </h2>

                <p className="docs-install__text">
                    Before installing Lyco UI, make sure you have the following:
                </p>

                <table className="docs-install__table">
                    <thead>
                        <tr>
                            <th>Requirement</th>
                            <th>Version</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Node.js</td>
                            <td><code>&gt;=25.0.0</code></td>
                            <td>Required for npm workspaces support</td>
                        </tr>
                        <tr>
                            <td>npm</td>
                            <td><code>&gt;=10.0.0</code></td>
                            <td>Bundled with Node.js 25+</td>
                        </tr>
                        <tr>
                            <td>GitHub Account</td>
                            <td>—</td>
                            <td>Required for accessing GitHub Packages</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Step 1: Registry */}
            <section className="docs-install__section">
                <h2 className="docs-install__section-title">
                    Setup
                </h2>

                <div className="docs-install__step-title">
                    <span className="docs-install__step-number">1</span>
                    Configure npm Registry
                </div>

                <p className="docs-install__text">
                    Create or edit a <code>.npmrc</code> file in your project root to
                    point the <code>@loreschaeffer</code> scope to GitHub Packages:
                </p>

                <Code language="ini" code={'@loreschaeffer:registry=https://npm.pkg.github.com'} />

                {/* Step 2: Authentication */}
                <div className="docs-install__step-title">
                    <span className="docs-install__step-number">2</span>
                    Authenticate with GitHub
                </div>

                <p className="docs-install__text">
                    GitHub Packages requires authentication even for public packages.
                    Run the following command and use a GitHub Personal Access Token
                    (PAT) with <code>read:packages</code> scope as your password:
                </p>

                <Code language="bash" code="npm login --registry=https://npm.pkg.github.com" />

                <div className="docs-install__note">
                    <strong>Tip:</strong> You only need to authenticate once per machine.
                    npm stores the token in your user-level <code>~/.npmrc</code>.
                    To create a PAT, go to <em>GitHub → Settings → Developer Settings →
                    Personal Access Tokens → Tokens (classic)</em> and enable the
                    {' '}<code>read:packages</code> scope.
                </div>

                {/* Step 3: Install */}
                <div className="docs-install__step-title">
                    <span className="docs-install__step-number">3</span>
                    Install the Package
                </div>

                <Code language="bash" code="npm install @loreschaeffer/lyco-ui" />
            </section>

            {/* React Setup */}
            <section className="docs-install__section">
                <h2 className="docs-install__section-title">
                    React Setup
                </h2>

                <p className="docs-install__text">
                    Import the global stylesheet once at the root of your application.
                    This loads the design tokens and all component styles.
                    Then import any component by name.
                </p>

                <Code
                    language="tsx"
                    code={`// main.tsx or App.tsx
import '@loreschaeffer/lyco-ui/style.css';
import { Button, Card, Select } from '@loreschaeffer/lyco-ui';

export const App = () => (
  <Button variant="primary">Click Me</Button>
);`}
                />
            </section>

            {/* Vanilla Setup */}
            <section className="docs-install__section">
                <h2 className="docs-install__section-title">
                    Vanilla HTML/CSS/JS Setup
                </h2>

                <p className="docs-install__text">
                    For non-React projects, include the CSS stylesheet and the vanilla
                    JS bundle. Interactive components (Select, Modal, etc.) are
                    auto-initialized on <code>DOMContentLoaded</code>.
                </p>

                <Code
                    language="html"
                    code={`<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="node_modules/@loreschaeffer/lyco-ui/dist/lyco-ui.css">
</head>
<body>

  <button class="btn btn-primary">Click Me</button>

  <script type="module" src="node_modules/@loreschaeffer/lyco-ui/dist/vanilla.es.js"></script>
</body>
</html>`}
                />

                <div className="docs-install__note">
                    <strong>Note:</strong> No build tools are required.
                    Simply write HTML with the correct CSS classes and
                    {' '}<code>data-*</code> attributes.
                    The vanilla bundle handles all interactive behavior automatically.
                </div>
            </section>

            {/* Peer Dependencies */}
            <section className="docs-install__section">
                <h2 className="docs-install__section-title">
                    Peer Dependencies
                </h2>

                <p className="docs-install__text">
                    Lyco UI declares the following peer dependencies. Your project
                    must provide these packages at the correct versions.
                </p>

                <table className="docs-install__table">
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Version</th>
                            <th>Required</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>react</code></td>
                            <td><code>^19.0.0</code></td>
                            <td>Yes (React target)</td>
                            <td>Not needed for Vanilla-only usage</td>
                        </tr>
                        <tr>
                            <td><code>react-dom</code></td>
                            <td><code>^19.0.0</code></td>
                            <td>Yes (React target)</td>
                            <td>Not needed for Vanilla-only usage</td>
                        </tr>
                        <tr>
                            <td><code>shiki</code></td>
                            <td><code>^4.0.0</code></td>
                            <td>Optional</td>
                            <td>Required only for the Code component with syntax highlighting</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </article>
    );
};

export default Installation;
