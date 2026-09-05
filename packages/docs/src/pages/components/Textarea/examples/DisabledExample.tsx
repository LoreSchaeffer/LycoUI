import {Col, Row, Textarea} from '@loreschaeffer/lyco-ui';

export const title = 'Disabled & Readonly';
export const description = 'Textareas can be disabled to prevent interaction, or made readonly to prevent editing while remaining focusable.';
export const order = 3;

export default function DisabledExample() {
    return (
        <Row>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="Disabled Textarea"
                    disabled
                    defaultValue="You cannot edit or focus me."
                />
            </Col>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="Readonly Textarea"
                    readOnly
                    defaultValue="You can focus and copy me, but not edit."
                />
            </Col>
        </Row>
    );
}

export const vanillaHtml = `
<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea is-disabled is-filled">
      <textarea id="disabled-input" class="textarea__field" disabled>You cannot edit or focus me.</textarea>
      <label class="textarea__label" for="disabled-input">Disabled Textarea</label>
    </div>
  </div>
</div>

<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea is-readonly is-filled">
      <textarea id="readonly-input" class="textarea__field" readonly>You can focus and copy me, but not edit.</textarea>
      <label class="textarea__label" for="readonly-input">Readonly Textarea</label>
    </div>
  </div>
</div>
`;
