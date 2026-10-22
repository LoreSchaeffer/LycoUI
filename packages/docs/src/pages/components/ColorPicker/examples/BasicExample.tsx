import {useState} from 'react';
import {ColorPicker} from '@loreschaeffer/lyco-ui';

export const title = 'Basic usage';
export const description = <p>Keep the chosen color in React state. Without swatches, clicking the control opens the platform-native color picker directly.</p>;
export const order = 1;

export default function BasicExample() {
    const [color, setColor] = useState('#3366CC');

    return <ColorPicker value={color} onChange={setColor}/>;
}
