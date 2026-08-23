export class TabsController {
  private element: HTMLElement;
  private triggers: NodeListOf<HTMLButtonElement>;
  private contents: NodeListOf<HTMLElement>;
  private boundHandleClick: (e: MouseEvent) => void;

  constructor(element: HTMLElement) {
    this.element = element;
    this.triggers = this.element.querySelectorAll('[data-lyco-tab-trigger]');
    this.contents = this.element.querySelectorAll('[data-lyco-tab-content]');
    this.boundHandleClick = this.handleClick.bind(this);

    if (this.element.dataset.lycoInitialized === 'true') return;

    this.init();
  }

  private init() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', this.boundHandleClick);
    });
    this.element.dataset.lycoInitialized = 'true';

    // Hide non-active contents initially
    const activeTrigger = Array.from(this.triggers).find(t => t.classList.contains('is-active')) || this.triggers[0];
    const activeKey = activeTrigger ? activeTrigger.dataset.lycoTabTrigger : null;
    
    this.contents.forEach(content => {
      if (content.dataset.lycoTabContent !== activeKey) {
        content.style.display = 'none';
      }
    });
  }

  private handleClick(e: MouseEvent) {
    const trigger = (e.target as HTMLElement).closest('[data-lyco-tab-trigger]') as HTMLButtonElement;
    if (!trigger) return;

    if (trigger.disabled || trigger.classList.contains('is-disabled')) return;

    const eventKey = trigger.dataset.lycoTabTrigger;
    if (!eventKey) return;

    // Update triggers
    this.triggers.forEach(t => {
      if (t === trigger) {
        t.classList.add('is-active');
        t.setAttribute('aria-selected', 'true');
      } else {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      }
    });

    // Update contents
    this.contents.forEach(content => {
      if (content.dataset.lycoTabContent === eventKey) {
        content.style.display = ''; // Restore default display
      } else {
        content.style.display = 'none';
      }
    });
  }

  public destroy() {
    this.triggers.forEach(trigger => {
      trigger.removeEventListener('click', this.boundHandleClick);
    });
    delete this.element.dataset.lycoInitialized;
  }
}

// Auto-initialization
export const initTabs = () => {
  const elements = document.querySelectorAll('[data-lyco-tabs]');
  elements.forEach(element => {
    new TabsController(element as HTMLElement);
  });
};
