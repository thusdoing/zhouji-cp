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
                <div class="sc-kkwfeq kOmFkF">快3是指以3个号码组合为一注进行的投注，每个投注号码为1-6共6个自然数中的任意1个，一组3个号码的组合称为一注。</div>
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
        items:[{"k1":"和值和值和值","k2":"至少选择1个和值(3个号码之和)进行投注，所选和值与开奖的3个号码的和值相同即中奖。"},{"k1":"三同号通选三同号通选三同号通选","k2":"对所有相同的三个号码（111、222、333、444、555、666）进行投注，任意号码开出即中奖"},{"k1":"三同号单选三同号单选三同号单选","k2":"对相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖"},{"k1":"三不同号三不同号标准","k2":"从1～6中任选3个或多个号码，所选号码与开奖号码的3个号码相同即中奖"},{"k1":"三连号通选三连号通选三连号通选","k2":"对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖"},{"k1":"二同号复选二同号复选二同号复选","k2":"从11-66中任选1个或多个号码，选号与奖号（包含11-66，不限顺序）相同，即中奖（不含豹子）"},{"k1":"二同号单选二同号单选二同号单选","k2":"选择1对相同号码（11,22,33,44,55,66）和1个不同号码(1,2,3,4,5,6)投注，选号与奖号相同（顺序不限），即中奖"},{"k1":"二不同号二不同号标准","k2":"从1～6中任选2个或多个号码，所选号码与开奖号码任意2个号码相同，即中奖"},{"k1":"猜1号就中猜1号就中猜1号就中","k2":"选择1个您认为一定会开出的号码，所选号码在开奖号码中出现，即中奖金"},{"k1":"大小单双两面大小","k2":"从大或小选择一个型态构成一注，总和3~10为小，总和11~18为大。"},{"k1":"大小单双两面单双","k2":"从单数或双数中选择一个型态构成一注，以开奖号码个位、十位和百位的总和，作为中奖依据。"},{"k1":"信用和值和值","k2":"至少选择1个和值(3个号码之和)进行投注，所选和值与开奖的3个号码的和值相同即中奖。"},{"k1":"信用三同号单选三同号单选","k2":"从111、222、…、666中任意选择一组号码构成一注。"},{"k1":"信用三不同号三不同号","k2":"从6个号码中选择3个不相同的号码构成一注。"},{"k1":"信用二同号复选二同号复选","k2":"从11~66中任选1个号码，所选号码与开奖结果（非豹子）相同即为中奖。"},{"k1":"信用二同号单选二同号单选","k2":"从11~66和1~6任选1个组合，，若开奖号码两字同号且与所选择的号码相符时，即为中奖。"},{"k1":"信用二不同号二不同号","k2":"从1-6中任选2个以上号码，所选号码与开奖号码任二个号码相同即为中奖。"},{"k1":"信用猜必出猜必出","k2":"从1~6选择1个号码，所选号码与开奖结果任一位以上相同即为中奖。"},{"k1":"信用两面大小","k2":"从大或小选择一个型态构成一注，总和3~10为小，总和11~18为大。"},{"k1":"信用两面单双","k2":"从单数或双数中选择一个型态构成一注，以开奖号码个位、十位和百位的总和，作为中奖依据。"},{"k1":"信用通选通选","k2":"选择1个型态，所选型态与开奖结果型态相同即为中奖。"},{"k1":"信用猜必不出猜必不出","k2":"从1~6选择1个号码，所选号码与开奖结果任一位都不相同即为中奖。"}]
      }
    },
        methods : {
        toGames(){
            this.$router.go(-1);
        }
    }
}
</script>
