import {createDismissableLayer} from '../../interaction/dismissable-layer';
import {BaseController} from '../../vanilla/BaseController';
import {controllerRegistry} from '../../vanilla/controller-registry';

class ContextMenuController extends BaseController {
  private releaseDismissal?: () => void;
  private readonly trigger: HTMLElement;
  private readonly surface: HTMLElement;

  public constructor(trigger: HTMLElement, surface: HTMLElement) {
    super();
    this.trigger = trigger;
    this.surface = surface;
    this.surface.hidden = true;
    this.listen(trigger, 'contextmenu', ((event: MouseEvent) => {
      event.preventDefault();
      this.open(event.clientX, event.clientY);
    }) as EventListener);
  }

  public open(x: number, y: number): void {
    this.close();
    this.surface.hidden = false;
    this.surface.style.left = `${x}px`;
    this.surface.style.top = `${y}px`;
    this.surface.focus();
    this.releaseDismissal = createDismissableLayer({
      contains: (target) => this.trigger.contains(target) || this.surface.contains(target),
      onDismiss: () => this.close()
    });
  }

  public close(): void {
    this.releaseDismissal?.();
    this.releaseDismissal = undefined;
    this.surface.hidden = true;
  }

  public override destroy(): void {
    this.close();
    super.destroy();
  }
}

/** Binds authored trigger elements to menu surfaces through `data-lyco-context-menu`. */
export function initLycoContextMenus(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-lyco-context-menu]').forEach((trigger) => {
    if (controllerRegistry.get(trigger, 'context-menu')) return;
    const selector = trigger.getAttribute('data-lyco-context-menu');
    const surface = selector ? document.querySelector<HTMLElement>(selector) : null;
    if (!surface) return;
    controllerRegistry.register(trigger, 'context-menu', new ContextMenuController(trigger, surface));
  });
}
