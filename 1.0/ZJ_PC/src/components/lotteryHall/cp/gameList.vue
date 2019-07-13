<template>  
        <div class="col _2goSw">
                <div class="row _2EmqB">
                    <div style="overflow: hidden;padding-bottom: 30px;" v-if="gamelist.length!=0" v-for='gamelist in gameData'>
                        <div style="margin-left: 5px;border-bottom: 2px solid rgb(241, 72, 72);"><h1 style="width: 120px;
                            height: 36px;
                            background: rgb(241, 72, 72);
                            color: rgb(255, 255, 255);
                            line-height: 36px;
                            text-align: center;
                            letter-spacing: 2px;
                            border-radius: 4px 4px 0 0;
                            margin: 5px 0 0 0;
                            font-size: 18px;
                            font-weight: normal;">{{gamelist.gameTypeName}}</h1></div>
                        <div v-for='item in gamelist.gameSetting' class="col w-third _2Iitq" :key="item.gameName">
                            <div class="_12glW">
                                <div class="sBVNP">
                                    <div class="_1POKy cf">
                                        <img :src="$imgPath(item.imgPath)" alt="true" class="fl" width="48px" height="48px" size="2">
                                            <div class="_3LmnO">
                                                <p class="_2Re5V">{{item.gameName}}
                                                    <button v-if='item.officialUrl!=null&&item.officialUrl!=""' class="_3-EYQ" type="button" style="height: 16px;"><a style="color: #fff" :href="item.officialUrl" target="_blank">官方网站</a></button>
                                                </p>
                                                <p class="_2ZJdu">第<span class="_3XCD2">{{item.openGameNumber}}</span> 期</p>
                                            </div>
                                    </div>
                                    <div class="tHg0v">
                                            <div class="_58wxB _2SoA4">
                                                <p>上期</p>
                                                <p>开奖</p>
                                            </div>
                                            <div  class="_58wxB">
                                                <template v-if='item.openNo!=null'>
                                                    <div v-if='item.gameType=="22"||item.gameType=="33"' class="_1ftWa">
                                                        <img class="mr5" :src="'/static_pc/images/saizi/sn'+item.openNo.split(',')[0]+'.png'" width="20">
                                                        <img class="mr5" :src="'/static_pc/images/saizi/sn'+item.openNo.split(',')[1]+'.png'" width="20">
                                                        <img class="mr5" :src="'/static_pc/images/saizi/sn'+item.openNo.split(',')[2]+'.png'" width="20">
                                                    </div>
                                                    <div v-if='item.gameType!="22"&&item.gameType!="33"' class="_1ftWa">
                                                        <div v-for="sub in item.openNo.split(',')" class="_9sF1B" :class="{'_19qTP':item.gameType=='55','_3_Wwa':item.gameType=='66','_1sIgI':item.gameType=='66'&&ball[sub-1].color=='red','dsmFg':item.gameType=='66'&&ball[sub-1].color=='green','_3feED':item.gameType=='66'&&ball[sub-1].color=='blue'}">{{sub}}</div>
                                                    </div>
                                                </template>
                                                
                                            </div>
                                    </div>
                                </div>
                                <div class="_3GTyw">
                                    <div class="_3Ag4B" @click="onOpenSM(item.gameType)"><p>玩法说明</p></div>
                                    <div class="_3Ag4B" @click="onOpenQST(item.gameNo)"><p>开奖走势</p></div>
                                    <div class="_3Ag4B _2J9vy"><p @click='gotobet(item)'>立即投注</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
</template>            
<script>
    import {ball} from '@/views/betCtTimeHead/ball.js'
    export default {
        props:["gameData"],
        data() {
            return {
                // gamelist:[],
                ball:ball
            }
        },
        watch:{
            // gameData:function(){
            //     this.gamelist=[]
            //     for(let i in this.gameData){
            //         for(let j in this.gameData[i].gameSetting){
            //             this.gamelist.push(this.gameData[i].gameSetting[j])
            //         }
            //     }
            // }
        },
        computed: {

        },
        components: {
        },
        created(){

        },
        methods:{
            onOpenSM (gameType) {
                window.open('#/lotteryRules/'+gameType)
            },
            onOpenQST (no) {
                window.open('/static_pc/cpRecode/index.html?game=' + no + '030001')
            },
            gotobet(data){
                let path = '/bet/'+data.gameType+'/'+data.gameNo + '/' + (this.$ENV.IS_OFFICIAL?'official':'credit')
                this.$router.push(path)
            }
        },
        mounted(){
            
        }
    }


</script>