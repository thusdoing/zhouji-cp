
import axios from 'axios';
import { resolve } from 'path';

const storage = {
  fetchAcct: { time: 0, promise: null },
  fetchNotice: { time: 0, promise: null }
}

export const DebounceModule = {

  /** 启用命名空间 */
  namespaced: true,

  actions: {

    fetchAcct({state}, payload) {
      const time = storage.fetchAcct.time;
      const now = Date.now();

      if (now - time >= 700) {
        storage.fetchAcct.time = now;
        storage.fetchAcct.promise =  new Promise(resolve => {
          axios.get('/getAcct?_=debounce').then(resolve, _ => !0);
        });
      }

      return storage.fetchAcct.promise;
    },

    fetchNotice({state}, payload) {
      const time = storage.fetchNotice.time;
      const now = Date.now();

      if (now - time >= 700) {
        storage.fetchNotice.time = now;
        storage.fetchNotice.promise = new Promise(resolve => {
          axios.get('/getNotice?_=debounce').then(resolve, _ => !0);
        });
      }

      return storage.fetchNotice.promise;
    }
  }
}

export default { debounce: DebounceModule };