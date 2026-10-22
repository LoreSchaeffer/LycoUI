import {openModalLayer} from '../../interaction/modal-layer';
import {trapFocus} from '../../interaction/focus-scope';
import {BaseController} from '../../vanilla/BaseController';

export class DrawerController extends BaseController {
  private readonly root: HTMLElement;
  private dispose?: () => void;

  public constructor(root: HTMLElement) {
    super();
    this.root = root;
    this.listen(root, 'keydown', ((event: KeyboardEvent) => trapFocus(event, root)) as EventListener);
  }

  public open(returnFocus?: HTMLElement): void {
    this.dispose?.();
    this.dispose = openModalLayer({root: this.root, returnFocus});
  }

  public close(): void { this.dispose?.(); this.dispose = undefined; }
  public override destroy(): void { this.close(); super.destroy(); }
}
