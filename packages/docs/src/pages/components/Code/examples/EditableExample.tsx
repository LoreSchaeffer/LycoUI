import { useState } from 'react';
import { Code } from '@loreschaeffer/lyco-ui';

export const title = 'Editable Code Block';
export const description = <p>Setting <code>editable</code> to true overlays a transparent textarea. You can edit the code, and syntax highlighting updates in real-time.</p>;
export const order = 3;

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
    <Code 
      language="typescript" 
      code={code} 
      onChange={setCode}
      editable
      showCopy
    />
  );
}
