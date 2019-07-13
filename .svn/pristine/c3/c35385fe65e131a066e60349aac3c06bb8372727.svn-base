<template>
  <div>
    <x-dialog v-model="showDialog" class="dUkFeH" @on-show="initDialog">
       <div class="sc-imAxmJ johZhA">快速转账</div>
                     <p class="sc-iWadT eeeSzO">
            <span class="sc-ZUflv eAxzdB">转出：</span>{{userAcct}}<span class="fr">(主钱包)</span>
          </p>
          <p class="sc-iWadT eeeSzO">
            <span class="sc-ZUflv eAxzdB">转入：</span>{{fuqianbao}}<span class="fr">({{qianBaoName}})</span>
          </p>
           <group :gutter='0' style="margin-top: 10px;">
            <x-input title="金额：" placeholder="请输入转账金额" v-model="money" text-align="left" readonly class="eeeSzO"></x-input>
            </group>
    <group :gutter='0'>
    <checker v-model="money" default-item-class="demo5-item" selected-item-class="demo5-item-selected" style="display:flex;flex-wrap: wrap;" >
      <checker-item v-for="i in [20, 50,100,200,500,1000,2000,3000,5000]" :key="i" :value="i" class="itemFlex">￥{{i}}</checker-item>
      <checker-item :value="userAcct" class="itemFlex">最大值</checker-item>
    </checker>
      </group> 
            <div class="sc-cmUJln HmACe">
            <x-button  :disabled="isDisable" :class='{ktPVUf:!isDisable}' @click.native="zhuanhuan">确认转换</x-button>
            <x-button class="ktPVUf" @click.native="$router.push('/recharge')">去充值</x-button>
            <x-button class="ktPVUf" @click.native="enterGame" >直接进入游戏</x-button>
            <x-button class="ktPVUf" @click.native="quxiao">取消</x-button>
          </div>
    </x-dialog>
    <div class="win" id="winGame" v-if="url" >
        <div id="btnWinClose2018520" class="win-close" @click="gogog" ><div><img src="../../assets/images/home.png" /></div><p style="color:#fff;font-size:16px" >返回大厅</p></div>
        <iframe frameborder="1"  :src="url" id="full_iframe"></iframe>    
    </div>
  </div>
</template>
<script> 
import { XDialog } from "vux";
import { PopupPicker } from 'vux';
import { Checker, CheckerItem } from 'vux';
import fscreen from 'fscreen';
export default {
  data(){
      return{
         list1: [['主钱包', '开元棋牌']],
         zhuanru:[],
         zhuanchu:[],
         money:"",
         userAcct:"",
         maxAcc:"",
         isDisable:true,
         url:"",
         fuqianbao:"",
         qianBaoName:""
      }
  },
  components: {
    XDialog,
    PopupPicker,
    Checker,
    CheckerItem
  },
  props:{
    showDialog:{ type: Boolean, default: false },
    selectGameData:{type:Object,default:false}
  },
  methods:{
    initDialog(){
           this.getPlateAcct()
    //  console.log("游戏"+this.selectGameData.gameName)
    //  this.enterGame()
    },
    quxiao(){
       this.$emit("changeShow");
    },
        async refreshAcct() {
      const data = await this.$api.get("/api/chess/refreshAcct");
    },
    // 获取主账户
    // async userAcctChangeReport() {              
    //             let date = this.$Date(new Date(), 'yyyy/MM/dd');
    //             date = date + ' 00:00:01';
    //             let data = await this.$api.post('myAcctChangeReport', { startDate: date })                         
    //                 if (data.t != null) {
    //                     this.userAcct = data.t.acctAmt; 
    //                 if(this.userAcct>=10){
    //                           this.isDisable=false   
    //                           $("#zhuanhuan").addClass("ktPVUf")
    //                         }else{
    //                           this.isDisable=true
    //                            $("#zhuanhuan").removeClass("ktPVUf")
    //                         }
    //                 }
    //             },


                // 刷新钱包账户
    async getPlateAcct() {   
         
          let data = await this.$api.get('/api/chess/getPlateAcct', { plateId: this.selectGameData.gamePlateId})  
                    if (data.t != null) {
                        this.userAcct = data.t.acctPurseMoney; 
                        this.fuqianbao=data.t.salvePurseBoList[0].platPurseBalance
                        this.qianBaoName=data.t.salvePurseBoList[0].platPurseName
                         if(this.userAcct>=10){
                           this.isDisable=false 
                           $("#zhuanhuan").addClass("ktPVUf")
                         }else{
                           this.isDisable=true
                           $("#zhuanhuan").removeClass("ktPVUf")
                         }
                    }
                },
               
                // 返回主页
      async gogog(){
        const confirm=await this.$vux.confirm({ content: '确认返回开奖大厅吗', title: '操作提示', confirmText: '确认' })
                if (confirm) {
                    this.url=""
                    this.refreshAcct()
                    // this.exitScreen()
    }

                    //  this.$router.push('/');
                    //   $("#winGame").css("display","none")
                },
                // 进入游戏
  async enterGame(){
          this.$vux.loading.show({ text: '进入游戏中' })    
          let data = await this.$api.get('/api/chess/enter', { plateId: this.selectGameData.gamePlateId,gameId:this.selectGameData.id })  
          this.$emit("changeShow");
          if(data && data.t){           
            this.url=data.t   
            // this.fullScreen()
            // fscreen.fullscreenEnabled = true
            // fscreen.requestFullscreen(document);
          }else{           
                    this.$vux.toast.show({ position:'middle', type:'text', text: data.msg })
          }
          this.$vux.loading.hide({ text: '进入游戏中' })    
    },
    // 全屏
    fullScreen(){
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
                // console.log(rfs.call(el))
                if(typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                };
              return;
        },


     exitScreen(){
       let el = document.documentElement;
       let cfs=false
            if (el.exitFullscreen) {  
             cfs=  el.exitFullscreen();  
            }  
            else if (el.mozCancelFullScreen) {  
              cfs= el.mozCancelFullScreen();  
            }  
            else if (el.webkitCancelFullScreen) {  
               cfs= el.webkitCancelFullScreen();  
            }  
            else if (el.msExitFullscreen) {  
               cfs= el.msExitFullscreen();  
            } 
            console.log(cfs)
            if(typeof cfs != "undefined" && cfs) {
                cfs.call(el);
            }
        },
    // 转换金额
  async  zhuanhuan(){
    if(this.money<=this.userAcct){
    let data= await this.$tools.fetch('crypto/changePurseAcct').setParams( { masterTosalve:true,platId:this.selectGameData.gamePlateId,changeBalance:this.money}).setCrypto(true).post()
    // let data = await this.$api.postForm ('/changePurseAcct', { masterTosalve:true,platId:this.selectGameData.gamePlateId,changeBalance:this.money}) 
    if(data.success){
      // this.$dialog.alert({title: '提示',message:data.msg,skin: 'ios'});
       this.$vux.toast.show({ position:'middle', type:'text', text: data.data.msg })
       this.getPlateAcct()
    }
  
    }else{
      this.$dialog.alert({title: '提示',message:"主钱包余额不足，请先充值",skin: 'ios'});
    }

    }
  },
    created(){      
      // this.userAcctChangeReport()

    }

};
</script>
<style scoped>
@import "./tanchuang.css";

.demo5-item {
  width: 7rem;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin: 4px;
}

.demo5-item-selected {
  /* background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom; */
  border-color: #ff4a00;
}

.itemFlex {
  flex: 16%
}
iframe{
  position: fixed;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  /* z-index:1 */
}
            .win { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 501; background: rgba(0, 0, 0, 0.3); }
            .win-close { touch-action: none; width: 50px; position: absolute; top: 0; right: 0; z-index:10;}
            .win-close div { width: 100%; height: 50px; background: rgba(0,0,0, 0.3); border-radius: 10px;}
            .win-close img { width: 100%; height: 100%; }
            .win-close p { margin: 0; padding: 0; font-size: 8px; color: rgba(0, 0, 0, 0.3); text-align: center; width: 100%;}
            
</style>
