# Neutral Theme System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Lyco UI's neutral palette globally switchable between slate, gray, and zinc through an HTML `data-theme` attribute.

**Architecture:** Sass owns the three immutable 50–950 source scales. Global CSS exposes one runtime `--neutral-*` alias scale, defaulting to slate and overridden by `html[data-theme]`; components consume only those aliases so a document-level attribute updates every neutral-dependent surface together.

**Tech Stack:** Sass, CSS custom properties, React documentation, Vitest, Dart Sass.

**Spec:** Approved in chat on 2026-10-22.

## Global Constraints

- Slate `950`, `900`, and `800` must be exactly `#0f1011`, `#161718`, and `#23252a`.
- Only `--neutral-50` through `--neutral-950` are public neutral variables; named neutral variables are removed from source components and docs.
- `:root` uses slate; `html[data-theme="gray"]` and `html[data-theme="zinc"]` remap every neutral alias.
- Preserve the dark surface hierarchy by mapping root/base/elevated/floating tokens to the corresponding numeric neutral values.
- Run `npm run typecheck` and `npm run build` before reporting completion.

---

### Task 1: Lock the runtime neutral contract with a compiled-CSS test

**Files:**
- Create: `tests/unit/neutral-theme-tokens.test.ts`
- Modify: `packages/core/src/styles/tokens/_colors.scss`
- Modify: `packages/core/src/styles/global.scss`

**Interfaces:**
- Consumes: Sass entry point `packages/core/src/styles/global.scss`.
- Produces: `--neutral-50`…`--neutral-950` aliases in `:root`, gray overrides, and zinc overrides.

- [ ] **Step 1: Write the failing test**

```ts
const css = compile(globalStylesheet, {style: 'expanded'}).css;
expect(css).toContain('--neutral-950: #0f1011;');
expect(css).toMatch(/html\[data-theme=gray\][\s\S]*--neutral-950:/);
expect(css).toMatch(/html\[data-theme=zinc\][\s\S]*--neutral-950:/);
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm run test:unit -- tests/unit/neutral-theme-tokens.test.ts`

Expected: FAIL because the `--neutral-*` aliases and theme selectors do not yet exist.

- [ ] **Step 3: Implement the scale source and alias selectors**

```scss
$neutral-scales: ('slate': (...), 'gray': (...), 'zinc': (...));

:root { @include emit-neutral-scale('slate'); }
html[data-theme='gray'] { @include emit-neutral-scale('gray'); }
html[data-theme='zinc'] { @include emit-neutral-scale('zinc'); }
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npm run test:unit -- tests/unit/neutral-theme-tokens.test.ts`

Expected: PASS.

### Task 2: Move the core and utilities to numeric neutral aliases

**Files:**
- Modify: `packages/core/src/styles/global.scss`
- Modify: `packages/core/src/styles/tokens/_surfaces.scss`
- Modify: `packages/core/src/styles/utilities.scss`
- Modify: every `packages/core/src/**/*.scss` occurrence of `--color-void`, `--color-carbon`, `--color-obsidian`, `--color-graphite`, `--color-smoke`, `--color-ash`, `--color-fog`, `--color-mist`, `--color-bone`, and `--color-paper`
- Modify: `packages/core/src/utils/theme.ts`

**Interfaces:**
- Consumes: Runtime aliases produced by Task 1.
- Produces: Theme-responsive core styling with no source references to the removed named neutral tokens.

- [ ] **Step 1: Update surfaces and semantic aliases**

```scss
'root': 'var(--neutral-950)',
'base': 'var(--neutral-950)',
'elevated': 'var(--neutral-900)',
'floating': 'var(--neutral-800)'
```

- [ ] **Step 2: Generate numeric neutral utility classes**

```scss
@each $step in colors.$neutral-steps {
  .bg-neutral-#{$step} { background-color: var(--neutral-#{$step}) !important; }
}
```

- [ ] **Step 3: Replace every component named-neutral reference**

```scss
background-color: var(--neutral-950);
box-shadow: 0 0 0 1px var(--neutral-950), ...;
```

- [ ] **Step 4: Run the focused test and source scan**

Run: `npm run test:unit -- tests/unit/neutral-theme-tokens.test.ts`

Run: `rg --glob '*.scss' -- '--color-(void|carbon|obsidian|graphite|smoke|ash|fog|mist|bone|paper)' packages/core/src`

Expected: the test passes and the scan prints no matches.

### Task 3: Document variable use and theme switching

**Files:**
- Modify: `packages/docs/src/pages/getting-started/Colors.tsx`
- Modify: all docs source references to removed named neutral variables.

**Interfaces:**
- Consumes: `--neutral-*` aliases and the `data-theme` contract from Task 1.
- Produces: A documented numeric neutral palette and copyable HTML theme-switching instructions.

- [ ] **Step 1: Replace named swatches with the `neutral` 50–950 palette**

```tsx
const neutralSteps = [50, 100, ..., 950];
const colorVar = `--neutral-${step}`;
```

- [ ] **Step 2: Add document-level `data-theme` guidance**

```html
<html data-theme="zinc">
```

- [ ] **Step 3: Update remaining docs references and scan source**

Run: `rg --glob '*.{ts,tsx,scss}' -- '--color-(void|carbon|obsidian|graphite|smoke|ash|fog|mist|bone|paper)' packages/docs packages/core/src`

Expected: no matches.

### Task 4: Verify the finished integration

**Files:**
- Verify: the files modified by Tasks 1–3.

- [ ] **Step 1: Run type checking**

Run: `npm run typecheck`

Expected: exit code 0.

- [ ] **Step 2: Run the workspace build**

Run: `npm run build`

Expected: core and documentation builds complete with exit code 0.

- [ ] **Step 3: Run unit tests and review the final diff**

Run: `npm run test:unit`

Run: `git diff --check`

Expected: no new test failures caused by this work and no whitespace errors.
