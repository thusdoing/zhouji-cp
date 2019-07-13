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
      <div v-for="(item,index) in bonusAmtL" :key="index">
        <div class="sc-dqBHgY iijRGP">
          <div :class="[('eqNUm'),{'active':_item.active}]" @click="chioceBet(_item,index,_index)" v-for="(_item,_index) in item.golbal" :key="_index">
            <img :src="`/static/saizi/s${golbalItem}.png`" v-for="(golbalItem,golbalIndex) in _item.num" :key="golbalIndex">
          </div>
        </div>
        <div class="kZAgjJ" style="justify-content: center;line-height:normal;" v-if="index!=bonusAmtL.length-1">
          <i class="iconfont icon-jiahao" style="font-size:30px;"></i>
        </div>
      </div>
    </div>
    <div class="sc-hCbubC lcFehD">
      <div class="sc-lnrBVv hlSTFe">
        <i class="iconfont icon-lajixiang bgAhw" @click="restBet"></i>
        <span class="sc-fvLVrH gtqmUF" v-text="allChoiceYard"></span>
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
