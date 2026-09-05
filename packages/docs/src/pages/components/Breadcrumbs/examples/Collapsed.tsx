import React from 'react';
import {BreadcrumbItem, Breadcrumbs, BreadcrumbSeparator} from '@loreschaeffer/lyco-ui';

export const title = 'Collapsed / Truncated';
export const description = <p>When directory structures or paths are extremely deep, an ellipsis (<code>...</code>) can be used to truncate intermediate paths, preserving valuable horizontal real-estate while maintaining context.</p>;
export const order = 3;

export const vanillaHtml = `
<div class="card card--elevation-1 card--padding-md">
  <div class="card__body">
    <nav aria-label="Breadcrumb" class="breadcrumbs">
      <ol class="breadcrumbs__list">
        <li class="breadcrumbs__item"><a href="/">Projects</a></li>
        <li aria-hidden="true" class="breadcrumbs__separator">/</li>
        <li class="breadcrumbs__item">
          <span aria-label="More links">...</span>
        </li>
        <li aria-hidden="true" class="breadcrumbs__separator">/</li>
        <li class="breadcrumbs__item"><a href="/src">src</a></li>
        <li aria-hidden="true" class="breadcrumbs__separator">/</li>
        <li class="breadcrumbs__item is-current" aria-current="page">App.tsx</li>
      </ol>
    </nav>
  </div>
</div>
`;

export default function CollapsedExample() {
    return (
        <div className="lyco-p-4">
            <Breadcrumbs>
                <BreadcrumbItem>
                    <a href="#home">Projects</a>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <span aria-label="More links">...</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <a href="#folder">src</a>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem isCurrentPage>
                    App.tsx
                </BreadcrumbItem>
            </Breadcrumbs>
        </div>
    );
}
