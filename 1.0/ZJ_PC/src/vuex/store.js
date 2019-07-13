import Vue from 'vue';
import Vuex from 'vuex';
import vuexCache from 'vuex-cache'
import axios from 'axios'
import asmd from '@/assets/js/asmd'
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
	openTime:'',
	isstop:false,
	qipaiFlag:false,
	zhenrenFlag:false,
	lxbFlag:false,
	gameAll:[{gameSetting:[{}]}],
	selectedBigGroup: {
		groupClassCones: [{ groupSettinges: [{}] }]
	},
	selectedGroup:{
		groupNo:'',
		bonusAmt:''
	},
	betArr:[],
	gameType:'',
	chaseFlag:false
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
	},
	setisstop(state,data){
		state.isstop = data
	},
	setqipaiFlag(state){
		state.qipaiFlag = true
	},
	setlxbFlag(state){
		state.lxbFlag = true
	},
	setzhenrenFlag(state){
		state.zhenrenFlag = true
	},
	setGameAll(state,data){
		state.gameAll = data
	},
	setselectedGroup(state,data){
		state.selectedGroup = data
	},
	setselectedBigGroup(state,data){
		state.selectedBigGroup = data
	},
	setbetArr(state,data){
		state.betArr=state.betArr.concat(data)
		state.chaseFlag = false
	},
	delbetArr(state,item){
		state.betArr.map((el,index)=>{
			if(el.number==item.number){
				state.betArr.splice(index,1)
			}
		})
		state.chaseFlag = false
	},
	updatedbetArr() {
		state.betArr.map((el,index)=>{
			if(!isNaN(el.betMultiple)&&el.betMultiple>0){
				el.betAmt = asmd.mul(el.betNumber, el.betMultiple, el.eachNoteAmt)
				el.estimateProfit = asmd.sub(asmd.mul(el.bonusAmt , el.betMultiple),el.betAmt)
			}else{
				el.betAmt = 0
				el.estimateProfit = 0
			}
		})
		state.betArr = state.betArr.concat([])
	},
	delbetArrIndex(state,i){
		state.betArr.splice(i,1)
		state.chaseFlag = false
	},
	clearbetArr(state,data){
		state.betArr=[]
		state.chaseFlag = false
	},
	setgameType(state,data){
		state.gameType = data
	},
	setchaseFlag(state,data){
		state.chaseFlag = data
	}
};

const actions = {
	getGameLatestOpenNoList({ state, commit },plod){
		return axios({
			method: 'get',
			url: '/gameOpenNo/getGameLatestOpenNoList',
			params: {
				gameNo: plod.gameNo,
				size: 10,
				showCase: true
			}
		}).then(data=>{
			if(data.data.success){
				return data.data.list
			}
			return []
		})
	},
	getGameGroupByGameWithGroup({ state, commit, dispatch },plod){
		return axios({
			method: 'get',
			url: '/getGameGroupByGameWithGroup',
			params: {
				gameNo: plod.gameNo,
				groupType: plod.groupType
			}
		}).then(data=>{
			if(data.data.success){
				return data.data.list
			}
			return []
		}).catch(e=>{
			setTimeout(()=>{dispatch('getGameGroupByGameWithGroup',plod)},2000)
		})
	},
	getGameBonusByGroupNo({ state, commit, dispatch },groupNo){
		return axios({
			method: 'get',
			url: '/gameGroup/getGameBonusByGroupNo',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			params: {
				groupNo: groupNo
			}
		}).then(data=>{
			if(data.data.success){
				return data.data.list
			}
			return []
		}).catch(e=>{
			setTimeout(()=>{dispatch('getGameBonusByGroupNo',groupNo)},2000)
		})
	}
	
	
}


const store =  new Vuex.Store({
	state,
	mutations,
	actions,
	plugins: [vuexCache],
	modules: { ...GlobalModule, ...AuthorMoudle, ...DebounceModule }
});
export default store;
