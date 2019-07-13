<style lang="less">
.vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
  color: @theme-color!important;
}
</style>

<style lang="less" scoped>
  .app { width: 100%; height: 100%; background-color: #f0eff4; position: absolute; overflow-x: hidden;}
  .content { width: 100%; position: absolute;}
  .iconfont { position: relative; top: -5px;}
  .view { width: 100%;height: 100%;overflow-x: hidden;overflow-y: auto;-webkit-overflow-scrolling: touch }
  .vux-pop-out-enter-active, .vux-pop-out-leave-active, .vux-pop-in-enter-active, .vux-pop-in-leave-active {
    will-change: transform; transition: all 500ms; height: 100%; top: 0; position: absolute; backface-visibility: hidden; perspective: 1000;
  }
  .vux-pop-out-enter { opacity: 0; transform: translate3d(-100%, 0, 0); }
  .vux-pop-out-leave-active { opacity: 0; transform: translate3d(100%, 0, 0); }
  .vux-pop-in-enter { opacity: 0; transform: translate3d(100%, 0, 0); }
  .vux-pop-in-leave-active { opacity: 0; transform: translate3d(-100%, 0, 0); }
  .app-no-xheader {
    .vux-pop-out-enter-active, .vux-pop-out-leave-active, .vux-pop-in-enter-active, .vux-pop-in-leave-active {
      top: 0;
    }
  }
  .vux-fade-leave {
    display: none;
  }
  .app /deep/ .weui-tabbar { background-color: #fff!important; }
  .footers /deep/ i { font-size: 23px; }
</style>

<template>
  <div :class="appCssClass">
    <div v-transfer-dom><loading v-model="vux.loading"></loading></div>
    <!-- <div class="data-dpr data-dpr-1">1</div>
    <div class="data-dpr data-dpr-2">2</div>
    <div class="data-dpr data-dpr-3">3</div> -->
    <template v-if="readyCrypto">
      <component :show="isLogin()" v-if="layout.xheader" :is="layout.xheader" v-bind="layout.props"/>
      <div :style="appCStyle" class="content">
        <transition :name="transitionName" leave-to-class="vux-fade-leave">
          <router-view class="view"/>
        </transition>
      </div>

      <!-- <AppTabbar v-show="layout.tabbar"/> -->
      <tabbar v-show="layout.tabbar" class="tabbar">
        <tabbar-item :selected="CAppTabbar.C_HOME_PAGE == selected" :link="CAppTabbar.C_HOME_PAGE"> <i slot="icon" class="iconfont icon-shouye"></i> <span slot="label">首页</span> </tabbar-item>
        <tabbar-item :selected="CAppTabbar.C_AWARR_CENTER == selected" :link="CAppTabbar.C_AWARR_CENTER"> <i slot="icon" class="iconfont icon-1672jiang"></i> <span slot="label">开奖</span> </tabbar-item>
        <tabbar-item :selected="CAppTabbar.C_DISCOVERY == selected" :link="CAppTabbar.C_DISCOVERY"> <i slot="icon" class="iconfont icon-faxian"></i> <span slot="label">发现</span> </tabbar-item>
        <tabbar-item :selected="CAppTabbar.C_CUSTOMER_SERVICE == selected" :link="CAppTabbar.C_CUSTOMER_SERVICE"> <i slot="icon" class="iconfont icon-lianxikefu"></i> <span slot="label">客服</span> </tabbar-item>
        <tabbar-item :selected="CAppTabbar.C_MEMBER_CENTER == selected" :link="CAppTabbar.C_MEMBER_CENTER"> <i slot="icon" class="iconfont icon-wode"></i> <span slot="label">我的</span> </tabbar-item>
      </tabbar>
      <!-- <wv-tabbar :fixed="true" class="footers">
        <wv-tabbar-item @click.native="$router.push({name: 'home'})"> <i class="iconfont icon-shouye" slot="icon"></i> 首页 </wv-tabbar-item>
        <wv-tabbar-item @click.native="$router.push({name: 'openLotteryList'})"> <i class="iconfont icon-1672jiang" slot="icon"></i> 开奖 </wv-tabbar-item>
        <wv-tabbar-item @click.native="$router.push({name: 'activeInfo'})"> <i class="iconfont icon-faxian" slot="icon"></i> 发现 </wv-tabbar-item>
        <wv-tabbar-item @click.native="$router.push({name: 'custService'})"> <i class="iconfont icon-lianxikefu" slot="icon"></i> 客服 </wv-tabbar-item>
        <wv-tabbar-item @click.native="$router.push({name: 'custInfos'})" is-on> <i class="iconfont icon-wode" slot="icon"></i> 我的 </wv-tabbar-item>
      </wv-tabbar> -->
    </template>
  </div>
</template>

<script>
import { Component, Vue, Watch, State, createStorage } from 'core/decorators';
import { Tabbar, TabbarItem, Loading } from 'vux';
import { isNullOrUndefined } from 'util';

/** 底部菜单产量 */
export class CAppTabbar {
  /** 底部菜单常量类-首页 */
  static C_HOME_PAGE = '/';
  /** 底部菜单常量类-开奖 */
  static C_AWARR_CENTER = '/open_lottery';
  /** 底部菜单常量类-发现 */
  static C_DISCOVERY = '/activeInfo';
  /** 底部菜单常量类-客服 */
  static C_CUSTOMER_SERVICE = '/customer_service';
  /** 底部菜单常量类-我的 */
  static C_MEMBER_CENTER = '/custInfos';
}

// Vue.component('app-x-header', {
//   functional: true,
//   props: ['context'],
//   render (createElement, context) {
//     const xheader = (context.parent.context && context.parent.context.xheader) || {
//       showBack: false, backText: '返回', title: context.parent.$ENV.VUE_APP_NAME
//     };
//     return createElement('x-header', context.data, [
//       xheader.title,
//       xheader.showBack == false && createElement('span', { slot: 'overwrite-left' })
//     ]);
//   }
// });
Vue.component('app-x-header', require('./common/AppXHeader').default);

// 默认头部设定
const DEFAULT_LAYOUT = { xheader: 'app-x-header', tabbar: true, props: {} };

const storage = createStorage('App', [ 'crypto' ], []);

@Component({
  storage, components: { Tabbar, TabbarItem, Loading }
})
export default class App extends Vue {
  /** store-vux */
  @State vux;

  crypto = {}

  /** 是否已注册RSA公匙 */
  readyCrypto = false;

  /** 布局 */
  layout = DEFAULT_LAYOUT;
  get context () { return this.layout.props.context; }

  selected = null;

  /** router-view 动画效果 */
  get transitionName () {
    if (this.$route.path == '/') return '';
    return 'vux-fade';
    // if (this.vux.direction == 'forward') return 'vux-pop-in';
    // if (this.vux.direction == 'reverse') return 'vux-pop-out';
    // return '';
  };

  @Watch('crypto', { immediate: true })
  watchToCrypto() {
    if (!Object.keys(this.crypto).length) return;
    const { modulus, exponent } = this.crypto;
    this.$tools.fetch.registerRSA(exponent, modulus);
    this.readyCrypto = true;
    if (document.getElementById('containerloading')) document.getElementById('containerloading').style.display = 'none';
  }
  /** 获取常量 */
  get CAppTabbar () { return CAppTabbar; }

  /** 动态样式 */
  get appCssClass () { return `app ${this.layout.xheader ? '' : 'app-no-xheader'}`; }

  /** 中间显示层动态样式 */
  get appCStyle () { return `top: ${this.layout.xheader ? 46 : 0}px; bottom: ${this.layout.tabbar ? 52 : 0}px;`; }

  /** 监听路由设置默认头部与尾部 */
  @Watch('$route', { immediate: true }) watch$route () { this.layout = DEFAULT_LAYOUT; this.selected = this.$route.path; }

  created () {
    /** 通过 bus 监听底部头部更改 */
    this.$vux.bus.$on('setLayout', layout => {
      this.layout = { ...DEFAULT_LAYOUT, ...layout };
    });
    this.crypto = { ...this.crypto };

    // this.getCrypto().catch(() => {});
  }

  async getCrypto () {
    const rsp = await this.$tools.fetch('/api/crypto/getCrypto').get();
    if (!rsp.success) {
      await this.$tools.delay(1000);
      return this.getCrypto();
      // if (await this.$vux.confirm({ content: rsp.message, title: '操作提示', confirmText: '重试', cancelText: '刷新' })) {
      //   return this.getCrypto();
      // } else {
      //   window.location.reload(true);
      // }
      // return;
    }
    const { modulus, exponent } = rsp.data;
    this.crypto = { modulus, exponent };
  }
  // 判断是否登录或者掉线状态
  isLogin(){    
      //  this.getOnSession()
        const custInfo=sessionStorage.custInfo||null        
        if(custInfo==null||JSON.parse(custInfo)==null) return true
          return false
        }       
   async getOnSession(){
            const rsp =await this.$tools.fetch('/getOnlineSession').get();                        
            if(!rsp.data.t) this._islogin=true;          
   }
   
}
</script>
