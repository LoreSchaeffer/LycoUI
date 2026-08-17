import {Button} from '@loreschaeffer/lyco-ui';
import {PiCaretRightBold, PiMagnifyingGlassBold, PiTrashBold} from "react-icons/pi";

export const title = 'Rounded Buttons';
export const description = <p>Use the <code>rounded</code> prop to apply a maximum border-radius. This creates a pill shape for text buttons or a perfect circle for icon-only buttons.</p>;
export const order = 2;

export const vanillaHtml = `
<button class="btn btn-primary btn-rounded">Pill Shape</button>
<button class="btn btn-green btn-rounded">Continue <svg>...</svg></button>

<button class="btn btn-red btn-rounded btn-icon-only" aria-label="Delete"><svg>...</svg></button>
<button class="btn btn-purple btn-outlined btn-rounded btn-icon-only" aria-label="Search"><svg>...</svg></button>
`;

export default function RoundedExample() {
    return (
        <>
            <Button rounded variant="primary">Pill Shape</Button>
            <Button rounded variant="green" iconEnd={<PiCaretRightBold />}>Continue</Button>

            {/* Circular icon-only buttons */}
            <Button rounded variant="red" icon={<PiTrashBold />} aria-label="Delete" />
            <Button rounded outlined variant="purple" icon={<PiMagnifyingGlassBold />} aria-label="Search" />
        </>
    );
}