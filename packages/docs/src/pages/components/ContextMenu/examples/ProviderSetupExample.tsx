import { ContextMenuProvider } from '@loreschaeffer/lyco-ui';

export const title = 'Provider Setup';
export const description = <p>To use the global Context Menu system, you must wrap your application (or the specific subtree where you want menus to work) in the <code>&lt;ContextMenuProvider&gt;</code>. This handles the rendering Portal and global escape/click-away events.</p>;
export const order = 1;

export const vanillaHtml = `
<!-- In Vanilla JS, LycoUI handles the provider logic automatically. 
     Just ensure you have the vanilla.js bundle loaded. -->
`;

export default function ProviderSetupExample() {
  return (
    <div className="p-4 rounded border border-subtle" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <pre style={{ margin: 0, background: 'transparent' }}>
        <code style={{ color: 'var(--color-info)' }}>{`import { ContextMenuProvider } from '@loreschaeffer/lyco-ui';

function App() {
  return (
    <ContextMenuProvider>
      <YourApplication />
    </ContextMenuProvider>
  );
}`}</code>
      </pre>
    </div>
  );
}
