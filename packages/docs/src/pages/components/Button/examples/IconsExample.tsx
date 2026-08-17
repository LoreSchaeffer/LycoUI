import {Button} from '@loreschaeffer/lyco-ui';
import {PiCaretRightBold, PiFloppyDiskBold, PiGearBold, PiMagnifyingGlassBold, PiTrashBold} from "react-icons/pi";

export const title = 'Icons';
export const description = <p>Pass React elemets to <code>iconStart</code>, <code>iconEnd</code>, or use <code>icon</code> without children to create a perfectly square icon-only button.</p>;
export const order = 4;

export const vanillaHtml = `
<button class="btn btn-primary"><svg>...</svg> Save</button>
<button class="btn btn-teal">Continue <svg>...</svg></button>

<button class="btn btn-red btn-icon-only" aria-label="Delete"><svg>...</svg></button>
<button class="btn btn-primary btn-outlined btn-icon-only" aria-label="Search"><svg>...</svg></button>
<button class="btn btn-orange btn-flat btn-icon-only" aria-label="Settings"><svg>...</svg></button>
`;

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