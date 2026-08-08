import {initLycoSelects} from './components/Select/Select.vanilla';
import {initLycoRanges} from './components/Range/Range.vanilla';
import {initLycoInputs} from './components/Input/Input.vanilla';
import {initLycoAccordions} from './components/Accordion/Accordion.vanilla';
import {initLycoAlerts} from './components/Alert/Alert.vanilla';
import {initLycoCodes} from './components/Code/Code.vanilla';
import {snackbar} from './components/Snackbar/Snackbar.vanilla';

export const initLycoUI = (): void => {
    initLycoSelects();
    initLycoRanges();
    initLycoInputs();
    initLycoAccordions();
    initLycoAlerts();
    initLycoCodes();
};

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLycoUI);
    } else {
        initLycoUI();
    }
}

export {
    initLycoSelects,
    initLycoRanges,
    initLycoInputs,
    snackbar
};