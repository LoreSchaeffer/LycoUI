import {Button} from 'lyco-ui';

export const title = 'Outlined Buttons';
export const description = <p>Use the <code>outlined</code> prop to remove background colors and apply an inset border. Hovering inverses the colors.</p>;
export const order = 1;

export default function OutlinedExample() {
    return (
        <>
            <Button outlined variant="primary">Primary Outlined</Button>
            <Button outlined variant="green">Green Outlined</Button>
            <Button outlined variant="red">Red Outlined</Button>
            <Button outlined variant="yellow">Yellow Outlined</Button>
        </>
    );
}