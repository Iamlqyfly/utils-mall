const path = require('path');
const serve = require('rollup-plugin-serve');
const configList = require('./rollup.config');
const livereload = require('rollup-plugin-livereload')

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}
const PORT = 3001;


configList.map((config, index) => {

  config.output.sourcemap = true;

  if( index === 0 ) {
    config.plugins = [
      ...config.plugins,
      ...[
        livereload(),
        serve({
          port: PORT,
          contentBase: [resolveFile('debugger'), resolveFile('dist')]
        })
      ]
    ]
  }
  
  return config;
})


module.exports = configList;