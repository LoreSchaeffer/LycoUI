import { Button, useNotification } from '@loreschaeffer/lyco-ui';

export const title = 'Semantic Variants';
export const description = <p>When using a semantic variant (<code>success</code>, <code>warning</code>, <code>danger</code>, <code>info</code>), an appropriate icon is automatically injected. You can override it with a custom <code>icon</code> prop or suppress it with <code>icon={'{null}'}</code>.</p>;
export const order = 2;

export const vanillaHtml = `
<button class="btn btn-success" onclick="LycoUI.notification.show({ message: 'Changes saved.', variant: 'success' })">
  Success
</button>
<button class="btn btn-warning" onclick="LycoUI.notification.show({ message: 'Disk space running low.', variant: 'warning' })">
  Warning
</button>
<button class="btn btn-danger" onclick="LycoUI.notification.show({ message: 'Failed to connect.', variant: 'danger' })">
  Danger
</button>
<button class="btn btn-info" onclick="LycoUI.notification.show({ message: 'Update available.', variant: 'info' })">
  Info
</button>
`;

export default function VariantsExample() {
    const { showNotification } = useNotification();

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="success" onClick={() => showNotification({ message: 'Changes saved successfully.', variant: 'success' })}>
                Success
            </Button>
            <Button variant="warning" onClick={() => showNotification({ message: 'Disk space is running low.', variant: 'warning' })}>
                Warning
            </Button>
            <Button variant="danger" onClick={() => showNotification({ message: 'Failed to connect to server.', variant: 'danger' })}>
                Danger
            </Button>
            <Button variant="info" onClick={() => showNotification({ message: 'A new update is available.', variant: 'info' })}>
                Info
            </Button>
        </div>
    );
}
