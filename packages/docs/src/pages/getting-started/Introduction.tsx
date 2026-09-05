import React from 'react';
import {Alert, Badge, Code, TabContent, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TabsList, TabTrigger} from '@loreschaeffer/lyco-ui';

const Introduction: React.FC = () => {
    return (
        <article className="mb-10">
            <h1 className="mb-8">Introduction</h1>

            <Alert variant="info" className="mb-6">
                Lyco UI is an agnostic, scalable, and performance-focused UI component library
                designed for modern 2026 web applications.
            </Alert>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Installation</h2>

                <p className="text-secondary mb-6">
                    Lyco UI is hosted on <Badge variant="primary">GitHub Packages</Badge>. Before installing, configure
                    your project to use the GitHub npm registry for
                    the <Code inline language="text">@loreschaeffer</Code> scope.
                </p>

                <p className="text-secondary mb-6">
                    Create or edit <Code inline language="text">.npmrc</Code> in your project root:
                </p>

                <Code language="ini" code={'@loreschaeffer:registry=https://npm.pkg.github.com'}/>

                <p className="text-secondary mb-6 mt-6">
                    Then install the package:
                </p>

                <Tabs defaultValue="npm" className="mb-8">
                    <TabsList>
                        <TabTrigger value="npm">npm</TabTrigger>
                        <TabTrigger value="yarn">Yarn</TabTrigger>
                        <TabTrigger value="pnpm">pnpm</TabTrigger>
                    </TabsList>
                    <TabContent value="npm">
                        <Code language="bash" code="npm install @loreschaeffer/lyco-ui"/>
                    </TabContent>
                    <TabContent value="yarn">
                        <Code language="bash" code="yarn add @loreschaeffer/lyco-ui"/>
                    </TabContent>
                    <TabContent value="pnpm">
                        <Code language="bash" code="pnpm add @loreschaeffer/lyco-ui"/>
                    </TabContent>
                </Tabs>

                <p className="text-secondary mb-6">
                    For detailed setup instructions including authentication and peer dependencies,
                    see the <a href="/docs/installation">Installation</a> page.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="mt-12 mb-6">Usage</h2>

                <h3 className="mt-8 mb-4">React</h3>

                <p className="text-secondary mb-6">
                    Import the global stylesheet at the root of your application (e.g.,
                    inside <Code inline language="text">main.tsx</Code> or <Code inline language="text">App.tsx</Code>), then import components
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
                <h2 className="mt-12 mb-6">Design Philosophy</h2>

                <Alert variant="primary" className="mb-6">
                    The visual language introduces a modern, depth-oriented aesthetic.
                    It leverages subtle gradients, multi-layered box-shadows, and noise textures
                    to achieve a tactile feel without relying on pure glassmorphism.
                </Alert>

                <Table className="mt-4">
                    <thead>
                    <TableRow>
                        <TableHead>Principle</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                    </thead>
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
