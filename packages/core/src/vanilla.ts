import {initLycoSelects} from './components/Select/Select.vanilla';

export const initLycoUI = (): void => {
    initLycoSelects();
};

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLycoUI);
    } else {
        initLycoUI();
    }
}

export {
    initLycoSelects
};