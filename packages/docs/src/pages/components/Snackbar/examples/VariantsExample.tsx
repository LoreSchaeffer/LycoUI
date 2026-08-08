import {Button, useSnackbar} from 'lyco-ui';

export const title = 'Semantic Variants';
export const description = <p>Snackbars support all semantic and color variants, just like the `Alert` component. They also support a `flat` mode for a cleaner look without shadows.</p>;
export const order = 2;

export const vanillaHtml = `
<button class="btn btn-success" onclick="LycoUI.snackbar.show({ message: 'Operation successful.', variant: 'success' })">
  Success
</button>
<button class="btn btn-danger" onclick="LycoUI.snackbar.show({ message: 'Operation failed.', variant: 'danger', isFlat: true })">
  Danger (Flat)
</button>
`;

export default function VariantsExample() {
    const {showSnackbar} = useSnackbar();

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="success" onClick={() => showSnackbar({message: 'File uploaded successfully.', variant: 'success'})}>
                Success
            </Button>
            <Button variant="warning" onClick={() => showSnackbar({message: 'Connection is unstable.', variant: 'warning'})}>
                Warning
            </Button>
            <Button variant="danger" onClick={() => showSnackbar({message: 'Failed to save changes.', variant: 'danger'})}>
                Danger
            </Button>
            <Button variant="info" onClick={() => showSnackbar({message: 'A new update is available.', variant: 'info'})}>
                Info
            </Button>
            <Button variant="purple" onClick={() => showSnackbar({message: 'Custom color variant!', variant: 'purple'})}>
                Purple
            </Button>
            <Button variant="neutral" onClick={() => showSnackbar({message: 'I am flat!', isFlat: true})}>
                Flat mode
            </Button>
        </div>
    );
}
