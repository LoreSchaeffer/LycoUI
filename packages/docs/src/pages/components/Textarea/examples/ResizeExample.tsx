import {Col, Row, Textarea} from '@loreschaeffer/lyco-ui';

export const title = 'Resize Options';
export const description = 'Control the resizability of the textarea: vertical, horizontal, both, or none.';
export const order = 4;

export default function ResizeExample() {
    return (
        <Row>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="Both (Default)"
                    resize="both"
                    defaultValue="Drag the bottom right corner in any direction."
                />
            </Col>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="Vertical"
                    resize="vertical"
                    defaultValue="Drag the bottom right corner up or down."
                />
            </Col>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="Horizontal"
                    resize="horizontal"
                    defaultValue="Drag the bottom right corner left or right."
                />
            </Col>
            <Col span={12} md={6} className="mb-4">
                <Textarea
                    label="None"
                    resize="none"
                    defaultValue="This textarea cannot be resized."
                />
            </Col>
        </Row>
    );
}

export const vanillaHtml = `
<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea textarea--resize-both is-filled">
      <textarea id="resize-b" class="textarea__field">Drag the bottom right corner in any direction.</textarea>
      <label class="textarea__label" for="resize-b">Both (Default)</label>
    </div>
  </div>
</div>

<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea textarea--resize-vertical is-filled">
      <textarea id="resize-v" class="textarea__field">Drag the bottom right corner up or down.</textarea>
      <label class="textarea__label" for="resize-v">Vertical</label>
    </div>
  </div>
</div>

<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea textarea--resize-horizontal is-filled">
      <textarea id="resize-h" class="textarea__field">Drag the bottom right corner left or right.</textarea>
      <label class="textarea__label" for="resize-h">Horizontal</label>
    </div>
  </div>
</div>

<div class="mb-4">
  <div class="textarea-wrapper">
    <div class="textarea textarea--resize-none is-filled">
      <textarea id="resize-n" class="textarea__field">This textarea cannot be resized.</textarea>
      <label class="textarea__label" for="resize-n">None</label>
    </div>
  </div>
</div>
`;
