import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

export default {
    input: 'src/index.ts',
    output: [
        {file: pkg.module, format: 'es', sourcemap: true},
        {file: pkg.main, format: 'umd', name: 'QR', sourcemap: true},
    ],
    plugins: [
        svelte({
            preprocess: sveltePreprocess(),
        }),
        resolve(),
        typescript(),
    ],
}
