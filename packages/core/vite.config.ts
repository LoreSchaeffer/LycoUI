import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import fs from 'node:fs';

function injectFontsPlugin() {
    return {
        name: 'copy-and-inject-fonts',
        closeBundle() {
            const outDir = resolve(import.meta.dirname, 'dist');
            const cssPath = resolve(outDir, 'lyco-ui.css');
            const fontsSrc = resolve(import.meta.dirname, 'src/assets/fonts');
            const fontsDest = resolve(outDir, 'fonts');

            // 1. Copy font files
            if (fs.existsSync(fontsSrc)) {
                fs.cpSync(fontsSrc, fontsDest, { recursive: true });
            }

            // 2. Inject @font-face rules bypassing Vite's base64 inline compiler
            if (fs.existsSync(cssPath)) {
                const fontCss = `
@font-face { font-family: 'Noto Sans'; src: url('./fonts/NotoSans-Variable.ttf') format('truetype'); font-weight: 100 900; font-style: normal; font-display: swap; }
@font-face { font-family: 'Noto Sans'; src: url('./fonts/NotoSans-Italic-Variable.ttf') format('truetype'); font-weight: 100 900; font-style: italic; font-display: swap; }
@font-face { font-family: 'JetBrains Mono'; src: url('./fonts/JetBrainsMono-Variable.ttf') format('truetype'); font-weight: 100 900; font-style: normal; font-display: swap; }
@font-face { font-family: 'JetBrains Mono'; src: url('./fonts/JetBrainsMono-Italic-Variable.ttf') format('truetype'); font-weight: 100 900; font-style: italic; font-display: swap; }
`;
                fs.appendFileSync(cssPath, fontCss);
            }
        }
    };
}

export default defineConfig({
    plugins: [
        react(),
        dts({
            outDirs: ['dist/types'],
            insertTypesEntry: true,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            tsconfigPath: './tsconfig.app.json'
        }),
        injectFontsPlugin()
    ],
    build: {
        sourcemap: true,
        emptyOutDir: true,
        lib: {
            entry: {
                index: resolve(import.meta.dirname, 'src/index.ts'),
                vanilla: resolve(import.meta.dirname, 'src/vanilla.ts'),
            },
            name: 'LycoUI',
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            formats: ['es', 'cjs']
        },
        rolldownOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'clsx', 'shiki'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    shiki: 'shiki'
                }
            }
        }
    }
});