import {FileUpload} from '@loreschaeffer/lyco-ui';

export const title = 'Basic File Upload';
export const description = <p>Select a file by clicking the dropzone or dragging one onto it.</p>;
export const order = 1;
export const vanillaHtml = `<label class="fileupload" data-lyco-file-upload tabindex="0"><input class="fileupload-input" type="file"><svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="margin-bottom: 1rem"><path d="M11 17h2V9.83l2.59 2.58L17 11l-5-5-5 5 1.41 1.41L11 9.83V17Zm-6 2v2h14v-2H5Z"/></svg><span class="fileupload-text">Drop a file here</span></label>`;

export default function BasicExample() {
    return (
        <FileUpload>
            <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{marginBottom: '1rem'}}>
                <path d="M11 17h2V9.83l2.59 2.58L17 11l-5-5-5 5 1.41 1.41L11 9.83V17Zm-6 2v2h14v-2H5Z"/>
            </svg>
            <span className="fileupload-text">Drop a file here</span>
        </FileUpload>
    );
}
