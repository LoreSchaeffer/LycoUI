import {Button} from 'lyco-ui';
import {PiCaretRightBold, PiMagnifyingGlassBold, PiTrashBold} from "react-icons/pi";

export const title = 'Rounded Buttons';
export const description = <p>Use the <code>rounded</code> prop to apply a maximum border-radius. This creates a pill shape for text buttons or a perfect circle for icon-only buttons.</p>;
export const order = 2;

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