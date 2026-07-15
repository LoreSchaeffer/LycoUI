# Lyco UI

`lyco-ui` is an agnostic, scalable, and performance-focused UI component library and Design System built on an NPM Workspace monorepo architecture.

## 🎨 Design Philosophy
The visual language diverges from traditional flat design, introducing a modern, depth-oriented aesthetic
* **Depth & Textures:** Heavy reliance on subtle gradients, multi-layered box-shadows, and noise textures. It achieves a tactile feel without relying on pure glassmorphism.
* **Rounded Geometry:** High border-radius values across surfaces and interactive elements for a fluid, organic appearance.
* **Motion & Micro-interactions:** Fluid animations and state transitions must be heavily utilized across all interactive elements. Motion is treated as a first-class citizen to provide immediate visual feedback and elevate the 2026 user experience.
* **Component-Level Flat Override:** Every component supports a strict `isFlat` fallback toggle, instantly stripping gradients and textures to render a pure, solid-color variant.
* **Responsive First:** The layout system is heavily inspired by Bootstrap 5's flexbox grid, ensuring absolute layout uniformity and fluid adaptation across all viewports.

---

## 🛠 Tech Stack

The workspace utilizes the following unified ecosystem:

### Core Framework & Language
* **React 19**: Utilized at version `^19.2.7` for crafting the user interface components.
* **TypeScript**: Configured at version `~7.0.2` to ensure strict, enterprise-level static typing across all components and their respective Props.

### Styling & Tokenization
* **Sass (SCSS)**: Version `^1.101.0`. Provides the logical infrastructure (advanced `@each`, `@for` loops, and `@mixin` directives) to map design tokens and compile utilities and global classes.
* **Clsx**: Version `^2.1.1`. A core utility for conditionally manipulating and cleanly concatenating CSS classes within React components.

### Build Tool & Monorepo
* **Vite 8**: Configured at version `^8.1.4`. Powers both the library compilation (via Rolldown) and the lightning-fast HMR development server for the documentation playground.
* **NPM Workspaces**: Architected to strictly separate the `core` UI library from the `docs` consumption playground, ensuring zero-overhead dogfooding without third-party dependencies.

---

## 📂 Repository Architecture (Monorepo)

The source directory strictly isolates the compiled library from the testing environment:

```text
lyco-ui-workspace/
├── package.json              # Root workspace orchestrator
├── packages/
│   ├── core/                 # Atomic UI Components & Styling (Published Library)
│   │   ├── src/
│   │   │   ├── components/   # Isolated React components (e.g., Grid, Surface)
│   │   │   ├── styles/       # Global styling orchestration
│   │   │   │   ├── tokens/   # Atomic Design Token Maps (_colors, _radii, _shadows, etc.)
│   │   │   │   ├── _fonts.scss
│   │   │   │   └── global.scss # Main entry point (Reset & CSS Variables injector)
│   │   │   └── index.ts      # Library global entry point
│   │   ├── package.json      # Library manifest
│   │   ├── tsconfig.json     # Strict TS compilation rules
│   │   └── vite.config.ts    # Rolldown library build configuration
│   └── docs/                 # Custom Vite Playground & Documentation SPA
│       ├── src/
│       │   ├── App.tsx       # Live playground testing environment
│       │   └── main.tsx      # React root injector
│       ├── index.html        # Web entry point
│       ├── package.json      # Docs manifest (depends on locally symlinked lyco-ui)
│       ├── tsconfig.json     # SPA TS validation rules (noEmit)
│       └── vite.config.ts    # Standard Vite web build configuration
```

## 🔄 Workflow & Available Scripts
Execute these commands from the root directory to orchestrate the workspaces:

- `npm run dev:docs`: Starts the documentation playground. Automatically intercepts core imports via Vite alias for instant HMR without requiring pre-builds.
- `npm run build`: Executes the production build across all workspaces (core library and docs static site).
- `npm run clean`: Purges all node_modules and dist directories across the workspace to reset the environment.