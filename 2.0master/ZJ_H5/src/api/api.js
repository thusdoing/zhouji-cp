import axios from 'axios'
import { Toast } from 'we-vue'
/**
 * 转换 请求参数 满足 后台表单方式提交参数类型
 * @param {*} data 
 */
const transformRequest = function (data) {
    let ret = ''
    for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
    return ret
  }

/**
 * API接口调用方式 .then(function(data){console.log(data)}); 回去方法返回值
 * 例如在登录页面调用登录接口 : 
 *  this.$api.postForm('login',this.loginParam).then(function(data){ 
 *     console.log(data); 
 *  }); 
 */
const api = {

    /**
     * API-postForm 对应 后台 FORM 表单类型的提交方式 
     */
    postForm : (url, param,type) => { if(type){Toast.loading({duration:0,message:'加载中'});} return axios({method:"post",url:url,headers: {'Content-Type': 'application/x-www-form-urlencoded'}, data:transformRequest(param)}).then((res) => {if(type){Toast.close();} return res.data}); },

    /**
     * API-post 对应 后台 application/json 类型的提交方式
     */
    post : (url, param,type) => { if(type){Toast.loading({duration:0,message:'加载中'});} return axios({method:"post",url:url, data:param,headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((res) => {if(type){Toast.close();} return res.data}); },
    
    /**
     * API-get 对应 后台 get 方式的请求
     */
    get : (url, param, type) => { if(type){Toast.loading({duration:0,message:'加载中'});} return axios({method:"get",url:url, params:param}).then((res) => {if(type){Toast.close();} return res.data}); }

}
export default api;