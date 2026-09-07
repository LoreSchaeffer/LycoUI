import React from 'react';
import {
    Alert,
    Badge,
    Code,
    TabContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    TabsList,
    TabTrigger
} from '@loreschaeffer/lyco-ui';

const Introduction: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Introduction</h1>

            <Alert variant="info" className="mb-6">
                Lyco UI is an agnostic, scalable, and performance-focused UI component library
                designed for modern 2026 web applications.
            </Alert>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Prerequisites</h2>
                <Alert variant="warning" className="mb-6">
                    Ensure your environment meets the minimum requirements before proceeding. You must have Node.js 25.0.0+ (for npm workspaces support) and a GitHub Account to access GitHub Packages.
                </Alert>
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
                            <TableCell><Code inline language="text">&gt;=25.0.0</Code></TableCell>
                            <TableCell>Required for npm workspaces support</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>npm</TableCell>
                            <TableCell><Code inline language="text">&gt;=10.0.0</Code></TableCell>
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

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Setup</h2>

                <p className="text-secondary mb-6">
                    Lyco UI is hosted on <Badge variant="primary">GitHub Packages</Badge>. Before installing, configure
                    your project to use the GitHub npm registry for
                    the <Code inline language="text">@loreschaeffer</Code> scope.
                </p>

                <h3 className="mt-8 mb-4">1. Configure npm Registry</h3>
                <p className="text-secondary mb-6">
                    Create or edit a <Code inline language="text">.npmrc</Code> file in your project root to
                    point the <Code inline language="text">@loreschaeffer</Code> scope to GitHub Packages:
                </p>
                <Code language="ini" code={'@loreschaeffer:registry=https://npm.pkg.github.com'} />

                <h3 className="mt-8 mb-4">2. Authenticate with GitHub</h3>
                <p className="text-secondary mb-6">
                    GitHub Packages requires authentication even for public packages.
                    Run the following command and use a GitHub Personal Access Token
                    (PAT) with <Code inline language="text">read:packages</Code> scope as your password:
                </p>
                <Code language="bash" code="npm login --registry=https://npm.pkg.github.com" />

                <Alert variant="info" className="mt-4 mb-8">
                    You only need to authenticate once per machine.
                    npm stores the token in your user-level <Code inline language="text">~/.npmrc</Code>.
                    To create a PAT, go to <em>GitHub → Settings → Developer Settings →
                        Personal Access Tokens → Tokens (classic)</em> and enable the{' '}
                    <Code inline language="text">read:packages</Code> scope.
                </Alert>

                <h3 className="mt-8 mb-4">3. Install the Package</h3>
                <Tabs defaultValue="npm" className="mb-8">
                    <TabsList>
                        <TabTrigger value="npm">npm</TabTrigger>
                        <TabTrigger value="yarn">Yarn</TabTrigger>
                        <TabTrigger value="pnpm">pnpm</TabTrigger>
                    </TabsList>
                    <TabContent value="npm">
                        <Code language="bash" code="npm install @loreschaeffer/lyco-ui" />
                    </TabContent>
                    <TabContent value="yarn">
                        <Code language="bash" code="yarn add @loreschaeffer/lyco-ui" />
                    </TabContent>
                    <TabContent value="pnpm">
                        <Code language="bash" code="pnpm add @loreschaeffer/lyco-ui" />
                    </TabContent>
                </Tabs>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Usage</h2>

                <h3 className="mt-8 mb-4">React</h3>

                <p className="text-secondary mb-6">
                    Import the global stylesheet once at the root of your application (e.g.,
                    inside <Code inline language="text">main.tsx</Code> or <Code inline language="text">App.tsx</Code>).
                    This loads the design tokens and all component styles.
                    Then import any component by name.
                </p>

                <Code
                    language="tsx"
                    code={`// main.tsx or App.tsx\nimport '@loreschaeffer/lyco-ui/lyco-ui.css';\nimport { Button, Card, Select } from '@loreschaeffer/lyco-ui';\n\nexport const App = () => (\n  <Button variant="primary">Click Me</Button>\n);`}
                />

                <h3 className="mt-8 mb-4">Vanilla HTML/CSS/JS</h3>

                <p className="text-secondary mb-6">
                    For non-React projects, include the CSS stylesheet and the vanilla
                    JS bundle. Interactive components (Select, Modal, etc.) are
                    auto-initialized on <Code inline language="text">DOMContentLoaded</Code>.
                </p>

                <Code
                    language="html"
                    code={`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <link rel="stylesheet" href="node_modules/@loreschaeffer/lyco-ui/dist/lyco-ui.css">\n</head>\n<body>\n\n  <button class="btn btn-primary">Click Me</button>\n\n  <script type="module" src="node_modules/@loreschaeffer/lyco-ui/dist/vanilla.es.js"></script>\n</body>\n</html>`}
                />

                <Alert variant="info" className="mt-4 mb-4">
                    No build tools are required.
                    Simply write HTML with the correct CSS classes and{' '}
                    <Code inline language="text">data-*</Code> attributes.
                    The vanilla bundle handles all interactive behavior automatically.
                </Alert>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Peer Dependencies</h2>
                <p className="text-secondary mb-6">
                    Lyco UI declares the following peer dependencies. Your project
                    must provide these packages at the correct versions.
                </p>

                <Table bordered hover>
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
                            <TableCell><Code inline language="text">react</Code></TableCell>
                            <TableCell><Code inline language="text">^19.0.0</Code></TableCell>
                            <TableCell>Yes (React target)</TableCell>
                            <TableCell>Not needed for Vanilla-only usage</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="text">react-dom</Code></TableCell>
                            <TableCell><Code inline language="text">^19.0.0</Code></TableCell>
                            <TableCell>Yes (React target)</TableCell>
                            <TableCell>Not needed for Vanilla-only usage</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Code inline language="text">shiki</Code></TableCell>
                            <TableCell><Code inline language="text">^4.0.0</Code></TableCell>
                            <TableCell>Optional</TableCell>
                            <TableCell>Required only for the Code component with syntax highlighting</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

            <section>
                <h2 className="mt-12 mb-6">Design Philosophy</h2>

                <Alert variant="primary" className="mb-6">
                    The visual language introduces a modern, depth-oriented aesthetic.
                    It leverages subtle gradients, multi-layered box-shadows, and noise textures
                    to achieve a tactile feel without relying on pure glassmorphism.
                </Alert>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell isHeader>Principle</TableCell>
                            <TableCell isHeader>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><strong>Depth & Textures</strong></TableCell>
                            <TableCell>Heavy reliance on advanced CSS rendering.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Rounded Geometry</strong></TableCell>
                            <TableCell>Fluid, organic appearance via high border-radius.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Flat Fallback</strong></TableCell>
                            <TableCell>Built-in <Code inline language="text">isFlat</Code> prop for solid-color rendering.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><strong>Zero-Runtime CSS</strong></TableCell>
                            <TableCell>All styling is handled via pure CSS modules and SCSS preprocessing, ensuring zero overhead at runtime.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>
        </article>
    );
};

export default Introduction;
