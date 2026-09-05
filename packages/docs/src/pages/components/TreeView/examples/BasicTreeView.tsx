import React from 'react';
import {TreeItem, TreeView} from '@loreschaeffer/lyco-ui';

export const title = 'Basic TreeView';
export const description = 'A simple folder/file explorer demonstrating infinite nesting and accessibility.';
export const order = 1;

export const vanillaHtml = `
<ul class="treeview" role="tree">
  <li class="treeview__item" role="treeitem" aria-expanded="true" tabindex="0" id="src">
    <div class="treeview__item-content">
      <span class="treeview__icon treeview__icon--chevron">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>
      </span>
      <span class="treeview__label">src</span>
    </div>
    <ul class="treeview__group" role="group">
      <li class="treeview__item" role="treeitem" aria-expanded="false" tabindex="-1" id="components">
        <div class="treeview__item-content">
          <span class="treeview__icon treeview__icon--chevron">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>
          </span>
          <span class="treeview__label">components</span>
        </div>
      </li>
      <li class="treeview__item" role="treeitem" tabindex="-1" id="index">
        <div class="treeview__item-content">
          <span class="treeview__icon"></span>
          <span class="treeview__label">index.ts</span>
        </div>
      </li>
    </ul>
  </li>
  <li class="treeview__item" role="treeitem" aria-expanded="false" tabindex="-1" id="public">
    <div class="treeview__item-content">
      <span class="treeview__icon treeview__icon--chevron">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>
      </span>
      <span class="treeview__label">public</span>
    </div>
  </li>
  <li class="treeview__item" role="treeitem" tabindex="-1" id="package">
    <div class="treeview__item-content">
      <span class="treeview__icon"></span>
      <span class="treeview__label">package.json</span>
    </div>
  </li>
</ul>
`;

const BasicTreeView = () => {
    return (
        <TreeView style={{maxWidth: '300px'}}>
            <TreeItem id="src" label="src" defaultExpanded>
                <TreeItem id="components" label="components">
                    <TreeItem id="button" label="Button.tsx"/>
                    <TreeItem id="input" label="Input.tsx"/>
                </TreeItem>
                <TreeItem id="styles" label="styles">
                    <TreeItem id="global" label="global.scss"/>
                </TreeItem>
                <TreeItem id="utils" label="utils">
                    <TreeItem id="helpers" label="helpers.ts"/>
                </TreeItem>
                <TreeItem id="index" label="index.ts"/>
            </TreeItem>
            <TreeItem id="public" label="public">
                <TreeItem id="favicon" label="favicon.ico"/>
                <TreeItem id="robots" label="robots.txt"/>
            </TreeItem>
            <TreeItem id="package" label="package.json"/>
        </TreeView>
    );
};

export default BasicTreeView;
