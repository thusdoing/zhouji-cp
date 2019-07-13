<style scoped>
  @import '../../../assets/header.css';

  #top_box {}

  .fl {
    float: left;
  }

  .logo {
    width: 35px;
    margin: 0 5px;
    vertical-align: middle
  }

  #header {
    padding-top: 10px;
    height: 36px;
  }

  .logo-title {
    font-size: 20px;
    line-height: 35px
  }

  .order_text {
    margin: 5px 10px 20px 10px;
    font-size: 14px;
    line-height: 24px;
  }

  .order_box {
    border-bottom: 1px solid #ddd;
  }

  .order_text li span:last-child {
    color: #666;
  }

  #main {
    padding: 50px 0;
  }

  .links {
    padding: 50px 0;
    text-align: center;
  }

  .links a {
    color: #35c295;
  }

  .loadEffect {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 0 auto;
    margin-top: 100px;
  }

  .loadEffect span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00a0e9;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
  }

  @-webkit-keyframes load {
    0% {
      -webkit-transform: scale(1.2);
      opacity: 1;
    }

    100% {
      -webkit-transform: scale(.3);
      opacity: 0.5;
    }
  }

  .loadEffect span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -10px;
    -webkit-animation-delay: 0.13s;
  }

  .loadEffect span:nth-child(2) {
    left: 14px;
    top: 14px;
    -webkit-animation-delay: 0.26s;
  }

  .loadEffect span:nth-child(3) {
    left: 50%;
    top: 0;
    margin-left: -10px;
    -webkit-animation-delay: 0.39s;
  }

  .loadEffect span:nth-child(4) {
    top: 14px;
    right: 14px;
    -webkit-animation-delay: 0.52s;
  }

  .loadEffect span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -10px;
    -webkit-animation-delay: 0.65s;
  }

  .loadEffect span:nth-child(6) {
    right: 14px;
    bottom: 14px;
    -webkit-animation-delay: 0.78s;
  }

  .loadEffect span:nth-child(7) {
    bottom: 0;
    left: 50%;
    margin-left: -10px;
    -webkit-animation-delay: 0.91s;
  }

  .loadEffect span:nth-child(8) {
    bottom: 14px;
    left: 14px;
    -webkit-animation-delay: 1.04s;
  }

</style>
<template>
  <div class="container" style="height: 100%;;background: #fff;font-size: 11px;">

    <wv-header title="在线充值" class="header">
      <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
        <i class="el-icon-arrow-left" slot="icon"></i>
      </div>
      <div slot="right" style="font-size: 14px;" @click="$router.push('custInfos')">首页</div>
    </wv-header>
    <template v-if="!iframeFlag">
      <article class="order_box" style="padding-top: 50px">
        <div id="order_text" class="order_text">
          <ul class="order_list">
            <li><span>扫&nbsp;码&nbsp;方&nbsp;式：</span>
              <span id="merchantOrderId">{{paydata.type}}</span></li>
            <li><span>订&nbsp;单&nbsp;金&nbsp;额：</span>
              <span id="txMoney">{{paydata.money}} CNY</span></li>
            <li><span>商&nbsp;品&nbsp;名&nbsp;称：</span>
              <span id="productName">onlinepay</span></li>

          </ul>
        </div>
      </article>
      <div id="main">

        <!--微信扫码-->

        <div class="li_choose" style="display: block">
          <div>
            <article class="bank_list" id="scanpay_listwxpayWap">
              <div class="erweima">
                <div id="divCode" style="width: 200px; height: 200px; margin: 0 auto; overflow: hidden; text-align: center; border: 1px solid #ddd; z-index: 1;">
                  <vueQR :text="paydata.payurl" :margin="10" style="height: 190px; width: 190px;"></vueQR>
                </div>
              </div>

            </article>

            <div class="links">
              <p>
                <!-- <a href="/static/payhelp/payhelp.html">支付有疑问？点击查看常见问题</a> -->
              </p>
            </div>
          </div>
        </div>
        <div id="issafariBrowser"></div>
      </div>
    </template>
    <template v-else>
      <div style="overflow:hidden;">
        <div class="loadEffect">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <iframe :src="'./static/payIframe.html?_='+Date.now()" style="width: 100%;padding-top: 44px;height: calc(100vh - 44px);position: absolute;top:0;"
        frameborder="0"></iframe>
    </template>
  </div>
</template>
<script>
  import vueQR from 'vue-qr';
  export default {
    components: {
      vueQR
    },
    data() {
      return {
        paydata: {payurl:''},
        iframeFlag: false,
        navigator:""
      }
    },
    mounted() {
      let paydata = JSON.parse(sessionStorage.getItem('payData'))
      this.paydata = paydata
      var issafariBrowser = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      if (paydata.isQrCode) {
        this.iframeFlag = false
      } else {
        if (issafariBrowser) {
          let url = paydata.payurl
          if(url.indexOf('</form>')>=0 || url.indexOf('</html>')>=0){
            $('#issafariBrowser').append(url)
            $('#issafariBrowser').find('form').submit()
          }else{
            window.location.href = paydata.payurl
          }
          return
        }
        this.iframeFlag = true
      }
    }
  }

</script>
