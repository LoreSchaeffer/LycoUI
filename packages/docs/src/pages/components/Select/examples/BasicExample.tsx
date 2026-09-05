import {useState} from 'react';
import {Col, Row, Select} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>A standard select dropdown. In Vanilla HTML, use the <code>select-custom</code> class to trigger the automatic JavaScript enhancement.</p>;
export const order = 1;

export const vanillaHtml = `
<select class="select-custom" data-variant="primary">
    <option value="" disabled selected>Select user role...</option>
    <option value="admin">Administrator</option>
    <option value="editor">Editor</option>
    <option value="viewer">Viewer</option>
    <option value="billing" disabled>Billing Contact (Disabled)</option>
</select>
`;

export default function BasicExample() {
    const [value, setValue] = useState<string | number>('');

    return (
        <Row>
            <Col span={6}>
                <div className="text-sm fw-bold mb-2 text-secondary">Assign Role</div>
                <Select
                    value={value}
                    onChange={setValue}
                    placeholder="Select user role..."
                    options={[
                        {label: 'Administrator', value: 'admin'},
                        {label: 'Editor', value: 'editor'},
                        {label: 'Viewer', value: 'viewer'},
                        {label: 'Billing Contact (Disabled)', value: 'billing', disabled: true}
                    ]}
                />
            </Col>
            <Col span={6}>
                <div className="text-sm fw-bold mb-2 text-secondary">Locked Selection</div>
                <Select
                    value="admin"
                    onChange={() => {
                    }}
                    disabled
                    options={[
                        {label: 'Administrator', value: 'admin'}
                    ]}
                />
            </Col>
        </Row>
    );
}
