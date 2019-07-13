<template>
    <div>
        <!-- <gamelist :open='open' :getData='getData' :gameData='gameData' @getindex="selectGame"></gamelist> -->
         <div class="container">
            <div class="_10nme">
                <p class="Mjiyg">最新开奖历史>{{jsgameName}}</p>
                <table class="_2319D">
                    <thead>
                        <tr class="_3x3A0">
                            <td>彩种</td>
                            <td>期号</td>
                            <td>开奖时间</td>
                            <td width="250px;">开奖号码</td>
                            <td>走势</td>
                            <td>购买彩票</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for='sub in historyList'>
                            <tr v-if='$route.params.gameNo.substring(0,2)=="22"||$route.params.gameNo.substring(0,2)=="33"' class="_2DiFV">
                                <td>{{sub.gameName}}</td>
                                <td>{{sub.gameNumber}}</td>
                                <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:sub.gameOpenDt}"></td>
                                <td>
                                    <div class="_24dF_ null">
                                        <img class="mr5" width="20" :src="'/static_pc/images/saizi/sn'+sub.gameOpenNo.split(',')[0]+'.png'">
                                        <img class="mr5" width="20" :src="'/static_pc/images/saizi/sn'+sub.gameOpenNo.split(',')[1]+'.png'">
                                        <img class="mr5" width="20" :src="'/static_pc/images/saizi/sn'+sub.gameOpenNo.split(',')[2]+'.png'">
                                        <span>
                                            <span>
                                                <div v-for="xsub in sub.gameOpenNoCase" class="rVgzC">{{xsub}}</div>
                                            </span>
                                        </span>
                                    </div>
                                </td>
                                <td @click="onOpenQST(sub.gameNo)"><i class="iconfont icon-shujutu pointer"></i></td>
                                <td>
                                    <div class="_2EpYt" @click='gotobet(sub)'>投注</div>
                                </td>
                            </tr>
                            <tr v-else class="_2DiFV">
                                <td>{{sub.gameName}}</td>
                                <td>{{sub.gameNumber}}</td>
                                <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:sub.gameOpenDt}"></td>
                                <td>
                                    <div class="_24dF_ null">
                                        <template v-if="$route.params.gameNo.substring(0,2)=='66'">
                                            <div class="wwOAC" :class="{'_1sqf6':ball(sub.gameOpenNo.gameOpenDt)[item-1].color=='red','_2_h6A':ball(sub.gameOpenNo.gameOpenDt)[item-1].color=='blue','_2Bs9H':ball(sub.gameOpenNo.gameOpenDt)[item-1].color=='green','ml20':index==6}" v-for="(item, index) in sub.gameOpenNo.split(',')" :key="index+'on'">{{item}}</div>
                                        </template>
                                        <template v-else>
                                            <div class="wwOAC" :class="{'pAoJe':$route.params.gameNo.substring(0,2)=='55'}" v-for="(item, index) in sub.gameOpenNo.split(',')" :key="index+'on'">{{item}}</div>
                                        </template>
                                        <span>
                                            <span :style="$route.params.gameNo.substring(0,2)=='55'?'display:block;':''">
                                                <div v-for="xsub in sub.gameOpenNoCase" v-if="xsub" class="rVgzC">{{xsub}}</div>
                                            </span>
                                        </span>
                                    </div>
                                </td>
                                <td @click="onOpenQST(sub.gameNo)"><i class="iconfont icon-shujutu pointer"></i></td>
                                <td>
                                    <div class="_2EpYt" @click='gotobet(sub)'>投注</div>
                                </td>
                            </tr>
                        </template>    
                    </tbody>
                </table>
                <strong class="W-ExX">温馨提醒 : 数据来源由彩票中心官方网站提供,仅供参考。</strong>
            </div>
        </div>
            
        

    </div>
</template>

<script>
import vueQR from 'vue-qr';

import headerBet from '@/views/betHeader/index.vue'
import footerCop from '@/views/footer/index.vue'
import headerCop from '@/views/header/index.vue'
import leftFloat from '@/views/leftFloat/index.vue'
import rightFloat from '@/views/rightFloat/index.vue'
import gamelist from '@/views/gamelist/index.vue'
import gameTable from '@/views/gameTable/index.vue'


import {getOpenBall} from '@/views/betCtTimeHead/ball.js'

import axios from 'axios'
export default {
    data() {
        return {
            gameData:[],
            getData:[],
            arr:null,
            flag : true,
            url:'http://www.lm699.com',
            current:null,
            openNOs:[],
            open:true,
            historyList:[],
            jsgameName:"",
            ball:getOpenBall
        }
    },
    filters: {
      sum: function (value) {
        if (!value) return ''
        let sunNum=0
        let arr = value.split(',');
        for(let i in arr){
            sunNum+=parseInt(arr[i])
        }
        return sunNum
      },
      double:function(value){
        if (!value) return ''
        let sunNum=0
        let arr = value.split(',');
        for(let i in arr){
            sunNum+=parseInt(arr[i])
        }
        if(sunNum%2==1){
            return '单'
        }else{
            return '双'
        }    
      },
      max:function(value){
        if (!value) return ''
        let sunNum=0
        let arr = value.split(',');
        for(let i in arr){
            sunNum+=parseInt(arr[i])
        }
        if(arr.length==5){
            if(sunNum>=23){
                return '大'
            }else{
                return '小'
            } 
        };
        if(arr.length==3){
            if(sunNum>9){
                return '大'
            }else{
                return '小'
            } 
        }      
      },
      lhh:function(value){
        let arr = value.split(',');
        if(arr[0]>arr[arr.length-1]){
            return '龙'
        }else if(arr[0]<arr[arr.length-1]){
            return '虎'
        }else{
            return '和'
        }
      }
    },
    components: { headerBet,footerCop,headerCop,leftFloat,rightFloat,vueQR,gamelist,gameTable

    },
    computed:{
        
    },
    created(){
        this.getGameAll()
        this.getGameLatestOpenNoList()
    },
    watch:{
        '$route' (to, from) {
            this.getGameLatestOpenNoList()
        },
        historyList:function(){
            this.jsgameName = this.historyList[0].gameName
        }
    },
    methods:{
        onOpenQST (no) {
                window.open('/static_pc/cpRecode/index.html?game=' + no + '030001')
            },
        getGameAll(){
            let _this = this;
            axios.get('/getGameTypeAll',{params:{gameMode:'030001'}}).then(function(data){
                if(data.data.success){
                    if(data.data.list != null && data.data.list != undefined){
                        _this.getData = data.data.list
                        _this.gameData = data.data.list
                    }
                }
            });
        },
        moreOp(type,No,name){
            // window.open('/#/more/'+type+'/'+No+'/'+name)
            this.$router.push('/more/'+type+'/'+No)
        },
        getGameLatestOpenNos(Type){
            let _this = this;
            axios.get('/gameOpenNo/getGameLatestOpenNos',{params:{"gameType":Type,showCase:"s"}}).then(function(data){
                if(data.data.success){
                    if(data.data.list != null && data.data.list != undefined){
                        _this.openNOs = data.data.list
                    }
                }
            });
        },
        getGameLatestOpenNoList() {
                this.historyList = [];
                this.$http({
                    method: 'get',
                    url: '/gameOpenNo/getGameLatestOpenNoList',
                    params: {
                        gameNo: this.$route.params.gameNo,
                        size: 30,
                        showCase:true
                    }
                })
                    .then(response => {
                        let data = response.data;
                        if (data.success) {
                            if (data.list&&data.list.length > 0) {
                                this.historyList = data.list;
                                // this.historyList.map(function(item){
                                //   item.gameOpenNo = item.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",").join(',');
                                // })
                            }else{
                                this.historyList = [];
                            }

                        } else {

                        }
                    })
                    .catch(error => {

                    })
            },
        selectGame(index){
            if(index==undefined){
                this.gameData = this.getData
                this.getGameLatestOpenNos("");
            }else{
                this.gameData = [this.getData[index]]
                this.getGameLatestOpenNos(this.getData[index].gameType);
            }

        },
        gotobet(data){
                    let path = '/bet/'+this.$route.params.gameNo.toString().substring(0,2)+'/'+this.$route.params.gameNo
                    this.$router.push(path)
            } 
    },
        

}

</script>
