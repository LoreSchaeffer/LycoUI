import { Code, Card, Row, Col } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Code Block';
export const description = <p>Display formatted code using the <code>language</code> prop. Syntax highlighting is handled automatically.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="code--block" data-language="javascript">
  <div class="code__body">
    <!-- In Vanilla HTML, you are responsible for rendering the highlighted HTML, or you can just output pre/code -->
    <pre class="code__highlight"><code>const greeting = "Hello Vanilla JS!";
console.log(greeting);</code></pre>
  </div>
</div>
`;

export default function BasicExample() {
  const code = `function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 10);
console.log('Result:', result);`;

  return (
    <Row>
      <Col span={12}>
        <Card>
          <Card.Body>
            <Code 
              language="javascript" 
              code={code} 
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
