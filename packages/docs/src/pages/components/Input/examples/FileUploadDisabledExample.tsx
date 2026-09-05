import {Col, FileUpload, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Disabled State';
export const description = 'When disabled, the dropzone ignores drag-and-drop events and prevents file selection.';
export const order = 11;

export const vanillaHtml = `
<label class="fileupload is-disabled" tabindex="-1" style="--fileupload-color-base: var(--primary-500, var(--color-primary));">
  <input type="file" disabled class="sr-only" />
  <svg class="fileupload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
  <div class="fileupload__text">Upload disabled</div>
  <div class="fileupload__subtext">You do not have permission to upload</div>
</label>
`;

export default function DisabledExample() {
    return (
        <Row>
            <Col span={12}>
                <FileUpload disabled>
                    <svg className="fileupload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <div className="fileupload__text">Upload disabled</div>
                    <div className="fileupload__subtext">You do not have permission to upload</div>
                </FileUpload>
            </Col>
        </Row>
    );
}
