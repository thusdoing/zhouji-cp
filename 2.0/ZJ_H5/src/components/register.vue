<style scoped>
@import '../assets/header.css';
@import 'custInfos/css/updateLoginPwd.css';
.update-pwd-main>>>.weui-cell label{width: 45px!important;}
</style>
<template>
    <div>
        <wv-header title="注册" class="header" >
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div ref="registers" class="index-main update-pwd-main">
            <wv-group>
                <wv-input :label="itemImg.username" @blur="checkName" placeholder="用户名" v-model="registerParam.custName" pattern="^[a-zA-Z0-9_]{6,12}$" :validate-mode="{onFocus: false}" required></wv-input>
                <wv-input type="password" :label="itemImg.password" placeholder="密码" v-model="registerParam.signPasswd" required></wv-input>
                <wv-input type="password" :label="itemImg.conformation" placeholder="确认密码" v-model="confirmPwd" required></wv-input>
                <wv-input required v-if="item.codeStatus=='1'&&item.codeKey!='signPasswd'&&item.codeKey!='custName'" v-for="(item, index) in configlist" :key="index" :label="itemImg.recommend" :placeholder="item.codeName" v-model="registerParam[item.codeKey]"></wv-input>

                <!-- <wv-group>
                    <wv-input :label="itemImg.invite" placeholder="请输入邀请码" v-model="registerParam.invitedCode" required></wv-input>
                </wv-group> -->

                <wv-input :label="itemImg.vcode" class="weui-cell_vcode" placeholder="请输入验证码" v-model="registerParam.code">
                    <!-- <img :src="vcodeImage" @click="getvcodeImage" class="vcode" slot="ft"> -->
                    <captcha slot="ft"/>
                </wv-input>
            </wv-group>
            <!-- <wv-group>
            </wv-group> -->
            <wv-checklist style="background-color:#eee;" :options="options" v-model="isAdult"></wv-checklist>
            <wv-button @click="handleSubmit('registerParam')" type="warn" style="margin-top:10px;background-color:#ec2829;font-size:16px;">立即注册</wv-button>
            <div class="page" style="margin-top:10px;">
                <wv-footer class="footer-demo" text="已有账号？立即登录"></wv-footer>
            </div>
            <wv-button @click="to_page('loginview')" style="margin-top:10px;font-size:16px;">登录</wv-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            itemImg:{
                invite : "<img style='wdith23px;height:23px;' src='/static/invite@3x.png'></img>",
                username : "<img style='wdith23px;height:23px;' src='/static/userName@3x.png'></img>",
                password : "<img style='wdith23px;height:23px;' src='/static/password@3x.png'></img>",
                conformation : "<img style='wdith23px;height:23px;' src='/static/passwordConfirmation@2x.png'></img>",
                vcode : "<img style='wdith23px;height:23px;' src='/static/captcha@3x.png'></img>",
                recommend : "<img style='wdith23px;height:23px;' src='/static/recommend@3x.png'></img>"
            },
            vcodeImage : '',
            confirmPwd : '',
            registerParam : {
                custName : '',
                signPasswd : '',
                recommendNo :'',
                agentNo :'',
                code : '',
                custCertNo:'',
                custRealName:'',
                userQq:'',
                contactQq:'',
                contactPhone:'',
                userPhone:'',
                invitationCode:'',
                withPasswd:'',
                recommendCode:'',
                weChat:''
            },
            inviteCode:'',
            referralCode:'',
            isAdult:['ischeck'],
            options:[
                {
                    label: '我已同意用户协议',
                    value: 'ischeck'
                }
            ],
            configlist:[]
        }
    },
    methods: {
        to_page(active){
            this.$router.push({name:active});
        },
      checkName(){
        this.$api.postForm('validUser', {custName:this.registerParam.custName}).then((data) =>{
            if(!data.success){
                this.$dialog({title: '提示信息',message:"该用户名已被使用！",skin: 'ios'});
                return;
            };
        })
      },
      handleSubmit(name) {
        let _this = this;
        if (_this.registerParam.signPasswd != _this.confirmPwd) {
           _this.$dialog({title: '提示信息',message:"两次输入密码不一致",skin: 'ios'});
          return;
        };
        if (_this.isAdult.length == 0){
           _this.$dialog({title: '提示信息',message:"请同意用户协议",skin: 'ios'});
          return;
        };
        _this.signIn();
      },
      signIn(){

            this.$api.postForm('register',this.registerParam,true).then((data) => {
            if(data.success){
                this.loading = false;
                this.$api.get('getCust').then(data => {
                    sessionStorage.custInfo = JSON.stringify(data.t);
                    this.$router.push('/');
                });
                this.$dialog({title: '提示',message: '注册成功',skin: 'ios'});
                // if(data.map!=null&&data.map.notice!=null){
                //     this.$dialog({title: data.map.notice.noticeTitle,message: data.map.notice.noticeContent,skin: 'ios'});
                // }else{
                //     this.$dialog({title: '提示',message: '注册成功',skin: 'ios'});
                //     sessionStorage.custInfo = JSON.stringify(data.t);
                // }
            }else{
                this.tipMessage = data.msg;
                if(data.code=='10002'){
                this.getvcodeImage();
                this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
                }
                this.Modal=true;
            }
            });
        },
        /** 获取验证码 */
        getvcodeImage(){
             this.vcodeImage = this.$gpath + "/getVerCode?w=100&h=45&date=" + new Date().getTime();
        },
        getConfig(){
            this.$http({
                method: 'get',
                url: '/getConfig?codeType=register'
            }).then((data) => {
                if (data.data.success && data.data.list != null) {
                    this.configlist = data.data.list
                    for(let item of data.data.list){
                        if(item.codeKey == 'invitationCode'&&item.codeStatus == '0'){
                            this.getCodeByType()
                            break
                        }
                    }
                }
            });
        },
        getCodeByType() {
            let _this = this;
            this.$http({
                method: 'get',
                url: '/getCodeByType?codeType=agentUrl&status=1'
            }).then((data) => {
                if(data.data.success){
                    if(data.data.list){
                        for(let item of data.data.list){
                            if(item.spvVal.indexOf(location.host.replace('www.','').replace('web.',''))>=0){
                                this.registerParam.agentNo = item.spvKey
                                break
                            }
                        }
                    }
                }

            });
        },
    },
    created(){
        this.getConfig();
    },
    mounted() {
        this.getvcodeImage();
    }
}
</script>

