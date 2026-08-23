import {Button} from '@loreschaeffer/lyco-ui';

export const title = 'States & Variations';
export const description = (<p>
    Use <code>outlined</code> or <code>ghost</code> for different visual weights,&nbsp;
    <code>isLoading</code> to show a spinner inside the button, and&nbsp;
    <code>disabled</code> to disable the button.
</p>);
export const order = 5;

export const vanillaHtml = `
<button class="btn btn--primary btn--outlined">Outlined</button>
<button class="btn btn--primary btn--ghost">Ghost</button>
<button class="btn btn--primary btn--loading">Loading</button>
<button class="btn btn--primary" disabled>Disabled</button>
`;

export default function StatesExample() {
    return (
        <>
            <Button outlined>Outlined</Button>
            <Button ghost>Ghost</Button>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
        </>
    );
}