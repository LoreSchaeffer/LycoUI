import {useState} from 'react';
import {Col, Row, Select} from '@loreschaeffer/lyco-ui';

export const title = 'Option Variants';
export const description = <p>Individual options can have their own <code>variant</code> applied to stand out. This uses the dim variant styling by default.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="row">
  <div class="col-12 col-md-6">
    <select class="select-custom">
      <option value="1">Normal Option</option>
      <option value="2" data-variant="success">Success Option</option>
      <option value="3" data-variant="danger">Danger Option</option>
      <option value="4" data-variant="warning">Warning Option</option>
      <option value="5" data-variant="info">Info Option</option>
    </select>
  </div>
</div>
`;

export default function OptionVariantsExample() {
    const [value, setValue] = useState<string | number>('');

    return (
        <Row>
            <Col span={6}>
                <Select
                    value={value}
                    onChange={setValue}
                    options={[
                        {label: 'Normal Option', value: '1'},
                        {label: 'Success Option', value: '2', variant: 'success'},
                        {label: 'Danger Option', value: '3', variant: 'danger'},
                        {label: 'Warning Option', value: '4', variant: 'warning'},
                        {label: 'Info Option', value: '5', variant: 'info'}
                    ]}
                />
            </Col>
        </Row>
    );
}
