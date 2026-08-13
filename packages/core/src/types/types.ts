export type ColorVariant =
    | 'primary'
    | 'neutral'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'cyan'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'magenta'
    | 'white';

export type SemanticVariant = 'success' | 'warning' | 'danger' | 'info';

export type FullVariant = ColorVariant | SemanticVariant;

export type SizeVariant = 'sm' | 'md' | 'lg';

export type Alignment = 'start' | 'center' | 'end';

export type Orientation = 'horizontal' | 'vertical';

export type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';