/**
 * Global type augmentations for LycoUI vanilla controllers.
 *
 * These extend the Window interface so that vanilla JS consumers
 * can register custom formatters and validators without `as any` casts.
 */

/** Registry of named formatter functions (used by Range vanilla controller). */
export interface LycoFormatters {
  [name: string]: (value: number) => string | number;
}

/** Registry of named validator functions (used by Input vanilla controller). */
export interface LycoValidators {
  [name: string]: (value: string) => string | null | undefined;
}

declare global {
  interface Window {
    lycoFormatters?: LycoFormatters;
    lycoValidators?: LycoValidators;
  }
}
