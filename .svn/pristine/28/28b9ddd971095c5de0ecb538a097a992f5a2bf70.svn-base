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
<template>
    <div>

        <article class="container">
            <div class="_1ib5c center" style="width: 825px;"><h1 class="_3PN1B"
                                                                 style="padding-top: 30px; padding-bottom: 30px;">
                设置支付密码</h1>
                <form class="_3vBls">
                    <Form class='scopedform' ref='form' :model='formData' :rules="ruleValidate" :label-width="120">
                        <div class="_3iUuB">
                            <FormItem style='margin-bottom: 0px;' label="支付密码:" prop="newPwd">
                                <Input v-model="formData.newPwd" type="password" placeholder="请输入密码"></Input>
                            </FormItem>
                        </div>
                        <div class="_3iUuB">
                            <FormItem style='margin-bottom: 0px;' label="确认密码:" prop="newPwd2">
                                <Input v-model="formData.newPwd2" type="password" placeholder="请确认密码"></Input>
                            </FormItem>
                        </div>
                    </Form>
                    <div class="_16t4o">
                        <button class="_1sc4M vF3Ii" type="button" @click="upWithPwd">
                            确定
                        </button>
                    </div>
                </form>
            </div>
        </article>


    </div>
</template>

<script>


	import axios from 'axios'
	export default {
		data() {
			const validatnewPwd = (rule, value, callback) => {
				if (!value) {
					return callback(new Error("请输入支付密码"));
				} else if (!/^[a-zA-Z\d]+$/.test(value)) {
					return callback(new Error("请正确输入支付密码"))
				} else {
					callback();
				}
			};
			const validatnewPwd2 = (rule, value, callback)=>{
				if(value!=this.formData.newPwd){
					callback(new Error('两次密码输入不一致'));
                }else {
					callback();
                }
            }
			return {
				formData: {
					newPwd:'',
					newPwd2:''
				},
				arr: null,
				flag: true,
				codepath: null,
				ruleValidate:{
					newPwd:[{validator: validatnewPwd,trigger: 'blur'},{min: 6,message: '请输入最少6位用户名'},{max: 12,message: '请输入最多12位'},],
					newPwd2:[{validator: validatnewPwd2,trigger: 'blur'}]
                }
			}
		},
		components: {},
		created(){
		},
		watch: {},
		methods: {
			upWithPwd(){
				let _this = this;
				this.$refs.form.validate(function (valid) {
					if (valid) {
						axios({
							method: 'post',
							url: '/upWithPwd',
							data: _this.formData
						}).then(function (data) {
							if (data.data.success) {
								_this.$Modal.success({
									title: '系统提示',
									content: data.data.msg
								})
								sessionStorage.setItem('hasWithPwd',true)
								_this.$router.push({name:"skip",params:{gopath:"/security"}})

							} else {
								_this.$Modal.error({
									title: '系统错误',
									content: data.data.msg
								})
							}
						});
					} else {
						_this.$Modal.error({
							title: '系统错误',
							content: '支付密码填写不正确,请检查'
						})
					}
				})
			},
		}


	}

</script>
