<template>
    <div>
        <!-- <article class="container"><div class="_1ib5c center" style="width: 825px;"><h1 class="_3PN1B" style="padding-top: 30px; padding-bottom: 30px;">验证原密码</h1>
            <form class="_3vBls"><div class="v2NaK"><label>原密码 : </label><div class="dib relative"><input type="password" class="_218wq s1cJ-" placeholder="请输入密码" maxlength="12" name="oldPassword" value=""><div></div></div></div><div class="_16t4o"><button class="_1sc4M vF3Ii" type="button">
                确定
            </button></div></form>
        </div>
        </article> -->
        <article class="container">
            <div class="_1ib5c center" style="width: 825px;"><h1 class="_3PN1B" style="padding-top: 30px; padding-bottom: 30px;">
                找回密码</h1>
                <form class="_3vBls">
                	<template v-if="step==0">
                		<div class="v2NaK"><label>请输入用户名 : </label>
	                        <div class="dib relative">
								<Input style='width: 280px' type="text" placeholder="请输入你的用户名" v-model='formData.custName'></Input>
	                        </div>
	                    </div>

						<div class="_16t4o">
	                        <button @click="getUserQuestion" class="_1sc4M vF3Ii" type="button">
	                            下一步
	                        </button>
	                    </div>
                	</template>
                	<template v-if="step==1">
                		<Form :label-width="120" :model='formData'>
			                <FormItem prop="questionOneId" label="问题一 : ">
			                    <div>{{UserQuestion[0].questionContent}}</div>
			                </FormItem>
			                <FormItem prop="answerOne" label="答案 : ">
			                    <Input type="text" v-model="formData.answerOne" placeholder="请输入答案" style='width: 280px'>
			                    </Input>
			                </FormItem>
			                <FormItem prop="questionTwoId" label="问题二 : ">
			                    <div>{{UserQuestion[1].questionContent}}</div>
			                </FormItem>
			                <FormItem prop="answerTwo" label="答案 : ">
			                    <Input type="text" v-model="formData.answerTwo" placeholder="请输入答案" style='width: 280px'>
			                    </Input>
			                </FormItem>
			                <div class="_16t4o" style="margin-top:0"><button type="button" class="_1sc4M vF3Ii" @click="checkUserQuestion">
			                        下一步
			                    </button></div>
			            </Form> 
                	</template>
                	<template v-if="step==2">
                		<Form :label-width="120" :model='formData'>
			                <div class="_3iUuB">
	                            <FormItem style='margin-bottom: 0px;' label="新密码:" prop="newPwd">
	                                <Input v-model="formData.newPassword" type="password" placeholder="请输入密码" style='width: 280px'></Input>
	                            </FormItem>
	                        </div>
	                        <div class="_3iUuB">
	                            <FormItem style='margin-bottom: 0px;' label="重复新密码:" prop="newPwd2">
	                                <Input v-model="formData.newPassword2" type="password" placeholder="请确认密码" style='width: 280px'></Input>
	                            </FormItem>
	                        </div>

			                <div class="_16t4o" style="margin-top:0"><button type="button" class="_1sc4M vF3Ii" @click="findPassword">
			                        确定
			                    </button></div>
			            </Form> 
                	</template>
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
					custName:'',
					answerOne:'',
					answerTwo:'',
					newPassword:'',
					newPassword2:''
                },
                step:0,
                UserQuestion:[]

			}
		},
		components: {

		},
		created(){
			
		},
		watch: {},
		methods: {
			getUserQuestion(){
				let _this = this;
				axios({
					method: 'post',
					url: '/getUserQuestion',
					data: _this.formData
				}).then(function (data) {
					if (data.data.success) {
						if(data.data.list!=null&&data.data.list!=undefined){
							_this.step = 1;
							_this.UserQuestion = data.data.list
						}else{
							_this.$Modal.error({
								title: '系统提示',
								content: data.data.msg
							})
						}
					} else {
						_this.$Modal.error({
							title: '系统提示',
							content: data.data.msg
						})
					}
				})
			},
			checkUserQuestion(){
				let _this = this;
				axios({
					method: 'post',
					url: '/checkUserQuestion',
					data: _this.formData
				}).then(function (data) {
					if(data.data.success){
						_this.step = 2;
					}else{
						_this.$Modal.error({
							title: '系统提示',
							content: data.data.msg
						})
					}
				})
			},
			findPassword(){
				let _this = this;
				if(_this.formData.newPassword.length<6){
					_this.$Message.error('密码小于6位');
				}else if(_this.formData.newPassword != _this.formData.newPassword2){
					_this.$Message.error('两次密码输入不一致');
				}else{
					axios({
						method: 'post',
						url: '/findPassword',
						data: _this.formData
					}).then(function (data) {
						if(data.data.success){
							_this.$Modal.success({
								title: '系统提示',
								content: data.data.msg
							});
							_this.$router.push('/')
						}else{
							_this.$Modal.error({
								title: '系统提示',
								content: data.data.msg
							})
						}
					})
				}
			},
		    
		},
	}

</script>
