<template>
  <div>
    <div class="sc-gMcBNU fLCLBP">
      <div class="sc-bwzfXH kMDzjb">
        <div class="sc-iLVFha exmPlI" v-text="config.rule"></div>
      </div>
      <div class="sc-dPNhBE lcJMNH">
        <div class="sc-fCPvlr iqoNWh">
          <div>
            <div class="sc-kkwfeq itwcYr" @click="randomChioceBet">
              <i class="iconfont icon-dianji jDZdyJ"></i>
              <span class="sc-cbMPqi hnbdBn">机选</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sc-kTUwUJ jSUaeT">
      <div class="sc-bdVaJa kZAgjJ">
        <div class="sc-dqBHgY iijRGP">
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':item.active}]" @click="chioceBet(item)" v-for="(item,index) in bonusAmtL" :key="index">
            <div class="sc-btzYZH jGqXUY" v-text="item.num"></div>
            <div class="sc-jtRfpW htezMD"></div>
            <div class="sc-bYSBpT fPcJkT" v-text="item.peilv"></div>
          </div>
        </div>
      </div>
      <!-- <div>
        <span class="sc-gxMtzJ iMwtqM">快速选号</span>
        <div class="sc-bdVaJa kZAgjJ">
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==1}]" @click="quickChioceBet('大',1)">
            <div class="sc-btzYZH jGqXUY">大</div>
          </div>
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==2}]" @click="quickChioceBet('小',2)">
            <div class="sc-btzYZH jGqXUY">小</div>
          </div>
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==3}]" @click="quickChioceBet('单',3)">
            <div class="sc-btzYZH jGqXUY">单</div>
          </div>
          <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':quickIndex==4}]" @click="quickChioceBet('双',4)">
            <div class="sc-btzYZH jGqXUY">双</div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="sc-hCbubC lcFehD">
      <div class="sc-lnrBVv hlSTFe">
        <i class="iconfont icon-lajixiang bgAhw" @click="restBet"></i>
        <span class="sc-fvLVrH gtqmUF" v-text="this.betArr.length"></span>
        <span class="sc-hvvHee iCQRmZ">注</span>
        <div class="sc-cPuPxo biOJUI"></div>
        <span class="sc-hvvHee iCQRmZ">共</span>
        <div class="sc-eSePXt jFjQYg" v-text="allMoney"></div>
        <span class="sc-hvvHee iCQRmZ">元</span>
        <div class="sc-bwzfXH kMDzjb"></div>
        <div class="sc-dXfzlN iyQVYu">
          <button class="sc-kAdXeD figbcq" @click="betGame">投注</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  @import '../index.less';

</style>

<script>
  import index from './index';
  export default {
    ...index
  }

</script>
