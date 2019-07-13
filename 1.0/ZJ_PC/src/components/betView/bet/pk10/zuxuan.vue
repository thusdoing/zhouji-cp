<template>
    <div>
        <div class="play-content playBoxNum">
            <p style="padding:10px 0 30px;">
                <Icon type="information-circled" style="color:red;"></Icon>
                <label style="font-size:12px;" v-html="config.description"></label>
                <!--<Tooltip placement="bottom-start">-->
                    <!--<div slot="content" v-html="config.rule" style="white-space: normal;"></div>-->
                    <!--<label style="text-decoration:underline;font-size:13px;color:red;">规则</label>-->
                <!--</Tooltip>-->
                <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
                    <div slot="content" v-html="config.example" style="white-space: normal;"></div>
                    <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
                </Tooltip>
            </p>
            <div class="play-content-list flex" v-for="(itemWarp, DataNumIndex) in (this.config ? this.config.sub : [])"
                    :key="DataNumIndex">
                <div class="label flex" v-if="itemWarp.unit!=''">
                    <p class="iconfont icon-decoration_icon"></p>
                    <p v-text="itemWarp.unit"></p>
                </div>
                <div class="ball-panel flex">
                    <div v-for="(item,index) in itemWarp.golbal[1]" :key="index">
                        <p @click="choiceNum($event,DataNumIndex)">{{item-itemWarp.golbal[0]<10?'0'+(item-itemWarp.golbal[0]):(item-itemWarp.golbal[0])}}</p>
                    </div>
                </div>
                <div v-if="itemWarp.btn" class="play-btn-box flex">
                    <p @click="quickChoice($event,DataNumIndex)">全</p>
                    <p @click="quickChoice($event,DataNumIndex)">大</p>
                    <p @click="quickChoice($event,DataNumIndex)">小</p>
                    <p @click="quickChoice($event,DataNumIndex)">单</p>
                    <p @click="quickChoice($event,DataNumIndex)">双</p>
                    <p @click="quickChoice($event,DataNumIndex)">清</p>
                </div>
            </div>
            
            <div class="bet2confirm">
                <p>您选择了
                    <span>{{betCount}}</span> 注</p>
                <Button @click="btnConfirmChoiceFun" :disabled="betEnabled" type="error">确认选号</Button>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
    @import './bet.less';
</style>

<script>
    import algorithm from '@/assets/js/algorithm'
    import Combinatorics from '@/assets/js/combinatorics'
    import asmd from '@/assets/js/asmd'
    export default {
        props: ['config', 'settings'],
        data(){
            return {
                codeNumYardArr: [],
                moneyModel: 0, // 0 1
                betCount: 0,
                betTimes: 1,
                betEnabled: true,
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
            curSelAry: function() {
                return this.$store.state.curSel
            }
        },
        watch: {
            config: function () {
                this.clearUI()

                if (!this.config) {
                    return
                }

                this.codeNumYardArr = [];
                let i = this.config.sub.length;
                for (let k = 0; k < i; k++) {
                    this.codeNumYardArr[k] = [];
                }
                ;
            }
        },
        mounted () {
            this.moneyModel = this.$store.state.yjf[0] || 0
            let panelList_p = $('.play-content-list').find('.ball-panel P');
            this.codeNumYardArr = [];
            let i = this.config.sub.length;
            for (let k = 0; k < i; k++) {
                this.codeNumYardArr[k] = [];
                if (Array.isArray(this.curSelAry.codeAry)) {
                    this.curSelAry.codeAry.map((item,index)=>{
                        this.codeNumYardArr[k].push(item)
                        panelList_p.eq(k*11 + parseInt(this.curSelAry.codeAry[index])-1).addClass('active')
                    })
                    
                }
            };
            this.betTimes = this.curSelAry.betTimes
            this.$store.commit('setCurSel', {groupClassNo: '', codeAry: null, groupNo: '', betTimes: 1})
            this.validChioceNum();
            

        },
        methods: {
            choiceNum(e, index){
                let _codeNumYardArr = this.codeNumYardArr;
                if ($(e.target).hasClass('active')) {
                    $(e.target).removeClass('active');
                    _codeNumYardArr[index].splice(_codeNumYardArr[index].indexOf(e.target.innerText), 1)
                } else {
                    $(e.target).addClass('active');
                    _codeNumYardArr[index].push(e.target.innerText)
                }
                this.validChioceNum();
            },
            //快速选择号码
            quickChoice(e, index){  //判断每个列表下的 号码选中  就知道 是否完成一注
                let _codeNumYardArr = this.codeNumYardArr;
                $(e.target).addClass('active').siblings().removeClass('active');
                //每次先清空 选中
                //获取父级 panelList 下的 p
                let panelList_p = $(e.target).parents('.play-content-list').find('.ball-panel P');
                panelList_p.removeClass('active')
                let text = e.target.innerText;
                _codeNumYardArr[index] = []; //单行 选择投注号码 数组清空 否则重复添加
                if (e.target.innerText == '全') {
                    panelList_p.addClass('active')
                    panelList_p.each(function () {
                        _codeNumYardArr[index].push($(this).text());
                    })
                } else if (e.target.innerText == '大') {
                    for (let i = 5; i < 10; i++) {
                        panelList_p.eq(i).addClass('active')
                        _codeNumYardArr[index].push(panelList_p.eq(i).text());
                    }
                } else if (e.target.innerText == '小') {
                    for (let i = 0; i < 5; i++) {
                        panelList_p.eq(i).addClass('active')
                        _codeNumYardArr[index].push(panelList_p.eq(i).text());
                    }
                } else if (e.target.innerText == '单') {
                    for (let i = 0; i < panelList_p.length; i++) {
                        if (Number(panelList_p.eq(i).text()) % 2 != 0) {
                            panelList_p.eq(i).addClass('active');
                            _codeNumYardArr[index].push(panelList_p.eq(i).text());
                        }
                    }
                } else if (e.target.innerText == '双') {
                    for (let i = 0; i < panelList_p.length; i++) {
                        if (Number(panelList_p.eq(i).text()) % 2 == 0) {
                            panelList_p.eq(i).addClass('active');
                            _codeNumYardArr[index].push(panelList_p.eq(i).text());
                        }
                    }
                } else if (e.target.innerText == '清') {

                }
                this.validChioceNum();
            },
            clearUI: function () {
                $('.play-content p.active').removeClass('active');
                this.codeNumYardArr = []
                let i = this.config.sub.length;
                for (let k = 0; k < i; k++) {
                    this.codeNumYardArr[k] = [];
                }

                this.betCount = 0
                this.betTimes = 1
                this.moneyModel = 0
                this.betEnabled = true
            },
            validChioceNum(){ //是否完成有效投注
                let _this = this;
                let valid = false;

                if (this.codeNumYardArr[0].length >= this.config.algorithm) valid = true;

                if (valid) {
                    let items = 0; //总注码数
                    _this.codeNumYardArr.map(function (item) {
                        items += item.length
                    })

                    this.betEnabled = false;
                    this.betCount = Combinatorics.C(this.codeNumYardArr[0].length, this.config.algorithm)*this.config.count;
                } else {
                    this.betEnabled = true;
                    this.betCount = 0;
                }
            },
            //确认选号
            btnConfirmChoiceFun(){

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

                var betRet = {}
                betRet.betAmt = this.betAmt
                betRet.betBackRate = null
                betRet.betContent = this.codeNumYardArr[0].sort((a, b) => a - b).join(',')
                betRet.showContent = '[' + this.config.name + '] ' + this.codeNumYardArr[0].sort((a, b) => a - b).join(',')
                betRet.betMultiple = this.betTimes
                betRet.betNumber = this.betCount
                //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
                betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betTimes, pattern), this.betAmt)
                betRet.gameNo = this.$route.params.gameNo
                betRet.groupNo = this.settings.groupNo
                betRet.gamePattern = this.moneyModel

                let tempobj = {
                    bonusAmt: this.settings.bonusAmt,
                    eachNoteAmt: this.$store.state.global.eachNoteAmt,
                    betAmt: 0,
                    betMultiple: '',
                    estimateProfit: ''
                }
                betRet = {...betRet,...tempobj}

                this.$store.commit('setbetArr',betRet)
                this.clearUI()
            }

        }
    }
</script>
<style scoped>
    .play-box .play-content .play-content-list .label .icon-decoration_icon {
        margin-right: 0 !important
    }
</style>

    