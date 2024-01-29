const path = require('path');
const { babel } = require('rollup-plugin-babel');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const babelOptions = {
  'presets': ['@babel/preset-env'],
}

module.exports = [
  {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'cjs',
    }, 
    plugins: [
      babel({
        runtimeHelpers: true,
        // 只转换源代码，不运行外部依赖
        exclude: 'node_modules/**',
        // babel 默认不支持 ts 需要手动添加
        extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      }),
    ],
  },
  {
    input: resolveFile('src/lib/index.js'),
    output: {
      file: resolveFile('dist/lib.js'),
      format: 'cjs',
    }, 
    plugins: [
      // babel({
      //   runtimeHelpers: true,
      //   // 只转换源代码，不运行外部依赖
      //   exclude: 'node_modules/**',
      //   // babel 默认不支持 ts 需要手动添加
      //   extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      // }),
    ],
  }
]