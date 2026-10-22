import {FileUpload} from '@loreschaeffer/lyco-ui';

export const title = 'Multiple Files';
export const description = <p>Use the native <code>multiple</code> attribute to accept several files.</p>;
export const order = 2;
export const vanillaHtml = `<label class="fileupload" data-lyco-file-upload tabindex="0"><input class="fileupload-input" type="file" multiple><svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="margin-bottom: 1rem"><path d="M19.35 10.04A7.49 7.49 0 0 0 5.5 8.5 5.5 5.5 0 0 0 6 19h4v-2H6a3.5 3.5 0 1 1 .71-6.93l1.01.2.3-1a5.49 5.49 0 0 1 10.69 1.48l.16 1.19 1.19.16A3.5 3.5 0 0 1 19.5 19H14v-2h5.5a5.5 5.5 0 0 0-.15-6.96ZM13 14.83l2.59 2.58L17 16l-5-5-5 5 1.41 1.41L11 14.83V21h2v-6.17Z"/></svg><span class="fileupload-text">Drop files here</span></label>`;

export default function MultipleExample() {
    return (
        <FileUpload multiple>
            <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{marginBottom: '1rem'}}>
                <path d="M19.35 10.04A7.49 7.49 0 0 0 5.5 8.5 5.5 5.5 0 0 0 6 19h4v-2H6a3.5 3.5 0 1 1 .71-6.93l1.01.2.3-1a5.49 5.49 0 0 1 10.69 1.48l.16 1.19 1.19.16A3.5 3.5 0 0 1 19.5 19H14v-2h5.5a5.5 5.5 0 0 0-.15-6.96ZM13 14.83l2.59 2.58L17 16l-5-5-5 5 1.41 1.41L11 14.83V21h2v-6.17Z"/>
            </svg>
            <span className="fileupload-text">Drop files here</span>
        </FileUpload>
    );
}
