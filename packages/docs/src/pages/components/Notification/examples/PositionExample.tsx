import React, { useState } from 'react';
import { Button, NotificationProvider, useNotification } from '@loreschaeffer/lyco-ui';
import type { NotificationPosition } from '@loreschaeffer/lyco-ui';

export const title = 'Position';
export const description = <p>Wrap your app in a <code>NotificationProvider</code> with a <code>position</code> prop to change the stack corner. Select a position below and fire a notification to see it in action.</p>;
export const order = 4;

export const vanillaHtml = `
<!-- Change the default position before showing -->
<script>
  LycoUI.notification.setPosition('top-left');
  LycoUI.notification.show({ message: 'Top-left notification!' });
</script>
`;

const positions: NotificationPosition[] = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];

function PositionButton({ position }: { position: NotificationPosition }) {
    const { showNotification } = useNotification();
    const label = position.replace('-', ' ');

    return (
        <Button
            variant="primary"
            onClick={() => showNotification({
                description: `This notification appears at ${label}.`,
                title: label.charAt(0).toUpperCase() + label.slice(1),
                variant: 'primary',
            })}
        >
            Fire notification
        </Button>
    );
}

export default function PositionExample() {
    const [position, setPosition] = useState<NotificationPosition>('bottom-right');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '280px' }}>
                <Button variant={position === 'top-left' ? 'primary' : 'neutral'} outlined={position !== 'top-left'} onClick={() => setPosition('top-left')}>Top Left</Button>
                <Button variant={position === 'top-right' ? 'primary' : 'neutral'} outlined={position !== 'top-right'} onClick={() => setPosition('top-right')}>Top Right</Button>
                <Button variant={position === 'bottom-left' ? 'primary' : 'neutral'} outlined={position !== 'bottom-left'} onClick={() => setPosition('bottom-left')}>Bottom Left</Button>
                <Button variant={position === 'bottom-right' ? 'primary' : 'neutral'} outlined={position !== 'bottom-right'} onClick={() => setPosition('bottom-right')}>Bottom Right</Button>
            </div>
            <NotificationProvider position={position}>
                <PositionButton position={position} />
            </NotificationProvider>
        </div>
    );
}
