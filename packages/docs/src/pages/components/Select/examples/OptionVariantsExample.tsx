import {useState} from 'react';
import {Col, Row, Select} from '@loreschaeffer/lyco-ui';

export const title = 'Option Variants';
export const description = <p>Individual options can have their own <code>variant</code> applied to stand out. This uses the dim variant styling by default.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="row">
  <div class="col-12 col-md-6">
    <select class="select-custom">
      <option value="draft">Draft (Normal)</option>
      <option value="published" data-variant="success">Published (Success)</option>
      <option value="archived" data-variant="danger">Archived (Danger)</option>
      <option value="review" data-variant="warning">In Review (Warning)</option>
      <option value="processing" data-variant="info">Processing (Info)</option>
    </select>
  </div>
</div>
`;

export default function OptionVariantsExample() {
    const [value, setValue] = useState<string | number>('');

    return (
        <Row>
            <Col span={6}>
                <div className="text-sm fw-bold mb-2 text-secondary">Set Document Status</div>
                <Select
                    value={value}
                    onChange={setValue}
                    placeholder="Update status..."
                    options={[
                        {label: 'Draft', value: 'draft'},
                        {label: 'Published', value: 'published', variant: 'success'},
                        {label: 'Archived', value: 'archived', variant: 'danger'},
                        {label: 'In Review', value: 'review', variant: 'warning'},
                        {label: 'Processing', value: 'processing', variant: 'info'}
                    ]}
                />
            </Col>
        </Row>
    );
}
