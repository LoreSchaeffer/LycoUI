# @loreschaeffer/lyco-ui

A dual-target UI component library for React and Vanilla HTML/CSS/JS.

## Installation

### 1. Configure Registry

Create or edit `.npmrc` in your project root:

```
@loreschaeffer:registry=https://npm.pkg.github.com
```

### 2. Authenticate

```bash
npm login --registry=https://npm.pkg.github.com
```

You will need a GitHub Personal Access Token (PAT) with `read:packages` scope.

### 3. Install

```bash
npm install @loreschaeffer/lyco-ui
```

## Usage

### React

```tsx
// main.tsx
import '@loreschaeffer/lyco-ui/style.css';
import { Button } from '@loreschaeffer/lyco-ui';

export const App = () => (
  <Button variant="primary">Click Me</Button>
);
```

### Vanilla HTML/CSS/JS

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="node_modules/@loreschaeffer/lyco-ui/dist/lyco-ui.css">
</head>
<body>
  <button class="btn btn-primary">Click Me</button>

  <script type="module" src="node_modules/@loreschaeffer/lyco-ui/dist/vanilla.es.js"></script>
</body>
</html>
```

## Peer Dependencies

| Package | Required | Notes |
|---------|----------|-------|
| `react` | Yes (for React target) | `^19.0.0` |
| `react-dom` | Yes (for React target) | `^19.0.0` |
| `shiki` | Optional | Required only for the `Code` component with syntax highlighting |

## License

Private — All rights reserved.
