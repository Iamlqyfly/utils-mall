const path = require('path')
const glob = require("glob")

const resolveFile = function(filePath) {
    return path.join(__dirname, '..', filePath)
}

function getEntries(globPath) {
    // 获取所有匹配文件的文件名数组
    var files = glob.sync(globPath),
        entries = []
    files.forEach(function (filepath) {
        // 取倒数第二层(view下面的文件夹)做包名
        var split = filepath.split('/')
        var name = split[split.length - 2]

        // // 保存{'目录名': '目录路径'}
        // entries[name] = './' + filepath
        entries.push({
            baseName: name,
            entry: filepath
        })
    })
    return entries
}

// 获取所有匹配src下目录的文件夹名字，其中文件夹里main.js为页面入口
var entries = getEntries('../src/**/index.ts')

module.exports = {
    resolveFile,
    getEntries
}