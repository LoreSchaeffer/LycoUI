import {MenuController} from '../../primitives/Menu/MenuController';
import {controllerRegistry} from '../../vanilla/controller-registry';
import {classContract} from '../../styles/class-contract';

/** Enhances authored dropdown markup with the same MenuController used by composite menus. */
export function initLycoDropdownMenus(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(`.${classContract.dropdown.root}`).forEach((menu) => {
    if (controllerRegistry.get(menu, 'dropdown-menu')) return;
    const trigger = menu.querySelector<HTMLElement>(`.${classContract.dropdown.trigger}`);
    const surface = menu.querySelector<HTMLElement>(`.${classContract.dropdown.menu}`);
    if (!trigger || !surface) return;
    const controller = new MenuController(trigger, surface);
    controllerRegistry.register(menu, 'dropdown-menu', controller);
  });
}
