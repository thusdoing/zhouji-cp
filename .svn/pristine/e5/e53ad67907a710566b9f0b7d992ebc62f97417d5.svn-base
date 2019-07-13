// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store';
import router from './router'
Vue.config.productionTip = false
const { fetch, delay } = require('./crypto/fetch');
console.log(Vue.prototype.$tools)
Vue.prototype.$tools = { fetch, delay };
/* eslint-disable no-new */
const imgPath = function (url) {
  if (!process.env.IMAGE_URL) return;
  // return `http://image.dwylz.com` + url;
  return process.env.IMAGE_URL + url;
};
Vue.prototype.$imgPath = imgPath;



const _Date = function (date, fmt) { //author: kangge
  if (!date) return '';
  date = new Date(date);
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };

  if (fmt == null || fmt == undefined) {
    fmt = "yyyy-MM-dd hh:mm:ss";
  }

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
Vue.prototype.$date = _Date




new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
