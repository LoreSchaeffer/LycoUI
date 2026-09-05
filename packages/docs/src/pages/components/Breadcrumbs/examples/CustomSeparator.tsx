import React from 'react';
import {BreadcrumbItem, Breadcrumbs, BreadcrumbSeparator} from '@loreschaeffer/lyco-ui';

export const title = 'Custom Separator';
export const description = <p>You can pass any <code>ReactNode</code> as a child to <code>BreadcrumbSeparator</code>. SVGs are commonly used for modern, chevron-style directional breadcrumbs.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="card card--elevation-1 card--padding-md">
  <div class="card__body">
    <nav aria-label="Breadcrumb" class="breadcrumbs">
      <ol class="breadcrumbs__list">
        <li class="breadcrumbs__item"><a href="/">Settings</a></li>
        <li aria-hidden="true" class="breadcrumbs__separator">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </li>
        <li class="breadcrumbs__item"><a href="/account">Account</a></li>
        <li aria-hidden="true" class="breadcrumbs__separator">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </li>
        <li class="breadcrumbs__item is-current" aria-current="page">Security</li>
      </ol>
    </nav>
  </div>
</div>
`;

const Chevron = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
    </svg>
);

export default function CustomSeparatorExample() {
    return (
        <div className="lyco-p-4">
            <Breadcrumbs>
                <BreadcrumbItem>
                    <a href="#settings">Settings</a>
                </BreadcrumbItem>
                <BreadcrumbSeparator><Chevron/></BreadcrumbSeparator>
                <BreadcrumbItem>
                    <a href="#account">Account</a>
                </BreadcrumbItem>
                <BreadcrumbSeparator><Chevron/></BreadcrumbSeparator>
                <BreadcrumbItem isCurrentPage>
                    Security
                </BreadcrumbItem>
            </Breadcrumbs>
        </div>
    );
}
