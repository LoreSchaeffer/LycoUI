import React from 'react';
import '../../components/api-reference/ApiReference.scss';

export default function TypesDoc() {
    const getColorBg = (val: string) => {
        if (val === 'primary') return 'var(--color-primary)';
        if (val === 'neutral') return 'var(--slate-500)';
        if (val === 'white') return 'white';
        return `var(--${val}-500)`;
    };
    
    const getTextColor = (val: string) => {
        const lightColors = ['yellow', 'green', 'cyan', 'orange', 'teal', 'white', 'success', 'warning', 'info'];
        return lightColors.includes(val) ? 'var(--slate-950)' : 'white';
    };

    return (
        <article>
            <h1>Custom Types</h1>
            <div className="text-lead mb-8">
                <p>
                    Lyco UI uses several shared custom TypeScript types to maintain consistency across the component library.
                    Whenever a component's property accepts one of these types, it refers to the exact string literal values defined below.
                </p>
            </div>

            <section className="mb-10" id="color-variant">
                <h2 className="mb-4">ColorVariant</h2>
                <p className="text-secondary mb-4">
                    The core colors from the design system palette. These directly map to the CSS variables in the theme.
                </p>
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['primary', 'neutral', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'magenta', 'white'].map(val => (
                                <tr key={val}>
                                    <td className="td-prop"><code>'{val}'</code></td>
                                    <td className="td-description">
                                        Maps to the <code style={{ backgroundColor: getColorBg(val), color: getTextColor(val) }}>--{val}</code> theme palette color.
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-10" id="semantic-variant">
                <h2 className="mb-4">SemanticVariant</h2>
                <p className="text-secondary mb-4">
                    Semantic states used for conveying meaning (e.g. success, error, warning).
                </p>
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['success', 'warning', 'danger', 'info'].map(val => (
                                <tr key={val}>
                                    <td className="td-prop"><code>'{val}'</code></td>
                                    <td className="td-description">
                                        Maps to the <code style={{ backgroundColor: `var(--color-${val})`, color: getTextColor(val) }}>--color-{val}</code> semantic color mapping.
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-10" id="full-variant">
                <h2 className="mb-4">FullVariant</h2>
                <p className="text-secondary mb-4">
                    A union type combining both <code>ColorVariant</code> and <code>SemanticVariant</code>. Used by components that support both core palette colors and semantic states.
                </p>
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="td-prop">
                                    <code>
                                        <a href="#color-variant" style={{ color: 'inherit', textDecoration: 'underline' }}>ColorVariant</a> |{' '}
                                        <a href="#semantic-variant" style={{ color: 'inherit', textDecoration: 'underline' }}>SemanticVariant</a>
                                    </code>
                                </td>
                                <td className="td-description">Any valid string literal from the ColorVariant or SemanticVariant types.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-10" id="size-variant">
                <h2 className="mb-4">SizeVariant</h2>
                <p className="text-secondary mb-4">
                    Standard sizing scale used across interactive components like Buttons, Inputs, and Spinners.
                </p>
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="td-prop"><code>'sm'</code></td><td className="td-description">Small size, typically reducing padding and font-size.</td></tr>
                            <tr><td className="td-prop"><code>'md'</code></td><td className="td-description">Medium (default) size.</td></tr>
                            <tr><td className="td-prop"><code>'lg'</code></td><td className="td-description">Large size, increasing padding and font-size for higher prominence.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-10" id="alignment">
                <h2 className="mb-4">Alignment</h2>
                <p className="text-secondary mb-4">
                    Controls horizontal alignment of content within flex or grid containers.
                </p>
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="td-prop"><code>'start'</code></td><td className="td-description">Aligns content to the beginning of the container.</td></tr>
                            <tr><td className="td-prop"><code>'center'</code></td><td className="td-description">Centers content horizontally.</td></tr>
                            <tr><td className="td-prop"><code>'end'</code></td><td className="td-description">Aligns content to the end of the container.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-10" id="orientation">
                <h2 className="mb-4">Orientation</h2>
                <p className="text-secondary mb-4">
                    Determines the main axis for flex layouts (e.g. Button Groups).
                </p>
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="td-prop"><code>'horizontal'</code></td><td className="td-description">Lays out children side by side.</td></tr>
                            <tr><td className="td-prop"><code>'vertical'</code></td><td className="td-description">Lays out children stacked on top of one another.</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </article>
    );
}
