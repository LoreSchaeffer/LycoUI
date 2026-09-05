<div align="center">
  <h1>Lyco UI</h1>
  <p>A high-density, low-noise, dual-target UI component library for React and Vanilla HTML/CSS/JS.</p>

  [![Version](https://img.shields.io/badge/version-1.2.0-blue.svg?style=for-the-badge&color=007AFF)](https://github.com/LoreSchaeffer/LycoUI)
  [![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](https://github.com/LoreSchaeffer/LycoUI/blob/main/LICENSE)
  [![React](https://img.shields.io/badge/React-19.0+-61DAFB.svg?style=for-the-badge&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
</div>

<hr />

## ✨ Features

- **Dual-Target Architecture**: Use as typed React components or drop into Vanilla HTML with a single CSS/JS bundle.
- **Premium Aesthetics**: Built with the "Linear-style" design language. Deep dark mode, subtle borders, and smooth micro-interactions.
- **Zero Configuration**: Works out of the box with Vite, Next.js, or plain HTML.
- **Accessibility First**: WCAG 2.1 AA/AAA compliance with full keyboard navigation and WAI-ARIA support.
- **Perceptually Uniform Colors**: LCH/OKLCH color system ensures perfect contrast and luminous accents on dark backgrounds.

## 📖 Documentation

Full documentation and interactive examples are available at:  
[**https://ui.lycoris.it/**](https://ui.lycoris.it/)

## 🚀 Installation

### 1. Configure Registry

Create or edit the `.npmrc` file in your project root to point to the GitHub Packages registry:

```ini
@loreschaeffer:registry=https://npm.pkg.github.com
```

### 2. Authenticate

Log in using your GitHub Personal Access Token (PAT) with `read:packages` permissions:

```bash
npm login --registry=https://npm.pkg.github.com
```

### 3. Install

Install the package via npm, yarn, or pnpm:

```bash
npm install @loreschaeffer/lyco-ui
```

## 💻 Usage

### React Integration

Import the stylesheet once in your entry point, then use the components natively:

```tsx
// main.tsx
import '@loreschaeffer/lyco-ui/style.css';
import { Button } from '@loreschaeffer/lyco-ui';

export const App = () => (
  <Button variant="primary">Click Me</Button>
);
```

### Vanilla HTML/CSS/JS

No build steps required. Simply include the CSS and JS bundles, and use the provided classes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lyco UI App</title>
  <!-- 1. Import Styles -->
  <link rel="stylesheet" href="node_modules/@loreschaeffer/lyco-ui/dist/lyco-ui.css">
</head>
<body>
  <!-- 2. Write HTML -->
  <button class="btn btn-primary">Click Me</button>

  <!-- 3. Import Vanilla JS Controller (Auto-initializes interactive components) -->
  <script type="module" src="node_modules/@loreschaeffer/lyco-ui/dist/vanilla.es.js"></script>
</body>
</html>
```

## 📦 Peer Dependencies

| Package | Required | Notes |
|---------|----------|-------|
| `react` | Yes (for React target) | `^19.0.0` |
| `react-dom` | Yes (for React target) | `^19.0.0` |
| `shiki` | Optional | Required only for the `<Code />` component syntax highlighting |

## 🤝 Contributing

We welcome contributions! Please check our rules and architecture guidelines before submitting a PR.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
