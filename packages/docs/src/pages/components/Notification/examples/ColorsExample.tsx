import { Button, useNotification, type FullVariant } from '@loreschaeffer/lyco-ui';

export const title = 'Color Variants';
export const description = <p>Notifications support the full LycoUI color palette. Use any <code>ColorVariant</code> to match your application's theme.</p>;
export const order = 5;

export const vanillaHtml = `
<button class="btn btn-primary" onclick="LycoUI.notification.show({ message: 'Primary notification', variant: 'primary' })">
  Primary
</button>
<button class="btn btn-purple" onclick="LycoUI.notification.show({ message: 'Purple notification', variant: 'purple' })">
  Purple
</button>
`;

const colors = ['primary', 'success', 'warning', 'danger', 'info', 'purple'] as const;

export default function ColorsExample() {
    const { showNotification } = useNotification();

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {colors.map(color => (
                <Button
                    key={color}
                    variant={color as FullVariant}
                    onClick={() => showNotification({
                        description: `This is a ${color} notification.`,
                        variant: color as FullVariant,
                        icon: null,
                    })}
                >
                    {color}
                </Button>
            ))}
        </div>
    );
}
