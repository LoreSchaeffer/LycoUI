import React, {useState} from 'react';
import {TreeItem, TreeView} from '@loreschaeffer/lyco-ui';

export const title = 'Selected State';
export const description = 'Use the `selectedId` and `onSelect` props on the `TreeView` to control the active selection state. Active items are highlighted using Linear-style active surface colors.';
export const order = 3;

export const vanillaHtml = `
<ul class="treeview" role="tree">
  <li class="treeview__item" role="treeitem" aria-expanded="true" tabindex="-1" id="components">
    <div class="treeview__item-content">
      <span class="treeview__icon treeview__icon--chevron">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" /></svg>
      </span>
      <span class="treeview__label">components</span>
    </div>
    <ul class="treeview__group" role="group">
      <li class="treeview__item" role="treeitem" aria-selected="true" tabindex="0" id="treeview">
        <div class="treeview__item-content is-selected">
          <span class="treeview__icon"></span>
          <span class="treeview__label">TreeView</span>
        </div>
      </li>
      <li class="treeview__item" role="treeitem" aria-selected="false" tabindex="-1" id="button">
        <div class="treeview__item-content">
          <span class="treeview__icon"></span>
          <span class="treeview__label">Button</span>
        </div>
      </li>
    </ul>
  </li>
</ul>
`;

const SelectedStateTreeView = () => {
    const [selected, setSelected] = useState<string>('treeview');

    return (
        <div>
            <div style={{marginBottom: '1rem', color: 'var(--color-text-muted)'}}>
                Selected ID: <strong>{selected}</strong>
            </div>
            <TreeView style={{maxWidth: '300px'}} selectedId={selected} onSelect={setSelected}>
                <TreeItem id="components" label="components" defaultExpanded>
                    <TreeItem id="treeview" label="TreeView"/>
                    <TreeItem id="button" label="Button"/>
                    <TreeItem id="input" label="Input"/>
                </TreeItem>
                <TreeItem id="styles" label="styles">
                    <TreeItem id="global" label="global.scss"/>
                    <TreeItem id="variables" label="_variables.scss"/>
                </TreeItem>
            </TreeView>
        </div>
    );
};

export default SelectedStateTreeView;
