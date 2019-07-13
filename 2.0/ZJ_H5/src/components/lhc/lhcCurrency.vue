<template>
    <div id="lhc">
        <div class="sc-gMcBNU fLCLBP">
            <div class="sc-bwzfXH kMDzjb">
                <div class="sc-iLVFha exmPlI" v-html="config.rule"></div>
            </div>
            <div class="sc-dPNhBE lcJMNH">
                <div class="sc-fCPvlr iqoNWh">
                    <div>
                        <div class="sc-kkwfeq itwcYr" @click="randomChioceBet">
                            <i class="iconfont icon-dianji jDZdyJ"></i>
                            <span class="sc-cbMPqi hnbdBn">机选</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sc-kTUwUJ jSUaeT">
            <div class="sc-bdVaJa kZAgjJ">
                <div class="sc-dqBHgY iijRGP">


                    <div :class="[('sc-cmTdod eCgwLX'),{'ghraAr':selectedBallList.indexOf(index)>=0&&item.select}]" @click="chioceBet(index,item)"
                        v-for="(item,index) in lhcBall" :key="index">
                        <div class="sc-btzYZH jGqXUY" v-text="item.groupName"></div>
                        <div class="sc-jtRfpW htezMD">

                            <template v-if="config.zoo">
                                <span class="lhcball" :class="{'red':sub.color=='red','blue':sub.color=='blue','green':sub.color=='green',}" v-for="(sub, index) in config.zoo"
                                    v-if="sub.zoo == item.groupName" :key="index+'ball'">{{sub.groupName}}</span>
                            </template>
                            <template v-if="config.wuxing">
                                <span class="lhcball" :class="{'red':sub.color=='red','blue':sub.color=='blue','green':sub.color=='green',}" v-for="(sub, index) in config.wuxing"
                                    v-if="sub.wuxing == item.groupName" :key="index+'wuxing'">{{sub.groupName}}</span>
                            </template>
                            <template v-if="config.weishu">
                                <span class="lhcball" :class="{'red':sub.color=='red','blue':sub.color=='blue','green':sub.color=='green',}" v-for="(sub, index) in config.weishu"
                                    v-if="parseInt(sub.groupName)%10 == parseInt(item.groupName)" :key="index+'weishu'">{{sub.groupName}}</span>
                            </template>
                            <template v-if="config.bose">
                                <span class="lhcball" :class="{'red':sub.color=='red','blue':sub.color=='blue','green':sub.color=='green',}" v-for="(sub, index) in config.bose"
                                    v-if="sub.color=='red'&&item.groupName=='红波'||sub.color=='blue'&&item.groupName=='蓝波'||sub.color=='green'&&item.groupName=='绿波'"
                                    :key="index+'bose'">{{sub.groupName}}</span>
                            </template>


                        </div>
                        <div class="sc-bYSBpT fPcJkT" v-text="item.bonusAmt"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sc-hCbubC lcFehD">
            <div class="sc-lnrBVv hlSTFe">
                <i class="iconfont icon-lajixiang bgAhw" @click="restBet"></i>
                <span class="sc-fvLVrH gtqmUF" v-text="betNumber"></span>
                <span class="sc-hvvHee iCQRmZ">注</span>
                <div class="sc-cPuPxo biOJUI"></div>
                <span class="sc-hvvHee iCQRmZ">共</span>
                <div class="sc-eSePXt jFjQYg" v-text="betAmt"></div>
                <span class="sc-hvvHee iCQRmZ">元</span>
                <div class="sc-bwzfXH kMDzjb">
                    <input class="inputBetAmt" type="number" v-model='inputBetAmt'>
                </div>
                <div class="sc-dXfzlN iyQVYu">
                    <button class="sc-kAdXeD figbcq" @click="nextNumber">投注</button>
                </div>
            </div>
        </div>
        <confirm v-model="confirmShow" title="提示" @on-confirm="betGame">
            <p style="text-align:left;color:#666;">
                第
                <span style="color:#ec2829;">{{ gameNumber }}</span> 期
            </p>

            <template v-if="config.checkbox">
                <p style="text-align:left;color:#666;" v-for="(item,index) in officeArr" :key="index+'betArr'">
                    <span v-text="config.gameName+' | '"></span>
                    <span style="color:#ec2829;" v-text="item.betContent"></span>
                </p>
            </template>
            <template v-else>
                <p style="text-align:left;color:#666;" v-for="(item,index) in betArr" :key="index+'officeArr'">
                    <span v-text="config.gameName+' | '"></span>
                    <span style="color:#ec2829;" v-text="item.groupName"></span>
                </p>
            </template>


            <p style="text-align:left;color:#666;">
                <span style="color:#ec2829;" v-text="betNumber"></span>
                注，共
                <span style="color:#ec2829;" v-text="betAmt"></span>
                元
            </p>
        </confirm>
    </div>
</template>


<script>
    import { Confirm } from 'vux'
    import Combinatorics from '@/assets/js/combinatorics'
    export default {
        components: { Confirm },
        props: ['settings', 'lhcObj', 'config'],
        data() {
            return {
                lhcBall: [], //每个号码对应的 奖金 数组
                // betArr:[], //选择的投注列表
                quickIndex: 0, //快速按钮选中
                selectedBallList: [],
                inputBetAmt: 1,
                gameNumber: '',
                confirmShow: false,
                once:false
            }
        },
        computed: {
            betArr() {
                let tempArr = [];
                for (let i of this.lhcBall) {
                    if (i.select) {
                        i.gameNo = this.$route.params.gameNo
                        i.betAmt = this.inputBetAmt
                        i.betBonus = this.lhcObj.bonusAmt
                        tempArr.push(i)
                    }
                }
                return tempArr
            },
            betNumber() {
                if (this.config.checkbox) {
                    return Combinatorics.C(this.betArr.length, this.config.must)
                } else {
                    return this.betArr.length
                }
            },
            betAmt: function () {
                if (this.config.checkbox) {
                    return this.betNumber * (this.inputBetAmt || 0)
                } else {
                    return this.betArr.reduce((a, b) => { return a + (+b.betAmt) }, 0)
                }
            },
            officeArr:function(){
                if (this.config.checkbox) {
                    let tempObj = {}
                    tempObj.betContent = this.betArr.map(el => { return el.groupName })
                    tempObj.betContent = tempObj.betContent.join(',')
                    tempObj.betAmt = this.betAmt
                    tempObj.betNumber = this.betNumber
                    tempObj.gameNo = this.$route.params.gameNo
                    tempObj.groupNo = this.lhcObj.groupNo
                    tempObj.betBonus = this.lhcObj.bonusAmt
                    return [tempObj]
                }else{
                    return []
                }
            }
        },
        mounted() {
            this.getGameBonusByGroupNo();
        },
        methods: {
            //随机生成 注码
            // createRandom(10,0,50) //生成10个从0-50之间不重复的随机数
            createRandom(num, from, to) {
                var arr = [];
                var json = {};
                while (arr.length < num) {
                    //产生单个随机数
                    var ranNum = Math.floor(Math.random() * (to - from)) + from;
                    //通过判断json对象的索引值是否存在 来标记 是否重复
                    if (!json[ranNum]) {
                        json[ranNum] = 1;
                        arr.push(ranNum);
                    }
                }
                return arr;
            },
            //选择号码
            chioceBet(index, item) {
                this.$set(item, 'select', !item.select);
                if (item.select) {
                    if (this.config.max && this.selectedBallList.length >= this.config.max) {
                        this.lhcBall[this.selectedBallList[0]].select = false
                        this.selectedBallList.shift()
                    }
                    this.selectedBallList.push(index);
                } else {
                    this.selectedBallList.splice(this.selectedBallList.indexOf(index), 1);
                }
            },
            //机选
            randomChioceBet() {
                this.restBet()
                this.selectedBallList = this.createRandom(this.config.must, 0, this.lhcBall.length)
                this.selectedBallList.forEach(el => {
                    this.lhcBall[el].select = true
                })
                this.lhcBall = this.lhcBall.map(el => { return el })
            },
            //投注
            betGame() {
                let _this = this
                this.$api.post('/game/creditBet',this.config.checkbox ? this.officeArr : this.betArr,true)
                    .then(response => {
                        if (response.success) {
                            this.restBet()
                            this.$vux.confirm.show({
                                title:'提示',
                                content:'投注成功',
                                onCancel () {
                                },
                                onConfirm () {
                                    _this.$router.push('/betRecordsview')
                                },
                                confirmText:'查看投注',
                                cancelText:'继续投注'
                            })
                        } else {
                            this.$dialog({ title: '提示信息', message: '投注失败', skin: 'ios' });
                        }
                    })

            },
            //投注状态重置
            restBet() {
                this.lhcBall.forEach((el) => { el.select = false; })
                this.selectedBallList = []
            },
            //根据游戏编号查询游戏奖金 
            getGameBonusByGroupNo() {
                this.bonusAmt = [];
                this.$http({
                    method: 'get',
                    url: '/gameGroup/getGameBonusByGroupNo',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    params: {
                        groupNo: this.lhcObj.groupNo
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.lhcBall = res.data.list.map(el => {
                            el.select = false
                            el.betAmt = ''
                            return el
                        })
                    }
                })

            },
            nextNumber() {
                if (this.betNumber == 0) {
                    this.randomChioceBet()
                    return
                }
                if (this.betAmt <= 0) {
                    this.$dialog({ title: '提示信息', message: '请正确输入投注金额', skin: 'ios' });
                    return
                }
                // 查询游戏下一期情况(用于投注)
                this.$http({
                    method: 'get',
                    url: '/gameOpenNo/getGameNextOpenNo',
                    params: {
                        gameNo: this.$route.params.gameNo
                    }
                })
                    .then(response => {
                        this.gameNumber = response.data.t.gameNumber
                        this.confirmShow = true;
                    })


            },
        },
        watch: {
            lhcObj: function () {
                this.selectedBallList = []
                this.getGameBonusByGroupNo()
            },
            inputBetAmt: function () {
                this.lhcBall = this.lhcBall.map(el => {
                    if (el.select) {
                        el.betAmt = this.inputBetAmt
                    }
                    return el
                })
            }
        }
    }

</script>

<style lang="less">
    @import './lhc.less';
</style>