# LycoUI Architectural Audit and Refactoring Implementation Plan

> **For agentic workers:** At execution time, use `superpowers:executing-plans` to implement this plan task by task; use `superpowers:subagent-driven-development` only if delegation is authorized. Steps use checkbox syntax. This audit authorizes no implementation in the current turn.

**Goal:** Establish one shared implementation of each interaction, exact React/Vanilla contracts, consistent public single-dash classes, and complete executable documentation.

**Architecture:** Keep framework-independent interaction, lifecycle, navigation, and geometry utilities beneath React hooks and Vanilla controllers. Compose atomic menu, popover, collapse, tooltip, and modal/drawer adapters into layout components. Keep the existing public component APIs during extraction; stage API/class migrations explicitly and synchronize both rendering targets before documenting the final contract.

**Tech Stack:** npm workspaces; React 19; strict TypeScript; Vite 8/Rolldown; Sass; Oxlint; optional Shiki. Proposed verification adds Vitest, jsdom, Playwright, and an AST/CSS contract checker.

**Spec:** The user's audit request and `.agents/AGENTS.md` (the actual repository rule file; no root `AGENTS.md` was found). All paths below are relative to the repository root, `D:/MyPrograms/lyco-ui`. Evidence uses one-based lines in the inspected working tree on **2026-10-22**.

## Section A — Findings Matrix

### Scope, method, and baseline

- Mapped files with `rg --files` before targeted searches/range reads. Inspected all 40 component directories, all 16 Vanilla controller/manager files, both library entry points, the 39 component API files, all 160 example modules, styles/tokens, docs routing, package manifests, and publishing workflow. Resolved **220 public exports** through the TypeScript symbol table, including star re-exports and types.
- Source files were not edited. A pre-existing change in `packages/docs/src/pages/components/Sidebar/SidebarDoc.tsx` was present during inspection and must be preserved. Only this report is an intentional deliverable.
- Core check: `node node_modules/typescript/bin/tsc -p packages/core/tsconfig.app.json --noEmit --incremental false` **passed**. Docs equivalent **failed** with TS5102 at `packages/docs/tsconfig.app.json:22` (`baseUrl` removed). A read-only TypeScript 6 compiler-API check of the docs produced **zero diagnostics**; this identifies compiler/configuration incompatibility, not a proven source type error.
- `npm run lint --workspaces --if-present` **failed**: 11 explicit-`any` errors in Navbar, plus React/unused-variable warnings. Docs lint completed with a state-in-effect warning. Warnings are triage evidence, not automatically confirmed defects.
- Built both ES entry points **in memory** with Vite (`build.write=false`, no font-copy/declaration plugin). The Vanilla entry imports a Notification chunk that imports `react`, `clsx`, and `react/jsx-runtime`. This is fresh source-derived evidence; existing `dist` artifacts were only corroboration. This was not a full publish/declaration build.
- Compiled SCSS **in memory** to expand Sass loops/nesting and inspect emitted selectors and custom properties. Literal class checks exclude pseudo-element trigger classes and require manual interpretation for application/demo-only classes. Token findings below distinguish missing no-fallback tokens from valid per-instance variables injected by React/Vanilla.
- No test suite/scripts were found. No browser, assistive-technology, contrast, or screenshot suite was run; this is a comprehensive static/source and tooling audit, not a WCAG certification or an assertion of exhaustive runtime bug discovery. Visual contrast cannot be established from token names.
- Rule citations are to `.agents/AGENTS.md`: §2.2 DOM parity (`:33`), §2.3 lifecycle (`:46`), §3.1 DRY/SRP/typing (`:66`), §3.2 React (`:72`), §3.3 shared primitives (`:80`), §3.4 220-line ceiling (`:91`), §4.3 tokens (`:114`), §4.4 single-dash/state classes (`:117`), §4.5 motion (`:126`), §§5.1–5.3 documentation (`:135`, `:139`, `:143`), §6 accessibility (`:150`), §7 performance (`:159`). §2.2 explicitly classifies structural target divergence as **CRITICAL**; §5.3 explicitly classifies inaccurate/missing prop entries as **HIGH**.

### CRITICAL

| ID | Exact evidence | Finding and effect | Violated rule | Execution |
|---|---|---|---|---|
| C01 | `packages/core/src/components/Notification/Notification.vanilla.ts:2`; `packages/core/src/components/Notification/Notification.tsx:1`; `packages/core/vite.config.ts:64`; `README.md:99` | Vanilla imports constants from a React implementation. Fresh in-memory output contains `vanilla.es.js → Notification-*.js → react, clsx, react/jsx-runtime`. A plain browser cannot resolve these bare imports from the README's module script; loading the Vanilla entry fails before auto-init. Extract constants to a framework-free module. | §1 dual target/no build tools; §§2.1, 2.4; §3.3 | 1.2, 3.8, 4.4 |
| C02 | `packages/core/src/components/Select/Select.tsx:373`; `packages/core/src/components/Select/Select.vanilla.ts:156`, `:218`, `:281` | React mounts the listbox in `document.body` and computes fixed positioning; Vanilla retains it inside `.select`. React removes the list when closed and renders only filtered options; Vanilla retains hidden/filter-styled items and an extra `.no-options` item. Different DOM ancestry, counts, and clipping/position behavior. | §2.2; §3.3; §6 | 1.3, 1.4, 3.1 |
| C03 | `packages/core/src/components/Modal/Modal.tsx:113`; `packages/docs/src/pages/components/Modal/examples/BasicExample.tsx:19`; `packages/core/src/components/Modal/Modal.vanilla.ts:58`, `:99` | React uses `<dialog role="dialog" aria-modal="true">`; published Vanilla markup uses `<div class="modal hidden">` without a dialog role. Controller never normalizes the root tag/role. Closed React DOM is removed; Vanilla retains a hidden root. AlertDialog and ImageViewer inherit this overlay contract mismatch. | §2.2; §6; §5.3 | 1.5, 3.2, 4.2 |
| C04 | `packages/core/src/components/Tooltip/Tooltip.tsx:114`; `packages/core/src/components/Tooltip/Tooltip.vanilla.ts:31`, `:44` | React inserts a `.tooltip-wrapper` div and attaches `aria-describedby` to it. Vanilla attaches events and description to the supplied native trigger, without that wrapper. Different root structure and accessible description owner; focused buttons in React are not directly described. | §2.2; §6 | 1.4, 3.3 |
| C05 | `packages/core/src/components/Input/Input.tsx:272`, `:290`, `:335`; `packages/core/src/components/Input/Input.vanilla.ts:101`, `:106`, `:157`, `:234` | React generates an input ID, associated label, conditional message ID/role, `aria-invalid`, and `aria-describedby`. Vanilla associates a label only when the caller supplied an ID, creates an empty message for validation-enabled inputs, and never updates the React-equivalent ARIA state. React supports icon buttons/loading spinners; Vanilla builds only icon spans. Sizes also differ (`input--md` in React versus omitted md modifier in Vanilla). | §2.2; §6 | 2.4, 3.4 |
| C06 | `packages/core/src/components/Range/Range.tsx:108`, `:119`, `:144`; `packages/core/src/components/Range/Range.vanilla.ts:35`, `:47`, `:76` | React emits `range--md`, optional white-thumb/hover-visible classes and pointer hover behavior. Vanilla omits md, preserves `.range-custom` because it removes the nonexistent `.lyco-range-custom`, and implements neither `coloredThumb` nor hover-trigger behavior. Corresponding documented modes cannot produce equal classes/states. | §2.2; §3.3; §5.3 | 1.4, 3.4 |
| C07 | `packages/core/src/components/Tabs/Tabs.tsx:137`, `:179`; `packages/core/src/components/Tabs/Tabs.vanilla.ts:35`, `:56`, `:98`; `packages/docs/src/pages/components/Tabs/examples/StandardExample.tsx:19` | Vanilla initial setup does not synchronize trigger `aria-selected`/active states and never clears a panel's `hidden` attribute. Shipped examples mark inactive panels `hidden`; clicking them only clears inline display/ARIA, so they remain hidden. React updates `hidden` and `aria-hidden` together. Neither implementation provides proper roving tab stops. | §2.2; §6 | 1.3, 3.5 |
| C08 | `packages/core/src/components/Accordion/Accordion.tsx:187`; `packages/core/src/components/Accordion/Accordion.vanilla.ts:120`, `:159`; `packages/core/src/components/Accordion/Accordion.scss:133` | Vanilla maintains `aria-hidden` on collapse regions; React never emits it. A React disabled item can remain expanded from controlled/default keys while Vanilla suppresses initially-open disabled items. CSS grid collapse alone does not remove descendant controls from keyboard navigation. | §2.2; §3.3; §6 | 1.4, 2.1, 3.5 |
| C09 | `packages/core/src/components/Code/Code.tsx:217`, `:263`; `packages/core/src/components/Code/Code.vanilla.ts:26`, `:32`, `:70`; `packages/docs/src/pages/components/Code/examples/ToolbarExample.tsx:11` | React toolbar composes the custom Select; Vanilla expects a native `.code__lang-select`. Vanilla language change only sets `data-language`; it never re-highlights, and editing has no input/highlighting synchronization. Header tags, selector structure, editing state, and highlighted output diverge. | §2.2; §3.3; §5.3 | 2.4, 3.6 |
| C10 | `packages/core/src/components/Sidebar/Sidebar.tsx:51`, `:105`, `:148`, `:342`; `packages/core/src/components/Sidebar/Sidebar.vanilla.ts:48`, `:119`; `packages/docs/src/pages/components/Sidebar/examples/OverlayExample.tsx:9` | React emits both BEM and single-dash sub-element classes; Vanilla examples emit only the latter. Resize bounds differ (React max 400 and clamping; Vanilla max 500 and ignoring out-of-range moves). React renders/wires a backdrop; Vanilla has only an unexposed controller `toggle()` and no automatic trigger/backdrop wiring. Example toggles only the aside, so backdrop state is inconsistent. | §2.2; §3.3; §6 | 2.2, 3.2 |
| C11 | `packages/core/src/components/Snackbar/Snackbar.tsx:53`; `packages/core/src/components/Snackbar/Snackbar.vanilla.ts:79`; `packages/core/src/components/Notification/Notification.tsx:150`; `packages/core/src/components/Notification/Notification.vanilla.ts:135`, `:183` | Snackbar Vanilla omits the item-level `aria-live="polite"` emitted by React (the stack is live in both). Notification Vanilla always creates a message paragraph and progress DOM, whereas React conditions them on content and positive duration; pause-on-hover exists only in Vanilla while docs promise it for React. Empty/title-only/zero-duration states have divergent trees and behavior. | §2.2; §6; §5.3 | 2.5, 3.7 |
| C12 | `packages/core/src/vanilla.ts:1`, `:18`; `packages/core/src/components/Navbar/Navbar.tsx:294`, `:389`; `packages/core/src/components/Navbar/Navbar.vanilla.ts:26`; `packages/core/src/components/Carousel/Carousel.tsx:169`; `packages/core/src/components/TreeView/TreeView.tsx:36`; `packages/core/src/components/DatePicker/DatePicker.tsx:134`; `packages/core/src/components/DataTable/DataTable.tsx:272`; `packages/docs/src/pages/components/ContextMenu/examples/ComplexExample.tsx:8` | Interactive target coverage is incomplete. Navbar controller handles collapse but no dropdown/submenu. There are no Vanilla controllers for standalone DropdownMenu, ContextMenu, Carousel, DatePicker/TimePicker/DateTimePicker, TreeView, DataTable, or Textarea's validation/filled state. Rendered custom picker/menu/table trees and states cannot be reproduced by the advertised bundle. ContextMenu docs call `LycoUI.showContextMenu`, which is not exported at all. See coverage ledger for exact scope; static Stepper/Timeline/Video do not need controllers merely to render. | §§2.2–2.4; §3.3; §§5.2–5.3 | 1.3–1.5, 2.1–2.4, 3.6, 4.2 |
| C13 | `packages/core/src/vanilla.ts:25`, `:33`; `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts:6`; `packages/docs/src/pages/components/ImageViewer/examples/Gallery.tsx:13`; `packages/core/src/components/ImageViewer/ImageViewer.tsx:125`; `packages/core/src/components/Modal/Modal.tsx:123` | ImageViewer examples put `.modal.image-viewer` on one root. `initLycoUI()` initializes modals first and sets the shared initialized flag, so the image-viewer initializer skips that root entirely. Even separate manual init produces a Vanilla tree missing React Modal's `.modal__dialog > .modal__content` wrappers, so the modal controller finds no focus-trap dialog. Independent direct image init also has H15's double construction. | §§2.2–2.3; §3.3; §6 | 1.2, 3.2 |
| C14 | `packages/core/src/components/Pagination/Pagination.tsx:262`, `:273`; `packages/core/src/components/Pagination/Pagination.vanilla.ts:87`, `:108`; `packages/docs/src/pages/components/Pagination/examples/StandardExample.tsx:10` | React emits a labeled navigation root and explicit disabled state; the documented Vanilla root has no label, and the controller only sets `aria-disabled` when true. Vanilla retains `pagination-custom` on its final root. Exact class/ARIA output differs. The custom-icon props also lack a corresponding Vanilla contract. | §2.2; §6; §5.3 | 2.4, 3.4 |
| C15 | `packages/core/src/components/FileUpload/FileUpload.tsx:147`; `packages/docs/src/pages/components/Input/examples/FileUploadBasicExample.tsx:10`; `packages/docs/src/pages/components/Input/examples/FileUploadDisabledExample.tsx:9`; `packages/docs/src/pages/components/Input/examples/FileUploadMultipleExample.tsx:10` | React's native file input uses `.fileupload__input`. Vanilla snippets use `.sr-only`, which has no emitted core selector, and the controller never normalizes it. The supplied input is not styled/hidden like React. Fix all three published pseudo-markup contracts together. | §2.2; §§5.2–5.3 | 3.4, 4.2 |

### HIGH

#### Interaction duplication and missing shared boundaries (priority 1)

The following is the complete interaction-family inventory found by import/symbol/event searches. Shared `utils/floating.ts` and `utils/keyboard.ts` are useful starting points, but neither is a complete primitive/controller layer. There is no Header component directory. DataTable already composes Select and Pagination; AlertDialog and ImageViewer already compose Modal. Preserve those successes rather than inventing duplicate-widget findings for them.

| ID | Exact evidence | Reimplemented responsibility / extraction boundary | Violated rule | Execution |
|---|---|---|---|---|
| H01 | `packages/core/src/components/Navbar/Navbar.tsx:55`, `:62`, `:181`; `packages/core/src/components/Navbar/Navbar.vanilla.ts:51`, `:70`; `packages/core/src/components/Navbar/Navbar.scss:178`, `:241` | Navbar owns its collapse state, outside dismissal, ARIA wiring and animation instead of Collapse. Extract state/visibility and controller behavior; leave breakpoint/layout decisions in Navbar. | §3.3 (all four bullets), §3.4 | 1.3–1.4, 2.1 |
| H02 | `packages/core/src/components/Navbar/Navbar.tsx:281`, `:298`, `:304`, `:389`, `:404`; `packages/core/src/components/Navbar/Navbar.scss:308`, `:455`; `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:341` | Navbar dropdown and nested submenu separately implement open state, outside click, flip calculations and menu styling. They do not compose DropdownMenu. Vanilla has no equivalent. Submenu trigger is a generic clickable div; no full keyboard contract. | §3.3; §6; §4.4 | 1.3, 2.1 |
| H03 | `packages/core/src/components/Sidebar/Sidebar.tsx:313`, `:329`; `packages/core/src/components/Sidebar/Sidebar.vanilla.ts:76`, `:94`; `packages/core/src/components/Sidebar/Sidebar.scss:326`, `:455`, `:539` | Sidebar owns a collapse dropdown and mini-mode fixed flyout; hover/focus CSS shows menus independently from `isOpen`/`aria-expanded`. Reuses the side-position helper but not a menu/collapse primitive. Duplicated normal/mini menu visuals match standalone menu styles by copying declarations. | §3.3; §6; §4.4 | 1.3–1.4, 2.2 |
| H04 | `packages/core/src/components/Sidebar/Sidebar.tsx:102`; `packages/core/src/components/Sidebar/Sidebar.scss:33`, `:552`; `packages/core/src/components/Modal/Modal.tsx:64` | Sidebar implements its own overlay/backdrop without shared modal/drawer focus containment, Escape handling, background interaction protection, scroll locking or return-focus behavior. An off-canvas translation alone leaves hidden content keyboard reachable. | §3.3; §6 | 1.5, 2.2, 3.2 |
| H05 | `packages/core/src/components/DatePicker/DatePicker.tsx:134`, `:146`, `:235`; `packages/core/src/components/DatePicker/TimePicker.tsx:87`, `:99`, `:190`; `packages/core/src/components/DatePicker/DateTimePicker.tsx:106`, `:118`, `:219`; `packages/core/src/components/DatePicker/DatePicker.scss:201` | Three copies of popover state, position/flip/clamp math, scroll/resize listeners, outside dismissal, validation and mobile routing. Date and time parsing/state should stay domain-specific; popup behavior should consume one Popover adapter/controller and shared SCSS. | §3.3; §3.4; §7 | 1.3–1.4, 2.3 |
| H06 | `packages/core/src/components/Select/Select.tsx:80`, `:89`, `:186`, `:229`; `packages/core/src/components/Select/Select.vanilla.ts:226`, `:270`, `:507`; `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:158`, `:182`, `:201` | Select independently implements floating-list positioning, dismissal, state and key navigation. Do not give a listbox menu roles; share the lower-level Popover/DismissableLayer and navigation engine while retaining Select-specific option/combobox semantics. | §3.3; §3.4 | 1.3–1.4, 3.1 |
| H07 | `packages/core/src/components/ContextMenu/ContextMenu.tsx:29`; `packages/core/src/components/ContextMenu/ContextMenuProvider.tsx:41`; `packages/core/src/components/ContextMenu/ContextMenuItem.tsx:19`, `:25`, `:101`; `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:343` | ContextMenu separately implements coordinate positioning, outside/Escape dismissal, nested hover timers and submenus. Reuse the menu engine with a virtual pointer anchor, rather than forcing ContextMenu to use a button trigger. | §3.3; §3.4; §6 | 1.3, 2.1 |
| H08 | `packages/core/src/components/Accordion/Accordion.tsx:51`, `:138`; `packages/core/src/components/Accordion/Accordion.vanilla.ts:150`; `packages/core/src/components/TreeView/TreeItem.tsx:52`, `:58`, `:103`; `packages/core/src/components/TreeView/TreeView.tsx:36` | Accordion items and TreeItem own expansion state/visibility in addition to Navbar/Sidebar collapse copies. Tree uses a separate DOM-traversal keyboard engine. Reuse Collapse for visibility and a shared navigation/state core; retain tree-specific parent/child navigation rules. | §3.3; §6; §7 | 1.3–1.4, 2.1, 3.5 |
| H09 | `packages/core/src/components/Range/Range.tsx:60`, `:86`, `:144`; `packages/core/src/components/Range/Range.vanilla.ts:51`; `packages/core/src/components/Range/Range.scss:20`; `packages/core/src/components/Tooltip/Tooltip.tsx:30`, `:42`; `packages/core/src/components/Tooltip/Tooltip.vanilla.ts:61` | Range has an independent tooltip element, visibility and thumb-positioning rules. Tooltip React/Vanilla duplicate flip/clamp calculations. Share tooltip surface/visibility/position core while retaining Range's virtual thumb anchor and `aria-hidden` visual value hint. Avoid changing a native slider's accessible value into a tooltip dependency. | §3.3; §4.3; §7 | 1.4, 3.3–3.4 |
| H10 | `packages/core/src/components/Modal/Modal.tsx:54`, `:64`; `packages/core/src/components/Modal/Modal.vanilla.ts:94`, `:110`, `:155`; `packages/core/src/utils/keyboard.ts:52`; `packages/core/src/components/AlertDialog/AlertDialog.tsx:33` | Modal shares the Tab helper but duplicates focus capture/initial focus/restore/Escape/body lock lifecycle across targets. AlertDialog repeats controlled state selection. Extract the modal engine, useFocusTrap/useEscapeKey/useControllableState, with a single layer stack. | §3.3; §6 | 1.3, 1.5 |
| H11 | `packages/core/src/hooks/useKeyboardNav.ts:30`; `packages/core/src/utils/keyboard.ts:13`; `packages/core/src/components/Select/Select.tsx:229`; `packages/core/src/components/Select/Select.vanilla.ts:507`; `packages/core/src/components/TreeView/TreeView.tsx:36`; `packages/core/src/components/DatePicker/Calendar.tsx:115` | React hook repeats the Vanilla list-navigation algorithm instead of adapting it. Both omit Home/End, roving tabindex and visibility/nested-list filtering. Select, tree and calendar each implement navigation again. Share the index/key engine and focus management, with explicit listbox/tree/grid adapters. Calendar-specific date arithmetic must remain separate. | §3.3; §6 | 1.3, 3.5 |
| H12 | `packages/core/src/components/Accordion/Accordion.tsx:45`; `packages/core/src/components/Tabs/Tabs.tsx:46`; `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:21`; `packages/core/src/components/AlertDialog/AlertDialog.tsx:33`; `packages/core/src/components/TreeView/TreeItem.tsx:52`; `packages/core/src/components/Range/Range.tsx:57`; `packages/core/src/components/Input/Input.tsx:82`; `packages/core/src/components/Textarea/Textarea.tsx:70` | Repeated controlled/uncontrolled selection and external-value synchronization. Open APIs also vary (`isOpen/onClose`, `open/onOpenChange`, only internal state); Accordion/Tabs use activeKeys/value variants. A shared state hook must preserve the public selection APIs and stage open-state aliases rather than rename every domain value to `open`. | §3.1; §3.3 | 1.3, 2.3–2.4 |
| H13 | `packages/core/src/components/Input/Input.vanilla.ts:11`; `packages/core/src/components/Select/Select.vanilla.ts:11`; `packages/core/src/components/Snackbar/Snackbar.vanilla.ts:26`; `packages/core/src/components/Notification/Notification.vanilla.ts:28`; all controller files listed in the lifecycle ledger | Four copies of SVG parsing; repeated init guards, event fields, add/remove listener bookkeeping, generated IDs, element creation and teardown. Current “safe” SVG parsers remove root event attributes but leave descendant event attributes/unsafe references; Tooltip directly assigns attribute text to `innerHTML` (`Tooltip.vanilla.ts:52`). Untrusted markup can remain executable. Treat content as text by default and put any supported rich markup behind one allowlisted parser. Security impact depends on who supplies the content; no unrelated new security policy is inferred. | §3.1 DRY; §3.3 shared Vanilla utilities; §§2.3, 6 | 1.2, 3.3 |
| H14 | `packages/core/src/components/Snackbar/SnackbarProvider.tsx:25`; `packages/core/src/components/Notification/NotificationProvider.tsx:44`; `packages/core/src/components/Snackbar/Snackbar.vanilla.ts:105`; `packages/core/src/components/Notification/Notification.vanilla.ts:145`; `packages/core/src/components/Alert/Alert.tsx:59` | Toast/alert duration maps, scheduled dismiss/exit phases, IDs and progress behavior are repeated between components and frameworks. Notification's richer pause/max/position features have drifted. Extract a timed-dismiss/store core; keep Alert, Snackbar and Notification DOM surfaces distinct. | §3.1; §3.3; §7 | 1.2, 2.5 |

#### Lifecycle, accessibility, packaging, and contract failures

| ID | Exact evidence | Finding and effect | Violated rule | Execution |
|---|---|---|---|---|
| H15 | `packages/core/src/components/Modal/Modal.vanilla.ts:12`, `:13`, `:22`; `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts:9`, `:10`, `:71`, `:206` | Both initializers create two controllers; the first is unreachable. Modal's trigger closure is outside controller ownership and cannot be removed by destroy. ImageViewer creates a local MutationObserver that is never retained/disconnected. Reinitialization/destroy leaks behavior; gallery navigation/zoom handlers run twice. | §2.3 (guards, destroy, bound listeners); §3.1 | 1.2, 1.5, 3.2 |
| H16 | `packages/core/src/vanilla.ts:18`, `:43`; `packages/core/src/components/Sidebar/Sidebar.vanilla.ts:24`; `packages/core/src/components/Select/Select.vanilla.ts:25`; `packages/core/src/components/Code/Code.vanilla.ts:9` | Every existing class has a destroy method; the defect is incomplete ownership/access, not wholesale absence. Most auto-initializers discard references, some classes/initializers are not exported by the public Vanilla entry, and there is no root-scoped init/destroy registry. Callers cannot clean up auto-created controllers before removing fragments. A shared initialized flag also makes Tooltip and another controller on one root mutually exclusive. | §2.3; §3.3 | 1.2, 3.8 |
| H17 | `packages/core/src/components/Modal/Modal.tsx:67`, `:70`, `:96`; `packages/core/src/components/Modal/Modal.vanilla.ts:101`, `:137`; `packages/core/src/utils/keyboard.ts:52`, `:63`; `packages/core/src/components/Sidebar/Sidebar.tsx:77` | Multiple open overlays independently remove one global body lock and listen to Escape/Tab, so closing/unmounting one can unlock/close another. Focus selector omits email/number/password inputs and doesn't filter hidden/inert descendants; empty dialogs lack reliable containment. React initial-focus timer is uncancelled; return focus is only in the closed branch, not unmount cleanup. Sidebar drag document listeners are only removed on mouseup, not unmount. | §§2.3, 3.3; §6; §7 | 1.2, 1.5, 2.2 |
| H18 | `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:214`, `:221`, `:370`; `packages/core/src/components/ContextMenu/ContextMenuItem.tsx:63`; `packages/core/src/components/Navbar/Navbar.tsx:423`; `packages/core/src/components/Sidebar/Sidebar.tsx:351`; `packages/core/src/components/TreeView/TreeItem.tsx:73`, `:87`; `packages/core/src/components/TreeView/TreeView.tsx:140` | Submenus are mouse-hover/click centric; standalone submenu trigger has no keyboard/click opening handler. ContextMenu menuitems are `<li>` without tabindex/Enter/Space handlers, so `.focus()` in the shared helper cannot establish keyboard operation. Tree items all have `tabIndex=-1`, the root supplies no fallback entry stop, and the initialization effect is empty, leaving no normal keyboard entry. Navbar/Sidebar omit the full menu Arrow/Home/End/Escape/return-focus contract. | §3.3 behavior consistency; §6 | 1.3, 2.1–2.2, 3.5 |
| H19 | `packages/core/src/components/Tooltip/Tooltip.tsx:37`, `:113`; `packages/core/src/components/Tooltip/Tooltip.vanilla.ts:30`; `packages/core/src/components/DatePicker/DatePicker.tsx:306`, `:415`; `packages/core/src/components/Modal/Modal.tsx:114`; `packages/core/src/components/Input/Input.tsx:249` | Tooltips cannot be dismissed with Escape and hide when leaving the trigger, preventing hover into the popup. Picker Escape is handled on the input only; focus moved into calendar/time controls has no shared dismissal/return-focus layer. Modal/AlertDialog do not automatically connect a title to an accessible name, and ModalProps cannot accept general `aria-*` props. Input action buttons are removed from tab order. These contradict the README's blanket AA/AAA/full-keyboard claim. | §6; §3.3; §5.3 | 1.3–1.5, 3.2–3.5, 4.4 |
| H20 | `packages/core/src/components/Notification/Notification.vanilla.ts:46`, `:240`, `:249`; `packages/core/src/components/Notification/NotificationProvider.tsx:54`; `packages/core/src/components/Snackbar/SnackbarProvider.tsx:33` | `notification.close(id)` bypasses the stored close handler, leaving active-map/timer/hover state behind and creates an untracked exit timer. destroy removes nodes but does not explicitly remove stored close-button click listeners. React toast providers track duration timers but not exit timers. Repeated close/destroy/unmount need one idempotent lifecycle. | §2.3; §3.3; §7 | 1.2, 2.5, 3.7 |
| H21 | `packages/core/src/utils/shiki.config.ts:3`, `:4`; `packages/core/src/components/Code/Code.tsx:6`; `packages/core/src/index.ts:16`; `packages/core/package.json:62`; `packages/core/vite.config.ts:64` | Shiki is an optional peer but statically imported through the root component barrel. The in-memory root ES bundle imports `shiki` even when a consumer only needs Button; an installation without optional Shiki can fail before Code is used. Move highlighter runtime imports behind the Code demand boundary and externalize intended Shiki subpaths consistently. | §§2.1, 2.4; §3.1 SRP; §7; §5.3 peer documentation | 2.4, 3.8 |
| H22 | `packages/core/src/components/Navbar/Navbar.tsx:127`, `:128`, `:140`, `:254`, `:255`, `:259`, `:277`, `:359`, `:360`, `:364`, `:381`; `packages/core/src/components/Navbar/Navbar.tsx:56` | Eleven explicit `any` occurrences break lint and the zero-any rule. Navbar ID uses `Math.random()` during render rather than `useId`, which can make server/client hydration IDs differ. Use the existing polymorphic types and stable IDs. | §3.1; §3.2; §6 | 2.1 |
| H23 | `packages/docs/tsconfig.app.json:22`; `packages/docs/package.json:11`, `:34`; `.github/workflows/publish.yml:34`; `package.json:12` | Declared TypeScript 7 rejects docs `baseUrl`. Publish checks only core build, not docs, lint, parity or tests. No unit/DOM regression harness exists, so the demonstrated contract failures are unguarded. | §3.2 strict TS; §§5.1–5.3; §8 batch verification | 1.1, 4.4–4.5 |
| H24 | `packages/core/src/styles/global.scss:38`; `packages/core/src/components/Button/Button.scss:27`; `packages/core/src/components/DataTable/DataTable.scss:6`; `packages/core/src/components/FileUpload/FileUpload.scss:13`; `packages/core/src/components/TreeView/TreeView.scss:31` | Numerous referenced design tokens are never defined in compiled globals, with no fallback. Examples: `--font-size-base/lg`, `--line-height-tight/normal`, `--radius-lg`, `--shadow-lg/2xl`, `--color-surface-base/subtle`, `--color-bg-subtle`, `--surface-hover`, `--slate-900/600`, and global semantic text aliases `--color-green-500` etc. CSS declarations become invalid at computed-value time. Detailed token ledger below excludes per-instance injected variables. | §4.3; §4.1 hierarchy; §6 | 3.9 |
| H25 | `packages/core/src/components/Button/Button.tsx:87`; `packages/core/src/components/Grid/Col.tsx:59`; `packages/core/src/components/Navbar/Navbar.tsx:109`; `packages/core/src/components/Sidebar/Sidebar.tsx:148`; public-class ledger below | Public DOM and HTML examples widely expose BEM `__`/`--`; Sidebar partially emits aliases while keeping both schemes. Modifier states also use `has-icon`, `notification-enter--*`, `sidebar-resizing`, etc. instead of the mandated `is-*` state convention. This is an API migration affecting React, SCSS, Vanilla selectors and snippets, not a stylesheet-only rename. | §4.4 (entire section); §2.2 | 3.9–3.10, 4.2 |
| H26 | `packages/docs/src/pages/components/Tabs/api.tsx:3`, `:24`, `:39`; `packages/core/src/components/Tabs/Tabs.tsx:18`, `:115`, `:162`; `packages/docs/src/pages/components/Pagination/api.tsx:18`; `packages/core/src/components/Pagination/Pagination.tsx:18` | Tabs documents obsolete `defaultActiveKey`, `activeKey`, `eventKey` instead of `defaultValue`, `value`; omits `color`. Pagination documents `onPageChange` instead of `onChange`. Main API delta ledger below covers all 39 API files, with exact source types and omissions. These are HIGH by explicit rule, including alias/type-string-only mismatches. | §§5.1, 5.3 | 4.1 |
| H27 | `packages/core/src/index.ts:4`, `:38`, `:48`; `packages/core/src/components/FileUpload/index.ts:1`; `packages/core/src/types/polymorphic.ts:3`; export coverage ledger below | Coverage of all 220 exports is not demonstrated by having one page per family. FileUpload is only illustrated inside Input and has no API table; exported ContextMenu/ContextMenuItem direct APIs, low-level contexts/helpers/constants, multiple compound subcomponents and auxiliary types have no corresponding entries. Props tables exist for many unmentioned `*Props` names, so lack of a literal symbol mention alone is not treated as proof those props are absent. Ledger distinguishes that evidence. | §5.3 100% export coverage; §5.1 | 4.1 |
| H28 | `README.md:99`, `:102`; `packages/core/package.json:24`, `:42`; `packages/docs/src/pages/components/Notification/examples/DefaultExample.tsx:10`; `packages/docs/src/pages/components/DropdownMenu/examples/BasicExample.tsx:11`; `packages/docs/src/pages/components/Tooltip/examples/DirectionExample.tsx:17` | README/example `btn-primary` is not defined (default primary may look correct by coincidence); many examples use nonexistent `button`, `button--primary`, semantic modifiers removed in favor of inline variables, `btn--outline` versus actual `btn--outlined`. Notification snippets refer to global `LycoUI`, which ES/CJS builds do not install on window. CSS exports `./style.css` and `./lyco-ui.css` are both valid aliases; README's explicit `dist/lyco-ui.css`/`dist/vanilla.es.js` filenames exist, so a filename mismatch is **not** asserted. The bare-import closure and nonexistent global are the actual bundle failures. | §4.4; §§5.2–5.3; §2.4 | 3.8, 3.10, 4.2, 4.4 |

#### H26 — Complete API-table comparison ledger (HIGH; §§5.1, 5.3)

All 39 component `api.tsx` files were parsed. This compares custom interface/type members, not every inherited native HTML property. React namespace spelling, named aliases, parameter names, union ordering and quote spelling are included because §5.1 requires the exact TypeScript string; these are distinguished from behavioral API errors. A grouped breakpoint row is readable prose, but is not an exact prop/type definition. Defaults were checked separately below.

| Documentation array | Source contract | Missing custom members / exact type-string deltas / obsolete entries |
|---|---|---|
| `packages/docs/src/pages/components/Accordion/api.tsx:1` | Corresponding custom props inspected | No custom-member/type-string delta found in mapped arrays; export/example coverage remains separate. |
| `packages/docs/src/pages/components/Alert/api.tsx:3` `alertProps` | `packages/core/src/components/Alert/Alert.tsx:10` `AlertProps` | Type strings: `icon` at 11: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/AlertDialog/api.tsx:3` `alertDialogProps` | `packages/core/src/components/AlertDialog/AlertDialog.tsx:22` `AlertDialogProps` | Type strings: `children` at 20: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/AlertDialog/api.tsx:27` `alertDialogTriggerProps` | `packages/core/src/components/AlertDialog/AlertDialog.tsx:56` `AlertDialogTriggerProps` | Missing: `children` (source 57) |
| `packages/docs/src/pages/components/AlertDialog/api.tsx:36` `alertDialogContentProps` | `packages/core/src/components/AlertDialog/AlertDialog.tsx:104` `AlertDialogContentProps` | Missing: `children` (source 105) |
| `packages/docs/src/pages/components/Avatar/api.tsx:3` `avatarProps` | `packages/core/src/components/Avatar/Avatar.tsx:8` `AvatarProps` | Type strings: `fallback` at 15: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Badge/api.tsx:3` `badgeProps` | `packages/core/src/components/Badge/Badge.tsx:10` `BadgeProps` | Type strings: `variant` at 4: `FullVariant \| 'white' \| 'secondary'` → `FullVariant \| 'white'` |
| `packages/docs/src/pages/components/Breadcrumbs/api.tsx:3` `breadcrumbsPropsData` | `packages/core/src/components/Breadcrumbs/Breadcrumbs.tsx:8` `BreadcrumbsProps` | Type strings: `children` at 4: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Breadcrumbs/api.tsx:11` `breadcrumbItemPropsData` | `packages/core/src/components/Breadcrumbs/Breadcrumbs.tsx:36` `BreadcrumbItemProps` | Type strings: `children` at 12: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Breadcrumbs/api.tsx:25` `breadcrumbSeparatorPropsData` | `packages/core/src/components/Breadcrumbs/Breadcrumbs.tsx:69` `BreadcrumbSeparatorProps` | Type strings: `children` at 26: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Button/api.tsx:3` `buttonPropsData` | `packages/core/src/components/Button/Button.tsx:11` `ButtonProps` | Missing: `children` (source 13), `spinnerType` (source 37), `flat` (source 39) |
| `packages/docs/src/pages/components/Button/api.tsx:72` `buttonGroupPropsData` | `packages/core/src/components/Button/ButtonGroup.tsx:9` `ButtonGroupProps` | Missing: `children` (source 10) |
| `packages/docs/src/pages/components/Card/api.tsx:3` `cardPropsData` | `packages/core/src/components/Card/Card.tsx:18` `CardProps` | Missing: `children` (source 20), `flat` (source 34)<br>Type strings: `elevation` at 4: `0 \| 1 \| 2 \| 3 \| 4` → `CardElevation`; `padding` at 10: `'none' \| 'sm' \| 'md' \| 'lg'` → `CardPadding` |
| `packages/docs/src/pages/components/Carousel/api.tsx:1` | Corresponding custom props inspected | No custom-member/type-string delta found in mapped arrays; export/example coverage remains separate. |
| `packages/docs/src/pages/components/Checkbox/api.tsx:3` `checkboxPropsData` | `packages/core/src/components/Checkbox/Checkbox.tsx:10` `CheckboxProps` | Missing: `indeterminate` (source 32)<br>Type strings: `variant` at 9: `FullVariant` → `FullVariant \| 'default'` |
| `packages/docs/src/pages/components/Code/api.tsx:3` `codeProps` | `packages/core/src/components/Code/Code.tsx:12` `CodeProps` | Missing: `inline` (source 24), `tabSize` (source 36) |
| `packages/docs/src/pages/components/ContextMenu/api.tsx:3` `contextMenuProps` | `packages/core/src/components/ContextMenu/ContextMenuContext.tsx:6` `ContextMenuItemDef` | Type strings: `label` at 10: `ReactNode` → `React.ReactNode`; `icon` at 16: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/DataTable/api.tsx:3` `dataTableProps` | `packages/core/src/components/DataTable/DataTable.tsx:34` `DataTableProps` | Type strings: `defaultSortDirection` at 42: `'asc' \| 'desc'` → `SortDirection`; `localization` at 87: `{ rowsPerPage?: string, showingResults?: (from, to, total) => string }` → `{ rowsPerPage?: string; showingResults?: (from: number, to: number, total: number) => string; }`; `onRowClick` at 114: `(event: MouseEvent, row: T, index: number) => void` → `(event: React.MouseEvent, row: T, index: number) => void`; `onRowContextMenu` at 119: `(event: MouseEvent, row: T, index: number) => void` → `(event: React.MouseEvent, row: T, index: number) => void`; `onRowReorder` at 124: `(sourceIndex: number, destIndex: number) => void` → `(sourceIndex: number, destinationIndex: number) => void` |
| `packages/docs/src/pages/components/DataTable/api.tsx:194` `dataTableColumnProps` | `packages/core/src/components/DataTable/DataTable.tsx:15` `DataTableColumn` | Type strings: `render` at 217: `(row: T, index: number) => ReactNode` → `(row: T, rowIndex: number) => ReactNode` |
| `packages/docs/src/pages/components/DateTimePicker/api.tsx:6` `datePickerPropsData` | `packages/core/src/components/DatePicker/DatePicker.tsx:13` `DatePickerProps` | Type strings: `variant` at 23: `FullVariant \| "default"` → `FullVariant \| 'default'`; `validation` at 69: `"disabled" \| "auto" \| "valid" \| "invalid"` → `'disabled' \| 'auto' \| 'valid' \| 'invalid'` |
| `packages/docs/src/pages/components/DateTimePicker/api.tsx:90` `timePickerPropsData` | `packages/core/src/components/DatePicker/TimePicker.tsx:24` `TimePickerProps` | Missing: `locale` (source 40)<br>Type strings: `value` at 91: `{ hours: number; minutes: number } \| null` → `TimeValue \| null`; `onChange` at 96: `(time: { hours: number; minutes: number } \| null) => void` → `(time: TimeValue \| null) => void`; `variant` at 113: `FullVariant \| "default"` → `FullVariant \| 'default'`; `validation` at 138: `"disabled" \| "auto" \| "valid" \| "invalid"` → `'disabled' \| 'auto' \| 'valid' \| 'invalid'` |
| `packages/docs/src/pages/components/DateTimePicker/api.tsx:159` `dateTimePickerPropsData` | `packages/core/src/components/DatePicker/DateTimePicker.tsx:15` `DateTimePickerProps` | Type strings: `variant` at 176: `FullVariant \| "default"` → `FullVariant \| 'default'`; `validation` at 227: `"disabled" \| "auto" \| "valid" \| "invalid"` → `'disabled' \| 'auto' \| 'valid' \| 'invalid'` |
| `packages/docs/src/pages/components/Divider/api.tsx:1` | Corresponding custom props inspected | No custom-member/type-string delta found in mapped arrays; export/example coverage remains separate. |
| `packages/docs/src/pages/components/DropdownMenu/api.tsx:3` `dropdownMenuPropsData` | `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:10` `DropdownMenuProps` | Missing: `children` (source 11) |
| `packages/docs/src/pages/components/DropdownMenu/api.tsx:16` `dropdownMenuItemPropsData` | `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:250` `DropdownMenuItemProps` | Missing: `children` (source 251) |
| `packages/docs/src/pages/components/DropdownMenu/api.tsx:31` `dropdownMenuTriggerPropsData` | `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:52` `DropdownMenuTriggerProps` | Missing: `children` (source 53) |
| `packages/docs/src/pages/components/Grid/api.tsx:3` `rowPropsData` | `packages/core/src/components/Grid/Row.tsx:11` `RowProps` | Missing: `children` (source 13)<br>Type strings: `align` at 4: `'stretch' \| 'start' \| 'center' \| 'end'` → `RowAlign`; `justify` at 10: `'start' \| 'center' \| 'end' \| 'between'` → `RowJustify` |
| `packages/docs/src/pages/components/Grid/api.tsx:18` `colPropsData` | `packages/core/src/components/Grid/Col.tsx:11` `ColProps` | Missing: `children` (source 13), `sm` (source 19), `md` (source 21), `lg` (source 23), `xl` (source 25), `xxl` (source 27)<br>Type strings: `span` at 19: `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12 \| 'auto'` → `ColumnSpan`; `xs` at 24: `1 \| 2 \| ... \| 12 \| 'auto'` → `ColumnSpan`; `align` at 40: `'auto' \| 'start' \| 'center' \| 'end' \| 'stretch'` → `ColumnAlign` |
| `packages/docs/src/pages/components/ImageViewer/api.tsx:3` `imageViewerProps` | `packages/core/src/components/ImageViewer/ImageViewer.tsx:18` `ImageViewerProps` | Missing: `id` (source 30) |
| `packages/docs/src/pages/components/Input/api.tsx:3` `inputProps` | `packages/core/src/components/Input/Input.tsx:16` `InputProps` | Type strings: `iconStart` at 29: `ReactNode` → `React.ReactNode`; `iconEnd` at 34: `ReactNode` → `React.ReactNode`; `spinnerType` at 55: `'classic' \| 'growing'` → `SpinnerType`; `validation` at 67: `'disabled' \| 'auto' \| 'valid' \| 'invalid'` → `InputValidation` |
| `packages/docs/src/pages/components/Modal/api.tsx:3` `modalProps` | `packages/core/src/components/Modal/Modal.tsx:9` `ModalProps` | Missing: `id` (source 25), `role` (source 27), `closeOnOverlayClick` (source 29), `closeOnEscape` (source 31)<br>Type strings: `children` at 33: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Modal/api.tsx:45` `modalHeaderProps` | `packages/core/src/components/Modal/Modal.tsx:141` `ModalHeaderProps` | Type strings: `children` at 46: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Modal/api.tsx:58` `modalTitleProps` | `packages/core/src/components/Modal/Modal.tsx:161` `ModalTitleProps` | Type strings: `children` at 65: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Modal/api.tsx:72` `modalBodyProps` | `packages/core/src/components/Modal/Modal.tsx:182` `ModalBodyProps` | Type strings: `children` at 73: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Modal/api.tsx:85` `modalFooterProps` | `packages/core/src/components/Modal/Modal.tsx:202` `ModalFooterProps` | Type strings: `children` at 86: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Navbar/api.tsx:3` `navbarProps` | `packages/core/src/components/Navbar/Navbar.tsx:25` `NavbarProps` | Type strings: `variant` at 4: `'base' \| 'dark' \| 'light' \| 'transparent' \| 'FullVariant'` → `'base' \| 'dark' \| 'light' \| 'transparent' \| FullVariant` |
| `packages/docs/src/pages/components/Notification/api.tsx:3` `notificationProps` | `packages/core/src/components/Notification/Notification.tsx:75` `NotificationProps` | Missing: `description` (source 83), `isExiting` (source 89), `position` (source 93)<br>Type strings: `icon` at 11: `ReactNode` → `React.ReactNode`; `title` at 16: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Notification/api.tsx:45` `providerProps` | `packages/core/src/components/Notification/NotificationProvider.tsx:23` `NotificationProviderProps` | Missing: `children` (source 24) |
| `packages/docs/src/pages/components/Notification/api.tsx:61` `notificationOptionsProps` | `packages/core/src/components/Notification/NotificationContext.tsx:12` `NotificationOptions` | Missing: `description` (source 16)<br>Type strings: `title` at 67: `ReactNode` → `React.ReactNode`; `message` at 62: `ReactNode` → `React.ReactNode`; `icon` at 79: `ReactNode` → `React.ReactNode`; `duration` at 90: `'short' \| 'medium' \| 'long' \| number` → `NotificationDuration` |
| `packages/docs/src/pages/components/Pagination/api.tsx:3` `paginationProps` | `packages/core/src/components/Pagination/Pagination.tsx:10` `PaginationProps` | Missing: `onChange` (source 18), `prevIcon` (source 24), `nextIcon` (source 26)<br>Obsolete/misnamed: `onPageChange` at 22 |
| `packages/docs/src/pages/components/ProgressBar/api.tsx:1` | Corresponding custom props inspected | No custom-member/type-string delta found in mapped arrays; export/example coverage remains separate. |
| `packages/docs/src/pages/components/Radio/api.tsx:3` `radioPropsData` | `packages/core/src/components/Radio/Radio.tsx:10` `RadioProps` | Type strings: `variant` at 9: `FullVariant` → `FullVariant \| 'default'` |
| `packages/docs/src/pages/components/Range/api.tsx:1` | Corresponding custom props inspected | No custom-member/type-string delta found in mapped arrays; export/example coverage remains separate. |
| `packages/docs/src/pages/components/Select/api.tsx:3` `selectPropsData` | `packages/core/src/components/Select/Select.tsx:28` `SelectProps` | Missing: `placeholder` (source 36), `disabled` (source 44), `searchable` (source 46), `allowCustomValues` (source 48), `validate` (source 50)<br>Type strings: `variant` at 24: `FullVariant` → `FullVariant \| 'default'` |
| `packages/docs/src/pages/components/Sidebar/api.tsx:3` `sidebarProps` | `packages/core/src/components/Sidebar/Sidebar.tsx:18` `SidebarProps` | Type strings: `variant` at 28: `'fixed' \| 'overlay' \| 'push'` → `'overlay' \| 'push' \| 'fixed'` |
| `packages/docs/src/pages/components/Snackbar/api.tsx:3` `snackbarOptionsProps` | `packages/core/src/components/Snackbar/SnackbarContext.tsx:12` `SnackbarOptions` | Type strings: `message` at 4: `ReactNode \| string` → `React.ReactNode`; `icon` at 16: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Spinner/api.tsx:3` `spinnerPropsData` | `packages/core/src/components/Spinner/Spinner.tsx:14` `SpinnerProps` | Type strings: `type` at 4: `'classic' \| 'growing'` → `SpinnerType` |
| `packages/docs/src/pages/components/Stepper/api.tsx:3` `stepperPropsData` | `packages/core/src/components/Stepper/Stepper.tsx:10` `StepperProps` | Type strings: `children` at 33: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Stepper/api.tsx:40` `stepPropsData` | `packages/core/src/components/Stepper/Step.tsx:7` `StepProps` | Missing: `hideNumbers` (source 21)<br>Type strings: `title` at 41: `ReactNode` → `React.ReactNode`; `description` at 46: `ReactNode` → `React.ReactNode`; `icon` at 51: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Switch/api.tsx:3` `switchPropsData` | `packages/core/src/components/Switch/Switch.tsx:10` `SwitchProps` | Type strings: `variant` at 9: `FullVariant` → `FullVariant \| 'default'` |
| `packages/docs/src/pages/components/Table/api.tsx:42` `tableRowProps` | `packages/core/src/components/Table/Table.tsx:104` `TableRowProps` | Missing: `hover` (source 108) |
| `packages/docs/src/pages/components/Table/api.tsx:51` `tableCellProps` | `packages/core/src/components/Table/Table.tsx:132` `TableCellProps` | Missing: `scope` (source 140) |
| `packages/docs/src/pages/components/Tabs/api.tsx:3` `tabsProps` | `packages/core/src/components/Tabs/Tabs.tsx:18` `TabsProps` | Missing: `defaultValue` (source 20), `value` (source 22), `color` (source 24)<br>Type strings: `onChange` at 16: `(key: string) => void` → `(value: string) => void`<br>Obsolete/misnamed: `defaultActiveKey` at 4 |
| `packages/docs/src/pages/components/Tabs/api.tsx:24` `tabTriggerProps` | `packages/core/src/components/Tabs/Tabs.tsx:115` `TabTriggerProps` | Missing: `value` (source 117)<br>Obsolete/misnamed: `eventKey` at 25 |
| `packages/docs/src/pages/components/Tabs/api.tsx:39` `tabContentProps` | `packages/core/src/components/Tabs/Tabs.tsx:162` `TabContentProps` | Missing: `value` (source 164)<br>Obsolete/misnamed: `eventKey` at 40 |
| `packages/docs/src/pages/components/Textarea/api.tsx:3` `textareaProps` | `packages/core/src/components/Textarea/Textarea.tsx:20` `TextareaProps` | Type strings: `validation` at 21: `'disabled' \| 'auto' \| 'valid' \| 'invalid'` → `TextareaValidation`; `resize` at 43: `'none' \| 'vertical' \| 'horizontal' \| 'both'` → `TextareaResize` |
| `packages/docs/src/pages/components/Timeline/api.tsx:3` `timelinePropsData` | `packages/core/src/components/Timeline/Timeline.tsx:8` `TimelineProps` | Type strings: `children` at 16: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Timeline/api.tsx:23` `timelineItemPropsData` | `packages/core/src/components/Timeline/TimelineItem.tsx:7` `TimelineItemProps` | Type strings: `title` at 24: `ReactNode` → `React.ReactNode`; `time` at 29: `ReactNode` → `React.ReactNode`; `icon` at 34: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Tooltip/api.tsx:3` `tooltipProps` | `packages/core/src/components/Tooltip/Tooltip.tsx:12` `TooltipProps` | Missing: `offset` (source 20)<br>Type strings: `position` at 10: `'top' \| 'bottom' \| 'left' \| 'right'` → `TooltipPosition` |
| `packages/docs/src/pages/components/TreeView/api.tsx:16` `treeItemApi` | `packages/core/src/components/TreeView/TreeItem.tsx:8` `TreeItemProps` | Missing: `children` (source 22)<br>Type strings: `label` at 23: `ReactNode` → `React.ReactNode`; `icon` at 29: `ReactNode` → `React.ReactNode` |
| `packages/docs/src/pages/components/Video/api.tsx:3` `videoPropsData` | `packages/core/src/components/Video/Video.tsx:7` `VideoProps` | Type strings: `children` at 21: `ReactNode` → `React.ReactNode` |

Additional API/default and missing-table findings (same HIGH rule):

- `packages/docs/src/pages/components/Modal/api.tsx:5` and `packages/docs/src/pages/components/ImageViewer/api.tsx:5` advertise a default `isOpen=false`, but `Modal.tsx:11` and `ImageViewer.tsx:20` require the prop and do not initialize it. Describe it as required, not as an implemented default.
- `packages/docs/src/pages/components/Select/api.tsx:40` omits that `SelectOption.label/value` are optional (spacer options); source: `packages/core/src/components/Select/Select.tsx:10`.
- Documented inherited props also need exact types: `packages/docs/src/pages/components/Input/api.tsx:5` narrows native `type` to a short union, while `packages/core/src/components/Input/Input.tsx:16` inherits `HTMLInputTypeAttribute`. `packages/docs/src/pages/components/Range/api.tsx:5` onward calls value/defaultValue/min/max/step `number`, but `packages/core/src/components/Range/Range.tsx:9` inherits native value/defaultValue unions (string/readonly string[]/number) and min/max/step `number | string`. Either narrow the actual Range API deliberately or document the real inherited types; do not claim these numbers are enforced today. The compiler resolved these declarations in `node_modules/@types/react/index.d.ts:2797`, `:3307`, `:3309`, `:3319–3321`.
- No Navbar.Dropdown/DropdownSubMenu tables (`Navbar.tsx:283`, `:384`); no Sidebar.Dropdown table (`Sidebar.tsx:302`); no DropdownMenuContent/Separator/SubMenu tables (`DropdownMenu.tsx:131`, `:308`, `:332`); no TabsList table (`Tabs.tsx:85`). Empty native-only prop surfaces can use an explicit native-props reference.
- No FileUpload API table: `packages/core/src/components/FileUpload/FileUpload.tsx:10` exposes `variant`, `onDropFiles`, `onDragStateChange`, native file-input props and children. Examples live in `packages/docs/src/pages/components/Input/examples/FileUploadBasicExample.tsx:1`, but Input API does not describe FileUpload.
- ContextMenu API (`packages/docs/src/pages/components/ContextMenu/api.tsx:3`) describes only `ContextMenuItemDef`. Exported direct components (`ContextMenu.tsx:10`, `ContextMenuItem.tsx:9`), provider, hook call signature and their props are not a substitute for that data-model table.
- Snackbar API documents options/hook but not exported SnackbarProps (`packages/core/src/components/Snackbar/Snackbar.tsx:10`); NotificationOptions omits the now-used `description` property. Notification example prose promises hover pause (`packages/docs/src/pages/components/Notification/examples/DefaultExample.tsx:5`), but React provider schedules an unconditional timeout (`NotificationProvider.tsx:93`).
- Exported auxiliary aliases and generic helpers need named documentation: RowAlign/RowJustify/ColumnSpan/ColumnAlign, SpinnerType, InputValidation, TextareaValidation/TextareaResize, NotificationDuration/NotificationPosition, CalendarProps, TimeInputProps, PolymorphicProps/PolymorphicRef. Some types are expanded in prop tables, which still violates the exact-alias-string rule. Do not claim every unnamed `*Props` symbol has no table; the mapped interfaces above establish that distinction.

#### H27 — All public exports and documentation coverage (HIGH; §5.3)

This ledger resolves all 220 symbols from `packages/core/src/index.ts:4–48`; line numbers in parentheses are declarations in the source path in the first column. **T** = matched interface/API array; **M** = literal symbol mention somewhere in docs (an upper bound, not proof of a complete contract); **GAP** = neither. Compound member/API gaps described above remain findings even when a parent page exists. Internal-looking symbols are public because the barrels export them; either document them or deliberately narrow exports in a versioned API change.

| Source file | Every exported symbol (declaration line) and coverage evidence |
|---|---|
| `packages/core/src/components/Button/Button.tsx` | `ButtonProps` (11) **T**, `Button` (46) **M** |
| `packages/core/src/components/Button/ButtonGroup.tsx` | `ButtonGroupProps` (9) **T**, `ButtonGroup` (17) **M** |
| `packages/core/src/components/Card/Card.tsx` | `CardElevation` (9) **M**, `CardPadding` (13) **M**, `CardProps` (18) **T**, `CardSectionProps` (85) **T**, `Card` (114) **M** |
| `packages/core/src/components/Checkbox/Checkbox.tsx` | `CheckboxProps` (10) **T**, `Checkbox` (38) **M** |
| `packages/core/src/components/Grid/Row.tsx` | `RowAlign` (5) **GAP**, `RowJustify` (6) **GAP**, `RowProps` (11) **T**, `Row` (23) **M** |
| `packages/core/src/components/Grid/Col.tsx` | `ColumnSpan` (5) **GAP**, `ColumnAlign` (6) **GAP**, `ColProps` (11) **T**, `Col` (37) **M** |
| `packages/core/src/components/Radio/Radio.tsx` | `RadioProps` (10) **T**, `Radio` (32) **M** |
| `packages/core/src/components/Switch/Switch.tsx` | `SwitchProps` (10) **T**, `Switch` (32) **M** |
| `packages/core/src/components/Select/Select.tsx` | `SelectOption` (10) **T**, `SelectProps` (28) **T**, `Select` (56) **M** |
| `packages/core/src/components/Spinner/Spinner.tsx` | `SpinnerType` (9) **GAP**, `SpinnerProps` (14) **T**, `Spinner` (37) **M** |
| `packages/core/src/components/Accordion/Accordion.tsx` | `Accordion` (35) **M**, `AccordionItem` (119) **M**, `AccordionProps` (17) **T**, `AccordionItemProps` (107) **T** |
| `packages/core/src/components/Alert/Alert.tsx` | `Alert` (42) **M**, `AlertProps` (10) **T** |
| `packages/core/src/components/Badge/Badge.tsx` | `Badge` (34) **M**, `BadgeProps` (10) **T** |
| `packages/core/src/components/Code/Code.tsx` | `Code` (66) **M**, `CodeProps` (12) **T** |
| `packages/core/src/components/Range/Range.tsx` | `Range` (31) **M**, `RangeProps` (9) **T** |
| `packages/core/src/components/ProgressBar/ProgressBar.tsx` | `ProgressBar` (23) **M**, `ProgressBarProps` (9) **T** |
| `packages/core/src/components/Input/Input.tsx` | `Input` (52) **M**, `InputProps` (16) **T**, `InputValidation` (11) **GAP** |
| `packages/core/src/components/Textarea/Textarea.tsx` | `TextareaValidation` (10) **GAP**, `TextareaResize` (15) **GAP**, `TextareaProps` (20) **T**, `Textarea` (42) **M** |
| `packages/core/src/components/Snackbar/Snackbar.tsx` | `SnackbarProps` (10) **GAP**, `Snackbar` (28) **M** |
| `packages/core/src/components/Snackbar/SnackbarContext.tsx` | `SnackbarDuration` (7) **M**, `SnackbarOptions` (12) **T**, `SnackbarContextValue` (24) **T**, `SnackbarContext` (32) **GAP**, `useSnackbar` (35) **M** |
| `packages/core/src/components/Snackbar/SnackbarProvider.tsx` | `SnackbarProvider` (20) **M** |
| `packages/core/src/components/Modal/Modal.tsx` | `ModalProps` (9) **T**, `ModalBase` (38) **GAP**, `ModalHeaderProps` (141) **T**, `ModalHeader` (149) **M**, `ModalTitleProps` (161) **T**, `ModalTitle` (170) **M**, `ModalBodyProps` (182) **T**, `ModalBody` (190) **M**, `ModalFooterProps` (202) **T**, `ModalFooter` (210) **M**, `Modal` (219) **M** |
| `packages/core/src/components/AlertDialog/AlertDialog.tsx` | `useAlertDialogContext` (11) **GAP**, `AlertDialogProps` (22) **T**, `AlertDialog` (33) **M**, `AlertDialogTriggerProps` (56) **T**, `AlertDialogTrigger` (65) **M**, `AlertDialogContentProps` (104) **T**, `AlertDialogContent` (114) **M**, `AlertDialogHeader` (139) **M**, `AlertDialogTitle` (144) **M**, `AlertDialogBody` (149) **M**, `AlertDialogFooter` (154) **M**, `AlertDialogActionProps` (159) **T**, `AlertDialogAction` (167) **M**, `AlertDialogCancelProps` (200) **T**, `AlertDialogCancel` (208) **M** |
| `packages/core/src/components/Navbar/Navbar.tsx` | `NavbarProps` (25) **T**, `NavbarBrandProps` (119) **T**, `NavbarToggleProps` (144) **GAP**, `NavbarCollapseProps` (178) **GAP**, `NavbarNavProps` (204) **T**, `NavbarItemProps` (226) **GAP**, `NavbarLinkProps` (246) **T**, `NavbarDropdownProps` (283) **GAP**, `NavbarDropdownItemProps` (351) **T**, `NavbarDropdownSubMenuProps` (384) **GAP**, `Navbar` (447) **M** |
| `packages/core/src/components/Avatar/Avatar.tsx` | `AvatarProps` (8) **T**, `Avatar` (38) **M** |
| `packages/core/src/components/Sidebar/Sidebar.tsx` | `Sidebar` (421) **M**, `SidebarProps` (18) **T**, `SidebarRegionProps` (141) **GAP**, `SidebarNavProps` (178) **GAP**, `SidebarItemProps` (194) **GAP**, `SidebarLinkProps` (211) **T**, `SidebarIconProps` (269) **T**, `SidebarLabelProps` (285) **T**, `SidebarDropdownProps` (302) **GAP**, `SidebarDropdownItemProps` (376) **T** |
| `packages/core/src/components/Notification/NotificationProvider.tsx` | `NotificationProvider` (36) **M**, `NotificationProviderProps` (23) **T** |
| `packages/core/src/components/Notification/Notification.tsx` | `NOTIFICATION_SEMANTIC_SVG` (59) **GAP**, `NOTIFICATION_CLOSE_SVG` (70) **GAP**, `NotificationProps` (75) **T**, `Notification` (101) **M** |
| `packages/core/src/components/Notification/NotificationContext.tsx` | `NotificationDuration` (7) **GAP**, `NotificationOptions` (12) **T**, `NotificationContextValue` (34) **GAP**, `NotificationContext` (44) **GAP**, `useNotification` (51) **M** |
| `packages/core/src/components/Pagination/Pagination.tsx` | `PaginationProps` (10) **T**, `Pagination` (49) **M** |
| `packages/core/src/components/Table/Table.tsx` | `TableProps` (9) **T**, `Table` (28) **M**, `TableHead` (72) **M**, `TableBody` (83) **M**, `TableFoot` (94) **GAP**, `TableRowProps` (104) **T**, `TableRow` (114) **M**, `TableCellProps` (132) **T**, `TableCell` (147) **M** |
| `packages/core/src/components/DataTable/DataTable.tsx` | `SortDirection` (13) **M**, `DataTableColumn` (15) **T**, `DataTableProps` (34) **T**, `DataTableRef` (147) **T**, `DataTable` (730) **M** |
| `packages/core/src/components/Tabs/Tabs.tsx` | `TabsProps` (18) **T**, `Tabs` (33) **M**, `TabsListProps` (81) **GAP**, `TabsList` (88) **M**, `TabTriggerProps` (115) **T**, `TabTrigger` (124) **M**, `TabContentProps` (162) **T**, `TabContent` (171) **M** |
| `packages/core/src/components/Tooltip/Tooltip.tsx` | `TooltipPosition` (7) **GAP**, `TooltipProps` (12) **T**, `Tooltip` (27) **M** |
| `packages/core/src/components/Breadcrumbs/Breadcrumbs.tsx` | `BreadcrumbsProps` (8) **T**, `Breadcrumbs` (17) **M**, `BreadcrumbItemProps` (36) **T**, `BreadcrumbItem` (46) **M**, `BreadcrumbSeparatorProps` (69) **T**, `BreadcrumbSeparator` (78) **M** |
| `packages/core/src/components/Divider/Divider.tsx` | `DividerProps` (8) **T**, `Divider` (38) **M** |
| `packages/core/src/components/Carousel/Carousel.tsx` | `CarouselProps` (8) **T**, `Carousel` (44) **M** |
| `packages/core/src/components/ContextMenu/ContextMenuContext.tsx` | `ContextMenuItemDef` (6) **T**, `ContextMenuState` (20) **GAP**, `ContextMenuContextValue` (30) **GAP**, `ContextMenuContext` (38) **GAP**, `useContextMenu` (41) **M** |
| `packages/core/src/components/ContextMenu/ContextMenuProvider.tsx` | `ContextMenuProviderProps` (10) **GAP**, `ContextMenuProvider` (17) **M** |
| `packages/core/src/components/ContextMenu/ContextMenu.tsx` | `ContextMenuProps` (10) **GAP**, `ContextMenu` (26) **GAP** |
| `packages/core/src/components/ContextMenu/ContextMenuItem.tsx` | `ContextMenuItemProps` (9) **GAP**, `ContextMenuItem` (17) **GAP** |
| `packages/core/src/components/DatePicker/DatePicker.tsx` | `DatePickerProps` (13) **T**, `DatePicker` (106) **M** |
| `packages/core/src/components/DatePicker/TimePicker.tsx` | `TimePickerProps` (24) **T**, `TimeValue` (14) **M**, `TimePicker` (63) **M** |
| `packages/core/src/components/DatePicker/DateTimePicker.tsx` | `DateTimePickerProps` (15) **T**, `DateTimePicker` (68) **M** |
| `packages/core/src/components/DatePicker/Calendar.tsx` | `CalendarProps` (8) **GAP** |
| `packages/core/src/components/DatePicker/TimeInput.tsx` | `TimeInputProps` (8) **GAP** |
| `packages/core/src/utils/theme.ts` | `getContrastColor` (12) **M** |
| `packages/core/src/components/FileUpload/FileUpload.tsx` | `FileUpload` (24) **M**, `FileUploadProps` (10) **GAP** |
| `packages/core/src/components/DropdownMenu/DropdownMenuContext.tsx` | `DropdownMenuContextValue` (6) **GAP**, `DropdownMenuContext` (17) **GAP**, `useDropdownMenuContext` (19) **GAP** |
| `packages/core/src/components/DropdownMenu/DropdownMenu.tsx` | `DropdownMenuProps` (10) **T**, `DropdownMenu` (20) **M**, `DropdownMenuTriggerProps` (52) **T**, `DropdownMenuTrigger` (61) **M**, `DropdownMenuContentProps` (131) **GAP**, `DropdownMenuContent` (139) **M**, `DropdownMenuItemProps` (250) **T**, `DropdownMenuItem` (260) **M**, `DropdownMenuSeparatorProps` (308) **GAP**, `DropdownMenuSeparator` (315) **M**, `DropdownMenuSubMenuProps` (332) **GAP**, `DropdownMenuSubMenu` (341) **M** |
| `packages/core/src/components/Stepper/Stepper.tsx` | `StepperProps` (10) **T**, `Stepper` (29) **M** |
| `packages/core/src/components/Stepper/Step.tsx` | `StepProps` (7) **T**, `Step` (36) **M** |
| `packages/core/src/components/Timeline/Timeline.tsx` | `TimelineProps` (8) **T**, `Timeline` (24) **M** |
| `packages/core/src/components/Timeline/TimelineItem.tsx` | `TimelineItemProps` (7) **T**, `TimelineItem` (22) **M** |
| `packages/core/src/components/TreeView/TreeView.tsx` | `TreeViewProps` (8) **T**, `TreeView` (19) **M**, `TreeContext` (163) **GAP** |
| `packages/core/src/components/TreeView/TreeItem.tsx` | `TreeItemProps` (8) **T**, `TreeItem` (35) **M** |
| `packages/core/src/components/ImageViewer/ImageViewer.tsx` | `ImageViewerImage` (8) **T**, `ImageViewerProps` (18) **T**, `ImageViewer` (37) **M** |
| `packages/core/src/components/Video/Video.tsx` | `VideoProps` (7) **T**, `Video` (28) **M** |
| `packages/core/src/types/types.ts` | `ColorVariant` (1) **M**, `SemanticVariant` (17) **M**, `FullVariant` (19) **M**, `SizeVariant` (21) **M**, `Alignment` (23) **M**, `Orientation` (25) **M**, `NotificationPosition` (27) **M** |
| `packages/core/src/types/polymorphic.ts` | `PolymorphicProps` (3) **GAP**, `PolymorphicRef` (5) **GAP** |

#### H25/H28 — Public BEM class exposure ledger (HIGH; §§4.4, 5.3)

These source locations emit, select or style BEM classes. The ledger includes Sass nested/interpolated modifiers and Grid template literals; CSS custom-property names are not CSS classes and must retain their `--` prefix. JSX `__html` is also excluded. Migrate the whole class contract together, retaining old aliases only as a documented temporary compatibility surface.

| Exact file | BEM-related line numbers |
|---|---|
| `packages/core/src/components/Accordion/Accordion.scss` | 23, 39, 49, 56, 74, 105, 114, 122, 131, 136, 141, 145 |
| `packages/core/src/components/Accordion/Accordion.tsx` | 152, 159, 162, 170, 184, 189, 190 |
| `packages/core/src/components/Accordion/Accordion.vanilla.ts` | 88, 92, 97, 104, 121, 128, 131, 162, 178 |
| `packages/core/src/components/Alert/Alert.scss` | 23, 34, 50, 55, 61, 66, 100 |
| `packages/core/src/components/Alert/Alert.tsx` | 86, 99, 100, 102, 110 |
| `packages/core/src/components/Alert/Alert.vanilla.ts` | 5, 22, 40, 43 |
| `packages/core/src/components/Avatar/Avatar.scss` | 49, 56 |
| `packages/core/src/components/Avatar/Avatar.tsx` | 60, 67 |
| `packages/core/src/components/Badge/Badge.tsx` | 51, 52 |
| `packages/core/src/components/Breadcrumbs/Breadcrumbs.scss` | 5, 15, 50 |
| `packages/core/src/components/Breadcrumbs/Breadcrumbs.tsx` | 26, 52, 84 |
| `packages/core/src/components/Button/Button.scss` | 90, 157, 165, 174 |
| `packages/core/src/components/Button/Button.tsx` | 86, 87, 88, 89, 90, 91, 92, 93, 100, 101, 108, 109, 116, 117 |
| `packages/core/src/components/Card/Card.scss` | 18, 24, 29, 123 |
| `packages/core/src/components/Card/Card.tsx` | 61, 63, 64, 66, 91, 98, 105 |
| `packages/core/src/components/Carousel/Carousel.scss` | 5, 18, 27, 31, 41, 53, 89, 99 |
| `packages/core/src/components/Carousel/Carousel.tsx` | 192, 204, 215, 232, 242, 255, 259 |
| `packages/core/src/components/Checkbox/Checkbox.scss` | 20, 28, 67, 71, 76, 85 |
| `packages/core/src/components/Checkbox/Checkbox.tsx` | 60, 74, 77, 78 |
| `packages/core/src/components/Code/Code.scss` | 35, 44, 53, 54, 60, 68, 76, 83, 131, 139, 140, 141, 152, 153, 157, 169 |
| `packages/core/src/components/Code/Code.tsx` | 188, 201, 210, 211, 214, 221, 224, 228, 240, 252, 256, 267, 272 |
| `packages/core/src/components/Code/Code.vanilla.ts` | 26, 27, 28, 29, 37, 56, 73 |
| `packages/core/src/components/ContextMenu/ContextMenu.scss` | 16, 54, 63, 68, 76 |
| `packages/core/src/components/ContextMenu/ContextMenuItem.tsx` | 59, 66, 67, 70, 82, 87, 92 |
| `packages/core/src/components/DataTable/DataTable.scss` | 12, 22, 28, 38, 45, 51, 57, 66, 91, 111, 117, 123, 142, 146, 157, 167, 168, 176, 190, 216, 226, 236, 250, 256, 260, 266, 272 |
| `packages/core/src/components/DataTable/DataTable.tsx` | 479, 490, 501, 503, 504, 540, 543, 558, 566, 574, 586, 591, 609, 610, 611, 621, 624, 644, 664, 678, 683, 706, 718, 720 |
| `packages/core/src/components/DatePicker/Calendar.tsx` | 179, 181, 184, 192, 195, 208, 215, 219, 230, 244 |
| `packages/core/src/components/DatePicker/DatePicker.scss` | 23, 28, 29, 38, 43, 44, 57, 67, 72, 78, 86, 122, 137, 162, 191, 207, 235, 241, 261, 266, 271, 285, 294, 298, 305, 312, 344, 357, 361, 375, 441, 448, 458, 466, 474, 496, 524 |
| `packages/core/src/components/DatePicker/DatePicker.tsx` | 342, 352, 361, 373, 393, 410, 419, 445 |
| `packages/core/src/components/DatePicker/DateTimePicker.tsx` | 379, 380, 390, 406, 419, 445, 461, 470, 481, 483, 497, 500, 511, 515, 523, 534 |
| `packages/core/src/components/DatePicker/TimeInput.tsx` | 126, 127, 128, 132, 141, 151, 156, 165, 179, 189 |
| `packages/core/src/components/DatePicker/TimePicker.tsx` | 301, 302, 312, 321, 331, 351, 368, 377, 400 |
| `packages/core/src/components/DropdownMenu/DropdownMenu.scss` | 8, 43, 59, 93, 103, 108, 129, 136, 163, 164 |
| `packages/core/src/components/DropdownMenu/DropdownMenu.tsx` | 115, 233, 293, 321, 366, 373, 378, 384 |
| `packages/core/src/components/FileUpload/FileUpload.scss` | 54, 63, 71, 79, 85 |
| `packages/core/src/components/FileUpload/FileUpload.tsx` | 147 |
| `packages/core/src/components/Grid/Col.tsx` | 57, 58, 59, 60, 61, 62, 63, 64, 65 |
| `packages/core/src/components/Grid/Row.tsx` | 37, 38 |
| `packages/core/src/components/ImageViewer/ImageViewer.scss` | 18, 28, 39, 49, 62, 74, 98, 130, 140, 159 |
| `packages/core/src/components/ImageViewer/ImageViewer.tsx` | 134, 137, 154, 165, 180, 188, 199, 200, 205 |
| `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts` | 43, 44, 46, 47, 48 |
| `packages/core/src/components/Input/Input.scss` | 43, 108, 127, 132, 133, 138, 148, 175, 217, 221, 228, 236, 292, 306, 312, 376, 393, 408, 431 |
| `packages/core/src/components/Input/Input.tsx` | 227, 228, 236, 237, 249, 255, 259, 261, 272, 290, 292, 301, 307, 311, 313, 321, 324, 335, 353, 354, 355 |
| `packages/core/src/components/Input/Input.vanilla.ts` | 78, 80, 83, 84, 95, 102, 107, 114, 124, 132, 136, 144, 160, 168, 174, 236, 247, 259, 268, 279 |
| `packages/core/src/components/Modal/Modal.scss` | 48, 79, 84, 94, 107, 116, 123, 139, 145 |
| `packages/core/src/components/Modal/Modal.tsx` | 123, 127, 151, 172, 192, 212 |
| `packages/core/src/components/Modal/Modal.vanilla.ts` | 58 |
| `packages/core/src/components/Navbar/Navbar.scss` | 133, 137, 150, 160, 184, 236, 248, 255, 280, 284, 296, 300, 312, 322, 328, 339, 354, 416, 421, 442, 450, 457, 491, 532, 533, 541, 542, 547, 551, 558, 560, 564, 570, 576, 585, 595, 596, 600, 606, 612, 621 |
| `packages/core/src/components/Navbar/Navbar.tsx` | 93, 94, 109, 134, 162, 191, 195, 216, 236, 269, 325, 330, 337, 342, 374, 419, 426, 432, 438 |
| `packages/core/src/components/Navbar/Navbar.vanilla.ts` | 26, 27, 35, 61 |
| `packages/core/src/components/Notification/Notification.scss` | 116, 132, 139, 147, 155, 188, 198 |
| `packages/core/src/components/Notification/Notification.tsx` | 121, 122, 147, 148, 149, 151, 157, 165, 167 |
| `packages/core/src/components/Notification/Notification.vanilla.ts` | 68, 95, 111, 127, 131, 137, 154, 155, 170, 184, 186, 246, 247 |
| `packages/core/src/components/Notification/NotificationProvider.tsx` | 121 |
| `packages/core/src/components/Pagination/Pagination.scss` | 43, 52, 56, 57, 104, 118, 128, 170 |
| `packages/core/src/components/Pagination/Pagination.tsx` | 148, 149, 151, 163, 164, 171, 173, 185, 187, 202, 210, 215, 226, 244, 245, 249 |
| `packages/core/src/components/Pagination/Pagination.vanilla.ts` | 128, 146, 149, 173, 177, 183, 202, 213, 218, 237, 267, 273 |
| `packages/core/src/components/ProgressBar/ProgressBar.scss` | 13 |
| `packages/core/src/components/ProgressBar/ProgressBar.tsx` | 57 |
| `packages/core/src/components/Radio/Radio.scss` | 18, 26, 52, 56, 61, 70 |
| `packages/core/src/components/Radio/Radio.tsx` | 54, 68, 71, 72 |
| `packages/core/src/components/Range/Range.scss` | 19, 63, 64, 65, 84, 136 |
| `packages/core/src/components/Range/Range.tsx` | 110, 111, 112, 113, 114, 128, 145, 146 |
| `packages/core/src/components/Range/Range.vanilla.ts` | 35, 38, 47, 53, 57, 97 |
| `packages/core/src/components/Select/Select.scss` | 16, 23, 32, 56, 65, 77, 102, 109, 117, 123, 127, 143, 156, 171, 206, 233, 243, 258 |
| `packages/core/src/components/Select/Select.tsx` | 311, 324, 334, 335, 341, 350, 358, 367, 377, 386, 392, 407, 408, 422, 432 |
| `packages/core/src/components/Select/Select.vanilla.ts` | 96, 105, 113, 118, 127, 132, 138, 156, 168, 177, 187, 194, 210, 235, 320, 358, 368, 387, 438, 465, 471, 477, 487 |
| `packages/core/src/components/Sidebar/Sidebar.scss` | 57, 62, 72, 78, 84, 93, 95, 117, 129, 136, 146, 163, 173, 178, 198, 214, 221, 245, 246, 247, 248, 256, 264, 270, 290, 296, 302, 311, 313, 317, 322, 328, 334, 341, 349, 427, 436, 438, 443, 449, 454, 477, 484, 539, 540, 541, 543, 544, 545 |
| `packages/core/src/components/Sidebar/Sidebar.tsx` | 114, 126, 148, 158, 168, 185, 201, 254, 258, 259, 276, 292, 342, 351, 356, 357, 358, 362, 363, 401, 402 |
| `packages/core/src/components/Sidebar/Sidebar.vanilla.ts` | 39, 40, 76, 77 |
| `packages/core/src/components/Snackbar/Snackbar.scss` | 46, 62, 78, 83 |
| `packages/core/src/components/Snackbar/Snackbar.tsx` | 48, 50, 63, 64, 68 |
| `packages/core/src/components/Snackbar/Snackbar.vanilla.ts` | 76, 78, 84, 99, 133 |
| `packages/core/src/components/Spinner/Spinner.tsx` | 56 |
| `packages/core/src/components/Stepper/Step.tsx` | 75, 76, 81, 82, 83 |
| `packages/core/src/components/Stepper/Stepper.scss` | 35, 41, 68, 76, 85, 94, 101, 119, 125, 132, 137, 145, 150, 157, 162, 168, 177, 182, 188, 196, 216, 228, 231, 235, 241, 247, 252, 257 |
| `packages/core/src/components/Stepper/Stepper.tsx` | 78 |
| `packages/core/src/components/Switch/Switch.scss` | 24, 32, 59, 67, 72, 82 |
| `packages/core/src/components/Switch/Switch.tsx` | 54, 69, 72, 73 |
| `packages/core/src/components/Tabs/Tabs.scss` | 8, 24, 71, 75, 79, 83, 87, 91, 95 |
| `packages/core/src/components/Tabs/Tabs.tsx` | 68, 100, 148, 185 |
| `packages/core/src/components/Tabs/Tabs.vanilla.ts` | 71 |
| `packages/core/src/components/Textarea/Textarea.scss` | 43, 70, 88, 93, 94, 99, 158, 172, 243 |
| `packages/core/src/components/Textarea/Textarea.tsx` | 163, 164, 181, 196, 198, 207, 208, 209 |
| `packages/core/src/components/Timeline/Timeline.scss` | 20, 48, 63, 82, 96, 101, 116, 121, 128, 137, 161, 167, 170, 174, 181, 187 |
| `packages/core/src/components/Timeline/Timeline.tsx` | 41 |
| `packages/core/src/components/Timeline/TimelineItem.tsx` | 42, 46, 47, 51, 52, 54 |
| `packages/core/src/components/Tooltip/Tooltip.scss` | 7 |
| `packages/core/src/components/Tooltip/Tooltip.tsx` | 133 |
| `packages/core/src/components/Tooltip/Tooltip.vanilla.ts` | 45, 83 |
| `packages/core/src/components/TreeView/TreeItem.tsx` | 83, 92, 95, 98, 101 |
| `packages/core/src/components/TreeView/TreeView.scss` | 9, 18, 36, 62, 83, 92, 93 |
| `packages/core/src/components/TreeView/TreeView.tsx` | 90, 103, 119 |

#### H28 — Example integrity ledger (HIGH; §§5.2–5.3)

All 160 example modules were checked for exported `title`, `description`, `order`, `vanillaHtml`, CSS selectors and advertised auto-init/API support. Rows below identify concrete contract failures or missing exports. Inline application actions that call a real API are distinguishable from inline reimplementation of the widget itself; a script used to listen for `pageChange` is not inherently a widget defect.

| Exact file | Finding |
|---|---|
| `packages/docs/src/pages/components/Alert/examples/BasicExample.tsx:7` | BEM authoring at 7: `alert--success`, `alert__content`, `alert__title`, `alert__description`, `alert--white`; No emitted core selector for `alert--success`, `alert--white` |
| `packages/docs/src/pages/components/Alert/examples/ClosableExample.tsx:7` | BEM authoring at 7: `alert--warning`, `alert--closable`, `alert__content`, `alert__title`, `alert__description`, `alert__close`; No emitted core selector for `alert--warning` |
| `packages/docs/src/pages/components/Alert/examples/DurationExample.tsx:8` | BEM authoring at 8: `alert--purple`, `alert--closable`, `alert__content`, `alert__title`, `alert__description`, `alert__progress`; No emitted core selector for `alert--purple` |
| `packages/docs/src/pages/components/Alert/examples/IconExample.tsx:7` | BEM authoring at 7: `alert--success`, `alert__icon`, `alert__content`, `alert__title`, `alert__description`; No emitted core selector for `alert--success` |
| `packages/docs/src/pages/components/AlertDialog/examples/BasicExample.tsx:8` | BEM authoring at 8: `button--primary`, `modal__dialog`, `modal__dialog--md`, `modal__dialog--centered`, `modal__content`, `modal__header`, `modal__title`, `modal__body`, `modal__footer`, `button--secondary`; No emitted core selector for `button`, `button--primary`, `button--secondary` |
| `packages/docs/src/pages/components/AlertDialog/examples/DestructiveExample.tsx:9` | BEM authoring at 9: `button--danger`, `modal__dialog`, `modal__dialog--md`, `modal__dialog--centered`, `modal__content`, `modal__header`, `modal__title`, `modal__body`, `modal__footer`, `button--secondary`; No emitted core selector for `button`, `button--danger`, `button--secondary` |
| `packages/docs/src/pages/components/Avatar/examples/BasicExample.tsx:7` | BEM authoring at 7: `avatar--md`, `avatar--circle`, `avatar__image`, `avatar__fallback` |
| `packages/docs/src/pages/components/Avatar/examples/SizesExample.tsx:8` | BEM authoring at 8: `avatar--sm`, `avatar--circle`, `avatar__fallback`, `avatar--md`, `avatar--square`, `avatar__image` |
| `packages/docs/src/pages/components/Badge/examples/BasicExample.tsx:7` | BEM authoring at 7: `badge--primary`, `badge--success`, `badge--danger`; No emitted core selector for `badge--primary`, `badge--success`, `badge--danger` |
| `packages/docs/src/pages/components/Badge/examples/InsideElementsExample.tsx:7` | BEM authoring at 7: `badge--white`, `badge--pill`, `badge--neutral`; No emitted core selector for `btn-primary`, `badge--white`, `badge--neutral` |
| `packages/docs/src/pages/components/Badge/examples/PillExample.tsx:7` | BEM authoring at 7: `badge--primary`, `badge--pill`, `badge--success`, `badge--dim`, `badge--danger`; No emitted core selector for `badge--primary`, `badge--success`, `badge--danger` |
| `packages/docs/src/pages/components/Breadcrumbs/examples/Basic.tsx:9` | BEM authoring at 9: `card--elevation-1`, `card--padding-md`, `card__body`, `breadcrumbs__list`, `breadcrumbs__item`, `breadcrumbs__separator` |
| `packages/docs/src/pages/components/Breadcrumbs/examples/Collapsed.tsx:8` | BEM authoring at 8: `card--elevation-1`, `card--padding-md`, `card__body`, `breadcrumbs__list`, `breadcrumbs__item`, `breadcrumbs__separator` |
| `packages/docs/src/pages/components/Breadcrumbs/examples/CustomSeparator.tsx:8` | BEM authoring at 8: `card--elevation-1`, `card--padding-md`, `card__body`, `breadcrumbs__list`, `breadcrumbs__item`, `breadcrumbs__separator` |
| `packages/docs/src/pages/components/Button/examples/GroupsExample.tsx:8` | No emitted core selector for `lyco-mb-4`, `btn-primary`, `btn-danger` |
| `packages/docs/src/pages/components/Button/examples/IconsExample.tsx:8` | No emitted core selector for `btn-primary`, `btn-info`, `btn-danger`, `btn-icon-only`, `btn-outlined`, `btn-warning`, `btn-flat` |
| `packages/docs/src/pages/components/Button/examples/OutlinedExample.tsx:7` | BEM authoring at 7: `btn--primary`, `btn--outlined`, `btn--success`, `btn--danger`, `btn--warning`; No emitted core selector for `btn--primary`, `btn--success`, `btn--danger`, `btn--warning` |
| `packages/docs/src/pages/components/Button/examples/RoundedExample.tsx:8` | BEM authoring at 8: `btn--primary`, `btn--rounded`, `btn--success`, `btn--danger`, `btn--icon-only`, `btn--purple`, `btn--outlined`; No emitted core selector for `btn--primary`, `btn--success`, `btn--danger`, `btn--purple` |
| `packages/docs/src/pages/components/Button/examples/SizesExample.tsx:7` | BEM authoring at 7: `btn--primary`, `btn--sm`, `btn--lg`; No emitted core selector for `btn--primary` |
| `packages/docs/src/pages/components/Button/examples/StatesExample.tsx:11` | BEM authoring at 11: `btn--primary`, `btn--outlined`, `btn--ghost`, `btn--loading`; No emitted core selector for `btn--primary` |
| `packages/docs/src/pages/components/Button/examples/VariantsExample.tsx:7` | BEM authoring at 7: `btn--primary`, `btn--neutral`, `btn--danger`, `btn--warning`, `btn--success`, `btn--info`, `btn--purple`, `btn--white`; No emitted core selector for `btn--primary`, `btn--neutral`, `btn--danger`, `btn--warning`, `btn--success`, `btn--info`, `btn--purple` |
| `packages/docs/src/pages/components/Card/examples/CompoundExample.tsx:7` | BEM authoring at 7: `card--elevation-1`, `card__header`, `card__body`, `card__footer`; No emitted core selector for `mb-0` |
| `packages/docs/src/pages/components/Card/examples/ElevationExample.tsx:8` | BEM authoring at 8: `card--elevation-0`, `card__body`; No emitted core selector for `mb-0` |
| `packages/docs/src/pages/components/Card/examples/InteractiveExample.tsx:7` | BEM authoring at 7: `card--interactive`, `card--elevation-1`, `card__body`; No emitted core selector for `mb-0` |
| `packages/docs/src/pages/components/Card/examples/PaddingExample.tsx:8` | BEM authoring at 8: `card--elevation-1`, `card--padding-none`, `card--padding-md`; No emitted core selector for `mb-0`, `m-4` |
| `packages/docs/src/pages/components/Card/examples/SolidExample.tsx:8` | BEM authoring at 8: `card--elevation-1`, `card--variant`, `card--solid`, `card--primary`, `card__body`; No emitted core selector for `card--primary`, `mb-0` |
| `packages/docs/src/pages/components/Card/examples/VariantsExample.tsx:8` | BEM authoring at 8: `card--elevation-1`, `card--variant`, `card--dim`, `card--primary`, `card__body`; No emitted core selector for `card--primary`, `mb-0` |
| `packages/docs/src/pages/components/Carousel/examples/CardExample.tsx:8` | BEM authoring at 8: `carousel--center-mode`, `carousel__track`, `carousel__slide`, `card--elevated`, `button--primary`; No emitted core selector for `card--elevated`, `button`, `button--primary` |
| `packages/docs/src/pages/components/Carousel/examples/ImageExample.tsx:7` | BEM authoring at 7: `carousel__track`, `carousel__slide`, `carousel__arrow`, `carousel__arrow--prev`, `carousel__arrow--next`, `carousel__dots`, `carousel__dot` |
| `packages/docs/src/pages/components/Checkbox/examples/BasicExample.tsx:7` | BEM authoring at 7: `checkbox--primary`, `checkbox__input`, `checkbox__control`, `checkbox__label`; No emitted core selector for `checkbox--primary` |
| `packages/docs/src/pages/components/Checkbox/examples/SizesExample.tsx:8` | BEM authoring at 8: `checkbox--primary`, `checkbox--sm`, `checkbox__input`, `checkbox__control`, `checkbox__label`, `checkbox--lg`; No emitted core selector for `checkbox--primary` |
| `packages/docs/src/pages/components/Checkbox/examples/VariantsExample.tsx:8` | BEM authoring at 8: `checkbox--green`, `checkbox__input`, `checkbox__control`, `checkbox__label`, `checkbox--red`, `checkbox--success`; No emitted core selector for `checkbox--green`, `checkbox--red`, `checkbox--success` |
| `packages/docs/src/pages/components/Code/examples/BasicExample.tsx:7` | BEM authoring at 7: `code--block`, `code__body`, `code__highlight` |
| `packages/docs/src/pages/components/Code/examples/EditableExample.tsx:1` | Missing exports: `vanillaHtml` |
| `packages/docs/src/pages/components/Code/examples/InlineExample.tsx:7` | BEM authoring at 7: `code--inline` |
| `packages/docs/src/pages/components/Code/examples/ToolbarExample.tsx:7` | BEM authoring at 7: `code--block`, `code__header`, `code__header-left`, `code__lang-select`, `code__header-right`, `code__action`, `code__body`, `code__highlight` |
| `packages/docs/src/pages/components/ContextMenu/examples/ComplexExample.tsx:7` | Uses nonexistent ES-module global `LycoUI`; Calls unimplemented Vanilla ContextMenu API |
| `packages/docs/src/pages/components/DataTable/examples/BasicExample.tsx:1` | Missing exports: `vanillaHtml` |
| `packages/docs/src/pages/components/DataTable/examples/CustomRenderExample.tsx:1` | Missing exports: `vanillaHtml` |
| `packages/docs/src/pages/components/DataTable/examples/DragDropExample.tsx:1` | Missing exports: `vanillaHtml` |
| `packages/docs/src/pages/components/DataTable/examples/KitchenSinkExample.tsx:9` | Placeholder comment, not complete Vanilla example |
| `packages/docs/src/pages/components/DataTable/examples/LoadingExample.tsx:1` | Missing exports: `vanillaHtml` |
| `packages/docs/src/pages/components/DataTable/examples/PersistenceExample.tsx:1` | Missing exports: `vanillaHtml` |
| `packages/docs/src/pages/components/DataTable/examples/TranslatedExample.tsx:9` | Placeholder comment, not complete Vanilla example |
| `packages/docs/src/pages/components/DateTimePicker/examples/BasicDatePickerExample.tsx:8` | BEM authoring at 8: `datepicker__trigger`, `datepicker__icon`, `datepicker__input` |
| `packages/docs/src/pages/components/DateTimePicker/examples/DateTimePickerLayoutExample.tsx:8` | BEM authoring at 8: `datepicker__trigger`, `datepicker__icon`, `datepicker__input` |
| `packages/docs/src/pages/components/DateTimePicker/examples/FormattingExample.tsx:8` | BEM authoring at 8: `datepicker__trigger`, `datepicker__icon`, `datepicker__input` |
| `packages/docs/src/pages/components/DateTimePicker/examples/MinMaxExample.tsx:8` | BEM authoring at 8: `datepicker__trigger`, `datepicker__icon`, `datepicker__input` |
| `packages/docs/src/pages/components/DateTimePicker/examples/TimePicker12Example.tsx:8` | BEM authoring at 8: `datepicker__trigger`, `datepicker__icon`, `datepicker__input` |
| `packages/docs/src/pages/components/DateTimePicker/examples/TimePicker24Example.tsx:8` | BEM authoring at 8: `datepicker__trigger`, `datepicker__icon`, `datepicker__input` |
| `packages/docs/src/pages/components/Divider/examples/ColorExample.tsx:7` | BEM authoring at 7: `divider--horizontal`, `divider--spacing-none`, `divider--length-full` |
| `packages/docs/src/pages/components/Divider/examples/LengthExample.tsx:7` | BEM authoring at 7: `divider--horizontal`, `divider--spacing-none`, `divider--length-sm`, `divider--length-md`, `divider--length-lg`, `divider--length-full` |
| `packages/docs/src/pages/components/Divider/examples/SpacingExample.tsx:7` | BEM authoring at 7: `divider--horizontal`, `divider--spacing-lg`, `divider--length-full`; No emitted core selector for `mb-0` |
| `packages/docs/src/pages/components/Divider/examples/ThicknessExample.tsx:7` | BEM authoring at 7: `divider--horizontal`, `divider--spacing-none`, `divider--length-full` |
| `packages/docs/src/pages/components/Divider/examples/VerticalExample.tsx:7` | BEM authoring at 7: `divider--vertical`, `divider--spacing-none`, `divider--length-full`, `button--neutral`, `button--sm`; No emitted core selector for `font-weight-semibold`, `button`, `button--neutral`, `button--sm` |
| `packages/docs/src/pages/components/DropdownMenu/examples/BasicExample.tsx:8` | BEM authoring at 8: `button--primary`, `button--md`, `dropdown-menu__content`, `dropdown-menu__item`, `dropdown-menu__separator`; No emitted core selector for `button`, `button--primary`, `button--md`; Inline widget logic replaces missing menu controller |
| `packages/docs/src/pages/components/DropdownMenu/examples/DisabledItemsExample.tsx:8` | BEM authoring at 8: `dropdown-menu__trigger`, `dropdown-menu__content`, `dropdown-menu__item`; Inline widget logic replaces missing menu controller |
| `packages/docs/src/pages/components/DropdownMenu/examples/IconsAndDestructiveExample.tsx:9` | BEM authoring at 9: `dropdown-menu__content`, `dropdown-menu__item`, `dropdown-menu__separator`, `dropdown-menu__item--destructive`; Inline widget logic replaces missing menu controller |
| `packages/docs/src/pages/components/DropdownMenu/examples/NestedExample.tsx:8` | BEM authoring at 8: `button--base`, `button--md`, `dropdown-menu__content`, `dropdown-menu__item`, `dropdown-menu__separator`, `dropdown-menu__submenu`, `dropdown-menu__submenu-trigger`, `dropdown-menu__caret`, `dropdown-menu__submenu-content`; No emitted core selector for `button`, `button--base`, `button--md`; Inline widget logic replaces missing menu controller |
| `packages/docs/src/pages/components/Grid/examples/JustifyExample.tsx:7` | BEM authoring at 7: `row--justify-center`, `col--4` |
| `packages/docs/src/pages/components/Grid/examples/OneColumnWidthExample.tsx:7` | BEM authoring at 7: `col--6` |
| `packages/docs/src/pages/components/Grid/examples/ResponsiveSizingExample.tsx:7` | BEM authoring at 7: `col--12`, `col--md-8`, `col--md-4` |
| `packages/docs/src/pages/components/Grid/examples/StretchingExample.tsx:7` | BEM authoring at 7: `col--6`, `col--stretch` |
| `packages/docs/src/pages/components/Grid/examples/VerticalAlignmentExample.tsx:7` | BEM authoring at 7: `row--align-center`, `col--4`, `col--2`, `col--align-start`, `col--align-center`, `col--align-end` |
| `packages/docs/src/pages/components/ImageViewer/examples/Gallery.tsx:8` | BEM authoring at 8: `button--primary`, `image-viewer__container`, `image-viewer__close`, `image-viewer__nav`, `image-viewer__nav--prev`, `image-viewer__image-wrapper`, `image-viewer__image`, `image-viewer__nav--next`, `image-viewer__thumbnails`, `image-viewer__thumbnails-track`, `image-viewer__thumbnail`; No emitted core selector for `button`, `button--primary` |
| `packages/docs/src/pages/components/ImageViewer/examples/SingleImage.tsx:8` | BEM authoring at 8: `button--primary`, `image-viewer__container`, `image-viewer__close`, `image-viewer__image-wrapper`, `image-viewer__image`; No emitted core selector for `button`, `button--primary` |
| `packages/docs/src/pages/components/Input/examples/FileUploadBasicExample.tsx:8` | BEM authoring at 8: `fileupload__icon`, `fileupload__text`, `fileupload__subtext`; No emitted core selector for `sr-only` |
| `packages/docs/src/pages/components/Input/examples/FileUploadDisabledExample.tsx:7` | BEM authoring at 7: `fileupload__icon`, `fileupload__text`, `fileupload__subtext`; No emitted core selector for `sr-only` |
| `packages/docs/src/pages/components/Input/examples/FileUploadMultipleExample.tsx:8` | BEM authoring at 8: `fileupload__icon`, `fileupload__text`, `fileupload__subtext`; No emitted core selector for `sr-only` |
| `packages/docs/src/pages/components/Input/examples/NumberExample.tsx:8` | No emitted core selector for `text-sm`, `fw-bold` |
| `packages/docs/src/pages/components/Modal/examples/AlignmentExample.tsx:8` | BEM authoring at 8: `modal__dialog`, `modal__dialog--md` |
| `packages/docs/src/pages/components/Modal/examples/BasicExample.tsx:12` | BEM authoring at 12: `button--primary`, `modal__dialog`, `modal__dialog--md`, `modal__dialog--centered`, `modal__content`, `modal__header`, `modal__title`, `modal__close`, `modal__body`, `input__field`, `modal__footer`, `button--neutral`; No emitted core selector for `button`, `button--primary`, `button--neutral` |
| `packages/docs/src/pages/components/Modal/examples/ScrollingExample.tsx:8` | BEM authoring at 8: `modal__dialog`, `modal__dialog--scrollable`, `modal__dialog--centered`, `modal__content`, `modal__header`, `modal__body`, `modal__footer` |
| `packages/docs/src/pages/components/Modal/examples/SizesExample.tsx:8` | BEM authoring at 8: `button--primary`, `modal__dialog`, `modal__dialog--sm`, `modal__dialog--centered`; No emitted core selector for `button`, `button--primary` |
| `packages/docs/src/pages/components/Navbar/examples/AvatarTriggerExample.tsx:9` | BEM authoring at 9: `navbar--base`, `navbar--expand-lg`, `navbar__container`, `navbar__brand`, `navbar__toggle`, `navbar__collapse`, `navbar__collapse-inner`, `navbar__nav`, `navbar__item`, `navbar__link`, `navbar__nav--align-end`, `navbar__dropdown`, `navbar__dropdown-trigger`, `navbar__dropdown-trigger--unstyled`, `avatar--md`, `avatar--circle`, `avatar__fallback`, `navbar__dropdown-item`, `navbar__dropdown-item--danger` |
| `packages/docs/src/pages/components/Navbar/examples/CenteredExample.tsx:6` | BEM authoring at 6: `navbar--base`, `navbar--expand-lg`, `navbar__container`, `navbar__brand`, `navbar__toggle`, `navbar__collapse`, `navbar__collapse-inner`, `navbar__nav`, `navbar__nav--align-center`, `navbar__item`, `navbar__link` |
| `packages/docs/src/pages/components/Navbar/examples/CollapsedExample.tsx:7` | BEM authoring at 7: `navbar--base`, `navbar__container`, `navbar__brand`, `navbar__toggle`, `navbar__collapse`, `navbar__collapse-inner`, `navbar__nav`, `navbar__item`, `navbar__link`, `navbar__dropdown`, `navbar__dropdown-trigger`, `btn--unstyled`, `avatar--sm`, `avatar--circle`, `avatar__fallback`, `navbar__dropdown-menu`, `navbar__dropdown-item`, `navbar__dropdown-submenu`, `navbar__dropdown-submenu-trigger`, `navbar__dropdown-caret`, `navbar__dropdown-menu--nested`; No emitted core selector for `btn--unstyled` |
| `packages/docs/src/pages/components/Navbar/examples/ColorVariantsExample.tsx:6` | BEM authoring at 6: `navbar--expand-lg`, `navbar__container`, `navbar__brand`, `navbar__toggle`, `navbar__collapse`, `navbar__collapse-inner`, `navbar__nav`, `navbar__item`, `navbar__link`; No emitted core selector for `navbar-primary`, `navbar-success` |
| `packages/docs/src/pages/components/Navbar/examples/ComplexLayoutExample.tsx:8` | BEM authoring at 8: `navbar--base`, `navbar--expand-lg`, `navbar__container`, `navbar__brand`, `navbar__toggle`, `navbar__collapse`, `navbar__collapse-inner`, `navbar__nav`, `navbar__nav--align-start`, `navbar__item`, `navbar__link` |
| `packages/docs/src/pages/components/Navbar/examples/LayoutConfigurationsExample.tsx:8` | BEM authoring at 8: `navbar--base`, `navbar--expand-lg`, `navbar__container`, `navbar__brand`, `navbar__toggle`, `navbar__collapse`, `navbar__collapse-inner`, `navbar__nav`, `navbar__item`, `navbar__link`, `navbar__nav--align-end`, `navbar__dropdown`, `navbar__dropdown-trigger`, `navbar__dropdown-caret`, `navbar__dropdown-menu`, `navbar__dropdown-menu--right`, `navbar__dropdown-item`, `navbar__dropdown-submenu`, `navbar__dropdown-submenu-trigger`, `navbar__dropdown-menu--nested`, `navbar__dropdown-item--danger`, `navbar__brand--centered`, `navbar__nav--align-start` |
| `packages/docs/src/pages/components/Navbar/examples/SizesExample.tsx:8` | BEM authoring at 8: `navbar--base`, `navbar--sm`, `navbar--expand-always`, `navbar__container`, `navbar__brand`, `navbar__collapse`, `navbar__collapse-inner`, `navbar__nav`, `navbar__item`, `navbar__link`, `navbar--md`, `navbar--lg` |
| `packages/docs/src/pages/components/Notification/examples/ColorsExample.tsx:7` | No emitted core selector for `btn-primary`, `btn-purple`; Uses nonexistent ES-module global `LycoUI` |
| `packages/docs/src/pages/components/Notification/examples/CustomIconExample.tsx:7` | No emitted core selector for `btn-primary`; Uses nonexistent ES-module global `LycoUI` |
| `packages/docs/src/pages/components/Notification/examples/DefaultExample.tsx:8` | No emitted core selector for `btn-primary`, `btn-neutral`; Uses nonexistent ES-module global `LycoUI` |
| `packages/docs/src/pages/components/Notification/examples/PositionExample.tsx:9` | Uses nonexistent ES-module global `LycoUI` |
| `packages/docs/src/pages/components/Notification/examples/TitleExample.tsx:7` | No emitted core selector for `btn-primary`; Uses nonexistent ES-module global `LycoUI` |
| `packages/docs/src/pages/components/Notification/examples/VariantsExample.tsx:8` | No emitted core selector for `btn-success`, `btn-warning`, `btn-danger`, `btn-info`; Uses nonexistent ES-module global `LycoUI` |
| `packages/docs/src/pages/components/ProgressBar/examples/BasicExample.tsx:7` | BEM authoring at 7: `progress__bar`; No emitted core selector for `text-sm`, `fw-bold` |
| `packages/docs/src/pages/components/ProgressBar/examples/SizesExample.tsx:7` | BEM authoring at 7: `progress--sm`, `progress__bar` |
| `packages/docs/src/pages/components/ProgressBar/examples/VariantsExample.tsx:7` | BEM authoring at 7: `progress--success`, `progress__bar`; No emitted core selector for `progress--success` |
| `packages/docs/src/pages/components/Radio/examples/BasicExample.tsx:7` | BEM authoring at 7: `radio--primary`, `radio__input`, `radio__control`, `radio__label`; No emitted core selector for `radio--primary` |
| `packages/docs/src/pages/components/Radio/examples/SizesExample.tsx:8` | BEM authoring at 8: `radio--primary`, `radio--sm`, `radio__input`, `radio__control`, `radio__label`, `radio--lg`; No emitted core selector for `radio--primary` |
| `packages/docs/src/pages/components/Radio/examples/VariantsExample.tsx:8` | BEM authoring at 8: `radio--info`, `radio__input`, `radio__control`, `radio__label`, `radio--success`, `radio--danger`; No emitted core selector for `radio--info`, `radio--success`, `radio--danger` |
| `packages/docs/src/pages/components/Range/examples/BasicExample.tsx:8` | No emitted core selector for `text-sm`, `fw-bold` |
| `packages/docs/src/pages/components/Range/examples/TooltipTriggerExample.tsx:8` | No emitted core selector for `text-sm`, `fw-bold` |
| `packages/docs/src/pages/components/Range/examples/TrackAndThumbExample.tsx:8` | No emitted core selector for `text-sm`, `fw-bold` |
| `packages/docs/src/pages/components/Range/examples/VariantsExample.tsx:7` | No emitted core selector for `text-sm`, `fw-bold` |
| `packages/docs/src/pages/components/Select/examples/OptionVariantsExample.tsx:8` | No emitted core selector for `col-12`, `col-md-6` |
| `packages/docs/src/pages/components/Select/examples/SearchableExample.tsx:8` | BEM authoring at 8: `select--md`, `select__trigger`, `select__content`, `select__input`, `select__chevron-btn`, `select__chevron`; No emitted core selector for `select--md`, `text-sm` |
| `packages/docs/src/pages/components/Sidebar/examples/BasicExample.tsx:8` | BEM authoring at 8: `sidebar--fixed` |
| `packages/docs/src/pages/components/Sidebar/examples/DropdownVariantsExample.tsx:13` | BEM authoring at 13: `btn--ghost`, `sidebar__dropdown-item--primary`, `sidebar__dropdown-item--success`, `sidebar__dropdown-item--warning`, `sidebar__dropdown-item--danger` |
| `packages/docs/src/pages/components/Sidebar/examples/InitialsExample.tsx:8` | BEM authoring at 8: `sidebar--fixed` |
| `packages/docs/src/pages/components/Sidebar/examples/OverlayExample.tsx:8` | BEM authoring at 8: `sidebar--overlay`; No emitted core selector for `btn-primary` |
| `packages/docs/src/pages/components/Sidebar/examples/ResizableExample.tsx:8` | BEM authoring at 8: `sidebar--fixed` |
| `packages/docs/src/pages/components/Sidebar/examples/SidebarProfileExample.tsx:14` | BEM authoring at 14: `btn--ghost`, `btn--icon`, `avatar--sm`, `avatar--circle`, `avatar__fallback`, `sidebar__dropdown-item--danger`; No emitted core selector for `btn--icon` |
| `packages/docs/src/pages/components/Snackbar/examples/DefaultExample.tsx:7` | BEM authoring at 7: `snackbar--neutral`, `snackbar__content`; No emitted core selector for `snackbar--neutral` |
| `packages/docs/src/pages/components/Snackbar/examples/VariantsExample.tsx:7` | BEM authoring at 7: `snackbar--success`, `snackbar__icon`, `snackbar__content`; No emitted core selector for `snackbar--success` |
| `packages/docs/src/pages/components/Spinner/examples/SizesExample.tsx:7` | BEM authoring at 7: `spinner--classic`, `spinner--primary`, `spinner--sm`, `spinner--lg`; No emitted core selector for `spinner--primary` |
| `packages/docs/src/pages/components/Spinner/examples/TypesExample.tsx:7` | BEM authoring at 7: `spinner--classic`, `spinner--primary`, `spinner--growing`; No emitted core selector for `spinner--primary` |
| `packages/docs/src/pages/components/Spinner/examples/VariantsExample.tsx:7` | BEM authoring at 7: `spinner--classic`, `spinner--primary`, `spinner--neutral`, `spinner--success`; No emitted core selector for `spinner--primary`, `spinner--neutral`, `spinner--success` |
| `packages/docs/src/pages/components/Stepper/examples/CompactVersion.tsx:8` | BEM authoring at 8: `stepper--horizontal`, `stepper--compact`, `step__header`, `step__icon`, `step__content`, `step__title` |
| `packages/docs/src/pages/components/Stepper/examples/CustomColor.tsx:8` | BEM authoring at 8: `stepper--horizontal`, `step__header`, `step__icon`, `step__content`, `step__title` |
| `packages/docs/src/pages/components/Stepper/examples/CustomIcons.tsx:8` | BEM authoring at 8: `stepper--horizontal`, `step__header`, `step__icon`, `step__content`, `step__title` |
| `packages/docs/src/pages/components/Stepper/examples/ErrorState.tsx:8` | BEM authoring at 8: `stepper--horizontal`, `step__header`, `step__icon`, `step__content`, `step__title`, `step__description` |
| `packages/docs/src/pages/components/Stepper/examples/Horizontal.tsx:8` | BEM authoring at 8: `stepper--horizontal`, `step__header`, `step__icon`, `step__content`, `step__title`, `step__description` |
| `packages/docs/src/pages/components/Stepper/examples/SuccessState.tsx:8` | BEM authoring at 8: `stepper--horizontal`, `step__header`, `step__icon`, `step__content`, `step__title`, `step__description` |
| `packages/docs/src/pages/components/Stepper/examples/Vertical.tsx:8` | BEM authoring at 8: `stepper--vertical`, `step__header`, `step__icon`, `step__content`, `step__title`, `step__description` |
| `packages/docs/src/pages/components/Switch/examples/BasicExample.tsx:7` | BEM authoring at 7: `switch__input`, `switch__control`, `switch__label` |
| `packages/docs/src/pages/components/Switch/examples/SizesExample.tsx:7` | BEM authoring at 7: `switch--sm`, `switch__input`, `switch__control`, `switch__label`, `switch--lg` |
| `packages/docs/src/pages/components/Switch/examples/VariantsExample.tsx:8` | BEM authoring at 8: `switch__input`, `switch__control`, `switch__label` |
| `packages/docs/src/pages/components/Table/examples/ColorsExample.tsx:11` | No emitted core selector for `table-primary`, `table-success`, `table-danger`, `table-warning`, `table-info` |
| `packages/docs/src/pages/components/Table/examples/StandardExample.tsx:8` | No emitted core selector for `col-12`, `badge-success`, `badge-warning` |
| `packages/docs/src/pages/components/Tabs/examples/2-Colors.tsx:7` | BEM authoring at 7: `tabs--success`, `tabs__list`, `tabs__trigger`, `tabs__content` |
| `packages/docs/src/pages/components/Tabs/examples/StandardExample.tsx:7` | BEM authoring at 7: `tabs__list`, `tabs__trigger`, `tabs__content` |
| `packages/docs/src/pages/components/Textarea/examples/BasicExample.tsx:23` | BEM authoring at 23: `textarea__field`, `textarea__label` |
| `packages/docs/src/pages/components/Textarea/examples/DisabledExample.tsx:28` | BEM authoring at 28: `textarea__field`, `textarea__label` |
| `packages/docs/src/pages/components/Textarea/examples/ResizeExample.tsx:42` | BEM authoring at 42: `textarea--resize-both`, `textarea__field`, `textarea__label`, `textarea--resize-vertical`, `textarea--resize-horizontal`, `textarea--resize-none` |
| `packages/docs/src/pages/components/Textarea/examples/ValidationExample.tsx:29` | BEM authoring at 29: `textarea__field`, `textarea__label`, `textarea__message`, `textarea__message--valid`, `textarea__message--invalid` |
| `packages/docs/src/pages/components/Timeline/examples/Alternating.tsx:9` | BEM authoring at 9: `timeline--vertical`, `timeline--alternate`, `timeline__item`, `timeline__icon-wrapper`, `timeline__icon`, `timeline__content`, `timeline__title`, `timeline__time` |
| `packages/docs/src/pages/components/Timeline/examples/BasicVertical.tsx:8` | BEM authoring at 8: `timeline--vertical`, `timeline__item`, `timeline__icon-wrapper`, `timeline__icon`, `timeline__content`, `timeline__title`, `timeline__time` |
| `packages/docs/src/pages/components/Timeline/examples/CustomIconsColors.tsx:8` | BEM authoring at 8: `timeline--vertical`, `timeline__item`, `timeline__icon-wrapper`, `timeline__icon`, `timeline__content`, `timeline__title`, `timeline__time` |
| `packages/docs/src/pages/components/Tooltip/examples/DirectionExample.tsx:8` | BEM authoring at 8: `card__body`, `btn--outline`, `btn--primary`; No emitted core selector for `col-12`, `btn--outline`, `btn--primary` |
| `packages/docs/src/pages/components/TreeView/examples/BasicTreeView.tsx:8` | BEM authoring at 8: `treeview__item`, `treeview__item-content`, `treeview__icon`, `treeview__icon--chevron`, `treeview__label`, `treeview__group` |
| `packages/docs/src/pages/components/TreeView/examples/CustomIconsTreeView.tsx:9` | BEM authoring at 9: `treeview__item`, `treeview__item-content`, `treeview__icon`, `treeview__label`, `treeview__group` |
| `packages/docs/src/pages/components/TreeView/examples/SelectedStateTreeView.tsx:8` | BEM authoring at 8: `treeview__item`, `treeview__item-content`, `treeview__icon`, `treeview__icon--chevron`, `treeview__label`, `treeview__group` |

Example totals: 6 modules missing required metadata export(s); 110 modules expose BEM inside literal `vanillaHtml`. Application-only `col-example` and `interactive-zone` were excluded from invalid-library-class claims. Missing utility classes such as `sr-only`, `text-sm`, `fw-bold`, `mb-0`, and `font-weight-semibold` remain invalid for a standalone core-only consumer unless the example supplies its own CSS.

#### H24 — Unresolved no-fallback design-token ledger (HIGH; §4.3)

The following direct `var(--token)` references lack a definition in the compiled core styles and explicit runtime setters. A token used only inside the fallback of an already defined property is excluded from computed-invalid claims. Per-instance props (e.g. `--select-option-color`, `--btn-color-base`, `--carousel-gap`) and fallback-only references are not labeled broken. Dynamic palette expansion was included by compiling Sass loops.

| Undefined token | Every direct no-fallback SCSS reference |
|---|---|
| `--font-size-base` | `packages/core/src/components/Alert/Alert.scss:19`, `packages/core/src/components/Button/Button.scss:27`, `packages/core/src/components/Checkbox/Checkbox.scss:10`, `packages/core/src/components/Checkbox/Checkbox.scss:98`, `packages/core/src/components/DatePicker/DatePicker.scss:9`, `packages/core/src/components/DatePicker/DatePicker.scss:467`, `packages/core/src/components/DropdownMenu/DropdownMenu.scss:5`, `packages/core/src/components/Input/Input.scss:389`, `packages/core/src/components/Pagination/Pagination.scss:24`, `packages/core/src/components/Radio/Radio.scss:8`, `packages/core/src/components/Radio/Radio.scss:83`, `packages/core/src/components/Select/Select.scss:6`, `packages/core/src/components/Switch/Switch.scss:8`, `packages/core/src/components/Switch/Switch.scss:98`, `packages/core/src/components/Tabs/Tabs.scss:97`, `packages/core/src/components/Textarea/Textarea.scss:235` |
| `--font-size-lg` | `packages/core/src/components/Button/Button.scss:69`, `packages/core/src/components/Checkbox/Checkbox.scss:103`, `packages/core/src/components/DatePicker/DatePicker.scss:36`, `packages/core/src/components/Modal/Modal.scss:119`, `packages/core/src/components/Radio/Radio.scss:88`, `packages/core/src/components/Select/Select.scss:63`, `packages/core/src/components/Switch/Switch.scss:106` |
| `--color-bg-subtle` | `packages/core/src/components/Card/Card.scss:32` |
| `--shadow-lg` | `packages/core/src/components/Card/Card.scss:65`, `packages/core/src/components/Navbar/Navbar.scss:113`, `packages/core/src/components/Tooltip/Tooltip.scss:18` |
| `--color-surface-base` | `packages/core/src/components/DataTable/DataTable.scss:6`, `packages/core/src/components/DataTable/DataTable.scss:223` |
| `--radius-lg` | `packages/core/src/components/FileUpload/FileUpload.scss:13`, `packages/core/src/components/ImageViewer/ImageViewer.scss:67`, `packages/core/src/components/ImageViewer/ImageViewer.scss:145`, `packages/core/src/components/Input/Input.scss:391`, `packages/core/src/components/Textarea/Textarea.scss:236` |
| `--shadow-2xl` | `packages/core/src/components/ImageViewer/ImageViewer.scss:68` |
| `--line-height-tight` | `packages/core/src/components/Modal/Modal.scss:118`, `packages/core/src/components/Notification/Notification.scss:143` |
| `--slate-900` | `packages/core/src/components/Navbar/Navbar.scss:84`, `packages/core/src/components/Navbar/Navbar.scss:90`, `packages/core/src/components/Snackbar/Snackbar.scss:16` |
| `--line-height-normal` | `packages/core/src/components/Notification/Notification.scss:150` |
| `--ease-out-back` | `packages/core/src/components/Range/Range.scss:50` |
| `--slate-600` | `packages/core/src/components/Select/Select.scss:194`, `packages/core/src/components/Select/Select.scss:201` |
| `--font-weight-normal` | `packages/core/src/components/Sidebar/Sidebar.scss:359` |
| `--surface-hover` | `packages/core/src/components/TreeView/TreeView.scss:31`, `packages/core/src/components/TreeView/TreeView.scss:49` |
| `--color-surface-subtle` | `packages/core/src/components/Video/Video.scss:10` |
| `--color-green-500` | `packages/core/src/styles/global.scss:38` |
| `--color-amber-500` | `packages/core/src/styles/global.scss:39` |
| `--color-red-500` | `packages/core/src/styles/global.scss:40` |
| `--color-cyan-500` | `packages/core/src/styles/global.scss:41` |


#### Lifecycle coverage ledger (HIGH; §§2.3, 3.3)

Every one of the 16 files has a `destroy()` implementation. A method existing is not proof that every allocation is cleaned up or that callers can reach an auto-created instance. Notification/Snackbar are imperative managers, so lack of an HTML initialized flag there is expected. Existing `initLycoUI` checks document readiness correctly.

| Exact controller file | init / destroy lines | Audit result |
|---|---|
| `packages/core/src/components/Accordion/Accordion.vanilla.ts:1` | init 1; destroy 57, 184 | Parent/child teardown exists; initializer discards instance; replaced pseudo-root carries the guard. |
| `packages/core/src/components/Alert/Alert.vanilla.ts:1` | init 1; destroy 53 | Timer/button teardown exists; auto-created instance is not returned or registered. |
| `packages/core/src/components/Code/Code.vanilla.ts:1` | init 1; destroy 87 | Button/select/scroll cleanup exists; instance is private/unreachable after auto-init. |
| `packages/core/src/components/FileUpload/FileUpload.vanilla.ts:1` | init 1; destroy 126 | Five local listener types cleaned up; instance not retained by init. |
| `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts:1` | init 5; destroy 206 | Double construction; shared Modal guard prevents auto-init; local MutationObserver never disconnected. |
| `packages/core/src/components/Input/Input.vanilla.ts:1` | init 1; destroy 272 | Listener cleanup/restoration exists; no retained public instance; missing parity features. |
| `packages/core/src/components/Modal/Modal.vanilla.ts:1` | init 8; destroy 81 | Double construction; trigger click closure is outside destroy ownership; body lock is not reference-counted. |
| `packages/core/src/components/Navbar/Navbar.vanilla.ts:1` | init 1; destroy 87 | Stored click/document listeners cleaned up; no dropdown implementation. |
| `packages/core/src/components/Notification/Notification.vanilla.ts:1` | imperative; destroy 46 | Imperative manager destroy exists; programmatic close bypasses active lifecycle and schedules an untracked timer. |
| `packages/core/src/components/Pagination/Pagination.vanilla.ts:1` | init 3; destroy 47 | Per-render listeners and focus timeout have cleanup; root class/ARIA and custom-icon parity differ. |
| `packages/core/src/components/Range/Range.vanilla.ts:1` | init 1; destroy 95 | Listener/wrapper cleanup exists; removes wrong trigger classname on construction. |
| `packages/core/src/components/Select/Select.vanilla.ts:1` | init 1; destroy 250 | Local/global listeners and generated UI cleanup exist; missing floating/parity and native attribute restoration contract. |
| `packages/core/src/components/Sidebar/Sidebar.vanilla.ts:1` | init 3; destroy 134 | Stored listeners cleaned up; no automated backdrop trigger; instance inaccessible from public entry. |
| `packages/core/src/components/Snackbar/Snackbar.vanilla.ts:1` | imperative; destroy 44 | Imperative manager destroy exists; repeated scheduling/shared duration lifecycle needs consolidation. |
| `packages/core/src/components/Tabs/Tabs.vanilla.ts:1` | init 123; destroy 114 | Click/keyboard cleanup exists; initial selected state and hidden updates are incomplete. |
| `packages/core/src/components/Tooltip/Tooltip.vanilla.ts:1` | init 139; destroy 129 | Trigger/scroll/resize cleanup exists; shared initialized flag collision; restores neither prior aria-describedby nor generated ID. |

#### Declarative selector/data/event contract ledger (HIGH; §§2.2–2.4, 3.3, 5.3)

This records the actual selectors/configuration consumed by the 16 existing Vanilla files. An attribute shown in a snippet but absent from this ledger or a new implemented adapter has no effect merely because its name begins with `data-lyco-`. Native attributes such as disabled/required/min/max are additional browser/controller inputs. Normalize configuration naming deliberately during migration and document aliases; do not silently change authoring contracts.

| Exact source | Root/trigger auto-init selector(s) | Data inputs read / custom events emitted |
|---|---|---|
| `packages/core/src/components/Accordion/Accordion.vanilla.ts:1` | `.accordion-custom:not([data-lyco-initialized])` (2) | `data-allow-multiple` (19), `data-variant` (20), `data-flush` (21), `data-title` (78), `data-open` (79) |
| `packages/core/src/components/Alert/Alert.vanilla.ts:1` | `.alert:not([data-lyco-initialized])` (2) | `data-duration` (4), `data-duration` (30) |
| `packages/core/src/components/Code/Code.vanilla.ts:1` | `.code:not([data-lyco-initialized])` (2) | `data-language` (58) |
| `packages/core/src/components/FileUpload/FileUpload.vanilla.ts:1` | `label.fileupload:not([data-lyco-initialized])` (2) | `lyco:drop` (97) |
| `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts:1` | `.image-viewer:not([data-lyco-initialized])` (6) | `data-image-src` (133) |
| `packages/core/src/components/Input/Input.vanilla.ts:1` | `input.input-custom:not([data-lyco-initialized])` (2) | `data-validation` (45), `data-variant` (59), `data-size` (60), `data-label` (61), `data-flat` (62), `data-show-step-buttons` (63), `data-icon-start` (65), `data-icon-end` (66), `data-validation-message` (157), `data-validation-message` (240), `data-validation-fn` (252) |
| `packages/core/src/components/Modal/Modal.vanilla.ts:1` | `.modal:not([data-lyco-initialized])` (9); `[data-lyco-toggle="modal"]` (18) | `data-lyco-target` (24), `data-lyco-close-on-overlay-click` (149), `data-lyco-close-on-escape` (156) |
| `packages/core/src/components/Navbar/Navbar.vanilla.ts:1` | `.navbar:not([data-lyco-initialized])` (2) | No additional data configuration |
| `packages/core/src/components/Notification/Notification.vanilla.ts:1` | Imperative manager; no auto-init selector | No additional data configuration |
| `packages/core/src/components/Pagination/Pagination.vanilla.ts:1` | `.pagination-custom:not([data-lyco-initialized])` (4) | `data-variant` (31), `data-current-page` (32), `data-total-pages` (33), `data-sibling-count` (34), `pageChange` (60), `data-color-variant` (83), `data-size` (84) |
| `packages/core/src/components/Range/Range.vanilla.ts:1` | `input[type="range"].range-custom:not([data-lyco-initialized])` (2) | `data-variant` (29), `data-size` (30), `data-tooltip-size` (31), `data-filled` (32), `data-show-tooltip` (33), `data-tooltip-format` (83) |
| `packages/core/src/components/Select/Select.vanilla.ts:1` | `select.select-custom:not([data-lyco-initialized])` (2) | `data-searchable` (53), `data-allow-custom` (54), `data-validate-pattern` (56), `data-validate-message` (59), `data-variant` (93), `data-size` (94), `data-placeholder` (122), `data-variant` (185), `data-icon` (191), `data-native-index` (292), `data-native-index` (370), `data-native-index` (466), `data-icon` (474), `data-placeholder` (486) |
| `packages/core/src/components/Sidebar/Sidebar.vanilla.ts:1` | `.sidebar:not([data-lyco-initialized])` (4) | `data-mini-icon-scale` (42) |
| `packages/core/src/components/Snackbar/Snackbar.vanilla.ts:1` | Imperative manager; no auto-init selector | No additional data configuration |
| `packages/core/src/components/Tabs/Tabs.vanilla.ts:1` | `.tabs:not([data-lyco-initialized])` (124) | `data-lyco-tab-value` (36), `data-lyco-tab-value` (41), `data-lyco-tab-value` (51), `data-lyco-tab-value` (89), `data-lyco-tab-value` (101) |
| `packages/core/src/components/Tooltip/Tooltip.vanilla.ts:1` | `[data-lyco-tooltip]:not([data-lyco-initialized])` (140) | `data-lyco-tooltip` (15), `data-lyco-tooltip-position` (16) |

### MEDIUM

| ID | Exact evidence | Finding and effect | Violated rule | Execution |
|---|---|---|---|---|
| M01 | Oversize-file ledger below, particularly `packages/core/src/components/DataTable/DataTable.tsx:221`, `packages/core/src/components/Navbar/Navbar.tsx:221`, `packages/core/src/components/Select/Select.vanilla.ts:221` | Size/SRP screening flags every TS/TSX/SCSS file over approximately 220 physical lines. DataTable mixes data transformations, search/sort/page/selection/drag state and a large view; Navbar/Sidebar mix compound subcomponents, state, events and geometry; picker files repeat domain/popup/view responsibilities. See exact lengths below. | §3.1; §3.4 (numeric ceiling applies to component TSX/controller TS; SCSS is an audit/SRP screen) | 2.1–2.7, 3.9 |
| M02 | `packages/core/src/components/Accordion/Accordion.scss:134`; `packages/core/src/components/Navbar/Navbar.scss:241`; `packages/core/src/components/Sidebar/Sidebar.scss:338`; `packages/core/src/components/Alert/Alert.scss:109` | Collapse animations transition `grid-template-rows` and Alert progress animates `width`. These recalculate layout. Change progress to scaleX; implement collapse visibility with a shared measured/static-size strategy that animates only transform/opacity. | §4.5 | 1.4, 3.9 |
| M03 | `packages/core/src/components/Button/Button.scss:19`; `packages/core/src/components/Card/Card.scss:10`; `packages/core/src/components/Navbar/Navbar.scss:481`; `packages/core/src/components/Sidebar/Sidebar.scss:474`; `packages/core/src/components/Tabs/Tabs.scss:98`; `packages/core/src/components/Tooltip/Tooltip.scss:23`; `packages/core/src/components/DatePicker/DatePicker.scss:217`; `packages/core/src/components/Spinner/Spinner.scss:35` | Many transitions animate colors, borders, shadows or visibility, violating the stricter local transform/opacity-only rule even when they do not trigger layout. Tabs/Tooltip/DatePicker/Spinner animations omit explicit fill-mode; no reduced-motion handling was found. Separate instant state styles from compositor motion and define fill/timing deliberately. Lack of reduced-motion is an accessibility improvement, not an invented explicit AGENTS mandate. | §4.5; §7; §6 | 3.9 |
| M04 | Hardcoded-value ledger below; `packages/core/src/components/ContextMenu/ContextMenu.scss:3`; `packages/core/src/components/ImageViewer/ImageViewer.scss:70`, `:93`; `packages/core/src/components/Radio/Radio.scss:47`; `packages/core/src/utils/floating.ts:8`; `packages/core/src/components/Select/Select.tsx:96` | Raw dimensions, borders, colors, durations, offsets and z-index values are distributed across styles and JS. Examples: ContextMenu z-index 1000, ImageViewer rgba hover/0.1s, Radio 120ms, positioning gutter/gap 8, Select z-index 9999. Fallbacks may prevent breakage but do not satisfy the global-token rule. Token definitions themselves are allowed literal values. | §4.3; §3.3 | 1.4, 3.9 |
| M05 | `packages/core/src/components/Tooltip/Tooltip.tsx:67`, `:89`; `packages/core/src/components/Tooltip/Tooltip.vanilla.ts:85`, `:114`; `packages/core/src/components/Select/Select.tsx:104`; `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:172`; `packages/core/src/components/Sidebar/Sidebar.vanilla.ts:48`; `packages/core/src/components/Range/Range.tsx:88`; `packages/core/src/components/Carousel/Carousel.tsx:180` | Positioning recomputes synchronously on scroll/resize and pointer handlers read geometry/update state on every event. Tooltip clamps document-space X against viewport-space width, so horizontal scroll produces wrong clamping in both targets. Side flyouts reposition on hover/focus but not viewport/container changes while open. Use one frame-scheduled observer-backed updater. | §7; §3.3 | 1.4, 2.2, 3.3 |
| M06 | `packages/core/src/components/Tabs/Tabs.tsx:41`, `:65`; `packages/core/src/components/Code/Code.tsx:72`, `:118`; `packages/core/src/components/Button/Button.tsx:30`, `:85`; `packages/core/src/components/Card/Card.tsx:40`; `packages/core/src/components/Input/Input.tsx:249` | Tabs destructures `style` and drops it. Code accepts/documents `theme` but always highlights with `lyco-dark`. Button accepts `flat` but does not apply a flat class/style. Verify/resolve accepted-but-ignored behavior before publishing API tables. Do not silently delete props to make docs appear correct. | §3.1 SRP/readability; §5.3 source-of-truth parity | 2.4, 3.4, 4.1 |
| M07 | `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:40`; `packages/core/src/components/AlertDialog/AlertDialog.tsx:46`; `packages/core/src/components/TreeView/TreeView.tsx:138`; `packages/core/src/components/Tooltip/Tooltip.tsx:39`; `packages/core/src/components/ContextMenu/ContextMenuProvider.tsx:95` | Provider object/function literals cause context churn, callbacks are not consistently memoized, and several provider/root components lack displayName/forwardRef where the local standard demands it. A headless provider has no natural DOM ref: document that design decision rather than adding meaningless wrappers. Lint effect warnings require individual judgment; prop-to-state synchronization is not automatically a bug. | §3.2; §7 | 1.3, 2.1, 2.5, 4.5 |
| M08 | `packages/core/src/styles/tokens/_colors.scss:11`; `packages/core/src/styles/tokens/_shadows.scss:7`; `packages/core/src/components/Button/Button.scss:4`; `packages/core/src/styles/global.scss:233`; `README.md:20` | Palette source is serialized as hex and many state colors mix in sRGB; this alone cannot prove that the palette was not designed perceptually. No numerical contrast/perceptual parity evidence accompanies the blanket claims. Global headings also retain hardcoded sizing. Add measured visual/contrast checks and document actual guarantees; avoid changing the entire palette without regression evidence. | §§4.1–4.3; §6; §5.3 | 3.9, 4.4 |
| M09 | `.agents/skills/component-architect/SKILL.md:8`, `:36`, `:61`; `.agents/AGENTS.md:117` | Repository skill guidance still prescribes strict BEM and conflicts with current single-dash rules. AGENTS and the user take precedence. Update this supporting guidance during a later authorized documentation batch so future implementations do not reintroduce the naming debt. | §4.4; §8 maintain consistent agent guidance | 4.5 |

#### M01 — Complete oversize-file/SRP ledger (MEDIUM; §§3.1, 3.4)

Counts include blank lines/comments, exclude trailing empty lines, generated dist, node_modules and repository skill files. These are screening measurements, not a claim that a 225-line file contains 225 executable lines. Close-to-ceiling files need responsibility review; SCSS/global utility generation is not automatically a component-size violation.

| Exact threshold location | Physical LOC | Responsibility/decomposition target |
|---|---:|---|
| `packages/core/src/components/AlertDialog/AlertDialog.tsx:221` | 251 | focused state/controller helpers and compound/leaf views |
| `packages/core/src/components/Carousel/Carousel.tsx:221` | 270 | focused state/controller helpers and compound/leaf views |
| `packages/core/src/components/Code/Code.tsx:221` | 282 | highlighting adapter; editor synchronization; toolbar/view |
| `packages/core/src/components/DataTable/DataTable.scss:221` | 276 | surface/state/size/responsive or subcomponent style partials |
| `packages/core/src/components/DataTable/DataTable.tsx:221` | 734 | types; pure data transforms; selection/drag state; toolbar/header/body views |
| `packages/core/src/components/DatePicker/Calendar.tsx:221` | 270 | date/time domain models; shared popup/validation hooks; calendar/time views |
| `packages/core/src/components/DatePicker/DatePicker.scss:221` | 551 | date/time domain models; shared popup/validation hooks; calendar/time views |
| `packages/core/src/components/DatePicker/DatePicker.tsx:221` | 454 | date/time domain models; shared popup/validation hooks; calendar/time views |
| `packages/core/src/components/DatePicker/DateTimePicker.tsx:221` | 543 | date/time domain models; shared popup/validation hooks; calendar/time views |
| `packages/core/src/components/DatePicker/TimePicker.tsx:221` | 409 | date/time domain models; shared popup/validation hooks; calendar/time views |
| `packages/core/src/components/DropdownMenu/DropdownMenu.tsx:221` | 392 | focused state/controller helpers and compound/leaf views |
| `packages/core/src/components/ImageViewer/ImageViewer.tsx:221` | 225 | focused state/controller helpers and compound/leaf views |
| `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts:221` | 228 | focused state/controller helpers and compound/leaf views |
| `packages/core/src/components/Input/Input.scss:221` | 435 | field validation/state; icon/step/label/message views; size/validation styles |
| `packages/core/src/components/Input/Input.tsx:221` | 366 | field validation/state; icon/step/label/message views; size/validation styles |
| `packages/core/src/components/Input/Input.vanilla.ts:221` | 285 | field validation/state; icon/step/label/message views; size/validation styles |
| `packages/core/src/components/Modal/Modal.tsx:221` | 226 | focused state/controller helpers and compound/leaf views |
| `packages/core/src/components/Navbar/Navbar.scss:221` | 626 | layout/compound regions; Collapse/Menu adapters; responsive styles |
| `packages/core/src/components/Navbar/Navbar.tsx:221` | 457 | layout/compound regions; Collapse/Menu adapters; responsive styles |
| `packages/core/src/components/Notification/Notification.scss:221` | 267 | timed store; stack/pause policy; toast renderer/styles |
| `packages/core/src/components/Notification/Notification.vanilla.ts:221` | 256 | timed store; stack/pause policy; toast renderer/styles |
| `packages/core/src/components/Pagination/Pagination.tsx:221` | 287 | page-window model; compact edit state; renderer/controllers |
| `packages/core/src/components/Pagination/Pagination.vanilla.ts:221` | 302 | page-window model; compact edit state; renderer/controllers |
| `packages/core/src/components/Select/Select.scss:221` | 266 | combobox state/model; Popover adapter; option/trigger views; controller renderer |
| `packages/core/src/components/Select/Select.tsx:221` | 437 | combobox state/model; Popover adapter; option/trigger views; controller renderer |
| `packages/core/src/components/Select/Select.vanilla.ts:221` | 559 | combobox state/model; Popover adapter; option/trigger views; controller renderer |
| `packages/core/src/components/Sidebar/Sidebar.scss:221` | 571 | layout regions; resize hook; Collapse/Menu/Drawer adapters; mini-mode styles |
| `packages/core/src/components/Sidebar/Sidebar.tsx:221` | 432 | layout regions; resize hook; Collapse/Menu/Drawer adapters; mini-mode styles |
| `packages/core/src/components/Stepper/Stepper.scss:221` | 260 | surface/state/size/responsive or subcomponent style partials |
| `packages/core/src/components/Textarea/Textarea.scss:221` | 257 | field validation/state; icon/step/label/message views; size/validation styles |
| `packages/core/src/styles/global.scss:221` | 363 | token emission; base typography; element reset styles |
| `packages/core/src/styles/utilities.scss:221` | 513 | utility families/generators grouped by concern |
| `packages/docs/src/pages/components/DataTable/api.tsx:221` | 256 | prop tables/model tables/CSS-variable tables; retain api.tsx as facade |
| `packages/docs/src/pages/components/DateTimePicker/api.tsx:221` | 269 | prop tables/model tables/CSS-variable tables; retain api.tsx as facade |
| `packages/docs/src/pages/getting-started/Colors.tsx:221` | 241 | focused reference sections and data-driven tables |
| `packages/docs/src/pages/getting-started/Introduction.tsx:221` | 228 | focused reference sections and data-driven tables |
| `packages/docs/src/pages/getting-started/TypographyDoc.tsx:221` | 283 | focused reference sections and data-driven tables |

Total screened files above 220 physical LOC: **37**. These are all matches, not just the largest few.

#### M04 — Hardcoded dimensional/color/motion values (MEDIUM; §4.3)

This exhaustive unit/color candidate ledger lists lines with raw dimensional/time units or color literals outside the token-definition modules. Values inside `var()` fallbacks are included because local policy forbids them too; percentage/zero/unitless/semantic keyword candidates need the contract checker from Task 1.1 rather than indiscriminate replacement. Global root token literals are excluded, while global element styling is included. An unused fallback token (for example `--slate-800` behind the existing `--color-carbon`) is naming/token debt, not proof that the outer declaration fails.

| Exact SCSS file | Candidate line numbers |
|---|---|
| `packages/core/src/components/Accordion/Accordion.scss:11` | 11, 42, 59, 101, 110, 115, 116 |
| `packages/core/src/components/Alert/Alert.scss:15` | 15, 16, 29, 39, 40, 42, 68, 69, 73, 74, 89, 90, 91, 95, 96, 104 |
| `packages/core/src/components/Avatar/Avatar.scss:13` | 13, 17, 18, 19, 23, 24, 25, 29, 30, 31, 35, 36, 37 |
| `packages/core/src/components/Badge/Badge.scss:14` | 14, 19, 23, 35, 36, 37 |
| `packages/core/src/components/Breadcrumbs/Breadcrumbs.scss:34` | 34, 35, 59, 60 |
| `packages/core/src/components/Button/Button.scss:29` | 29, 38, 49, 76, 77, 81, 82, 86, 87, 91, 99, 100, 101, 102, 169, 176, 177 |
| `packages/core/src/components/Button/ButtonGroup.scss:24` | 24, 45 |
| `packages/core/src/components/Card/Card.scss:6` | 6, 20, 31, 42 |
| `packages/core/src/components/Carousel/Carousel.scss:59` | 59, 60, 63, 64, 100, 101, 112 |
| `packages/core/src/components/Checkbox/Checkbox.scss:30` | 30, 31, 35, 73, 94, 99, 104 |
| `packages/core/src/components/Code/Code.scss:12` | 12, 24, 50, 65, 69, 87, 88, 104, 105 |
| `packages/core/src/components/ContextMenu/ContextMenu.scss:5` | 5, 9, 58, 59, 77 |
| `packages/core/src/components/DataTable/DataTable.scss:3` | 3, 19, 30, 31, 96, 127, 128, 147, 148, 149, 169, 170, 171, 209, 222, 249 |
| `packages/core/src/components/DatePicker/DatePicker.scss:15` | 15, 24, 30, 31, 39, 45, 46, 74, 75, 92, 95, 115, 116, 131, 132, 167, 168, 176, 177, 186, 187, 192, 193, 209, 212, 219, 228, 230, 250, 263, 272, 276, 278, 286, 309, 316, 317, 328, 329, 338, 339, 352, 365, 366, 371, 379, 380, 397, 400, 401, 430, 434, 454, 475, 483, 492, 547 |
| `packages/core/src/components/Divider/Divider.scss:8` | 8, 50, 53, 69 |
| `packages/core/src/components/DropdownMenu/DropdownMenu.scss:13` | 13, 16, 34, 39, 47, 52, 84, 88, 94, 130, 131, 138, 141, 145, 152, 169 |
| `packages/core/src/components/FileUpload/FileUpload.scss:12` | 12, 30, 56, 57, 64, 65 |
| `packages/core/src/components/Grid/Grid.scss:5` | 5, 6 |
| `packages/core/src/components/ImageViewer/ImageViewer.scss:15` | 15, 19, 21, 63, 64, 66, 70, 80, 82, 83, 89, 93, 104, 106, 107, 113, 117, 146, 147, 148, 161, 162, 164 |
| `packages/core/src/components/Input/Input.scss:9` | 9, 21, 31, 34, 88, 210, 211, 232, 241, 251, 252, 265, 279, 333, 342, 362, 370, 373, 377, 380, 381, 387, 390, 394, 397, 398, 414, 433, 434 |
| `packages/core/src/components/Modal/Modal.scss:4` | 4, 8, 15, 31, 32, 35, 59, 63, 67, 71, 101, 113, 152 |
| `packages/core/src/components/Navbar/Navbar.scss:29` | 29, 37, 41, 45, 46, 47, 48, 52, 56, 57, 58, 59, 188, 189, 191, 193, 206, 207, 213, 215, 223, 231, 308, 309, 313, 314, 443, 444, 468, 480, 494, 500, 521, 538 |
| `packages/core/src/components/Notification/Notification.scss:11` | 11, 60, 61, 64, 65, 121, 122, 123, 160, 161, 175, 176, 180, 181, 193 |
| `packages/core/src/components/Pagination/Pagination.scss:11` | 11, 17, 23, 29, 86, 87, 110, 111, 130, 144, 147, 156 |
| `packages/core/src/components/ProgressBar/ProgressBar.scss:3` | 3, 8, 31, 36, 41 |
| `packages/core/src/components/Radio/Radio.scss:27` | 27, 28, 32, 43, 44, 47, 58, 79, 84, 89 |
| `packages/core/src/components/Range/Range.scss:9` | 9, 10, 16, 21, 23, 32, 33, 45, 46, 47, 76, 101, 110, 124, 128, 145, 146, 150, 151, 155, 156, 172, 173, 177, 182 |
| `packages/core/src/components/Select/Select.scss:28` | 28, 39, 46, 58, 67, 82, 85, 99, 114, 157, 158, 176, 183, 197, 234, 263 |
| `packages/core/src/components/Sidebar/Sidebar.scss:5` | 5, 6, 17, 20, 66, 88, 89, 104, 105, 120, 123, 139, 150, 151, 205, 206, 226, 227, 305, 306, 346, 430, 432, 466, 473 |
| `packages/core/src/components/Snackbar/Snackbar.scss:29` | 29, 30, 35, 36, 52, 67, 68, 86, 91, 92, 108, 109, 113, 114, 121, 136 |
| `packages/core/src/components/Spinner/Spinner.scss:7` | 7, 8, 17, 18, 19, 23, 24, 25, 32, 35, 41 |
| `packages/core/src/components/Stepper/Stepper.scss:69` | 69, 70, 71, 72, 77, 78, 79, 80, 86, 87, 88, 89, 95, 96, 97, 200, 201, 203, 211, 212, 217, 218, 219, 222, 223, 258 |
| `packages/core/src/components/Switch/Switch.scss:13` | 13, 14, 15, 16, 38, 69, 91, 92, 93, 94, 99, 100, 101, 102, 107, 108, 109, 110 |
| `packages/core/src/components/Table/Table.scss:21` | 21, 36, 38, 63, 117 |
| `packages/core/src/components/Tabs/Tabs.scss:11` | 11, 63, 64, 108 |
| `packages/core/src/components/Textarea/Textarea.scss:9` | 9, 21, 31, 145, 187, 196, 216, 224, 232 |
| `packages/core/src/components/Timeline/Timeline.scss:55` | 55, 56, 57, 58, 74, 75, 77, 93, 113, 132, 141, 142, 144, 151, 152 |
| `packages/core/src/components/Tooltip/Tooltip.scss:16` | 16 |
| `packages/core/src/components/TreeView/TreeView.scss:29` | 29, 30, 41, 66, 67, 72, 73 |
| `packages/core/src/styles/global.scss:233` | 233, 235, 241, 243, 249, 251, 257, 265, 319, 353 |
| `packages/core/src/styles/utilities.scss:65` | 65, 66, 68, 146, 147, 150, 151 |

#### Target coverage disposition

| Interaction surface | Current React composition | Current Vanilla disposition | Required boundary |
|---|---|---|---|
| Navbar collapse/dropdown/submenu | Three local implementations | Collapse only | Collapse + Menu adapters |
| Sidebar accordion/flyout/overlay | Local state and copied surfaces; shared side-geometry helper | Local dropdown/resize; no automatic overlay triggers | Collapse + Menu + Drawer adapters |
| DropdownMenu/ContextMenu | Separate engines and submenu strategies | No controllers | One Menu core; button and pointer anchors |
| DatePicker/TimePicker/DateTimePicker | Three popup engines; shared Calendar/TimeInput views | Native-looking snippet fallbacks, no custom controller | Popover + date/time domain engines |
| Select | Local combobox + portal positioning | Native-to-custom controller with inline list | Combobox + Popover + list navigation |
| Accordion/TreeView | Local expansion; separate tree keyboard logic | Accordion only | Collapse; tree-specific navigation adapter |
| Range/Tooltip | Separate tooltip surfaces/math | Both controllers, modes differ | Tooltip surface + virtual-thumb positioning |
| Modal/AlertDialog/ImageViewer | AlertDialog/ImageViewer correctly consume Modal | Modal + separate gallery, shared guard collision | Modal/Drawer core; gallery behavior composes it |
| DataTable | Correctly consumes Select/Pagination/Checkbox; domain logic is monolithic | No interactive table controller | Shared data model, separate view/controller adapters |
| Carousel | Scroll/resize model and controls in one component | No controls/controller | Shared carousel model + adapters |
| Input/Textarea/FileUpload | Native inputs enhanced with validation/drag state | Input/FileUpload only | Shared field model + Textarea controller |
| Alert/Snackbar/Notification | Timed lifecycle implemented separately | Three separately timed implementations | Timed-dismiss core + distinct surfaces |
| Static components (Card, Grid, Badge, etc.) | Render-only except optional native interactions | Classes/native HTML sufficient | No controller required merely for static rendering |

## Section B — Phased Execution Checklist

### Global constraints and execution contract

- This turn is audit-only: **do not execute the checklist or modify source code**. Preserve the existing `SidebarDoc.tsx` edit. No commit, publication, deployment, or dependency installation was performed for this audit.
- Apply `.agents/AGENTS.md` §§2–8: strict typing, zero explicit `any`, and the 220-line component/controller ceiling. Split SCSS by visual responsibility, not merely to hide line counts.
- One engine per interaction, with thin React/Vanilla adapters. Shared primitives include state, DOM/ARIA, keyboard behavior, lifecycle and SCSS; sharing only geometry is insufficient.
- Authoring/generated classes use single dashes; states use `is-*`. **CSS custom properties keep `--`**. Prop names are not CSS classes and must not be mechanically rewritten.
- Extract behavior before renaming APIs. Primitive disclosure APIs use `open/defaultOpen/onOpenChange`; retain deprecated `isOpen/onClose` adapters where already public. Preserve domain APIs such as Tabs `value` and Accordion `activeKeys`. Public class/API removals need an explicit versioned migration policy; temporary aliases must not appear in new examples.
- Canonical floating surfaces portal to body while open and detach while closed; visible options derive from one model. Dialogs use the same `<dialog>`/inner wrapper tree in both targets, remain mounted while their owner exists, and open/close through a common modal engine. Native dialog behavior and custom layer ownership must be tested together. Document the observable change from current React closed-state unmounting.
- All tests/checker commands below are **future deliverables**, not claimed to exist/pass today. Task 1.1 creates the scripts before later tasks use them. For each defect: add its failing regression, run and confirm that failure, implement, rerun green. No final known-failure suppressions.
- Commit cohesive batches after targeted tests/typechecks pass. Run full checks at logical batch boundaries; do not repeatedly rerun clean builds without a new reason. Do not publish as part of this plan.

### Review focus: five failure classes with explicit regression coverage

1. **Multiple behaviors on one root / repeated mount:** `.modal.image-viewer`, tooltip on an enhanced input, init/destroy/reinit must attach once and release every listener/observer/timer (Tasks 1.2, 1.5, 3.2).
2. **Nested layers / portals:** submenu clicks stay inside their logical parent; Escape closes only the top layer; one dialog closing preserves another's lock/focus (Tasks 1.3, 1.5, 2.1, 3.2).
3. **Keyboard / empty and disabled content:** one entry tab stop; no hidden/disabled targets; Home/End/Enter/Space/Escape; empty-dialog containment; focus does not remain in collapsed content (Tasks 1.3–1.5, 3.1, 3.5).
4. **Geometry under horizontal/nested scroll, RTL and narrow viewports:** flips/clamping work, oversized surfaces remain usable, all updates share a scheduled measurement cycle (Tasks 1.4, 2.2–2.3, 3.1, 3.3).
5. **Consumer environments / published examples:** plain HTML without React/import maps, React without optional Shiki, exact CSS/JS filenames, every variant and destruction during pending work (Tasks 2.7, 3.8, 4.2–4.5).

### Batch 1: Shared Hooks, Vanilla Base Utilities & Atomic Primitives extraction

- [x] Task 1.1 — Establish deterministic contract and browser verification

  **Targets:** modify `package.json`, `package-lock.json`; create `vitest.config.ts`, `playwright.config.ts`, `scripts/audit-contracts.mjs`, `tests/unit/harness.test.ts`, `tests/fixtures/index.html`, `tests/fixtures/main.tsx`, `tests/fixtures/vite.config.ts`, `tests/helpers/normalize-dom.ts`, `tests/helpers/lifecycle-probe.ts`, `tests/parity/harness.spec.ts`.

  **Deliver:** scripts `test:unit = vitest run`, `test:parity = playwright test`, `audit:contracts = node scripts/audit-contracts.mjs`. Add explicit dev dependencies for Vitest/jsdom/Playwright, Sass, an AST parser with a supported compiler API, and a CSS parser. Keep declared React/Node requirements. Do not silently downgrade the workspace to resolve docs TS5102. Fixture server uses `127.0.0.1:4174`, strict port, Playwright-managed startup and deterministic local assets; install browser binaries once during execution.

  **Checker interface:** `--check` accepts comma-separated `exports,props,examples,classes,tokens,motion,loc,dependencies,guidance`; optional `--components` filters component directory names. `--report-only` inventories and exits 0; normal mode exits 1 for findings. Resolve export symbols and explicit API-array/interface mappings; inspect compiled CSS selectors/tokens as well as source. Report physical line counts separately from code/SRP. Exempt token definitions and user-data-derived geometry, not arbitrary component constants.

  **Regression contract:** DOM normalization removes only generated ID spelling and initialization bookkeeping; preserve tags/classes, roles/states, ID relationships, portal ownership, hidden/disabled state and event outcomes. Probe listeners on root/document/window, observers, timers and animation frames; matching add/remove counts alone is insufficient.

  **Steps:** write smoke fixtures that render real React and execute the real Vanilla entry; prove the normalizer catches a deliberate tag/ARIA mismatch; implement the harness; capture the current red baseline without declaring compliance.

  **Verify:** `npm run test:unit -- tests/unit/harness.test.ts`; `npm run test:parity -- tests/parity/harness.spec.ts --project=chromium` both exit 0. `npm run audit:contracts -- --check exports,props,examples,classes,tokens,motion,loc,dependencies --report-only` reproduces baseline findings.

- [x] Task 1.2 — Give Vanilla instances one owner and isolate framework-free assets

  **Targets:** create `packages/core/src/vanilla/BaseController.ts`, `packages/core/src/vanilla/controller-registry.ts`, `packages/core/src/vanilla/init.ts`, `packages/core/src/utils/icons.ts`, `packages/core/src/utils/safe-content.ts`, `tests/unit/vanilla-lifecycle.test.ts`, `tests/unit/safe-content.test.ts`, `tests/parity/lifecycle.spec.ts`; modify `packages/core/src/vanilla.ts`, `packages/core/src/components/Modal/Modal.vanilla.ts`, `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts`, `packages/core/src/components/Notification/Notification.tsx`, `packages/core/src/components/Notification/Notification.vanilla.ts`, `packages/core/src/components/Input/Input.vanilla.ts`, `packages/core/src/components/Select/Select.vanilla.ts`, `packages/core/src/components/Snackbar/Snackbar.vanilla.ts`.

  **Interfaces:** `Controller { destroy(): void }`; BaseController supplies `listen(target: EventTarget, type: string, listener: EventListener, options?: AddEventListenerOptions | boolean): void`, `addCleanup(cleanup: () => void): void`, idempotent `destroy(): void`. Registry exposes `get(element: HTMLElement, key: string): Controller | undefined`, `register(element: HTMLElement, key: string, controller: Controller): void`, `destroy(root: ParentNode): void`. Public entry exposes `initLycoUI(root: ParentNode = document): void`, `destroyLycoUI(root: ParentNode = document): void`. Feature keys distinguish modal/gallery/tooltip; `data-lyco-initialized` becomes a compatibility marker, not the sole cross-feature guard. Register rendered roots and original transformed pseudo-elements.

  **Deliver:** one instance per element/feature, owned trigger listeners, retained/disconnected gallery observer, React-free icon constants. One allowlisted SVG parser validates every descendant tag/attribute/reference. Tooltip uses text by default; rich content has one explicit safe-content mode and a documented migration for existing rich hints.

  **Red → green assertions:** init twice invokes one handler; modal+gallery+tooltip coexist; destroy during queued focus/observer work releases all allocations; reinit works once; descendant SVG handlers/unsafe references and rich-HTML event attributes never execute.

  **Verify:** `npm run test:unit -- tests/unit/vanilla-lifecycle.test.ts tests/unit/safe-content.test.ts`; `npm run test:parity -- tests/parity/lifecycle.spec.ts --project=chromium`. All pass with zero retained allocations. Covers C01/C13, H13/H15/H16/H20.

- [x] Task 1.3 — Extract controlled state, dismissal and navigation into Menu/Popover

  **Targets:** modify `packages/core/src/hooks/useKeyboardNav.ts`, `packages/core/src/utils/keyboard.ts`, `packages/core/src/components/DropdownMenu/DropdownMenu.tsx`, `packages/core/src/components/DropdownMenu/DropdownMenuContext.tsx`; create `packages/core/src/interaction/controllable-state.ts`, `packages/core/src/interaction/dismissable-layer.ts`, `packages/core/src/interaction/navigation.ts`, `packages/core/src/hooks/useControllableState.ts`, `packages/core/src/hooks/useClickOutside.ts`, `packages/core/src/hooks/useEscapeKey.ts`, `packages/core/src/hooks/useRovingTabIndex.ts`, `packages/core/src/primitives/Menu/Menu.tsx`, `packages/core/src/primitives/Menu/MenuController.ts`, `packages/core/src/primitives/Popover/Popover.tsx`, `packages/core/src/primitives/Popover/PopoverController.ts`, `packages/core/src/styles/primitives/_menu.scss`, `tests/unit/interaction.test.tsx`, `tests/parity/menu.spec.ts`.

  **Interfaces:** `useControllableState<T>({value, defaultValue, onChange}): readonly [T, (next: T | ((previous: T) => T)) => void]`; `useClickOutside({enabled, refs, onOutside})`, `useEscapeKey({enabled, onEscape})` adapt the shared logical layer registry. Navigation accepts key, current index, enabled/visible indices, orientation/direction and loop, returning next index/action. Primitive disclosure props are `open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void`. MenuController has `open()`, `close()`, `destroy()` and composes BaseController. Popover shares disclosure/ownership without imposing menu roles.

  **Deliver:** Arrow/Home/End, roving tabindex, disabled/nested filtering, Enter/Space, top-layer Escape/return focus, registered child portals and keyboard/focus submenu opening. Preserve Select's listbox roles and ContextMenu's pointer anchor. Split DropdownMenu subcomponents below 220 lines; adapters must not add independent menu state machines.

  **Red → green assertions:** controlled/uncontrolled callback counts and value updates; nested portal clicks; disabled/hidden skips; keyboard opening/ArrowLeft restores focus; safe empty menu. Tests verify both adapters against identical actions.

  **Verify:** `npm run test:unit -- tests/unit/interaction.test.tsx`; `npm run test:parity -- tests/parity/menu.spec.ts --project=chromium`. Covers H02/H06/H07/H10–H12/H18 and C12's menu foundation.

- [x] Task 1.4 — Extract floating geometry, Collapse and Tooltip surfaces

  **Targets:** modify `packages/core/src/utils/floating.ts`; create `packages/core/src/interaction/floating-position.ts`, `packages/core/src/interaction/visibility.ts`, `packages/core/src/hooks/useFloatingPosition.ts`, `packages/core/src/primitives/Collapse/Collapse.tsx`, `packages/core/src/primitives/Collapse/CollapseController.ts`, `packages/core/src/primitives/Tooltip/TooltipSurface.tsx`, `packages/core/src/primitives/Tooltip/TooltipController.ts`, `packages/core/src/styles/primitives/_floating.scss`, `packages/core/src/styles/primitives/_collapse.scss`, `packages/core/src/styles/primitives/_tooltip.scss`, `tests/unit/floating.test.ts`, `tests/parity/floating.spec.ts`, `tests/parity/collapse.spec.ts`.

  **Interfaces:** `Rect { top: number; left: number; width: number; height: number }`; pure `computeFloatingPosition({anchor, surface, viewport, placement, gap, gutter, direction}): {top: number; left: number; placement: string; maxWidth: number; maxHeight: number}` uses one coordinate space. DOM updater accepts an HTMLElement or virtual rectangle, batches reads, schedules at most once/frame, owns observer/scroll/resize cleanup. `useFloatingPosition(options)` and Vanilla call that core. Collapse uses shared disclosure props, stable trigger/panel IDs and hidden/inert/aria-expanded state.

  **Deliver:** edge/oversize/narrow/RTL/scrolled placement; token-backed gap/gutter/layer values. Existing side-flyout helper becomes an adapter. Tooltip surface has one accessible trigger owner, Escape dismissal and hover persistence. Collapse removes closed content from focus and changes layout discretely while animating only transform/opacity.

  **Red → green assertions:** edge and horizontal/nested-scroll geometry; no interleaved reads/writes; observer cleanup; collapsing focused descendants returns focus; slider virtual-thumb tooltip alignment.

  **Verify:** `npm run test:unit -- tests/unit/floating.test.ts`; `npm run test:parity -- tests/parity/floating.spec.ts tests/parity/collapse.spec.ts --project=chromium`. Covers H05/H08/H09, M02/M04/M05.

- [ ] Task 1.5 — Extract one Modal/Drawer focus and layer engine

  **Targets:** modify `packages/core/src/components/Modal/Modal.tsx`, `packages/core/src/components/Modal/Modal.vanilla.ts`, `packages/core/src/utils/keyboard.ts`; create `packages/core/src/interaction/modal-layer.ts`, `packages/core/src/interaction/focus-scope.ts`, `packages/core/src/hooks/useFocusTrap.ts`, `packages/core/src/primitives/Drawer/Drawer.tsx`, `packages/core/src/primitives/Drawer/DrawerController.ts`, `packages/core/src/styles/primitives/_overlay.scss`, `tests/unit/modal-layer.test.ts`, `tests/parity/overlay.spec.ts`.

  **Interfaces:** modal engine `open({root: HTMLDialogElement, initialFocus?: HTMLElement, returnFocus?: HTMLElement}): () => void` returns idempotent close/dispose. Focus scope discovers visible/enabled native controls of all input types and handles empty surfaces. Scroll lock is document-scoped/reference-counted. `useFocusTrap` adapts the same core. Drawer shares the layer engine/disclosure API, with placement as layout configuration.

  **Deliver:** canonical dialog tree, accessible title/description IDs and typed aria-label support; coordinate native cancel/backdrop and top-layer dismissal; cancel initial-focus work; restore focus on close/unmount; retain locks belonging to other dialogs. Keep AlertDialog/ImageViewer composed from Modal.

  **Red → green assertions:** stacked dialogs, child popup, empty dialog, hidden/disabled/email/number controls, unmount before initial focus, removed trigger, repeated destroy. Native dialog and custom registry must not both dismiss a layer.

  **Verify:** `npm run test:unit -- tests/unit/modal-layer.test.ts`; `npm run test:parity -- tests/parity/overlay.spec.ts --project=chromium`. Covers C03, H04/H10/H15/H17/H19.

### Batch 2: Refactoring Composite Components + Monolith decomposition

- [ ] Task 2.1 — Move Navbar and menu consumers onto shared engines

  **Targets:** modify `packages/core/src/components/Navbar/Navbar.tsx`, `packages/core/src/components/Navbar/Navbar.vanilla.ts`, `packages/core/src/components/Navbar/Navbar.scss`, `packages/core/src/components/ContextMenu/ContextMenu.tsx`, `packages/core/src/components/ContextMenu/ContextMenuItem.tsx`, `packages/core/src/components/ContextMenu/ContextMenuProvider.tsx`, `packages/core/src/components/DropdownMenu/DropdownMenu.tsx`; create `packages/core/src/components/Navbar/NavbarContext.tsx`, `packages/core/src/components/Navbar/NavbarRegions.tsx`, `packages/core/src/components/Navbar/NavbarDropdown.tsx`, `packages/core/src/components/Navbar/Navbar.types.ts`, `packages/core/src/components/Navbar/_layout.scss`, `packages/core/src/components/Navbar/_menu.scss`, `packages/core/src/components/DropdownMenu/DropdownMenu.vanilla.ts`, `packages/core/src/components/ContextMenu/ContextMenu.vanilla.ts`, `tests/parity/navigation.spec.ts`, `tests/unit/navbar-types.test.tsx`.

  **Deliver:** Navbar.Toggle/Collapse compose Collapse; dropdown/submenu compose Menu and delegate to MenuController in Vanilla. ContextMenu uses the pointer-anchor adapter. Preserve Navbar's compound API, replace eleven `any` occurrences with existing polymorphic types, and use stable IDs. Extract DropdownMenu's focused subcomponent files. Memoize actual provider boundaries without introducing arbitrary wrapper DOM.

  **Red → green assertions:** mobile/desktop collapse with nested menus; typed `as` links/refs and canceled clicks; keyboard pointer menus; return focus; identical standalone/Navbar/Sidebar menu actions. Native links remain links, actions buttons.

  **Verify:** `npm run test:unit -- tests/unit/navbar-types.test.tsx tests/unit/interaction.test.tsx`; `npm run test:parity -- tests/parity/navigation.spec.ts tests/parity/menu.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components Navbar,DropdownMenu,ContextMenu`; `npm run lint -w @loreschaeffer/lyco-ui`. No explicit-any errors; warnings remain individually triaged. Covers C12, H01/H02/H07/H18/H22, M01/M07.

- [ ] Task 2.2 — Compose Sidebar from Collapse, Menu and Drawer; isolate resizing

  **Targets:** modify `packages/core/src/components/Sidebar/Sidebar.tsx`, `packages/core/src/components/Sidebar/Sidebar.vanilla.ts`, `packages/core/src/components/Sidebar/Sidebar.scss`; create `packages/core/src/components/Sidebar/SidebarContext.tsx`, `packages/core/src/components/Sidebar/SidebarRegions.tsx`, `packages/core/src/components/Sidebar/SidebarDropdown.tsx`, `packages/core/src/components/Sidebar/SidebarLink.tsx`, `packages/core/src/components/Sidebar/useSidebarResize.ts`, `packages/core/src/components/Sidebar/SidebarResizeController.ts`, `packages/core/src/components/Sidebar/_layout.scss`, `packages/core/src/components/Sidebar/_mini.scss`, `tests/parity/sidebar.spec.ts`.

  **Deliver:** one dropdown adapter selects Collapse versus side Menu; mini-mode visuals and aria-expanded share state. Overlay uses Drawer. Bind `data-lyco-toggle="sidebar"`, `data-lyco-target` and dismiss through registry ownership. Resize defaults/bounds match React's 256/200/400 unless data overrides are supplied. Handle pointer cancel/unmount and keyboard separator resizing with bounded ARIA values.

  **Red → green assertions:** mini hover/focus/Escape, overlay backdrop/containment, multiple sidebars, both resize limits, unmount mid-drag, viewport changes while flyout is open, authored-state restoration on destroy.

  **Verify:** `npm run test:parity -- tests/parity/sidebar.spec.ts tests/parity/overlay.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components Sidebar`. Covers C10, H03/H04/H17/H18, M01/M05.

- [ ] Task 2.3 — Separate picker domains from popup and validation behavior

  **Targets:** modify `packages/core/src/components/DatePicker/DatePicker.tsx`, `packages/core/src/components/DatePicker/TimePicker.tsx`, `packages/core/src/components/DatePicker/DateTimePicker.tsx`, `packages/core/src/components/DatePicker/Calendar.tsx`, `packages/core/src/components/DatePicker/TimeInput.tsx`, `packages/core/src/components/DatePicker/DatePicker.scss`; create `packages/core/src/components/DatePicker/date-model.ts`, `packages/core/src/components/DatePicker/time-model.ts`, `packages/core/src/components/DatePicker/usePickerField.ts`, `packages/core/src/components/DatePicker/PickerPopover.tsx`, `packages/core/src/components/DatePicker/PickerTrigger.tsx`, `packages/core/src/components/DatePicker/CalendarGrid.tsx`, `packages/core/src/components/DatePicker/_field.scss`, `packages/core/src/components/DatePicker/_calendar.scss`, `packages/core/src/components/DatePicker/_time.scss`, `tests/unit/picker-model.test.ts`, `tests/parity/picker-react.spec.ts`.

  **Deliver:** pure parsing/format/limits, one validation hook/Popover wrapper, focused trigger/calendar/time views; same locale/use12Hour/value behavior. Date arithmetic stays outside generic primitives. Escape inside calendar/time controls dismisses/returns focus. Preserve native mobile mode intentionally in both targets.

  **Red → green assertions:** null/invalid input, leap day, min/max, local midnight without UTC day shifts, noon/midnight in 12-hour mode, external controlled changes, popup keyboard and mobile/desktop routing.

  **Verify:** `npm run test:unit -- tests/unit/picker-model.test.ts`; `npm run test:parity -- tests/parity/picker-react.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components DatePicker`. Covers H05/H12/H19, M01; paired Vanilla completion is Task 3.11.

- [ ] Task 2.4 — Extract the DataTable model and focused views

  **Targets:** modify `packages/core/src/components/DataTable/DataTable.tsx`, `packages/core/src/components/DataTable/DataTable.scss`, `packages/core/src/components/DataTable/index.ts`; create `packages/core/src/components/DataTable/DataTable.types.ts`, `packages/core/src/components/DataTable/data-model.ts`, `packages/core/src/components/DataTable/useDataTableState.ts`, `packages/core/src/components/DataTable/useRowSelection.ts`, `packages/core/src/components/DataTable/useRowReorder.ts`, `packages/core/src/components/DataTable/DataTableToolbar.tsx`, `packages/core/src/components/DataTable/DataTableHead.tsx`, `packages/core/src/components/DataTable/DataTableBody.tsx`, `packages/core/src/components/DataTable/_toolbar.scss`, `packages/core/src/components/DataTable/_rows.scss`, `tests/unit/data-table-model.test.ts`, `tests/parity/data-table-react.spec.ts`.

  **Interface:** pure `deriveRows<T>(rows, columns, {query, sortColumn, sortDirection, page, pageSize})` returns filtered/sorted/page rows, count and clamped page. Re-export existing generic column/props/ref types from the facade. Preserve native tables and Select/Pagination/Checkbox composition.

  **Red → green assertions:** stable sorting, empty/loading, page clamp after filtering, identity-preserving controlled/default selection, reorder while filtered/sorted. Keyboard reorder controls invoke the same command model as drag/drop.

  **Verify:** `npm run test:unit -- tests/unit/data-table-model.test.ts`; `npm run test:parity -- tests/parity/data-table-react.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components DataTable`. Covers C12's model gap, M01; Vanilla follows in Task 3.12.

- [ ] Task 2.5 — Unify timed lifecycle while preserving distinct alert/toast surfaces

  **Targets:** modify `packages/core/src/components/Alert/Alert.tsx`, `packages/core/src/components/Alert/Alert.vanilla.ts`, `packages/core/src/components/Snackbar/SnackbarProvider.tsx`, `packages/core/src/components/Snackbar/Snackbar.vanilla.ts`, `packages/core/src/components/Notification/NotificationProvider.tsx`, `packages/core/src/components/Notification/Notification.vanilla.ts`, `packages/core/src/components/Notification/Notification.scss`; create `packages/core/src/interaction/timed-dismiss.ts`, `packages/core/src/components/Notification/notification-store.ts`, `packages/core/src/components/Notification/NotificationRenderer.ts`, `packages/core/src/components/Notification/_stack.scss`, `packages/core/src/components/Notification/_toast.scss`, `tests/unit/timed-dismiss.test.ts`, `tests/parity/toast.spec.ts`.

  **Interface:** timed-dismiss accepts milliseconds internally and exposes `close`, `pause`, `resume`, `destroy`; adapters retain seconds/duration aliases. Define numeric zero as immediate dismissal rather than accidental `'short'` coercion; persistent mode would need an explicit API. Close/destroy clear duration/exit timers/listeners once. Position/max-eviction policies match across targets.

  **Red → green assertions:** fake-clock pause/resume, zero/short/custom durations, repeated close, max eviction, close while hovered, destroy before exit, provider unmount. Implement React hover pause promised by docs.

  **Verify:** `npm run test:unit -- tests/unit/timed-dismiss.test.ts`; `npm run test:parity -- tests/parity/toast.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components Notification,Snackbar,Alert`. Covers C11, H14/H20, M01/M07.

- [ ] Task 2.6 — Split field state/validation and input views

  **Targets:** modify `packages/core/src/components/Input/Input.tsx`, `packages/core/src/components/Input/Input.vanilla.ts`, `packages/core/src/components/Input/Input.scss`, `packages/core/src/components/Textarea/Textarea.tsx`, `packages/core/src/components/Textarea/Textarea.scss`; create `packages/core/src/interaction/field-validation.ts`, `packages/core/src/hooks/useFieldValidation.ts`, `packages/core/src/components/Input/Input.types.ts`, `packages/core/src/components/Input/useInputState.ts`, `packages/core/src/components/Input/InputAdornment.tsx`, `packages/core/src/components/Input/InputStepButtons.tsx`, `packages/core/src/components/Input/FieldLabel.tsx`, `packages/core/src/components/Input/FieldMessage.tsx`, `packages/core/src/components/Input/InputRenderer.ts`, `packages/core/src/components/Input/_field.scss`, `packages/core/src/components/Input/_validation.scss`, `packages/core/src/components/Textarea/_field.scss`, `packages/core/src/components/Textarea/_validation.scss`, `tests/unit/field-validation.test.ts`.

  **Deliver:** shared pure validation model plus adapters; preserve native value/defaultValue/form submission/callbacks. Split actual Vanilla rendering, not just React JSX. Do not emit empty live regions. Action controls remain keyboard reachable. State changes and visual styling are separate responsibilities.

  **Red → green assertions:** external values, blur/input timing, invalid-to-valid, required label/description association, numeric bounds/readOnly, loading/action icons, textarea native props.

  **Verify:** `npm run test:unit -- tests/unit/field-validation.test.ts`; `npm run audit:contracts -- --check loc --components Input,Textarea`; core typecheck from the baseline. Covers C05, H12, M01; parity finishes in Task 3.4.

- [ ] Task 2.7 — Isolate Code/editor behavior; make Shiki genuinely optional

  **Targets:** modify `packages/core/src/components/Code/Code.tsx`, `packages/core/src/components/Code/Code.vanilla.ts`, `packages/core/src/utils/shiki.config.ts`, `packages/core/vite.config.ts`; create `packages/core/src/components/Code/useCodeHighlight.ts`, `packages/core/src/components/Code/highlighter.ts`, `packages/core/src/components/Code/CodeToolbar.tsx`, `packages/core/src/components/Code/CodeEditor.tsx`, `tests/unit/code-highlight.test.ts`, `tests/parity/code-react.spec.ts`.

  **Deliver:** demand-loaded optional highlighter; importing unrelated components requires no Shiki. Keep toolbar Select composition. Load/honor the selected `theme`; distinguish it from the library CSS theme. Unsupported language/theme safely falls back to plain text. Own pending copy/highlight work and cleanup.

  **Red → green assertions:** import Button without Shiki; controlled/uncontrolled editing; language/theme changes output; no post-unmount mutation; copy/download uses current content/filename.

  **Verify:** `npm run test:unit -- tests/unit/code-highlight.test.ts`; `npm run test:parity -- tests/parity/code-react.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc,dependencies --components Code`. Covers C09, H21, M01/M06; Vanilla completion is Task 3.6.

- [ ] Task 2.8 — Split Carousel model, observers and controls

  **Targets:** modify `packages/core/src/components/Carousel/Carousel.tsx`; create `packages/core/src/components/Carousel/carousel-model.ts`, `packages/core/src/components/Carousel/useCarouselScroll.ts`, `packages/core/src/components/Carousel/CarouselControls.tsx`, `tests/unit/carousel-model.test.ts`, `tests/parity/carousel-react.spec.ts`.

  **Deliver:** pure index/wrap model, frame-scheduled observer/scroll adapter, focused arrow/dot views. Inert infinite clones must not duplicate accessible/focusable content.

  **Red → green assertions:** zero/one/many slides, infinite wraps, visible-count resize, reduced-motion scroll, keyboard controls, no retained observers/listeners on unmount.

  **Verify:** `npm run test:unit -- tests/unit/carousel-model.test.ts`; `npm run test:parity -- tests/parity/carousel-react.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components Carousel`. Covers C12, M01/M05; Vanilla is Task 3.13.

- [ ] Task 2.9 — Decompose remaining overlay/gallery/pagination monoliths

  **Targets:** modify `packages/core/src/components/AlertDialog/AlertDialog.tsx`, `packages/core/src/components/Modal/Modal.tsx`, `packages/core/src/components/ImageViewer/ImageViewer.tsx`, `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts`, `packages/core/src/components/Pagination/Pagination.tsx`, `packages/core/src/components/Pagination/Pagination.vanilla.ts`; create `packages/core/src/components/AlertDialog/AlertDialogContext.tsx`, `packages/core/src/components/AlertDialog/AlertDialogActions.tsx`, `packages/core/src/components/Modal/ModalRegions.tsx`, `packages/core/src/components/ImageViewer/gallery-model.ts`, `packages/core/src/components/ImageViewer/useImageTransform.ts`, `packages/core/src/components/ImageViewer/ImageViewerControls.tsx`, `packages/core/src/components/ImageViewer/ImageViewerRenderer.ts`, `packages/core/src/components/Pagination/pagination-model.ts`, `packages/core/src/components/Pagination/usePageEditor.ts`, `packages/core/src/components/Pagination/PaginationStandard.tsx`, `packages/core/src/components/Pagination/PaginationCompact.tsx`, `packages/core/src/components/Pagination/PaginationRenderer.ts`, `tests/unit/gallery-pagination.test.ts`.

  **Deliver:** public barrels remain facades. AlertDialog consumes Modal/state hook. Gallery math is framework independent. Pagination shares page-window/clamp/edit behavior with focused renderers. Do not replace existing composition with another independent overlay.

  **Red → green assertions:** empty/changed gallery arrays and initial-index bounds; pagination ellipsis/sibling edges, compact commit/cancel/clamp, changed totalPages/custom icons; refs/types preserved.

  **Verify:** `npm run test:unit -- tests/unit/gallery-pagination.test.ts`; `npm run audit:contracts -- --check loc --components AlertDialog,Modal,ImageViewer,Pagination`; core typecheck. Covers C03/C13/C14, H10, M01.

### Batch 3: React/Vanilla DOM Parity, Bootstrap-like classes, A11y & SCSS tokens

- [ ] Task 3.1 — Make Select a shared combobox model with paired DOM

  **Targets:** modify `packages/core/src/components/Select/Select.tsx`, `packages/core/src/components/Select/Select.vanilla.ts`, `packages/core/src/components/Select/Select.scss`; create `packages/core/src/components/Select/select-model.ts`, `packages/core/src/components/Select/useSelectState.ts`, `packages/core/src/components/Select/SelectTrigger.tsx`, `packages/core/src/components/Select/SelectOptions.tsx`, `packages/core/src/components/Select/SelectRenderer.ts`, `tests/unit/select-model.test.ts`, `tests/parity/select.spec.ts`.

  **Deliver:** Popover owns portal/position/dismissal; Select owns native-value/custom-option semantics. Both adapters render the same visible items, IDs/roles and closed state, with a real accessible name/description on the focused combobox. Preserve the native select for form submission in Vanilla without adding hidden-only artifacts to the canonical visual contract. Explicitly define how that submission element is represented in React too; normalization must not silently drop arbitrary extra DOM. Keep stable option IDs when filtering and reapply variant tokens on portal surfaces.

  **Red → green assertions:** searchable/nonsearchable, all disabled, empty result, spacer, custom valid/invalid values, number/string values, error region, label association, keyboard focus, clipped container/scroll/RTL, form reset/submission and destroy restores authored input. All final TS/controller files ≤220 lines.

  **Verify:** `npm run test:unit -- tests/unit/select-model.test.ts`; `npm run test:parity -- tests/parity/select.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components Select`. Covers C02, H06/H11/H12.

- [ ] Task 3.2 — Finish Modal/AlertDialog/ImageViewer/Drawer DOM and cleanup parity

  **Targets:** modify `packages/core/src/components/Modal/Modal.tsx`, `packages/core/src/components/Modal/Modal.vanilla.ts`, `packages/core/src/components/AlertDialog/AlertDialog.tsx`, `packages/core/src/components/ImageViewer/ImageViewer.tsx`, `packages/core/src/components/ImageViewer/ImageViewer.vanilla.ts`, `packages/core/src/components/Sidebar/Sidebar.vanilla.ts`, `packages/core/src/primitives/Drawer/Drawer.tsx`, `packages/core/src/primitives/Drawer/DrawerController.ts`; create `tests/parity/gallery.spec.ts`, `tests/parity/alert-dialog.spec.ts`; extend `tests/parity/overlay.spec.ts`, `tests/parity/lifecycle.spec.ts`.

  **Deliver:** normalize Vanilla pseudo-markup to the canonical `<dialog>`/wrapper/title/description tree. Gallery composes Modal behavior under a separate registry feature key. Support the same overlay click/Escape options and initial/return focus. Adapt AlertDialog's action/cancel buttons declaratively to the shared modal controller; no handwritten inline close logic. Closing a gallery/container interaction must not accidentally dismiss when the image is manipulated.

  **Red → green assertions:** full `initLycoUI` order on `.modal.image-viewer`; one wheel/navigation action changes state once; exact DOM/ARIA both open/closed; stack locks, removed triggers, title naming, action/cancel, observer disconnection and destroy while dragging/zooming.

  **Verify:** `npm run test:parity -- tests/parity/overlay.spec.ts tests/parity/gallery.spec.ts tests/parity/alert-dialog.spec.ts tests/parity/lifecycle.spec.ts --project=chromium`. Covers C03/C10/C13, H15/H17/H19.

- [ ] Task 3.3 — Finish Tooltip parity and Range virtual-anchor integration

  **Targets:** modify `packages/core/src/components/Tooltip/Tooltip.tsx`, `packages/core/src/components/Tooltip/Tooltip.vanilla.ts`, `packages/core/src/components/Tooltip/Tooltip.scss`, `packages/core/src/components/Range/Range.tsx`, `packages/core/src/components/Range/Range.vanilla.ts`, `packages/core/src/components/Range/Range.scss`; create `tests/parity/tooltip-range.spec.ts`.

  **Deliver:** Tooltip describes the actual focusable trigger, with matching wrappers/tags in both targets; preserve composed child event/ref handlers. Share safe rich/text content and surface placement. Range uses the same surface/visibility core with a virtual thumb rectangle while keeping its purely visual hint aria-hidden. Support tooltipTrigger/tooltipSize/formatter/coloredThumb consistently; clear prior authored aria-describedby on destroy only if the library owned it, otherwise restore it.

  **Red → green assertions:** hover into tooltip, focus/blur, Escape, all directions, custom offset, horizontal scroll, disabled trigger, another controller on trigger, slider thumb hover versus active, formatter width/size changes.

  **Verify:** `npm run test:parity -- tests/parity/tooltip-range.spec.ts tests/parity/floating.spec.ts --project=chromium`; `npm run test:unit -- tests/unit/safe-content.test.ts`. Covers C04/C06, H09/H19, M05.

- [ ] Task 3.4 — Align Input/Textarea/FileUpload/Range/Pagination contracts

  **Targets:** modify `packages/core/src/components/Input/Input.tsx`, `packages/core/src/components/Input/Input.vanilla.ts`, `packages/core/src/components/Textarea/Textarea.tsx`, `packages/core/src/components/FileUpload/FileUpload.tsx`, `packages/core/src/components/FileUpload/FileUpload.vanilla.ts`, `packages/core/src/components/Range/Range.vanilla.ts`, `packages/core/src/components/Pagination/Pagination.tsx`, `packages/core/src/components/Pagination/Pagination.vanilla.ts`, `packages/core/src/components/Button/Button.tsx`; create `packages/core/src/components/Textarea/Textarea.vanilla.ts`, `tests/parity/fields.spec.ts`, `tests/parity/pagination.spec.ts`, `tests/parity/button.spec.ts`.

  **Deliver:** equal label/input/message IDs and ARIA, input action buttons/spinners/loading, native reset/validation, Textarea enhancement, correct FileUpload native-input class and drag/drop callback payload. Remove residual range trigger classes from rendered output. Pagination normalizes its root class/label/disabled state, sibling model/edit behavior and custom-icon configuration. Implement Button.flat intentionally rather than forwarding it to a DOM attribute.

  **Red → green assertions:** form submit/reset, labels without supplied IDs, invalid-to-valid announcements, keyboard icons/steps/upload, disabled/readOnly/loading, single versus multiple drop, zero/one/large page counts, compact cancel/commit and custom prev/next icons. Compare tags/classes, including default-size modifiers.

  **Verify:** `npm run test:parity -- tests/parity/fields.spec.ts tests/parity/pagination.spec.ts tests/parity/button.spec.ts --project=chromium`; `npm run test:unit -- tests/unit/field-validation.test.ts tests/unit/gallery-pagination.test.ts`. Covers C05/C06/C14/C15, M06.

- [ ] Task 3.5 — Align Accordion/Tabs/TreeView visibility and keyboard state

  **Targets:** modify `packages/core/src/components/Accordion/Accordion.tsx`, `packages/core/src/components/Accordion/Accordion.vanilla.ts`, `packages/core/src/components/TreeView/TreeView.tsx`, `packages/core/src/components/TreeView/TreeItem.tsx`, `packages/core/src/components/Tabs/Tabs.tsx`, `packages/core/src/components/Tabs/Tabs.vanilla.ts`; create `packages/core/src/components/TreeView/tree-model.ts`, `packages/core/src/components/TreeView/TreeView.vanilla.ts`, `tests/parity/disclosure-tabs-tree.spec.ts`.

  **Deliver:** Accordion/TreeItem compose Collapse. One navigation engine has tree parent/child adapters. Exactly one visible enabled tab/tree item has tabindex 0; hidden descendants cannot receive focus. Tabs initial active value is explicitly resolved the same way in both targets (first enabled trigger when no value/default is supplied); synchronize classes, aria-selected, hidden and descriptions. Preserve caller IDs/relationships. Forward Tabs.style.

  **Red → green assertions:** shipped hidden-panel Tabs snippet actually switches; initial disabled item; controlled Accordion disabled+expanded policy; tree first Tab entry; nested ArrowLeft/Right/Home/End/Enter/Space; collapse while focused; all empty/disabled; caller IDs survive initialization/destroy.

  **Verify:** `npm run test:parity -- tests/parity/disclosure-tabs-tree.spec.ts tests/parity/collapse.spec.ts --project=chromium`; `npm run test:unit -- tests/unit/interaction.test.tsx`. Covers C07/C08/C12, H08/H11/H18, M06.

- [ ] Task 3.6 — Complete Code's Vanilla editing/highlighting adapter

  **Targets:** modify `packages/core/src/components/Code/Code.vanilla.ts`, `packages/core/src/components/Code/Code.tsx`, `packages/core/src/components/Code/CodeToolbar.tsx`, `packages/core/src/components/Code/highlighter.ts`; create `packages/core/src/components/Code/CodeRenderer.ts`, `tests/parity/code.spec.ts`.

  **Deliver:** same Select toolbar tree, language/theme changes, editable textarea/highlight overlay, copy/download controls and code-region tags across targets. Vanilla change events reach the shared highlighter/editor model; use native bubbling events instead of querying labels as behavior selectors. Support plain-text fallback when optional Shiki is absent.

  **Red → green assertions:** toolbar selection changes tokenized output, textarea input/scroll sync, copy after edit, download filename, inline/block variants, async destroy, missing highlighter.

  **Verify:** `npm run test:parity -- tests/parity/code.spec.ts --project=chromium`; `npm run test:unit -- tests/unit/code-highlight.test.ts`; `npm run audit:contracts -- --check loc --components Code`. Covers C09, H21.

- [ ] Task 3.7 — Enforce paired Alert/Snackbar/Notification DOM and timed behavior

  **Targets:** modify `packages/core/src/components/Alert/Alert.vanilla.ts`, `packages/core/src/components/Snackbar/Snackbar.tsx`, `packages/core/src/components/Snackbar/Snackbar.vanilla.ts`, `packages/core/src/components/Notification/Notification.tsx`, `packages/core/src/components/Notification/Notification.vanilla.ts`, `packages/core/src/components/Notification/NotificationProvider.tsx`; extend `tests/parity/toast.spec.ts`, `tests/unit/timed-dismiss.test.ts`.

  **Deliver:** equal conditional title/message/progress nodes, live-region attributes and state classes. One timed model handles pause, eviction and all close paths. Public imperative close uses the store's close handler; destroy unregisters close buttons and clears every timer even when already exiting.

  **Red → green assertions:** title-only/content-only/empty, zero duration, white/custom icons, closable/flat, multiple positions/max eviction, repeated close, hover pause, manager destroy/provider unmount. Ensure no duplicate announcements from nested live regions.

  **Verify:** `npm run test:unit -- tests/unit/timed-dismiss.test.ts`; `npm run test:parity -- tests/parity/toast.spec.ts --project=chromium`. Covers C11, H14/H20.

- [ ] Task 3.8 — Complete Vanilla registration/export cleanup and package isolation

  **Targets:** modify `packages/core/src/vanilla.ts`, `packages/core/src/vanilla/init.ts`, `packages/core/src/vanilla/controller-registry.ts`, `packages/core/package.json`, `packages/core/vite.config.ts`; migrate `packages/core/src/components/Accordion/Accordion.vanilla.ts`, `packages/core/src/components/Alert/Alert.vanilla.ts`, `packages/core/src/components/Code/Code.vanilla.ts`, `packages/core/src/components/FileUpload/FileUpload.vanilla.ts`, `packages/core/src/components/Input/Input.vanilla.ts`, `packages/core/src/components/Navbar/Navbar.vanilla.ts`, `packages/core/src/components/Pagination/Pagination.vanilla.ts`, `packages/core/src/components/Range/Range.vanilla.ts`, `packages/core/src/components/Sidebar/Sidebar.vanilla.ts`, `packages/core/src/components/Tabs/Tabs.vanilla.ts`, `packages/core/src/components/Tooltip/Tooltip.vanilla.ts` to BaseController; create `tests/parity/package-smoke.spec.ts`, `tests/unit/vanilla-registry.test.ts`.

  **Deliver:** every existing/new initializer participates in root-scoped feature registration and destroy; export consistent init/controller access instead of discarding references. Keep document readiness/SSR guards. Built Vanilla transitive dependencies contain no React/clsx/Shiki imports, and all referenced relative chunks/CSS/fonts are shipped. ES modules remain modules; imperative examples import named APIs explicitly. Do not introduce an undocumented `window.LycoUI` global just to make stale snippets pass.

  **Red → green assertions:** plain HTML imports actual built files without import maps; dynamic fragments/reinit/destroy, detached fragment ownership, no duplicate DOMContentLoaded initialization, package root without Shiki, dependency-free Vanilla import graph, both ES/CJS package exports resolve.

  **Verify:** `npm run build -w @loreschaeffer/lyco-ui`; `npm run test:unit -- tests/unit/vanilla-registry.test.ts`; `npm run test:parity -- tests/parity/package-smoke.spec.ts tests/parity/lifecycle.spec.ts --project=chromium`; `npm run audit:contracts -- --check dependencies`. Covers C01/C13, H15/H16/H21/H28.

- [ ] Task 3.9 — Repair tokens, split style responsibilities and enforce motion standards

  **Targets:** modify `packages/core/src/styles/global.scss`, `packages/core/src/styles/utilities.scss`, `packages/core/src/styles/tokens/_typography.scss`, `packages/core/src/styles/tokens/_radii.scss`, `packages/core/src/styles/tokens/_shadows.scss`, `packages/core/src/styles/tokens/_motion.scss`, `packages/core/src/styles/tokens/_elevations.scss`, `packages/core/src/styles/tokens/_spacing.scss`, `packages/core/src/utils/floating.ts`, `packages/core/src/components/Range/Range.tsx`; exact additional SCSS targets are every path/line in the H24 and M04 ledgers, plus `packages/core/src/components/Stepper/Stepper.scss`. Create `packages/core/src/styles/base/_typography.scss`, `packages/core/src/styles/base/_elements.scss`, `packages/core/src/styles/utilities/_layout.scss`, `packages/core/src/styles/utilities/_spacing.scss`, `packages/core/src/styles/utilities/_typography.scss`, `packages/core/src/components/Stepper/_layout.scss`, `packages/core/src/components/Stepper/_states.scss`, `tests/parity/visual-standards.spec.ts`, `tests/unit/design-tokens.test.ts`.

  **Deliver:** use existing canonical tokens or add justified global aliases for every unresolved reference; fix semantic text aliases (`--green-500`, not nonexistent `--color-green-500`). Centralize sizing, border, motion/layer/gutter/thumb values. Prefer replacing incorrect aliases over proliferating synonyms. New roots must cover legitimate per-instance overrides. Split global emission/base and utility families; finish all SCSS >220 screens by responsibility, including DataTable/DatePicker/Input/Navbar/Notification/Select/Sidebar/Textarea/Stepper. Literal token definitions are permitted; computed geometry is data, not arbitrary token debt.

  **Motion:** Alert progress uses scaleX; shared Collapse changes layout discretely, animates only transform/opacity. Remove forbidden transition properties, add explicit timing/fill behavior, and reduced-motion handling. Preserve visible focus in both themes and disabled/hover/active states. Measure contrast from actual computed colors; do not infer AA/AAA from palette labels. Do not recolor the palette wholesale without visual evidence.

  **Red → green assertions:** no unresolved mandatory var references; default/hover/active/disabled token resolution across both themes; no animated layout/paint properties; reduced motion; focus contrast snapshots at fixed viewports. Check fallback branches without falsely reporting valid per-instance variables as missing globals.

  **Verify:** `npm run test:unit -- tests/unit/design-tokens.test.ts`; `npm run test:parity -- tests/parity/visual-standards.spec.ts --project=chromium`; `npm run audit:contracts -- --check tokens,motion,loc`. Covers H24, M01–M05/M08.

- [ ] Task 3.10 — Migrate the complete public class contract to single dashes

  **Targets:** create `packages/core/src/styles/class-contract.ts`, `docs/migrations/single-dash-classes.md`, `tests/parity/classes.spec.ts`; modify the exact React/Vanilla/SCSS files enumerated in the H25 public-class ledger, plus `packages/core/src/components/Grid/Row.tsx`, `packages/core/src/components/Grid/Col.tsx`, `packages/core/src/components/Grid/Grid.scss`, `packages/core/src/styles/utilities.scss`. The ledger is the explicit existing-file manifest, not a request to invent missing components.

  **Canonical mapping:** `.btn--sm → .btn-sm`, `.btn--outlined → .btn-outline`, `.btn__icon → .btn-icon`, `.card__header → .card-header`, `.row--align-center → .row-align-center`, `.col--md-6 → .col-md-6`, Navbar/Sidebar `__` elements → single-dash elements. Menu root becomes `.dropdown`, surface `.dropdown-menu`, item `.dropdown-item`, separator `.dropdown-divider`; do not blindly collapse names into collisions. Generate real semantic variant selectors such as `.btn-primary`, `.btn-danger`, `.badge-success` and `.table-primary` from the palette. Markers become `is-*` where they communicate state; semantic size/variant classes remain component-prefixed.

  **Deliver:** a typed, explicit class contract (static identifiers/generator rules, no behavior) used by both targets; remove BEM from canonical output and authoring. Record breaking mappings and the intended release/version policy without publishing. If temporary compatibility aliases are retained during rollout, the final acceptance build must still emit canonical single-dash DOM only and require no BEM classes. Preserve CSS custom-property prefixes and external user className values.

  **Red → green assertions:** each component and every semantic/size/state variant has emitted CSS; same complete class sets React/Vanilla; old BEM classes absent from canonical output; selectors/init attributes updated; no `btn-primary` false-positive success caused by default styling.

  **Verify:** `npm run audit:contracts -- --check classes`; `npm run test:parity -- tests/parity/classes.spec.ts --project=chromium`; `npm run test:parity -- --project=chromium`. All canonical classes and behavior pass; docs strings finish in Batch 4. Covers H25/H28 and all class aspects of C02–C15.

- [ ] Task 3.11 — Implement Vanilla picker adapters over the shared domains

  **Targets:** create `packages/core/src/components/DatePicker/DatePicker.vanilla.ts`, `packages/core/src/components/DatePicker/TimePicker.vanilla.ts`, `packages/core/src/components/DatePicker/DateTimePicker.vanilla.ts`, `packages/core/src/components/DatePicker/PickerRenderer.ts`, `tests/parity/pickers.spec.ts`; modify `packages/core/src/vanilla/init.ts`, `packages/core/src/vanilla.ts`, `packages/core/src/components/DatePicker/date-model.ts`, `packages/core/src/components/DatePicker/time-model.ts`.

  **Deliver:** minimal native pseudo-inputs with `data-lyco-datepicker`, `data-lyco-timepicker`, `data-lyco-datetimepicker`, preserving native form names/constraints. Transform using shared domain model, field validation, Popover controller and Calendar/time renderer. Match React desktop/native-mobile tags, controls, locale/format, use12Hour and validation; no copied popup geometry or parsing.

  **Red → green assertions:** replay Task 2.3 cases against both targets, exact open/closed trees, keyboard selection/clear/Escape/return focus, min/max, submission/reset and destroy restoration.

  **Verify:** `npm run test:parity -- tests/parity/pickers.spec.ts --project=chromium`; `npm run test:unit -- tests/unit/picker-model.test.ts`; `npm run audit:contracts -- --check loc --components DatePicker`. Covers C12's three pickers.

- [ ] Task 3.12 — Add the missing interactive Vanilla DataTable adapter

  **Targets:** create `packages/core/src/components/DataTable/DataTable.vanilla.ts`, `packages/core/src/components/DataTable/DataTableRenderer.ts`, `tests/parity/data-table.spec.ts`; modify `packages/core/src/vanilla/init.ts`, `packages/core/src/vanilla.ts`, `packages/core/src/components/DataTable/data-model.ts`, `packages/core/src/components/DataTable/DataTable.types.ts`.

  **Interface:** retain a minimal native `<table data-lyco-datatable>` path for declarative data, plus a typed constructor/config accepting the existing column model and DOM renderer callbacks for custom cells. Do not serialize ReactNode into attributes. Share sorting/search/pagination/selection/reorder commands; dispatch documented native CustomEvents and delegate Select/Pagination rather than copying their behavior.

  **Red → green assertions:** paired Task 2.4 cases, semantic header/cell roles, generic data/cell renderer mapping, keyboard sort/select/reorder, empty/loading, custom callbacks, update/destroy/reinit. Scope custom renderer equivalence to the same resulting HTML tree, not to framework function identity.

  **Verify:** `npm run test:unit -- tests/unit/data-table-model.test.ts`; `npm run test:parity -- tests/parity/data-table.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components DataTable`. Covers C12's DataTable gap.

- [ ] Task 3.13 — Add Vanilla Carousel over the shared scroll model

  **Targets:** create `packages/core/src/components/Carousel/Carousel.vanilla.ts`, `packages/core/src/components/Carousel/CarouselRenderer.ts`, `tests/parity/carousel.spec.ts`; modify `packages/core/src/vanilla/init.ts`, `packages/core/src/vanilla.ts`, `packages/core/src/components/Carousel/carousel-model.ts`.

  **Deliver:** auto-init declarative `.carousel`/data configuration, build canonical arrows/dots/track without React dependencies; share index/wrap logic and observer scheduling. Preserve authored slides and remove clones/listeners/observers during destroy.

  **Red → green assertions:** replay Task 2.8 cases in both targets, equivalent ARIA/current-dot/disabled states, scroll/resize/wrap and native keyboard controls.

  **Verify:** `npm run test:unit -- tests/unit/carousel-model.test.ts`; `npm run test:parity -- tests/parity/carousel.spec.ts --project=chromium`; `npm run audit:contracts -- --check loc --components Carousel`. Covers C12's remaining interactive gap.

### Batch 4: Documentation (`packages/docs` & `README.md`) full synchronization

- [ ] Task 4.1 — Synchronize every exported API, auxiliary type and compound member

  **Targets:** modify all exact `api.tsx` paths listed in the H26 API ledger; `packages/docs/src/components/api-reference/ApiReference.tsx`, `packages/docs/src/pages/types/TypesDoc.tsx`, `packages/docs/src/routes/auto-discovery.ts`; create `packages/docs/src/pages/components/FileUpload/FileUploadDoc.tsx`, `packages/docs/src/pages/components/FileUpload/api.tsx`, `packages/docs/src/pages/types/PolymorphicTypes.tsx`, `packages/docs/src/pages/types/ComponentTypes.tsx`, `packages/docs/src/pages/types/ContextTypes.tsx`, `packages/docs/src/pages/components/DataTable/api/props.tsx`, `packages/docs/src/pages/components/DataTable/api/models.tsx`, `packages/docs/src/pages/components/DateTimePicker/api/date.tsx`, `packages/docs/src/pages/components/DateTimePicker/api/time.tsx`, `packages/docs/src/pages/components/DateTimePicker/api/variables.tsx`, `tests/unit/docs-api.test.ts`.

  **Deliver:** map every public runtime/type export in the H27 ledger to an actual documented contract, not merely a substring mention. Keep current exports unless a separately versioned narrowing is intentionally agreed; document public contexts/helpers/constants if retained. Add missing FileUpload/direct ContextMenu/Snackbar/compound-member tables and links to inherited native props. Generate or verify type strings from source declarations, preserving aliases and parameter names. Show required/optional status in PropsTable. Fix Tabs names, Pagination callback, Select flags, missing Modal options, Notification.description, native Input/Range types and every delta in H26. Resolve accepted-but-ignored props through Batch 2/3 behavior before documenting them as working.

  **Defaults:** no invented defaults for required isOpen; compare actual destructuring/default model values, not prose. Split large API/type-reference modules by model/props/CSS-variable responsibility while retaining the expected `api.tsx` facade. Re-run symbol resolution after refactors so new/moved public APIs are included rather than frozen at the baseline 220 count.

  **Red → green assertions:** exact export coverage, each custom field, each explicitly documented inherited field, requiredness, aliases and runtime defaults. Ensure a newly exported fixture symbol or renamed prop makes the checker fail; no allowlist that silently skips unknown symbols.

  **Verify:** `npm run test:unit -- tests/unit/docs-api.test.ts`; `npm run audit:contracts -- --check exports,props,loc`. Zero unresolved export mappings, stale rows or undefined defaults. Covers H26/H27 and documentation portions of C05/C06/C09/C11/C14/C15.

- [ ] Task 4.2 — Repair and execute the complete Vanilla example set

  **Targets:** modify every exact affected example path in the H28 example integrity ledger, plus `packages/docs/src/pages/components/ContextMenu/examples/ProviderSetupExample.tsx`, `packages/docs/src/pages/components/DateTimePicker/examples/BasicDatePickerExample.tsx`, `packages/docs/src/pages/components/DateTimePicker/examples/TimePicker12Example.tsx`, `packages/docs/src/pages/components/DateTimePicker/examples/TimePicker24Example.tsx`, `packages/docs/src/pages/components/TreeView/examples/BasicTreeView.tsx`; create `packages/docs/src/pages/components/FileUpload/examples/BasicExample.tsx`, `packages/docs/src/pages/components/FileUpload/examples/MultipleExample.tsx`, `packages/docs/src/pages/components/FileUpload/examples/DisabledExample.tsx`, `tests/parity/docs-examples.spec.ts`, `tests/fixtures/docs-example-manifest.ts`.

  **Deliver:** every example exports title/description/order/vanillaHtml. Add the six missing strings, replace DataTable placeholder comments with actual native/configured examples, remove handwritten dropdown/sidebar widget logic, use implemented controller data attributes and final single-dash classes. Convert nonexistent LycoUI globals to explicit named ESM imports and application listeners. Keep snippets minimal; app callbacks may use a small typed script, but primitive behavior must come from the library. Fix file-input class, modal/gallery dialog wrappers, tab hidden behavior, invalid utility/palette classes and semantic tags.

  **Red → green assertions:** load each literal vanillaHtml with only built library CSS/JS plus explicitly declared example-local assets. Click/type/key through the showcased behavior and compare against the paired React state, including menu nesting, notification pause, file upload and custom table renderer. No pageerror/failed imports, unknown required library classes, inert controls, placeholder-only examples or missing metadata. Application-only CSS must be declared in the example, not assumed from the docs shell.

  **Verify:** `npm run audit:contracts -- --check examples`; `npm run test:parity -- tests/parity/docs-examples.spec.ts --project=chromium`. The manifest covers all 160 baseline examples plus new ones, with no skipped interactive cases. Covers H28, §§5.2–5.3 and published snippets implicated by every C finding.

- [ ] Task 4.3 — Synchronize guides, example rendering and large reference pages

  **Targets:** modify `packages/docs/src/components/DocTemplate.tsx`, `packages/docs/src/components/CodeExample.tsx`, `packages/docs/src/pages/getting-started/Introduction.tsx`, `packages/docs/src/pages/getting-started/Colors.tsx`, `packages/docs/src/pages/getting-started/TypographyDoc.tsx`, `packages/docs/src/pages/getting-started/SpacingDoc.tsx`, `packages/docs/src/pages/getting-started/LayoutDoc.tsx`, `packages/docs/src/pages/getting-started/SizingDoc.tsx`, `packages/docs/src/pages/getting-started/ZIndexDoc.tsx`, `packages/docs/src/pages/getting-started/RadiiDoc.tsx`, `packages/docs/src/pages/getting-started/ShadowsDoc.tsx`, `packages/docs/src/pages/getting-started/ResponsiveDesignDoc.tsx`, `packages/docs/src/App.tsx`; create `packages/docs/src/pages/getting-started/reference/color-data.ts`, `packages/docs/src/pages/getting-started/reference/typography-data.ts`, `packages/docs/src/pages/getting-started/reference/ColorTables.tsx`, `packages/docs/src/pages/getting-started/reference/TypographyTables.tsx`, `packages/docs/src/pages/getting-started/reference/InstallExamples.tsx`, `tests/parity/docs-navigation.spec.ts`.

  **Deliver:** guides show actual global token names, generated utility/grid classes, package export paths, keyboard/cleanup APIs and supported browser/package behavior. Split the oversized Introduction/Colors/Typography reference responsibilities. Every exported API page is discoverable; preserve consolidated DateTimePicker and Grid guide routing intentionally. Clean any docs-shell BEM and stale utility names. Example renderer never silently hides missing Vanilla coverage; show isolated executable previews where supported without coupling them to a React-rendered DOM.

  **Red → green assertions:** route/deep-link smoke, sidebar/API table anchors, type links including polymorphic aliases, code tabs show the same documented source, each example's required CSS/JS is independent of the docs app. Keep the user's current SidebarDoc edits intact when integrating its final description.

  **Verify:** `npm run test:parity -- tests/parity/docs-navigation.spec.ts --project=chromium`; `npm run audit:contracts -- --check examples,classes,tokens,loc`; docs typecheck after Task 4.4. Covers M01's docs files, H27/H28 and guide parity.

- [ ] Task 4.4 — Fix docs compiler configuration and prove README/package instructions

  **Targets:** modify `packages/docs/tsconfig.app.json`, `packages/docs/tsconfig.node.json`, `packages/docs/package.json`, `README.md`, `packages/core/package.json`, `packages/core/vite.config.ts`; create `tests/consumer/package-smoke.mjs`, `tests/consumer/README.html`, `tests/consumer/react-entry.tsx`, `tests/parity/readme.spec.ts`.

  **Deliver:** remove/replace removed baseUrl configuration with valid relative paths for the declared compiler; preserve strict typing. README uses verified package CSS aliases and actual emitted module paths, explains required companion chunks/fonts where appropriate, and includes valid semantic variants/classes. Keep React peer requirements and genuinely optional Shiki accurate. Do not label the current multi-chunk module closure a self-contained single JS file unless packaging actually produces one. Replace blanket accessibility guarantees with specific tested behavior/known support, based on measured evidence.

  **Red → green assertions:** pack into a temporary consumer, install/import package exports, serve README.html without a bundler/import map/React, import Button without Shiki, load Code with and without its optional peer, check CSS/fonts and both ES/CJS outputs. No network assets or globally installed dependency can make a smoke test pass accidentally.

  **Verify:** `node node_modules/typescript/bin/tsc -p packages/docs/tsconfig.app.json --noEmit --incremental false`; `npm run build`; `node tests/consumer/package-smoke.mjs`; `npm run test:parity -- tests/parity/readme.spec.ts --project=chromium`. All exit 0; the consumer test cleans its owned temporary directory safely. Covers C01, H21/H23/H28, M08.

- [ ] Task 4.5 — Enforce batch quality gates and remove contradictory repository guidance

  **Targets:** modify `.github/workflows/publish.yml`, `.agents/skills/component-architect/SKILL.md`, `package.json`; create `.github/workflows/quality.yml`, `docs/quality/verification.md`; update `AUDIT_PLAN.md` only to record executed tasks and evidence in a later implementation turn.

  **Deliver:** a PR/push quality workflow runs core/docs typechecks, lint, unit/paired browser tests, source/doc/class/token/motion/export/dependency checks and production builds before publishing. Pin the tested Node/compiler/browser versions in CI. Publish depends on the quality gate. Update the stale component-architect BEM guidance to `.agents/AGENTS.md` §4.4; do not alter AGENTS to make current violations disappear. Triage React/unused warnings by impact rather than adding blanket lint disables.

  **Verify:** `node node_modules/typescript/bin/tsc -p packages/core/tsconfig.app.json --noEmit --incremental false`; docs equivalent from Task 4.4; `npm run lint --workspaces --if-present`; `npm run test:unit`; `npm run test:parity -- --project=chromium`; `npm run audit:contracts -- --check exports,props,examples,classes,tokens,motion,loc,dependencies,guidance`; `npm run build`; `node tests/consumer/package-smoke.mjs`. Run once at final batch completion; repeat only after material corrections.

  **Acceptance:** every command exits 0, no suppressed parity/docs defects, no oversized component/controller without a resolved decomposition, no unsupported interactive Vanilla examples, no leaked allocations after teardown, and no current findings merely hidden by weakening the rules. Record actual command outputs/limitations. A human visual/assistive-technology pass remains necessary before any AA/AAA conformance claim; an automated audit alone is insufficient. Covers H23, M07/M09 and guards all findings.

### Plan self-review and handoff

- The five requested audit areas have corresponding evidence ledgers and tasks; all existing interactive families are accounted for, including successful existing composition.
- Batch 1 defines shared interfaces before consumers; Batch 2 decomposes and adopts them; Batch 3 closes exact target/style contracts and missing adapters; Batch 4 synchronizes all public documentation and gates it. Tasks 3.11–3.13 extend 3.8's registry before final package verification.
- Every task names targets and deterministic verification. File lists in H24/H25/H26/H28/M01/M04 are exact manifests referenced by the broad synchronization tasks, avoiding a second divergent file inventory.
- This file contains the audit and an **unexecuted** implementation plan. Current lint/docs checks remain failing as described in Section A. Review the plan before authorizing a later implementation turn; no source refactor is implied by saving it.
