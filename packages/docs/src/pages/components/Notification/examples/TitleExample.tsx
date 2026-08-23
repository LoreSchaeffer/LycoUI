import { Button, useNotification } from '@loreschaeffer/lyco-ui';

export const title = 'Title & Description';
export const description = <p>Pass a <code>title</code> prop for a bold heading above the message body. This is useful for richer, more descriptive notifications.</p>;
export const order = 3;

export const vanillaHtml = `
<button class="btn btn-primary" onclick="LycoUI.notification.show({
  title: 'Deployment Complete',
  message: 'Your application has been deployed to production.',
  variant: 'success',
  duration: 'medium'
})">
  Deploy Notification
</button>
`;

export default function TitleExample() {
    const { showNotification } = useNotification();

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button onClick={() => showNotification({
                title: 'Deployment Complete',
                description: 'Your application has been deployed to production.',
                variant: 'success',
                duration: 5000,
            })}>
                Show Success Notification
            </Button>
            <Button variant="danger" onClick={() => showNotification({
                title: 'Build Failed',
                description: 'Error in src/index.ts:42 — Cannot find module.',
                variant: 'danger',
                duration: 8000,
            })}>
                Show Error Notification
            </Button>
            <Button variant="info" onClick={() => showNotification({
                title: 'New Message',
                description: 'You have 3 unread messages from the design team.',
                variant: 'info',
            })}>
                Show Info Notification
            </Button>
        </div>
    );
}
