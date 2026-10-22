export interface SidebarResizeOptions {
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  onChange: (width: number) => void;
}

/** Owns one Sidebar resize interaction, including pointer-cancel cleanup. */
export class SidebarResizeController {
  private width: number;
  private readonly minWidth: number;
  private readonly maxWidth: number;
  private startX = 0;
  private startWidth = 0;
  private active = false;
  private readonly options: SidebarResizeOptions;

  public constructor(options: SidebarResizeOptions) {
    this.options = options;
    this.width = options.initialWidth ?? 256;
    this.minWidth = options.minWidth ?? 200;
    this.maxWidth = options.maxWidth ?? 400;
  }

  public begin(clientX: number): void {
    this.startX = clientX;
    this.startWidth = this.width;
    this.active = true;
  }

  public move(clientX: number): number {
    if (!this.active) return this.width;
    return this.set(this.startWidth + clientX - this.startX);
  }

  public set(width: number): number {
    this.width = Math.min(this.maxWidth, Math.max(this.minWidth, width));
    this.options.onChange(this.width);
    return this.width;
  }

  public end(): void { this.active = false; }
  public destroy(): void { this.end(); }
}
