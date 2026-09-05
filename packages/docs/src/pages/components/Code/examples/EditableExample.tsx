import {useState} from 'react';
import {Code, Col, Row} from '@loreschaeffer/lyco-ui';

export const title = 'Editable Code Block';
export const description = <p>Setting <code>editable</code> to true overlays a transparent textarea. You can edit the code, and syntax highlighting updates in real-time.</p>;
export const order = 4;

export default function EditableExample() {
    const [code, setCode] = useState(`interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: "Maple"
};`);

    return (
        <Row>
            <Col span={12}>
                <div className="lyco-p-4">
                    <Code
                        language="typescript"
                        code={code}
                        onChange={setCode}
                        editable
                        showCopy
                    />
                </div>
            </Col>
        </Row>
    );
}
