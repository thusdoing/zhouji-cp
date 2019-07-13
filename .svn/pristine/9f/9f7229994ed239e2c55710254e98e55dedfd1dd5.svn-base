<style scoped>
@import '../../assets/header.css';
@import 'css/updateLoginPwd.css';
</style>
<template>
    <div>
        <wv-header title="修改密码" class="header" >
            <div @click="$router.go(-1)" class="brack-icon" slot="left">
                <i class="el-icon-arrow-left"  slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="index-main update-pwd-main">
            <wv-group>
                <wv-input type="password" label="原密码" placeholder="请输入原密码" v-model="loginPwd.oldPwd" required></wv-input>
                <wv-input type="password" label="新密码" placeholder="6~12位新密码" v-model="loginPwd.newPwd" required></wv-input>
                <wv-input type="password" label="确认密码" placeholder="6~12位新密码" v-model="comfimPwd" required></wv-input>
                <wv-input label="验证码" class="weui-cell_vcode" placeholder="请输入验证码" v-model="loginPwd.code">
                    <!-- <img :src="vcodeImage" @click="getvcodeImage" class="vcode" slot="ft"> -->
                    <captcha slot="ft"/>
                </wv-input>
            </wv-group>
            <wv-button @click="upPwd()" type="warn" style="margin-top:10px;background-color:#ec2829;font-size:13px;">提交</wv-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            vcodeImage : '',
            comfimPwd : '',
            loginPwd : {
                oldPwd : '',
                newPwd : '',
                code : ''
            }
        }
    },
    methods : {
        /** 获取验证码 */
        getvcodeImage(){
             this.vcodeImage = this.$gpath + "/getVerCode?w=100&h=45&date=" + new Date().getTime();
        },
        upPwd() {
            let _this = this;
            if (_this.loginPwd.newPwd != _this.comfimPwd) {
                _this.$dialog({title: '提示信息',message:"两次输入的新密码不一致",skin: 'ios'});
                return;
            };
            this.$api.postForm('upPwd',this.loginPwd).then((data) => {
            if(data.success){
                this.loading = false;
                this.$dialog({title: '提示',message: '登录密码修改成功',skin: 'ios'});
                this.$router.push('/loginview');
            }else{
                this.tipMessage = data.msg;
                this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
                this.getvcodeImage();
                this.Modal=true;
            }
            });

      },
    },
    mounted() {
        this.getvcodeImage();
    }
}
</script>
