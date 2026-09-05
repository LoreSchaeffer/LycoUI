import {Code, Col, FileUpload, Row} from '@loreschaeffer/lyco-ui';
import {useState} from 'react';

export const title = 'Basic Dropzone';
export const description = 'A basic file upload area where users can drag and drop a single file or click to select.';
export const order = 9;

export const vanillaHtml = `
<label class="fileupload" tabindex="0" style="--fileupload-color-base: var(--primary-500, var(--color-primary));">
  <input type="file" class="sr-only" />
  <svg class="fileupload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
  <div class="fileupload__text">Choose a file or drag & drop it here</div>
  <div class="fileupload__subtext">JPEG, PNG, PDG, and MP4 formats, up to 50MB</div>
</label>
`;

export default function BasicExample() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <Row>
            <Col span={12}>
                <div className="d-flex flex-column gap-3">
                    <FileUpload onDropFiles={(files) => setFile(files[0] || null)}>
                        <svg className="fileupload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <div className="fileupload__text">Choose a file or drag & drop it here</div>
                        <div className="fileupload__subtext">JPEG, PNG, PDG, and MP4 formats, up to 50MB</div>
                    </FileUpload>
                    {file && (
                        <div className="text-sm text-secondary">
                            Selected file: <Code>{file.name}</Code>
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    );
}
