import { Button, useNotification } from 'lyco-ui';

export const title = 'Color Variants';
export const description = <p>Notifications support the full LycoUI color palette. Use any <code>ColorVariant</code> to match your application's theme.</p>;
export const order = 5;

export const vanillaHtml = `
<button class="btn btn-blue" onclick="LycoUI.notification.show({ message: 'Blue notification', variant: 'blue' })">
  Blue
</button>
<button class="btn btn-purple" onclick="LycoUI.notification.show({ message: 'Purple notification', variant: 'purple' })">
  Purple
</button>
<button class="btn btn-teal" onclick="LycoUI.notification.show({ message: 'Teal notification', variant: 'teal' })">
  Teal
</button>
`;

const colors = ['blue', 'purple', 'teal', 'orange', 'magenta', 'indigo'] as const;

export default function ColorsExample() {
    const { showNotification } = useNotification();

    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {colors.map(color => (
                <Button
                    key={color}
                    variant={color}
                    onClick={() => showNotification({
                        message: `This is a ${color} notification.`,
                        variant: color,
                        icon: null,
                    })}
                >
                    {color}
                </Button>
            ))}
        </div>
    );
}
