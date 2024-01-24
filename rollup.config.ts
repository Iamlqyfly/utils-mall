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

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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
  ],
  plugins: [
    json(),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'lib/**', '*.js'],
    }),
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
  ],
};

export default rollupConfig;
