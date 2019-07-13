import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import GlobalModule from './module/global.module';
import AuthorMoudle from './module/author.module';
import DebounceModule from './module/debounce.module';

const state = {
	ImgRoot: 'https://mps2.bjgntea.com/', //图片服务器地址
	userInfo: {
	},
	map:{},
	curSel: {
		betTimes: 1,
		groupClassNo: '',
		groupNo: '',
		codeAry: null
	},
	msg:0,
	betSta:"",
	yjf:[],
	yu_e:null,
	homeUrlObj:{},
	openTime:''
};

//Mutations修改状态
const mutations={
	setUserInfo (state,data) {
		// 变更状态
		state.userInfo = data;
	},
	setOpenTime(state,time){
		state.openTime = time
	},
	setmap(state,data){
		state.map = data;
	},
	setCurSel (state, data) {
		state.curSel = data
	},
	setmsg(state,data){
		state.msg = data;
	},
	betS(state,data){
		state.betSta = data
	},
	setyjf(state,data){
		state.yjf = data.split("").sort()
	},
	yu_e(state,data){
		state.yu_e = new Date().getTime();
	},
	homeUrlObj(state,data){
		state.homeUrlObj = data
	}
};

const store =  new Vuex.Store({
	state,
	mutations,
	modules: { ...GlobalModule, ...AuthorMoudle, ...DebounceModule }
});
export default store;
