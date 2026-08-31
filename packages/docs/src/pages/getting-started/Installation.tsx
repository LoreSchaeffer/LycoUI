import React from 'react';
import { Code, Table, TableHead, TableBody, TableRow, TableCell } from '@loreschaeffer/lyco-ui';

const Installation: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">
                Installation
            </h1>

            <p className="text-secondary mb-6">
                Step-by-step guide to install and configure Lyco UI in your project.
                Lyco UI is published on <strong>GitHub Packages</strong> under the
                {' '}<code>@loreschaeffer</code> scope.
            </p>

            {/* Prerequisites */}
            <section className="mb-10">
                <h2 className="mt-12 mb-6">
                    Prerequisites
                </h2>

                <p className="text-secondary mb-6">
                    Before installing Lyco UI, make sure you have the following:
                </p>

                <Table striped bordered hover>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Requirement</TableCell>
                            <TableCell isHeader>Version</TableCell>
                            <TableCell isHeader>Notes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Node.js</TableCell>
                            <TableCell><code>&gt;=25.0.0</code></TableCell>
                            <TableCell>Required for npm workspaces support</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>npm</TableCell>
                            <TableCell><code>&gt;=10.0.0</code></TableCell>
                            <TableCell>Bundled with Node.js 25+</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>GitHub Account</TableCell>
                            <TableCell>—</TableCell>
                            <TableCell>Required for accessing GitHub Packages</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

            {/* Step 1: Registry */}
            <section className="mb-10">
                <h2 className="mt-12 mb-6">
                    Setup
                </h2>

                <h3 className="mt-8 mb-4">
                    1. Configure npm Registry
                </h3>

                <p className="text-secondary mb-6">
                    Create or edit a <code>.npmrc</code> file in your project root to
                    point the <code>@loreschaeffer</code> scope to GitHub Packages:
                </p>

                <Code language="ini" code={'@loreschaeffer:registry=https://npm.pkg.github.com'} />

                {/* Step 2: Authentication */}
                <h3 className="mt-8 mb-4">
                    2. Authenticate with GitHub
                </h3>

                <p className="text-secondary mb-6">
                    GitHub Packages requires authentication even for public packages.
                    Run the following command and use a GitHub Personal Access Token
                    (PAT) with <code>read:packages</code> scope as your password:
                </p>

                <Code language="bash" code="npm login --registry=https://npm.pkg.github.com" />

                <div className="mt-4 mb-8 p-4 bg-surface-elevated rounded border border-subtle">
                    <strong>Tip:</strong> You only need to authenticate once per machine.
                    npm stores the token in your user-level <code>~/.npmrc</code>.
                    To create a PAT, go to <em>GitHub → Settings → Developer Settings →
                    Personal Access Tokens → Tokens (classic)</em> and enable the
                    {' '}<code>read:packages</code> scope.
                </div>

                {/* Step 3: Install */}
                <h3 className="mt-8 mb-4">
                    3. Install the Package
                </h3>

                <Code language="bash" code="npm install @loreschaeffer/lyco-ui" />
            </section>

            {/* React Setup */}
            <section className="mb-10">
                <h2 className="mt-12 mb-6">
                    React Setup
                </h2>

                <p className="text-secondary mb-6">
                    Import the global stylesheet once at the root of your application.
                    This loads the design tokens and all component styles.
                    Then import any component by name.
                </p>

                <Code
                    language="tsx"
                    code={`// main.tsx or App.tsx
import '@loreschaeffer/lyco-ui/lyco-ui.css'; // OR import '@loreschaeffer/lyco-ui/style.css';
import { Button, Card, Select } from '@loreschaeffer/lyco-ui';

export const App = () => (
  <Button variant="primary">Click Me</Button>
);`}
                />
            </section>

            {/* Vanilla Setup */}
            <section className="mb-10">
                <h2 className="mt-12 mb-6">
                    Vanilla HTML/CSS/JS Setup
                </h2>

                <p className="text-secondary mb-6">
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

                <div className="mt-4 mb-4 p-4 bg-surface-elevated rounded border border-subtle">
                    <strong>Note:</strong> No build tools are required.
                    Simply write HTML with the correct CSS classes and
                    {' '}<code>data-*</code> attributes.
                    The vanilla bundle handles all interactive behavior automatically.
                </div>
            </section>

            {/* Peer Dependencies */}
            <section className="mb-10">
                <h2 className="mt-12 mb-6">
                    Peer Dependencies
                </h2>

                <p className="text-secondary mb-6">
                    Lyco UI declares the following peer dependencies. Your project
                    must provide these packages at the correct versions.
                </p>

                <Table striped bordered hover>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Package</TableCell>
                            <TableCell isHeader>Version</TableCell>
                            <TableCell isHeader>Required</TableCell>
                            <TableCell isHeader>Notes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><code>react</code></TableCell>
                            <TableCell><code>^19.0.0</code></TableCell>
                            <TableCell>Yes (React target)</TableCell>
                            <TableCell>Not needed for Vanilla-only usage</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><code>react-dom</code></TableCell>
                            <TableCell><code>^19.0.0</code></TableCell>
                            <TableCell>Yes (React target)</TableCell>
                            <TableCell>Not needed for Vanilla-only usage</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><code>shiki</code></TableCell>
                            <TableCell><code>^4.0.0</code></TableCell>
                            <TableCell>Optional</TableCell>
                            <TableCell>Required only for the Code component with syntax highlighting</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

export default Installation;
