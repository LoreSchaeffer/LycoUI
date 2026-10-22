import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../../packages/core/src/index';
import { initLycoUI } from '../../packages/core/src/vanilla';

const reactRoot = document.querySelector('#react-root');
if (!reactRoot) {
  throw new Error('The React fixture root is missing');
}

createRoot(reactRoot).render(createElement(Button, { type: 'button' }, 'React button'));
initLycoUI();
document.documentElement.dataset.lycoHarnessReady = 'true';
