import {Code, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Inline Code';
export const description = <p>Setting <code>inline</code> to true renders the code snippet as a simple inline element, perfect for embedding within paragraphs.</p>;
export const order = 1;

export const vanillaHtml = `
<p>Here is an example of <code class="code--inline">inline code</code> within a sentence.</p>
`;

export default function InlineExample() {
    return (
        <Row>
            <Col span={12}>
                <div className="lyco-p-4">
                    <p style={{margin: 0}}>
                        To install the dependencies, run <Code inline>npm install @loreschaeffer/lyco-ui</Code> in your terminal.
                    </p>
                </div>
            </Col>
        </Row>
    );
}
