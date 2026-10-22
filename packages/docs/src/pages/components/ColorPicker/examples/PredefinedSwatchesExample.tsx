import {useState} from 'react';
import {ColorPicker} from '@loreschaeffer/lyco-ui';

export const title = 'Predefined swatches';
export const description = <p>Provide your own palette to make brand colors easy to select.</p>;
export const order = 2;

const brandSwatches = ['#14213D', '#FCA311', '#E5E5E5', '#FFFFFF'];

export default function PredefinedSwatchesExample() {
    const [color, setColor] = useState(brandSwatches[0]);

    return <ColorPicker value={color} onChange={setColor} swatches={brandSwatches}/>;
}
