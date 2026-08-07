import { Code } from 'lyco-ui';

export const title = 'Toolbar Options';
export const description = <p>Enable header toolbars with <code>showCopy</code>, <code>showDownload</code>, and <code>showLanguageSelector</code>.</p>;
export const order = 2;

export const vanillaHtml = `
<div class="lyco-code" data-language="css">
  <div class="lyco-code__header">
    <div class="lyco-code__header-left">
      <select class="lyco-code__lang-select">
        <option value="css">css</option>
        <option value="html">html</option>
      </select>
    </div>
    <div class="lyco-code__header-right">
      <button type="button" class="lyco-code__action" title="Copy code" aria-label="Copy code">
        <!-- SVG icon for Copy -->
      </button>
      <button type="button" class="lyco-code__action" title="Download code" aria-label="Download code">
        <!-- SVG icon for Download -->
      </button>
    </div>
  </div>
  <div class="lyco-code__body">
    <pre class="lyco-code__highlight"><code>.card { border-radius: 8px; }</code></pre>
  </div>
</div>
`;

export default function ToolbarExample() {
  const code = `:root {
  --primary-color: #007bff;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}`;

  return (
    <Code 
      language="css" 
      code={code} 
      showCopy 
      showDownload 
      showLanguageSelector 
      fileName="styles"
    />
  );
}
