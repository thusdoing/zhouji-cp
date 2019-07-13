<style scoped>
@import '../../assets/header.css';
@import './css/custBaseInfo.css';
.userHierarchyName /deep/  .weui-cell__ft{
    font-size: 16px;
    color: #f34848;
    font-weight: bold;
}
</style>
<template>
    <div>
        <wv-header title="我的账户" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <el-main class="index-main">
            <wv-panel class="info-photo" @click.native="showavatar=true">
                <wv-media-box :thumb="`/static/avatar/${avatar}.jpg`" title="头像"></wv-media-box>
            </wv-panel>
            <wv-group class="info-first">
                <wv-cell title="用户名" :value="custInfo.custName"></wv-cell>
                <wv-cell title="会员等级" class="userHierarchyName" :value="custInfo.userHierarchyName">???</wv-cell>
                <!-- <wv-cell title="昵称" :value="custInfo.custRealName" is-link></wv-cell> -->
                <!-- <wv-cell title="性别" value="已绑定" is-link></wv-cell> -->
                <!-- <wv-cell title="生日" value="绑定生日" is-link></wv-cell> -->
            </wv-group>
            <!-- <wv-group class="info-item">
                <wv-cell title="手机号码" value="绑定手机" is-link></wv-cell>
                <wv-cell title="邮箱" value="绑定邮箱" is-link></wv-cell>
            </wv-group> -->
            <wv-group class="info-item">
                <wv-cell title="银行卡" value="绑定本人银行卡快速提现" @click="tolistBankCard"></wv-cell>
            </wv-group>
            <!-- <wv-group class="info-item">
                <wv-cell title="推荐码" :value="custInfo.custNo" is-link></wv-cell>
            </wv-group> -->
            <wv-group class="info-item">
                <wv-cell title="设置支付密码" value="" is-link to="/settingPayPwd"></wv-cell>
                <wv-cell title="修改登录密码" value="" is-link to="/updateLoginPwd"></wv-cell>
            </wv-group>
        </el-main>
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


      <div v-transfer-dom>
        <popup v-model="showavatar" position="top" max-height="50%">
          <div style="padding: 55px 10px 10px;">
            <div style="font-size: 0">
                <div @click="setavatar(item)" v-for="(item, index) in 10" :key="index" style="width: 20%; box-sizing: border-box;padding: 3px;display: inline-block;"><img style="width: 100%;" :src="`/static/avatar/avatar${item}.jpg`" alt=""></div>
            </div>
          </div>
        </popup>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            custInfo : {},
            showavatar:false,
            avatar:'avatar2'
        }
    },
    created() {
        var avatar = localStorage.getItem('avatar')
        if(avatar){this.avatar = avatar}
    },
    methods : {
        /** 跳转路由 */
        to_page(active){
            this.$router.push({name:active});
        },
        setavatar(i){
            localStorage.setItem('avatar','avatar'+i)
            this.showavatar = false
            this.avatar = 'avatar'+i
        },
       async tolistBankCard(){
             this.custInfo = JSON.parse(sessionStorage.custInfo);
            // console.log(!!this.custInfo.withStatus)
            if(this.custInfo.withStatus){
                this.$router.push('listBankCard');
            }else{
                  if (await this.$vux.confirm({ content: '您还没有设置支付密码', title: '操作提示', confirmText: '去设置' })) {
                this.$router.push('settingPayPwd');
    }
            }
        }      

    },
    mounted() {
        this.custInfo = JSON.parse(sessionStorage.custInfo);
    }
}
</script>

