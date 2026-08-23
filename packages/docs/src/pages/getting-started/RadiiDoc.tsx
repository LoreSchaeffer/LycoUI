import React, { useState } from 'react';
import { PiCheckBold } from 'react-icons/pi';
import './FoundationDocs.scss';

const radiiSteps = ['sm', 'md', 'xl', '2xl', 'full'];

export const RadiiDoc: React.FC = () => {
    return (
        <article className="docs-foundation">
            <h1 className="docs-foundation__title">Border Radius</h1>
            <p className="docs-foundation__description">
                Our radii scale applies subtle rounding to components for a softer, premium aesthetic while maintaining a sharp overall geometry.
            </p>

            <section className="docs-foundation__section">
                <div className="docs-foundation__grid">
                    {radiiSteps.map(step => {
                        const cssVar = `--radius-${step}`;
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
                                    <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-primary)', borderRadius: `var(${cssVar})` }} />
                                </div>
                                <div className="docs-foundation__card-info">
                                    <span className="docs-foundation__card-name">
                                        radius-{step}
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

export default RadiiDoc;
