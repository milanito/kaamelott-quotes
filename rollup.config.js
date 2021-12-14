import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

// eslint-disable-next-line import/no-anonymous-default-export
export default [{
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/__tests__', '**/*.test.*', '**/*.stories.*']
    }),
    terser(),
    filesize()
  ]
}, {
  input: 'build/types/index.d.ts',
  output: [{ file: 'build/index.d.ts', format: 'esm' }],
  plugins: [dts()]
}]
