<template>
    <div>
        <!-- <article class="container"><div class="_1ib5c center" style="width: 825px;"><h1 class="_3PN1B" style="padding-top: 30px; padding-bottom: 30px;">验证原密码</h1>
            <form class="_3vBls"><div class="v2NaK"><label>原密码 : </label><div class="dib relative"><input type="password" class="_218wq s1cJ-" placeholder="请输入密码" maxlength="12" name="oldPassword" value=""><div></div></div></div><div class="_16t4o"><button class="_1sc4M vF3Ii" type="button">
                确定
            </button></div></form>
        </div>
        </article> -->
        <article class="container">
            <div class="_1ib5c center" style="width: 825px;"><h1 class="_3PN1B"
                                                                 style="padding-top: 30px; padding-bottom: 30px;">
                修改{{$route.params.title}}密码</h1>
                <form class="_3vBls">
                    <div class="v2NaK"><label>原密码 : </label>
                        <div class="dib relative"><input type="password" class="_218wq s1cJ-" :placeholder="'请输入原'+$route.params.title+'密码'"
                                                         maxlength="12" name="loginPassword" v-model='formData.oldPwd'>
                            <div></div>
                        </div>
                    </div>
                    <div class="v2NaK"><label>{{$route.params.title}}密码 : </label>
                        <div class="dib relative"><input type="password" class="_218wq s1cJ-" :placeholder="'请输入'+$route.params.title+'密码'"
                                                         maxlength="12" name="loginPassword" v-model='formData.newPwd'>
                            <div></div>
                        </div>
                    </div>
                    <div class="v2NaK"><label>确认密码 : </label>
                        <div class="dib relative"><input type="password" class="_218wq s1cJ-" placeholder="请再输入一次密码"
                                                         maxlength="12" name="confirmPassword"
                                                         v-model='formData.newPwd2'>
                            <div></div>
                        </div>
                    </div>

                    <div class="_3iUuB"><label>验证码 : </label><span class="_19vt7"><p class="_3QYI3" @click='getVerCode'>点击刷新</p><img
                            :src="codepath" width="100" height="auto"></span>
                        <div class="dib relative"><input type="text" class="_3IIXY s1cJ-" placeholder="请输入验证码"
                                                         maxlength="4" name="captcha" v-model="formData.code">
                            <div>
                                <div>
                                    <div class="_1efiA before-vertical"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="_16t4o">
                        <button @click="handleEndit" class="_1sc4M vF3Ii" type="button">
                            确定
                        </button>
                    </div>
                </form>
            </div>
        </article>


    </div>
</template>

<script>

	import footerCop from '@/views/footer/index.vue'
	import headerCop from '@/views/header/index.vue'


	import axios from 'axios'
	export default {
		data() {
			return {
				formData: {
					newPwd:'',
					newPwd2:'',
					code:'',
                },
				codepath: null

			}
		},
		components: {

		},
		created(){
			if(!this.$route.params.title){
				this.$router.go(-1)
			}
			this.getVerCode();
			
		},
		watch: {},
		methods: {
			handleEndit(){
				if(this.$route.params.title=="支付"){
                    this.upWithPwd()
                }else if(this.$route.params.title=="登录"){
					this.enditpwd()
                }else {
					this.$router.go(-1)
                }
            },
		    upWithPwd(){
				let _this = this;
				if (_this.formData.newPwd != _this.formData.newPwd2) {
					_this.$Modal.error({
						title: '系统提示',
						content: '两次新密码不一致,请重新输入'
					})
					_this.formData = {};
				}else if(_this.formData.newPwd.length<6) {
					_this.$Modal.error({
						title: '系统提示',
						content: '密码过短'
					})
				}else {
					axios({
						method: 'post',
						url: '/upWithPwd',
						data: _this.formData
					}).then(function (data) {
						if (data.data.success) {
							_this.$Modal.success({
								title: '系统提示',
								content: '修改成功'
							})
							_this.$router.push('/security')
						} else {
							_this.$Modal.error({
								title: '系统提示',
								content: data.data.msg
							});
							_this.getVerCode();
						}
					})
				}
			},
			enditpwd(){
				let _this = this;
				if (_this.formData.newPwd != _this.formData.newPwd2) {
					_this.$Modal.error({
						title: '系统提示',
						content: '两次新密码不一致,请重新输入'
					})
					_this.formData = {};
				} else if(_this.formData.newPwd.length<6) {
					_this.$Modal.error({
						title: '系统提示',
						content: '密码过短'
					})
				}else {
					axios({
						method: 'post',
						url: '/upPwd',
						data: _this.$transformRequest(_this.formData)
					}).then(function (data) {
						if (data.data.success) {
							_this.$Modal.success({
								title: '系统提示',
								content: '修改成功'
							})
							_this.$router.push('/security')
						} else {
							_this.$Modal.error({
								title: '系统提示',
								content: data.data.msg
							});
							_this.getVerCode();
						}
					})
				}
			},
			getVerCode(){
				let _this = this;
				axios({
					method: 'get',
					url: '/getVerCode',
					params: {w: 90, h: 33},
					responseType: 'blob',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
				}).then(function (data) {
					_this.codepath = window.URL.createObjectURL(data.data)
				});
			},
		},


	}

</script>
