import {CollapseController} from '../../primitives/Collapse/CollapseController';
import {MenuController} from '../../primitives/Menu/MenuController';
import {BaseController} from '../../vanilla/BaseController';
import {controllerRegistry} from '../../vanilla/controller-registry';

export function initLycoNavbars(): void {
    const navbars = document.querySelectorAll<HTMLElement>('.navbar');
    navbars.forEach(navbar => {
        if (!controllerRegistry.get(navbar, 'navbar')) {
            const controller = new LycoNavbarController(navbar);
            controllerRegistry.register(navbar, 'navbar', controller);
            navbar.dataset.lycoInitialized = 'true';
        }
    });
}

/**
 * Controller for the Vanilla JS LycoNavbar component.
 */
export class LycoNavbarController extends BaseController {
    private readonly navbar: HTMLElement;
    private readonly collapseControllers: CollapseController[] = [];
    private readonly menuControllers: MenuController[] = [];

    constructor(navbar: HTMLElement) {
        super();
        this.navbar = navbar;
        const toggles = [...navbar.querySelectorAll<HTMLButtonElement>('.navbar-toggle')];
        const collapses = [...navbar.querySelectorAll<HTMLElement>('.navbar-collapse')];
        toggles.forEach((toggle, index) => {
            const controlsId = toggle.getAttribute('aria-controls');
            const panel = controlsId
                ? collapses.find(candidate => candidate.id === controlsId)
                : collapses[index];
            if (!panel) return;
            const controller = new CollapseController(toggle, panel, toggle.getAttribute('aria-expanded') === 'true');
            this.collapseControllers.push(controller);
            this.addCleanup(() => controller.destroy());
        });
        navbar.querySelectorAll<HTMLElement>('.navbar-dropdown').forEach((dropdown) => {
            const trigger = dropdown.querySelector<HTMLElement>('.navbar-dropdown-trigger');
            const surface = dropdown.querySelector<HTMLElement>('.navbar-dropdown-menu');
            if (!trigger || !surface) return;
            const controller = new MenuController(trigger, surface);
            this.menuControllers.push(controller);
            this.addCleanup(() => controller.destroy());
        });
        navbar.querySelectorAll<HTMLElement>('.navbar-link').forEach((link) => this.listen(link, 'click', () => this.closeAll()));
    }

    private closeAll(): void {
        this.collapseControllers.forEach((controller) => controller.close());
        this.menuControllers.forEach((controller) => controller.close());
    }

    public override destroy(): void {
        this.closeAll();
        super.destroy();
        delete this.navbar.dataset.lycoInitialized;
    }
}
