import {Button} from 'lyco-ui';

export const title = 'States & Modifiers';
export const description = (<p>
    Use the <code>flat</code> for flat colors without any shade,&nbsp;
    <code>loading</code> to show a spinner inside the button,&nbsp;
    <code>disabled</code> to disable the button,&nbsp;
    <code>static</code> to disable click animation.
</p>);
export const order = 5;

export default function StatesExample() {
    return (
        <>
            <Button flat>Flat Variant</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button static>Static</Button>
        </>
    );
}