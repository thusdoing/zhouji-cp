'use strict'
module.exports = {
  /** 是否启用加密 */
  EANBLE_CRYPTO: JSON.stringify(false),
  /** 配置顶级域名，如果没有匹配，自动添加www, 如不启用自动添加顶级域名，设置空字符串 */
  ORIGIN_PREFIXS: JSON.stringify(`www,web`),
  NODE_ENV: JSON.stringify(`production`),
  VUE_APP_NAME: JSON.stringify(`正式彩票`),
  VUE_APP_VERSION: JSON.stringify(`${Date.now()}`),
  VUE_APP_VERSION_ZH: JSON.stringify(`PROD ${new Date().toLocaleString()}`),
  BASE_URL: JSON.stringify(``),
  IMAGE_URL: JSON.stringify(``),

  // 控制进入的页面 
  IS_OFFICIAL:JSON.stringify(true),
}
