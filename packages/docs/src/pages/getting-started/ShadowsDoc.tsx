import React, { useState } from 'react';
import { PiCheckBold } from 'react-icons/pi';
import './FoundationDocs.scss';

const shadowSteps = ['sm', 'md', 'subtle', 'subtle-2', 'xl'];
const glowSteps = ['primary', 'success', 'danger', 'warning'];

export const ShadowsDoc: React.FC = () => {
    return (
        <article className="docs-foundation">
            <h1 className="docs-foundation__title">Shadows & Glows</h1>
            <p className="docs-foundation__description">
                Our shadow system emphasizes borders and subtle depth rather than heavy blurs. It's built perfectly for dark mode aesthetics.
            </p>

            <section className="docs-foundation__section">
                <h2 className="docs-foundation__subtitle">Shadows</h2>
                <div className="docs-foundation__grid">
                    {shadowSteps.map(step => {
                        const cssVar = `--shadow-${step}`;
                        const [copied, setCopied] = useState(false);
                        const handleCopy = () => {
                            navigator.clipboard.writeText(`var(${cssVar})`);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        };

                        return (
                            <div
                                key={step}
                                className="docs-foundation__card docs-foundation__card--interactive"
                                onClick={handleCopy}
                                title={`Copy var(${cssVar})`}
                            >
                                <div className="docs-foundation__card-visual" style={{ minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', boxShadow: `var(${cssVar})` }} />
                                </div>
                                <div className="docs-foundation__card-info">
                                    <span className="docs-foundation__card-name">
                                        shadow-{step}
                                        {copied && <PiCheckBold style={{ marginLeft: 8, color: 'var(--color-success)' }} />}
                                    </span>
                                    <span className="docs-foundation__card-value">var({cssVar})</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="docs-foundation__section">
                <h2 className="docs-foundation__subtitle">Ambient Glows</h2>
                <p className="docs-foundation__description">
                    Used behind charts, key components, or highlights to provide a luminous effect.
                </p>
                <div className="docs-foundation__grid">
                    {glowSteps.map(step => {
                        const cssVar = `--glow-${step}`;
                        const [copied, setCopied] = useState(false);
                        const handleCopy = () => {
                            navigator.clipboard.writeText(`var(${cssVar})`);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        };

                        return (
                            <div
                                key={step}
                                className="docs-foundation__card docs-foundation__card--interactive"
                                onClick={handleCopy}
                                title={`Copy var(${cssVar})`}
                            >
                                <div className="docs-foundation__card-visual docs-foundation__card-visual--dark" style={{ minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-void)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', inset: '-50%', background: `var(${cssVar})` }} />
                                </div>
                                <div className="docs-foundation__card-info">
                                    <span className="docs-foundation__card-name">
                                        glow-{step}
                                        {copied && <PiCheckBold style={{ marginLeft: 8, color: 'var(--color-success)' }} />}
                                    </span>
                                    <span className="docs-foundation__card-value">var({cssVar})</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </article>
    );
};

export default ShadowsDoc;
