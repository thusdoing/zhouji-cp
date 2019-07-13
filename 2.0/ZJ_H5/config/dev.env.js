'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod-base.env')

module.exports = merge(prodEnv, {
  /** 是否启用加密 */
  EANBLE_CRYPTO: JSON.stringify(false),
  /** 配置顶级域名，如果没有匹配，自动添加www, 如不启用自动添加顶级域名，设置空字符串 */
  ORIGIN_PREFIXS: JSON.stringify(``),
  /** 环境变量模式 */
  NODE_ENV: JSON.stringify(`development`),
  VUE_APP_NAME: JSON.stringify(`本地彩票`),
  VUE_APP_VERSION: JSON.stringify(`DEV`),
  VUE_APP_VERSION_ZH: JSON.stringify(`DEV ${new Date().toLocaleString()}`),
  BASE_URL: JSON.stringify(``),
  IMAGE_URL: JSON.stringify(`https://image.lm699.com`),
  IS_OFFICIAL:JSON.stringify(false),
});
