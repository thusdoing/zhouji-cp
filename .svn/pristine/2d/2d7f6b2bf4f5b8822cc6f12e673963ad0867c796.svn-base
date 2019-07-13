<style lang="less" scoped>
@import '../ssc.less';
.ssc-danshi-normal {
  width: 100%; position: absolute;height: 100%;overflow: auto;padding-bottom: 60px;box-sizing: border-box;
}
.demo1-item {
  background-color: #fdfdfd!important;
  font-size: 1.4rem;
}
.demo1-item-selected {
  background-color: @theme-color!important;
  border-color: @theme-color;
  color: #fff;
}
</style>

<template>
  <div style="ssc-danshi-normal">
    <div class="play-content playBoxNum">
      <div class="playitd-wrap" style="font-size: 1.3rem;">
        <p>{{config.description}}</p>
      </div>

      <div class="local-wrap" v-if="config && config.rx">
        <div class="position-area">
          <label>选择位置: </label>

          <checker v-model="social" type="checkbox" :max="5" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <checker-item value="万">万</checker-item>
            <checker-item value="千">千</checker-item>
            <checker-item value="百">百</checker-item>
            <checker-item value="十">十</checker-item>
            <checker-item value="个">个</checker-item>
          </checker>
        </div>

        <div class="notice-area">
          <label>温馨提示: 你选择了 {{ selLen }} 个位置，系统会自动根据位置组合成 {{ schemeCount }} 个方案</label>
        </div>
      </div>

          <div class="textarea-box">
              <textarea v-integer v-model="textContent" placeholder="程序会自动过滤掉不合法的号码。您也可以点击“删除重复号”按钮对输入内容进行格式化."></textarea>
          </div>

          <div style="margin-top: 20px;">
        <button class="btn-error" @click="RemoveRet">删除重复号</button>
        <button class="btn-error" @click="cleartextArea">清空文本框</button>
          </div>
    </div>

    <div class="okbet-wraps knIupw">
      <div class="sc-dRCTWM eGcDGy">
        <i class="iconfont icon-lajixiang hDNuMh" @click="clearUI"></i>
        <span class="sc-hARARD LavIV">{{betCount}}</span>
        <span class="sc-eNPDpu cAdVeW">注</span>
        <div class="sc-hizQCF bvJYXo"></div>
        <span class="sc-eNPDpu cAdVeW">共</span>
        <div class="sc-ccLTTT llQcft">{{betAmt}}</div>
        <span class="sc-eNPDpu cAdVeW">元</span>
        <div class="sc-bdVaJa gLHRUG"></div>
        <div class="sc-jQMNup jSdmXo">
          <input type="tel" min="1" max="50000" class="sc-bNQFlB iuTIgh" placeholder="投注倍数" v-model="betTimes">
        </div>
        <div class="sc-hlILIN hZmkZU">
          <button class="sc-kEmuub hKEGyg" @click="btnConfirmChoiceFun">投注</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Inject, Watch } from 'core/decorators';

@Component
export default class SSCDanshiNormal extends Vue {
  /** 彩种组件实例 */
  @Inject() lottery;
  /** 时时彩实例 */
  @Inject() ssc;

  betCount = 0;

  social = [];
  textContent = '';

  /** 投注倍数 */
  betTimes = '';

  /** 玩法配置 */
  get config () {
    return this.ssc.config;
  }

  /** 第4级玩法 */
  get settings () {
    return this.lottery.gamePlay;
  }

  /** 投注金额单位比例 */
  get pattern () {
    return this.lottery.pattern;
  }

  get betAmt () {
    return this.$tools.bet.asmd.mul(this.betCount, this.betTimes, this.pattern, (this.config.betInitMoney || 1));
  }

  get selLen () {
    return this.social.length;
  }

  /** 投注方案 */
  get schemeCount () {
    return this.$tools.bet.Combinatorics.C(this.social.length, this.config.algorithm);
  }

  @Watch('textContent')
  toWatchTextContent (v) {
    this.validChioceNum(v);
  }
  @Watch('schemeCount')
  toWatchSchemeCount () {
    this.validChioceNum(this.textContent);
  }

  clearUI () {
    this.textContent = '';
    this.RegExp = new RegExp(`(.{${this.config.algorithm}})(?=[^$])`, 'g');

    this.betCount = 0;
    this.betTimes = '';
    this.moneyModel = 0;
    this.social = ['万', '千', '百', '十', '个'];
  }

  validChioceNum (v) {
    v = v.replace(/[^0-9]/ig, '');
    if (v.toString().length >= this.config.algorithm) {
      this.betCount = Math.floor(v.length / this.config.algorithm) * (this.config.rx ? this.schemeCount : 1);
    } else {
      this.betCount = 0;
    }
  }

  RemoveRet () {
    const { playMethods } = this.$tools.bet;
    var retObj = playMethods.rnzdFilter(this.textContent, this.config.sequence, this.config.algorithm);
    if (retObj.repAry.length > 0 || retObj.errAry.length > 0) {
      this.$vux.alert.show({
        title: '提示',
        content: '过滤' + retObj.errAry.length + '个错误号码(' + retObj.errAry.join(',') + ')，过滤' + retObj.repAry.length + '个重复号码(' + retObj.repAry.join(',') + ')'
      });
    }

    this.textContent = retObj.retAry.join('');
  }
  cleartextArea () {
    this.textContent = '';
  }

  btnConfirmChoiceFun () {
    const { playMethods } = this.$tools.bet;
    var retObj = playMethods.rnzdFilter(this.textContent, this.config.sequence, this.config.algorithm);
    if (retObj.repAry.length > 0 || retObj.errAry.length > 0) {
      this.$vux.alert.show({
        title: '提示',
        content: '过滤' + retObj.errAry.length + '个错误号码(' + retObj.errAry.join(',') + ')，过滤' + retObj.repAry.length + '个重复号码(' + retObj.repAry.join(',') + ')',
        onHide: () => {
          if (retObj.retAry.length) {
            this.generatebetList(retObj.retAry);
          } else {
            this.textContent = '';
          }
        }
      });
      return;
    }
    if (retObj.retAry.length) {
      this.generatebetList(retObj.retAry);
    } else {
      this.textContent = '';
      if (this.betCount == 0 && this.totalBetNumber == 0) {
        this.$vux.alert.show({
          title: '提示',
          content: '暂无投注内容'
        });
        return;
      }

      if (this.betCount == 0 && this.totalBetNumber != 0) {
         this.$vux.alert.show({
          title: '提示',
          content: '暂无投注内容'
        });
        // this.$router.push('/betResult');
      }
    }
  }

  generatebetList (textAreaV) {
    this.textContent = textAreaV.join('');
    this.validChioceNum(this.textContent);

    const { asmd, algorithm } = this.$tools.bet;

    let splitArr = ''; // 转换 传入后台输出格式
    for (let i = 0; i < this.textContent.length; i++) {
      let a = ',';
      if (i != 0 && parseInt(i + 1) % this.config.algorithm == 0) {
        a = '|';
      }
      if (i == this.textContent.length - 1) {
        a = '';
      }
      splitArr += this.textContent[i] + a;
    }

    var betRet = {};
    betRet.betAmt = this.betAmt;

    betRet.betBackRate = null;
    betRet.betContent = (this.config.rx ? algorithm.transWQBSGToNum(this.social) + ':' : '') + splitArr;
    betRet.showContent = '[' + this.config.name + '] ' + splitArr;
    betRet.betMultiple = this.betTimes;
    betRet.betNumber = this.betCount;
    // betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, this.pattern), this.betAmt)
    betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, this.pattern), this.betAmt);
    betRet.gameNo = this.$route.params.gameNo;
    betRet.groupNo = this.settings.groupNo;
    betRet.gamePattern = this.lottery.gamePattern;

    this.lottery.toBet(betRet);
    this.clearUI();
  }
};
</script>
