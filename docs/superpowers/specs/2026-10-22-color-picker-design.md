# ColorPicker Design

## Goal

Add a React ColorPicker to the core package, with a documented public API and examples in the documentation application.

## Public API

`ColorPicker` accepts controlled `value` and `onChange`, plus `defaultValue` for uncontrolled use. Values are normalized to six-digit uppercase HEX strings. `swatches` is an optional string array; when omitted, the component renders a compact default palette. `disabled`, `className`, and standard `div` attributes are supported.

The trigger contains a visual swatch and text input. Committing a valid CSS HEX value or `rgb(r, g, b)` value updates the selected HEX value; invalid edits revert to the last valid value on blur or Enter. The dropdown contains selectable swatches, a native color input, and a text field sharing the same selection state.

## Popover and accessibility

The dropdown is rendered to `document.body` through a portal and positioned in document coordinates using the same viewport-aware calculation as the established picker popover. It repositions on scroll and resize, never calls `scrollIntoView`, and therefore does not cause page scrolling when opened.

`useId()` creates stable IDs linking the trigger input to the dialog using `aria-controls`, `aria-expanded`, and `aria-haspopup="dialog"`. The dialog has an accessible label. Escape and outside pointer interaction close it; choosing a preset or a native color leaves the popover open so a user can make successive adjustments.

## Files

- `packages/core/src/components/ColorPicker/ColorPicker.tsx`: component, value parsing, controllable state, portal/popover lifecycle.
- `packages/core/src/components/ColorPicker/ColorPicker.scss`: component styles using only single-dash names.
- `packages/core/src/components/ColorPicker/index.ts`: public component exports.
- `packages/core/src/index.ts`: main package export.
- `tests/unit/color-picker.test.tsx`: behavior and placement regression coverage.
- `packages/docs/src/pages/components/ColorPicker/ColorPickerDoc.tsx`: documentation page.
- `packages/docs/src/pages/components/ColorPicker/api.tsx`: props reference.
- `packages/docs/src/pages/components/ColorPicker/examples/BasicExample.tsx`: controlled basic usage.
- `packages/docs/src/pages/components/ColorPicker/examples/PredefinedSwatchesExample.tsx`: custom swatch palette usage.

## Verification

Tests will prove that invalid user text does not alter the value, RGB and HEX input normalize to the expected color, preset selection calls `onChange`, generated ARIA IDs connect trigger and dialog, and portal placement is applied without invoking scrolling APIs. The implementation will then pass `npm run typecheck` and `npm run build`.
