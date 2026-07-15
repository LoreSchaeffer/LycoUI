import {useEffect, useState} from 'react';
import {createHighlighter, type Highlighter} from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

const getSharedHighlighter = (): Promise<Highlighter> => {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ['andromeeda'],
            langs: ['tsx', 'html', 'css', 'scss', 'typescript', 'javascript'],
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

    useEffect(() => {
        let isMounted = true;

        const processCode = async () => {
            try {
                const highlighter = await getSharedHighlighter();

                const html = highlighter.codeToHtml(code, {
                    lang: language,
                    theme: 'andromeeda',
                });

                if (isMounted) setHighlightedHtml(html);
            } catch (error) {
                console.error('Shiki highlighting failed:', error);
            }
        };

        processCode();

        return () => {
            isMounted = false;
        };
    }, [code, language]);

    if (!highlightedHtml) {
        return (
            <pre className="lyco-docs-code-example__pre">
                <code>{code}</code>
            </pre>
        );
    }

    return (
        <div
            className="lyco-docs-shiki-wrapper"
            dangerouslySetInnerHTML={{__html: highlightedHtml}}
        />
    );
};