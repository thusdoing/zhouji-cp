'use strict'
require('./check-versions')()
const profileActiveKey = '--profile.active=';
const profileActive = (process.argv.find(d => d.indexOf(profileActiveKey) == 0) || '').replace(profileActiveKey, '');

if (!profileActive) {
  console.error('\x1B[31m%s\x1B[39m', `please support process.argv "${profileActiveKey}xxx".`);  //cyan
  return -1;
}

const fs = require('fs');
const path = require('path');
const profile = path.resolve(__dirname, `../profiles/${profileActive}`);
if (!fs.existsSync(profile)) {
  console.error('\x1B[31m%s\x1B[39m', `process.argv "${profileActiveKey}${profileActive}" is invalid.`);  //cyan
  return -1;
}

const src = profile;
const dist = path.resolve(__dirname, '../');

// 同步复制文件夹
function travel(src, dist) {
  fs.readdirSync(src).forEach(function (file) {

    const _src = path.join(src, file);
    const _dist = path.join(dist, file);
    if (fs.statSync(_src).isDirectory()) {
      return travel(_src, _dist);
    }
    console.log(`cp -r ${_src} ${_dist}`);
    fs.copyFileSync(_src, _dist);
  })
}


travel(src, dist);

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
// const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
