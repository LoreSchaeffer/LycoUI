import {initLycoAccordions} from '../components/Accordion/Accordion.vanilla';
import {initLycoAlerts} from '../components/Alert/Alert.vanilla';
import {initLycoCodes} from '../components/Code/Code.vanilla';
import {initLycoFileUploads} from '../components/FileUpload/FileUpload.vanilla';
import {initLycoImageViewers} from '../components/ImageViewer/ImageViewer.vanilla';
import {initLycoInputs} from '../components/Input/Input.vanilla';
import {initLycoModals} from '../components/Modal/Modal.vanilla';
import {initLycoNavbars} from '../components/Navbar/Navbar.vanilla';
import {initLycoPagination} from '../components/Pagination/Pagination.vanilla';
import {initLycoRanges} from '../components/Range/Range.vanilla';
import {initLycoSelects} from '../components/Select/Select.vanilla';
import {initLycoSidebars} from '../components/Sidebar/Sidebar.vanilla';
import {initTabs} from '../components/Tabs/Tabs.vanilla';
import {initTooltips} from '../components/Tooltip/Tooltip.vanilla';
import {controllerRegistry} from './controller-registry';

export function initLycoUI(root: ParentNode = document): void {
  initLycoSelects(root);
  initLycoRanges();
  initLycoInputs(root);
  initLycoAccordions();
  initLycoAlerts();
  initLycoCodes();
  initLycoModals(root);
  initLycoNavbars();
  initLycoSidebars();
  initLycoPagination();
  initTabs();
  initTooltips(root);
  initLycoFileUploads();
  initLycoImageViewers(root);
}

export function destroyLycoUI(root: ParentNode = document): void {
  controllerRegistry.destroy(root);
}
