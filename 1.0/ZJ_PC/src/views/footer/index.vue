<template>
  <div class="footer" v-if="$ENV.VUE_APP_NAME!='万历彩票'">
    <div class="container-fluid _10BB9">
      <div class="XDJRO">
        <div class="container">
          <div class="_1FY8n">
            <p class="_1ijk7">技术支持<span class="_3pQXY">Technical support</span></p>
            <div class="mt30 relative pointer"><img class="w-auto" src="/static_pc/images/flog.png" height="58">            
              <p class="dib v-mid ml20 f6">{{$ENV.VUE_APP_NAME_FOOTER}}系统<br>专业的彩票系统平台</p><i class="_3EbG5"></i></div>
          </div>
          <div class="_1FY8n">
            <p class="_1ijk7">服务体验<span class="_3pQXY">Service experience</span></p>
            <div class="_3jdiP">
              <div><span class="dib v-mid">昨日充值到账平均时间</span>
                <p class="_2N2wj"><span class="_1s0jT _9UTM9" style="width: 28%;"></span></p>
                <p class="_3WoPH">5.32<span class="_2VGIc">秒</span></p>
              </div>
              <div><span class="dib v-mid">昨日提现到账平均时间</span>
                <p class="_2N2wj"><span class="_1s0jT _1Qde4" style="width: 55%;"></span></p>
                <p class="_3WoPH">8.86<span class="_2VGIc">秒</span></p>
              </div>
            </div>
          </div>
          <div class="_1FY8n">
            <p class="_1ijk7">充值方式<span class="_3pQXY">Payment method</span></p>
            <div class="mt25"><img src="/static_pc/images/paytype.png" width="254" height="58"></div>
          </div>
        </div>
      </div>
      <nav class="container tc">
        <ul class="pv15">
          <!--<li class="G5wWq">关于我们</li>-->
          <!--<li class="G5wWq">购彩大厅</li>-->
          <!--<li class="G5wWq">走势图表</li>-->
          <!--<li class="G5wWq">开奖资讯</li>-->
          <!--<li class="G5wWq">优惠活动</li>-->
          <!--<li class="G5wWq">手机购彩</li>-->
          <!--<li class="G5wWq">热门新闻</li>-->
          <!--<li class="G5wWq">帮助中心</li>-->
        </ul><strong class="_140wc">{{$ENV.VUE_APP_NAME}}网站郑重提示：彩票有风险，投注需谨慎！ 不向未满18周岁的青少年出售彩票。</strong><img class="mh30 w-auto" src="/static_pc/images/f1.png"
          height="40"></nav>
    </div>
  </div>
</template>

<script>
  import index from './index.js';
  export default {
    ...index,
  }
</script>

<style>

</style>
