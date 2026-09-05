import React from 'react';
import {BreadcrumbItem, Breadcrumbs, BreadcrumbSeparator} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Usage';
export const description = <p>A standard breadcrumbs trail using default slash separators. Wrapping elements provide proper <code>nav</code> and <code>ol</code> semantic markup, ensuring screen readers can announce the navigation path
    accurately.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="card card--elevation-1 card--padding-md">
  <div class="card__body">
    <nav aria-label="Breadcrumb" class="breadcrumbs">
      <ol class="breadcrumbs__list">
        <li class="breadcrumbs__item"><a href="/">Home</a></li>
        <li aria-hidden="true" class="breadcrumbs__separator">/</li>
        <li class="breadcrumbs__item"><a href="/components">Components</a></li>
        <li aria-hidden="true" class="breadcrumbs__separator">/</li>
        <li class="breadcrumbs__item is-current" aria-current="page">Breadcrumbs</li>
      </ol>
    </nav>
  </div>
</div>
`;

export default function BasicExample() {
    return (
        <div className="lyco-p-4">
            <Breadcrumbs>
                <BreadcrumbItem>
                    <a href="#home">Home</a>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <a href="#components">Components</a>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem isCurrentPage>
                    Breadcrumbs
                </BreadcrumbItem>
            </Breadcrumbs>
        </div>
    );
}
