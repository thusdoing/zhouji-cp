<template>
    <div class="bettop">
        <div class="gameinfo">
            <div style="line-height: 50px;font-size: 24px;font-weight: bolder;color: #000;">{{cgame.gameName}}</div>
            <div><img style="width: 65px;height: 65px;" :src="$imgPath(cgame.imgPath)" alt=""></div>
        </div>
        <div class="gametime">
            <p>距 <span style="color: #FA0612;">{{gameData.gameNumber}}</span> 期{{text}}：</p>
            <div><timer  :gameData="gameData" :timediff="timediff" @end="handleEnd" @modal="modal"></timer></div>
        </div>
        <div class="gameopen">
            <p>第 <span style="color: #FA0612;">{{gameData.lastGameNumber}}</span> 期开奖号码：</p>
            <div :class="animateFlag?'openState':''">   
                            
                <div v-if="$route.params.gameType==22" style="text-align: center;margin-top: -7px;">
                    <img style="width: 63px;" class="k3open" v-for="(item, index) in OpenNumber" :key="index" :src="`/static_pc/images/saizi/dsz${item}.png`" alt="">
                </div>


                <div v-if="$route.params.gameType!=22&&$route.params.gameType!=66" class="openball" style="text-align: center;">
                    <div v-for="(item, index) in OpenNumber" :key="index">
                        <div>
                            <span>{{item}}</span><span v-for="(s, index) in 10" :key="index">{{index}}</span>
                        </div>
                    </div>
                </div>

                <div v-if="$route.params.gameType==66&&lhcball" class="lhcopenball" style="text-align: center;">
                    <div v-if="index<6" v-for="(item, index) in OpenNumber" :key="index">
                        <div class="lhc-ball" :class="[lhcball[item-1].color]"><span>{{item}}</span><span v-for="(item, index) in 49" :key="index">{{item}}</span></div>
                        <div style="line-height: 30px;">{{lhcball[item-1].zoo}}</div>
                    </div>
                    <template v-if="index==6" v-for="(item, index) in OpenNumber">
                        <div>
                            <div style="position: relative;top: -30px;">+</div>
                        </div>
                        <div>
                            <div class="lhc-ball" :class="[lhcball[item-1].color]"><span>{{item}}</span><span v-for="(item, index) in 49" :key="index">{{item}}</span></div>
                            <div style="line-height: 30px;">{{lhcball[item-1].zoo}}</div>
                        </div>
                    </template>
                </div>

            </div>
        </div>
        <Modal v-model="jztz" width="300" class-name="vertical-center-modal" :closable="false">
            <p slot="header" style="text-align:center">
                温馨提示
            </p>
            <div style="text-align:center;padding: 15px 0">
                <p>第
                    <span style="color: #ed3f14">{{jzqh}}</span>期</p>
                <p>投注已截止</p>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="error" size="large" long @click="jztz=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {getOpenBall,pcddball} from './assets/ball.js'
    import timer from '../../timer.vue'
    export default {
        components:{timer},
        data(){
            return {
                gameData: {},
                timediff: '',
                text: '',
                OpenNumber: [],
                animateFlag: false,
                interID:0,
                timeoutID:0,
                jztz:false,
                jzqh:"",
                lhcball:'',
                pcddball:pcddball,
                gameOpenlastGameNumber:"",
                isUpdate1:true,
                isUpdate2:false,
                gameOpenlastOpenNumber:""
            }
        },
        computed: {
            cgame:function(){
                let o = {}
                
                this.$store.state.gameAll.map(el=>{
                    el.gameSetting.map(s=>{
                        if(s.gameNo == this.$route.params.gameNo){
                            o=s
                        }
                    })
                })
                // console.log(o)
                return o
            },
            isUpdate:function(){
                        return( this.isUpdate1 && this.isUpdate2)
            }
        },
        watch:{
            gameOpenlastGameNumber:function(){
                 console.log(this.gameOpenlastGameNumber)
                    this.isUpdate1=true     
            },
            gameOpenlastOpenNumber:function(){
                 console.log(this.gameOpenlastOpenNumber)
                 if(this.gameOpenlastOpenNumber){
                     this.isUpdate2=true 
                 }                        
            },
            isUpdate:function(){
                // console.log(this.isUpdate,this.isUpdate1,this.isUpdate2)
                if(this.isUpdate){
                     this.isUpdate1=false      
                     this.isUpdate2=false                     
                    console.log("这下真的要更新了============="+this.gameOpenlastGameNumber)                       
                     this.$store.commit('yu_e')  
                }

            }
        },
        methods: {
            getGameOpen(params){
                this.$http.get('/gameOpenNo/getGameOpen?gameNo='+this.$route.params.gameNo).then(data=>{
                    if(data.data.success){
                        this.timediff = Math.ceil((data.data.t.serverTime-Date.now())/1000)   
                        console.log(this.timediff)               
                        this.gameData = data.data.t
                        this.lhcball = getOpenBall(data.data.t.gameOpenDt)
                        this.gameOpenlastGameNumber=data.data.t.lastGameNumber
                        this.gameOpenlastOpenNumber=data.data.t.lastOpenNumber

                        // console.log(this.gameOpenlastGameNumber)
                        this.headleOpenNumber(data.data.t.lastOpenNumber,params)
                    }
                }).catch((e)=>{
                    // console.log(e)
                    setTimeout(()=>{this.getGameOpen()},3000)
                })
            },
            headleOpenNumber(openNo,params){
                this.OpenNumber = []
                if (openNo) {
                    this.animateFlag = false
                    clearInterval(this.interID)
                    // console.log(this.animateFlag)
                    // if('通知更新'==params){
                        
                    // }
                    // if(this.isUpdate1 && this.isUpdate2){
                    //     this.isUpdate1=false      
                    //     this.isUpdate2=false                     
                    //     console.log("这下真的要更新了")
                       
                    //     this.$store.commit('yu_e')                        
                    // }
                    return this.OpenNumber = openNo.split(',')
                } else {
                    this.animateFlag = true
                    if (this.$route.params.gameType == '22') {
                        this.OpenNumber = [1, 1, 1].map(el => Math.ceil(Math.random() * 6))
                        clearInterval(this.interID)
                        this.interID = setInterval(()=>{
                            this.OpenNumber = [1, 1, 1].map(el => Math.ceil(Math.random() * 6))
                        },2000)
                    }
                    if (this.$route.params.gameType == '11'||this.$route.params.gameType == '44') {
                        this.OpenNumber = [1, 1, 1,1,1].map(el => Math.ceil(Math.random() * 10))
                    }
                    if (this.$route.params.gameType == '55') {
                        this.OpenNumber = [1, 1, 1,1,1,1,1,1,1,1].map(el => Math.ceil(Math.random() * 10))
                    }
                    if (this.$route.params.gameType == '66') {
                        this.OpenNumber = [1, 1, 1,1,1,1,1].map(el => Math.ceil(Math.random() * 10))
                    }
                    if (this.$route.params.gameType == '88') {
                        this.OpenNumber = [1, 1, 1].map(el => Math.ceil(Math.random() * 10))
                    }
                    clearTimeout(this.timeoutID)
                    this.timeoutID = setTimeout(this.getGameOpen, 10000,'通知更新')
                }
                
            },
            handleEnd(item){
                  if(item.newData){
                    // console.log(item.newData)
                    
                    this.gameData = item.newData
                    this.gameOpenlastGameNumber=item.newData.lastGameNumber
                    this.gameOpenlastOpenNumber=item.newData.lastOpenNumber
                    // console.log(this.gameOpenlastGameNumber)                  
                    this.headleOpenNumber(item.newData.lastOpenNumber)
                    if(item.newData.gameStatus=='2'){
                        this.$store.commit('setisstop',true)
                    }else{
                        this.$store.commit('setisstop',false)
                    }
                }else{
                    if(item.gameStatus=='2'){
                        this.$store.commit('setisstop',true)
                    }else{
                        this.$store.commit('setisstop',false)
                    }
                }
                this.text = item.text
                
            },
            modal(gameNumber){
                this.jztz = true
                this.jzqh = gameNumber
                setTimeout(() => {
                    this.jztz = false
                }, 4000);
            }
        },
        mounted() {
            this.getGameOpen()
        },
        destroyed() {
            clearInterval(this.interID)
            clearTimeout(this.timeoutID)
        },
    }
</script>
<style lang="less">
    .bettop{
        padding: 0 10px;
        display: flex;
        height: 170px;
        .gameinfo{
            flex: 3;
            margin: 15px 5px;
            background: #ECF0F1;
            border-radius: 5px;
            div{text-align: center;}
        }
        .gametime{
            flex: 4;
            margin: 15px 5px;
            background: #ECF0F1;
            border-radius: 5px;
            p{text-align: center;line-height: 65px;font-size: 14px;font-weight: bold;}
            >div{font-size: 40px;line-height: 50px; color: #fff;width: 220px;background: #445366;margin: auto;text-align: center;border-radius: 6px;}
        }
        .gameopen{
            flex: 3;
            margin: 15px 5px;
            background: #ECF0F1;
            border-radius: 5px;
            p{text-align: center;line-height: 65px;font-size: 14px;font-weight: bold;}
        }
    }
    .openball{
        display: flex;
        justify-content: center;
        >div{
            width: 42px;
            height: 48px;
            padding-bottom: 6px;
            margin: 0 5px;
            line-height: 38px;
            color: #a12836;
            font-size: 22px;
            background: url('/static_pc/images/ballOpenBg.png');
            span{ display: block; }
            div{overflow: hidden;width: 38px; height: 38px;margin: 2px;}
        }
    }
    
    @keyframes ballgundong {
        0% {
            transform: translateY(0px)
        }
        
        100% {
            transform: translateY(-352px)
        }
    }
    
    @keyframes lhcballgundong {
        0% {
            transform: translateY(0px)
        }
        
        100% {
            transform: translateY(-1500px)
        }
    }
    
    .openState .openball span{
        animation: ballgundong .3s linear infinite;
    }
    .openState .lhcopenball span{
        animation: lhcballgundong .3s linear infinite;
    }
    .lhcopenball{
        >div{display: inline-block;font-size: 14px;}
        .aa{}
        .lhc-ball{
            margin: 0 3px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            line-height: 30px;
            color: #fff;
            box-shadow: 0 1px 1px #bbb59c;
            overflow: hidden;
            span{
                display: inline-block;
                width:30px;
            }
        }
        .blue{
            background: linear-gradient(#6ebefa,#218ddd 75%);
        }
        .red{
            background: linear-gradient(#f87b7e,#dc3b40 75%);
        }
        .green{
            background: linear-gradient(#69d893,#38b366 75%);
        }
    }
</style>