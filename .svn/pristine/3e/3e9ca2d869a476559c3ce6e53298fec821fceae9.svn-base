// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Vue from 'vue'
import iView from 'iview';
Vue.use(iView);
import 'iview/dist/styles/iview.css';
import './assets/css/main.css';

import axios from 'axios';
import axc from './axios.config';
import store from './vuex/store';
import asmd from '@/assets/js/asmd.js';
import './directive';
import _ from 'lodash';
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
const transformRequest = function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}
const imgPath = function (url) {
  if (!url) return;
  if (process.env.IMAGE_URL) return process.env.IMAGE_URL + url;
  return location.origin.replace(location.origin.substring(location.origin.indexOf('//') + 2, location.origin.indexOf('.')), 'image') + '/' + url.substring(url.indexOf('images/'))
};
Vue.prototype.$imgPath = imgPath;
Vue.prototype.$transformRequest = transformRequest;
Vue.prototype.$asmd = asmd;
Vue.config.productionTip = false

if (process.env.NODE_ENV == 'production') {
  var fundebug = require("fundebug-javascript");
  fundebug.apikey = "c53f628ff2c52673909df9eab2adc584e3e8d355e344a1326f9ffebf3c342c75";
  function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';
    var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');
  }

  Vue.config.errorHandler = function (err, vm, info) {
    var componentName = formatComponentName(vm);
    var propsData = vm.$options && vm.$options.propsData;
    fundebug.notifyError(err, { metaData: { componentName, propsData, info } });
  };

}


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


Vue.prototype.$notice = function(title, content) {
  const render = (h) => {
    return h('div',{ style:{ width:'500px', height:'390px', background:"#fff", borderRadius: '8px', } }, [
        h('h1', { style:{ fontSize: '18px', fontWeight: 'normal', padding: '10px', color: '#2e4158', borderBottom: '1px solid #aaa', } },title),
        h('div', { style:{ height:'300px', textAlign: 'left', padding: '15px', color: '#2e4158', fontSize:'14px', letterSpacing: '1px', lineHeight: '20px', overflow: 'auto' }, domProps: { innerHTML: content.split(/\s+/).join('<br>') }, }),
        h('Button', { props:{ type:"primary" }, on:{ click:()=>{ this.$Spin.hide() } }, style:{ backgroundColor: '#2e4158', borderColor: '#2e4158', } },"关闭"),
    ]);
  };
  this.$Spin.show({ render });
}

const { fetch, deplay } = require('./crypto/fetch');
Vue.prototype.$tools = { fetch, deplay };

// fetch.addErrorInterceptor(rsp => {
//   if (481 == rsp.code) {
//     // 用户登录已失效
//   }
// });

Vue.prototype.$http = axios;
Vue.prototype.$ENV = process.env;
/* eslint-disable no-new */
import router from './router'

// import mock from 'mockjs'
// mock.mock('/gameOpenNo/getGameNextOpenNo?gameNo=8801',function(){return {"code":null,"success":true,"msg":null,"t":{"gameNo":"6601","gameName":"香港六合彩","gameNumber":"2019150","startSaleDt":1546177200000,"stopSaleDt":1546521600000,"openGameDt":1546522500000,"insertDt":1546374904000,"smallImgPath":"/images/7511a1e6-38ca-4e32-b09a-47ae182c5e1c.png","gameStatus":"1","gamePattern":"0","restTime":"112495","restSaleTime":"900"},"xml":null,"url":null,"list":[],"map":{},"params":{},"pageNo":1,"pageSize":10,"pages":0,"totalSize":0,"orderByField":null}})
// mock.mock('/gameOpenNo/getGameLatest````OpenNo?gameNo=8801',function(){return {"code":null,"success":true,"msg":null,"t":{"gameNo":"6601","gameName":"香港六合彩","gameNumber":"2018124","gameOpenNo":"8,8,4,20","gameOpenDt":1541079297000,"gameStatus":"1","gameOpenNoCase":null},"xml":null,"url":null,"list":[],"map":{},"params":{},"pageNo":1,"pageSize":10,"pages":0,"totalSize":0,"orderByField":null}})
// mock.mock('/getGameGroupByGameWithGroup?gameNo=8801', function () {
//   return {
//     "code":null,"success":true,"msg":null,"t":null,"xml":null,"url":null,"list":[{"groupClassNo":"2200","groupClassName":"和值","gameType":"22","groupClassCones":[{"groupClassConNo":"220011","groupClassConName":"和值","groupSettinges":[{"groupNo":"770122001100","groupName":"和值","groupNameAlias":null,"bonusAmt":380.93,"gamePattern":0,"multipleMin":1.00,"multipleMax":5000.00}]}]},{"groupClassNo":"1100","groupClassName":"同号","gameType":"22","groupClassCones":[{"groupClassConNo":"110022","groupClassConName":"两同号","groupSettinges":[{"groupNo":"221111002211","groupName":"两同号单选","groupNameAlias":null,"bonusAmt":120.31,"gamePattern":0,"multipleMin":1.00,"multipleMax":5000.00},{"groupNo":"221111002222","groupName":"两同号复选","groupNameAlias":null,"bonusAmt":24.06,"gamePattern":0,"multipleMin":1.00,"multipleMax":5000.00}]},{"groupClassConNo":"110033","groupClassConName":"三同号","groupSettinges":[{"groupNo":"221111003311","groupName":"三同号单选","groupNameAlias":null,"bonusAmt":380.93,"gamePattern":0,"multipleMin":1.00,"multipleMax":5000.00},{"groupNo":"221111003322","groupName":"三同号复选","groupNameAlias":null,"bonusAmt":60.15,"gamePattern":0,"multipleMin":1.00,"multipleMax":5000.00}]}]},{"groupClassNo":"3300","groupClassName":"三连号","gameType":"22","groupClassCones":[{"groupClassConNo":"330011","groupClassConName":"三连号","groupSettinges":[{"groupNo":"221133001111","groupName":"三连号","groupNameAlias":null,"bonusAmt":15.54,"gamePattern":0,"multipleMin":1.00,"multipleMax":5000.00}]}]},{"groupClassNo":"4400","groupClassName":"不同号","gameType":"22","groupClassCones":[{"groupClassConNo":"440022","groupClassConName":"两不同号","groupSettinges":[{"groupNo":"221144002211","groupName":"两不同号","groupNameAlias":null,"bonusAmt":13.03,"gamePattern":0,"multipleMin":1.00,"multipleMax":5000.00}]},{"groupClassConNo":"440033","groupClassConName":"三不同号","groupSettinges":[{"groupNo":"221144003311","groupName":"三不同号","groupNameAlias":null,"bonusAmt":60.15,"gamePattern":0,"multipleMin":1.00,"multipleMax":5000.00}]}]}],"map":{},"params":{},"pageNo":1,"pageSize":10,"pages":0,"totalSize":0,"orderByField":null
//   }
// }) 


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
