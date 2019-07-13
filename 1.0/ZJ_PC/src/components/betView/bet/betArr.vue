<template>
    <div class="shopping-cart">
        <div class="ivu-table-wrapper" style="height: 176px;margin: 15px;border: 1px solid #ddd;">
            <div class="ivu-table ivu-table-with-fixed-top">
                <div class="ivu-table-body" style="height: 176px;overflow-x: hidden;overflow-y: auto;">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 793px;">
                        <colgroup>
                            <col width="334">
                            <col width="130">
                            <col width="120">
                            <col width="150">
                            <col width="60">
                        </colgroup>
                        <tbody class="ivu-table-tbody">
                            <tr class="ivu-table-row" v-for="(item, index) in betArr" :key="index">
                                <td class="">
                                    <div class="ivu-table-cell">
                                        {{item.showContent}}
                                    </div>
                                </td>
                                <td class="ivu-table-column-center">
                                    <div class="ivu-table-cell">
                                        总共 <span style="color: #e11616;">{{item.betNumber}}</span> 注
                                        <span style="color: #e11616;">{{item.eachNoteAmt*item.betNumber}}</span> 元
                                    </div>
                                </td>
                                <td class="ivu-table-column-center">
                                    <div class="ivu-table-cell">
                                        每注
                                        <input :disabled="single" type="text" autocomplete="off" v-integer @input="updatedbetArr" v-model="item.betMultiple" class="betInputAmt"> 倍</div>
                                </td>
                                <td class="ivu-table-column-center">
                                    <div class="ivu-table-cell">
                                        可中金额:
                                        <span style="color: #e11616;">{{asmd.mul(item.bonusAmt,item.betMultiple)}}</span>元</div>
                                </td>
                                <td class="ivu-table-column-center">
                                    <div class="ivu-table-cell">
                                        <div>
                                            <i @click="delBetArr(index)" class="iconfont icon-shanchu"></i>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="bet2confirm">
            <p>方案注数
                <span>{{betCount}}</span> 注，金额
                <span>{{betCountAmt}}</span> 元
                <Checkbox v-model="single" @click.native.stop.prevent="chase" style="margin: 0 20px; font-size: 16px;">我要追号</Checkbox></p>
            <Button v-if="!single" @click="bet" type="error" :loading="loading">立即投注</Button>
        </div>
    </div>
</template>

<script>
    import asmd from '@/assets/js/asmd'
    export default {
        data() {
            return {
                asmd: asmd,
                loading:false,
            }
        },
        computed: {
            betArr: function () {
                return this.$store.state.betArr
            },
            betCount: function () {
                return this.$store.state.betArr.reduce((s, el) => {
                    return s + el.betNumber
                }, 0)
            },
            betCountAmt: function () {
                return this.$store.state.betArr.reduce((s, el) => {
                    return s + el.betAmt
                }, 0)
            },
            single: function () {
                return this.$store.state.chaseFlag
            },
        },
        watch: {
        },
        methods: {
            delBetArr(i) {
                this.$store.commit('delbetArrIndex', i)
            },
            updatedbetArr() {
                this.$store.commit('updatedbetArr')
            },
            async bet() {
                if(this.betArr.length==0){
                    return this.$Modal.error({
                        title: '系统提醒',
                        content: "请选择投注号码！"
                    })
                }
                let flag = false
                this.betArr.map(el => {
                    if (!isNaN(el.betMultiple) && el.betMultiple > 0) {

                    } else {
                        flag = true
                    }
                })
                if (flag) {
                    return this.$Modal.error({
                        title: '系统提醒',
                        content: "您有号码未设置金额，请核对后投注。"
                    })
                } else {
                    this.loading = true
                    const rsp = await this.$tools.fetch('/game/api/bet').setCrypto(true).setJson({ betVos: this.betArr }).post();
                    this.loading = false
                    const r = Promise.resolve({ data: { success: rsp.success, msg: rsp.message, ...rsp.data } });
                    r.then(response => {
                        let data = response.data;
                        if (data.success) {
                            this.$store.commit('clearbetArr')

                            this.$Modal.success({
                                title: '提示',
                                content: '投注成功',
                            });
                            this.$store.commit('yu_e')
                        } else {
                            this.$Modal.warning({
                                title: '提示',
                                content: data.msg,
                            });
                        }
                    })
                }
            },
            chase(n) {
                if (!this.single) {
                    if (this.betArr.length == 0) {
                        return this.$Modal.error({ title: '系统提示', content: '请至少选择一注投注号码' })
                    }
                    let flag = false
                    this.betArr.map(el => {
                        this.betArr.map(s => {
                            if (el.groupNo != s.groupNo) {
                                flag = true
                            }
                        })
                    })
                    if (flag) {
                        return this.$Modal.error({ title: '系统提示', content: '追号不支持混投，请确保您的投注都为同一玩法。' })
                    }
                    this.betArr.map(el => {
                        el.betMultiple = 1
                    })
                    this.$store.commit('updatedbetArr')
                    this.$store.commit('setchaseFlag', true)
                } else {
                    this.$store.commit('setchaseFlag', false)
                }
            }
        },
    }
</script>
<style lang="less">
    .bet2confirm{
        text-align: center;
        p{line-height: 50px;color: #666;
            span{color: #e11616}
        };
        .ivu-btn-error{width: 150px;height: 44px;font-size: 20px;background: #E9312F;margin-bottom: 30px;}
    }
    .shopping-cart {
        .ivu-table td {
            height: 35px;
        }
        .ivu-table-cell {
            padding-left: 5px;
            padding-right: 5px;
        }
        .ivu-table-cell i.iconfont.icon-shanchu {
            cursor: pointer;
            color: #c9c9c9;

            &:hover {
                color: #db383f;
            }
        }
        .betInputAmt {
            text-align: center;
            width: 50px;
            height: 22px;
            outline: 0px;
            border-width: 1px;
            border-style: solid;
            border-color: rgb(230, 230, 230);
            padding: 0px;
            border-radius: 5px;
        }
        .betInputAmt:hover,
        .betInputAmt:focus {
            border-color: #e11616;
        }
        .betBtn {
            display: block;
            margin: 0 auto;
            line-height: 44px;
            font-size: 20px;
            border-radius: 5px;
            width: 150px;
            text-align: center;
            background: #E9312F;
            color: #fff;
            margin-bottom: 100px
        }

        .betBtn:hover {
            text-decoration: blink;
            color: #fff;
            background-color: #d95019;
            background: linear-gradient(180deg, #d33d3a, #a00b08)
        }
    }
</style>