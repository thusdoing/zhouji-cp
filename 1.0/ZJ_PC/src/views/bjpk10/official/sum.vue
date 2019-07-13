<template>
    <div>
        <div class="fastThree-content playBoxNum">

            <p style="padding:10px 0 30px;">
                <Icon type="information-circled" style="color:red;"></Icon>
                <label style="font-size:13px;" v-html="config.description"></label>
                <!-- <Tooltip placement="bottom-start">
                    <div slot="content" v-html="config.rule" style="white-space: normal;"></div>
                    <label style="text-decoration:underline;font-size:13px;color:red;">规则</label>
                </Tooltip> -->
                <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
                    <div slot="content" v-html="config.example" style="white-space: normal;"></div>
                    <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
                </Tooltip>
            </p>

            <div class="fastThree-content-list flex" v-for="(itemWarp,DataNumIndex) in (this.config ? this.config.sub : [])" :key="DataNumIndex">
                <div class="label flex" v-if="itemWarp.unit">
                    <p class="iconfont icon-decoration_icon"></p>
                    <p v-text="itemWarp.unit"></p>
                </div>
                <div class="ball-panel">
                    <div class="flex" style="display:flex;justify-content: center;">
                        <div v-for="(item,index) in datalist" :key="index" v-if="index>16" style="flex:none;">
                            <p class="golbal" style="border-radius:6px;margin:0 15px 15px;font-size:24px;line-height:50px;width: 52px;height: 52px;padding:0;"
                                @click="choiceNum($event,DataNumIndex,8+index)" v-text="item.groupName"></p>
                                <h6 style="color: #4a4a4a;font-size: 12px;text-align: center;margin-bottom: 25px;font-weight: normal;margin-top: -10px;">赔{{item.bonusAmt}}</h6>
                        </div>
                    </div>
                    <div class="flex" style="display:flex;">
                        <div v-for="(item,index) in datalist" :key="index" v-if="index<9" style="flex:none;">
                            <p class="golbal" style="border-radius:6px;margin:0 15px 15px;font-size:24px;line-height:50px;width: 52px;height: 52px;padding:0;"
                                @click="choiceNum($event,DataNumIndex,8+index)" v-text="item.groupName"></p>
                                <h6 style="color: #4a4a4a;font-size: 12px;text-align: center;margin-bottom: 25px;font-weight: normal;margin-top: -10px;">赔{{item.bonusAmt}}</h6>
                        </div>
                    </div>
                    <div class="flex" style="display:flex;">
                        <div v-for="(item,index) in datalist" :key="index" v-if="index>=9&&index<=16" style="flex:none;">
                            <p class="golbal" style="border-radius:6px;margin:0 15px 15px;font-size:24px;line-height:50px;width: 52px;height: 52px;padding:0;"
                                @click="choiceNum($event,DataNumIndex,8+index)" v-text="item.groupName"></p>
                                <h6 style="color: #4a4a4a;font-size: 12px;text-align: center;margin-bottom: 25px;font-weight: normal;margin-top: -10px;">赔{{item.bonusAmt}}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="okbet-wraps" style="margin-top: 1px;padding: 10px;background-color: #fff;font-size: 13px;">
            <label>倍数</label>
            <InputNumber :precision="0"   :min="1" v-model="betTimes"></InputNumber>
            <label style="margin-left: 15px;">单位</label>
            <ButtonGroup>
                <Button :disabled="$store.state.yjf.indexOf('0')<0" :type="moneyModel==0 ? 'error' : 'default'" @click="moneyModel=0">元</Button>
                <Button :disabled="$store.state.yjf.indexOf('1')<0" :type="moneyModel==1 ? 'error' : 'default'" @click="moneyModel=1">角</Button>
            </ButtonGroup>
            <span style="margin-left:30px;background-color:#f7f7f7;padding:10px;width: 350px;display: inline-block;text-align: center;">
                <label>已选</label>
                <label style="color:red;">{{betCount}}</label>
                <label>注,</label>
                <label style="color:red;">{{betTimes}}</label>
                <label>倍,共</label>
                <label style="color:red;">{{ betAmt }}</label>
                <label>元</label>
            </span>
            <Button icon="arrow-down-c" :disabled="betEnabled" type="error" style="float:right;font-size:14px;font-weight:bold;" @click="btnConfirmChoiceFun">确认投注</Button>
        </div>
    </div>
</template>
<style scoped lang="less">
    @import '../index.less';
</style>

<script>
import asmd from '@/assets/js/asmd'
export default {
    props: ['config', 'settings'],
    data() {
        return {
        datalist:[],//后台数据
        bonusAmt: [],//赔率列表,
        bonusAmtMax:[], // 选择的号码赔率 存入
        bonusAmtIndex:[],
        allGetProfit: 0,

        sumConfig: {},

        codeNumYardArr: [],
        moneyModel: 0, // 0 1
        betCount: 0,
        betTimes: 1,
        betEnabled: true,
        }
    },
    computed: {
        betAmt: function() {
        let pattern = 1;
        if( this.moneyModel == 0){
            pattern = 1
        }
        else if( this.moneyModel == 1){
            pattern = 0.1
        }
        else if( this.moneyModel == 2){
            pattern = 0.01
        }
        return asmd.mul(this.betCount, this.betTimes, pattern, (this.config.betInitMoney || 1))
        },
        curSel: function() {
        return this.$store.state.curSel
        }
    },
    watch: {
        config: function(value) {
        this.clearUI()

        if (!this.config) {
            return
        }

        this.sumConfig = value;

        this.codeNumYardArr = [];
        let i = this.config.sub.length;
        for (let k = 0; k < i; k++) {  
            this.codeNumYardArr[k] = []; 
        };
        }
    },
    mounted () {
        this.getGameBonusByGroupNo();
        this.moneyModel = this.$store.state.yjf[0] || 0
        this.sumConfig = this.config;

        this.codeNumYardArr = [];
        let i = this.config.sub.length;
        for (let k = 0; k < i; k++) {  
            this.codeNumYardArr[k] = []; 
        };
    },
    methods: {
        choiceNum(e, DataNumIndex, index) {
        let _codeNumYardArr = this.codeNumYardArr;
        this.bonusAmtMax.push(this.bonusAmt[index]);
        if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
            _codeNumYardArr[DataNumIndex].splice(_codeNumYardArr[DataNumIndex].indexOf(e.target.innerText), 1)
            this.bonusAmtIndex.splice(this.bonusAmtIndex.indexOf(index), 1)
        } else {
            $(e.target).addClass('active');
            this.bonusAmtIndex.push(index)
            _codeNumYardArr[DataNumIndex].push(e.target.innerText)
            _codeNumYardArr.map(function (item, itemIndex) {
            if (DataNumIndex != itemIndex) {
                item.map(function (_item) {
                if (e.target.innerText.toString().slice(0, 1) == _item.toString().slice(0, 1)) {
                    $(e.target).parents('.fastThree-content').find('.fastThree-content-list').eq(itemIndex).find('.ball-panel p.golbal').eq(index).removeClass('active')
                    _codeNumYardArr[itemIndex].splice(_codeNumYardArr[itemIndex].indexOf(_item), 1)
                }
                })
            }
            })
        }
        this.validChioceNum();
        },
        clearUI: function() {
        $('.fastThree-content p.golbal.active').removeClass('active');
        this.codeNumYardArr = []
        let i = this.config.sub.length;
        for (let k = 0; k < i; k++) {  
            this.codeNumYardArr[k] = []; 
        }

        // this.data = []
        //this.bonusAmt =  []
        this.bonusAmtMax = []
        this.bonusAmtIndex = []

        this.betCount = 0
        this.betTimes = 1
        this.moneyModel = 0
        this.betEnabled = true
        },
        validChioceNum() { //是否完成有效投注
        let _this = this;
        let valid = true;
        for (let i = 0; i < _this.config.sub.length; i++) {
            if (_this.codeNumYardArr[i].length <= 0) {
            valid = false;
            }
        }
        if (valid) {
            let items = 1; //总注码数
            // this.bonusAmtIndex = this.bonusAmtIndex.sort();
            // this.$parent.allGetProfit = this.bonusAmt[this.bonusAmtIndex[0]].bonusAmt;
            //this.allGetProfit = Math.max.apply(null,this.bonusAmtMax); //求数组最大值
            _this.codeNumYardArr.map(function (item) {
            items *= item.length
            })

            this.betCount = items;
            this.betEnabled = false;

            /* this.$parent.isValidBet = true;
            this.$parent.btnImmediately = false;
            this.$parent.btnConfirmChoice = false;
            this.$parent.allChoiceYard = items;
            this.$parent.allPutMoney = items * this.$parent.add_times * this.$parent.model1 * this.$parent.initCodeMoney;
            this.$parent.estimateProfit = this.$parent.sub(this.$parent.mul(this.$parent.allGetProfit, this.$parent.add_times, this.$parent.model1), this.$parent.allPutMoney); */
        } else {
            this.bonusAmtIndex=[];
            this.betCount = 0;
            this.betEnabled = true;
        }
        },
        //确认选号
        btnConfirmChoiceFun(arg) {
        let pattern = 1;
        if( this.moneyModel == 0){
            pattern = 1
        }
        else if( this.moneyModel == 1){
            pattern = 0.1
        }
        else if( this.moneyModel == 2){
            pattern = 0.01
        }

        let betRet = {};
        let betRetArr =[];
        for (let k = 0; k < this.codeNumYardArr.length; k++) {
            this.codeNumYardArr[k] = this.codeNumYardArr[k].sort((a,b)=>a-b);
            if (this.codeNumYardArr[k].length > 0) {
            for (let i = 0; i < this.codeNumYardArr[k].length; i++) {
                betRet = {};
                
                betRet.betContent = (()=>{ 
                if(this.codeNumYardArr[k][i]=='大'){
                    return 'a';
                }else if(this.codeNumYardArr[k][i]=='小'){
                    return 'b';
                }else if(this.codeNumYardArr[k][i]=='单'){
                    return 'c';
                }else if(this.codeNumYardArr[k][i]=='双'){
                    return 'd';
                }else{
                    return this.codeNumYardArr[k][i];
                }
                })();

                betRet.betAmt = asmd.mul(1, this.betTimes, pattern, (this.config.betInitMoney || 1))
                betRet.betBackRate = null
                betRet.showContent = '['+ this.config.name + '] ' + this.codeNumYardArr[k][i]
                betRet.betMultiple = this.betTimes
                betRet.betNumber = 1
                //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
                betRet.gameNo = this.$route.params.gameNo
                //betRet.groupNo = this.settings.groupNo
                betRet.gamePattern = this.moneyModel
                this.datalist.forEach((item)=>{
                    let groupName = item.groupName
                    if(groupName==this.codeNumYardArr[k][i]){                                
                        //betRet.estimateProfit = asmd.sub(asmd.mul(item.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt);
                        betRet.estimateProfit = asmd.sub(asmd.mul(item.bonusAmt, this.betTimes, pattern), betRet.betAmt);
                        betRet.groupNo = item.groupNo;
                    }
                })
                betRetArr.push(betRet);
            }

            this.$emit('bet', betRetArr)
            this.clearUI()
            }
        }
        },
        //根据游戏编号查询游戏奖金 
        getGameBonusByGroupNo() {
        let arr = this.config.sub[0].groupNo;
        this.bonusAmt = [];
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
                    this.datalist = data.list.sort(this.compare('groupName'));
                    // arr.map((item,index) => {
                    //     data.list.map((_item,_index)=>{
                    //         if(item == '5501'+_item.groupNo.slice(4)){
                    //             this.bonusAmt.push(_item.bonusAmt);
                    //         }
                    //     })
                    // })
                }
            })
            .catch(error => {

            })
        },
        compare (prop) {
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }            
            } 
        }
    }
}
</script>
        