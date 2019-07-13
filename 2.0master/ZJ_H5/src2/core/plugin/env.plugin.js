
export default {
  install (Vue) {
    const ENV = process.env;
    Vue.prototype.$ENV = ENV;
    Vue.prototype.$ENV.IS_PRODUCTION = ENV.NODE_ENV == 'production';
    Vue.prototype.$ENV.IS_DEVELOPMENT = ENV.NODE_ENV == 'development';
  }
}
;
