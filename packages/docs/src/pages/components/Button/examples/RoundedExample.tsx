import {Button} from '@loreschaeffer/lyco-ui';
import {PiCaretRightBold, PiMagnifyingGlassBold, PiTrashBold} from "react-icons/pi";

export const title = 'Rounded Buttons';
export const description = <p>Use the <code>rounded</code> prop to apply a maximum border-radius. This creates a pill shape for text buttons or a perfect circle for icon-only buttons.</p>;
export const order = 2;

export const vanillaHtml = `
<button class="btn btn--primary btn--rounded">Pill Shape</button>
<button class="btn btn--success btn--rounded">Continue <svg>...</svg></button>

<button class="btn btn--danger btn--rounded btn--icon-only" aria-label="Delete"><svg>...</svg></button>
<button class="btn btn--purple btn--outlined btn--rounded btn--icon-only" aria-label="Search"><svg>...</svg></button>
`;

export default function RoundedExample() {
    return (
        <div className="d-flex" style={{gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center'}}>
            <Button rounded variant="primary">Pill Shape</Button>
            <Button rounded variant="success" iconEnd={<PiCaretRightBold/>}>Continue</Button>

            {/* Circular icon-only buttons */}
            <Button rounded variant="danger" icon={<PiTrashBold/>} aria-label="Delete"/>
            <Button rounded outlined variant="purple" icon={<PiMagnifyingGlassBold/>} aria-label="Search"/>
        </div>
    );
}
