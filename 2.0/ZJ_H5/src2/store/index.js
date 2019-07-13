import store from '@/store';
// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// /** store */
// const store = new Vuex.Store({
//   strict: false,
//   state: { env: process.env }
// });
// export default store;

// localStorage.setItem('VUE_APP_VERSION', Math.random().toString(16).substr(2));
// console.log(1, localStorage.getItem('VUE_APP_VERSION') != process.env.VUE_APP_VERSION, localStorage.getItem('VUE_APP_VERSION') !== process.env.VUE_APP_VERSION)
// console.log(2, localStorage.getItem('VUE_APP_VERSION'), process.env.VUE_APP_VERSION, store);

// 【producation】生成模式下，每次打包 process.env.VERSION 都会赋值成打包的时间点
// 【development】开发模式下，每次运行也会 process.env.VERSION 都会赋值成打包的时间点
// 如果本地版本与当前版本(process.env.VERSION) 不一致，清空 localstorage, sessionStorage
if (localStorage && localStorage.getItem('VUE_APP_VERSION') != process.env.VUE_APP_VERSION) {
  if (localStorage && typeof localStorage.clear == 'function') { localStorage.clear(); }
  if (sessionStorage && typeof sessionStorage.clear == 'function') { sessionStorage.clear(); }
  localStorage.setItem('VUE_APP_VERSION', process.env.VUE_APP_VERSION);
  localStorage.setItem('VUE_APP_NAME', process.env.VUE_APP_NAME);
}

/** 启用严格模式 */
store.enableStrict = function () {
  if (process.env.NODE_ENV !== 'production') return;
  store.strict = true;
  const vm = store._vm;
  vm.$watch(function () { return vm._data.$$state; }, function () {
    if (process.env.NODE_ENV !== 'production' && !store._committing) {
      throw new Error('[vuex] Do not mutate vuex store state outside mutation handlers.');
    }
  }, { deep: true, sync: true });
};

/** 注册 bets 模块 */
store.registerModule('bet', require('./modules/bet.module').default);

export default store;