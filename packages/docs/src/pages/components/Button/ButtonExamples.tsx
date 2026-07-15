import {Button, ButtonGroup} from 'lyco-ui';
import {PiCaretRightBold, PiFloppyDiskBold, PiPlusBold, PiTrashBold} from "react-icons/pi";

export const buttonExamples = {
    variants: {
        reactCode: `
<Button variant="primary">Primary</Button>
<Button variant="green">Success</Button>
<Button variant="red">Danger</Button>
<Button variant="orange">Warning</Button>
<Button variant="purple">Purple</Button>
        `.trim(),
        preview: (
            <div className="lyco-d-flex" style={{gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button variant="primary">Primary</Button>
                <Button variant="green">Success</Button>
                <Button variant="red">Danger</Button>
                <Button variant="orange">Warning</Button>
                <Button variant="purple">Purple</Button>
            </div>
        )
    },
    sizes: {
        reactCode: `
<Button size="sm">Small</Button>
<Button size="base">Base</Button>
<Button size="lg">Large</Button>
        `.trim(),
        preview: (
            <div className="lyco-d-flex lyco-align-items-center" style={{gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button size="sm">Small</Button>
                <Button size="base">Base</Button>
                <Button size="lg">Large</Button>
            </div>
        )
    },
    icons: {
        reactCode: `
<Button iconStart={<FloppyDisk weight="bold" />}>Save</Button>
<Button variant="teal" iconEnd={<CaretRight weight="bold" />}>Continue</Button>
<Button variant="red" iconStart={<Trash weight="bold" />} />
        `.trim(),
        preview: (
            <div className="lyco-d-flex" style={{gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button iconStart={<PiFloppyDiskBold/>}>Save</Button>
                <Button variant="teal" iconEnd={<PiCaretRightBold/>}>Continue</Button>
                <Button variant="red" iconStart={<PiTrashBold aria-label="Delete"/>}/>
            </div>
        )
    },
    states: {
        reactCode: `
<Button isFlat>Flat Variant</Button>
<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>
        `.trim(),
        preview: (
            <div className="lyco-d-flex" style={{gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button isFlat>Flat Variant</Button>
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
            </div>
        )
    },
    groups: {
        reactCode: `
<ButtonGroup className="lyco-mb-4">
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical">
    <Button variant="teal" iconStart={<Plus />}>Add User</Button>
    <Button variant="teal" iconStart={<FloppyDisk />}>Save Record</Button>
    <Button variant="red" iconStart={<Trash />}>Delete</Button>
</ButtonGroup>
        `.trim(),
        preview: (
            <div className="lyco-d-flex lyco-flex-column lyco-align-items-center" style={{gap: 'var(--spacing-6)'}}>
                <ButtonGroup>
                    <Button>Left</Button>
                    <Button>Middle</Button>
                    <Button>Right</Button>
                </ButtonGroup>

                <ButtonGroup orientation="vertical">
                    <Button variant="teal" iconStart={<PiPlusBold/>}>Add User</Button>
                    <Button variant="teal" iconStart={<PiFloppyDiskBold/>}>Save Record</Button>
                    <Button variant="red" iconStart={<PiTrashBold/>}>Delete</Button>
                </ButtonGroup>
            </div>
        )
    }
};