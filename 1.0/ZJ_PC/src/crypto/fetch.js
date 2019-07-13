import axios from 'axios';
import Crypto from './index';
import qs from 'qs';

const $fetch = axios.create({
  responseType: 'json',
  headers: { 'X-Requested-With': 'XMLHttpRequest', 'X-FRONT-VERSION': process.env.VERSION },
  validateStatus: status => status == 200
});

const warn = (message) => {
  if (process.env.NODE_ENV !== 'development') return;
  setTimeout(() => { throw new Error(message); }, 0);
};

// class FetchError extends Error {
//   success = false;
//   response = null;
//   status = 500;

//   constructor (message, status) {
//     super(message);
//     this.response = { data: { code: status, msg: message }, status };
//   }
// }

const ERRORS_INTERCEPTORS = [];
export function addErrorInterceptor (interceptor) {
  ERRORS_INTERCEPTORS.push(interceptor);
}

class FetchConstructor {
  _eanbleCrypto = false;
  _params = {};
  _url = null;
  _method = 'GET';
  _contentType = 'application/x-www-form-urlencoded';

  constructor (url, params) {
    this._url = url;
    this.setParams(params);
  }

  setMethod (method) {
    this._method = method;
    return this;
  }

  setParam (name, value) {
    this._params[name] = value;
    return this;
  }

  setParams (params) {
    if (params == null || typeof params !== 'object') {
      return this;
    }
    this._params = { ...this._params, ...params };
    return this;
  }

  setJson (json) {
    if (json == null || typeof json === 'undefined') {
      return this;
    }
    this._params = json;
    this.json();
    return this;
  }

  json () {
    this._contentType = 'application/json';
    return this;
  }

  form () {
    this._contentType = 'application/x-www-form-urlencoded';
    return this;
  }

  formData () {
    this._contentType = 'application/form-data';
    return this;
  }

  crypto (eanbleCrypto = true) {
    this._eanbleCrypto = eanbleCrypto;
    return this;
  }

  setCrypto (eanbleCrypto) {
    this.crypto(eanbleCrypto);
    return this;
  }

  enableCrypto () {
    return this.setCrypto(true);
  }
  disableCrypto () {
    return this.setCrypto(false);
  }

  get (params) {
    this.setMethod('GET');
    return this.send(params);
  }
  post (params) {
    this.setMethod('POST');
    return this.send(params);
  }

  send (params) {
    this.setParams(params);

    const params_ = this._params && this._params instanceof Array ? [] : {};
    let formData = null;
    let formParams = null;

    if (this._contentType == 'application/form-data') formData = new FormData();
    // formData = new FormData();

    Object.keys(this._params).forEach(name => {
      const value = this._params[name];
      if (value == null) return true;
      if (typeof value == 'number' && isNaN(value)) return true;
      if (typeof value !== 'object') params_[name] = value;
      else if (value instanceof File) {
        if (formData == null) formData = new FormData();
        formData.append(name, value);
      } else params_[name] = value;
      // } else params_[name] = JSON.stringify(value);
    });

    const isEncrypt = this._eanbleCrypto && Crypto.enable();
    const isFormData = formData != null;
    let G_AES_RULE = null;
    if (isEncrypt) {
      const { rule, crypto, text } = Crypto.encrypt(JSON.stringify(params_));
      G_AES_RULE = rule;
      if (isFormData) {
        formData.append('crypto', crypto);
        formData.append('text', text);
      } else {
        formParams = { crypto, text };
      }
    } else {
      if (isFormData) {
        Object.keys(params_).forEach(name => {
          formData.append(name, params_[name]);
        });
      } else {
        formParams = params_;
      }
    }

    const url = this._url;
    let method = this._method;
    let contentType = this._contentType;
    const promise = (() => {
      // 使用FormData 提交，支持method 'PUT', 'POST', and 'PATCH'
      if (isFormData) {
        if (contentType == 'application/json') {
          warn(new Error('参数包含附件，只能以form-data提交数据。'));
        }
        if (method == 'GET') {
          warn(new Error('FormData (拥有附件File) 不支持GET方式提交数据。'));
          method = 'POST';
        }
        return $fetch({ url, method, data: formData });
      }

      // 使用 json 提交数据 支持method 'PUT', 'POST', and 'PATCH'
      if (contentType == 'application/json') {
        if (method == 'GET') {
          warn(new Error('"application/json" 不支持GET方式提交数据。'));
          method = 'POST';
        }

        return $fetch({ url, method, data: formParams });
      }

      // GET x-www-form-urlencoded 提交数据
      if (method == 'GET') {
        return $fetch({ url, method, params: formParams });
      }
      formParams = qs.stringify(formParams);
      return $fetch.post(url, formParams);
    })();

    return new Promise(async resolve => {
      let rsp = await promise.then(
        response => ({ isOK: true, response }),
        error => ({ isOK: false, error })
      );

      // console.log(rsp, 'rsp');

      // let { status, message } = rsp.error.response;
      // if (status == 404) message = '';

      // console.log(rsp, 'error');

      // 错误消息
      if (!rsp.isOK) {
        const data = rsp.data || {};
        let message = data.msg || data.message;
        if(!message){message='网络不畅，请重试'} 
        let res = { success: false,message,msg:message };
        ERRORS_INTERCEPTORS.forEach(fn => {
          res = fn(res) || res;
        });
        return resolve(res);
      }

      // 状态码为200时
      let { success, code, message, msg, ...data } = rsp.response.data;
      if (msg && !message) message = msg;
      if (isEncrypt && typeof data.data == 'string') {
        const text = Crypto.decrypt(data.data, G_AES_RULE);
        if (text.substr(0, 1) == '{' || text.substr(-1, 1) == '}') data = JSON.parse(text);
      }
      if (typeof success !== 'boolean') success = !code || code == 200;
      if (code && code != 200) {
        let rsp = { message, success, code, data };
        ERRORS_INTERCEPTORS.forEach(fn => {
          rsp = fn(rsp) || rsp;
        });
        resolve(rsp);
        return;
      }
      if (!message) message = '操作成功';
      if (code == null) code = 200;
      return resolve({ success, message, code, data });
    });
  }

  static addErrorInterceptor = addErrorInterceptor;
}

export const fetch = function (url, params) {
  return new FetchConstructor(url, params);
};

fetch.get = function (url, params) {
  return new FetchConstructor(url, params).setMethod('GET').send();
};

fetch.post = function (url, params) {
  return new FetchConstructor(url, params).setMethod('POST').send();
};

fetch.getJson = function (url, params) {
  return new FetchConstructor(url, params).setMethod('GET').json().send();
};

fetch.postJson = function (url, params) {
  return new FetchConstructor(url, params).setMethod('POST').json().send();
};

fetch.addErrorInterceptor = addErrorInterceptor;

fetch.registerRSA = Crypto.registerRSA;

/**
 * 延迟
 * @param {number} time 延迟，单位毫秒
 */
fetch.delay = function (time) {
  return new Promise(resolve => setTimeout(resolve, time));
};

/**
 * 延迟
 * @param {number} time 延迟，单位毫秒
 */
export const delay = fetch.delay;

fetch.defaults = $fetch.defaults;
fetch.interceptors = $fetch.interceptors;

export default fetch;

// (async () => {
//   // const rsp = await $fetch.get('/api/crypto/getCrypto');
//   // const { exponent, modulus } = rsp.data;
//   const { exponent, modulus } = {'modulus': 'f55bbfae88021f69c3e373e293665577552f67132509804955094c00e063ccf73fcd216db6f500ffcc9412ef1e527295c742b19a4426465ab66d96afd3cdf231', 'exponent': '10001'};
//   Crypto.registerRSA(exponent, modulus);

//   let data = { success: 0, error: 0 };
//   const delay = times => new Promise(resolve => setTimeout(resolve, times));
//   const fn = async () => {
//     const fetch = new Fetch('/api/crypto/testCrypto');
//     const formParams = {};
//     formParams['sssss'] = {k: 1, v: 2};
//     formParams['array'] = [{k: 1, v: 2}, {k: 1, v: 2}, {k: 1, v: 2}];
//     fetch.setParams(formParams);

//     fetch.setParam('gjkkk', 'sssss毛笔是我的人' + Math.random().toString(16));
//     const rsp = await fetch.json().post();
//     console.log((rsp.data.code == 200 ? ++data.success : ++data.error, data));

//     console.log(222, rsp);
//     // fn();
//   };

//   fn();
// })();
