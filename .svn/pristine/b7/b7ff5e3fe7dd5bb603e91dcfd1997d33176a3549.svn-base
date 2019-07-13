// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import WeVue from 'we-vue';
import App from './App'
import router from './router'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 获取常量类
// import { Constant } from '@/constant';
// import { Button, ButtonGroup, Icon, Row, Col, Card, Collapse, CollapseItem, Container, Main, Footer, } from 'element-ui';

import axios from 'axios';
import './api/axios.config';
import api from './api/api';
import { Dialog } from 'we-vue';
import './directive'
import _ from 'lodash'
// import asmd from '@/assets/js/asmd.js';
// import { AlertPlugin, ConfirmPlugin } from 'vux'
import store from './state'

// import Captcha from './components/common/Captcha.vue';
Vue.component('captcha', require('./components/common/Captcha.vue').default);

// import './crypto';
// import './crypto/fetch';

/** 常量类 */
// Vue.prototype.$consts = Constant;

// Vue.use(AlertPlugin)
// Vue.use(ElementUI);
// Vue.use(Button)
// Vue.use(ButtonGroup)
// Vue.use(Icon)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Card)
// Vue.use(Collapse)
// Vue.use(CollapseItem)
// Vue.use(Container)
// Vue.use(Main)
// Vue.use(Footer)

Vue.use(require('./plugin').default);
Vue.use(WeVue);

// Vue.use(ConfirmPlugin)

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$dialog = Dialog;
Vue.prototype.$http = axios;
// Vue.prototype.$asmd = asmd;
const locaUrl = "";//https://web.lm699.com
Vue.prototype.$gpath = locaUrl;
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
const imgPath = function (url) {
  if (process.env.IMAGE_URL) return process.env.IMAGE_URL + url;
  let imglocaUrl = locaUrl || location.origin
  return imglocaUrl.replace(imglocaUrl.substring(imglocaUrl.indexOf('//') + 2, imglocaUrl.indexOf('.')), 'image') + '/' + url.substring(url.indexOf('images/'))
};
Vue.prototype.$imgPath = imgPath;
Vue.prototype.$Date = _Date;
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

import './assets/cover.css'

export default function() {
  new Vue({ el: '#app', store, router, components: { App }, template: '<App/>' });
};
