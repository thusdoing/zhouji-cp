import storage from 'vuejs-storage';

import router from '../../router';
import store from '../../store';
import * as apis from '../../apis';
import * as consts from '../../consts';
import * as tools from '../tools';

import Authenticate from '../../components/Authenticate';

export default {
  install (Vue) {
    Vue.component('app-img', require('../../components/common/AppImg').default);
    Vue.component('app-scroll', require('../../components/common/AppScroll').default);
    Vue.component('app-captcha', require('../../components/common/AppCaptcha').default);

    toVmApp(Vue);
    toAuthenticateByRouter();
    toVuxTransitationByRouter(false);
    Vue.prototype.$env = process.env;
    Vue.prototype.$apis = apis;
    Vue.prototype.$consts = consts;
    Vue.prototype.$tools = tools;

    Vue.directive('integer', {
      bind: function (el) {
        el.onkeydown = function (event) {
          var k = event.keyCode; // 48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←
          if ((k <= 40 && k >= 37) || (k <= 57 && k >= 48) || (k <= 105 && k >= 96) || (k == 8)) {
            return true;
          } else {
            return false;
          }
        };
        el.onkeyup = function (event) {
          el.value = el.value.replace(/[\u4e00-\u9fa5]/g, '');
        };
      }
    });
  }
};

/** 处理$app */
function toVmApp (Vue) {
  const $app = {};
  const $vux = Vue.$vux;
  Vue.prototype.$app = Vue.$app = $app;

  /**
   * 设置头部与底部组件
   * @param {boolean|string|component} xheader 
   * @param {boolean} tabbar 
   * @param {vm} context 
   */
  $app.setLayout = function (xheader, tabbar, context) {
    if (!xheader) xheader = false;
    else if (typeof xheader === 'string' && xheader !== 'app-x-header') {
      return $vux.bus.$emit('setLayout', { props: { context, title: xheader }, xheader: 'x-header', tabbar });
    } else if (xheader == true) xheader = 'app-x-header';
    $vux.bus.$emit('setLayout', { props: { context }, xheader, tabbar });
  };

  /**
   * 图片地址处理
   * @param {string} url 相对路径图片地址
   */
  $app.toImagePath = function (url) {
    // return `http://image.zhoujicp.com${url}`;
    // return `https://image.lm978.com${url}`;
    if (process.env.IMAGE_URL) return process.env.IMAGE_URL + url;
    let imglocaUrl = location.origin;
    return imglocaUrl.replace(imglocaUrl.substring(imglocaUrl.indexOf('//') + 2, imglocaUrl.indexOf('.')), 'image') + '/' + url.substring(url.indexOf('images/'));
  };

  /**
   * 验证表单
   * @param {vm} $group Vux.group 实例VM
   */
  $app.validate = function ($group) {
    $group.$children.forEach($d => {
      $d.setTouched && $d.setTouched();
      $d.validate && $d.validate();
    });
    const $error = $group.$children.find($d => $d.hasErrors);
    if ($error) {
      const text = (`${$error.title}: ${$error.firstError}`);
      // $error.focus();
      // $group.$vux.toast.show({ text, width: '80%', type: 'text', position: 'bottom' })
      // $group.$vux.alert($error.firstError, $error.title);
      return { title: $error.title, error: $error.firstError, text, toString () { return this.text; } };
    }
    return false;
  };
}

/** 处理Vux动画效果 */
function toVuxTransitationByRouter (enable) {
  /** 注册 vux-module */
  store.registerModule('vux', {
    namespaced: true,
    state: { scrollTop: 0, loading: false, direction: 'forward', history: { count: 0 }, ENV: process.env },
    mutations: {
      updatePosition (state, payload) {
        state.scrollTop = payload.top;
      },
      updateLoadingStatus (state, payload) {
        state.loading = payload.loading;
      },
      updateDirection (state, payload) {
        state.direction = payload.direction;
      },
      setHistoryItem (state, payload) {
        if (state.history[payload.path]) return;
        state.history[payload.path] = Object.keys(state.history).length;
        state.history.count = Object.keys(state.history).length - 1;
      }
    }
  });

  if (enable == false) return;

  const historyStoragePlugin = storage({ namespace: 'store.vux', keys: [ 'vux.history' ], driver: storage.drivers.sessionStorage });
  historyStoragePlugin(store);

  // const history = window.sessionStorage;
  const history = {
    setItem (path) {
      store.commit('vux/setHistoryItem', { path });
    },
    getItem (path) {
      return store.state.vux.history[path];
    }
  };
  // history.clear();
  history.setItem('/', 0);
  let isPush = false; let isBack = false;
  let endTime = Date.now();
  let methods = ['push', 'go', 'replace', 'forward', 'back'];

  document.addEventListener('touchend', () => {
    endTime = Date.now();
  });
  methods.forEach(key => {
    let method = router[key].bind(router);
    router[key] = function (...args) {
      isPush = true;
      method.apply(null, args);
      if (key == 'back') isBack = true;
    };
  });

  router.beforeEach(function (to, from, next) {
    // if (to.matched && to.matched[0] && 'root' != to.matched[0].name) return next();
    // console.log('toVuxTransitationByRouter', to.meta);
    // 是退回操作，且页面一样，继续返回上一层
    if (isBack && to.path == from.path) return router.back();

    store.commit('vux/updateLoadingStatus', { loading: true });
    const toIndex = history.getItem(to.path);
    const fromIndex = history.getItem(from.path);

    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex == '0' && fromIndex == '0')) {
        store.commit('vux/updateDirection', { direction: 'forward' });
      } else {
        // 判断是否是ios左滑返回
        if (!isPush && (Date.now() - endTime) < 377) {
          store.commit('vux/updateDirection', { direction: '' });
        } else {
          store.commit('vux/updateDirection', { direction: 'reverse' });
        }
      }
    } else {
      to.path !== '/' && history.setItem(to.path);
      store.commit('vux/updateDirection', { direction: 'forward' });
    }

    if (/\/http/.test(to.path)) {
      let url = to.path.split('http')[1];
      window.location.href = `http${url}`;
    } else {
      next();
    }
  });

  router.afterEach(function (to) {
    isPush = false; isBack = false;
    store.commit('vux/updateLoadingStatus', { loading: false });
  });
}

// 登录页面拦截，用户认证
function toAuthenticateByRouter () {
  let authenticate;
  // console.log('authenticate', authenticate);
  let timeout = null;
  router.beforeEach(async function (to, from, next) {
    if (!authenticate) authenticate = new Authenticate();
    if (!timeout) timeout = setTimeout(() => authenticate.$vux.loading.show(), 300);
    // await authenticate.beforeEachRouter(to, from, next);
    await next();
    clearTimeout(timeout);
  });

  router.afterEach(function () {
    authenticate.$vux.loading.hide();
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  });
}
