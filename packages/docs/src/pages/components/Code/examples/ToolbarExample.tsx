import { Code, Card, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Toolbar Options';
export const description = <p>Enable header toolbars with <code>showCopy</code>, <code>showDownload</code>, and <code>showLanguageSelector</code>.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="code--block" data-language="css">
  <div class="code__header">
    <div class="code__header-left">
      <select class="code__lang-select">
        <option value="css">css</option>
        <option value="html">html</option>
      </select>
    </div>
    <div class="code__header-right">
      <button type="button" class="code__action" title="Copy code" aria-label="Copy code">
        <!-- SVG icon for Copy -->
      </button>
      <button type="button" class="code__action" title="Download code" aria-label="Download code">
        <!-- SVG icon for Download -->
      </button>
    </div>
  </div>
  <div class="code__body">
    <pre class="code__highlight"><code>.card { border-radius: 8px; }</code></pre>
  </div>
</div>
`;

export default function ToolbarExample() {
  const code = `:root {
  --primary-color: #007bff;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}`;

  return (
    <Row>
      <Col span={12}>
        <Card>
          <Card.Body>
            <Code 
              language="css" 
              code={code} 
              showCopy 
              showDownload 
              showLanguageSelector 
              fileName="styles"
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
