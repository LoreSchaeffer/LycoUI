import {formatTime, parseTime} from './time-model';
import {createPickerShell, emitPickerChange, renderTimePicker, setPickerValidity, type PickerShell} from './PickerRenderer';
import {controllerRegistry} from '../../vanilla/controller-registry';

export class LycoTimePickerController {
  private readonly input: HTMLInputElement;
  private readonly shell: PickerShell;
  private readonly onChange = (): void => this.normalize();

  constructor(input: HTMLInputElement) {
    this.input = input;
    this.shell = createPickerShell(input, 'time', 'Time picker');
    this.renderPopover();
    input.addEventListener('change', this.onChange);
  }

  private normalize(): void {
    if (!this.input.value) {
      setPickerValidity(this.input, true);
      emitPickerChange(this.input, 'time');
      return;
    }
    const time = parseTime(this.input.value);
    if (!time) {
      setPickerValidity(this.input, false);
      return;
    }
    // Native time inputs accept only the machine-readable 24-hour value. A
    // display formatter may use 12-hour text, but form submission must remain valid.
    this.input.value = formatTime(time);
    setPickerValidity(this.input, true);
    emitPickerChange(this.input, 'time');
  }

  private renderPopover(): void {
    const time = parseTime(this.input.value) ?? {hours: 0, minutes: 0};
    renderTimePicker(this.shell.popover, time.hours, time.minutes, this.input.getAttribute('data-use-12-hour') === 'true', (hours, minutes) => {
      this.input.value = formatTime({hours, minutes});
      this.normalize();
      this.renderPopover();
    });
  }

  destroy(): void {
    this.input.removeEventListener('change', this.onChange);
    this.shell.destroy();
  }
}

export function initLycoTimePickers(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>('[data-lyco-timepicker]').forEach((input) => {
    if (controllerRegistry.get(input, 'timepicker')) return;
    controllerRegistry.register(input, 'timepicker', new LycoTimePickerController(input));
  });
}
