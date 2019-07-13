
import axios from 'axios';
const thens = [
  data => ({ success: true, data }),
  error => ({ success: false, error })
];



export const AuthorModule = {
  /** 启用命名空间 */
  namespaced: true

  , state: {
    fetchAuthorInfoAlready: false
  }

  , mutations: {
    setFetchAuthorInfoAlready(state, payload) {
      state.fetchAuthorInfoAlready = payload;
    }
    , setAuthorInfo(...args) {
      console.log('state', args);
    }
  }


  , actions: {
    async fetchLoginStatus({state, commit, dispatch}) {
      if (!state.fetchAuthorInfoAlready) {
        commit('setFetchAuthorInfoAlready', true);
        return await dispatch('fetchAuthorInfo');
      }
      return state.fetchAuthorInfoAlready;
    }
    , async fetchAuthorInfo({ commit, dispatch }) {
      // const rsp = await axios.get('/getAcct').then(...thens);
      const rsp = await dispatch('debounce/fetchAcct', '', { root: true }).then(...thens);
      if (!rsp.success) return false;
      const userInfo = rsp.data.data.t || {};
      commit('setUserInfo', userInfo, { root: true });
      return  true;
    }
    , async fetchOnlineSession() {
      return axios.get('/getOnlineSession').then(
        (data) => ({ isOk: true, ...data }),
        (error) => ({ isOk: false, error })
      );
    }
  }

};

export default { author: AuthorModule };
