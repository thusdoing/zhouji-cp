<template>
    <div>
        <div class="play-content playBoxNum">
            <p style="padding:10px 0 30px;">
                <Icon type="information-circled" style="color:red;"></Icon>
                <label style="font-size:12px;" v-html="config.description"></label>
            </p>
            <div class="play-content-list flex" v-for="(itemWarp, DataNumIndex) in (this.config ? this.config.sub : [])"
                 :key="DataNumIndex">
                <div class="label flex" v-if="itemWarp.unit!=''">
                    <p class="iconfont icon-decoration_icon"></p>
                    <p v-text="itemWarp.unit"></p>
                </div>
                <div class="ball-panel flex">
                    <div v-for="(item,index) in groupNoList" :key="index">
                        <p @click="choiceNum($event,DataNumIndex)">{{item.groupName}}</p>
                    </div>
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
<style scoped>
    .play-box .play-content .play-content-list .label .icon-decoration_icon {
        margin-right: 0 !important
    }
</style>
<script>
import asmd from '@/assets/js/asmd'
export default {
    props: ['config', 'settings'],
    data() {
        return {
            textAreaV: '', //文本域值
            RegExp: '', // 根据父组件传入的algorithm 去正则匹配 几位为一注
            algorithm: '',
            codeNumYardArr: [
                []
            ],
            moneyModel: 0, // 0 1
            betCount: 0,
            betTimes: 1,
            betEnabled: true,
            groupNo: '',
            groupNoList: []
        }
    },
    computed: {
        betAmt: function() {
            let pattern = 1;
            if (this.moneyModel == 0) {
                pattern = 1
            } else if (this.moneyModel == 1) {
                pattern = 0.1
            } else if (this.moneyModel == 2) {
                pattern = 0.01
            }
            return asmd.mul(this.betCount, this.betTimes, pattern, (this.config.betInitMoney || 1))
        }
    },
    created() {
        this.groupNo = this.$route.params.gameNo + this.config.code.toString().substring(4, 10);
        this.getGameBonusByGroupNo()
    },
    methods: {
        getGameBonusByGroupNo() {
            this.$http.get('/gameGroup/getGameBonusByGroupNo', {
                params: {
                    groupNo: this.groupNo
                }
            }).then((data) => {
                if (data.data.success) {
                    this.groupNoList = data.data.list || []
                }
            })
        },
        choiceNum(e, index) {
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
        validChioceNum() { //是否完成有效投注
            let _this = this;
            let valid = false;

            if (this.codeNumYardArr[0].length > 0) valid = true;
            if (valid) {
                let items = 0; //总注码数
                _this.codeNumYardArr.map(function(item) {
                    items += item.length
                })

                this.betEnabled = false;
                this.betCount = items;
            } else {
                this.betEnabled = true;
                this.betCount = 0;
            }
        },
        btnConfirmChoiceFun() {
            let betAry = [];
            let pattern = 1;
            if (this.moneyModel == 0) {
                pattern = 1
            } else if (this.moneyModel == 1) {
                pattern = 0.1
            } else if (this.moneyModel == 2) {
                pattern = 0.01
            }
            for (let i in this.codeNumYardArr[0]) {
                var betRet = {}
                betRet.betAmt = asmd.mul(1, this.betTimes, 1, pattern, (this.config.betInitMoney || 1))
                betRet.betBackRate = null
                betRet.betContent = this.codeNumYardArr[0][i]
                betRet.showContent = '[' + this.config.name + '] ' + betRet.betContent
                betRet.betMultiple = this.betTimes
                betRet.betNumber = 1
                for (let i in this.groupNoList) {
                    if (this.groupNoList[i].groupName == betRet.betContent) {
                        betRet.bonusAmt = this.groupNoList[i].bonusAmt
                        betRet.groupNo = this.groupNoList[i].groupNo
                        break
                    }
                }
                //betRet.estimateProfit = asmd.sub(asmd.mul(this.settings.bonusAmt, this.betCount, this.betTimes, pattern), this.betAmt)
                betRet.estimateProfit = asmd.sub(asmd.mul(betRet.bonusAmt, this.betTimes, pattern), betRet.betAmt)
                betRet.gameNo = this.$route.params.gameNo
                betRet.gamePattern = this.moneyModel
                let tempobj = {
                    bonusAmt: betRet.bonusAmt,
                    eachNoteAmt: this.$store.state.global.eachNoteAmt,
                    betAmt: 0,
                    betMultiple: '',
                    estimateProfit: ''
                }
                betRet = {...betRet,...tempobj}
                betAry.push(betRet)
            }
            this.$store.commit('setbetArr',betAry)
            this.clearUI()

        },
        clearUI: function() {
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
    },
    mounted() {
        this.moneyModel = this.$store.state.yjf[0] || 0
    }
}
</script>