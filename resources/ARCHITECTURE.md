# Lyoco UI

`lyco-ui` is an agnostic, scalable, and performance-focused UI component library and Design System. 
The architecture is designed to generate a universal styling infrastructure (via CSS Variables and SCSS) 
that is fully compatible with both Vanilla HTML/JS environments and modern React applications.

---

## 🛠 Tech Stack

The project is built on a modern, lightning-fast ecosystem, configured with the following technologies:

### Core Framework & Language
* **React 19**: Utilized at version `^19.2.7` for crafting the user interface components.
* **TypeScript**: Configured at version `~7.0.2` to ensure strict, enterprise-level static typing across all components and their respective Props.

### Styling & Tokenization
* **Sass (SCSS)**: Version `^1.101.0`. Provides the logical infrastructure (advanced `@each`, `@for` loops, and `@mixin` directives) to map design tokens and compile utilities and global classes.
* **Clsx**: Version `^2.1.1`. A core utility for conditionally manipulating and cleanly concatenating CSS classes within React components.

### Build Tool & Development Environment
* **Vite 8**: Configured at version `^8.1.4` as an ultra-fast bundler for both the local development environment and the optimized production build.
* **Storybook 10**: Version `^10.5.0` with the `@storybook/react-vite` integration. Serves as an isolated environment (Workshop) for component development, accessibility testing (`@storybook/addon-a11y`), and official documentation generation (`@storybook/addon-docs`).

---

## 📂 File Architecture and Repository Structure

The source directory strictly separates centralized style orchestration from atomic component isolation:

\`\`\`text
lyco-ui/
├── .storybook/               # Storybook configuration files
├── src/
│   ├── components/           # Atomic UI Components
│   │   └── Grid/             # Responsive Grid Module
│   │       ├── Col.tsx       # Column component (forwardRef, clsx)
│   │       ├── Grid.scss     # Grid compiler and flex layout math
│   │       ├── Grid.stories.tsx # Layout & Bootstrap-like documentation
│   │       ├── index.ts      # Component barrel export file
│   │       └── Row.tsx       # Row component with align modifiers
│   ├── docs/
│   │   └── Colors.stories.tsx # Global design tokens color laboratory
│   ├── styles/               # Global styling orchestration
│   │   ├── tokens/           # Atomic Design Token Maps
│   │   │   ├── _breakpoints.scss # Media query responsive break steps
│   │   │   ├── _colors.scss      # Hue and lightness map definitions
│   │   │   ├── _elevations.scss  # Z-index layering definitions
│   │   │   ├── _index.scss       # Tokens entrypoint (forward engine)
│   │   │   ├── _motion.scss      # Animation duration and easing curves
│   │   │   ├── _radii.scss       # Border-radius size scale
│   │   │   ├── _shadows.scss     # Box-shadow layers for layers depth
│   │   │   ├── _spacing.scss     # 4px-grid spacing multiplier system
│   │   │   └── _typography.scss  # REM-based font sizes and line-heights
│   │   ├── _fonts.scss       # Font face and asset definitions
│   │   └── global.scss       # Main entry point (Reset, Core tags & CSS Variables injector)
│   └── index.ts              # Library global entry point
├── package.json              # Scripts, dependencies and metadata definitions
├── tsconfig.json             # TypeScript configuration profile
└── vite.config.ts            # Vite compiler configuration
\`\`\`

---

## 🔄 Workflow & Available Scripts

The integrated commands in the project's development cycle utilize the following native scripts:

*   \`npm run dev\`: Starts the local development server via Vite.
*   \`npm run build\`: Type-checks the code with the TypeScript compiler and runs the production build of the application.
*   \`npm run lint\`: Executes a lightning-fast static code check via \`oxlint\` to catch formatting issues or potential errors.
*   \`npm run storybook\`: Starts the local Storybook environment on port \`6006\` for isolated component development and documentation review.
*   \`npm run build-storybook\`: Compiles the Storybook documentation into a static package ready for distribution or online deployment.