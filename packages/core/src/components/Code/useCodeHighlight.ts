import {useEffect, useState} from 'react';
import {highlightCode} from './highlighter';
import {customTransformers} from '../../utils/shiki.config';

export function useCodeHighlight(code: string, language: string, theme: string, languages: string[]) {
    const [html, setHtml] = useState<string | null>(null);
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        let active = true;
        setStatus('loading');
        highlightCode({code, language, theme, languages, transformers: customTransformers}).then(result => {
            if (!active) return;
            setHtml(result);
            setStatus(result ? 'success' : 'error');
        });
        return () => { active = false; };
    }, [code, language, theme, languages]);

    return {html, status};
}
