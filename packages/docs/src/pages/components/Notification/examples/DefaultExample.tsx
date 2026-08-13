import { Button, useNotification } from 'lyco-ui';

export const title = 'Default Usage';
export const description = <p>Use the <code>useNotification</code> hook inside a <code>NotificationProvider</code> to show notifications imperatively. They auto-dismiss and include a progress bar. Hover over a notification to pause the countdown.</p>;
export const order = 1;

export const vanillaHtml = `
<!-- Triggering a Notification via Javascript -->
<button class="btn btn-primary" onclick="LycoUI.notification.show({ message: 'Profile saved successfully!' })">
  Show Notification
</button>
<button class="btn btn-neutral" onclick="LycoUI.notification.show({ message: 'This stays longer.', duration: 'long', closable: true })">
  Show Long
</button>
`;

export default function DefaultExample() {
    const { showNotification } = useNotification();

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => showNotification({ message: 'Profile saved successfully!' })}>
                Show Short
            </Button>
            <Button variant="neutral" onClick={() => showNotification({ message: 'Processing your request...', duration: 'medium' })}>
                Show Medium
            </Button>
            <Button variant="white" onClick={() => showNotification({ message: 'This stays for a while.', duration: 'long', closable: true })}>
                Show Long
            </Button>
            <Button variant="info" onClick={() => showNotification({ message: 'Custom 7 second notification.', duration: 7 })}>
                Show 7s
            </Button>
        </div>
    );
}
