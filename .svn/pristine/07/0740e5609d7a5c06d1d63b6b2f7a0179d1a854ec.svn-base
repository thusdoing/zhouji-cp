

import axios from 'axios';
const http = axios.create({ timeout: 10000, baseURL: process.env.BASE_URL });
const storage = {
  fetchAcct: { time: null, promise: null }
}

export const AuthorModule = {
  namespaced: true,

  actions: {

    isLogged({ rootState }) {
      if (Object.keys(rootState.sessionUser || {}).length > 0) return true;
      return Boolean(sessionStorage && sessionStorage.custInfo);
    }

    /**
     * 抓取账户信息
     * 300毫秒
     */
    , async fetchAcct() {
      const time = storage.fetchAcct.time;
      const now = Date.now();
      if (!time || now - time >= 300) {
        storage.fetchAcct.time = Date.now();
        storage.fetchAcct.promise = axios.get('/getAcct')
          .then(
            (data) => ({ isOk: true, ...data }),
            (error) => ({ isOk: false, error })
          );
      }

      return storage.fetchAcct.promise;
    }

    , async fetchOnlineSession() {
      return http.get('/getOnlineSession').then(
        (data) => ({ isOk: true, ...data }),
        (error) => ({ isOk: false, ...error })
      );
    }
  }
}

export default { author: AuthorModule };
