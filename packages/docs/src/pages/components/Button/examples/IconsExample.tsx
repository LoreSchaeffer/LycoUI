import {Button} from 'lyco-ui';
import {PiCaretRightBold, PiFloppyDiskBold, PiGearBold, PiMagnifyingGlassBold, PiTrashBold} from "react-icons/pi";

export default function IconsExample() {
    return (
        <>
            <Button iconStart={<PiFloppyDiskBold/>}>Save</Button>
            <Button variant="teal" iconEnd={<PiCaretRightBold/>}>Continue</Button>

            {/* Square icon-only buttons */}
            <Button variant="red" icon={<PiTrashBold/>} aria-label="Delete"/>
            <Button variant="primary" outlined icon={<PiMagnifyingGlassBold/>} aria-label="Search"/>
            <Button flat variant="orange" icon={<PiGearBold/>} aria-label="Settings"/>
        </>
    );
}