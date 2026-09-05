import {Badge, Col, FileUpload, Row} from '@loreschaeffer/lyco-ui';
import {useState} from 'react';

export const title = 'Multiple Files & Restrictions';
export const description = 'Allow multiple files to be uploaded simultaneously, restricted by file type (e.g. images only) and styled with a different color variant.';
export const order = 10;

export const vanillaHtml = `
<label class="fileupload" tabindex="0" style="--fileupload-color-base: var(--purple-500, var(--color-purple));">
  <input type="file" multiple accept="image/png, image/jpeg" class="sr-only" />
  <svg class="fileupload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
  <div class="fileupload__text">Upload Images</div>
  <div class="fileupload__subtext">PNG, JPG only</div>
</label>
`;

export default function MultipleExample() {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <Row>
            <Col span={12}>
                <div className="d-flex flex-column gap-3">
                    <FileUpload
                        variant="purple"
                        multiple
                        accept="image/png, image/jpeg"
                        onDropFiles={(droppedFiles) => setFiles((prev) => [...prev, ...droppedFiles])}
                    >
                        <svg className="fileupload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <div className="fileupload__text">Upload Images</div>
                        <div className="fileupload__subtext">PNG, JPG only</div>
                    </FileUpload>
                    {files.length > 0 && (
                        <div className="d-flex flex-wrap gap-2">
                            {files.map((file, i) => (
                                <Badge key={i} variant="purple">{file.name}</Badge>
                            ))}
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    );
}
