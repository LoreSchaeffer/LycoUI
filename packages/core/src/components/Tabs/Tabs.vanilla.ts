import {handleListKeyboardNav} from '../../utils/keyboard';
import {setAriaSelected} from '../../utils/aria';

/**
 * Controller for the Vanilla JS Tabs component.
 * Manages WAI-ARIA states and keyboard navigation.
 */
export class TabsController {
    private element: HTMLElement;
    private triggers: NodeListOf<HTMLButtonElement>;
    private contents: NodeListOf<HTMLElement>;
    private boundHandleClick: (e: MouseEvent) => void;
    private boundHandleKeyDown: (e: KeyboardEvent) => void;

    /**
     * Initializes the Tabs controller.
     * @param element - The root DOM element containing the tabs.
     */
    constructor(element: HTMLElement) {
        this.element = element;
        this.triggers = this.element.querySelectorAll('[data-lyco-tab-trigger]');
        this.contents = this.element.querySelectorAll('[data-lyco-tab-content]');
        this.boundHandleClick = this.handleClick.bind(this);
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);

        if (this.element.dataset.lycoInitialized === 'true') return;

        this.init();
    }

    /**
     * Binds event listeners and sets initial states.
     */
    private init() {
        const activeTrigger = Array.from(this.triggers).find(t => t.classList.contains('is-active')) || this.triggers[0];
        const activeKey = activeTrigger ? activeTrigger.dataset.lycoTabTrigger : null;

        const idPrefix = `lyco-tabs-${Math.random().toString(36).substr(2, 9)}`;

        this.triggers.forEach(trigger => {
            const key = trigger.dataset.lycoTabTrigger;
            if (!key) return;

            if (!trigger.id) trigger.id = `${idPrefix}-tab-${key}`;
            if (!trigger.hasAttribute('aria-controls')) trigger.setAttribute('aria-controls', `${idPrefix}-panel-${key}`);

            trigger.addEventListener('click', this.boundHandleClick);
        });

        this.contents.forEach(content => {
            const key = content.dataset.lycoTabContent;
            if (!key) return;

            if (!content.id) content.id = `${idPrefix}-panel-${key}`;
            if (!content.hasAttribute('aria-labelledby')) content.setAttribute('aria-labelledby', `${idPrefix}-tab-${key}`);

            if (key !== activeKey) {
                content.style.display = 'none';
            }
        });

        this.element.addEventListener('keydown', this.boundHandleKeyDown);
        this.element.dataset.lycoInitialized = 'true';
    }

    private handleKeyDown(e: KeyboardEvent) {
        const list = e.target as HTMLElement;
        if (!list.closest('.tabs__list')) return;

        handleListKeyboardNav(
            e,
            this.element,
            '[role="tab"]:not(.is-disabled):not(:disabled)',
            true,
            true,
            (item) => item.click()
        );
    }

    private handleClick(e: MouseEvent) {
        const trigger = (e.target as HTMLElement).closest('[data-lyco-tab-trigger]') as HTMLButtonElement;
        if (!trigger) return;

        if (trigger.disabled || trigger.classList.contains('is-disabled')) return;

        const eventKey = trigger.dataset.lycoTabTrigger;
        if (!eventKey) return;

        this.triggers.forEach(t => {
            if (t === trigger) {
                t.classList.add('is-active');
                setAriaSelected(t, true);
            } else {
                t.classList.remove('is-active');
                setAriaSelected(t, false);
            }
        });

        this.contents.forEach(content => {
            if (content.dataset.lycoTabContent === eventKey) {
                content.style.display = '';
            } else {
                content.style.display = 'none';
            }
        });
    }

    /**
     * Destroys the controller, removing all event listeners to prevent memory leaks.
     */
    public destroy() {
        this.triggers.forEach(trigger => {
            trigger.removeEventListener('click', this.boundHandleClick);
        });
        this.element.removeEventListener('keydown', this.boundHandleKeyDown);
        delete this.element.dataset.lycoInitialized;
    }
}

export const initTabs = () => {
    const elements = document.querySelectorAll('.tabs:not([data-lyco-initialized])');
    elements.forEach(element => {
        new TabsController(element as HTMLElement);
    });
};

