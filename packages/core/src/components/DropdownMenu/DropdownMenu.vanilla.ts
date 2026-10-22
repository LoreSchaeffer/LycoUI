import {MenuController} from '../../primitives/Menu/MenuController';
import {controllerRegistry} from '../../vanilla/controller-registry';

/** Enhances authored dropdown markup with the same MenuController used by composite menus. */
export function initLycoDropdownMenus(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('.dropdown-menu').forEach((menu) => {
    if (controllerRegistry.get(menu, 'dropdown-menu')) return;
    const trigger = menu.querySelector<HTMLElement>('.dropdown-menu__trigger');
    const surface = menu.querySelector<HTMLElement>('.dropdown-menu__content');
    if (!trigger || !surface) return;
    const controller = new MenuController(trigger, surface);
    controllerRegistry.register(menu, 'dropdown-menu', controller);
  });
}
