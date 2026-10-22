import {FileUpload} from '@loreschaeffer/lyco-ui';

export const title = 'Disabled';
export const description = <p>Disabled file uploads cannot be focused, clicked, or used as drop targets.</p>;
export const order = 3;
export const vanillaHtml = `<label class="fileupload is-disabled" data-lyco-file-upload tabindex="-1"><input class="fileupload-input" type="file" disabled><svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="margin-bottom: 1rem"><path d="M12 2a5 5 0 0 0-5 5c0 1.02.31 1.97.84 2.76A5.99 5.99 0 0 0 4 15.4C4 18.49 6.51 21 9.6 21h4.8c3.09 0 5.6-2.51 5.6-5.6a5.6 5.6 0 0 0-3.84-5.32A4.97 4.97 0 0 0 17 7a5 5 0 0 0-5-5Zm0 2a3 3 0 0 1 3 3c0 .76-.29 1.45-.77 1.97l-1.37 1.48 1.93.53A3.6 3.6 0 0 1 17.99 14.4 3.6 3.6 0 0 1 14.4 18H9.6A3.6 3.6 0 0 1 6 14.4c0-1.63 1.09-3.07 2.65-3.49l1.6-.44-.84-1.43A2.97 2.97 0 0 1 9 7a3 3 0 0 1 3-3Z"/></svg><span class="fileupload-text">Upload unavailable</span></label>`;

export default function DisabledExample() {
    return (
        <FileUpload disabled>
            <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{marginBottom: '1rem'}}>
                <path d="M12 2a5 5 0 0 0-5 5c0 1.02.31 1.97.84 2.76A5.99 5.99 0 0 0 4 15.4C4 18.49 6.51 21 9.6 21h4.8c3.09 0 5.6-2.51 5.6-5.6a5.6 5.6 0 0 0-3.84-5.32A4.97 4.97 0 0 0 17 7a5 5 0 0 0-5-5Zm0 2a3 3 0 0 1 3 3c0 .76-.29 1.45-.77 1.97l-1.37 1.48 1.93.53A3.6 3.6 0 0 1 17.99 14.4 3.6 3.6 0 0 1 14.4 18H9.6A3.6 3.6 0 0 1 6 14.4c0-1.63 1.09-3.07 2.65-3.49l1.6-.44-.84-1.43A2.97 2.97 0 0 1 9 7a3 3 0 0 1 3-3Z"/>
            </svg>
            <span className="fileupload-text">Upload unavailable</span>
        </FileUpload>
    );
}
