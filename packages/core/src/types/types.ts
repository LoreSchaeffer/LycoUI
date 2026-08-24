export type ColorVariant =
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'white';

export type SemanticVariant = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export type FullVariant = ColorVariant | SemanticVariant;

export type SizeVariant = 'sm' | 'md' | 'lg';

export type Alignment = 'start' | 'center' | 'end';

export type Orientation = 'horizontal' | 'vertical';

export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';