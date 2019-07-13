<style lang='less'>
	.scopedform {
		input.ivu-input {
			border-radius: 0px !important;
			height: 36px;
		}
		.ivu-form-item-error-tip {
			top: 7px;
			left: 290px;
			white-space: nowrap;
		}
	}
</style>
<style lang='less' scoped>
	._19vt7 img {
		vertical-align: top;
	}
</style>
<template>
	<div>
		<article class="container">
			<div class="_1ib5c center" style="width: 1000px; background-image: url('/static_pc/images/register.png');">
				<h1 class="_3PN1B" style="padding-top: 20px; padding-bottom: 20px;">用户注册</h1>
				<div class="Vxtwm _1Hs7s">
					<p>
						<img src="/static_pc/images/wr.svg" width="14" height="14" class="v-sub mr5"> 请仔细填写您的个人信息，这些信息对您的账号找回、账户提现很重要。
					</p>
				</div>
				<form class="_3NOnv">
					<Form class='scopedform' ref='form' :model='formData' :rules="ruleValidate" :label-width="120">


						<div class="_3iUuB">
							<FormItem style='margin-bottom: 0px;' label="账号:" prop="custName">
								<Input v-model="formData.custName" placeholder="请输入账号"></Input>
							</FormItem>
						</div>
						<div class="_3iUuB">
							<FormItem style='margin-bottom: 0px' label="设置密码:" prop="signPasswd">
								<Input type='password' v-model="formData.signPasswd" placeholder="请输入密码"></Input>
							</FormItem>
						</div>
						<div class="_3iUuB">
							<FormItem style='margin-bottom: 0px' label="确认密码:" prop="agpassword">
								<Input type='password' v-model="formData.agpassword" placeholder="确认密码"></Input>
							</FormItem>
						</div>
						<div v-if="item.codeStatus=='1'&&item.codeKey!='signPasswd'&&item.codeKey!='custName'" class="_3iUuB" v-for="item in configlist">
							<FormItem style='margin-bottom: 0px;' :label="item.codeName+':'" :prop="item.codeKey">
								<Input v-model="formData[item.codeKey]" :placeholder="'请输入'+item.codeName"></Input>
							</FormItem>
						</div>
						<!-- <div class="_3iUuB">
							<FormItem style='margin-bottom: 0px' label="邀请码:" prop="invitedCode">
								<Input v-model="formData.inviteCode" placeholder="请填写邀请码"></Input>
							</FormItem>
						</div> -->




						<div class="_3iUuB">
							<FormItem style='margin-bottom: 0px' label="验证码:" prop='code'>
								<Input v-model="formData.code" placeholder="请输入验证码"></Input>
								<span class="_19vt7">
									<p @click='getVerCode' class="_3QYI3">点击刷新</p>
									<img :src="codepath" width="90" height="auto">
								</span>
							</FormItem>
						</div>
						<div class="_1ANDr">
							<button class="_3GkVN uIz7j" @click='register' style="width: 280px" type="button">注册
							</button>
						</div>
					</Form>
				</form>

			</div>
		</article>
	</div>
</template>

<script>
	import vueQR from 'vue-qr';
	import headerBet from '@/views/betHeader/index.vue'
	import footerCop from '@/views/footer/index.vue'
	import headerCop from '@/views/header/index.vue'
	import leftFloat from '@/views/leftFloat/index.vue'
	import rightFloat from '@/views/rightFloat/index.vue'
	import gamelist from '@/views/gamelist/index.vue'
	import gameTable from '@/views/gameTable/index.vue'
	import axios from 'axios'
	export default {
		data() {
			const validatecustName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error("请输入用户名"));
				} else if (!/^[a-zA-Z\d]+$/.test(value)) {
					return callback(new Error("请正确输入用户名"))
				} else {
					callback();
				}
			};
			const validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.formData.signPasswd) {
					callback(new Error('两次密码输入不一致'));
				} else {
					callback();
				}
			};
			const validateNum = (rule, value, callback) => {
				if (isNaN(Number(value))) {
					callback(new Error('格式错误，请正确填写'));
				} else {
					callback();
				}
			};
			const invitationCode = (rule, value, callback) => {
				let Status = false
				this.configlist.map(item => {
					if (item.codeKey == 'recommendCode' && item.codeStatus == '1') {
						Status = true
					}
				})
				if (Status) {
					if (!this.formData.recommendCode && !value) {
						callback(new Error('邀请码或者推荐码必须填写一个'));
					} else {
						callback();
					}
				} else {
					if (!value) {
						callback(new Error('亲！邀请码为必填，如果你还没有邀请码，请联系24小时在线客服'));
					} else {
						callback();
					}
				}
			};
			return {
				formData: {
					custName: '',
					signPasswd: '',
					agpassword: '',
					code: '',

					custCertNo: '',
					custRealName: '',
					userQq: '',
					contactQq: '',
					contactPhone: '',
					userPhone: '',
					agentNo: '',
					recommendCode: '',
					withPasswd: '',
					invitationCode: '',
					weChat: ''
				},

				configlist: [],
				arr: null,
				flag: true,
				codepath: null,
				ruleValidate: {
					custName: [{
						validator: validatecustName,
						trigger: 'change'
					},
					{
						validator: validatecustName,
						trigger: 'blur'
					},
					{
						min: 6,
						message: '请输入最少6位用户名'
					},
					{
						max: 12,
						message: '最多12位'
					},
					],
					signPasswd: [{
						validator: validatePass,
						trigger: 'change'
					},
					{
						validator: validatePass,
						trigger: 'blur'
					},
					{
						min: 6,
						message: '请输入最少6位'
					},
					{
						max: 12,
						message: '最多12位'
					},
					],
					agpassword: [{
						validator: validatePassCheck,
						trigger: 'change'
					},
					{
						validator: validatePassCheck,
						trigger: 'blur'
					}
					],
					invitationCode: [
						{
							validator: invitationCode,
							trigger: 'blur'
						},
						{
							validator: invitationCode,
							trigger: 'change'
						},
					],
					code: [{
						required: true,
						message: '请填写验证码',
						trigger: 'change'
					},
					{
						required: true,
						message: '请填写验证码',
						trigger: 'blur'
					}
					],
					weChat: [{
						required: true,
						message: '请填写微信号',
						trigger: 'blur'
					}],
					custCertNo: [{
						required: true,
						message: '请填写身份证号码',
						trigger: 'blur'
					},
					{
						validator: validateNum,
						min: 14,
						trigger: 'blur'
					},
					],
					custRealName: [{
						required: true,
						message: '请填写真实姓名,这对您的提款很重要',
						trigger: 'blur'
					}],
					userQq: [{
						required: true,
						min: 6,
						message: '请正确填写QQ',
						trigger: 'blur',
					},
					{
						validator: validateNum,
						trigger: 'blur'
					},
					],
					contactQq: [{
						required: true,
						min: 6,
						message: '请正确填写联系人QQ',
						trigger: 'blur'
					},
					{
						validator: validateNum,
						trigger: 'blur'
					},
					],
					contactPhone: [{
						required: true,
						len: 11,
						message: '请填写联系人电话号码',
						trigger: 'blur'
					},
					{
						validator: validateNum,
						trigger: 'blur'
					},

					],
					userPhone: [{
						required: true,
						len: 11,
						message: '请填写电话号码',
						trigger: 'blur'
					},
					{
						validator: validateNum,
						trigger: 'blur'
					},],
					agentNo: [{
						required: true,
						message: '请填写上级代理',
						trigger: 'blur'
					}],
					withPasswd: [{
						required: true,
						message: '请填写提现密码',
						trigger: 'blur'
					}],
				}
			}
		},
		components: {
			headerBet,
			footerCop,
			headerCop,
			leftFloat,
			rightFloat,
			vueQR
		},
		created() {
			this.getVerCode();
			this.getConfig();
			this.formData.recommendCode = this.$route.query.code || ""
			this.formData.invitationCode = this.$route.query.inviteCode || ""

		},
		watch: {},
		methods: {
			register() {
				let _this = this;
				this.$refs.form.validate(function (valid) {
					if (valid) {
						_this.formData.custRealName = _this.formData.custRealName.trim()
						_this.formData.weChat = _this.formData.weChat.trim()
						axios({
							method: 'post',
							url: '/register',
							data: _this.$transformRequest(_this.formData)
						}).then(function (data) {
							if (data.data.success) {
								sessionStorage.setItem('userInfo',JSON.stringify(data.data.t))
								_this.getAcct()
								if (data.data.map != null && data.data.map.notice != null) {
									// _this.$Spin.show({
									// 	render: (h) => {
									// 		return h('div', {
									// 			style: {
									// 				width: '500px',
									// 				height: '390px',
									// 				background: "#fff",
									// 				borderRadius: '8px',
									// 			}
									// 		}, [
									// 				h('h1', {
									// 					style: {
									// 						fontSize: '18px',
									// 						fontWeight: 'normal',
									// 						padding: '10px',
									// 						color: '#2e4158',
									// 						borderBottom: '1px solid #aaa',

									// 					}
									// 				}, data.data.map.notice.noticeTitle),
									// 				h('div', {
									// 					style: {
									// 						height: '300px',
									// 						textAlign: 'left',
									// 						padding: '15px',
									// 						color: '#2e4158',
									// 						fontSize: '14px',
									// 						letterSpacing: '1px',
									// 						lineHeight: '20px',
									// 					}
									// 				}, data.data.map.notice.noticeContent),
									// 				h('Button', {
									// 					props: {
									// 						type: "primary"
									// 					},
									// 					on: {
									// 						click: () => {
									// 							_this.$Spin.hide()
									// 						}
									// 					},
									// 					style: {
									// 						backgroundColor: '#2e4158',
									// 						borderColor: '#2e4158',
									// 					}
									// 				}, "关闭"),
									// 			])
									// 	}
									// });
								} else {
									// _this.$Modal.success({
									// 	title: '系统提示',
									// 	content: data.data.msg
									// })
                }
                	_this.$Modal.success({
										title: '系统提示',
										content: data.data.msg
									})
								_this.$router.push({ name: "skip", params: { gopath: "/" } })

							} else {
								_this.getVerCode();
								_this.$Modal.error({
									title: '系统错误',
									content: data.data.msg
								})
							}
						});
					} else {
						_this.$Modal.error({
							title: '系统错误',
							content: '注册信息填写不正确,请检查'
						})
						_this.getVerCode();
					}
				})
			},
			getVerCode() {

				this.codepath = "getVerCode?w=90&h=32&date=" + new Date().getTime();

			},
			//            获取用户基本信息
			getAcct() {
				let _this = this;
				// axios({ method: 'get', url: '/getAcct' })
				this.$store.dispatch('debounce/fetchAcct').then((data) => {
					if (data.data.success && data.data.t != null) {
						_this.$store.commit('setUserInfo', data.data.t)
						_this.$store.commit('setmap', data.data.map)
					}
				});
			},
			getCodeByType() {
				let _this = this;
				axios({
					method: 'get',
					url: '/getCodeByType?codeType=agentUrl&status=1'
				}).then((data) => {
					if (data.data.success) {
						if (data.data.list) {
							for (let item of data.data.list) {
								if (item.spvVal.indexOf(location.host.replace('www.', '').replace('web.', '')) >= 0) {
									this.formData.agentNo = item.spvKey
									break
								}
							}
						}
					}

				});
			},
			getConfig() {
				axios({
					method: 'get',
					url: '/getConfig?codeType=register'
				}).then((data) => {
					if (data.data.success && data.data.list != null) {
						this.configlist = data.data.list
						for (let item of data.data.list) {
							if (item.codeKey == 'invitationCode' && item.codeStatus == '0') {
								this.getCodeByType()
								break
							}
						}
					}
				});
			}
		},
	}
</script>
