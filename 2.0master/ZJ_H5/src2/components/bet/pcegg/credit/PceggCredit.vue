<style lang="less" scoped>
.allplay {
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 50px;
  top: 0;
  box-sizing: border-box;
  z-index: 1;
  background-color: white;
  padding-bottom: 50px;
  overflow: auto;
  .fHCRCe {
    display: flex;
    padding: 10px;
  }
  .gLHRUG {
    flex: 1;
  }
  .blWssj {
    font-size: 12px;
    color: #5e5e5e;
    padding-right: 10px;
  }
  .Rmvvy {
    color: @theme-color;
  }
  .emnLna {
    padding-top: 10px;
    padding-bottom: 10px;
    position: absolute;
    top: 0;
    bottom: 50px;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
  }
  .kbcsar {
    padding: 16px 10px 5px 10px;
  }
  .cQvKmF {
    font-size: 12px;
    line-height: 14px;
    padding-left: 4px;
    padding-right: 7px;
    border-left: 2px solid @theme-color;
    font-weight: 600;
  }
  .hhCauo {
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .glkCJe {
    line-height: 2;
    min-width: 60px;
    margin: 5px;
  }
  .KfQwo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #fdfdfd;
    border: 1px solid #e6e6e6;
    padding: 9px 0;
    border-radius: 3px;
    background-color: @theme-color;
    border-color: @theme-color;
    div {
      color: #fff;
    }
  }
  .dZFxsZ {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #fdfdfd;
    border: 1px solid @border-color;
    padding: 9px 0;
    border-radius: 3px;
  }
  .jSRFHP {
    font-size: 12px;
    color: #454545;
  }
  .eMSXrx {
    background-color: #e6e6e6;
    height: 1px;
    margin: 5px 10px 0 10px;
  }
  .iJMqhS {
    font-size: 17px;
    color: #e8173d;
    line-height: 20px;
  }
  .iwMLsm {
    font-size: 12px;
    color: #454545;
  }
}

.knIupw {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 500;
  .eGcDGy {
    display: flex;
    background-color: rgba(0, 0, 0, 0.78);
    font-size: 13px;
  }
  .LavIV {
    min-width: 12px;
    color: #ffed00;
    line-height: 49px;
    text-align: right;
    display: inline-block;
    margin-right: 2px;
  }
  .cAdVeW {
    color: #ffffff;
    line-height: 49px;
  }
  .bvJYXo {
    width: 10px;
  }
  .cAdVeW {
    color: #ffffff;
    line-height: 49px;
  }
  .llQcft {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 12px;
    color: #ffed00;
    line-height: 49px;
    text-align: right;
    display: inline-block;
    margin-right: 2px;
  }
  .cAdVeW {
    color: #ffffff;
    line-height: 49px;
  }
  .gLHRUG {
    flex: 1;
  }
  .jSdmXo {
    margin: auto auto auto 5px;
  }
  .jSdmXo input {
    width: 80px;
    height: 30px;
    color: #9b9b9b;
    border: 1px solid #9b9b9b;
    background: none;
    font-size: 13px;
    line-height: 1em;
    text-align: center;
  }
  .hZmkZU {
    margin: 7px 10px;
    width: 70px;
  }
  .hZmkZU button {
    line-height: 35px;
    overflow: hidden;
    white-space: nowrap;
    outline: none;
    &:active {
      background: @theme-color;
    }
  }
  .hDNuMh {
    color: #eee;
    font-size: 35px;
    line-height: 45px;
  }
  .hKEGyg {
    display: block;
    height: 100%;
    width: 100%;
    line-height: 40px;
    text-align: center;
    background: @theme-color;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    border-radius: 3px;
    border-width: 0;
    border-color: @theme-color;
    padding: 0 4px;
    position: relative;
  }
}

.sc-kpOJdX.cQvKmF {
  font-size: 1.5rem;
}
.sc-ktHwxA.kLGblI {
  font-size: 1.7rem;
  color: @theme-color;
}
.sc-kafWEX.jSRFHP {
  font-size: 1.3rem;
}

.color {
  color: @theme-color;
}
</style>

<template>
  <div class="allplay" v-if="lottery.gamePlayMap">
    <div class="sc-cHSUfg emnLna">
      <div v-for="(d,index) in groupClass.groupClassCones" :key="index">
        <div class="sc-cTjmhe kbcsar">
          <div class="sc-kpOJdX cQvKmF" v-text="d.groupClassConName"></div>
        </div>
        <div class="sc-bdVaJa gLHRUG">
          <div class="sc-cugefK hhCauo">
          
            <template v-if="d.groupClassConNo!='771111'">
              <div class="sc-fnwBNb glkCJe" v-for="(d1, i1) in d.groupSettinges" :key="i1" @click="onClickGroupSetting(d1, d, index)">
                <div :class="{'KfQwo': betGroupSetttings[d1.groupNo],'dZFxsZ':!betGroupSetttings[d1.groupNo]}">
                  <div class="sc-ktHwxA kLGblI" v-text="d1.groupName"></div>
                  <div class="sc-feJyhm disMEh"></div>
                  <div class="sc-kafWEX jSRFHP" v-text="d1.bonusAmt"></div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="sc-fnwBNb glkCJe" v-for="(d1, i1) in ball" :key="i1" @click="d1.selected=!d1.selected;onClickGroupSetting(d1, d, index)">
                <div :class="{'KfQwo': d1.selected,'dZFxsZ':!d1.selected}">
                  <div class="sc-ktHwxA kLGblI" v-text="d1.groupName"></div>
                  <div class="sc-feJyhm disMEh"></div>
                </div>
              </div>
            </template>

          </div>
        </div>
        <div class="sc-iNhVCk eMSXrx"></div>
      </div>
    </div>
    <div class="sc-cbMPqi knIupw">
      <div class="sc-dRCTWM eGcDGy">
        <i class="iconfont icon-lajixiang hDNuMh" @click="onReset"></i>
        <span class="sc-hARARD LavIV" v-text="betNumber"></span>
        <span class="sc-eNPDpu cAdVeW">注</span>
        <div class="sc-hizQCF bvJYXo"></div>
        <span class="sc-eNPDpu cAdVeW">共</span>
        <div class="sc-ccLTTT llQcft" v-text="allMoney"></div>
        <span class="sc-eNPDpu cAdVeW">元</span>
        <div class="sc-bdVaJa gLHRUG"></div>
        <div class="sc-jQMNup jSdmXo">
          <input
            type="tel"
            min="1"
            max="50000"
            class="sc-bNQFlB iuTIgh"
            placeholder="投注金额"
            v-model="times"
          >
        </div>
        <div class="sc-hlILIN hZmkZU">
          <button class="sc-kEmuub hKEGyg" @click="onQuicklyBet">快速投注</button>
        </div>
      </div>
    </div>
    <confirm
      v-if="'betConfirmKey' === props.key"
      v-model="props.visible"
      title="提示"
      @on-confirm="props.onConfirm"
    >
      <p style="text-align:left;color:#666;">第
        <span class="color">{{ lottery.nextOpenGame.gameNumber }}</span> 期
      </p>
      <p style="text-align:left;color:#666;" v-for="(d,index) in showBetArr" :key="index">
        <span v-text="d.groupClassConName + ' | '"></span>
        <span class="color">{{d.groupNames}}</span>
      </p>
      <p style="text-align:left;color:#666;">
        <span class="color" v-text="betNumber"></span> 注，共
        <span class="color" v-text="allMoney"></span> 元
      </p>
    </confirm>
  </div>
</template>

<script>
import { Component, Vue, Inject } from "core/decorators";
import indexVue from "../../../../../src/components/bet/officaPlay/index.vue";

@Component
export default class BetLotteryAllCredit extends Vue {
  @Inject() lottery;
  @Inject() pcegg;

  /** 投注内容数组 */
  betArr = [];
  /** 展示投注内容数组 */
  showBets = {};

  /** 单投注金额 */
  times = 1;

  //特码包三
  ball=[
    {groupName:0,selected:false},
    {groupName:1,selected:false},
    {groupName:2,selected:false},
    {groupName:3,selected:false},
    {groupName:4,selected:false},
    {groupName:5,selected:false},
    {groupName:6,selected:false},
    {groupName:7,selected:false},
    {groupName:8,selected:false},
    {groupName:9,selected:false},
    {groupName:10,selected:false},
    {groupName:11,selected:false},
    {groupName:12,selected:false},
    {groupName:13,selected:false},
    {groupName:14,selected:false},
    {groupName:15,selected:false},
    {groupName:16,selected:false},
    {groupName:17,selected:false},
    {groupName:18,selected:false},
    {groupName:19,selected:false},
    {groupName:20,selected:false},
    {groupName:21,selected:false},
    {groupName:22,selected:false},
    {groupName:23,selected:false},
    {groupName:24,selected:false},
    {groupName:25,selected:false},
    {groupName:26,selected:false},
    {groupName:27,selected:false},
  ]


  props = {};
  /** 游戏配置 */
  get config () { return this.pcegg.config; }
  get isOffice(){
      const m="特码包三"      
      if(m.indexOf(this.groupClass.groupClassName)==-1) return false;
      return true;
  }
  /** 计算需要花费多少钱 */
  get allMoney() {
    return this.$tools.bet.asmd.mul(this.betNumber, this.times);
  }
  /** 已选中的像，最后一层玩法 */
  get betGroupSetttings() {
    return this.betArr.reduce((m, d) => {
      m[d.groupNo] = true;
      return m;
    }, {});
  }

  get showBetArr() {
    return Object.keys(this.showBets).map(k => {
      const d = this.showBets[k];
      return { ...d, groupNames: d.groupNames.join(",") };
    });
  }
  //包三玩法
  get officeArr() {
    if (this.isOffice) {
      let tempObj = {};
      tempObj.betContent = this.betArr.map(el => {
        return el.groupName;
      });
      tempObj.betContent = tempObj.betContent.join(",");
      tempObj.betAmt = this.allMoney;
      tempObj.betNumber = this.betNumber;   
      tempObj.groupNo = this.groupClass.groupClassCones[0].groupSettinges[0].groupNo
      tempObj.gameNo =  this.$route.params.gameNo
      tempObj.betBonus = this.groupClass.groupClassCones[0].groupSettinges[0].bonusAmt
      return [tempObj];
    } else {
      return [];
    }
  }
  
  get betNumber() {
    if (this.isOffice) {
      return this.$tools.bet.Combinatorics.C( this.betArr.length, this.config.min);
    } else {
      return this.betArr.length;
    }
  }

  /** 第二层玩法 */
  get groupClass() {
    console.log(this.lottery.gamePlayMap)
    return this.lottery.gamePlayMap.groupClass;
  }

  /**
   * 选中第四层玩法
   * @param {object} groupSetting 第四层玩法对象
   * @param {object} groupClassCone 第三层玩法对象
   * @param {number} groupClassConeIndex 第三层玩法索引
   */
  onClickGroupSetting(groupSetting, groupClassCone, groupClassConeIndex) {
    let index = this.betArr.indexOf(groupSetting);    
    if (index != -1) {
      this.betArr.splice(index, 1);
      index=this.showBets[groupClassConeIndex].groupNames.indexOf(groupSetting.groupName)
      this.showBets[groupClassConeIndex].groupNames.splice(index, 1);  
      if(this.showBets[groupClassConeIndex].groupNames.length==0) delete this.showBets[groupClassConeIndex]   
    } else {
      this.betArr.push(groupSetting);
      if (!this.showBets[groupClassConeIndex]) {
        const d = {
          groupClassConName: groupClassCone.groupClassConName,
          groupNames: []
        };
        this.$set(this.showBets, groupClassConeIndex, d);
      }
      this.showBets[groupClassConeIndex].groupNames.push(
        groupSetting.groupName
      );
     
    }
  }

  /** 清除待投注的玩法 */
  onReset() {
    this.betArr.splice(0);
    this.showBets = {};
    this.ball.forEach(el=>{
      el.selected = false
    })
  }

  /** 快捷投注 */
  async onQuicklyBet() {
    const { gameNo } = this.lottery;
    if (!(await this.toBetConfirm())) return undefined;
    let data =this.betArr.map(({ groupNo, bonusAmt: betBonus }) => {
      return {
        gameNo,
        groupNo,
        betBonus,
        betAmt: this.$tools.bet.asmd.mul(1, this.times)
      };
    });
    data=this.isOffice?this.officeArr:data;
    const rsp = await this.$apis.Game.creditBet(data);
    if (!rsp.success) {
      if (rsp.message) this.$vux.alert(rsp.message);
      return false;
    }
    return this.toTip();
  }
  async toTip() {
    //this.clearBet();
    const title = "提示";
    const content = "投注成功";
    const confirmText = "查看投注";
    const cancelText = "继续投注";
    const skin = "ios";
    const confirm = await this.$vux.confirm({
      title,
      content,
      confirmText,
      cancelText,
      skin
    });

    // 取消：继续投注
    if (!confirm) return this.onReset();
    // 查看投注
    this.$router.push({ path: "/betRecordsview", replace: true });
  }

  toBetConfirm() {
    if (this.betNumber === 0) {
      this.$vux.alert("请先选择投注号码", "提示");
      return false;
    }
    return new Promise(async resolve => {
      const hide = boolean => {
        this.props.visbile = false;
        resolve(true);
      };
      const onConfirm = () => hide(true);
      const onCancel = () => hide(false);
      const onHide = () => (this.props = {});
      this.props = {
        onConfirm,
        onCancel,
        onHide,
        visible: true,
        key: "betConfirmKey"
      };
    });
  }
}
</script>
