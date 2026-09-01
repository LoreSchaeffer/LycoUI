# LycoUI — Design System

> **@loreschaeffer/lyco-ui** v1.1.3
> A dual-target UI component library for React and Vanilla HTML/CSS/JS.

LycoUI follows a **Linear-style dark tech** visual language — high-density, low-noise,
pixel-precise — built on a perceptually uniform OKLCH color system calibrated via Huetone
and exported as static HEX values for maximum browser stability.

This document is the single source of truth for every design token, typographic scale,
surface treatment, motion curve, and component pattern implemented in `packages/core`.

---

## Table of Contents

1. [Visual Identity](#1-visual-identity)
2. [Color System](#2-color-system)
3. [Surface & Depth Model](#3-surface--depth-model)
4. [Typography](#4-typography)
5. [Spacing Scale](#5-spacing-scale)
6. [Border Radii](#6-border-radii)
7. [Shadows & Glows](#7-shadows--glows)
8. [Motion & Easing](#8-motion--easing)
9. [Elevation (Z-Index)](#9-elevation-z-index)
10. [Responsive Breakpoints](#10-responsive-breakpoints)
11. [Grid System](#11-grid-system)
12. [Variant Architecture](#12-variant-architecture)
13. [Component Catalog](#13-component-catalog)
14. [Dual-Target Architecture](#14-dual-target-architecture)
15. [Accessibility & Keyboard Navigation](#15-accessibility--keyboard-navigation)
16. [Utility Classes](#16-utility-classes)
17. [Code Syntax Highlighting Theme](#17-code-syntax-highlighting-theme)

---

## 1. Visual Identity

### Aesthetic Principles

LycoUI's visual language is defined by five core principles extracted from the codebase:

| Principle | Implementation |
|---|---|
| **Darker dark mode** | Root surface is `#08090a` (`void`), not washed-out gray |
| **Borders over shadows** | Depth via stacked surface layers and semi-transparent 1px borders (`rgba(255,255,255,0.08)`) |
| **Perceptually uniform colors** | OKLCH-calibrated palette, exported as static HEX from Huetone |
| **Muted & luminous accents** | Semantic colors are desaturated pastels, not pure RGB primaries |
| **Font-level precision** | Negative letter-spacing on headings (`-2.2%`), tight line-heights (`1.0`) |

### Typefaces

Bundled as variable font files (`.ttf`, `font-weight: 100–900`):

| Role | Family | Fallback Stack |
|---|---|---|
| **Base** | `Noto Sans` | `system-ui, sans-serif` |
| **Monospace** | `JetBrains Mono` | `ui-monospace, 'Courier New', monospace` |

Both families ship with normal and italic variable font variants via `@font-face` declarations in `_fonts.scss`, using `font-display: swap`.

### Color Scheme

The global `<body>` declares `color-scheme: dark`. Text rendering is set to `optimizeLegibility` with `-webkit-font-smoothing: antialiased`.

---

## 2. Color System

### 2.1 Neutral Palette

Ten named neutral stops progressing from near-black to pure white. Each neutral generates three CSS custom properties: base, `-hover` (4% white mix), and `-active` (4% black mix).

| Token | HEX | Role |
|---|---|---|
| `--color-void` | `#08090a` | Root background, deepest surface |
| `--color-carbon` | `#0f1011` | Default component/card surface |
| `--color-obsidian` | `#161718` | Elevated/hover surfaces |
| `--color-graphite` | `#23252a` | Floating panels, dropdowns, popovers |
| `--color-smoke` | `#383b3f` | Heavy borders, active states |
| `--color-ash` | `#62666d` | Muted text, scrollbar thumb, neutral variant |
| `--color-fog` | `#8a8f98` | Secondary text |
| `--color-mist` | `#d0d6e0` | Light accent borders |
| `--color-bone` | `#e5e5e6` | Near-white accent |
| `--color-paper` | `#ffffff` | Primary text |

### 2.2 Semantic Color Scales

Thirteen chromatic palettes, each with an 11-stop scale (`50`–`950`) plus automatic aliases:

```
--{name}-50 … --{name}-950    (individual stops)
--{name}                       (alias → 500)
--{name}-dim                   (rgba of 500 at 15% opacity)
```

| Scale | 500 Value | Hue Family |
|---|---|---|
| `red` | `#e62d3d` | Warm red |
| `orange` | `#ff8432` | Vivid orange |
| `amber` | `#f8a800` | Golden amber |
| `yellow` | `#fac700` | Bright yellow |
| `lime` | `#aece04` | Yellow-green |
| `green` | `#36b536` | True green |
| `teal` | `#34ada1` | Blue-green |
| `cyan` | `#3aa8c0` | Cool cyan |
| `blue` | `#3984cb` | Steel blue |
| `indigo` | `#6d65fc` | Violet-blue |
| `purple` | `#a74dde` | Rich purple |
| `fuchsia` | `#cd37a8` | Magenta |
| `pink` | `#de2c7b` | Hot pink |

The `_theme-variants.scss` mixin splits these into two groups for automatic text-color contrast:

- **Light colors** (dark text on solid backgrounds): `orange`, `amber`, `yellow`, `lime`, `green`, `teal`, `cyan`
- **Dark colors** (white text on solid backgrounds): `red`, `indigo`, `purple`, `fuchsia`, `pink`, `blue`

### 2.3 Semantic Aliases

Mapped from the chromatic scales to intent-based tokens:

| Semantic Token | Source | Hover | Active | Text |
|---|---|---|---|---|
| `--color-primary` | `--blue-500` | `--blue-400` | `--blue-600` | `white` |
| `--color-success` | `--green-500` | `--green-400` | `--green-600` | `white` |
| `--color-warning` | `--amber-500` | `--amber-400` | `--amber-600` | `void` |
| `--color-danger` | `--red-500` | `--red-400` | `--red-600` | `white` |
| `--color-info` | `--cyan-500` | `--cyan-400` | `--cyan-600` | `white` |

Each semantic color also has a `-dim` variant at 15% opacity, used for subtle backgrounds (cards, alerts, badges in dim mode).

### 2.4 Border Tokens

Three levels of semi-transparent white borders for dark mode depth:

| Token | Value |
|---|---|
| `--color-border-subtle` | `rgba(255, 255, 255, 0.08)` |
| `--color-border-base` | `rgba(255, 255, 255, 0.12)` |
| `--color-border-strong` | `rgba(255, 255, 255, 0.18)` |

### 2.5 Text Color Tokens

| Token | Source | Usage |
|---|---|---|
| `--color-text-primary` | `--color-paper` | Headings, strong text, primary content |
| `--color-text-secondary` | `--color-fog` | Body paragraphs, descriptions |
| `--color-text-muted` | `--color-ash` | Captions, timestamps, disabled states |
| `--color-text-success` | `--color-green-500` | Success messages |
| `--color-text-warning` | `--color-amber-500` | Warning messages |
| `--color-text-danger` | `--color-red-500` | Error messages |
| `--color-text-info` | `--color-cyan-500` | Informational messages |

### 2.6 Static Constants

| Token | Value |
|---|---|
| `--white` | `#ffffff` |
| `--black` | `#000000` |
| `--neutral` | `var(--color-ash)` |

---

## 3. Surface & Depth Model

LycoUI uses **stacked distinct surface layers** instead of gradients or heavy drop-shadows. Five named surfaces map to the neutral palette:

| Surface Token | Source | Usage |
|---|---|---|
| `--surface-root` | `var(--color-void)` | App-level `<body>` background |
| `--surface-base` | `var(--color-carbon)` | Default cards and containers |
| `--surface-elevated` | `var(--color-obsidian)` | Hover states, elevated cards |
| `--surface-floating` | `var(--color-graphite)` | Dropdowns, popovers, floating panels |
| `--surface-active` | `var(--color-carbon-active)` | Pressed/active states |

### Depth Hierarchy

```
┌─────────────────────────────────────────────┐
│  floating  (#23252a)  — dropdowns, modals   │
│  ┌─────────────────────────────────────┐    │
│  │  elevated (#161718) — hover, cards  │    │
│  │  ┌────────────────────────────┐     │    │
│  │  │  base (#0f1011) — default  │     │    │
│  │  │  ┌──────────────────┐      │     │    │
│  │  │  │  root (#08090a)  │      │     │    │
│  │  │  └──────────────────┘      │     │    │
│  │  └────────────────────────────┘     │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### OLED Theme

An optional `.theme-oled` class overrides the root surface to `--black` (`#000000`) for true-black OLED displays:

```css
.theme-oled {
  --surface-root: var(--black);
  --color-bg-root: var(--surface-root);
}
```

---

## 4. Typography

### 4.1 Type Scale

Eight named steps covering display to caption:

| Token | Size | Line Height | Letter Spacing |
|---|---|---|---|
| `--text-display` | `72px` | `1` | `-1.584px` |
| `--text-heading-lg` | `64px` | `1` | `-1.408px` |
| `--text-heading` | `48px` | `1` | `-1.056px` |
| `--text-heading-sm` | `32px` | `1.13` | `-0.704px` |
| `--text-subheading` | `24px` | `1.33` | `-0.288px` |
| `--text-body-lg` | `20px` | `1.33` | `-0.24px` |
| `--text-body-sm` | `15px` | `1.6` | `-0.165px` |
| `--text-caption` | `13px` | `1.2` | `0px` |

### 4.2 Font Weights

| Token | Value |
|---|---|
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold` | `700` |

### 4.3 Element Mapping

Global styles apply the type scale directly to HTML heading elements:

| Element | Font Size Token | Line Height Token | Letter Spacing Token | Notes |
|---|---|---|---|---|
| `h1` | `heading` | `heading` | `heading` | |
| `h2` | `heading-sm` | `heading-sm` | `heading-sm` | |
| `h3` | `subheading` | `subheading` | `subheading` | |
| `h4` | `body-lg` | `body-lg` | `body-lg` | |
| `h5` | `body-sm` | `body-sm` | `body-sm` | |
| `h6` | `caption` | `caption` | `caption` | `text-transform: uppercase` |
| `body` | `body-sm` | `body-sm` | `body-sm` | Base reading text |
| `p` | inherited | inherited | inherited | Color: `--color-text-secondary` |
| `small` | `caption` | `caption` | — | Color: `--color-text-muted` |
| `strong`, `b` | inherited | inherited | inherited | Weight: `semibold`, Color: `--color-text-primary` |

### 4.4 Typography Utility Classes

- `.text-display` — applies display-level size/leading/tracking
- `.text-heading-lg` — applies heading-lg size/leading/tracking
- `.monospace` — applies `--font-family-mono`

---

## 5. Spacing Scale

A 4px base unit system with 16 named stops:

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `--spacing-1` | `4px` | | `--spacing-9` | `36px` |
| `--spacing-2` | `8px` | | `--spacing-10` | `40px` |
| `--spacing-3` | `12px` | | `--spacing-12` | `48px` |
| `--spacing-4` | `16px` | | `--spacing-14` | `56px` |
| `--spacing-5` | `20px` | | `--spacing-16` | `64px` |
| `--spacing-6` | `24px` | | `--spacing-20` | `80px` |
| `--spacing-7` | `28px` | | `--spacing-24` | `96px` |
| `--spacing-8` | `32px` | | `--spacing-32` | `128px` |

All spacing values are strict multiples of 4px (the baseline grid unit).

---

## 6. Border Radii

Five named radius tokens:

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `2px` | Small buttons, compact elements |
| `--radius-md` | `6px` | Default buttons, inputs, scrollbar tracks |
| `--radius-xl` | `12px` | Cards, larger containers |
| `--radius-2xl` | `16px` | Modal dialogs, hero sections |
| `--radius-full` | `9999px` | Pill badges, rounded buttons, avatars |

---

## 7. Shadows & Glows

### 7.1 Shadow Steps

Linear-style shadows emphasize borders and subtle depth rather than heavy blurs:

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `rgba(0,0,0,0.4) 0px 2px 4px 0px` | Default card elevation |
| `--shadow-md` | `rgba(0,0,0,0.2) 0px 0px 12px 0px inset` | Inset depth (interactive hover) |
| `--shadow-subtle` | `rgb(35,37,42) 0px 0px 0px 1px inset` | 1px inset ring (graphite) |
| `--shadow-subtle-2` | `rgba(0,0,0,0.2) 0px 0px 0px 1px` | 1px outer ring |
| `--shadow-xl` | `rgba(8,9,10,0.6) 0px 4px 32px 0px` | Floating panels, heavy elevation |

### 7.2 Ambient Glows

Radial gradient-based glows using `color-mix(in oklch, …)` at 15% opacity:

| Token | Color Source |
|---|---|
| `--glow-primary` | `var(--color-primary)` |
| `--glow-success` | `var(--color-success)` |
| `--glow-danger` | `var(--color-danger)` |
| `--glow-warning` | `var(--color-warning)` |

Pattern: `radial-gradient(circle at 50% 50%, color-mix(in oklch, {color} 15%, transparent) 0%, transparent 60%)`

---

## 8. Motion & Easing

### Duration Steps

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Hover transitions, color changes |
| `--duration-normal` | `250ms` | Card transitions, panel animations |
| `--duration-slow` | `350ms` | Complex animations, reveals |

### Easing Curves

| Token | Value | Character |
|---|---|---|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth, snappy deceleration |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerate into motion |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerate out of motion |

All interactive transitions use `transform` and `opacity` for GPU-composited animation (no layout properties).

---

## 9. Elevation (Z-Index)

Layered stacking contexts for predictable overlay behavior:

| Token | Value | Usage |
|---|---|---|
| `--z-hide` | `-1` | Hidden elements |
| `--z-base` | `0` | Default stacking |
| `--z-dropdown` | `1000` | Select dropdowns, context menus |
| `--z-sticky` | `1020` | Sticky headers |
| `--z-fixed` | `1030` | Fixed navbars, sidebars |
| `--z-backdrop` | `1040` | Modal/dialog backdrops |
| `--z-modal` | `1050` | Modal dialogs |
| `--z-popover` | `1060` | Popovers, notifications |
| `--z-tooltip` | `1070` | Tooltip overlays |

---

## 10. Responsive Breakpoints

Mobile-first `min-width` breakpoints via the `respond-to($breakpoint)` SCSS mixin:

| Token | Width | Target |
|---|---|---|
| `sm` | `640px` | Large phones / small tablets |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Laptops |
| `xl` | `1280px` | Desktop monitors |
| `xxl` | `1536px` | Large displays |

Usage in SCSS:
```scss
@use "../../styles/tokens/breakpoints" as *;

@include respond-to('lg') {
  // Laptop and above
}
```

---

## 11. Grid System

A 12-column flexbox grid with responsive column classes and gutter control.

### Structure

```
Row (.row)
├── Col (.col / .col--{n})
├── Col (.col--sm--{n} .col--lg--{n})
└── Col (.col--stretch)
```

### Row

- Display: `flex`, `flex-wrap: wrap`
- Default gutter: `--spacing-4` (16px) on both axes (`--gutter-x`, `--gutter-y`)
- Alignment modifiers: `.row--align-{start|center|end}`
- Justification modifiers: `.row--justify-{center|end|between}`

### Col

- Base: `flex: 1 0 0%` (equal-width auto-fill)
- Explicit span: `.col--{1-12}` using `math.percentage(n/12)`
- Responsive spans: `.col--{sm|md|lg|xl|xxl}--{1-12}`
- Stretch: `.col--stretch` makes children fill the column height
- Self-alignment: `.col--align-{start|center|end|stretch}`

### React API

```tsx
<Row align="center" justify="between">
  <Col span={4} lg={6}>Content</Col>
  <Col span={8} lg={6} stretch>Content</Col>
</Row>
```

### Vanilla HTML

```html
<div class="row row--align-center row--justify-between">
  <div class="col col--4 col--lg--6">Content</div>
  <div class="col col--8 col--lg--6 col--stretch">Content</div>
</div>
```

---

## 12. Variant Architecture

### Type System

All variant types are defined in `src/types/types.ts`:

```typescript
type ColorVariant =
  | 'red' | 'orange' | 'amber' | 'yellow' | 'lime'
  | 'green' | 'teal' | 'cyan' | 'blue' | 'indigo'
  | 'purple' | 'fuchsia' | 'pink' | 'white';

type SemanticVariant = 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type FullVariant = ColorVariant | SemanticVariant;

type SizeVariant = 'sm' | 'md' | 'lg';

type Alignment = 'start' | 'center' | 'end';

type Orientation = 'horizontal' | 'vertical';

type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
```

### Theme Color Mixin

The `for-each-theme-color` mixin generates per-color variant classes for any component block:

```scss
// Usage in a component SCSS file:
.btn- {
  @include for-each-theme-color using($color, $is-light) {
    --btn-bg: var(--#{$color}-500);
    --btn-bg-hover: var(--#{$color}-400);
    --btn-bg-active: var(--#{$color}-600);
    @if $is-light { --btn-text: var(--color-void); }
    @else { --btn-text: var(--white); }
  }
}
// Generates: .btn-red, .btn-orange, .btn-amber, … .btn-pink
```

This pattern is consistent across Button, Card, Badge, Alert, Select, and all colored components, ensuring every component offers the full 13-color palette plus semantic aliases.

### CSS Custom Property Scoping

Component variants work by overriding scoped CSS custom properties rather than duplicating property declarations:

```scss
// Each variant sets these scoped variables:
--btn-bg
--btn-bg-hover
--btn-bg-active
--btn-text

// The base .btn rule references them once:
background-color: var(--btn-bg);
color: var(--btn-text);
```

This architecture means adding a new color to the palette automatically propagates to every component that uses the mixin.

---

## 13. Component Catalog

### 13.1 Overview

28 components organized by complexity. Components with a `.vanilla.ts` file support auto-initialization for the Vanilla target.

| Component | BEM Block | React | Vanilla | Category |
|---|---|---|---|---|
| **Button** | `.btn` | ✓ | CSS-only | Action |
| **ButtonGroup** | `.btn-group` | ✓ | CSS-only | Action |
| **Badge** | `.badge` | ✓ | CSS-only | Data Display |
| **Card** | `.card` | ✓ | CSS-only | Data Display |
| **Divider** | `.divider` | ✓ | CSS-only | Layout |
| **Spinner** | `.spinner` | ✓ | CSS-only | Feedback |
| **ProgressBar** | `.progress` | ✓ | CSS-only | Feedback |
| **Avatar** | `.avatar` | ✓ | CSS-only | Data Display |
| **Checkbox** | `.checkbox` | ✓ | CSS-only | Form |
| **Radio** | `.radio` | ✓ | CSS-only | Form |
| **Table** | `.table` | ✓ | CSS-only | Data Display |
| **Grid** (Row/Col) | `.row` / `.col` | ✓ | CSS-only | Layout |
| **Select** | `.select` | ✓ | ✓ `initLycoSelects` | Form |
| **Input** | `.input` | ✓ | ✓ `initLycoInputs` | Form |
| **Range** | `.range` | ✓ | ✓ `initLycoRanges` | Form |
| **Accordion** | `.accordion` | ✓ | ✓ `initLycoAccordions` | Disclosure |
| **Alert** | `.alert` | ✓ | ✓ `initLycoAlerts` | Feedback |
| **Code** | `.code` | ✓ | ✓ `initLycoCodes` | Data Display |
| **Modal** | `.modal` | ✓ | ✓ `initLycoModals` | Overlay |
| **Navbar** | `.navbar` | ✓ | ✓ `initLycoNavbars` | Navigation |
| **Sidebar** | `.sidebar` | ✓ | ✓ `initLycoSidebars` | Navigation |
| **Snackbar** | `.snackbar` | ✓ | ✓ `snackbar()` | Feedback |
| **Notification** | `.notification` | ✓ | ✓ `notification()` | Feedback |
| **Pagination** | `.pagination` | ✓ | ✓ `initLycoPagination` | Navigation |
| **Tabs** | `.tabs` | ✓ | ✓ `initTabs` | Navigation |
| **Tooltip** | `.tooltip` | ✓ | ✓ `initTooltips` | Overlay |
| **DataTable** | `.data-table` | ✓ | — | Data Display |
| **Carousel** | `.carousel` | ✓ | — | Data Display |
| **ContextMenu** | `.context-menu` | ✓ | — | Overlay |

### 13.2 Button

The most feature-rich primitive. Supports all `FullVariant` colors, three sizes, three visual styles, and loading states.

**BEM Structure:**
```
.btn
  .btn__icon
  .btn__icon--start
  .btn__icon--end
  .btn__spinner
```

**Modifier Classes:**

| Modifier | Class | Description |
|---|---|---|
| Size | `.btn--sm`, `.btn--lg` | Small (4px 12px), large (12px 24px) padding |
| Style | `.btn--outlined` | Transparent bg, colored border |
| Style | `.btn--ghost` | Transparent bg, no border, colored text |
| Shape | `.btn--rounded` | `border-radius: var(--radius-full)` (pill) |
| State | `.btn--static` | Disables active press `translateY` |
| State | `.btn--loading` | Shows spinner, disables interaction |
| Layout | `.btn--icon-only` | Square button (sm: 32px, md: 40px, lg: 48px) |
| Color | `.btn--primary`, `.btn--danger`, etc. | Semantic variants |
| Color | `.btn-red`, `.btn-blue`, etc. | Palette variants |

**Interaction States:** default → hover (`--btn-bg-hover`) → active (`--btn-bg-active`, `translateY(1px)`) → disabled (`opacity: 0.5`, `cursor: not-allowed`).

**Focus:** Double-ring via `box-shadow` — inner ring in `--color-bg-root`, outer ring in `--btn-bg`.

### 13.3 Card

Compound component with `Card.Header`, `Card.Body`, and `Card.Footer` sub-components.

**BEM Structure:**
```
.card
  .card__header     (border-bottom: subtle)
  .card__body       (flex: 1 1 auto)
  .card__footer     (border-top: subtle)
```

**Modifier Classes:**

| Modifier | Class | Description |
|---|---|---|
| Elevation | `.card--elevation-{0-4}` | 0=none, 1=sm shadow, 2-3=elevated bg, 4=elevated+gradient |
| Padding | `.card--padding-{none\|sm\|md\|lg}` | 0 / 16px / 24px / 32px |
| Flat | `.card--flat` | Removes all shadow and background-image |
| Interactive | `.card--interactive` | Hover: `translateY(-2px)`, stronger border |
| Color | `.card--variant.card--dim` | 15% opacity color background |
| Color | `.card--variant.card--solid` | Full color background |

### 13.4 Select

Custom dropdown with full keyboard navigation, ARIA combobox pattern, and per-option color variants.

**BEM Structure:**
```
.select
  .select__trigger     (button[role="combobox"])
    .select__content
      .select__icon--start
      .select__value / .select__placeholder
    .select__chevron   (inline SVG, animated rotation)
  .select__dropdown    (ul[role="listbox"])
    .select__option    (li[role="option"])
      .select__icon--option
    .select__spacer    (li[role="separator"])
```

**State Classes:** `.is-open`, `.is-disabled`, `.is-selected`, `.is-focused`

### 13.5 Tabs

Context-based compound component with WAI-ARIA `tablist`/`tab`/`tabpanel` roles and keyboard navigation.

**BEM Structure:**
```
.tabs
  .tabs__list     (div[role="tablist"])
    .tabs__trigger  (button[role="tab"])
  .tabs__content  (div[role="tabpanel"])
```

**State Classes:** `.is-active`, `.is-disabled`

Supports both controlled (`activeKey` prop) and uncontrolled (`defaultActiveKey` prop) modes.

### 13.6 Other Components (Quick Reference)

| Component | Key BEM Elements | Notable Patterns |
|---|---|---|
| **Alert** | `.alert__icon`, `.alert__content`, `.alert__close`, `.alert__progress` | Auto-dismiss via `duration` (CSS progress bar animation), closable with close button |
| **Badge** | `.badge--pill`, `.badge--dim` | Pill shape, dim mode at 15% opacity |
| **Spinner** | `.spinner--classic`, `.spinner--growing` | Two animation types, all color variants |
| **ButtonGroup** | `.btn-group`, `.btn-group-vertical` | Negative margin border collapse, z-index on hover |
| **Modal** | `.modal__backdrop`, `.modal__dialog`, `.modal__header`, `.modal__body`, `.modal__footer` | Portal-based overlay, Vanilla controller class |
| **Navbar** | `.navbar__brand`, `.navbar__links`, `.navbar__toggle` | Responsive collapse, Vanilla auto-init |
| **Sidebar** | `.sidebar__header`, `.sidebar__nav`, `.sidebar__footer` | Collapsible panel, Vanilla auto-init |
| **DataTable** | `.data-table__header`, `.data-table__row`, `.data-table__cell` | Sorting, pagination, column configuration |
| **ContextMenu** | `.context-menu__item` | Provider/context pattern, programmatic positioning |
| **Carousel** | `.carousel__track`, `.carousel__slide` | Touch/swipe support, auto-play |

---

## 14. Dual-Target Architecture

### Entry Points

| Target | Entry | Build Output |
|---|---|---|
| **React** | `src/index.ts` | `dist/index.es.js`, `dist/index.cjs.js` |
| **Vanilla** | `src/vanilla.ts` | `dist/vanilla.es.js`, `dist/vanilla.cjs.js` |
| **Styles** | (imported by React entry) | `dist/lyco-ui.css` |

### Vanilla Auto-Initialization

The `vanilla.ts` entry exports `initLycoUI()` which calls all component initializers. It auto-runs on load:

```typescript
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLycoUI);
    } else {
        initLycoUI();
    }
}
```

**Guards:** Each component uses `data-lyco-initialized` attributes to prevent double-initialization. Controllers expose a public `destroy()` method to remove event listeners.

### Programmatic APIs (Vanilla)

Two components provide imperative APIs instead of DOM-based auto-init:

- **`snackbar(options)`** — programmatically show a snackbar notification
- **`notification(options)`** — programmatically show a notification toast

### Window Extensions

Vanilla consumers can register custom formatters and validators via global registries:

```typescript
window.lycoFormatters = {
  currency: (value: number) => `$${value.toFixed(2)}`
};

window.lycoValidators = {
  email: (value: string) => value.includes('@') ? null : 'Invalid email'
};
```

### Build Configuration

- **Bundler:** Vite 8 with `@vitejs/plugin-react` and `vite-plugin-dts`
- **Formats:** ES modules and CommonJS
- **Externals:** `react`, `react-dom`, `react/jsx-runtime`, `clsx`, `shiki`
- **CSS output:** All SCSS is compiled into a single `dist/lyco-ui.css`
- **TypeScript:** Strict mode, declarations output to `dist/types/`

---

## 15. Accessibility & Keyboard Navigation

### Shared Utilities

Two parallel implementations ensure parity between targets:

| Utility | React | Vanilla |
|---|---|---|
| Arrow key navigation | `useKeyboardNav` hook | `handleListKeyboardNav()` function |
| ARIA state helpers | — | `setAriaExpanded()`, `setAriaHidden()`, `setAriaSelected()`, `setAriaActiveDescendant()` |

Both share the same algorithm: configurable for horizontal/vertical orientation, with optional wrapping (`loop`) and `onFocus` callback.

### Patterns by Component

| Component | ARIA Pattern | Keyboard Support |
|---|---|---|
| Select | `combobox` + `listbox` + `option` | Arrow keys, Enter/Space select, Escape close, Tab close |
| Tabs | `tablist` + `tab` + `tabpanel` | Horizontal arrows, auto-activates on focus |
| Alert | `role="alert"` | Close button focusable |
| Spinner | `role="status"`, `aria-label="Loading"` | — |
| Modal | — | Escape to close (via Vanilla controller) |

### Focus Indicators

All interactive elements use `:focus-visible` with a double-ring `box-shadow` pattern:
```css
box-shadow: 0 0 0 2px var(--color-bg-root), 0 0 0 4px var(--btn-bg);
```

---

## 16. Utility Classes

### Text Utilities

| Class | Property |
|---|---|
| `.text-center` | `text-align: center` |
| `.text-primary` | `color: var(--color-text-primary)` |
| `.text-secondary` | `color: var(--color-text-secondary)` |
| `.text-muted` | `color: var(--color-text-muted)` |
| `.text-success` | `color: var(--color-success)` |
| `.text-warning` | `color: var(--color-warning)` |
| `.text-danger` | `color: var(--color-danger)` |
| `.text-info` | `color: var(--color-info)` |
| `.text-white` | `color: var(--white)` |
| `.text-black` | `color: var(--black)` |

### Spacing Utilities

Generated via `@for $i from 1 through 12` on spacing tokens 1–12:

| Pattern | Properties |
|---|---|
| `.mt-{n}`, `.mb-{n}`, `.ml-{n}`, `.mr-{n}` | Single-axis margin |
| `.mx-{n}`, `.my-{n}` | Horizontal / vertical margin |
| `.p-{n}` | All-sides padding |
| `.pt-{n}`, `.pr-{n}`, `.pb-{n}`, `.pl-{n}` | Single-axis padding |
| `.px-{n}`, `.py-{n}` | Horizontal / vertical padding |

### Display

| Class | Property |
|---|---|
| `.hidden` | `display: none` |

---

## 17. Code Syntax Highlighting Theme

The `Code` component uses Shiki (optional peer dependency) with a custom `lyco-dark` theme that maps syntax scopes to the design system's semantic color tokens:

| Scope | Color Token |
|---|---|
| Comments | `--color-text-muted` (italic) |
| Strings | `--color-success` |
| Keywords, storage | `--color-primary` |
| Functions | `--color-info` |
| Variables | `--color-text-secondary` |
| Constants, types | `--color-warning` |
| Attributes | `--color-info` |
| HTML tags | `--color-primary` |
| Punctuation | `--color-text-secondary` |
| Editor background | `transparent` (inherits from parent) |
| Editor foreground | `--color-text-primary` |

The highlighter is lazily loaded via a singleton promise (`getShikiHighlighter`) and supports dynamic language loading at runtime.

---

## Scrollbar Styling

Global scrollbar customization uses `scrollbar-width: thin` for Firefox and `::-webkit-scrollbar` for Chromium:

| Property | Value |
|---|---|
| Track width/height | `var(--spacing-2)` (8px) |
| Track background | `transparent` (body: `--color-bg-root`) |
| Track border-radius | `var(--radius-md)` |
| Thumb color | `var(--color-ash)` |
| Thumb hover | `var(--color-fog)` |
| Thumb border | `2px solid transparent` with `background-clip: padding-box` |

---

## CSS Reset

LycoUI ships a minimal reset as part of `global.scss`:

- Universal `box-sizing: border-box`, `margin: 0`, `padding: 0`
- `html`: 100% font-size, antialiased rendering, `text-rendering: optimizeLegibility`
- `body`: dark `color-scheme`, `overflow-wrap: break-word`
- Media elements (`img`, `picture`, `svg`, `video`): `display: block`, `max-width: 100%`
- Form elements: `font: inherit`, `color: inherit`
- `button`: transparent background, no border, pointer cursor
- `a`: primary color, no text-decoration, underline on hover
