import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'lyco-ui/style.css': resolve(__dirname, '../core/src/styles/global.scss'),
            'lyco-ui': resolve(__dirname, '../core/src/index.ts')
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});