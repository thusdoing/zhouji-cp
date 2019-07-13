import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import * as mutationType from './mutation-type'

import Global from './modules/global.module';
import Author from './modules/author.module';

Vue.use(Vuex)

const state = {
    betRets: [],
    betModel:0,
    mutationType,
    sessionUser:{},
    resultPlay:{
        smallIndexWarpName:null,
        rememberIndex:0,
        smallIndexWarp:0,
        smallIndexInner:0,
        ssgSelItem:null,
    }, //记录投注结果回退 玩法定位
    yjf:[]
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        ...Global, ...Author
    }
})