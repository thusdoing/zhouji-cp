<template>
    <div style="height:100%;overflow: hidden;" class="betView">
        <x-header :left-options="{backText: ''}" @on-click-back="$router.go(-1)">投注方案</x-header>

        <div style="position:absolute;top:46px;bottom:0;left:0;right:0;background-color:#f6f6f6;">
            <div>
                <!-- <p style="padding:5px;text-align:center;font-size:14px;">3423423期 2018-10-10 10:10:10截止</p>   -->
                <div style="background-color:#fff;padding:5px;display:flex;justify-content: space-between;">
                    <button style="border:1px solid #e6e6e6;padding:3px 8px;font-size:16px;background-color:#f6f6f6;" @click="$router.go(-1)">
                        <i class="iconfont icon-jiahao"></i>手动选号
                    </button>
                    <button style="border:1px solid #e6e6e6;padding:3px 8px;font-size:16px;background-color:#f6f6f6;" @click="clearBet">
                        <i class="iconfont icon-lajixiang"></i>全部清空
                    </button>
                </div>
            </div>

            <div style="position:absolute;top:40px;left:0;right:0;bottom:157px;padding:10px 0;overflow: auto;">
                <div style="padding:5px;display:flex;background-color:#fff;margin-bottom:10px;word-break: break-all;" v-for="(item, index) in betRets"
                    :key="index">
                    <div style="flex:1;border-right:1px solid #e6e6e6;font-size:14px;">
                        <p style="font-size:18px;color:#ec2829;">{{ item.showContent }}</p>
                        <p>{{ item.betNumber }}注 {{ item.betMultiple }}倍 {{ item.betAmt }}元</p>
                    </div>
                    <div style="margin: auto 15px;height: 20px; width: 20px;border-radius: 10px; background: #9b9b9b;text-align: center;align-items: center;line-height: 21px;color: #fff;font-size: 10px;"
                        @click="deleteBet(index)">
                        X
                    </div>
                </div>

            </div>

            <div style="position:absolute;bottom:0;left:0;right:0;background-color:#fff;">
                <div style="background-color:#fff;margin-bottom: 60px;">
                    <group>
                        <x-number title="投注倍数" v-model="betTimes" :min="1" fillable></x-number>
                    </group>
                    <group>
                        <x-number title="连续购买期数" v-model="qCount" :min="1" fillable></x-number>
                    </group>
                    <div style="text-align:center;padding:5px;font-size:14px;">
                        <check-icon :value.sync="zjStop">中奖后追号停止</check-icon>
                    </div>
                </div>

                <div class="okbet-wraps">
                    <label>已选</label>
                    <label style="color:yellow;">{{ totalBetNumber }}</label>
                    <label>注,</label>
                    <label style="color:yellow;">{{betTimes}}</label>
                    <label>倍,</label>
                    <label style="color:yellow;">{{qCount}}</label>
                    <label>期,</label>
                    <label>共</label>
                    <label style="color:yellow;">{{ totalBetAmt }}</label>
                    <label>元</label>
                    <Button class="btn-error" @click="onSuperBet">确认投注</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {
    XHeader,
    Confirm,
    Group, 
    XNumber,
    CheckIcon,
    AlertModule,
  } from 'vux'

  import {  
    DELETE_BET,
    CLEAR_BETRESULT
  } from '../../state/mutation-type'

  import asmd from '@/assets/js/asmd'
  import _ from "lodash"
  export default {
    components: {
      XHeader,
      Confirm,
      Group, 
      XNumber,
      CheckIcon,
      AlertModule,
      Confirm
    },
    data() {
      return {
        qCount: 1,
        betTimes: 1,
        betCount: 0,
        betAmt: 0,
        zjStop: false,
        once:false
      }
    },
    watch:{
      
    },
    created(){
      if(this.betRets.length<=0){
        this.$router.go(-1);
      }
     // console.log(this)
    },
    computed: {
      betRets () {
        return this.$store.state.betRets
      },
      totalBetNumber () {
        return this.$store.getters.totalBetNumber
      },
      totalBetAmt () {
        return asmd.mul(this.$store.getters.totalBetAmt, this.betTimes, this.qCount)
      }
    },
    methods: {
      deleteBet (index) {
        this.$store.commit(DELETE_BET)
      },
      clearBet () {
        this.$store.commit(CLEAR_BETRESULT)
      },
      onSuperBet () {
         let _this = this
          if(this.once){
            // console.log(111111)
            return false
          }
          this.once  = true
          // console.log(222222)
        if(this.qCount===1){
          let betArr = _.cloneDeep(this.betRets)
          betArr.forEach((item,index)=>{
              item.betAmt = this.$asmd.mul(item.betAmt, this.betTimes);
              item.estimateProfit = this.$asmd.mul(item.estimateProfit, this.betTimes);
              item.betMultiple = this.betTimes;
          })

          if (!betArr || betArr.length == 0) {
            this.once = false;
            return this.$dialog.alert({title: '提示信息',message: "请选择投注方案！",skin: 'ios'});
          }

          this.$api.post(
                '/game/bet',
                betArr
              ).then(response => {
                this.once  = false
                let data = response;
                let content = '';
                if (data.success) {
                  //content = '投注成功';
                  // sessionStorage.setItem('betGameNo',this.betRets[0].gameNo);
                  // this.$router.push('/betDetails');
                  this.$store.commit(CLEAR_BETRESULT);

                  (async () => {
                    this.once = false;
                    const title = '提示';
                    const message = '投注成功';
                    const confirmButtonText = '查看投注';
                    const cancelButtonText = '继续投注';
                    const skin = "ios";
                    const confirm = await this.$dialog.confirm({ title, message, confirmButtonText, cancelButtonText, skin}).then(_ => true, _ => false);
                    // 取消：继续投注
                    if (!confirm) return _this.$router.go(-1);
                    // 查看投注
                    this.$router.push('/betRecordsview');
                  })();
                  // this.$vux.confirm.show({
                  //   title:'提示',
                  //   content:'投注成功',
                  //   onCancel () {
                  //     _this.$router.go(-1)
                  //   },
                  //   onConfirm () {
                  //     _this.$router.push('/betRecordsview')
                  //   },
                  //   confirmText:'查看投注',
                  //   cancelText:'继续投注'
                  // })
                } else {
                  this.once = false;
                  this.$dialog.alert({title: '提示信息',message: data.msg,skin: 'ios'});
                  // AlertModule.show({
                  //   title:'提示',
                  //   content:data.msg,
                  // })
                }
              },()=>{
                 this.once  = false
              });
        }else{
          if (!this.betRets || this.betRets.length == 0) {
            this.once = false;
            return this.$dialog.alert({title: '提示信息',message: "请选择投注方案！",skin: 'ios'});
          }

          this.$http({
          method: 'get',
          url: '/gameOpenNo/getGameNextOpenNoList',
          params: {
            gameNo: this.betRets[0].gameNo,
            size: this.qCount,
          },
        })
        .then(response => {
          let data = response.data;
          if (data.success) {
            let superaddition = [];
            let objArr = [];
            data.list.forEach(el => {
              superaddition.push({
                expectGameNumber: el.gameNumber,
                superadditionBetMultiple: this.betTimes,
                superadditionBetAmt: asmd.mul(this.$store.getters.totalBetAmt, this.betTimes),
                ifStopAfterWin: +this.zjStop,
                ifStopWhenJump: 0
              })
            })
            // _.cloneDeep(this.betRets).forEach((item, index)=> {
            //     delete item.showContent;
            //     delete item.betBackRate;
            //     objArr.push(item)
            //   });
            let betArr = _.cloneDeep(this.betRets);

            if (betArr && betArr.length > 1) {
              this.once = false;
              return this.$dialog.alert({title: '提示信息',message: "每次追投只能选择一个投注方案！",skin: 'ios'});
            }

            betArr.forEach((item,index)=>{
              superaddition.forEach((sitem,index)=>{sitem.superadditionBetAmt =  this.$asmd.mul(item.betAmt, this.betTimes)})
              objArr.push(JSON.parse(JSON.stringify(superaddition)))
              let betBaseVo = [item];
              // for(let i = 0; i < betBaseVo.length; i++){
              //   betBaseVo[i].betAmt = this.$asmd.mul(betBaseVo[i].betAmt, this.betTimes);
              //   betBaseVo[i].estimateProfit = this.$asmd.mul(betBaseVo[i].estimateProfit, this.betTimes);
              //   betBaseVo[i].betMultiple = this.betTimes;
              // }
              if (!betArr || betArr.length == 0) {
                this.once  = false
                return this.$dialog.alert({title: '提示信息',message: "请选择投注方案！",skin: 'ios'});
              }

              this.$api.post(
                '/game/superadditionBet',
                {
                  superadditionBetBaseVos: objArr[index],
                  betBaseVos: betBaseVo,
                }
              )
              .then(response => {
                this.once  = false
                let data = response;
                let content = '';
                if (data.success) {
                  //content = '投注成功';
                  // sessionStorage.setItem('betGameNo',this.betRets[0].gameNo);
                  
                  // this.$router.push('/betDetails');
                  this.$store.commit(CLEAR_BETRESULT);
                  (async () => {
                    this.once = false;
                    const title = '提示';
                    const message = '投注成功';
                    const confirmButtonText = '查看投注';
                    const cancelButtonText = '继续投注';
                    const skin = "ios";
                    const confirm = await this.$dialog.confirm({ title, message, confirmButtonText, cancelButtonText, skin}).then(_ => true, _ => false);
                    // 取消：继续投注
                    if (!confirm) return _this.$router.go(-1);
                    // 查看投注
                    this.$router.push('/betRecordsview');
                  })();
                  // this.$vux.confirm.show({
                  //   title:'提示',
                  //   content:'投注成功',
                  //   onCancel () {
                  //   _this.$router.go(-1)
                  //   },
                  //   onConfirm () {
                  //     _this.$router.push('/betRecordsview')
                  //   },
                  //   confirmText:'查看投注',
                  //   cancelText:'继续投注'
                  // })
                } else {
                  this.once  = false
                  this.$dialog.alert({title: '提示信息',message: data.msg,skin: 'ios'});
                  // AlertModule.show({
                  //   title:'提示',
                  //   content:data.msg,
                  // })
                }
                


              })
            })
              
          }else{
            this.once  = false
            this.$dialog.alert({title: '提示信息',message: data.msg,skin: 'ios'});
            // AlertModule.show({
            //   title:'提示',
            //   content:data.msg,
            // })
          }
        },()=>{})
        }


        
      }
    }
  }

</script>
<style lang="less" scoped>
  @import './betView.less';

  .betView /deep/ .weui-cells {
    margin-top: 0;
  }

  .betView /deep/ .weui-cell {
    padding: 8px 15px;
    font-size: 14px;
  }

  .okbet-wraps {
    padding: 10px;
    font-size: 14px;
    background-color: rgba(0,0,0,0.78);
    color: #fff;
    line-height: 40px;
    position: fixed;
        width: 95%;
    bottom: 0;

    & > i {
      font-size:30px;
      vertical-align: middle;
    }

    .btn-error {
      display: block;
      width: 80px;
      line-height: 40px;
      text-align: center;
      background: #ec2829;
      color: #ffffff;
      font-size: 14px;
      font-weight: 400;
      border-radius: 3px;
      border-width: 0;
      border-color: #ec2829;
      padding: 0 4px;
      position: relative;
      float:right;
      font-size:14px;

      &:focus {
        outline: none;
      }
    }
  }
</style>
