import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import typescript from '@rollup/plugin-typescript';
import path from "path";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
    path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps')
);


export default defineConfig({
    base: '/',
    build: {
        //outDir: 'public/',
        emptyOutDir: false
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react({
            swcOptions: {
                sourceMaps: false, // Disable source maps for SWC
            },
        }),
        typescript({ tsconfig: "./tsconfig.json", }),
        viteStaticCopy({
            targets: [
                {
                    src: cMapsDir,
                    dest: ''
                }
            ]
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});
