<template>
    <div>
        <div class="fastThree-content playBoxNum">
            <p style="padding:10px 0 30px;">
                <Icon type="information-circled" style="color:red;"></Icon>
                <label style="font-size:13px;" v-html="config.description"></label>
                <Tooltip placement="bottom-start">
                    <div slot="content" v-html="config.rule" style="white-space: normal;"></div>
                    <label style="text-decoration:underline;font-size:13px;color:red;">规则</label>
                </Tooltip>
                <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
                    <div slot="content" v-html="config.example" style="white-space: normal;"></div>
                    <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
                </Tooltip>
            </p>

            <div style="display:flex;flex-direction: column;align-items: center;" v-if="config.common">
                <div style="display:flex;flex-wrap: wrap;width: 344px;border: 2px solid #ccc;border-radius: 6px;" :style="{borderColor: selCommon?'red':'#ccc'}">
                    <div v-for="(item,index) in config.show" :key="'common'+index" style="display:flex;margin:10px;">
                        <img v-for="(el,i) in item.toString().split('')" style="margin:0 5px;width:40px;height:40px;" :src="`/static_pc/images/saizi/${el}.png`"
                            alt="" :key="el+'a'+i">
                    </div>
                </div>

                <div class="fastThree-content-list flex" v-for="(itemWarp,DataNumIndex) in (config ? config.sub : [])" :key="'f'+DataNumIndex">
                    <div class="label flex" v-if="itemWarp.unit">
                        <p class="iconfont icon-decoration_icon"></p>
                        <p style="" v-text="itemWarp.unit"></p>
                    </div>
                    <p v-if="DataNumIndex==1" style="font-size:36px;font-weight:bold;position:relative;left:-15px;">+</p>
                    <div class="ball-panel flex">
                        <div v-for="(item,index) in itemWarp.golbal" :key="index">
                            <p class="golbal" @click="choiceNum($event,DataNumIndex,index);" v-text="item"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div style="display:flex;" v-else>
                <div class="fastThree-content-list flex" v-for="(itemWarp,DataNumIndex) in (config ? config.sub : [])" :key="'d'+DataNumIndex">
                    <div class="label flex" v-if="itemWarp.unit">
                        <p class="iconfont icon-decoration_icon"></p>
                        <p style="" v-text="itemWarp.unit"></p>
                    </div>
                    <p v-if="DataNumIndex==1" style="font-size:36px;font-weight:bold;position:relative;left:-15px;">+</p>
                    <div class="ball-panel flex">
                        <div v-for="(item,index) in itemWarp.golbal" :key="index">
                            <p class="golbal" @click="choiceNum($event,DataNumIndex,index)">
                                <img v-for="el in item.toString().split('')" @click.stop="choiceNumIMG($event,DataNumIndex,index)" style="margin:0 5px;width:40px;height:40px;"
                                    :src="`/static_pc/images/saizi/${el}.png`" alt="">
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bet2confirm">
                <p>您选择了 <span>{{betCount}}</span> 注</p>
                <Button @click="btnConfirmChoiceFun" :disabled="betEnabled" type="error">确认选号</Button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import './index.less';
</style>

<script>
    import Combinatorics from '@/assets/js/combinatorics'
    import asmd from '@/assets/js/asmd'
    export default {
        props: ['config', 'settings'],
        data() {
            return {
                codeNumYardArr: [],
                moneyModel: 0, // 0 1
                betCount: 0,
                betTimes: 1,
                betEnabled: true,
                selCommon: false
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
                };
            }
        },
        mounted() {
            this.codeNumYardArr = [];
            let i = this.config.sub.length;
            for (let k = 0; k < i; k++) {
                this.codeNumYardArr[k] = [];
            };
            this.moneyModel = this.$store.state.yjf[0] || 0
        },
        methods: {
            choiceNum(e, DataNumIndex, index) {
                let _codeNumYardArr = this.codeNumYardArr;

                let innerText = this.config.sub[DataNumIndex].golbal[index].toString()

                if ($(e.target).hasClass('active')) {
                    $(e.target).removeClass('active');
                    _codeNumYardArr[DataNumIndex].splice(_codeNumYardArr[DataNumIndex].indexOf(innerText), 1)
                    this.selCommon = false
                } else {
                    $(e.target).addClass('active');
                    this.selCommon = true;
                    _codeNumYardArr[DataNumIndex].push(innerText)
                    _codeNumYardArr.map(function (item, itemIndex) {
                        if (DataNumIndex != itemIndex) {
                            item.map(function (_item) {
                                if (innerText.toString().slice(0, 1) == _item.toString().slice(0, 1)) {
                                    $(e.target).parents('.fastThree-content').find('.fastThree-content-list').eq(itemIndex).find('.ball-panel p').eq(index).removeClass('active')
                                    _codeNumYardArr[itemIndex].splice(_codeNumYardArr[itemIndex].indexOf(_item), 1)
                                }
                            })
                        }
                    })
                }
                this.validChioceNum();
            },
            choiceNumIMG(e, DataNumIndex, index) {
                this.choiceNum({ target: $(e.target).parent() }, DataNumIndex, index)
            },
            clearUI: function () {
                $('.fastThree-content p.active').removeClass('active');
                this.codeNumYardArr = []
                let i = this.config.sub.length;
                for (let k = 0; k < i; k++) {
                    this.codeNumYardArr[k] = [];
                }

                this.selCommon = false
                this.betCount = 0
                this.betTimes = 1
                this.moneyModel = 0
                this.betEnabled = true
            },
            validChioceNum() { //是否完成有效投注
                let _this = this;
                let n = 0; //传入组合的n值
                for (let i = 0; i < this.config.sub.length; i++) {
                    n += _this.codeNumYardArr[i].length;
                }
                let items = 1; //总注码数
                _this.codeNumYardArr.map((item) => {
                    items *= Combinatorics.C(item.length, this.config.algorithm);
                })
                if (Combinatorics.C(n, this.config.algorithm) > 0 && items > 0) {
                    this.betCount = items;
                    this.betEnabled = false
                } else {
                    this.betCount = 0;
                    this.betEnabled = true
                }
            },
            btnConfirmChoiceFun() {

                let splitArr = ''; //转换数组 传入后台输出格式
                if (this.codeNumYardArr.length > 1) {
                    for (let i = 0; i < this.codeNumYardArr.length; i++) {
                        let a = '|';
                        if (i == this.codeNumYardArr.length - 1) {
                            a = '';
                        }
                        splitArr += this.codeNumYardArr[i].sort() + a;
                    }
                } else {
                    splitArr = this.codeNumYardArr[0].sort().join('|');
                }

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
                betRet.betAmt = 0
                betRet.bonusAmt = this.settings.bonusAmt
                betRet.eachNoteAmt = this.$store.state.global.eachNoteAmt
                betRet.betBackRate = null
                betRet.betContent = splitArr
                betRet.showContent = '[' + this.config.name + '] ' + splitArr
                betRet.betMultiple = ""
                betRet.betNumber = this.betCount
                betRet.estimateProfit = 0
                betRet.gameNo = this.$route.params.gameNo
                betRet.groupNo = this.settings.groupNo
                betRet.gamePattern = this.moneyModel
                this.$store.commit('setbetArr',betRet)
                this.clearUI()
            }
        }
    }

</script>