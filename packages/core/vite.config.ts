import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import {resolve} from 'path';

export default defineConfig({
    plugins: [
        react(),
        dts({
            outDirs: ['dist/types'],
            insertTypesEntry: true,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
        })
    ],
    build: {
        sourcemap: true,
        emptyOutDir: true,
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                vanilla: resolve(__dirname, 'src/vanilla.ts'),
            },
            name: 'LycoUI',
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'clsx'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'style.css';
                    return assetInfo.name || 'style.css';
                }
            }
        }
    }
});