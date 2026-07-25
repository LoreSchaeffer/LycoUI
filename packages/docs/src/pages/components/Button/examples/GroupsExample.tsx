import {Button, ButtonGroup} from 'lyco-ui';
import {PiFloppyDiskBold, PiPlusBold, PiTrashBold} from "react-icons/pi";

export default function GroupsExample() {
    return (
        <>
            <ButtonGroup className="lyco-mb-4">
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
            </ButtonGroup>

            <ButtonGroup orientation="vertical">
                <Button iconStart={<PiPlusBold/>}>Add User</Button>
                <Button iconStart={<PiFloppyDiskBold/>}>Save Record</Button>
                <Button variant="red" iconStart={<PiTrashBold/>}>Delete</Button>
            </ButtonGroup>
        </>
    );
}