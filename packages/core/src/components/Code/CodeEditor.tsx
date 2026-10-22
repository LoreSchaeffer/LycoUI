import type {ChangeEvent, UIEvent} from 'react';

interface CodeEditorProps {
    code: string;
    editable: boolean;
    html: string | null;
    status: 'loading' | 'success' | 'error';
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onScroll: (event: UIEvent<HTMLTextAreaElement>) => void;
}

export function CodeEditor({code, editable, html, status, onChange, onScroll}: CodeEditorProps) {
    return <div className="code__body">
        {editable && <textarea className="code__textarea" value={code} onChange={onChange} onScroll={onScroll} spellCheck={false} aria-label="Code editor"/>}
        {html && status === 'success' ? <div className="code__highlight" dangerouslySetInnerHTML={{__html: html}} aria-hidden={editable}/> : <div className="code__highlight"><pre style={{color: status === 'loading' ? 'transparent' : undefined}}><code>{code}</code></pre></div>}
    </div>;
}
