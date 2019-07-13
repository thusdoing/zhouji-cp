<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>下级开户
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;min-height:454px;padding-top: 16px;">
            <Tabs type="card" v-model="itemVal" @on-click="selectItem" :animated="false">
                <TabPane name="0" label="下级开户">
                    <ul class="radioStyle">
                        <li>
                            <span>开户类型：</span>
                            <label @click="formData.custType='010701'" :class="formData.custType==='010701'?'active':''" for="proxy">代理</label>
                            <label @click="formData.custType='010703'" :class="formData.custType==='010703'?'active':''" for="player">玩家</label>
                            <br>返点设置：请先为下级设置返点。
                            <!-- <a @click="goRebateDes" class="rebateDesLink">
                                点击查看返点赔率表</a> -->
                            <a class="rebateDesLink" href="/#/dailiRebateDes" target="_blank">点击查看返点赔率表</a>
                        </li>
                    </ul>
                    <div class="bonusTable">
                        <ul v-for="(item, index) in myGameRebatesList" :key="index">
                            <li>{{item.gameTypeName}}</li>
                            <li>
                                <input v-model="item.setRebate" type="number" name="rebate9" min="0.0" step="0.1" :max="parseInt(item.childrenMaxRebate)"
                                    class="userInput mgl20"> &nbsp;
                                <span>（自身返点{{item.rebate||'0.0'}}，可为下级设置返点范围0.0-{{item.childrenMaxRebate||item.rebate||'0.0'}}）</span>
                            </li>
                        </ul>
                    </div>
                    <a class="mysubmitBtn" @click="toAddInvite">生成邀请码</a>
                    <div class="Vxtwm EUetQ mytips">
                        <div style="line-height: 20px;">※ 温馨提示：
                            <br> 1、不同的返点赔率不同，返点越高赔率越高。
                            <br> 2、代理可获得的佣金等于代理自身返点与下级返点的差值，如代理自身返点6，下级返点4，代理可获得下级投注金额的2%，即下级下注100元，代理可获得2元。
                            <br> 3、下级返点值设得越低，下级的赔率就越低，建议给下级设置的返点不要过低。
                        </div>
                    </div>
                </TabPane>
                <TabPane name="1" label="邀请码管理">
                    <ul class="radioStyle">
                        <li>
                            <span>开户类型：</span>
                            <label @click="formData.custType='010701';changPage(1)" :class="formData.custType==='010701'?'active':''" for="proxy">代理</label>
                            <label @click="formData.custType='010703';changPage(1)" :class="formData.custType==='010703'?'active':''" for="player">玩家</label>
                        </li>
                    </ul>


                    <table width="100%" cellspacing="0" cellpadding="0" style="margin-top: -16px;">
                        <thead class="_3apNX">
                            <tr>
                                <th>邀请码</th>
                                <th>注册链接</th>
                                <th>备注</th>
                                <th>生成时间</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody class="-QUHL">
                            <tr v-if="myInviteInfoList.length==0">
                                <td class="_32waq" colspan="8">
                                    <div v-if="loading" class="_1dJVz">
                                        <div class="absolute center-margin">
                                            <img class="_1VUC8" src="/static_pc/images/loading.gif">
                                        </div>
                                    </div>
                                    <article v-if="!loading" class="_1dJVz">
                                        <div class="absolute center-margin">
                                            <img class="_1VUC8" src="/static_pc/images/ku.png">
                                            <p>暂无记录</p>
                                        </div>
                                    </article>
                                </td>
                            </tr>

                            <tr v-else v-for="(item, index) in myInviteInfoList" :key="item.tableKey" class="_1UhCN">
                                <td>{{item.inviteCode}}
                                    <span class="fuzhi" v-clipboard:copy="item.inviteCode" v-clipboard:success="fuzhi" v-clipboard:error="shibai">复制</span>
                                </td>
                                <td>{{item.invitePath}}
                                    <span class="fuzhi" v-clipboard:copy="item.invitePath" v-clipboard:success="fuzhi" v-clipboard:error="shibai">复制</span>
                                </td>
                                <td @click="showModal(item)" class="hover">{{item.remark||"未设置"}}</td>
                                <td>{{$date(item.insertDate)}}</td>
                                <td>注册（{{item.totalRegister}}）</td>
                                <td class="handle">
                                    <span @click="handleShowDateil(item)">详情</span> |
                                    <span @click="delmyInviteInfo(index)">删除</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row">
                        <Page @on-change='changPage' style="text-align: right;margin: 10px" :current="formData.pageNo" :total="total" size="small"
                            show-elevator></Page>
                    </div>


                    <div class="Vxtwm EUetQ mytips">
                        <div style="line-height: 20px;">※ 温馨提示：
                            <br> “邀请码” 与 “注册链接” 功能一致，可以使用邀请码，也可以使用注册链接。
                            <br>手机端请使用邀请码
                        </div>
                    </div>
                </TabPane>
            </Tabs>
            <Modal v-model="showDateil" title="详情" width="620">
                <div style="padding-left: 150px;">
                    <div v-for="(item, index) in myGameRebatesList" :key="item.gameType" class="showDateilItem">
                        <span>{{item.gameTypeName}}</span>
                        <Input style="width: 100px" disabled :value="selectGameRebates[item.gameType]"></Input>
                        <span>（自身返点：{{item.rebate}}）</span>
                    </div>
                </div>
                <div slot="footer">
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>

    import axios from 'axios'
    export default {
        components: {},
        data() {
            return {
                loading: false,
                formData: {
                    custType: '010701', //010701：代理，010703：会员
                    serviceUrl: location.origin,
                },
                serchForm: {
                    custType: '010701',
                    pageNo: 1,
                    pageSize: 10
                },
                updata: {
                    tableKey: '',
                    remark: ''
                },
                total: 0,
                myGameRebatesList: [],
                myInviteInfoList: [],
                showDateil: false,
                selectGameRebates: {},
                itemVal: '0'
            }
        },
        created() {
            this.myGameRebates()
        },
        watch: {

        },
        methods: {
            myGameRebates() {
                axios.get('/myGameRebates').then(data => {
                    if (data.data.success) {
                        this.myGameRebatesList = data.data.list

                    } else {
                        this.$Modal.error({
                            title: '提示',
                            content: data.data.msg
                        })
                    }
                }, () => { })
            },
            toAddInvite() {
                for (let el of this.myGameRebatesList) {
                    if (!el.setRebate) {
                        this.$Modal.error({
                            title: '提示',
                            content: '返点不能为空'
                        })
                        return
                    }
                    if (el.setRebate > (el.childrenMaxRebate || el.rebate || 0) || el.setRebate < 0) {
                        this.$Modal.error({
                            title: '提示',
                            content: '信息填写错误，请正确填写返点范围'
                        })
                        return
                    }
                    if (el.setRebate * 10 % 1 > 0) {
                        this.$Modal.error({
                            title: '提示',
                            content: '只能有一位小数，请正确填写'
                        })
                        return
                    }
                    this.formData[el.gameType] = Number(el.setRebate).toFixed(1)
                }
                axios.post('/toAddInvite', this.formData).then(data => {
                    if (data.data.success) {
                        this.$Modal.success({
                            title: '提示',
                            content: '生成成功'
                        })

                        this.selectItem(1)
                    } else {
                        this.$Modal.error({
                            title: '提示',
                            content: data.data.msg
                        })
                    }
                })
            },
            myInviteInfo() {
                this.myInviteInfoList = []
                this.loading = true
                this.serchForm.custType = this.formData.custType
                axios.post('/myInviteInfo', this.serchForm).then(data => {
                    this.loading = false
                    if (data.data.success) {
                        this.myInviteInfoList = data.data.list
                        this.total = data.data.totalSize
                    }
                })
            },
            showModal(item) {
                this.updata.remark = item.remark
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.updata.remark,
                                autofocus: true,
                                placeholder: '请输入备注信息'
                            },
                            on: {
                                input: (val) => {
                                    this.updata.remark = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        this.updata.tableKey = item.tableKey
                        this.saveInviteCode(item)
                    }
                })
            },
            saveInviteCode(item) {
                axios.post('/saveInviteCode', this.updata).then(data => {
                    if (data.data.success) {
                        item.remark = this.updata.remark
                        this.$Modal.success({
                            title: '提示',
                            content: data.data.msg
                        })
                    } else {
                        this.$Modal.error({
                            title: '提示',
                            content: data.data.msg
                        })
                    }
                })
            },
            delmyInviteInfo(index) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确认删除这条邀请码吗？',
                    onOk: () => {
                        axios.post('/saveInviteCode', { tableKey: this.myInviteInfoList[index].tableKey, codeStatus: 0 }).then(data => {
                            if (data.data.success) {
                                let [tempObj] = this.myInviteInfoList.splice(index, 1)
                                this.$Notice.success({
                                    title: '提示',
                                    desc: '邀请码 ' + tempObj.inviteCode+' 删除成功！'
                                });
                            }else{
                                this.$Notice.error({
                                    title: '提示',
                                    desc:' 删除成功！'
                                });
                            }
                        })
                    }
                })
            },
            handleShowDateil(item) {
                this.selectGameRebates = JSON.parse(item.gameRebates)
                this.showDateil = true
            },
            selectItem(val) {
                this.itemVal = "" + val
                if (val == 1) { this.myInviteInfo() }
            },
            changPage(page) {
                this.serchForm.pageNo = page
                this.myInviteInfo()
            },
            fuzhi() {
                this.$Message.success('复制成功');
            },
            shibai() {
                this.$Message.error('复制失败');
            },
            goRebateDes() {
                window.open('/#/dailiRebateDes', "返点赔率表", "width=1242,height=1055")
            }
        },
        mounted() {

        }

    }
</script>
<style>
    .radioStyle {
        padding-left: 50px;
        padding-bottom: 20px;
        font-weight: 700;
        font-size: 12px;
    }

    .radioStyle span {
        line-height: 70px;
        font-size: 14px;
    }

    .radioStyle label {
        display: inline-block;
        width: 44px;
        height: 26px;
        border: 1px solid #cecece;
        line-height: 26px;
        text-align: center;
        box-sizing: content-box;
        font-size: 14px;
    }

    .radioStyle label.active {
        border: 2px solid #4aa9db;
    }

    .rebateDesLink {
        display: inline;
        font-weight: normal;
        color: #e4393c;
    }


    .bonusTable ul:after,
    .bonusTable ul:before {
        content: "";
        display: table
    }

    .bonusTable ul:after {
        clear: both;
        overflow: hidden
    }

    .bonusTable {
        width: 100%;
        padding: 10px 50px;
        border-top: 1px dotted #e8e8e8;
        border-bottom: 1px dotted #e8e8e8;
        background: #fff;
    }

    .bonusTable ul {
        line-height: 45px
    }

    .bonusTable ul li {
        float: left;
        vertical-align: middle
    }

    .bonusTable ul:first-of-type {
        margin-top: 20px
    }

    .bonusTable ul li:first-child {
        width: 130px;
        font-size: 20px;
        text-align: left;
        padding-right: 22px
    }

    .bonusTable ul li span {
        display: inline-block
    }

    .bonusTable input {
        height: 30px;
        border: 1px solid #cecece;
        color: inherit;
        font: inherit;
        line-height: normal;
        border-radius: 2px;
        padding: 5px;
        width: 100px;
        margin: 0
    }

    .mytips {
        margin: 30px;
    }

    .mysubmitBtn {
        display: inline-block;
        line-height: 30px;
        color: #fff;
        height: 30px;
        padding: 0 15px;
        border-radius: 3px;
        font-size: 14px;
        margin-right: 10px;
        min-width: 55px;
        text-align: center;
        cursor: pointer;
        background: #2e4158;
        margin: 10px 0;
        margin-left: 200px;
    }

    .handle span {
        color: #e4393c;
        cursor: pointer;
    }

    .hover {
        cursor: pointer;
    }

    .hover:hover {
        text-decoration: underline;
    }

    .fuzhi {
        color: #4aa9db;
        cursor: pointer;
    }

    .showDateilItem {
        padding-bottom: 18px;
    }

    .showDateilItem span:first-child {
        display: inline-block;
        width: 110px;
        font-size: 20px;
        vertical-align: middle;
    }

    .showDateilItem .ivu-input[disabled] {
        color: #555;
    }
</style>