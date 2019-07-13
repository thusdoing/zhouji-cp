<style scoped>
  @import "../../../assets/header.css";
  
</style>


<template>
 <div>
    <wv-header :title="`${gameName}介绍`" class="header">
      <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
        <i class="el-icon-arrow-left" slot="icon"></i>
      </div>
      <div class="w-20" slot="right"></div>
    </wv-header>
    <el-main class="index-main" style="background-color:#fff;padding:15px;">
    <div class="sc-gCwZxT iEMDai">
        <div class="sc-bJTOcE iCnFQh">
            <div class="sc-PLyBE hhUvWZ">
                <div class="sc-dPNhBE gwgWIL">玩法规则</div>
                <div class="sc-kkwfeq kOmFkF">PC蛋蛋：北京快乐8做奖源，20个号码从小到大排列，前6个数字总和，中6总和，后6总和的个位数字相加。</div>
            </div>
            <div>
                <div class="sc-dPNhBE gwgWIL">奖项设置</div>
                <section class="sc-izvnbC faZLno">
                    <div class="sc-gMcBNU gbXjjN">
                        <div class="sc-dYzWWc boyuBP">玩法</div>
                        <div class="sc-dYzWWc boyuBP">玩法说明</div>
                    </div>
                    <div class="sc-cbMPqi gmsilR" v-for="(item, index) in items" :key="index">
                        <div class="sc-dYzWWc boyuBP">{{item.k1}}</div>
                        <div class="sc-dYzWWc boyuBP">{{item.k2}}</div>
                    </div>
                </section>
            </div>
            <div class="sc-fAJaQT fRmlxW"></div>
        </div>
    </div>
     <div class="sc-guztPN bdBveP"><button @click="toGames" class="sc-cFlXAS bYzZZd">立马来一注</button></div>
    </el-main>
 </div>
</template>
<script>
export default {
    props : {
        gameName : String,
        gameNo : String,
        gameType : String
    },
    data() {
      return {
        items:[{"k1":"猜一码猜一码猜一码","k2":"选择0~9号码进行投注，开出三个投注号码为一等奖；开出二个投注号码为二等奖；开出一个投注号码为三等奖。"},{"k1":"特码趣味色波","k2":"所选的投注项目，等于开出的三个号码加总的波色，即为中奖。红波：3、6、9、12、15、18、21、24；绿波：1、4、7、10、16、19、22、25；蓝波：2、5、8、11、17、20、23、26"},{"k1":"特码和值除三余数","k2":"从0到2中选择一个数字构成1注，所选数值其中包含三个开奖号码的相加之和(特码数字，即为中奖。"},{"k1":"特码和值和值","k2":"从0到27中选择一个数字进行投注，所选数值等于三个开奖号码的相加之和(特码数字，即为中奖。"},{"k1":"特码混和极大极小","k2":"所选的投注项目，等于开出的三个号码加总的形态，即为中奖。极大：22~27，极小：0~5。"},{"k1":"特码混和大小单双","k2":"所选的投注项目，等于开出的三个号码加总的形态，即为中奖。"},{"k1":"特码中边大中小边","k2":"选择一个型态进行投注，开出的三个号码总和为该型态，即为中奖。0~9为小边，10~17为中，18~27为大边。"},{"k1":"特码豹子豹子","k2":"选择一个型态投注，开出的三个号码相同，即为中奖。"},{"k1":"信用混合混合","k2":"选择1个型态投注，如开奖特码结果与下注结果相同，则为中奖。"},{"k1":"信用混合色波","k2":"选择1个型态投注，如开奖特码结果与下注结果相同，则为中奖。"},{"k1":"信用混合豹子","k2":"选择1个型态投注，如开奖正码结果与下注结果相同，则为中奖。（豹子：111，222，333，444，555，666）"},{"k1":"信用混合除三余数","k2":"选择1个型态投注，如开奖特码除三后余数结果与下注结果相同，则为中奖。"},{"k1":"信用混合大中小边","k2":"选择1个型态投注，如开奖特码结果与下注结果相同，则为中奖。（大边：18~27，中边：10~17，小边：0~9）"},{"k1":"信用和值特码和值特码","k2":"从0~27中任选1个数字下注，所选数字与开奖特码数字相同，则为中奖。"},{"k1":"信用特码包三特码包三","k2":"从0~27中任选3个数字下注，所选数字任一位与开奖号码数字相同，则为中奖。"}]
      }
    },
        methods : {
        toGames(){
            this.$router.go(-1);
        }
    }
}
</script>
