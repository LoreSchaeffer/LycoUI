import {useState} from 'react';
import {Col, Row, Select} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>A standard select dropdown. In Vanilla HTML, use the <code>select-custom</code> class to trigger the automatic JavaScript enhancement.</p>;
export const order = 1;

export const vanillaHtml = `
<select class="select-custom" data-variant="primary">
    <option value="" disabled selected>Select an option...</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3" disabled>Option 3 (Disabled)</option>
</select>
`;

export default function BasicExample() {
    const [value, setValue] = useState<string | number>('');

    return (
        <Row>
            <Col span={6}>
                <Select
                    value={value}
                    onChange={setValue}
                    options={[
                        {label: 'Option 1', value: '1'},
                        {label: 'Option 2', value: '2'},
                        {label: 'Option 3 (Disabled)', value: '3', disabled: true}
                    ]}
                />
            </Col>
            <Col span={6}>
                <Select
                    value={value}
                    onChange={setValue}
                    disabled
                    options={[
                        {label: 'Disabled Select', value: ''}
                    ]}
                />
            </Col>
        </Row>
    );
}