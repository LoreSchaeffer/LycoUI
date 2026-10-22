import {useState} from 'react';
import {ColorPicker} from '@loreschaeffer/lyco-ui';

export const title = 'Compact picker';
export const description = <p>Use <code>compact</code> when the color swatch alone is enough. Clicking it opens the platform color picker.</p>;
export const order = 3;

export default function CompactExample() {
    const [color, setColor] = useState('#E11D48');

    return <ColorPicker value={color} onChange={setColor} compact/>;
}
