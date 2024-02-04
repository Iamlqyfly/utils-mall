import path from 'path';
import { RollupOptions } from 'rollup';
import rollupTypescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { fileURLToPath } from 'url';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload'

const paths = {
  input: path.join(__dirname, '/src/index.ts'),
  output: path.join(__dirname, '/lib'),
};

const rollupConfig = {
  input: paths.input,
  output: [
    {
      file: path.join(paths.output, 'index.js'),
      format: 'cjs',
      name: pkg.name,
    },
    {
      file: path.join(paths.output, 'index.esm.js'),
      format: 'es',
      name: pkg.name,
    },
    {
      file: path.join(paths.output, 'index.min.js'),
      format: 'umd',
      name: pkg.name,
      plugins: [terser()]
    },
  ],
  external: ['lodash'],
  plugins: [
    json(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'lib/**', '*.js'],
    }),
    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    rollupTypescript(),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
    }),
    livereload(),
    serve({
      port: 30001,
      open: true,
      contentBase: ['debugger', 'lib']
    })
  ],
};

export default rollupConfig;
