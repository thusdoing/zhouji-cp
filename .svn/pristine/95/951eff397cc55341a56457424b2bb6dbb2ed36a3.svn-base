<template>
        <div id="lhc-class">
            
            <div class="game-content">
                <div class="game-panel clearfix">
                    <div class="game-info">
                        <p style="padding:20px 24px;color: #454545">
                            <Icon type="information-circled" style="color:red;"></Icon>
                            <label style="font-size:13px;" v-html="configDataNew.description"></label>
                            <Tooltip placement="bottom-start" style="font-size:13px;color:red;text-decoration:underline;">
                                <div slot="content" v-html="configDataNew.example" style="white-space: normal;"></div>
                                <label style="text-decoration:underline;font-size:13px;color:red;">案例</label>
                            </Tooltip>
                        </p>
                    </div>
                    <div class="game-zones lhc-panels lhc-panels-tema_b">

                        <div class="number-zone lhc-ball-panel">
                            <div class="number-section">
                                <div>
                                    <ul class="number lhc-numbers" style="height: 300px;">
                                        <div class="lhc-number" :class="{'active':item.select,'disable':!item.select&&betRetList.length>=configDataNew.max}" @click="selected(index)" v-for="(item, index) in configDataNew.ball" :key="index+'ball'">
                                            <div>
                                                <div class="noselect number lhc-text-plain" :class="{'lhc-ball-red':item.color=='red','lhc-ball-blue':item.color=='blue','lhc-ball-green':item.color=='green',}">
                                                    <span :class='{"textRed":item.groupName.indexOf("红")>=0,"textBlue":item.groupName.indexOf("蓝")>=0,"textGreen":item.groupName.indexOf("绿")>=0,}'>{{item.groupName}}</span>
                                                </div>

                                                <span class="odds"></span>

                                                <Checkbox style="margin-top: 6px" :disabled="betRetList.length>=configDataNew.max&&!item.select" v-model="item.select"></Checkbox>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="number-zone lhc-half-panel">
                            <div class="number-section">
                                <div>
                                    <ul class="number lhc-numbers" :style="'height:'+configDataNew.height ">
                                        <div class="lhc-number" :class="{'active':item.select,'disable':!item.select&&betRetList.length>9&&configData.checkbox}" @click="selected2(index)" v-for="(item, index) in configDataNew.ball" :key="index">
                                            <div>
                                                <div class="noselect number lhc-ball-plain lhc-text-plain">
                                                    <span>{{item.groupName}}</span>
                                                </div>
        
                                                <span class="odds">{{item.bonusAmt}}</span>
        
                                                <input v-if='!configData.checkbox' @input="inputNum2(index)"  type="text" min="1" max="50000" class="lhc-money-input" size="4"
                                                    maxlength="7" v-model="item.betAmt" tabindex="2">
                                                <Checkbox style="margin-top: 6px" :disabled="betRetList.length>5&&!item.select" v-else v-model="item.select"></Checkbox>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div> -->

                    </div>

                </div>
                <div class="game-control">
                    <div class="game-control-wrap">
                        <span>
                            <!-- react-text: 491 -->每注金额
                            <!-- /react-text -->
                            <input v-integer type="text" min="1" max="50000" size="4" maxlength="7" v-model="queryBet">
                            <!-- react-text: 493 -->元
                            <!-- /react-text -->
                        </span>
                        <!-- react-text: 494 -->&nbsp;&nbsp;
                        <!-- /react-text -->
                        <span>
                            <!-- react-text: 496 -->您选择了
                            <!-- /react-text -->
                            <span class="high-light">{{betNum}}</span>
                            <!-- react-text: 498 -->注，总金额
                            <!-- /react-text -->
                            <span class="high-light">{{betAmt}}</span>
                            <!-- react-text: 500 -->元
                            <!-- /react-text -->
                        </span>
                        <div class="cart-btns">
                            <div class="reset main-btn" @click="reset">重置</div>
                            <div class="submit main-btn" @click="goBet">立即投注</div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal :transfer="false" v-model="betModel" width="400" :mask-closable="false" class-name="notice-model">
                <div slot="header" style="text-align:center;font-size:15px;font-weight:bold;">
                确认注单
                </div>
                <div style="overflow:hidden;">
                    <Row style="margin: 10px 0;">
                        <i-col :span="16"><p style="text-align:center;font-size:13px;font-weight:bold;">内容</p></i-col>
                        <i-col :span="4"><p style="text-align:center;font-size:13px;font-weight:bold;">赔率</p></i-col>
                        <i-col :span="4"><p style="text-align:center;font-size:13px;font-weight:bold;">下注金额</p></i-col>
                    </Row>
                    <Row style="margin: 10px 0;" v-for="(el, index) in officeArr" :key="index">
                        <i-col :span="16"><p style="text-align:center;font-size:13px;">{{el.betContent}}</p></i-col>
                        <i-col :span="4"><p style="text-align:center;font-size:13px;">{{el.betBonus}}</p></i-col>
                        <i-col :span="4"><p style="text-align:center;font-size:13px;">{{el.betAmt}}</p></i-col>
                    </Row>
                    <Row>
                        <i-col :span="24">
                            <p style="text-align:center;">共<span style="color:red;font-weight:bold;">{{betNum}}</span>注, 合计下注金额<span style="color:red;font-weight:bold;">{{betAmt}}</span>元</p>
                        </i-col>
                    </Row>
                </div>
                <div slot="footer" style="text-align:center;">
                    <Button type="error" @click="onBet" :loading="loading">确认下注</Button>
                    <Button type="default" @click="betModel=false;">取消</Button>
                </div>
            </Modal>
        </div>
        </template>
        <script>
            import _ from 'lodash'
            import Combinatorics from '@/assets/js/combinatorics'
            export default {
                props:['selindex','gameData','configData'],
                data(){
                    return{
                        queryBtn:true,
                        queryBet:'',
                        queryNull:'',
                        configDataNew:[],
                        ball2:[],
                        betModel:false,
                        // betRetList:[],
                        loading:false,
                    }
                },
                created() {
                    this.configDataNew = _.cloneDeep(this.configData)
                },
                computed:{
                    betRetList:function(){
                        let tmpArr = []
                        this.configDataNew.ball.map(el=>{
                            if(el.select){
                                el.gameNo = this.$route.params.gameNo
                                el.groupNo = this.configData.groupNo
                                el.betBonus = el.bonusAmt
                                tmpArr.push(el)
                            }
                        })

                        return tmpArr
                    },
                    betNum:function(){
                        return Combinatorics.C(this.betRetList.length,this.configData.must)
                    },
                    betAmt:function(){
                        return this.betNum*parseInt(this.queryBet||0)
                    },
                    
                    officeArr:function(){
                            let tempObj = {}
                            tempObj.betContent = this.betRetList.map(el => { return el.groupName })
                            tempObj.betContent = tempObj.betContent.join(',')
                            tempObj.betAmt = this.betAmt
                            tempObj.betNumber = this.betNum
                            tempObj.gameNo = this.$route.params.gameNo
                            tempObj.groupNo = this.configData.groupNo
                            tempObj.betBonus = this.configData.bonusAmt
                            return [tempObj]
                    }
                },
                watch:{
                    configData:function(){
                        this.configDataNew = _.cloneDeep(this.configData)
                    },
                    queryBet:function(){
                        this.ball2 = this.ball2.map(item=>{
                            if(item.select){
                                item.betAmt = this.queryBet
                            }
                            return item
                        })
                    }
                },
                methods:{
                    async onBet(){
                        this.loading = true
                        // const r = this.$http({ method:'post', url:'/game/creditBet', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, data:this.officeArr })
                        const rsp = await this.$tools.fetch('/game/api/creditBet').setCrypto(true).setJson({betVos: this.officeArr}).post();
                        const r = Promise.resolve({data: { success: rsp.success, msg: rsp.message, ...rsp.data}});
                        r.then(response => {
                            this.loading = false
                            let content = ''
                            if(response.data.success){
                                content='投注成功'
                                this.$emit('updated',+new Date().getTime());
                                this.$Modal.success({
                                    title:'系统提示',
                                    content:content
                                })
                                this.$store.commit('yu_e')
                                this.reset()
                                this.betModel = false
                            }else{
                                this.$Modal.error({
                                    title:'系统提示',
                                    content:response.data.msg
                                })
                            }
                        })
                    },
                    goBet(){
                        if(this.betNum==0){
                            this.$Modal.warning({
                                title: '系统提示',
                                content: '请选择投注内容'
                            });
                        }else if(this.betAmt==0){
                            this.$Modal.warning({
                                title: '系统提示',
                                content: '请输入投注金额'
                            });
                        }else{
                            this.betModel = true
                        }
                    },
                    selected(index){
                        if(this.betRetList.length>=this.configDataNew.max&&this.configDataNew.ball[index].select==false){
                            return
                        }
                        this.configDataNew.ball = this.configDataNew.ball.map((item,iindex)=>{
                            if(index == iindex){
                                item.select = !item.select
                                item.betAmt = item.select?this.queryBet:''
                            }
                            return item
                        })
                    },
                    
                    reset(){
                        this.configDataNew=_.cloneDeep(this.configData)
                        this.ball2 = this.ball2.map(el=>{
                            el.select = false
                            el.betAmt = ''
                            return el
                        })
                    },
                    inputNum1(index){
                        this.configDataNew.ball = this.configDataNew.ball.map((item,iindex)=>{
                            if(index == iindex){
                                item.select = true
                            }
                            return item
                        })
                    },
                    getGroupNoList(){
                        this.$http({
                            method: 'get',
                            url: '/gameGroup/getGameBonusByGroupNo',
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            params: {
                                groupNo: this.configData.groupNo
                            }
                        }).then(res=>{
                            if(res.data.success){
                                this.ball2 = res.data.list.map(el=>{
                                    el.select = false
                                    el.betAmt = ''
                                    return el
                                })
                            }else{
                                this.$Modal.error({
                                    title:'系统提示',
                                    content:res.data.msg
                                })
                            }
                        })
                    },
                }
            }
        </script>
        <style>
            .notice-model .ivu-modal-close i {
                color: #fff;
            }
            .notice-model .ivu-modal-header {
                padding: 16px;
                background-color: #d00808;
                color: #fff;
            }
            .notice-model .ivu-modal-body {
                padding:2px;
            }
        </style>
        <style lang='less'>
        </style>