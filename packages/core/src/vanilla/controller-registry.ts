import type { Controller } from './BaseController';

class ControllerRegistry {
  private readonly controllers = new WeakMap<HTMLElement, Map<string, Controller>>();

  public get(element: HTMLElement, key: string): Controller | undefined {
    return this.controllers.get(element)?.get(key);
  }

  public register(element: HTMLElement, key: string, controller: Controller): void {
    const controllers = this.controllers.get(element) ?? new Map<string, Controller>();
    controllers.get(key)?.destroy();
    controllers.set(key, controller);
    this.controllers.set(element, controllers);
  }

  public destroy(root: ParentNode): void {
    const elements = root instanceof HTMLElement ? [root, ...root.querySelectorAll<HTMLElement>('*')] : [...root.querySelectorAll<HTMLElement>('*')];
    for (const element of elements) {
      const controllers = this.controllers.get(element);
      if (!controllers) continue;
      for (const controller of controllers.values()) controller.destroy();
      this.controllers.delete(element);
      element.removeAttribute('data-lyco-initialized');
    }
  }
}

export const controllerRegistry = new ControllerRegistry();
