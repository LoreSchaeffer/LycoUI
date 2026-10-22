import {ContextMenuProvider, useContextMenu} from '@loreschaeffer/lyco-ui';

export const title = 'Complex Nested Menu';
export const description = <p>This example demonstrates right-clicking an area to open a rich context menu, complete with danger states, separators, and recursively nested submenus. <strong>Right-click inside the dashed box.</strong></p>;
export const order = 2;

export const vanillaHtml = `
<div class="interactive-zone" data-lyco-context-menu="#context-menu-example">
  Right click me
</div>
<ul id="context-menu-example" class="context-menu" role="menu" hidden tabindex="-1">
  <li class="context-menu-item" role="menuitem">Edit File</li>
  <li class="context-menu-separator" role="separator"></li>
  <li class="context-menu-item context-menu-item-danger" role="menuitem">Delete</li>
</ul>
`;

function ContextBox() {
    const {showContextMenu} = useContextMenu();

    const handleContextMenu = (e: React.MouseEvent) => {
        showContextMenu(e, [
            {id: 'edit', label: 'Edit File', onClick: () => console.log('Edit')},
            {id: 'dup', label: 'Duplicate'},
            {id: 'sep1', type: 'separator'},
            {
                id: 'share',
                label: 'Share...',
                submenu: [
                    {id: 'social', label: 'To Social'},
                    {id: 'email', label: 'Via Email'},
                    {
                        id: 'advanced',
                        label: 'Advanced Options',
                        submenu: [
                            {id: 'link', label: 'Copy Link'},
                            {id: 'embed', label: 'Embed Code'}
                        ]
                    }
                ]
            },
            {id: 'sep2', type: 'separator'},
            {id: 'delete', label: 'Delete', danger: true}
        ]);
    };

    return (
        <div
            onContextMenu={handleContextMenu}
            style={{
                width: '100%',
                height: '250px',
                border: '2px dashed var(--color-border-strong)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-bg-surface)',
                cursor: 'context-menu'
            }}
        >
            <p className="text-muted">Right-click anywhere inside this box</p>
        </div>
    );
}

export default function ComplexExample() {
    return (
        <ContextMenuProvider>
            <ContextBox/>
        </ContextMenuProvider>
    );
}
