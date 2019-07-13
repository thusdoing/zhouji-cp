<template>
  <div class="allplay">
    <div class="sc-fvLVrH fHCRCe">
      <div class="sc-bdVaJa gLHRUG">
        <div class="sc-dXfzlN blWssj">
          <!-- <span>奖金
            <span class="sc-eSePXt Rmvvy">2.17 ~ 9.80</span>元</span> -->
        </div>
      </div>
    </div>
    <div class="sc-cHSUfg emnLna">
      <div v-for="(item,index) in settingsList.groupClassCones" :key="index">
        <div class="sc-cTjmhe kbcsar">
          <div class="sc-kpOJdX cQvKmF" v-text="item.groupClassConName"></div>
        </div>
        <div class="sc-bdVaJa gLHRUG">
          <div class="sc-cugefK hhCauo">
            <div class="sc-fnwBNb glkCJe" v-for="(_item,_index) in item.groupSettinges" :key="_index" @click="active(_item,item,index)">
              <div :class="{'KfQwo':_item.active,'dZFxsZ':!_item.active}">
                <div class="sc-ktHwxA kLGblI" v-text="_item.groupName"></div>
                <div class="sc-feJyhm disMEh"></div>
                <div class="sc-kafWEX jSRFHP" v-text="_item.bonusAmt"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="sc-iNhVCk eMSXrx"></div>
      </div>
    </div>
    <div class="sc-cbMPqi knIupw">
      <div class="sc-dRCTWM eGcDGy">
        <i class="iconfont icon-lajixiang hDNuMh" @click="restStatus"></i>
        <span class="sc-hARARD LavIV" v-text="betArr.length"></span>
        <span class="sc-eNPDpu cAdVeW">注</span>
        <div class="sc-hizQCF bvJYXo"></div>
        <span class="sc-eNPDpu cAdVeW">共</span>
        <div class="sc-ccLTTT llQcft" v-text="allMoney"></div>
        <span class="sc-eNPDpu cAdVeW">元</span>
        <div class="sc-bdVaJa gLHRUG"></div>
        <div class="sc-jQMNup jSdmXo">
          <input type="tel" v-integer min="1" max="50000" class="sc-bNQFlB iuTIgh" placeholder="投注金额" v-model="times">
        </div>
        <div class="sc-hlILIN hZmkZU">
          <button class="sc-kEmuub hKEGyg" @click="KsTz">快速投注</button>
        </div>
      </div>
    </div>
    <confirm v-model="confirmShow"
    title="提示"
    @on-confirm="confirmBet">
      <p style="text-align:left;color:#666;">
        第 <span style="color:#ec2829;">{{ gameNumber }}</span> 期
      </p>
      <p style="text-align:left;color:#666;" v-for="(item,index) in showContentBet" :key="index">
        <span v-text="item.showContentTit+' | '"></span>
        <span style="color:#ec2829;" v-text="item.showContent"></span>
      </p>
      <p style="text-align:left;color:#666;">
        <span style="color:#ec2829;" v-text="betArr.length"></span>
        注，共
        <span style="color:#ec2829;" v-text="allMoney"></span>
        元
      </p>
    </confirm>
  </div>
</template>

<script>
  import index from './index.js';
  export default {
    ...index
  }

</script>

<style lang="less" scoped>
  @import './index.less';

</style>
