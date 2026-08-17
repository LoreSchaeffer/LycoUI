import {Button} from '@loreschaeffer/lyco-ui';

export const title = 'States & Modifiers';
export const description = (<p>
    Use the <code>flat</code> for flat colors without any shade,&nbsp;
    <code>loading</code> to show a spinner inside the button,&nbsp;
    <code>disabled</code> to disable the button,&nbsp;
    <code>static</code> to disable click animation.
</p>);
export const order = 5;

export const vanillaHtml = `
<button class="btn btn-primary btn-flat">Flat Variant</button>
<button class="btn btn-primary is-loading">Loading</button>
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary btn-static">Static</button>
`;

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