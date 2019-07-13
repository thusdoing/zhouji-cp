<template>
    <div :style="`overflow-x: hidden;position: relative;height: 940px;background-color:#070918;background-image: url(${img});background-position: center top;background-repeat: no-repeat;`">
        <!-- <img style="width: 1920px;max-width: none;position: absolute;left: 50%;transform: translateX(-50%)" src="./qp.jpg" alt=""> -->
        <div style="width: 1000px;margin: auto;position: relative;">
            <ul class="qptitle">
                <li :class="{active:item.active}" v-for="(item,index) in plateGameAll" :key="index" @mouseover="goactive(index)">{{item.oPlatName}}</li>
            </ul>
            <div style="width: 920px; height: 508px; position: absolute; top: 350px; left: 40px; overflow: auto; padding-top: 20px;">
                <div class="qpcont" v-for="(item, index) in plateGameAll" :key="index" v-if="item.active">
                    <div class="coninner">
                        <div class="qpitem" @click="goBefore(sub.gamePlateId,sub.id)" v-for="(sub, index2) in item.gList" :key="index2">
                            <div><img style="width: 120px;height: 120px;" :src="$imgPath(sub.gameIoc)" alt=""></div>
                            <div class="innnnner" style="height: 30px; width: 130px;">
                                <div class="lab1">{{sub.gameName}}</div>
                                <!-- <div class="lab4">进入游戏</div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div>
                    <Modal v-model="goingFlag" width="600" class-name="qipaimodal">
                        <p slot="header">
                            <span class="sc-ccXozh hkQvGy">快速转账</span>
                        </p>
                        <div>
                            <div class="sc-kbGplQ bfaxTw">
                                <div class="sc-exdmVY VmTQA">
                                    <label class="sc-evWYkj dEvJBk">转出:</label>
                                    <p class="sc-idjmjb gDbsnk">{{userPurseBo.acctPurseMoney||0.0000}}</p>
                                    <p class="sc-fHlXLc htwGHy">(主钱包)</p>
                                </div>
                                <div class="sc-exdmVY VmTQA">
                                    <label class="sc-evWYkj dEvJBk">转入:</label>
                                    <p class="sc-idjmjb gDbsnk">{{userPurseBo.salvePurseBoList[0].platPurseBalance||0.0000}}</p>
                                    <p class="sc-fHlXLc htwGHy">({{userPurseBo.salvePurseBoList[0].platPurseName}})</p>
                                </div>
                                <div class="sc-exdmVY VmTQA">
                                    <label class="sc-evWYkj dEvJBk">金额:</label>
                                    <input v-model="jine" type="text" size="5" placeholder="请输入转账金额" disabled="" class="sc-glUWqk jobBuP" style="width: 215px; height: 30px;">
                                    <div class="sc-iKpIOp GFUtd">
                                        <p class="sc-AqAhp gSTtgA" @click="jine = (userPurseBo.acctPurseMoney||0.0000)">最大值</p>
                                    </div>
                                </div>
                                <div class="sc-cClmTo KYGEu">
                                    <div class="sc-iKpIOp GFUtd" v-for="(item, index) in jineList" :key="index" @click="jine=item">
                                        <p class="sc-AqAhp gSTtgA">{{item}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="sc-cZLAbK crCHkK">
                                <button type="button" class="sc-iVOTot kkgMHn" :class="{jOMNep:rechangQipaiFlag}" @click="rechangQipai">确认转账</button>
                                <button type="button" class="sc-iVOTot jOMNep" @click="gogame()">直接进入游戏</button>
                            </div>
                        </div>
                        <div slot="footer">
                            
                        </div>
                    </Modal>
                </div>
        </div>
        
    </div>
</template>
<script>
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper';
export default {
    components:{swiper,swiperSlide},
    data() {
      return {
          swiperOption: {
              slidesPerView: 4,
              spaceBetween: 0,
              autoplay: {
                  delay: 3000,
                  stopOnLastSlide: false,
                  disableOnInteraction: true,
                },
                speed:2000,
            },
            goingFlag:false,
            jineList:[10,20,50,100,200,500,1000,2000,3000,5000],
            jine:'',
            plateGameAll:[],
            gamePlateId:'',
            gameid:'',
            userPurseBo:{
                acctPurseMoney:0,
                salvePurseBoList:[{}]
            },
            img:require('./qp.jpg')
        }
    },
    computed: {
        rechangQipaiFlag:function(){
            if(this.jine>0 && this.jine<=this.userPurseBo.acctPurseMoney)
            {return true}else{return false}
        }
    },
    created() {
        this.getPlateGameAll()
    },
    methods: {
        async getPlateGameAll(){
            const res = await this.$tools.fetch('/api/chess/getPlateGameAll').get();
            if(res.success){
                this.plateGameAll = (res.data.list || []).map((el,i)=>{
                    if(i==0){el.active = true;return el}
                    return el.active = false,el;
                })
            }
        },
        goBefore(d,s){
            const isLogged = Boolean(sessionStorage.getItem('userInfo'));
            if(!isLogged){
                return this.$Modal.info({
                    title: '提示',
                    content: "请先完成登录！",
                });
            }
            this.goingFlag = true
            this.gamePlateId = d
            this.gameid=s
            this.jine = 0
            this.getPlateAcct()
        },
        async gogame(){
            this.$Spin.show();
            const res = await this.$tools.fetch.get('/api/chess/enter',{plateId:this.gamePlateId,gameId:this.gameid});
            this.goingFlag = false
            this.$Spin.hide();
            if(res.success){
                window.open(res.data.t)
            }else{
                this.$Modal.error({
                    title: '提示',
                    content: res.message||'进入失败，请重试',
                });
            }
        },
        async rechangQipai(){
            if(!this.rechangQipaiFlag) return false;
            this.$Spin.show()
            const res = await this.$tools.fetch('/crypto/changePurseAcct').setCrypto().post({masterTosalve:true,platId:this.gamePlateId,changeBalance:this.jine})
            this.$Spin.hide()
            if(res.success){
                this.$Modal.success({
                    title: '提示',
                    content: res.message||'充值成功！',
                });
                await this.getPlateAcct()
                this.jine=0
            }else{
                this.$Modal.error({
                    title: '提示',
                    content: res.message||'充值失败！',
                });
            }
        },
        async getPlateAcct(){
            const res = await this.$tools.fetch.get('/api/chess/getPlateAcct',{plateId:this.gamePlateId});
            if(res.success){
                this.userPurseBo = res.data.t
            }else{
                this.$Modal.error({
                    title: '提示',
                    content: res.message||'查询失败！',
                });
            }
        },
        goactive(index){
            this.plateGameAll = this.plateGameAll.map((el,i)=>{
                if(i==index){el.active = true;return el}
                return el.active = false,el;
            })
        }
    },
}
</script>
<style>
.swpbox{margin-top: 10px;border: 1px solid #D8D8D8;height: 250px;}
.swpinbox{cursor: pointer;}
.swpinbox:hover .swpbutton{background: #C81722;color: #fff;}
.swpinbox:hover .lab2{display: none}
.swpinbox:hover .lab3{display: block}

.swpbutton{height: 55px;background: #F3F3F3;position: absolute;bottom: 0;width: 100%;text-align: center;}
.lab1{ font-size: 16px;margin-top: 10px;}
.lab2{ font-size: 12px;margin-top: 4px;}
.lab3{display: none;font-size: 12px;margin-top: 4px;}

.qpcont{}
.qptit{color: rgb(74, 74, 74);font-size: 16px;padding-left: 20px;line-height: 44px;border-bottom: 1px dashed #d8d8d8; }
.coninner{display: flex; flex-wrap: wrap;}
.qpitem{cursor: pointer; display: flex; width: 20%; align-items: center;flex-flow: column;padding-top: 10px;}
.innnnner{position: relative;}
.innnnner .lab1{font-size: 14px;text-align: center;}
.innnnner .lab2{color:#999;}
.innnnner .lab4{display: none;font-size: 14px;color: #fff;background: #C81722;position: absolute;width: 100%;height: 100%;top: 0;left: 5px;text-align: center;line-height: 56px;}
.qpitem:hover .lab1{color: #dfa41e;font-weight: bold;}
.hkQvGy { font-size: 20px; font-weight: 500; color: rgb(46, 65, 88); }

.qipaimodal{ display: flex; align-items: center; justify-content: center; }
.qipaimodal .ivu-modal{ top: 0; }
.qipaimodal .ivu-modal-header{border-bottom: 2px dashed #d8d8d8;}
.qipaimodal .ivu-modal-footer{display: none}
.VmTQA { margin-top: 20px; display: flex; align-items: center; }
.dEvJBk {
    letter-spacing: 1.6px;
    flex: 0 0 47px;
}
.gDbsnk {
    flex: 0 0 215px;
    margin: 0px;
}
.VmTQA > :last-child {
    margin: 0px 0px 0px 5px;
}
.jobBuP {
    box-sizing: border-box;
    width: 233px;
    height: 32px;
    outline: none;
    padding: 2px 4px 2px 8px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
    border-image: initial;
}
.GFUtd {
    width: 50px;
    height: 30px;
    background-color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-style: solid;
    border-color: #d8d8d8;
    border-image: initial;
    margin: 5px 2px 0px 0px;
    cursor: pointer;
}
.GFUtd:hover{
    border-color: #4AA9DB;
}
.VmTQA > :last-child {
    margin: 0px 0px 0px 5px;
}
.gSTtgA {
    text-align: center;
    color: rgb(115, 115, 115);
    margin: 0px;
}
.KYGEu {
    width: 275px;
    margin: 15px 0px 20px 47px;
}
.crCHkK {
    display: flex;
    justify-content: center;
    margin: 24px 0px;
}
.kkgMHn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: rgb(255, 255, 255);
    letter-spacing: 1.3px;
    line-height: 30px;
    width: 130px;
    height: 30px;
    cursor: not-allowed;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    outline: 0px;
    background: none rgb(216, 216, 216);
    padding: 0px 14px;
    border-radius: 2px;
    margin: 0px 5px;
}
.jOMNep {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: rgb(255, 255, 255);
    letter-spacing: 1.3px;
    line-height: 30px;
    width: 130px;
    height: 30px;
    cursor: pointer;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    outline: 0px;
    background: none rgb(46, 65, 87);
    padding: 0px 14px;
    border-radius: 2px;
    margin: 0px 5px;
}
.qptitle{
    position: absolute;
    top: 215px;
    padding-left: 30px;
}
.qptitle li{
    font-size: 30px;color: #ffffff;float: left;
    width: 310px;
    text-align: center;
    line-height: 100px;
}
.qptitle li.active{
    color: #ffff4a;
}
</style>