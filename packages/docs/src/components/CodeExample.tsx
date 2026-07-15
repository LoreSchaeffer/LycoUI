import './CodeExample.scss';
import React, {useCallback, useState} from 'react';
import {FiCheck, FiCopy} from 'react-icons/fi';
import clsx from 'clsx';
import {SyntaxHighlighter} from "./syntax/SyntaxHighlighter.tsx";

export interface CodeExampleProps {
    title: string;
    description?: React.ReactNode;
    reactCode: string;
    htmlCode: string;
    children: React.ReactNode;
}

export const CodeExample: React.FC<CodeExampleProps> = ({
                                                            title,
                                                            description,
                                                            reactCode,
                                                            htmlCode,
                                                            children
                                                        }) => {
    const [activeTab, setActiveTab] = useState<'react' | 'html'>('react');
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const activeCode = activeTab === 'react' ? reactCode.trim() : htmlCode.trim();

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(activeCode);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy code to clipboard', error);
        }
    }, [activeCode]);

    return (
        <section className="lyco-docs-code-example">
            <h3 className="lyco-docs-code-example__title">{title}</h3>

            {description && (
                <div className="lyco-docs-code-example__description">
                    {description}
                </div>
            )}

            <div className="lyco-docs-code-example__preview">
                {children}
            </div>

            <div className="lyco-docs-code-example__toolbar">
                <div className="lyco-docs-code-example__tabs">
                    <button
                        type="button"
                        className={clsx('lyco-docs-code-example__tab', activeTab === 'react' && 'is-active')}
                        onClick={() => setActiveTab('react')}
                        aria-pressed={activeTab === 'react'}
                    >
                        React
                    </button>
                    <button
                        type="button"
                        className={clsx('lyco-docs-code-example__tab', activeTab === 'html' && 'is-active')}
                        onClick={() => setActiveTab('html')}
                        aria-pressed={activeTab === 'html'}
                    >
                        HTML
                    </button>
                </div>

                <button
                    type="button"
                    className="lyco-docs-code-example__copy"
                    onClick={handleCopy}
                    aria-label="Copy code to clipboard"
                    title="Copy code"
                >
                    {isCopied ? <FiCheck className="lyco-text-success"/> : <FiCopy/>}
                </button>
            </div>

            <div className="lyco-docs-code-example__code-wrapper">
                <SyntaxHighlighter
                    code={activeCode}
                    language={activeTab === 'react' ? 'tsx' : 'html'}
                />
            </div>
        </section>
    );
};