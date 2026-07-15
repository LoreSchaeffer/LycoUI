import React from 'react';

const Architecture: React.FC = () => {
    return (
        <article className="lyco-docs-article">
            <h1>Architecture</h1>
            <p className="lead">
                The project utilizes a strict NPM Workspace monorepo setup to decouple
                the UI library compilation from the documentation environment.
            </p>

            <section style={{ marginTop: 'var(--spacing-8, 2rem)' }}>
                <h2>Monorepo Structure</h2>
                <p>
                    The workspace strictly isolates the published library from the internal testing playground:
                </p>
                <ul style={{ lineHeight: '1.8' }}>
                    <li>
                        <strong><code>packages/core</code>:</strong> The atomic UI components.
                        Compiled via Vite 8 and Rolldown for optimal tree-shaking and performance.
                    </li>
                    <li>
                        <strong><code>packages/docs</code>:</strong> A Custom Vite SPA acting as the
                        documentation and live testing environment. It intercepts core imports via
                        development aliases to enable instant Hot Module Replacement (HMR).
                    </li>
                </ul>
            </section>

            <section style={{ marginTop: 'var(--spacing-8, 2rem)' }}>
                <h2>Tech Stack</h2>
                <ul>
                    <li><strong>Core:</strong> React 19, TypeScript 5+</li>
                    <li><strong>Styling:</strong> SCSS (Token-driven orchestration), Clsx</li>
                    <li><strong>Bundler:</strong> Vite 8 (Rolldown engine)</li>
                    <li><strong>Routing:</strong> React Router v7 (Lazy loaded routes)</li>
                </ul>
            </section>
        </article>
    );
};

export default Architecture;