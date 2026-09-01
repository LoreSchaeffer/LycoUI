import {useEffect, useState} from 'react';
let highlighterPromise: Promise<unknown> | null = null;

const getSharedHighlighter = async (): Promise<unknown> => {
    if (!highlighterPromise) {
        highlighterPromise = import('shiki').then(({ createHighlighter }) => {
            return createHighlighter({
                themes: ['andromeeda'],
                langs: ['tsx', 'html', 'css', 'scss', 'typescript', 'javascript'],
            });
        });
    }
    return highlighterPromise;
};

export interface SyntaxHighlighterProps {
    code: string;
    language: string;
}

export const SyntaxHighlighter = ({code, language}: SyntaxHighlighterProps) => {
    const [highlightedHtml, setHighlightedHtml] = useState<string>('');
    const [highlightStatus, setHighlightStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        let isMounted = true;

        const processCode = async () => {
            try {
                setHighlightStatus('loading');
                const highlighter = await getSharedHighlighter();

                const html = highlighter.codeToHtml(code, {
                    lang: language,
                    theme: 'andromeeda',
                });

                if (isMounted) {
                    setHighlightedHtml(html);
                    setHighlightStatus('success');
                }
            } catch (error) {
                console.warn('Shiki highlighting failed or shiki is not installed:', error);
                if (isMounted) setHighlightStatus('error');
            }
        };

        processCode();

        return () => {
            isMounted = false;
        };
    }, [code, language]);

    if (!highlightedHtml || highlightStatus !== 'success') {
        return (
            <pre 
                className="docs-code-example__pre"
                style={{ color: highlightStatus === 'loading' ? 'transparent' : undefined }}
            >
                <code>{code}</code>
            </pre>
        );
    }

    return (
        <div
            className="docs-shiki-wrapper"
            dangerouslySetInnerHTML={{__html: highlightedHtml}}
        />
    );
};