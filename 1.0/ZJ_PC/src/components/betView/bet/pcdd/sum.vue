<template>
    <div>
        <div class="fastThree-content playBoxNum">

            <p style="padding:10px 0 30px;">
                <Icon type="information-circled" style="color:red;"></Icon>
                <label style="font-size:13px;" v-html="config.description"></label>
                <!-- 奖金<span style='color: #e60b0b;'>{{min}}-{{max}}</span>元 -->
                <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
                    <div slot="content" v-html="config.example" style="white-space: normal;"></div>
                    <label style="text-decoration:underline;font-size:13px;color:red;">案例示例</label>
                </Tooltip>
            </p>

            <div class="fastThree-content-list flex">
                <div class="ball-panel" :style="'margin: 0 '+ config.margin +'px;' ">
                    <div class="flex" style="display:flex;justify-content: center;flex-wrap: wrap">
                        <div v-for="(item,index) in config.sub" :key="index" style="flex:none;">
                            <p class="golbal" :class="[item.color,item.selected?'active':'']" style="border-radius:6px;margin:0 8px 15px;font-size:18px;line-height:50px;width: 52px;height: 52px;padding:0;"
                                @click="choiceNum(item)" v-text="item.num"></p>
                            <div style="text-align: center;margin-top: -10px;font-size: 12px;margin-bottom: 10px;">赔{{item.bonusAmt}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bet2confirm">
                <p>您选择了 <span>{{betCount}}</span> 注</p>
                <Button @click="btnConfirmChoiceFun" :disabled="betEnabled" type="error">确认选号</Button>
            </div>
        </div>
        <span style="display: none">{{updata}}</span>
    </div>
</template>


<script>
    import asmd from '@/assets/js/asmd'
    export default {
        props: ['config', 'settings'],
        data() {
            return {
                data: [],//后台数据
                bonusAmt: [],//赔率列表,
                bonusAmtMax: [], // 选择的号码赔率 存入
                bonusAmtIndex: [],
                allGetProfit: 0,
                codeNumYardArr: [],
                moneyModel: 0, // 0 1
                betCount: 0,
                betTimes: 1,
                betEnabled: true,
                min:0,
                max:0,
                updata:0
            }
        },
        computed: {
            betAmt: function () {
                let pattern = 1;
                if (this.moneyModel == 0) {
                    pattern = 1
                }
                else if (this.moneyModel == 1) {
                    pattern = 0.1
                }
                else if (this.moneyModel == 2) {
                    pattern = 0.01
                }
                return asmd.mul(this.betCount, this.betTimes, pattern, (this.config.betInitMoney || 1))
            },
        },
        watch: {
            config: function (value) {
                this.clearUI()
                this.getGameBonusByGroupNo();
            }
        },
        mounted() {
            this.getGameBonusByGroupNo();
            this.moneyModel = this.$store.state.yjf[0] || 0
        },
        methods: {
            choiceNum(item) {
                item.selected = !item.selected
                this.validChioceNum()
            },
            clearUI: function () {
                this.config.sub.forEach(el=>{el.selected=false})
                this.betCount = 0
                this.betTimes = 1
                this.moneyModel = 0
                this.betEnabled = true
            },
            validChioceNum() { //是否完成有效投注
                this.updata = Date.now()
                let count = this.config.sub.reduce((m,el)=>{if(el.selected){return m+=1}return m},0)
                if(count>0){
                    this.betCount = count;
                    this.betEnabled = false;
                    return
                }
                this.betCount = 0;
                this.betEnabled = true;
            },
            
            // maxh(){
            //     let max = 0
            //     this.config.sub.forEach(el=>{
            //         if(max<el.bonusAmt) {
            //             max = el.bonusAmt
            //         }
            //     })
            //     return max
            // },
            // minh(){
            //     let min = 9999999
            //     this.config.sub.forEach(el=>{
            //         if(min>el.bonusAmt){
            //             min = el.bonusAmt
            //         }
            //     })
            //     return min
            // },
            //确认选号
            btnConfirmChoiceFun(arg) {
                let pattern = 1;
                if (this.moneyModel == 0) {
                    pattern = 1
                }
                else if (this.moneyModel == 1) {
                    pattern = 0.1
                }
                else if (this.moneyModel == 2) {
                    pattern = 0.01
                }

                let betRetArr = [];
                this.config.sub.forEach(el=>{
                    if(!el.selected) return;
                    let betRet = {};
                    betRet.bonusAmt = el.bonusAmt
                    betRet.eachNoteAmt = this.$store.state.global.eachNoteAmt
                    betRet.betContent = el.num
                    betRet.showContent = `[${this.config.name}]${el.num}`
                    betRet.betAmt = 0
                    betRet.betMultiple = ''
                    betRet.betNumber = 1
                    betRet.gameNo = this.$route.params.gameNo
                    betRet.gamePattern = this.moneyModel
                    betRet.groupNo = this.$route.params.gameNo + el.groupNo.toString().slice(4)
                    betRet.estimateProfit = 0
                    betRetArr.push(betRet)
                })
                this.$store.commit('setbetArr',betRetArr)
                this.clearUI()
            },
            //根据游戏编号查询游戏奖金 
            async getGameBonusByGroupNo() {
                let arr = this.config.sub;
                if (true) {

                    let res = await this.$store.cache.dispatch('getGameBonusByGroupNo',this.settings.groupNo,{timeout:10000000})
                    this.data = res;
                    arr.map((item, index) => {
                        res.map((_item, _index) => {
                            if (item.groupNo == '8801' + _item.groupNo.slice(4)) {
                                item.bonusAmt = _item.bonusAmt
                            }
                        })
                    })
                    this.updata = Date.now()
                    return;
                    this.$http({
                        method: 'get',
                        url: '/gameGroup/getGameBonusByGroupNo',
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        params: {
                            groupNo: this.settings.groupNo
                        }
                    })
                        .then(response => {
                            let data = response.data;
                            if (data.success) {
                                this.data = data.list;
                                arr.map((item, index) => {
                                    data.list.map((_item, _index) => {
                                        if (item.groupNo == '8801' + _item.groupNo.slice(4)) {
                                            item.bonusAmt = _item.bonusAmt
                                        }
                                    })
                                })
                                this.updata = Date.now()
                            }
                        })
                        .catch(error => {

                        })
                        
                }
            },
        }
    }

</script>
<style scoped lang="less">
    .fastThree-content{
  padding: 10px 10px 60px 10px;
  background-color: #fff;
  .fastThree-content-list{
    align-items: center;
    padding: 15px 0;
  }
  .fastThree-content-list .label{
    padding: 2px 8px;
    color: #7d7d7d;
    background-position: -278px -1px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    flex:1;
    text-align: center;
    margin-bottom: 15px;
    .icon-decoration_icon+p{
      width: 100%;
    }
    .icon-decoration_icon{
      color: #FDAE1F;
      margin-right: 5px;
      font-weight: bold;
    }
  }
  .fastThree-content-list .ball-panel{
    flex:5;
    flex-wrap: wrap;
    margin: 0 20px;
  }
  .fastThree-content-list .ball-panel>div{
    position: relative;
    /* flex:1; */
    p{
      padding: 15px 30px;
      /* max-width: 150px;
      height: 26px; */
      border-radius: 6px;
      border: solid 1px #e6e6e6;
      background: linear-gradient(to bottom, #fff, #f9f9f9);
      text-align: center;
      /* line-height: 26px; */
      cursor: pointer;
      box-shadow: 0 1px 4px 0 rgba(64, 64, 64, .1);
      margin: 0 8px 0 8px;
      margin-bottom: 15px;
      color: #4a4a4a;
      font-weight:300;
    }
    sup{
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .fastThree-content-list .play-btn-box{
    flex:1;
    height: 26px;
    justify-content: center;
    margin-bottom: 15px;
  }
  .fastThree-content-list .play-btn-box>p{
    width: 26px;
    height: 26px;
    border-radius: 4px;
    background: radial-gradient(circle at 70px 70px, #989595, #ffffff);
    text-align: center;
    line-height: 26px;
    font-weight: bold;
    cursor: pointer;
    margin: 0 5px;
    box-shadow: 0px 0px 1px 0px inset;
  }
  .fastThree-content-list .play-btn-box p.golbal:hover,.fastThree-content-list .play-btn-box p.golbal.active:not(:last-child){
    color: #fff;
    background: radial-gradient(circle at 70px 70px, #000, #ff5b6b);
  }
  .fastThree-content-list .ball-panel>div p.golbal:hover{
    color: #e70f0f;
    background: rgba(255, 49, 33, .15);
  }

.fastThree-content-list .ball-panel>div p.golbal.pcddred{
    border: 1px solid #ea0f0f;
}
.fastThree-content-list .ball-panel>div p.golbal.pcddgreen{
    border: 1px solid #109c08;
}
.fastThree-content-list .ball-panel>div p.golbal.pcddblue{
    border: 1px solid #137fc2;
}
.fastThree-content-list .ball-panel>div p.golbal.pcddgay{
    border: 1px solid #8e8e8e;
}

  .fastThree-content-list .ball-panel>div p.golbal.active{
    color: #fff;
    background: linear-gradient(to bottom, #ff5e3f, #ea0f0f);
  }
  .fastThree-content-list .ball-panel>div p.golbal.pcddred.active{
    color: #fff;
    background: linear-gradient(to bottom, #ff5e3f, #ea0f0f);
  }
  .fastThree-content-list .ball-panel>div p.golbal.pcddgreen.active{
    color: #fff;
    background: linear-gradient(#81d55c, #38993d);
  }
  .fastThree-content-list .ball-panel>div p.golbal.pcddblue.active{
    color: #fff;
    background: linear-gradient(#1bc0ff, #0f6ad0);
  }
  .fastThree-content-list .ball-panel>div p.golbal.pcddgay.active{
    color: #fff;
    background: linear-gradient(#9e9e9e, #717171);
  }
}
</style>