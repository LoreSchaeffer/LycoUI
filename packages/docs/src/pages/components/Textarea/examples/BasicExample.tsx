import {Col, Row, Textarea} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Textarea';
export const description = 'A standard Textarea component with and without a floating label.';
export const order = 1;

export default function BasicExample() {
    return (
        <Row>
            <Col span={12} md={6} className="mb-4">
                <Textarea placeholder="Write a brief description of your project..."/>
            </Col>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="Project Description"
                    placeholder="Provide details about the goals, scope, and deliverables..."
                />
            </Col>
        </Row>
    );
}

export const vanillaHtml = `
<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea">
      <textarea class="textarea__field" placeholder="Write something..."></textarea>
    </div>
  </div>
</div>

<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea">
      <textarea id="msg-input" class="textarea__field" placeholder="Type your message here"></textarea>
      <label class="textarea__label" for="msg-input">Your Message</label>
    </div>
  </div>
</div>
`;
