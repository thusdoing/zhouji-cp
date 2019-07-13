<template>
    <div>
        <div class="fastThree-content playBoxNum">
            <span style="display: none;">{{upda}}</span>
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

            <div class="fastThree-content-list flex" v-for="(itemWarp,DataNumIndex) in (config ? config.sub : [])" :key="DataNumIndex">
                <div class="ball-panel">
                    <div class="flex" style="display:flex;justify-content: center;">
                        <div v-for="(item,index) in itemWarp" :key="index" style="flex:none;text-align: center">
                            <p class="golbal" :class="{active:item.selected}" style="border-radius:6px;margin:0 15px 5px;font-size:24px;line-height:50px;width: 52px;height: 52px;padding:0;"
                                @click="chooseNum(item)">{{item.name}}</p>
                            <label style="color: #333;font-size: 12px;">赔{{item.bonusAmt}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import './index.less';
</style>

<script>
    import asmd from '@/assets/js/asmd'
    export default {
        props: ['config', 'settings'],
        data() {
            return {
                data: [],//后台数据
                bonusAmt: [],//赔率列表,
                bonusAmtMax: [], // 选择的号码赔率 存入
                bonusAmtIndex: [],
                allGetProfit: 0,
                moneyModel: 0, // 0 1
                betCount: 0,
                betTimes: 1,
                betEnabled: true,
                upda:''
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
            curSel: function () {
                return this.$store.state.curSel
            },
            betArr:function(){
                return this.$store.state.betArr
            }
        },
        watch: {
            config:function(n,o){
                this.getGameBonusByGroupNo();
            },
            betArr:function(v){
                this.showSelected()
            }
        },
        mounted() {
            this.getGameBonusByGroupNo();
            this.showSelected()
            this.moneyModel = this.$store.state.yjf[0] || 0
        },
        methods: {
            chooseNum(item){
                if(item.selected){
                    return this.$store.commit('delbetArr',{number:item.number})
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


                let betRet = {}
                
                betRet.betContent = ((item) => {
                    if (item.name == '大') {
                        return 'a';
                    } else if (item.name == '小') {
                        return 'b';
                    } else if (item.name == '单') {
                        return 'c';
                    } else if (item.name == '双') {
                        return 'd';
                    } else {
                        return item.name
                    }
                })(item);
                betRet.betBackRate = null
                betRet.bonusAmt = item.bonusAmt
                betRet.betAmt = 0
                betRet.eachNoteAmt = this.$store.state.global.eachNoteAmt
                betRet.showContent = '[' + this.config.name + '] ' + item.name
                betRet.betMultiple = ''
                betRet.betNumber = 1
                betRet.gameNo = this.$route.params.gameNo
                betRet.groupNo ='' + this.$route.params.gameNo + item.groupNo
                betRet.gamePattern = this.moneyModel
                betRet.estimateProfit = 0
                betRet.number = item.number
                this.$store.commit('setbetArr',betRet)
            },
            //根据游戏编号查询游戏奖金 
            async getGameBonusByGroupNo() {
                let arr = this.config.sub
                let res = await this.$store.cache.dispatch('getGameBonusByGroupNo', this.settings.groupNo, { timeout: 10000000 })
                arr.map((item, index) => {
                    item.map(el=>{
                        res.map((_item, _index) => {
                            if (el.groupNo ==  _item.groupNo.slice(4)) {
                                el.bonusAmt = _item.bonusAmt
                            }
                        })
                    })
                })
                this.upda = Date.now()
            },
            //显示选中
            showSelected(){
                this.config.sub.map(d=>{
                    d.map(s=>{
                        s.selected = false
                    })
                })
                this.betArr.map(el=>{
                    this.config.sub.map(d=>{
                        d.map(s=>{
                            if(s.number==el.number){
                                s.selected = true
                            }
                        })
                    })
                })
                this.upda = Date.now()
            }
        }
    }
</script>