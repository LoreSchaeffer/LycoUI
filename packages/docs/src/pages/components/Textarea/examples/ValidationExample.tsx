import {Col, Row, Textarea} from '@loreschaeffer/lyco-ui';

export const title = 'Validation States';
export const description = 'Textareas with valid and invalid states, displaying appropriate messages.';
export const order = 2;

export default function ValidationExample() {
    return (
        <Row>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="User Biography"
                    validation="valid"
                    validationMessage="Biography meets the minimum length requirement."
                    defaultValue="I am a software engineer with over 5 years of experience in front-end development..."
                />
            </Col>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="Cover Letter"
                    validation="invalid"
                    validationMessage="Cover letter cannot be empty when applying for this role."
                />
            </Col>
        </Row>
    );
}

export const vanillaHtml = `
<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea is-valid is-filled">
      <textarea id="valid-input" class="textarea__field" aria-describedby="valid-msg">This is a valid message.</textarea>
      <label class="textarea__label" for="valid-input">Valid Input</label>
    </div>
    <div id="valid-msg" class="textarea__message textarea__message--valid" role="status">Looks good!</div>
  </div>
</div>

<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea is-invalid">
      <textarea id="invalid-input" class="textarea__field" aria-invalid="true" aria-describedby="invalid-msg"></textarea>
      <label class="textarea__label" for="invalid-input">Invalid Input</label>
    </div>
    <div id="invalid-msg" class="textarea__message textarea__message--invalid" role="alert">This field is required.</div>
  </div>
</div>
`;
