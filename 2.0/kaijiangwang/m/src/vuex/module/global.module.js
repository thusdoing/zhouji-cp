
import axios from 'axios';
const then = [
  data => ({success: true, data}),
  error => ({success: false, error})
];

export const GlobalModule = {
  /** 启用命名空间 */
  namespaced: true,

  /** State */
  state: {
    /** 
     * 官方玩法全局每注投资金额 
     * 2018-08-25 小雨提供服务接口
     */
    eachNoteAmt: 0
  }

  /** mutations  */
  , mutations: {
    setEachNoteAmt(state, payload) {
      state.eachNoteAmt = payload;
    }
  }

  /** Action */
  , actions: {
    async fetchEachNoteAmt({state, commit}) {
      if (state.eachNoteAmt) return state.eachNoteAmt;
      const rsp = await axios.get(`/getSysCodeInfo?codeKey=eachNoteAmt`).then(...then);
      if (!rsp.success) {return;}
      const {codeValue: eachNoteAmt = 0} = rsp.data.data.t || {};
      commit("setEachNoteAmt", eachNoteAmt);
      return eachNoteAmt;
    }
  }
};

export default { global: GlobalModule };