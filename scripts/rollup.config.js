const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require("rollup-plugin-terser")
const { visualizer } = require("rollup-plugin-visualizer");
const path = require('path');
const fs = require('fs') // node fs模块
const chalk = require('chalk') // 自定义输出样式

const defaultPlugins = [
  // commonjs(),
  resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules',
    },
  }),
]
const moduleName = 'utilsDemo' // 当format为iife和umd时必须提供，将作为全局变量挂在window下：window.moduleName=...
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

module.exports = generateConfigs()