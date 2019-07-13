import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store';
const header = () => import('@/views/header/index.vue')
const homeView = () => import('@/components/homeView/index.vue')
const betView = () => import('@/components/betView/index.vue')
const bet = () => import('@/components/betView/bet2.vue')

const official = () => import('@/components/sscOfficial/index.vue')
const credit = () => import('@/components/sscCredit/index.vue')
// const qipai = () => import('@/components/qipai/index.vue')
const qp = () => import('@/components/qipai/qp.vue')
const looteryHead = () => import('@/components/lotteryHall/index.vue')
const looteryHeadnew = () => import('@/components/lotteryHall/new.vue')
const ln = () => import('@/components/lotteryHall/ln.vue')
const mobilePurchase = () => import('@/components/mobilePurchase/index.vue')
const preferentialActivities = () => import('@/components/preferentialActivities/index.vue')
const actives = () => import('@/components/preferentialActivities/newactive.vue')
const trend = () => import('@/components/trend/index.vue')
const notice = () => import('@/components/notice/index.vue')
const register = () => import('@/components/register/index.vue')
const account = () => import('@/components/notice/cp/account.vue')
const quotaTransfer = () => import('@/components/notice/cp/quotaTransfer.vue')
const bankAccount = () => import('@/components/notice/cp/bankAccount.vue')
const dealingsRecord = () => import('@/components/notice/cp/dealingsRecord.vue')
const security = () => import('@/components/notice/cp/security.vue')
const seekOrder = () => import('@/components/notice/cp/seekOrder.vue')
const statement = () => import('@/components/notice/cp/statement.vue')
const rechargeReport = () => import('@/components/notice/cp/rechargeReport.vue')
const transaction = () => import('@/components/notice/cp/transaction.vue')
const userEmail = () => import('@/components/notice/cp/userEmail.vue')
const openLotteryLnformation = () => import('@/components/openLotteryLnformation/index.vue')
const editLoginPass = () => import('@/components/notice/cp/subCP/editLoginPass.vue')
const editSecurePass = () => import('@/components/notice/cp/subCP/editSecurePass.vue')
const securityQuestion = () => import('@/components/notice/cp/subCP/securityQuestion.vue')
const deposit = () => import('@/components/notice/cp/deposit.vue')
const transactionDetails = () => import('@/components/notice/cp/transactionDetails.vue')
const SeekOrderDetails = () => import('@/components/notice/cp/SeekOrderDetails.vue')
const login = () => import('@/components/notice/cp/login.vue')
const withdraw = () => import('@/components/notice/cp/withdraw.vue')
const news = () => import('@/components/news/index.vue')
const forgetpwd = () => import('@/components/forgetpwd/index.vue')
const lotteryRules = () => import('@/components/lotteryRules/lotteryRules.vue')
const skip = () => import('@/views/betHeader/skip.vue')
const more = () => import('@/components/openLotteryLnformation/more.vue')
const myInvitation = () => import('@/components/notice/cp/myInvitation.vue')
const lixibao = () => import('@/components/notice/cp/lixibao.vue')


const dailiExplain = () => import('@/components/notice/cp/dailiExplain.vue')
const dailibetDetail = () => import('@/components/notice/cp/dailibetDetail.vue')
const dailimemberManage = () => import('@/components/notice/cp/dailimemberManage.vue')
const dailiReport = () => import('@/components/notice/cp/dailiReport.vue')
const dailiSubRegister = () => import('@/components/notice/cp/dailiSubRegister.vue')
const dailiSubReport = () => import('@/components/notice/cp/dailiSubReport.vue')
const dailiTransactionDetail = () => import('@/components/notice/cp/dailiTransactionDetail.vue')
const dailiRebateDes = ()=> import  ( '@/components/notice/cp/dailiRebateDes.vue')
const dailifistRechage = ()=> import ('@/components/notice/cp/dailifistRechage.vue')

const BetViewWrapper = Vue.extend({
  template: `<betview :key="key"/>`,
  components: {betview: betView},
  data() { return { key: Date.now() } },
  watch: {
    ['$route']() {
      this.key = Date.now();
    }
  }
})


const help = () => import('@/components/help/help.vue')
Vue.use(Router)

export const router = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: header,
			children: [
				{
					path: '/homeView',
					name: 'homeView',
					component: homeView,
				}, {
					path: 'forgetpwd',
					name: 'forgetpwd',
					component: forgetpwd,
				},
				{
					path: '',
					name: 'looteryHead',
					component: ln
				},
				// {
				// 	path: '/qipai',
				// 	name: 'qipai',
				// 	component: qipai
				// },
				{
					path: '/looter',
					name: 'looter',
					component: looteryHeadnew
				},
				//新彩票大厅
				{
					path: '/ln',
					name: 'ln',
					component: ln
				},
				{
					path: '/mobilePurchase',
					name: 'mobilePurchase',
					component: mobilePurchase
				},
				{
					path: '/preferentialActivities',
					name: 'preferentialActivities',
					component: preferentialActivities
				},
				{
					path: '/actives',
					name: 'actives',
					component: actives
				},
				{
					path: '/trend',
					name: 'trend',
					component: trend
				},
				{
					path: '/openNum',
					name: 'openNum',
					component: openLotteryLnformation,
					children: [
						{
							path: '/more/:gameNo',
							name: 'more',
							component: more
						},
					]
				},
				{
					path: '/news',
					name: 'news',
					component: news
				}, {
					path: '/login',
					name: 'login',
					component: login
				},
				{
					path: '/help',
					name: 'help',
					component: help
				},
				{
					path: '/notice',
					name: 'notice',
					component: notice,
					children: [
						{
							path: '/account',
							name: 'account',
							component: account
						}, {
							path: '/quotaTransfer',
							name: 'quotaTransfer',
							component: quotaTransfer
						}, {
							path: '/withdraw',
							name: 'withdraw',
							component: withdraw
						}, {
							path: '/myInvitation',
							name: 'myInvitation',
							component: myInvitation
						}, {
							path: '/SeekOrderDetails',
							name: 'SeekOrderDetails',
							component: SeekOrderDetails
						}, {
							path: '/transactionDetails',
							name: 'transactionDetails',
							component: transactionDetails
						},
						{
							path: '/deposit',
							name: 'deposit',
							component: deposit
						},
						{
							path: '/bankAccount',
							name: 'bankAccount',
							component: bankAccount
						},
						{
							path: '/dealingsRecord',
							name: 'dealingsRecord',
							component: dealingsRecord
						},
						{
							path: '/security',
							name: 'security',
							component: security
						},
						{
							path: '/seekOrder',
							name: 'seekOrder',
							component: seekOrder
						},
						{
							path: '/statement',
							name: 'statement',
							component: statement
						},
						{
							path: '/rechargeReport',
							name: 'rechargeReport',
							component: rechargeReport
						},
						{
							path: '/transaction',
							name: 'transaction',
							component: transaction
						},
						{
							path: '/userEmail',
							name: 'userEmail',
							component: userEmail
						},
						{
							path: '/dailiExplain',
							name: 'dailiExplain',
							component: dailiExplain
						},
						{
							path: '/dailibetDetail',
							name: 'dailibetDetail',
							component: dailibetDetail
						},
						{
							path: '/dailimemberManage',
							name: 'dailimemberManage',
							component: dailimemberManage
						},
						{
							path: '/dailifistRechage',
							name: 'dailifistRechage',
							component: dailifistRechage
						},
						{
							path: '/dailiReport',
							name: 'dailiReport',
							component: dailiReport
						},
						{
							path: '/dailiSubRegister',
							name: 'dailiSubRegister',
							component: dailiSubRegister
						},
						{
							path: '/dailiSubReport',
							name: 'dailiSubReport',
							component: dailiSubReport
						},
						{
							path: '/dailiTransactionDetail',
							name: 'dailiTransactionDetail',
							component: dailiTransactionDetail
						},
						{
							path:'/lixibao',
							name:'lixibao',
							component:lixibao,
							beforeEnter:(to,from,next)=>{
								if(from.name == null || store.state.lxbFlag == false){
									return next('/')
								}else{
									return next()
								}
							}
						},
					]
				},
				{
					path: '/editLoginPass',
					name: 'editLoginPass',
					component: editLoginPass
				},
				{
					path: '/editSecurePass',
					name: 'editSecurePass',
					component: editSecurePass
				},
				{
					path: '/securityQuestion',
					name: 'securityQuestion',
					component: securityQuestion
				},
				{
					path: '/register',
					name: 'register',
					component: register
				},
			]
		},
		{
			path: '/lotteryRules/:gameType',
			name: 'lotteryRules',
			component: lotteryRules,
		},
		// {
		// 	path: '/bet/:gameType/:gameNo',
		// 	component: BetViewWrapper,
		// 	beforeEnter: (to, from, next) => {
		// 		// 数据全局官网每注投资金额
		// 		if (from.name == null || store.state.userInfo.custName) {
		// 			(async () => {
		// 				await store.dispatch('global/fetchEachNoteAmt');
		// 				next();
		// 			})();
		// 			return;
		// 		}

		// 		store.commit('betS', new Date().getTime())
		// 		next('/login');

		// 	},
		// 	children: [
		// 		{
		// 			path: '',
		// 			redirect: 'official'
		// 		},
		// 		{
		// 			path: 'official',
		// 			name: 'official',
		// 			component: official
		// 		},
		// 		{
		// 			path: 'credit',
		// 			name: 'credit',
		// 			component: credit
		// 		}
		// 	]
		// },
		{
			path:'/bet/:gameType/:gameNo/:gameMode',
			name:'bet',
			component:bet,
			beforeEnter: (to, from, next) => {
				// 数据全局官网每注投资金额
				if (from.name == null || store.state.userInfo.custName) {
					(async () => {
						await store.dispatch('global/fetchEachNoteAmt');
						next();
					})();
					return;
				}

				store.commit('betS', new Date().getTime())
				next('/login');
			}
		},
		{
			path: '/skip',
			name: 'skip',
			component: skip
		},
		{
			path: '/dailiRebateDes',
			name: 'dailiRebateDes',
			component: dailiRebateDes
		},
		{
			path: '/qp',
			name: 'qp',
			component: qp
		},
		{
			path: '*',
			redirect: '/'
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
});

export default router;

const anons = [];
// 注册
anons[anons.length] = 'register';
// 登录
anons[anons.length] = 'login';
// 忘记密码
anons[anons.length] = 'forgetpwd';
// 公告
anons[anons.length] = 'notice';
// 开奖资讯
anons[anons.length] = 'openNum';
// 开奖历史
anons[anons.length] = 'more';
// 走势图表
anons[anons.length] = 'trend';
// 活动即或活动明细
anons[anons.length] = 'actives';
// 手机购彩
anons[anons.length] = 'mobilePurchase';
// 购彩大厅
anons[anons.length] = 'looteryHead';
//新购彩大厅
anons[anons.length] = 'ln'
// 首页
anons[anons.length] = 'homeView';
// 新闻
anons[anons.length] = 'news'
// 帮助
anons[anons.length] = 'help'
// 帮助
anons[anons.length] = 'lotteryRules'
//棋牌
anons[anons.length] = 'qipai'
//棋牌
anons[anons.length] = 'qp'

router.beforeEach(async (to, from, next) => {
  const name = to.name;
  if (!name) return next();

  if (anons.indexOf(name) != -1) return next();
  // 獲取vuex-store
  const store = router.app.$options.store;
	const $Modal = router.app.$Modal;
  // 前端是否已有标记登录， 否没有标记登录,调转登录页面
  // const isLogged = Boolean(store.state.userInfo && store.state.userInfo.custName)
  const isLogged = Boolean(sessionStorage.getItem('userInfo'));

  // 实时查询登录 从session获取用户信息，是否已失效
  const rsp = await store.dispatch('author/fetchOnlineSession');
  const { isOk, data } = rsp;
  if (!isOk) return
  if ( isOk && data.t != null) return next();

  if (sessionStorage) sessionStorage.clear();
  store.commit('setUserInfo', {});
  store.commit('setmap', {});

  // 前端是否已有标记登录， 否没有标记登录,调转登录页面
  if (!isLogged) {
    if (from && from.name && from.name == 'looteryHead') {
      return $Modal.info({title: '提示信息',content: '请登录'})
    }
    return next('/looteryHead');
  }

  // 弹出消息提示
  if (from && from.name && from.name == 'looteryHead') {
    return $Modal.info({title: '提示信息',content: '登录失效，请重新登陆'})
  }
  await new Promise(resolve => $Modal.info({title: '提示信息',content: '登录失效，请重新登陆', onOk: resolve }));
  return next('/looteryHead');
})
