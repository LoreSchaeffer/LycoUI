import {Button, useSnackbar} from 'lyco-ui';

export const title = 'Default Usage';
export const description = <p>The `Snackbar` is managed by the `SnackbarProvider`. Use the `useSnackbar` hook to imperatively show messages. In Vanilla JS, use the `LycoUI.snackbar.show()` method.</p>;
export const order = 1;

export const vanillaHtml = `
<!-- Triggering a Snackbar via Javascript -->
<button class="btn btn-primary" onclick="LycoUI.snackbar.show({ message: 'Profile saved successfully!', duration: 'short' })">
  Show Snackbar
</button>
<button class="btn btn-info" onclick="LycoUI.snackbar.show({ message: 'This will close in exactly 7 secondi.', duration: 7 })">
  Show 7s (Custom)
</button>
`;

export default function DefaultExample() {
    const {showSnackbar} = useSnackbar();

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => showSnackbar({message: 'Profile saved successfully!', duration: 'short'})}>
                Show short
            </Button>
            <Button variant="neutral" onClick={() => showSnackbar({message: 'Update in progress...', duration: 'medium'})}>
                Show medium
            </Button>
            <Button variant="white" onClick={() => showSnackbar({message: 'This will stay for a while.', duration: 'long', closable: true})}>
                Show long (closable)
            </Button>
            <Button variant="info" onClick={() => showSnackbar({message: 'I will disappear in exactly 7 seconds.', duration: 7})}>
                Show 7s (Custom)
            </Button>
        </div>
    );
}
