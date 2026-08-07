export function initLycoCodes(): void {
  const codes = document.querySelectorAll<HTMLDivElement>('.lyco-code:not([data-lyco-initialized])');
  
  codes.forEach(code => {
    code.setAttribute('data-lyco-initialized', 'true');

    // Language Selector
    const select = code.querySelector<HTMLSelectElement>('.lyco-code__lang-select');
    if (select) {
      select.addEventListener('change', (e) => {
        const lang = (e.target as HTMLSelectElement).value;
        code.setAttribute('data-language', lang);
      });
    }

    // Copy Button
    const copyBtn = code.querySelector<HTMLButtonElement>('.lyco-code__action[aria-label="Copy code"]');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        // Look for the pre>code element (we use textContent to avoid HTML tags)
        const codeElement = code.querySelector('.lyco-code__body pre');
        if (codeElement && codeElement.textContent) {
          try {
            await navigator.clipboard.writeText(codeElement.textContent);
            // Visual feedback could be added here manually by swapping SVG innerHTML
            const originalHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = `<span class="text-success"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>`;
            setTimeout(() => {
              copyBtn.innerHTML = originalHtml;
            }, 2000);
          } catch (e) {
            console.error('Failed to copy', e);
          }
        }
      });
    }

    // Download Button
    const downloadBtn = code.querySelector<HTMLButtonElement>('.lyco-code__action[aria-label="Download code"]');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const codeElement = code.querySelector('.lyco-code__body pre');
        if (codeElement && codeElement.textContent) {
          const lang = code.getAttribute('data-language') || 'txt';
          const blob = new Blob([codeElement.textContent], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `snippet.${lang}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      });
    }
    
    // Editable sync scroll
    const textarea = code.querySelector<HTMLTextAreaElement>('.lyco-code__textarea');
    if (textarea) {
      textarea.addEventListener('scroll', () => {
        const pre = code.querySelector<HTMLPreElement>('.lyco-code__highlight pre');
        if (pre) {
          pre.scrollTop = textarea.scrollTop;
          pre.scrollLeft = textarea.scrollLeft;
        }
      });
    }
  });
}
