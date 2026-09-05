import React from 'react';
import {TreeItem, TreeView} from '@loreschaeffer/lyco-ui';
import {FiDownload, FiFileText, FiFolder, FiImage} from 'react-icons/fi';

export const title = 'Custom Icons';
export const description = 'Provide custom React elements to the `icon` prop to override the default chevrons.';
export const order = 2;

export const vanillaHtml = `
<ul class="treeview" role="tree">
  <li class="treeview__item" role="treeitem" aria-expanded="true" tabindex="0" id="documents">
    <div class="treeview__item-content">
      <span class="treeview__icon">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      </span>
      <span class="treeview__label">Documents</span>
    </div>
    <ul class="treeview__group" role="group">
      <li class="treeview__item" role="treeitem" tabindex="-1" id="resume">
        <div class="treeview__item-content">
          <span class="treeview__icon">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </span>
          <span class="treeview__label">resume.pdf</span>
        </div>
      </li>
    </ul>
  </li>
</ul>
`;

const CustomIconsTreeView = () => {
    return (
        <TreeView style={{maxWidth: '300px'}}>
            <TreeItem id="documents" label="Documents" icon={<FiFolder/>} defaultExpanded>
                <TreeItem id="resume" label="resume.pdf" icon={<FiFileText/>}/>
                <TreeItem id="cover-letter" label="cover-letter.docx" icon={<FiFileText/>}/>
            </TreeItem>
            <TreeItem id="pictures" label="Pictures" icon={<FiFolder/>}>
                <TreeItem id="vacation" label="vacation.jpg" icon={<FiImage/>}/>
            </TreeItem>
            <TreeItem id="downloads" label="Downloads" icon={<FiDownload/>}/>
        </TreeView>
    );
};

export default CustomIconsTreeView;
