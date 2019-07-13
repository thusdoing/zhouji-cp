<template>
    <article class="container">
        <div class="_1ib5c center" style="width: 1000px; background-image: url(&quot;https://mps2.bjgntea.com/mpsing/storage/Mongo/project_2_d/assets/9ebb7b9613b08af38d43d57b0545ed9b.png&quot;);">
            <h1 class="_3PN1B F_07" style="padding-top: 20px; padding-bottom: 20px;">用户登陆</h1>
            <Form style="width:400px;margin-bottom: 160px" :label-width="120">
                <FormItem label="账号：">
                    <Input v-model="formData.custName" placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem label="密码：">
                    <Input v-model="formData.pwd" type="password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="验证码：">
                    <Input v-model="formData.verCode" placeholder="请输入验证码"></Input>
                    <div style="width: 70px;height: 28px;background: saddlebrown;position: absolute;top: 4px;right: 2px;">
                        <img @click="getVerCode" style="width: 70px;height: 28px;display: block;" :src="codepath"></div>
                </FormItem>
                <div class="_1DQUl">
                    <button @click="check" type="button" class="_1Boqf _2o4m0 mr30">
                        登陆
                    </button>
                    <div class="_1GnFy f7 dib" @click="$router.push('/forgetpwd')">
                        忘记密码?
                    </div>
                </div>
            </Form>
        </div>
    </article>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                formData:{
                    custName: '',
					pwd: '',
					verCode: ''
                },
                codepath:""
            }
        },
        created(){

        },
        mounted(){
            this.getVerCode();
        },

        methods:{
            getVerCode() {
				this.codepath = "getVerCode?w=100&h=45&date=" + new Date().getTime();
            },
            check(){
                if(this.formData.pwd.length<6){
                    this.$Modal.error({
							title: '系统提示',
							content: "密码位数不足6位"
                        })
                        return
                }else if(this.formData.verCode.length!=4){
                    this.$Modal.error({
							title: '系统提示',
							content: "请正确填写验证码"
                        })
                        return
                }
                this.login()
            },
            async login() {
                let _this = this;
                
                const rsp = await this.$tools.fetch('/api/login').setCrypto(true).post({ ...this.formData});
                if (!rsp.success) {
                    this.getVerCode();
                    if (rsp.message) return this.$Modal.error({ title: '系统错误', content: rsp.message })
                    return;
                }
                sessionStorage.setItem('userInfo',JSON.stringify(rsp.data.t))
                this.getAcct();

                if (this.$route.path == '/login') this.$router.push({ path: '/', replace: true});

                if (rsp) return;

				axios({
					method: 'post',
					url: '/login',
					data: this.$transformRequest(_this.formData)
				}).then(function (data) {
					if (data.data.success) {
                        sessionStorage.setItem('userInfo',JSON.stringify(data.data.t))
                        _this.getAcct();
                        // if(data.data.map!=null&&data.data.map.notice!=null){
                        //     _this.$Spin.show({
                        //         render: (h) => {
                        //             return h('div',{ style:{ width:'500px', height:'390px', background:"#fff", borderRadius: '8px', } }, [
                        //                 h('h1', { style:{ fontSize: '18px', fontWeight: 'normal', padding: '10px', color: '#2e4158', borderBottom: '1px solid #aaa', } },data.data.map.notice.noticeTitle),
                        //                 h('div', { style:{ height:'300px', textAlign: 'left', padding: '15px', color: '#2e4158', fontSize:'14px', letterSpacing: '1px', lineHeight: '20px', overflow: 'auto' }, domProps: { innerHTML: data.data.map.notice.noticeContent.split(/\s+/).join('<br>') }, }),
                        //                 h('Button', { props:{ type:"primary" }, on:{ click:()=>{ _this.$Spin.hide() } }, style:{ backgroundColor: '#2e4158', borderColor: '#2e4158', } },"关闭"),
                        //             ])
                        //         }
                        //     });
                        // }
                        // setTimeout(() => {
                        //     _this.$router.go(-1)
                        // }, 1000);

					} else {
						_this.$Modal.error({
							title: '系统错误',
							content: data.data.msg
						})
						_this.getVerCode()
					}
				});
            },
            //            获取用户基本信息
		    getAcct(){
                this.reload = true
				let _this = this;
                //axios({ method: 'get', url: '/getAcct'})
                this.$store.dispatch('debounce/fetchAcct').then((data) => {
                    this.reload = false
					if (data.data.success && data.data.t!=null) {
						_this.$store.commit('setUserInfo', data.data.t)
						_this.$store.commit('setmap', data.data.map)
                        sessionStorage.setItem('hasWithPwd',data.data.map.hasWithPwd)
					}else{
                        _this.$store.commit('setUserInfo', {})
                        _this.$store.commit('setmap', {})
                        sessionStorage.setItem('hasWithPwd',false)
                    }
				});
            },
        }
    }
</script>

<style scoped>

</style>
