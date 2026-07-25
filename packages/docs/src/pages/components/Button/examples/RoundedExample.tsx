import {Button} from 'lyco-ui';
import {PiCaretRightBold, PiMagnifyingGlassBold, PiTrashBold} from "react-icons/pi";

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