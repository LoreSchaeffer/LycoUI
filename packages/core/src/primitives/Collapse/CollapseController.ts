import {BaseController} from '../../vanilla/BaseController';

export class CollapseController extends BaseController {
  private openState: boolean;
  private readonly trigger: HTMLElement;
  private readonly panel: HTMLElement;

  public constructor(trigger: HTMLElement, panel: HTMLElement, open = false) {
    super();
    this.trigger = trigger;
    this.panel = panel;
    this.openState = open;
    this.listen(trigger, 'click', () => this.toggle());
    this.sync();
  }

  public toggle(): void { this.openState = !this.openState; this.sync(); }
  public open(): void { this.openState = true; this.sync(); }
  public close(): void { this.openState = false; this.sync(); }

  private sync(): void {
    this.trigger.setAttribute('aria-expanded', String(this.openState));
    this.panel.hidden = !this.openState;
    if (this.openState) this.panel.removeAttribute('inert');
    else this.panel.setAttribute('inert', '');
  }
}
