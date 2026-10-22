import {initLycoSelects} from './components/Select/Select.vanilla';
import {initLycoRanges} from './components/Range/Range.vanilla';
import {initLycoInputs} from './components/Input/Input.vanilla';
import {snackbar} from './components/Snackbar/Snackbar.vanilla';
import {initLycoModals, LycoModalController} from './components/Modal/Modal.vanilla';
import {initLycoNavbars, LycoNavbarController} from './components/Navbar/Navbar.vanilla';
import {notification} from './components/Notification/Notification.vanilla';
import {initLycoPagination} from './components/Pagination/Pagination.vanilla';
import {initTabs} from './components/Tabs/Tabs.vanilla';
import {initTooltips} from './components/Tooltip/Tooltip.vanilla';
import {initLycoFileUploads} from './components/FileUpload/FileUpload.vanilla';
import {initLycoImageViewers, LycoImageViewerController} from './components/ImageViewer/ImageViewer.vanilla';
import {initLycoTextareas, LycoTextareaController} from './components/Textarea/Textarea.vanilla';
import {initLycoDatePickers, LycoDatePickerController} from './components/DatePicker/DatePicker.vanilla';
import {initLycoTimePickers, LycoTimePickerController} from './components/DatePicker/TimePicker.vanilla';
import {initLycoDateTimePickers, LycoDateTimePickerController} from './components/DatePicker/DateTimePicker.vanilla';
import {initLycoDataTables, LycoDataTableController} from './components/DataTable/DataTable.vanilla';
import {initLycoCarousels, LycoCarouselController} from './components/Carousel/Carousel.vanilla';
import {destroyLycoUI, initLycoUI} from './vanilla/init';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initLycoUI());
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
    LycoImageViewerController,
    initLycoTextareas,
    LycoTextareaController,
    initLycoDatePickers,
    LycoDatePickerController,
    initLycoTimePickers,
    LycoTimePickerController,
    initLycoDateTimePickers,
    LycoDateTimePickerController,
    initLycoDataTables,
    LycoDataTableController,
    initLycoCarousels,
    LycoCarouselController,
    initLycoUI,
    destroyLycoUI
};
