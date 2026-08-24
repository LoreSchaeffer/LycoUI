import {type ComponentType, lazy, type LazyExoticComponent} from "react";
import {PiBookOpenBold, PiStackBold} from "react-icons/pi";
import type {IconType} from "react-icons";

export interface DocNavigationItem {
    name: string;
    path: string;
    component: LazyExoticComponent<ComponentType<Record<string, unknown>>>;
    subItems?: { name: string; hash: string }[];
}

export interface DocNavigationCategory {
    title: string;
    icon?: IconType;
    sorted: boolean;
    items: DocNavigationItem[];
}

type ReactComponent = ComponentType<Record<string, unknown>>;

const componentModules = import.meta.glob<{ default: ReactComponent }>('../pages/components/**/*Doc.tsx');

const excludedComponents = ['Grid'];

const generateComponentRoutes = (): DocNavigationItem[] => {
    const items: DocNavigationItem[] = [];

    for (const path in componentModules) {
        const match = path.match(/\/([^/]+)Doc\.tsx$/);
        if (match && match[1]) {
            const name = match[1];
            if (!excludedComponents.includes(name)) {
                items.push({
                    name,
                    path: `/docs/components/${name.toLocaleLowerCase()}`,
                    component: lazy(componentModules[path])
                });
            }
        }
    }

    return items;
}

export const docsNavigation: DocNavigationCategory[] = [
    {
        title: 'Getting Started',
        icon: PiBookOpenBold,
        sorted: false,
        items: [
            {
                name: 'Introduction',
                path: '/docs/introduction',
                component: lazy(() => import('../pages/getting-started/Introduction'))
            },
            {
                name: 'Installation',
                path: '/docs/installation',
                component: lazy(() => import('../pages/getting-started/Installation'))
            },
            {
                name: 'Colors',
                path: '/docs/colors',
                component: lazy(() => import('../pages/getting-started/Colors'))
            },
            {
                name: 'Typography',
                path: '/docs/typography',
                component: lazy(() => import('../pages/getting-started/TypographyDoc'))
            },
            {
                name: 'Spacing',
                path: '/docs/spacing',
                component: lazy(() => import('../pages/getting-started/SpacingDoc'))
            },
            {
                name: 'Shadows',
                path: '/docs/shadows',
                component: lazy(() => import('../pages/getting-started/ShadowsDoc'))
            },
            {
                name: 'Border Radius',
                path: '/docs/radii',
                component: lazy(() => import('../pages/getting-started/RadiiDoc'))
            },
            {
                name: 'Grid System',
                path: '/docs/grid',
                component: lazy(() => import('../pages/components/Grid/GridDoc.tsx'))
            },
            {
                name: 'Custom Types',
                path: '/docs/types',
                component: lazy(() => import('../pages/types/TypesDoc.tsx')),
                subItems: [
                    { name: 'ColorVariant', hash: '#color-variant' },
                    { name: 'SemanticVariant', hash: '#semantic-variant' },
                    { name: 'FullVariant', hash: '#full-variant' },
                    { name: 'SizeVariant', hash: '#size-variant' },
                    { name: 'Alignment', hash: '#alignment' },
                    { name: 'Orientation', hash: '#orientation' },
                ]
            }
        ]
    },
    {
        title: 'Components',
        icon: PiStackBold,
        sorted: true,
        items: generateComponentRoutes()
    }
];

export const flattenedRoutes = docsNavigation.flatMap(category => category.items);