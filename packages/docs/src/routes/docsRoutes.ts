import {type ComponentType, lazy, type LazyExoticComponent} from 'react';
import {PiBookOpenBold, PiStackBold} from "react-icons/pi";
import type {IconType} from "react-icons";

export interface DocNavigationItem {
    name: string;
    path: string;
    component: LazyExoticComponent<ComponentType<any>>;
}

export interface DocNavigationCategory {
    title: string;
    icon?: IconType;
    items: DocNavigationItem[];
}

export const docsNavigation: DocNavigationCategory[] = [
    {
        title: 'Getting Started',
        icon: PiBookOpenBold,
        items: [
            {
                name: 'Introduction',
                path: '/docs/introduction',
                component: lazy(() => import('../pages/getting-started/Introduction'))
            },
            {
                name: 'Architecture',
                path: '/docs/architecture',
                component: lazy(() => import('../pages/getting-started/Architecture'))
            },
            {
                name: 'Grid System',
                path: '/docs/grid',
                component: lazy(() => import('../pages/components/Grid/GridDoc.tsx'))
            }
        ]
    },
    {
        title: 'Components',
        icon: PiStackBold,
        items: [
            {
                name: 'Button',
                path: '/docs/components/Button',
                component: lazy(() => import('../pages/components/Button/ButtonDoc.tsx'))
            }
        ]
    }
];

export const flattenedRoutes = docsNavigation.flatMap(category => category.items);