export default [
  { path: '/', name: 'root', component: require('../components/App').default, meta: { anon: true },
    children: [
      // 首页
      { path: '', name: 'home_page', component: require('../components/HomePage').default, meta: { anon: true } },
      // 全部彩种
      { path: 'game_groups', name: 'game_groups', component: require('../components/GameGroups').default, meta: { anon: true } },
      // 系统客服
      { path: 'customer_service', name: 'customer_service', component: require('../components/CustomerService').default, meta: { anon: true } },
      // { path: 'customer_service', redirect: '/custService' },
      // 公告
      { path: 'notices', name: 'notices', component: require('../components/Notices').default, meta: { anon: true } },
      // 站内信
      { path: 'notice', name: 'notice', component: require('../components/Notice').default, meta: { anon: true } },
      // 登录
      { path: 'login', name: 'login', component: require('../components/Login').default, meta: { anon: false } },
      // { path: 'login', redirect: '/loginview' },
      // 注册
      // { path: 'register', redirect: { name: 'registerview' } },
      { path: 'register', name: 'register', component: require('../components/Register').default, meta: { anon: true } },
      // 开奖公告
      { path: 'open_lottery', name: 'open_lottery', component: require('../components/OpenLotteryNotcie').default, meta: { anon: true } },
      // 开奖历史
      { path: 'open_lottery/:gameNo', name: 'open_lottery_history', component: require('../components/OpenLotteryHistory').default, meta: { anon: true } },
      // 开奖明细 (代理返点赔率不一样，需要用户认证)
      { path: 'open_lottery/:gameNo/:gameNumber', name: 'open_lottery_detail', component: require('../components/OpenLotteryDetail').default },
      // { path: 'discovery', name: 'discovery', component: require('../components/Discovery').default },
      { path: 'bet_lottery/:gameNo', component: require('../components/bet/BetLottery').default, meta: { anon: true } },
      { path: 'bet_lottery/:gameNo/:gamePlayType', component: require('../components/bet/BetLottery').default, meta: { anon: true } },
      { path: 'bet_lottery/:gameNo/:gamePlayType/:gamePlayNo', name: 'bet_lottery', component: require('../components/bet/BetLottery').default },
      // 投资结果
      { path: 'bet_lottery_result', name: 'bet_lottery_result', component: require('../components/bet/BetLotteryResult').default }
    ]
  },
  { path: 'logout', name: 'logout' }
]
