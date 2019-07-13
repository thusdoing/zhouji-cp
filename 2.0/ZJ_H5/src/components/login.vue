<style scoped>
    @import '../assets/header.css';
    @import 'custInfos/css/updateLoginPwd.css';
    .update-pwd-main>>>.weui-cell label {
        width: 45px !important;
    }
</style>
<template>
    <div>
        <wv-header title="登录" class="header"></wv-header>
        <div class="index-main update-pwd-main" style="padding-bottom: 160px;margin: 0;padding-top: 60px;">
            <wv-group>
                <wv-input :label="itemImg.username" placeholder="用户名" v-model="loginParam.custName" required></wv-input>
                <wv-input type="password" :label="itemImg.password" placeholder="请输入登录密码" v-model="loginParam.pwd" required></wv-input>
                <wv-input :label="itemImg.vcode" class="weui-cell_vcode" placeholder="请输入验证码" v-model="loginParam.verCode">
                  <captcha slot="ft"/>
                </wv-input>
            </wv-group>
            <wv-flex style="margin-top:10px;">
                <wv-flex-item>
                    <div class="placeholder" style="text-align:right;font-size:13px;">
                        <a @click="to_page('forgetPwd')" style="color: #0f9de3;">忘记密码</a>
                    </div>
                </wv-flex-item>
            </wv-flex>
            <wv-button type="warn" @click="userLogin" style="margin-top:10px;background-color:#ec2829;font-size:16px;">立即登录</wv-button>
            <div class="page" style="margin-top:5px;">
                <wv-footer class="footer-demo" :text="`还不是${$ENV.VUE_APP_NAME}的小伙伴？马上注册`"></wv-footer>
            </div>
            <wv-button @click="to_page('registerview')" style="margin-top:10px;font-size:16px;">注册</wv-button>
        </div>
        <wv-tabbar :fixed="true" class="footers">
            <wv-tabbar-item @click="to_page('home')">
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
                itemImg: {
                    username: "<img style='wdith23px;height:23px;' src='/static/userName@3x.png'></img>",
                    vcode: "<img style='wdith23px;height:23px;' src='/static/captcha@3x.png'></img>",
                    password: "<img style='wdith23px;height:23px;' src='/static/password@3x.png'></img>"
                },
                vcodeImage: '',
                loginParam: {
                    custName: '',
                    pwd: '',
                    verCode: ''
                }
            }
        },
        created() {

        },
        methods: {
            /** 跳转路由 */
            to_page(active) {
                this.$router.push({ name: active });
            },
            /** 用户登录 */
            async userLogin() {
                // await this.$api.get('loginOut').then(() => {}, () => {});
                this.$api.postForm('login', this.loginParam, true).then((data) => {
                    if (!data.success) {
                        this.$dialog({ title: '提示信息', message: data.msg, skin: 'ios' });
                    } else {
                        sessionStorage.clear();
                        sessionStorage.custInfo = JSON.stringify(data.t);
                        this.$store.commit(this.$store.state.mutationType.SET_USER, data.t);
                        this.$router.push({ name: 'home' });
                        // if (data.map != null && data.map.notice != null) {
                        //     this.$dialog({ title: data.map.notice.noticeTitle, message: '<div style="text-align:left;overflow: auto;max-height: 60vh;">' + data.map.notice.noticeContent.split(/\s+/).join('<br>') + '</div>', skin: 'ios' });
                        // }
                    }
                });
            },
            /** 获取验证码 */
            getvcodeImage() {
                this.vcodeImage = this.$gpath + "/getVerCode?w=100&h=45&date=" + new Date().getTime();
            },

        },
        async mounted() {
            await this.$api.get('loginOut');
            this.getvcodeImage();
        }
    }
</script>
