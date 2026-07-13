import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'LycoUI',
            fileName: (format) => `lyco-ui.${format}.js`,
            formats: ['es', 'cjs']
        },
        rolldownOptions: {
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