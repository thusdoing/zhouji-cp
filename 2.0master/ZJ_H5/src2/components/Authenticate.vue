
<script>
import { Component, Vue, Throttle, createStorage } from 'core/decorators';
import axios from 'axios';
import router from '@/router';

const storage = createStorage('Authenticate', [], ['author']);

@Component({ template: '', storage, router })
export default class Authenticate extends Vue {
  author = {};
  isLogout = false;
  isNoFetchAuthor = true;

  fetch = axios.create({});

  isShowLoginAlert = false;

  get isLogin () {
    return this.isReady && this.author != null && !this.isLogout;
  }

  get isEverLogin () {
    return this.isReady;
  }

  get hasAuthor () {
    return Object.keys(this.author || {}).length != 0;
  }

  async getOnlineSession () {
    const rsp = await this.fetch('/getOnlineSession').then(r => ({ isOK: true, ...r }), r => ({ isOK: false, ...r }));
    if (rsp.isOK) {
      if (this.hasAuthor && !rsp.data.t) this.isLogout = true;
      this.author = rsp.data.t || {};
      this.isNoFetchAuthor = false;
    }
    return rsp;
  }

  @Throttle
  async toLogout () {
    const rsp = await this.fetch('/loginOut').then(r => ({ isOK: true, ...r }), r => ({ isOK: false, ...r }));
    if (!rsp.isOK && await this.$vux.confirm({ content: '网络信号较差，是否重试?', confirmText: '去重试', title: '操作提示' })) {
      return this.toLogout();
    }
    return rsp;
  }
  async toGetOnlineSession (to, from, next) {
    const rsp = await this.getOnlineSession();
    if (!rsp.isOK) {
      if (!from.path) {
        await next({ path: '/', replace: true });
        await this.$tools.delay(100);
        this.$router.back();
        return false;
      }
      if (await this.$vux.confirm({ content: '网络信号较差，是否重试?', confirmText: '去重试', title: '操作提示' })) {
        await this.toGetOnlineSession(to, from, next);
      }
      return false;
    }
    return true;
  }

  /** 注销用户 */
  async logout (to, from, next) {
    this.$router.push({ path: '/', replace: true });
    await this.toLogout();
    this.isLogout = false;
    this.author = null;
    if (sessionStorage && sessionStorage.clear) sessionStorage.clear();
  }

  async toLogin () {
    this.$router.push({ path: '/login', meta: { authenticated: true } });
  }

  async beforeEachRouter (to, from, next) {
    // authenticate.$vux.loading.show();
    const isToLogin = to.name == 'login';
    const isToLogout = to.name == 'logout';
    // 非登录页面，且可以拥有匿名访问标记的页面，放行，不做拦截处理
    if (to.meta.anon || to.meta.authenticated) return next();

    // 是logout路由
    if (isToLogout) return this.logout(to, from, next);

    if (this.isLogout) {
      if (!from.path) next('/');
      if (await this.$vux.confirm({ content: '用户登录已失效', title: '操作提示', confirmText: '去登录' })) {
        this.toLogin();
      }
      return;
    }

    if (!this.hasAuthor && this.isNoFetchAuthor) {
      if (!await this.toGetOnlineSession(to, from, next)) return;
    }

    if (!this.hasAuthor) return isToLogin ? next() : this.toLogin();

    if (isToLogin) {
      this.$router.push({ path: '/', replace: true });
      return true;
    }
    next();
  }

  created () {
    const self = this;
    Vue.prototype.$login = author => (self.author = author || {});
    Vue.prototype.$logout = () => this.logout.bind(this);

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
  }
}
</script>
