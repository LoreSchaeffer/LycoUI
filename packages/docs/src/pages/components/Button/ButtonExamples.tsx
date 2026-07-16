import {Button, ButtonGroup} from 'lyco-ui';
import {PiCaretRightBold, PiFloppyDiskBold, PiGearBold, PiMagnifyingGlassBold, PiPlusBold, PiTrashBold} from "react-icons/pi";

export const buttonExamples = {
    variants: {
        reactCode: `
<Button variant="primary">Primary</Button>
<Button variant="green">Success</Button>
<Button variant="red">Danger</Button>
<Button variant="yellow">Warning</Button>
<Button variant="purple">Purple</Button>
        `.trim(),
        preview: (
            <div style={{display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button variant="primary">Primary</Button>
                <Button variant="red">Red</Button>
                <Button variant="orange">Orange</Button>
                <Button variant="yellow">Yellow</Button>
                <Button variant="green">Green</Button>
                <Button variant="teal">Teal</Button>
                <Button variant="cyan">Cyan</Button>
                <Button variant="blue">Blue</Button>
                <Button variant="indigo">Indigo</Button>
                <Button variant="purple">Purple</Button>
                <Button variant="magenta">Magenta</Button>
            </div>
        )
    },
    outlined: {
        reactCode: `
<Button isOutlined variant="primary">Primary</Button>
<Button isOutlined variant="green">Success</Button>
<Button isOutlined variant="red">Danger</Button>
<Button isOutlined variant="yellow">Warning</Button>
        `.trim(),
        preview: (
            <div style={{display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button isOutlined variant="primary">Primary</Button>
                <Button isOutlined variant="green">Success</Button>
                <Button isOutlined variant="red">Danger</Button>
                <Button isOutlined variant="yellow">Warning</Button>
            </div>
        )
    },
    rounded: {
        reactCode: `
<Button rounded variant="primary">Pill Shape</Button>
<Button rounded variant="green" iconEnd={<PiCaretRightBold />}>Continue</Button>

{/* Circular icon-only buttons */}
<Button rounded variant="red" icon={<PiTrashBold />} aria-label="Delete" />
<Button rounded isOutlined variant="purple" icon={<PiMagnifyingGlassBold />} aria-label="Search" />
        `.trim(),
        preview: (
            <div style={{display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button rounded variant="primary">Pill Shape</Button>
                <Button rounded variant="green" iconEnd={<PiCaretRightBold/>}>Continue</Button>
                <Button rounded variant="red" icon={<PiTrashBold/>} aria-label="Delete"/>
                <Button rounded isOutlined variant="purple" icon={<PiMagnifyingGlassBold/>} aria-label="Search"/>
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
            <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button size="sm">Small</Button>
                <Button size="base">Base</Button>
                <Button size="lg">Large</Button>
            </div>
        )
    },
    icons: {
        reactCode: `
<Button iconStart={<PiFloppyDiskBold />}>Save</Button>
<Button variant="teal" iconEnd={<PiCaretRightBold />}>Continue</Button>

{/* Square icon-only buttons */}
<Button variant="red" icon={<PiTrashBold />} aria-label="Delete" />
<Button variant="primary" isOutlined icon={<PiMagnifyingGlassBold />} aria-label="Search" />
<Button flat variant="orange" icon={<PiGearBold />} aria-label="Settings" />
        `.trim(),
        preview: (
            <div style={{display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button iconStart={<PiFloppyDiskBold/>}>Save</Button>
                <Button variant="teal" iconEnd={<PiCaretRightBold/>}>Continue</Button>
                <Button variant="red" icon={<PiTrashBold/>} aria-label="Delete"/>
                <Button variant="primary" isOutlined icon={<PiMagnifyingGlassBold/>} aria-label="Search"/>
                <Button flat variant="orange" icon={<PiGearBold/>} aria-label="Settings"/>
            </div>
        )
    },
    states: {
        reactCode: `
<Button flat>Flat Variant</Button>
<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>
        `.trim(),
        preview: (
            <div style={{display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap'}}>
                <Button flat>Flat Variant</Button>
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
    <Button variant="teal" iconStart={<PiPlusBold />}>Add User</Button>
    <Button variant="teal" iconStart={<PiFloppyDiskBold />}>Save Record</Button>
    <Button variant="red" iconStart={<PiTrashBold />}>Delete</Button>
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