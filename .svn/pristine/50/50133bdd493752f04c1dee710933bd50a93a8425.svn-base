<style scoped>
@import '../../assets/header.css';
@import 'css/updateLoginPwd.css';
</style>
<template>
    <div>
        <wv-header title="设置支付密码" class="header" >
            <!-- <div @click="$router.go(-1)" slot="left" class="brack-icon">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div> -->
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="index-main update-pwd-main">
            <wv-group>
                <wv-input type="password"  v-if="custInfo.withStatus"  label="原支付密码" placeholder="请输入旧的支付密码" v-model="payPwd.oldPwd" required></wv-input>
                <wv-input type="password" label="新支付密码" placeholder="请输入新的支付密码" v-model="payPwd.newPwd" required></wv-input>
                <wv-input type="password" label="确认密码" placeholder="请再次输入新的支付密码" v-model="comfirmPwd" required></wv-input>
                <wv-input label="验证码" class="weui-cell_vcode" placeholder="请输入验证码" v-model="payPwd.code">
                    <!-- <img style="vertical-align: middle" :src="vcodeImage" @click="getvcodeImage" class="code" slot="ft"> -->
                    <captcha slot="ft"/>
                </wv-input>
            </wv-group>
            <wv-button @click="upWithPwd" type="warn" style="margin-top:10px;background-color:#ec2829;font-size:13px;">提交</wv-button>
        </div>
        <!-- <wv-tabbar :fixed="true" style="background-color:#fff;border-top:1px solid #e6e6e6;">
            <wv-tabbar-item @click="to_page('home')" >
                <img class="weui-tabbar__icon" src="/static/common/tabHomeActive@2x.png" slot="icon"> 首页
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('openLotteryList')">
                <img class="weui-tabbar__icon" src="/static/common/tabResultInactive@2x.png" slot="icon"> 开奖
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('activeInfo')">
                <img class="weui-tabbar__icon" src="/static/common/tabDiscoverInactive@2x.png" slot="icon"> 发现
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custService')">
                <img class="weui-tabbar__icon" src="/static/common/tabServiceInactive@2x.png" slot="icon"> 客服
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custInfos')" is-on>
                <img class="weui-tabbar__icon" src="/static/common/tabMyInactive@2x.png" slot="icon"> 我的
            </wv-tabbar-item>
        </wv-tabbar> -->
        <wv-tabbar :fixed="true" class="footers">
            <wv-tabbar-item @click="to_page('home')" >
                <i class="iconfont icon-shouye" slot="icon"></i>
                首页
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('openLotteryList')">
                <i class="iconfont icon-1672jiang" slot="icon"></i>
                开奖
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('activeInfo')">
                <i class="iconfont icon-faxian" slot="icon"></i>
                发现
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custService')">
                <i class="iconfont icon-lianxikefu" slot="icon"></i>
                客服
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custInfos')" is-on>
                <i class="iconfont icon-wode" slot="icon"></i>
                我的
            </wv-tabbar-item>
        </wv-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            vcodeImage : '',
            custInfo : {},
            comfirmPwd : '',
            payPwd : {
                oldPwd : '',
                newPwd : '',
                code : ''
            }
        }
    },
    methods : {
        /** 跳转路由 */
        to_page(active){
            this.$router.push({name:active});
        },
        /** 获取验证码 */
        getvcodeImage(){
             this.vcodeImage =this.$gpath + "/getVerCode?w=80&h=40&date=" + new Date().getTime();
        },
        upWithPwd(){
            let _this = this;
            if (_this.payPwd.newPwd != _this.comfirmPwd) {
                this.$dialog({title: '提示信息',message:"两次输入的新支付密码不一致",skin: 'ios'});
                return;
            };
           this.$api.post('upWithPwd',this.payPwd).then((data) => {
                this.loading = false;
            if(data.success){               
                if(!this.custInfo.withStatus){
                    this.$dialog({title: '提示',message: '支付密码设置成功',skin: 'ios'});
                    this.$api.get('getCust').then(data => {
                        sessionStorage.custInfo = JSON.stringify(data.t);
                });
                }else{
                    this.$dialog({title: '提示',message: '支付密码修改成功',skin: 'ios'});
                };
                this.getvcodeImage();
                this.$router.push('/custBaseInfo');
                return;
            }else{
                this.tipMessage = data.msg;
                this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
                this.getvcodeImage();
                this.Modal=true;
            }
           })
        }
    },
    mounted() {
        this.getvcodeImage();
        this.custInfo = JSON.parse(sessionStorage.custInfo);
    }
}
</script>
