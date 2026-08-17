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
            variant="neutral"
            onClick={() => showNotification({
                message: `This notification appears at ${label}.`,
                title: label.charAt(0).toUpperCase() + label.slice(1),
                variant: 'info',
            })}
        >
            Fire notification
        </Button>
    );
}

export default function PositionExample() {
    const [position, setPosition] = useState<NotificationPosition>('bottom-right');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {positions.map(pos => (
                    <Button
                        key={pos}
                        variant={pos === position ? 'primary' : 'neutral'}
                        onClick={() => setPosition(pos)}
                        size="sm"
                    >
                        {pos}
                    </Button>
                ))}
            </div>
            <NotificationProvider position={position}>
                <PositionButton position={position} />
            </NotificationProvider>
        </div>
    );
}
