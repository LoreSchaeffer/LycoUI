import {initLycoSelects} from './components/Select/Select.vanilla';
import {initLycoRanges} from './components/Range/Range.vanilla';
import {initLycoInputs} from './components/Input/Input.vanilla';
import {initLycoAccordions} from './components/Accordion/Accordion.vanilla';
import {initLycoAlerts} from './components/Alert/Alert.vanilla';
import {initLycoCodes} from './components/Code/Code.vanilla';
import {snackbar} from './components/Snackbar/Snackbar.vanilla';
import {initLycoModals, LycoModalController} from './components/Modal/Modal.vanilla';
import {initLycoNavbars, LycoNavbarController} from './components/Navbar/Navbar.vanilla';
import {initLycoSidebars} from './components/Sidebar/Sidebar.vanilla';
import {notification} from './components/Notification/Notification.vanilla';
import {initLycoPagination} from './components/Pagination/Pagination.vanilla';
import {initTabs} from './components/Tabs/Tabs.vanilla';
import {initTooltips} from './components/Tooltip/Tooltip.vanilla';
import {initLycoFileUploads} from './components/FileUpload/FileUpload.vanilla';
import {initLycoImageViewers, LycoImageViewerController} from './components/ImageViewer/ImageViewer.vanilla';

export const initLycoUI = (): void => {
    initLycoSelects();
    initLycoRanges();
    initLycoInputs();
    initLycoAccordions();
    initLycoAlerts();
    initLycoCodes();
    initLycoModals();
    initLycoNavbars();
    initLycoSidebars();
    initLycoPagination();
    initTabs();
    initTooltips();
    initLycoFileUploads();
    initLycoImageViewers();
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
    snackbar,
    notification,
    initLycoModals,
    LycoModalController,
    initLycoNavbars,
    LycoNavbarController,
    initLycoPagination,
    initTabs,
    initTooltips,
    initLycoFileUploads,
    initLycoImageViewers,
    LycoImageViewerController
};