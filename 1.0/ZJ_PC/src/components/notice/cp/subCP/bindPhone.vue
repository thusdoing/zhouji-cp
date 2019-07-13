<template>
    <div>
        <article class="container"><div class="_1ib5c center" style="width: 825px;"><h1 class="_3PN1B" style="padding-top: 30px; padding-bottom: 30px;">设置密保手机</h1>
            <div class="_1xpYe"><form><div><label>手机号：</label><div class="cvq7J"><div class="ge2TD"><button type="button" class="false _3s5iP undefined">
            +86
        </button><span id="countryCode"><div class="_1tYAp">
                    <li class="_2p1n1">+86</li><li class="_2p1n1">+852</li><li class="_2p1n1">+853</li>
            </div><div class="_2Yobq"></div><span></span></span></div></div><input type="hidden" name="countryCode" value="+86"><div class="dib relative"><input type="text" class="_3ee7p s1cJ-" placeholder="请输入您要绑定的手机号码" maxlength="11" name="phone" value=""><div></div></div></div><div style="margin: 50px 0px 247px 138px;"><button class="_1sc4M _25sfA" type="button">发送验证码</button></div></form></div>
        </div></article>


    </div>
</template>

<script>

import footerCop from '@/views/footer/index.vue'
import headerCop from '@/views/header/index.vue'


import axios from 'axios'
export default {
    data() {
        const validatecustName = (rule, value, callback)=>{
            if(!value){
                return callback(new Error("请输入用户名"));
            }else if(!/^[a-zA-Z\d]+$/.test(value)){
                return callback(new Error("请正确输入用户名"))
            }else{
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
        return {
            formData:{
                custName:'',
                signPasswd:'',
                agpassword:'',
                code:''
            },
            arr:null,
            flag : true,
            codepath:null,
            ruleValidate: {
                custName: [
                    { validator: validatecustName, trigger: 'change' },
                    { validator: validatecustName, trigger: 'blur' },
                    {min:6,message:'请输入最少6位用户名'},
                    {max:12,message:'请输入最多12位'},
                ],
                signPasswd: [
                    { validator: validatePass,  trigger: 'change' },
                    { validator: validatePass,  trigger: 'blur' },
                    {min:6,message:'请输入最少6位'}
                ],
                agpassword:[
                    {validator: validatePassCheck, trigger: 'change'},
                    {validator: validatePassCheck, trigger: 'blur' }
                ],
                verCode: [
                    { validator: validatePass,  trigger: 'change' },
                    { validator: validatePass,  trigger: 'blur' }
                ]
            }
        }
    },
    components: { footerCop,headerCop

    },
    created(){
        this.getVerCode();
    },
    watch:{
    },
    methods:{
        register(){
            let _this = this;
            this.$refs.form.validate(function(valid){
                if(valid){
                    axios({
                        method: 'post',
                        url: '/register',
                        data:_this.$transformRequest({
                          custName: _this.formData.custName,
                          signPasswd: _this.formData.signPasswd,
                          code: _this.formData.code
                        })
                    }).then(function(data){
                        if(data.data.success){
                            _this.$router.push('/')
                            _this.$Modal.success({
                                title:'系统提示',
                                content:data.data.msg
                            })
                            
                        }else{
                            _this.getVerCode();
                            _this.$Modal.error({
                                title:'系统错误',
                                content:data.data.msg
                            })
                        }
                    });
                }else{
                    _this.$Modal.error({
                        title:'系统错误',
                        content:'注册信息填写不正确,请检查'
                    })
                    _this.getVerCode();
                }

            })

            
            
        },
        getVerCode(){
            let _this = this;
            axios({
                method: 'get',
                url: '/getVerCode',
                params:{w:90,h:33},
                responseType: 'blob' ,
                 headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }).then(function(data){
                _this.codepath = window.URL.createObjectURL(data.data)
            });
        },
    },
        

}

</script>
