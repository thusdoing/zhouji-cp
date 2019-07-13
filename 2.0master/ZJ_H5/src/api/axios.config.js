import axios from 'axios'
import Vue from 'vue'
import Router from '../router/index'


import { Toast } from 'we-vue'
import { Dialog } from 'we-vue'
const baseURL = 'https://web.lm699.com';
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
    config.baseURL = process.env.BASE_URL;
    config.timeout=60000; //全局设置超时时间
    return config
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  const data = response.data
  if(data.code==='481'){
    Toast.close()
    sessionStorage.custInfo = null;
    Dialog.confirm({title: '提示信息',message: '登录失效，请重新登陆',skin: 'ios'}).then(action => {
        Router.push({name:'loginview'});
    },()=>{})
    return Promise.reject(response);
  }
  return response;

  // throw err
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 481:
      case 999:
        err.message = '登录失效，请重新登陆';
        sessionStorage.custInfo = null;
        Dialog.confirm({title: '提示信息',message: '登录失效，请重新登陆',skin: 'ios'}).then(action => {
            Router.push({name:'loginview'});
        },()=>{})
        break
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求错误,请稍后再试`
        break

      case 405:
        err.message = `请求错误,请稍后再试`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  }else{
    Toast.text({ duration: 1000, message: '网络不给力' });
    return Promise.reject(err)
  }
  return Promise.reject(err)
})

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}

export default axios
