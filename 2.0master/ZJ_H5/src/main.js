document.title = process.env.VUE_APP_NAME;

import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'we-vue/lib/style.css';
import run from './main-v1';
import 'vux/src/styles/reset.less';
import 'styles/index.less';

Vue.use(require('../src2/core/plugin').default);

/** 481问题 */
(async function(params) {
  const toAlertLogin = async (message) => {
    this.isShowLoginAlert = true;
    this.$router.push('/');
    if (await this.$vux.confirm({ content: '用户登录已失效', title: '操作提示', confirmText: '去登录' })) {
      this.toLogin();
    }
    this.isShowLoginAlert = false;
  };

  this.$tools.fetch.addErrorInterceptor(rsp => {
    if (rsp.code == 481) {
      this.isLogout = true;
      if (!this.isShowLoginAlert) toAlertLogin();
      rsp.message = null;
    }
  });
}).call(new Vue());

const FastClick = require('fastclick')
FastClick.attach(document.body)

import axios from 'axios';
axios.defaults.baseURL = process.env.BASE_URL;

run();
