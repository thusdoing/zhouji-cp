import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home'//首页
// import openLottery from '@/components/openLottery'//开奖子路由
// import active from '@/components/active'//发现子路由
// import custService from '@/components/custService'//客服
// import custInfo from '@/components/custInfo'//我的账户子路由
// import login from '@/components/login'//登录
// import register from '@/components/register'//注册
// import forgetPwd from '@/components/forgetPwd'//忘记密码
// import openLotteryList from '@/components/openLotterys/openLotteryList'//所有彩种最近一期开奖记录
// import gameOpenLottery from '@/components/openLotterys/gameOpenLottery'//一个彩种开奖记录
// import gameOpenLotteryInfo from '@/components/openLotterys/gameOpenLotteryInfo'//一个彩种开奖记录
// import activeInfo from '@/components/actives/activeInfo'//发现
// import custInfos from '@/components/custInfos/custInfos'//我的账户（简介）
// import msgList from '@/components/custInfos/msgList'//消息
// import custBaseInfo from '@/components/custInfos/custBaseInfo'//我的账户（编辑）
// import updateLoginPwd from '@/components/custInfos/updateLoginPwd'///修改登录密码
// import settingPayPwd from '@/components/custInfos/settingPayPwd'//设置支付密码
// import betRecords from '@/components/custInfos/betRecords'//投注记录
// import more from '@/components/custInfos/more'//更多
// import profitLoss from '@/components/custInfos/profitLoss'//今日盈亏
// import rechargeWithList from '@/components/custInfos/rechargeWithList'//充提记录
// import drawMoney from '@/components/custInfos/drawMoney'//提现
// import recharge from '@/components/custInfos/recharge'//充值
// import activity from '@/components/actives/activity'//活动列表
// import activeDetails from '@/components/actives/activeDetails'//活动列表
// import betView from '@/components/bet/betView.vue'//投注页面
// import officaPlay from '@/components/bet/officaPlay/index.vue'//投注页面 ()官方玩法)
// import msgContent from '@/components/msgContent'//消息详情页面
// import moreGame from '@/components/moreGame'//更多玩法
// import news from '@/components/actives/news'//新闻
// import newsDetail from '@/components/actives/newsDetail'//新闻详情
// import creditPlay from '@/components/bet/creditPlay/index.vue'//投注页面 ()信用玩法)
// import gameIntroduce from '@/components/actives/gameIntroduce.vue'//玩法介绍
// import gameGroupIntroduce from '@/components/actives/gameGroupIntroduce.vue'//玩法介绍
// import atmRecharge from '@/components/custInfos/rechargecomp/atmRecharge.vue'//银行卡充值
// import betResult from '@/components/bet/betResult.vue'
// import betDetails from '@/components/bet/betDetails.vue'// 注单详情
// import trendChart from '@/components/actives/trendChart.vue'//走势图
// import listBankCard from '@/components/listBankCard.vue'//绑定银行卡
// import addBankCard from '@/components/addBankCard.vue'//添加银行卡
// import addBankCardSelect from '@/components/addBankCardSelect.vue'//添加银行卡选择
// import zhifuerweima from '@/components/custInfos/rechargecomp/onlpay.vue'//支付二维码
// import paybankshow from '@/components/custInfos/rechargecomp/paybankshow.vue'//支付二维码
// import agent from '@/components/custInfos/agent/index.vue'
// import subRegister from '@/components/custInfos/agent/subRegister.vue'
// import manage from '@/components/custInfos/agent/manage.vue'
// import subReport from '@/components/custInfos/agent/subReport.vue'
// import betDatail from '@/components/custInfos/agent/betDatail.vue'
// import transactionDetail from '@/components/custInfos/agent/transactionDetail.vue'
// import agentReport from '@/components/custInfos/agent/agentReport.vue'
// import explain from '@/components/custInfos/agent/explain.vue'
// import rebateDes from '@/components/custInfos/agent/rebateDes.vue'


Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    // import home from '@/components/home'//首页
    // { path: '/', name: 'home', component: require('@/components/home').default },
    // { path: '/', name: 'home', component: require('@/components/home').default },
    // import zhifuerweima from '@/components/custInfos/rechargecomp/onlpay.vue'//支付二维码
    // { path: '/zhifuerweima', name: 'zhifuerweima', component: zhifuerweima },
    { path: '/zhifuerweima', name: 'zhifuerweima', component: require('@/components/custInfos/rechargecomp/onlpay.vue').default },
    // import paybankshow from '@/components/custInfos/rechargecomp/paybankshow.vue'//支付二维码
    // { path: '/paybankshow', name: 'paybankshow', component: paybankshow },
    { path: '/paybankshow', name: 'paybankshow', component: require('@/components/custInfos/rechargecomp/paybankshow.vue').default },
    // import login from '@/components/login'//登录
    // { path: '/loginview', name: 'loginview', component: login },
    // { path: '/loginview', name: 'loginview', component: require('@/components/login').default },
    // { path: '/loginview', name: 'loginview', redirect: '/login' },
    // { path: '/login', name: 'login', component: require('@/components/login').default },
    { path: '/loginview', name: 'loginview', redirect: '/login' },
    // import register from '@/components/register'//注册
    // { path: '/registerview', name: 'registerview', component: register },
    // { path: '/registerview', name: 'registerview', component: require('@/components/register').default },
    // { path: '/register', name: 'register', component: require('@/components/register').default },
    { path: '/registerview', name: 'registerview', redirect: '/register' },
    // import forgetPwd from '@/components/forgetPwd'//忘记密码
    // { path: '/forgetPwd', name: 'forgetPwd', component: forgetPwd },
    { path: '/forgetPwd', name: 'forgetPwd', component: require('@/components/forgetPwd').default },
    // import moreGame from '@/components/moreGame'//更多玩法
    // { path: '/moreGameview', name: 'moreGameview', component: moreGame },
    { path: '/moreGameview', name: 'moreGameview', component: require('@/components/moreGame').default },
    // import msgContent from '@/components/msgContent'//消息详情页面
    // { path: '/msgContentview', name: 'msgContentview', component: msgContent },
    { path: '/msgContentview', name: 'msgContentview', component: require('@/components/msgContent').default },
    // import agent from '@/components/custInfos/agent/index.vue'
    // { path: '/agent', name: 'agent', component: agent },
    { path: '/agent', name: 'agent', component: require('@/components/custInfos/agent/index.vue').default },
    // import subRegister from '@/components/custInfos/agent/subRegister.vue'
    // { path: '/subRegister', name: 'subRegister', component: subRegister },
    { path: '/subRegister', name: 'subRegister', component: require('@/components/custInfos/agent/subRegister.vue').default },
    // import manage from '@/components/custInfos/agent/manage.vue'
    // { path: '/manage', name: 'manage', component: manage },
    { path: '/manage', name: 'manage', component: require('@/components/custInfos/agent/manage.vue').default },
    // import subReport from '@/components/custInfos/agent/subReport.vue'
    // { path: '/subReport', name: 'subReport', component: subReport },
    { path: '/subReport', name: 'subReport', component: require('@/components/custInfos/agent/subReport.vue').default },
    
    { path: '/rechargeNumber', name: 'rechargeNumber', component: require('@/components/custInfos/agent/rechargeNumber.vue').default },
    // { path: '/payNumber', name: 'payNumber', component: require('@/components/custInfos/agent/payNumber.vue').default },
    { path: '/teamBettingDetails', name: 'teamBettingDetails', component: require('@/components/custInfos/agent/teamBettingDetails.vue').default },
    { path: '/registerNumber', name: 'registerNumber', component: require('@/components/custInfos/agent/registerNumber.vue').default },

    // import betDatail from '@/components/custInfos/agent/betDatail.vue'
    // { path: '/betDatail', name: 'betDatail', component: betDatail },
    { path: '/betDatail', name: 'betDatail', component: require('@/components/custInfos/agent/betDatail.vue').default },
    // import transactionDetail from '@/components/custInfos/agent/transactionDetail.vue'
    // { path: '/transactionDetail', name: 'transactionDetail', component: transactionDetail },
    { path: '/transactionDetail', name: 'transactionDetail', component: require('@/components/custInfos/agent/transactionDetail.vue').default },
    // import agentReport from '@/components/custInfos/agent/agentReport.vue'
    // { path: '/agentReport', name: 'agentReport', component: agentReport },
    { path: '/agentReport', name: 'agentReport', component: require('@/components/custInfos/agent/agentReport.vue').default },
    // import explain from '@/components/custInfos/agent/explain.vue'
    // { path: '/explain', name: 'explain', component: explain },
    { path: '/explain', name: 'explain', component: require('@/components/custInfos/agent/explain.vue').default },
    // import rebateDes from '@/components/custInfos/agent/rebateDes.vue'
    // { path: '/rebateDes', name: 'rebateDes', component: rebateDes },
    { path: '/rebateDes', name: 'rebateDes', component: require('@/components/custInfos/agent/rebateDes.vue').default },
    // import openLottery from '@/components/openLottery'//开奖子路由
    // { path: '/openLottery', name: 'openLottery', component: openLottery,
    { path: '/openLottery', name: 'openLottery', component: require('@/components/openLottery').default,
      children: [
        // import openLotteryList from '@/components/openLotterys/openLotteryList'//所有彩种最近一期开奖记录
        // { path: '/openLotteryList', name: 'openLotteryList', component: openLotteryList },
        // { path: '/openLotteryList', name: 'openLotteryList', component: require('@/components/openLotterys/openLotteryList').default },
        { path: '/openLotteryList', name: 'openLotteryList', redirect: '/open_lottery' },
        // import gameOpenLottery from '@/components/openLotterys/gameOpenLottery'//一个彩种开奖记录
        // { path: '/gameOpenLottery/:gameType/:gameNo/:gameName', name: 'gameOpenLottery', component: gameOpenLottery },
        // { path: '/gameOpenLottery/:gameType/:gameNo/:gameName', name: 'gameOpenLottery', component: require('@/components/openLotterys/gameOpenLottery').default },
        { path: '/gameOpenLottery/:gameType/:gameNo/:gameName', name: 'gameOpenLottery', beforeEnter(to, from, next) {
          const {gameNo} = to.params;
          next(`/open_lottery/${gameNo}`);
        }  },
        // import gameOpenLotteryInfo from '@/components/openLotterys/gameOpenLotteryInfo'//一个彩种开奖记录
        // { path: '/gameOpenLotteryInfo/:gameType/:gameNo/:gameName/:result/:date/:period', name: 'gameOpenLotteryInfo', component: gameOpenLotteryInfo }
        // { path: '/gameOpenLotteryInfo/:gameType/:gameNo/:gameName/:result/:date/:period', name: 'gameOpenLotteryInfo', component: require('@/components/openLotterys/gameOpenLotteryInfo').default }
        { path: '/gameOpenLotteryInfo/:gameType/:gameNo/:gameName/:result/:date/:period', name: 'gameOpenLotteryInfo', beforeEnter(to, from, next) {
          const {gameNo, period} = to.params;
          next(`/open_lottery/${gameNo}/${period}`);
        } }
      ]
    },
    // import activeDetails from '@/components/actives/activeDetails'//活动列表
    // { path: '/activeDetails', name: 'activeDetails', component: activeDetails },
    { path: '/activeDetails', name: 'activeDetails', component: require('@/components/actives/activeDetails').default },
    // import active from '@/components/active'//发现子路由
    // { path: '/active', name: 'active', component: active,
    { path: '/active', name: 'active', component: require('@/components/active').default,
      children: [
        // import activeInfo from '@/components/actives/activeInfo'//发现
        // { path: '/activeInfo', name: 'activeInfo', component: activeInfo },
        { path: '/activeInfo', name: 'activeInfo', component: require('@/components/actives/activeInfo').default },
        // import activity from '@/components/actives/activity'//活动列表
        // { path: '/activityview', name: 'activityview', component: activity },
        { path: '/activityview', name: 'activityview', component: require('@/components/actives/activity').default },
        // import news from '@/components/actives/news'//新闻
        // { path: '/newsview', name: 'newsview', component: news },
        { path: '/newsview', name: 'newsview', component: require('@/components/actives/news').default },
        // import trendChart from '@/components/actives/trendChart.vue'//走势图
        // { path: '/trendChart', name: 'trendChart', component: trendChart },
        { path: '/trendChart', name: 'trendChart', component: require('@/components/actives/trendChart.vue').default },
        // import newsDetail from '@/components/actives/newsDetail'//新闻详情
        // { path: '/newsDetailview/:newsId', name: 'newsDetailview', component: newsDetail },
        { path: '/newsDetailview/:newsId', name: 'newsDetailview', component: require('@/components/actives/newsDetail').default },
        // import gameIntroduce from '@/components/actives/gameIntroduce.vue'//玩法介绍
        // { path: '/gameIntroduce', name: 'gameIntroduce', component: gameIntroduce },
        { path: '/gameIntroduce', name: 'gameIntroduce', component: require('@/components/actives/gameIntroduce.vue').default },
        // import gameGroupIntroduce from '@/components/actives/gameGroupIntroduce.vue'//玩法介绍
        // { path: '/gameGroupIntroduce/:gameType/:gameNo/:gameName', name: 'gameGroupIntroduce', component: gameGroupIntroduce }
        { path: '/gameGroupIntroduce/:gameType/:gameNo/:gameName', name: 'gameGroupIntroduce', component: require('@/components/actives/gameGroupIntroduce.vue').default }
      ]
    },
    // import custService from '@/components/custService'//客服
    // { path: '/custService', name: 'custService', component: custService },
    // { path: '/custService', name: 'custService', component: require('@/components/custService').default },
    { path: '/custService', name: 'custService', redirect: '/customer_service' },
    // import custInfo from '@/components/custInfo'//我的账户子路由
    // { path: '/custInfo', name: 'custInfo', component: custInfo,
    { path: '/custInfo', name: 'custInfo', component: require('@/components/custInfo').default,
      children: [
        // import custInfos from '@/components/custInfos/custInfos'//我的账户（简介）
        // { path: '/custInfos', name: 'custInfos', component: custInfos },
        { path: '/custInfos', name: 'custInfos', component: require('@/components/custInfos/custInfos').default },
        // import msgList from '@/components/custInfos/msgList'//消息
        // { path: '/msgList', name: 'msgList', component: msgList },
        { path: '/msgList', name: 'msgList', component: require('@/components/custInfos/msgList').default },
        // import custBaseInfo from '@/components/custInfos/custBaseInfo'//我的账户（编辑）
        // { path: '/custBaseInfo', name: 'custBaseInfo', component: custBaseInfo },
        { path: '/custBaseInfo', name: 'custBaseInfo', component: require('@/components/custInfos/custBaseInfo').default },
        // import updateLoginPwd from '@/components/custInfos/updateLoginPwd'///修改登录密码
        // { path: '/updateLoginPwd', name: 'updateLoginPwd', component: updateLoginPwd },
        { path: '/updateLoginPwd', name: 'updateLoginPwd', component: require('@/components/custInfos/updateLoginPwd').default },
        // import settingPayPwd from '@/components/custInfos/settingPayPwd'//设置支付密码
        // { path: '/settingPayPwd', name: 'settingPayPwd', component: settingPayPwd },
        { path: '/settingPayPwd', name: 'settingPayPwd', component: require('@/components/custInfos/settingPayPwd').default },
        // import betRecords from '@/components/custInfos/betRecords'//投注记录
        // { path: '/betRecordsview', name: 'betRecordsview', component: betRecords },
        { path: '/betRecordsview', name: 'betRecordsview', component: require('@/components/custInfos/betRecords').default },
        // import more from '@/components/custInfos/more'//更多
        // { path: '/more', name: 'more', component: more },
        { path: '/more', name: 'more', component: require('@/components/custInfos/more').default },
        // import profitLoss from '@/components/custInfos/profitLoss'//今日盈亏
        // { path: '/profitLoss', name: 'profitLoss', component: profitLoss },
        { path: '/profitLoss', name: 'profitLoss', component: require('@/components/custInfos/profitLoss').default },
        { path: '/rechargeReport', name: 'rechargeReport', component: require('@/components/custInfos/rechargeReport').default },
        { path: '/quotaTransfer', name: 'quotaTransfer', component: require('@/components/custInfos/quotaTransfer').default },
        { path: '/kyBetRecords', name: 'kyBetRecords', component: require('@/components/custInfos/kyBetRecords').default },

        //kyBetRecords
        // import rechargeWithList from '@/components/custInfos/rechargeWithList'//充提记录
        // { path: '/rechargeWithList', name: 'rechargeWithList', component: rechargeWithList },
        { path: '/rechargeWithList', name: 'rechargeWithList', component: require('@/components/custInfos/rechargeWithList').default },
        // import drawMoney from '@/components/custInfos/drawMoney'//提现
        // { path: '/drawMoney', name: 'drawMoney', component: drawMoney },
        { path: '/drawMoney', name: 'drawMoney', component: require('@/components/custInfos/drawMoney').default },
        // import recharge from '@/components/custInfos/recharge'//充值
        // { path: '/recharge', name: 'recharge', component: recharge },
        { path: '/recharge', name: 'recharge', component: require('@/components/custInfos/recharge').default },
        // import atmRecharge from '@/components/custInfos/rechargecomp/atmRecharge.vue'//银行卡充值
        // { path: '/atmRecharge/:bankType/:payMoney', name: 'atmRecharge', component: atmRecharge },
        { path: '/atmRecharge/:bankType/:payMoney', name: 'atmRecharge', component: require('@/components/custInfos/rechargecomp/atmRecharge.vue').default },
      ]
    },
    // import betView from '@/components/bet/betView.vue'//投注页面
    // {
    //   path: '/bet/:gameType/:gameNo/:gameName',
    //   // component: betView,
    //   component: require('@/components/bet/betView.vue').default,
    //   beforeEnter: async (to, from, next) => {
    //     const store = router.app.$options.store;

    //     // const isLogged = await store.dispatch('author/isLogged');

    //     // // 前端是否已有标记登录， 否没有标记登录,调转登录页面
    //     // if (!isLogged) return next('/loginview');

    //     // // 实时查询登录 从session获取用户信息，是否已失效
    //     // const { isOk, data } = await store.dispatch('author/fetchAcct');
    //     // if (!isOk || data.t == null) {
    //     //   return next('/loginview');
    //     // }

    //     // 抓取全局投资金额
    //     await store.dispatch('global/fetchEachNoteAmt');



    //     if (from.path != '/betResult') {
    //       store.commit(router.app.$options.store.state.mutationType.CHANGE_RESULTPLAY, {
    //         resultPlay: {
    //           rememberIndex: 0,
    //           smallIndexWarp: 0,
    //           smallIndexInner: 0,
    //           smallIndexWarpName: '',
    //           ssgSelItem: null
    //         }
    //       })
    //       store.commit('clear_betResult')
    //       next();
    //     } else {
    //       next();
    //     }
    //   },
    //   children: [
    //     { path: '', redirect: 'officaPlay', },
    //     // import officaPlay from '@/components/bet/officaPlay/index.vue'//投注页面 ()官方玩法)
    //     // { path: 'officaPlay', name: 'officaPlay', component: officaPlay },
    //     { path: 'officaPlay', name: 'officaPlay', component: require('@/components/bet/officaPlay/index.vue').default },
    //     // import creditPlay from '@/components/bet/creditPlay/index.vue'//投注页面 ()信用玩法)
    //     // { path: 'creditPlay', name: 'creditPlay', component: creditPlay }
    //     { path: 'creditPlay', name: 'creditPlay', component: require('@/components/bet/creditPlay/index.vue').default }
    //   ]
    // },
    // import listBankCard from '@/components/listBankCard.vue'//绑定银行卡
    // { path: '/listBankCard', name: 'listBankCard', component: listBankCard },
    { path: '/listBankCard', name: 'listBankCard', component: require('@/components/listBankCard.vue').default },
    // import addBankCard from '@/components/addBankCard.vue'//添加银行卡
    // { path: '/addBankCard', name: 'addBankCard', component: addBankCard },
    { path: '/addBankCard', name: 'addBankCard', component: require('@/components/addBankCard.vue').default },
    // import addBankCardSelect from '@/components/addBankCardSelect.vue'//添加银行卡选择
    // { path: '/addBankCardSelect', name: 'addBankCardSelect', component: addBankCardSelect },
    { path: '/addBankCardSelect', name: 'addBankCardSelect', component: require('@/components/addBankCardSelect.vue').default },
    // import betDetails from '@/components/bet/betDetails.vue'// 注单详情
    // { path: '/betDetails', name: 'betDetails', component: betDetails },
    { path: '/betDetails', name: 'betDetails', component: require('@/components/bet/betDetails.vue').default },
    // import betResult from '@/components/bet/betResult.vue'
    // { path: '/betResult', name: "betResult", component: betResult },
    { path: '/betResult', name: "betResult", component: require('@/components/bet/betResult.vue').default },

    ...require('../../src2/router/routes').default,

    { path: '*', redirect: '/' }
    // , { path: '/agentBetDetail', name: 'AgentBetDetail', component: require('@/components/custInfos/agent/AgentBetDetail').default }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});



// 排除以下路由，不走登錄驗證
// 首頁 home
// 開獎 openLotteryList
// 注册 registerview
// 登錄 loginview
// 發現 activeInfo
// 客服 custService
// 活動詳情 activityview
// 活動詳情明細 activeDetails
// 走勢圖 trendChart
// 忘记密码 forgetPwd
const anons = ["home", "registerview", "forgetPwd", "openLotteryList", "activeInfo", "custService", "activityview", "activeDetails", " trendChart"];
const thens = [_ => true, _ => false];

// 解决页面路由跳转，空白页面，跳转首页，后期提示，首页也有提示，界面弹窗重复
Vue.prototype.isRedirect = false;
const loginInterceptor = async (to, from, next) => {
  if ('home' == to.name) return next('/');

  // 非登录页面，且可以拥有匿名访问标记的页面，放行，不做拦截处理
  if (to.meta.anon || to.meta.authenticated) return next();

  const name = to.name;
  if (!name) return next();

  if (anons.indexOf(name) != -1) return next();

  // console.log(111, to, to.matched && to.matched[0] && 'root' == to.matched[0].name);
  // if (to.matched && to.matched[0] && 'root' == to.matched[0].name) return next();

  // 对话框
  const $dialog = router.app.$dialog;
  const $toast = router.app.$toast;

  // 獲取vuex-store
  const store = router.app.$options.store;
  // 前端是否已有标记登录， 否没有标记登录,调转登录页面
  const isLogged = await store.dispatch('author/isLogged');
  // 是否登录路由
  const isLoginRouter = 'login' === to.name;

  const now = Date.now();
  // 延迟300毫秒出现loading效果
  let timeout = setTimeout(() => { $toast.loading('加载中...'); timeout = null; }, 300);
  // 实时查询登录 从session获取用户信息，是否已失效
  const rsp = await store.dispatch('author/fetchOnlineSession');
  // 判断是否已经延迟loading,如果出现，清除loaidng,如果未出现清除定时器
  timeout ? clearTimeout(timeout) : $toast.close();

  // const { isOk, data } = rsp;
  // if ( isOk && data.t != null) return next();
  const { isOk, status = 404, data } = rsp;

  // isOk
  // 404 网络不稳定; 客户网络，服务商网络(cdn, dns)，我们自己的服务器网络
  // 200 调用接口
  // 500 服务崩了
  if (404 == status) {
    // 初次页面，打开, 非正常状态，先跳转首页
    if (!from.name) { next('/'); Vue.prototype.isRedirect = true; }
    if(await $dialog.confirm({title: '提示信息',message: '网络信号较差，请重试', confirmButtonText: '重试'}).then(...thens)) {
      if (!from.name) {
        const {name, params, query} = to;
        return router.push({name, params, query});
      }
      return loginInterceptor(to, from, next);
    }
    return;
  }
  if (500 == status) {
    // 初次页面，打开, 非正常状态，先跳转首页
    if (!from.name) { next('/'); Vue.prototype.isRedirect = true; }
    if(await $dialog.confirm({title: '提示信息',message: '网络连接异常，请重试', confirmButtonText: '重试'}).then(...thens)) {
      if (!from.name) {
        const {name, params, query} = to;
        return router.push({name, params, query});
      }
      return loginInterceptor(to, from, next);
    }
    return;
  }

  // data.t == null 用户未登录， 用户已失效, 长期不用，被人挤掉了，服务重启了，后台操作禁用用户
  // 用户正常
  if ( isOk && data.t != null) {
    if (!isLogged) {
      sessionStorage.custInfo = JSON.stringify(data.t);
      store.commit(store.state.mutationType.SET_USER, data.t);
    }
    if (Date.now() - now > 1000 * 5) {
       // 初次页面，打开, 非正常状态，先跳转首页
      if (!from.name) { next('/'); Vue.prototype.isRedirect = true; }
      if(await $dialog.confirm({title: '提示信息',message: '网络信号较差，请重试.', confirmButtonText: '重试'}).then(...thens)) {
        if (!from.name) {
          const {name, params, query} = to;
          return router.push({name, params, query});
        }
        return loginInterceptor(to, from, next);
      }
      return;
    }
    if (!isLoginRouter) return next();
    // 当前用是登录的
    // 有可能是用户刷新的，直接走登录路由地址
    // 退回登录页面
    return next('/');
  }

  if (isLoginRouter) return next();

  // 前端是否已有标记登录， 否没有标记登录,调转登录页面
  if (!isLogged) {
    return next('/login');
  }

  // 如果 from.name 登录路由，且用户未登录，就不跳转
  if ('login' === from.name) return;

  // 初次页面，打开, 非正常状态，先跳转首页
  if (!from.name) {
    if (!from.name) { next('/'); Vue.prototype.isRedirect = true; }
    if(await $dialog.confirm({title: '提示信息',message: '登录失效，请重新登录',skin: 'ios', confirmButtonText: '去登录'}).then(...thens)) {
      return router.push('/login');
    }
    return;
  }

  if(await $dialog.confirm({title: '提示信息',message: '登录失效，请重新登录',skin: 'ios', confirmButtonText: '去登录'}).then(...thens)) {
    return next('/login');
  }
}
router.beforeEach(loginInterceptor);

export default router;
