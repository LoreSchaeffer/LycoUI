import {clampDate, formatLocalDate, parseLocalDate} from './date-model';
import {createPickerShell, emitPickerChange, renderCalendar, setPickerValidity, type PickerShell} from './PickerRenderer';
import {controllerRegistry} from '../../vanilla/controller-registry';

export class LycoDatePickerController {
  private readonly input: HTMLInputElement;
  private readonly shell: PickerShell;
  private viewDate: Date;
  private readonly onChange = (): void => this.normalize();

  constructor(input: HTMLInputElement) {
    this.input = input;
    this.viewDate = parseLocalDate(input.value) ?? new Date();
    this.shell = createPickerShell(input, 'date', 'Date picker calendar');
    this.renderPopover();
    input.addEventListener('change', this.onChange);
  }

  private normalize(): void {
    if (!this.input.value) {
      setPickerValidity(this.input, true);
      emitPickerChange(this.input, 'date');
      return;
    }
    const date = parseLocalDate(this.input.value);
    if (!date) {
      setPickerValidity(this.input, false);
      return;
    }
    const min = this.input.min ? parseLocalDate(this.input.min) ?? undefined : undefined;
    const max = this.input.max ? parseLocalDate(this.input.max) ?? undefined : undefined;
    this.input.value = formatLocalDate(clampDate(date, min, max));
    this.viewDate = date;
    setPickerValidity(this.input, true);
    emitPickerChange(this.input, 'date');
  }

  private renderPopover(): void {
    const min = this.input.min ? parseLocalDate(this.input.min) ?? undefined : undefined;
    const max = this.input.max ? parseLocalDate(this.input.max) ?? undefined : undefined;
    renderCalendar(this.shell.popover, this.viewDate, parseLocalDate(this.input.value), min, max, (date) => {
      this.input.value = formatLocalDate(date);
      this.normalize();
      this.shell.close(true);
    }, (direction) => {
      this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + direction, 1);
      this.renderPopover();
    });
  }

  destroy(): void {
    this.input.removeEventListener('change', this.onChange);
    this.shell.destroy();
  }
}

export function initLycoDatePickers(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>('[data-lyco-datepicker]').forEach((input) => {
    if (controllerRegistry.get(input, 'datepicker')) return;
    controllerRegistry.register(input, 'datepicker', new LycoDatePickerController(input));
  });
}
