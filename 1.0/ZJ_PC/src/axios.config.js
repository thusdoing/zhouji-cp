import axios from 'axios'
import Vue from 'vue'
import Router from './router'
import store from './vuex/store';
import {Message, Modal} from 'iview'

const baseURL = '';
Vue.prototype.$baseURL = baseURL;
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
	config.headers['X-Requested-With'] = 'XMLHttpRequest';
	config.timeout=60000; //全局设置超时时间
	// config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	config.baseURL = baseURL;
	config.withCredentials = true;

	return config
})
// 拦截响应response，并做一些错误处理
let count = 0; //记录捕获异常次数
axios.interceptors.response.use((response) => {
	const data = response.data
	if(data.code==='481'){
		localStorage.clear();
		sessionStorage.clear();
		store.commit('setUserInfo', {});
		store.commit('setmap', {});
		Message.warning({
			content: data.msg,
			duration: 3,
			onClose: function () {
				Message.destroy();
				Router.push({
					path: '/login'
				});
				// Router.go(0);
			}
		})
		return Promise.reject(data)
	}
	return response;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
	let data = err.response&&err.response.data||"";
	if (count >= 1) {
		// return;
	}
	console.log(err,err.response)
	if (err && err.response) {
		switch (err.response.status) {
			case 481:
				count++;
				err.message = '登录失效，请重新登陆';
				localStorage.clear();
				sessionStorage.clear();
				store.commit('setUserInfo', {});
				store.commit('setmap', {});
				Message.warning({
					content: err.message,
					duration: 3,
					onClose: function () {
						Message.destroy();
						Router.push({
							path: '/login'
						});
						// Router.go(0);
					}
				})
				break
			case 581:
				Modal.error({
					title: '提示',
					content: data.errorMsg
				});
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

		Message.warning({
			content:err.message,
			duration: 3,
			onClose: function () {
				Message.destroy();
			}
		})

	} else {
		err.message = '请求超时';
		Message.warning({
			content: '网络好像走丢了！再试试吧！',
			duration: 3,
			onClose: function () {
				Message.destroy();
			}
		})
	}
	return Promise.reject(err)
})

axios.install = (Vue) => {
	Vue.prototype.$axios = axios
}

export default axios
