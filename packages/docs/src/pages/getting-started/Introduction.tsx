import React from 'react';

const Introduction: React.FC = () => {
    return (
        <article>
            {/* TODO: Replace with <Typography variant="h1"> */}
            <h1 style={{
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 800,
                marginBottom: 'var(--spacing-4)',
                color: 'var(--color-text-primary)'
            }}>
                Introduction
            </h1>

            {/* TODO: Replace with <Typography variant="lead"> */}
            <p style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: 'var(--spacing-8)'
            }}>
                Lyco UI is an agnostic, scalable, and performance-focused UI component library
                designed for modern 2026 web applications.
            </p>

            {/* TODO: Replace with <Section> or <Card> component */}
            <section style={{ marginTop: 'var(--spacing-8)' }}>
                {/* TODO: Replace with <Typography variant="h2"> */}
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 600,
                    marginBottom: 'var(--spacing-4)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-base)',
                    paddingBottom: 'var(--spacing-2)'
                }}>
                    Design Philosophy
                </h2>

                {/* TODO: Replace with standard <Text> component */}
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--spacing-4)' }}>
                    The visual language introduces a modern, depth-oriented aesthetic.
                    It leverages subtle gradients, multi-layered box-shadows, and noise textures
                    to achieve a tactile feel without relying on pure glassmorphism.
                </p>

                {/* TODO: Replace with <List> component */}
                <ul style={{
                    paddingLeft: 'var(--spacing-6)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.8
                }}>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong style={{ color: 'var(--color-text-primary)' }}>Depth & Textures:</strong> Heavy reliance on advanced CSS rendering.
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong style={{ color: 'var(--color-text-primary)' }}>Rounded Geometry:</strong> Fluid, organic appearance via high border-radius.
                    </li>
                    <li style={{ marginBottom: 'var(--spacing-2)' }}>
                        <strong style={{ color: 'var(--color-text-primary)' }}>Flat Fallback:</strong> Built-in <code style={{ backgroundColor: 'var(--color-bg-surface)', padding: '2px 6px', borderRadius: '4px' }}>isFlat</code> prop for solid-color rendering.
                    </li>
                </ul>
            </section>
        </article>
    );
};

export default Introduction;