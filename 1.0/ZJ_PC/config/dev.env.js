'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod-base.env')

module.exports = merge(prodEnv, {
  NEWS_OPEN_STATUS: JSON.stringify(false),
  ORIGIN_PREFIXS: JSON.stringify(``),
  NODE_ENV: JSON.stringify(`development`),
  VUE_APP_NAME: JSON.stringify(`时时彩票`),
  VUE_APP_VERSION: JSON.stringify(`DEV`),
  VUE_APP_VERSION_ZH: JSON.stringify(`DEV ${new Date().toLocaleString()}`),
  IMAGE_URL: JSON.stringify(`https://image.lm699.com`),
  IS_OFFICIAL:JSON.stringify(false),
  VUE_APP_NAME_FOOTER: JSON.stringify(`百乐门彩票`),
})
