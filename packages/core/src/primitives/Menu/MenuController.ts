import {createDismissableLayer} from '../../interaction/dismissable-layer';
import {BaseController} from '../../vanilla/BaseController';

export class MenuController extends BaseController {
  private releaseDismissal?: () => void;
  private readonly trigger: HTMLElement;
  private readonly surface: HTMLElement;

  public constructor(trigger: HTMLElement, surface: HTMLElement) {
    super();
    this.trigger = trigger;
    this.surface = surface;
    this.listen(trigger, 'click', () => this.toggle());
    this.close();
  }

  public open(): void {
    if (!this.surface.hidden) return;
    this.surface.hidden = false;
    this.trigger.setAttribute('aria-expanded', 'true');
    this.releaseDismissal = createDismissableLayer({
      contains: (target) => this.trigger.contains(target) || this.surface.contains(target),
      onDismiss: () => this.close(),
    });
  }

  public close(): void {
    this.releaseDismissal?.();
    this.releaseDismissal = undefined;
    this.surface.hidden = true;
    this.trigger.setAttribute('aria-expanded', 'false');
  }

  public toggle(): void {
    if (this.surface.hidden) this.open();
    else this.close();
  }

  public override destroy(): void {
    this.close();
    super.destroy();
  }
}
