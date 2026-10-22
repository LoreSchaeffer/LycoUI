import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../../packages/core/src/index';
import { destroyLycoUI, initLycoUI } from '../../packages/core/src/vanilla';

const reactRoot = document.querySelector('#react-root');
if (!reactRoot) {
  throw new Error('The React fixture root is missing');
}

createRoot(reactRoot).render(createElement(Button, { type: 'button' }, 'React button'));
initLycoUI();
(window as Window & { lycoHarness?: { init: () => void; destroy: () => void } }).lycoHarness = {
  init: () => initLycoUI(),
  destroy: () => destroyLycoUI(),
};
document.documentElement.dataset.lycoHarnessReady = 'true';
