# Sidebar Mini Icon Zoom Scale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add smooth, high-performance icon zoom scaling (`miniIconScale`) to the `Sidebar` component in mini mode (`.is-mini`) via CSS custom properties and `transform: scale(...)`.

**Architecture:** Introduce `--sidebar-mini-icon-scale` CSS custom property on `.sidebar`, defaulting to `1`. Transition the `.sidebar__icon` / `.sidebar-icon` elements using GPU-accelerated `transform: scale(var(--sidebar-mini-icon-scale, 1))` and design token transitions (`var(--duration-normal) var(--ease-default)`). React exposes an optional `miniIconScale?: number` prop that injects this variable into inline styles, while Vanilla JS supports both pure CSS custom property declarations and `data-mini-icon-scale` attributes.

**Tech Stack:** React 19, TypeScript, SCSS (BEM, CSS Custom Properties), Vanilla JS (ES6+), Vite.

**Spec:** USER_REQUEST and LycoUI Workspace Agent Rules (`.agents/AGENTS.md`).

---

## Global Constraints

- **Animation Performance (Rule 4.5):** Use strictly `transform: scale(...)` for icon zoom. Never animate layout properties (`width`, `height`, `margin`). Transitions must use existing design tokens: `var(--duration-normal)` (250ms) and `var(--ease-default)` (`cubic-bezier(0.4, 0, 0.2, 1)`).
- **Dual-Target Parity (Rule 2.2):** Keep the DOM structure completely identical between React and Vanilla JS.
- **Strict Typing (Rule 3.1 & 3.2):** Zero `any` types. Strictly typed props with `forwardRef` and `displayName`.
- **Vanilla Ergonomics (Rule 2.4 & Rule 4.3):** Configurable in Vanilla via CSS custom property `--sidebar-mini-icon-scale` and declarative HTML attribute `data-mini-icon-scale`.
- **Docs Dogfooding & Parity (Rule 5.1 & 5.2):** Document `miniIconScale` in `api.tsx` with exact TS types, and demonstrate both React and minimal Vanilla HTML in `MiniExample.tsx`.

---

## Files to be Modified / Created

| File | Responsibility |
|---|---|
| `packages/core/src/components/Sidebar/Sidebar.scss` | Declare `--sidebar-mini-icon-scale: 1;`, add `transform: scale(1)` + `transition: ..., transform ...` to `.sidebar__icon`, and `transform: scale(var(--sidebar-mini-icon-scale, 1))` in `.is-mini`. |
| `packages/core/src/components/Sidebar/Sidebar.tsx` | Add `miniIconScale?: number` to `SidebarProps`, inject `--sidebar-mini-icon-scale` into `sidebarStyle` via `useMemo`. |
| `packages/core/src/components/Sidebar/Sidebar.vanilla.ts` | Support reading `dataset.miniIconScale` on `.sidebar` to set the `--sidebar-mini-icon-scale` property dynamically if provided. |
| `packages/docs/src/pages/components/Sidebar/api.tsx` | Add `miniIconScale` definition to `sidebarProps` table. |
| `packages/docs/src/pages/components/Sidebar/examples/MiniExample.tsx` | Showcase `miniIconScale={1.25}` in React example and update `vanillaHtml` with `--sidebar-mini-icon-scale: 1.25`. |

---

## Proposed Tasks

### Task 1: SCSS Variables, Icon Transform & Smooth Transitions

**Files:**
- Modify: `packages/core/src/components/Sidebar/Sidebar.scss:4-11`, `packages/core/src/components/Sidebar/Sidebar.scss:77-80`, `packages/core/src/components/Sidebar/Sidebar.scss:219-239`, `packages/core/src/components/Sidebar/Sidebar.scss:292-297`

**Interfaces:**
- Produces: CSS custom property `--sidebar-mini-icon-scale` (default `1`).
- Produces: Smooth GPU transition on `.sidebar__icon, .sidebar-icon` using `transform var(--duration-normal) var(--ease-default)`.

- [x] **Step 1: Declare `--sidebar-mini-icon-scale` in `.sidebar` block**

In `packages/core/src/components/Sidebar/Sidebar.scss`:
```scss
.sidebar {
  // Variables
  --sidebar-width: var(--size-64, 16rem); /* 256px */
  --sidebar-mini-width: 3.5rem; /* 56px */
  --sidebar-mini-icon-scale: 1;
  --sidebar-bg: var(--surface-base, var(--color-bg-root));
  --sidebar-text: var(--color-text-primary);
  --sidebar-border: var(--color-border-subtle);
  --sidebar-transition: transform var(--duration-normal) var(--ease-default);
```

- [x] **Step 2: Add `transform`, `transform-origin`, and `transition` to `.sidebar__icon, .sidebar-icon`**

In `packages/core/src/components/Sidebar/Sidebar.scss` (around line 219):
```scss
  &__icon,
  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--spacing-5, 1.25rem);
    height: var(--spacing-5, 1.25rem);
    margin-right: var(--spacing-3);
    flex-shrink: 0;
    color: var(--color-text-muted);
    transform: scale(1);
    transform-origin: center;
    transition: color var(--duration-fast) var(--ease-default), transform var(--duration-normal) var(--ease-default);

    // For initials
    font-size: var(--text-caption);
    font-weight: var(--font-weight-bold);

    svg {
      width: 100%;
      height: 100%;
    }
  }
```

- [x] **Step 3: Update `.sidebar__dropdown-trigger` icon transition to prevent overriding `transform`**

In `packages/core/src/components/Sidebar/Sidebar.scss` (around line 292):
```scss
    .sidebar__icon,
    .sidebar-icon {
      color: var(--color-text-muted);
      transition: color var(--duration-fast) var(--ease-default), transform var(--duration-normal) var(--ease-default);
    }
```

- [x] **Step 4: Apply `transform: scale(var(--sidebar-mini-icon-scale, 1))` in `.is-mini`**

In `packages/core/src/components/Sidebar/Sidebar.scss` under `&.is-mini` (around line 77):
```scss
    .sidebar__icon,
    .sidebar-icon {
      margin: 0;
      transform: scale(var(--sidebar-mini-icon-scale, 1));
    }
```

---

### Task 2: React Component Prop & Inline Style Injection

**Files:**
- Modify: `packages/core/src/components/Sidebar/Sidebar.tsx:17-34`, `packages/core/src/components/Sidebar/Sidebar.tsx:36-52`, `packages/core/src/components/Sidebar/Sidebar.tsx:84-88`

**Interfaces:**
- Consumes: SCSS variable `--sidebar-mini-icon-scale`.
- Produces: `miniIconScale?: number` in `SidebarProps`.

- [x] **Step 1: Add `miniIconScale?: number` to `SidebarProps` with TSDoc**

In `packages/core/src/components/Sidebar/Sidebar.tsx`:
```tsx
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    /** Controls if the sidebar is open (for overlay mode) */
    isOpen?: boolean;
    /** Controls if the sidebar is in mini (icon-only) mode */
    isMini?: boolean;
    /** Scale factor applied to icons when in mini mode (e.g., 1.25 for 125% zoom) */
    miniIconScale?: number;
    /** Enable drag-to-resize handle */
    resizable?: boolean;
    /** Behavior variant */
    variant?: 'overlay' | 'push' | 'fixed';
    /** Called when the backdrop is clicked (in overlay mode) */
    onClose?: () => void;
    /** Default width in pixels */
    defaultWidth?: number;
    /** Minimum width in pixels */
    minWidth?: number;
    /** Maximum width in pixels */
    maxWidth?: number;
}
```

- [x] **Step 2: Destructure `miniIconScale` and inject into `sidebarStyle`**

In `packages/core/src/components/Sidebar/Sidebar.tsx`:
```tsx
const SidebarComponent = forwardRef<HTMLElement, SidebarProps>((
    {
        className,
        children,
        isOpen = false,
        isMini = false,
        miniIconScale,
        resizable = false,
        variant = 'fixed',
        onClose,
        defaultWidth = 256,
        minWidth = 200,
        maxWidth = 400,
        style,
        ...props
    },
    ref
) => {
    // ...
    const sidebarStyle = useMemo(() => {
        const customStyle: React.CSSProperties & Record<string, string | number | undefined> = {
            ...style,
            '--sidebar-width': `${width}px`
        };

        if (miniIconScale !== undefined) {
            customStyle['--sidebar-mini-icon-scale'] = miniIconScale;
        }

        return customStyle as React.CSSProperties;
    }, [width, miniIconScale, style]);
```

---

### Task 3: Vanilla JS Controller Attribute & Variable Support

**Files:**
- Modify: `packages/core/src/components/Sidebar/Sidebar.vanilla.ts:37-69`

**Interfaces:**
- Consumes: `<aside class="sidebar" data-mini-icon-scale="...">` or CSS custom property.
- Produces: Dynamic sync of `--sidebar-mini-icon-scale` from `dataset`.

- [x] **Step 1: Support `data-mini-icon-scale` in `LycoSidebarController` constructor**

In `packages/core/src/components/Sidebar/Sidebar.vanilla.ts`:
```ts
    constructor(sidebar: HTMLElement) {
        this.sidebar = sidebar;
        this.resizer = sidebar.querySelector<HTMLElement>('.sidebar__resizer, .sidebar-resizer');
        this.dropdowns = sidebar.querySelectorAll<HTMLElement>('.sidebar__dropdown, .sidebar-dropdown');

        const datasetScale = this.sidebar.dataset.miniIconScale;
        if (datasetScale) {
            this.sidebar.style.setProperty('--sidebar-mini-icon-scale', datasetScale);
        }
        // ...
```

---

### Task 4: Documentation & Example Updates

**Files:**
- Modify: `packages/docs/src/pages/components/Sidebar/api.tsx:3-51`
- Modify: `packages/docs/src/pages/components/Sidebar/examples/MiniExample.tsx`

**Interfaces:**
- Consumes: `SidebarProps` with `miniIconScale`.
- Produces: API documentation entry for `miniIconScale` and interactive demo in documentation.

- [x] **Step 1: Update `sidebarProps` in `packages/docs/src/pages/components/Sidebar/api.tsx`**

```tsx
    {
        name: 'miniIconScale',
        type: 'number',
        defaultValue: '1',
        description: 'Scale multiplier applied via CSS transform to sidebar icons when in mini mode (e.g. 1.25 for 125% zoom).'
    },
```

- [x] **Step 2: Update `MiniExample.tsx` to showcase `miniIconScale`**

In `packages/docs/src/pages/components/Sidebar/examples/MiniExample.tsx`:
- Pass `miniIconScale={1.25}` to `<Sidebar>`.
- In `vanillaHtml`, include `style="position: relative; --sidebar-mini-icon-scale: 1.25;"` on the `<aside>`.
- Mention icon scaling in the example description text.

---

### Task 5: Build Verification & Parity Audit

- [x] **Step 1: Build `@loreschaeffer/lyco-ui` (core)**

Run in `packages/core`:
```bash
npm run build
```
Expected: `tsc -b --noEmit && vite build` succeeds with 0 errors.

- [x] **Step 2: Build `lyco-ui-docs` (documentation)**

Run in `packages/docs`:
```bash
npm run build
```
Expected: `tsc && vite build` succeeds with 0 errors.

- [x] **Step 3: Verification Checklist (LycoUI Component Architect)**
  - [x] Ref is forwarded in `Sidebar.tsx`.
  - [x] Only `transform` is animated on `.sidebar__icon` (Rule 4.5).
  - [x] Tokens `var(--duration-normal)` and `var(--ease-default)` are used for the transition.
  - [x] CSS uses `var(--sidebar-mini-icon-scale, 1)`.
  - [x] DOM parity between React and Vanilla is preserved 100%.
  - [x] Documentation (`api.tsx` and `MiniExample.tsx`) accurately documents and showcases the feature.
