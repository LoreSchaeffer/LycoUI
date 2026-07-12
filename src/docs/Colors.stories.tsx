import type {Meta, StoryObj} from '@storybook/react';

interface ColorStoryArgs {
    theme: string;
}

type Story = StoryObj<ColorStoryArgs>;

const colors: string[] = ['red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'blue', 'indigo', 'purple', 'magenta'];
const steps: number[] = [50, 100, 300, 500, 700, 800, 900, 950];
const slateSteps: number[] = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 825, 850, 875, 900, 910, 920, 930, 940, 950, 960, 975, 990, 1000];

const themeOptions: string[] = ['default'];
colors.forEach(color => themeOptions.push(`theme-${color}`));
themeOptions.push('theme-oled');

const meta: Meta<ColorStoryArgs> = {
    title: 'Colors',
    parameters: {layout: 'padded'},
    argTypes: {
        theme: {
            control: 'select',
            options: themeOptions,
            description: 'Test the dynamic dark mode Slate tinting.',
        }
    }
};

export default meta;

const Swatch = ({name, varName}: { name: string; varName: string }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '100px'
    }}>
        <div style={{
            height: '50px',
            borderRadius: '8px',
            backgroundColor: `var(${varName})`,
        }}/>
        <div style={{
            fontSize: '12px',
            fontFamily: 'sans-serif'
        }}>
            <strong style={{color: 'var(--color-text-primary)'}}>{name}</strong><br/>
            <span style={{color: 'var(--color-text-secondary)'}}>{varName}</span>
        </div>
    </div>
);

const SwatchGroup = ({name, color}: { name: string; color: string }) => (
    <div>
        <h3 style={{marginBottom: '0.2em'}}>{name}</h3>

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px'
        }}>
            {
                steps.map(step => (
                    <Swatch key={step} name={`${name} ${step}`} varName={`--${color}-${step}`}/>
                ))
            }
        </div>
    </div>
);

export const ColorPalette: Story = {
    args: {
        theme: "default",
    },
    render: ({theme}) => (
        <div className={theme === 'default' ? '' : theme} style={{
            padding: '2rem',
            backgroundColor: 'var(--color-bg-root)',
            minHeight: '100vh',
            transition: 'background-color 0.3s ease'
        }}>
            <h2>Color Shades</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8em',
                marginBottom: '2em'
            }}>
                {
                    colors.map(color => (
                        <SwatchGroup name={color.charAt(0).toUpperCase() + color.slice(1)} color={color}/>
                    ))
                }
            </div>

            <h2>Semantic Roles</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '2em'
            }}>
                <Swatch name="Primary" varName="--color-primary"/>
                <Swatch name="Success" varName="--color-success"/>
                <Swatch name="Warning" varName="--color-warning"/>
                <Swatch name="Danger" varName="--color-danger"/>
            </div>

            <h2>Dynamic Slate Scale</h2>
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    {
                        slateSteps.map(step => (
                            <Swatch key={step} name={`Slate ${step}`} varName={`--slate-${step}`}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};