import {Button, useNotification} from '@loreschaeffer/lyco-ui';

export const title = 'Custom Icon';
export const description = <p>Bypass the default semantic icons by passing a custom ReactNode to the <code>icon</code> prop. This is perfect for branded notifications, user avatars, or specialized alerts.</p>;
export const order = 6;

export const vanillaHtml = `
<button class="btn btn-primary" onclick="LycoUI.notification.show({
  title: 'Achievement Unlocked',
  message: 'You have reached level 50!',
  icon: '<svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><path d=\\'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\\'></path></svg>',
  variant: 'primary'
})">
  Show Achievement
</button>
`;

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
);

export default function CustomIconExample() {
    const {showNotification} = useNotification();

    return (
        <Button
            variant="primary"
            onClick={() => showNotification({
                title: 'Achievement Unlocked',
                description: 'You have reached level 50!',
                variant: 'primary',
                icon: <StarIcon/>,
            })}
        >
            Show Achievement
        </Button>
    );
}
