import {useState} from 'react';
import {ColorPicker} from '@loreschaeffer/lyco-ui';

export const title = 'Basic usage';
export const description = <p>Keep the chosen color in React state. You can type a six-digit HEX or RGB value and commit it with Enter or by leaving the field.</p>;
export const order = 1;

export default function BasicExample() {
    const [color, setColor] = useState('#3366CC');

    return <ColorPicker value={color} onChange={setColor}/>;
}
