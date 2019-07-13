<style scoped>
@import '../../assets/header.css';
.check-num-btn{display: flex;background: #fff;font-size: 13px;color: #9b9b9b;padding: 5px 10px;}
.check-num-btn div{flex : 1;text-align: center;border: 1px solid #eeeeee;border-radius: 3px;padding: 5px 0;margin:5px;}
.check-active{color:#fff;border-color: #ec2829;background-color: #ec2829;}
.game-open-number-list{width: 100%;font-size: 12px; border-collapse: collapse;border-color: #eeeeee;background-color: #ffffff;}
.game-open-number-list thead{background: #f6f6f6;}
.game-open-number-list thead th{padding:4px;}
.game-open-number-list tbody tr td{text-align: center;color:#9b9b9b;padding: 4px;}
.game-open-number-list tbody tr td:first-child{color:#5e5e5e;width: 85px;}
.randers{color:#ffffff;width: 20px;height: 20px;border-radius: 10px;background-color: #ec2829;position: relative;z-index: 2;margin: auto;}
.game-checks{margin-top:44px;position: fixed;width: 100%;display: flex;height: 100%;background-color: #000;opacity: 0.8;z-index: 3;top:0;}
.btn-checks{background: #ffffff;z-index: 4;width: 100%;position: fixed;top: 0;margin-top: 44px;}
.btn-checks button{width: 31%; margin: 1%;background-color: #ffffff;border:1px solid #9b9b9b;color: #9b9b9b;font-size: 12px;}
.btn-checks>>>.weui-btn:after{border: 0px solid #9b9b9b;}
.btn-checks-active{border-color: #ec2829 !important;background-color: #ec2829 !important;color: #fff !important;}
</style>
<template>
    <div>
        <div class="header custom-header">
            <wv-flex>
                <wv-flex-item class="custom-left">
                    <div @click="$router.go(-1)" class="brack-icon">
                        <i class="el-icon-arrow-left" slot="icon"></i>
                    </div>
                    <div class="w-20" slot="right"></div>
                </wv-flex-item>
                <wv-flex-item flex="2">
                    <div @click="clickGameName(btnIsshow)" class="custom-center">
                        {{gameName}}
                        <i class="iconfont icon-xiala"></i>
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="custom-right"></div>
                </wv-flex-item>
            </wv-flex>
        </div>
        <div class="index-main" style="background: #fff">
            <div class="check-num-btn">
                <div v-for="(item,index) in showNumberType" :class="[{'check-active':item.isCheck}]" @click="checkNumberType(item)" :key="index">{{ item.label }}</div>
            </div>
            <div style="position: relative;width: 375px;margin: auto;">
                <table class="game-open-number-list" border="1">
                    <thead>
                        <tr>
                            <th>期数</th>
                            <th v-for="(item,index) in showGameTypeMark" :key="index">{{ item }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in gameOpenList" :key="index">
                            <td>{{ item.period}}</td>
                            <td v-for="(obj,ind) in item.result[checkNum]" :key="ind">
                                <span v-if="!obj.isShow">{{ obj.num }}</span>
                                <div v-if="obj.isShow" class="randers">{{ obj.num }}</div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
                <canvas id="ca" style="position: absolute;top: 0;" width="375px" height="900px"></canvas>
            </div>
        </div>
        <div class="game-checks" :style="[{'display':btnIsshow?'block':'none'}]">
        </div>
            <div class="btn-checks" :style="[{'display':btnIsshow?'block':'none'}]">
                <wv-button type="default" v-for="(item,index) in gameList" @click="chackGameBtn(item)" :class="[{'btn-checks-active':item.isCheck}]" :key="index" :mini="true">{{ item.gameName }}</wv-button>
            </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            gameNo : '1111',
            gameName : '重庆时时彩',
            gameType : '11',
            gameOpenList : [],
            gameData : [],
            startX : 105,
            startY : 44,
            addX: 28,
            checkNum : 0,
            ca : '',
            cadrow : '',
            btnIsshow : false,
            gameNumberType : {3:[{label:'百位',isCheck:true,num:0},{label:'十位',isCheck:false,num:1},{label:'个位',isCheck:false,num:2}],
                              5:[{label:'万位',isCheck:true,num:0},{label:'千位',isCheck:false,num:1},{label:'百位',isCheck:false,num:2},
                              {label:'十位',isCheck:false,num:3},{label:'个位',isCheck:false,num:4}]},
            showNumberType : [],
            gameTypeMark : {'11': ['0','1','2','3','4','5','6','7','8','9'],
                            '22': ['1','2','3','4','5','6'],
                            '44':['01','02','03','04','05','06','07','08','09','10','11',]
                            },
            showGameTypeMark : [],
            gameList : [],
            resultList : []
        }
    },
    methods : {
        /** 加载 彩种开奖结果数据 */
        loadGameOpenList() {
            this.$api.get('gameOpenNo/getLotteryResultList',{gameID:this.gameNo,pageIndex:1,pageSize:30}).then(data => {
                for(let i = 0; i < data.list.length; i++){
                    let ls = data.list[i]['result'].split(",");
                    data.list[i]['result'] = ls;
                    this.resultList.push(ls);
                }
                this.gameData = data.list;
                let result = data.list[0].result;
                this.showNumberType = this.gameNumberType[result.length];
                if(result.length == 5){
                    this.addX = 28;
                    this.startX = 105;
                }
                if(result.length == 3){
                    this.addX = 46.5;
                    this.startX = 118;
                }
                this.loadGameTypeMark(this.gameType);
                this.initShowData();
                this.canvasDrow(this.checkNum);
            });
        },
        checkNumberType(item) {            
            for(let i = 0; i < this.showNumberType.length; i++){
                this.showNumberType[i].isCheck = false;
            }
            item.isCheck = true;
            this.checkNum = item.num;
            this.canvasDrow(item.num);
        },
        chackGameBtn(item){
             for(let i = 0; i < this.gameList.length; i++){
                 
                this.gameList[i].isCheck = false;
            }          
            item.isCheck = true;
            this.gameNo = item.gameNo;
            this.gameName = item.gameName;
            this.gameType = item.gameType;
            this.checkNum = 0;
            this.btnIsshow = !this.btnIsshow;
            this.loadGameOpenList();
           
        },
        clickGameName(item){
            this.btnIsshow = !item;
        },


        loadGameTypeMark(type) {
            this.showGameTypeMark = this.gameTypeMark[type];
        },
        /** 加载所有游戏 */
        loadAllGame(){
            this.$http({method:'get',url:'getGame',headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(data => {
                if(data.data.success){
                    for(let i = 0; i < data.data.list.length; i++){ 
                        if(data.data.list[i].gameNo == this.gameNo){
                            data.data.list[i]['isCheck'] = true;
                        }else{
                            data.data.list[i]['isCheck'] = false;
                        }
                    }
                    this.gameList = data.data.list;                   
                }
            });
        },
        initShowData(){
            let gameList = this.gameData;
            for(let i = 0; i < gameList.length; i++){
                let game_open = gameList[i].result;
                let os = {};
                for(let j = 0; j < game_open.length; j++){
                    os[j] = [];
                    for(let x = 0; x < this.showGameTypeMark.length; x++) {
                        let xo = this.showGameTypeMark[x];
                        if(game_open[j] == xo){
                            os[j].push({num:xo,isShow:true,x:(this.startX+(this.addX*x)),y:(this.startY+(29*i))});
                        }else{
                            if(i > 0 && gameList[(i-1)].result[j][x].isShow)
                                os[j].push({num:1,isShow:false});
                            else if(i > 0 && !gameList[(i-1)].result[j][x].isShow){
                                os[j].push({num:(gameList[(i-1)].result[j][x].num+1),isShow:false});
                            }else{
                                os[j].push({num:1,isShow:false});
                            }
                        }
                    }
                }
                gameList[i].result = os;
            }
            this.gameOpenList = gameList;
        },


        canvasDrow(num) {
            this.cadrow.clearRect(0,0,this.ca.width,this.ca.height);  
            this.cadrow.lineWidth=2;
            this.cadrow.strokeStyle = "#ec2829";
            for(let i = 0; i < this.gameOpenList.length; i++){
                let obj = this.gameOpenList[i].result[num];
                for(let j = 0; j < obj.length; j++){
                    if(obj[j].isShow){
                        if(i == 0){
                            this.cadrow.beginPath();
                            this.cadrow.moveTo(obj[j].x,obj[j].y);
                        }else{
                            this.cadrow.lineTo(obj[j].x,obj[j].y);
                        }
                    }
                }
            }
            this.cadrow.stroke();
            this.cadrow.closePath();
        }

    },
    mounted() {
        this.gameName = this.$route.params.gameName||"重庆时时彩";
        this.gameNo = this.$route.params.gameNo||"1111";
        this.gameType = this.$route.params.gameType||"11";
        this.loadAllGame();
        this.loadGameOpenList();
        this.ca = document.getElementById("ca");
        this.cadrow = this.ca.getContext("2d");     

    }
}
</script>
