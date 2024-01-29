
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

const { terser } = require("rollup-plugin-terser")
const { visualizer } = require("rollup-plugin-visualizer");

const fs = require('fs') // node fs模块
const chalk = require('chalk') // 自定义输出样式
const { resolveFile, getEntries } = require('./utils')

const moduleName = camelCase(name) // 当format为iife和umd时必须提供，将作为全局变量挂在window下：window.moduleName=...
const banner = generateBanner() // 包说明文案
// 生成rollup配置文件函数
const generateConfigs = (options) => {
    const { input, outputFile } = options
    console.log(chalk.greenBright(`获取打包入口：${input}`))
    const result = []
    const pushPlugins = ({ format, plugins, ext }) => {
        result.push({
            input, // 打包入口文件
            external: [], // 如果打包出来的文件有项目依赖，可以在这里配置是否将项目依赖一起打到包里面还是作为外部依赖
            // 打包出口文件
            output: {
                file: `${outputFile}${ext}`, // 出口文件名称
                sourcemap: true, // // 是否生成sourcemap
                format, // 打包的模块化格式
                name: moduleName, // 当format为iife和umd时必须提供，将作为全局变量挂在window下：window.moduleName=...
                exports: 'named' /** Disable warning for default imports */,
                banner, // 打包出来的文件在最顶部的说明文案
                globals: {} // 如果external设置了打包忽略的项目依赖，在此配置，项目依赖的全局变量
            },
            plugins // rollup插件
        })
    }
    buildType.forEach(({ format, ext }) => {
        let plugins = [...defaultPlugins]
        // 生产环境加入包分析以及代码压缩
        plugins = [
            ...plugins,
            visualizer({
                gzipSize: true,
                brotliSize: true
            }),
            terser()
        ]

        pushPlugins({ format, plugins, ext })
    })
    return result
}



let srcIndexContent = `
// tips：此文件是自动生成的，无需手动添加
`
getEntries(resolveFile('src/modules/*')).forEach(({ baseName, entry }) => {
  let moduleIndexContent = `
// tips：此文件是自动生成的，无需手动添加
`
  try {
    // 判断是否文件夹
    const stats = fs.statSync(entry)
    if (stats.isDirectory()) {
      getEntries(`${entry}/*.ts`).forEach(({ baseName }) => {
        baseName = baseName.split('.')[0]
        if (baseName.indexOf('index') === -1) {
          moduleIndexContent += `
export * from './${baseName}'
`
        }
      })
      fs.writeFileSync(`${entry}/index.ts`, moduleIndexContent, 'utf-8')
      srcIndexContent += `
export * from './modules/${baseName}'
export * as ${baseName} from './modules/${baseName}'
`
    } else {
      srcIndexContent += `
export * from './modules/${baseName.split('.')[0]}'
`
    }
  } catch (e) {
    console.error(e)
  }
})
fs.writeFileSync(resolveFile('src/index.ts'), srcIndexContent, 'utf-8')