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
                <div class="toggle-btn-defalue" v-if="queryBtn" @click="queryBtn=!queryBtn">快速投注</div>
                <div class="lhc-quick-pick" v-else>
                    <div class="control-btns">
                        <div class="toggle-btn active"  @click="queryBtn=!queryBtn">快速投注收合</div>
                        <div class="select-all-btn" @click="selectAll">全选</div>
                        <div class="reset-btn" @click="reset">重置</div>
                    </div>
                    <div class="select-btns left-select-btns">
                        <div @click="querySelect(item.condition,index)" v-if="index<24" :class="[item.class,{'active':item.select}]" v-for="(item, index) in configDataNew.btn" :key="index+'btn1'">{{item.name}}</div>
                    </div>
                    <div class="select-btns right-select-btns">
                        <div @click="querySelect(item.condition,index)" v-if="index>23" :class="[item.class,{'active':item.select}]" v-for="(item, index) in configDataNew.btn" :key="index+'btn2'">{{item.name}}</div>
                    </div>
                </div>
                
                <div class="number-zone lhc-ball-panel">
                    <div class="number-section">
                        <div>
                            <ul class="number lhc-numbers">
                                <div class="lhc-number" :class="item.select?'active':''" @click="selected(index)" v-for="(item, index) in configDataNew.ball" :key="index+'ball'">
                                    <div>
                                        <div class="noselect number lhc-text-plain" :class="{'lhc-ball-red':item.color=='red','lhc-ball-blue':item.color=='blue','lhc-ball-green':item.color=='green',}">
                                            <span>{{item.groupName}}</span>
                                        </div>
                                        <span class="odds">{{item.bonusAmt}}</span>
                                        <input @input="inputNum1(index)" type="text" min="1" max="50000" class="lhc-money-input" size="4"
                                            maxlength="7" v-model="item.betAmt" tabindex="1">
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="number-zone lhc-half-panel">
                    <div class="number-section">
                        <div>
                            <ul class="number lhc-numbers" :style="'height:'+configDataNew.height">
                                <div class="lhc-number" :class="item.select?'active':''" @click="selected2(index)" v-for="(item, index) in ball2" :key="index">
                                    <div>
                                        <div class="noselect number lhc-ball-plain lhc-text-plain">
                                            <span :class='{"textRed":item.groupName.indexOf("红")>=0,"textBlue":item.groupName.indexOf("蓝")>=0,"textGreen":item.groupName.indexOf("绿")>=0,}'>{{item.groupName}}</span>
                                        </div>
                                        <span class="odds">{{item.bonusAmt}}</span>
                                        <input @input="inputNum2(index)"  type="text" min="1" max="50000" class="lhc-money-input" size="4"
                                            maxlength="7" v-model="item.betAmt" tabindex="2">
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="game-control">
            <div class="game-control-wrap">
                <span>
                    <!-- react-text: 491 -->每注金额
                    <!-- /react-text -->
                    <input type="text" v-integer min="1" max="50000" size="4" maxlength="7" v-model="queryBet">
                    <!-- react-text: 493 -->元
                    <!-- /react-text -->
                </span>
                <!-- react-text: 494 -->&nbsp;&nbsp;
                <!-- /react-text -->
                <span>
                    <!-- react-text: 496 -->您选择了
                    <!-- /react-text -->
                    <span class="high-light">{{''+betRetList.length}}</span>
                    <!-- react-text: 498 -->注，总金额
                    <!-- /react-text -->
                    <span class="high-light">{{''+betRetList.reduce((a, b) => {return a + (+b.betAmt)}, 0)}}</span>
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
                <i-col :span="10"><p style="text-align:center;font-size:13px;font-weight:bold;">内容</p></i-col>
                <i-col :span="6"><p style="text-align:center;font-size:13px;font-weight:bold;">赔率</p></i-col>
                <i-col :span="6"><p style="text-align:center;font-size:13px;font-weight:bold;">下注金额</p></i-col>
            </Row>
            <Row style="margin: 10px 0;" v-for="(el, index) in betRetList" :key="index">
                <i-col :span="10"><p style="text-align:center;font-size:13px;">{{el.groupName}}</p></i-col>
                <i-col :span="6"><p style="text-align:center;font-size:13px;">{{el.bonusAmt}}</p></i-col>
                <i-col :span="6"><p style="text-align:center;font-size:13px;">{{el.betAmt}}</p></i-col>
            </Row>
            <Row>
                <i-col :span="24">
                    <p style="text-align:center;">共<span style="color:red;font-weight:bold;">{{''+betRetList.length}}</span>注, 合计下注金额<span style="color:red;font-weight:bold;">{{''+betRetList.reduce((a, b) => {return a + (+b.betAmt)}, 0)}}</span>元</p>
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
                ballGroupNo:''
            }
        },
        created() {
            this.getGroupNoList()
            this.configDataNew = _.cloneDeep(this.configData)
        },
        computed:{
            betRetList:function(){
                let tmpArr = []
                this.configDataNew.ball.map(el=>{
                    if(el.select){
                        el.betContent = el.groupName
                        el.gameNo = this.$route.params.gameNo
                        el.groupNo = this.ballGroupNo
                        el.betBonus = el.bonusAmt
                        el.betNumber = 1
                        tmpArr.push(el)
                    }
                })
                this.ball2.map(el=>{
                    if(el.select){
                        el.gameNo = this.$route.params.gameNo
                        el.betBonus = el.bonusAmt
                        tmpArr.push(el)
                    }
                })
                return tmpArr
            }
        },
        watch:{
            configData:function(){
                this.configDataNew = _.cloneDeep(this.configData)
                this.ball2 = []
                this.getGroupNoList()
            },
            // gameData:function(){
            //     let temparr = _.cloneDeep(this.gameData.groupClassCones[this.selindex[0]].groupSettinges)
            //     temparr.shift()
            //     this.ball2 = temparr.map(el=>{
            //         el.select = false
            //         el.betAmt = ""
            //         return el
            //     })
            // },
            // selindex:function(){
            //     this.ball2 = _.cloneDeep(this.gameData.groupClassCones[this.selindex[0]].groupSettinges)
            //     this.ball2.shift()
            //     this.ball2 = this.ball2.map(el=>{
            //         el.select = false
            //         return el
            //     })
            // },
            queryBet:function(){
                this.configDataNew.ball = this.configDataNew.ball.map((item,index)=>{
                    if(item.select){
                        item.betAmt = this.queryBet
                    }
                    return item
                })
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
                // const r = this.$http({ method:'post', url:'/game/creditBet', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, data:this.betRetList })
                const rsp = await this.$tools.fetch('/game/api/creditBet').setCrypto(true).setJson({betVos: this.betRetList}).post();
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
                if(this.betRetList.length==0){
                    this.$Modal.warning({
                        title: '系统提示',
                        content: '请选择投注内容'
                    });
                }else if(this.betRetList.reduce((a, b) => {return a + (+b.betAmt)}, 0)<=0){
                    this.$Modal.warning({
                        title: '系统提示',
                        content: '请输入投注金额'
                    });
                }else{
                    this.betModel = true
                }
            },
            selected(index){
                this.configDataNew.ball = this.configDataNew.ball.map((item,iindex)=>{
                    if(index == iindex){
                        item.select = !item.select
                        item.betAmt = item.select?this.queryBet:''
                    }
                    return item
                })
            },
            selected2(index){
                this.ball2 = this.ball2.map((item,iindex)=>{
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
            selectAll(){
                this.configDataNew.ball = this.configDataNew.ball.map((item,iindex)=>{
                    item.select = !item.select
                    item.betAmt = this.queryBet
                    return item
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
            inputNum2(index){
                this.ball2 = this.ball2.map((item,iindex)=>{
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
                        this.ballGroupNo = res.data.list[0].groupNo
                        res.data.list.shift()
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
            querySelect(condition,index){
                let conditionList=[]
                this.$set(this.configDataNew,'btn',this.configDataNew.btn.map((item,iindex)=>{
                    if(index==iindex){
                        item.select=!item.select
                    }else{
                        if(iindex>11&&iindex<24&index>11&&index<24){
                            
                        }else{
                            item.select=false
                        }
                    }
                    if(item.select){
                        conditionList=conditionList.concat(item.condition)
                    }
                    return item
                }))
                this.configDataNew.ball =  this.configDataNew.ball.map(el=>{
                    el.select = false
                    el.betAmt = ""
                    for(let i of conditionList){
                        if(i == '单'){if(parseInt(el.groupName)%2==1){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '双'){if(parseInt(el.groupName)%2==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '大'){if(parseInt(el.groupName)>24){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '小'){if(parseInt(el.groupName)<25){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '小双'){if(parseInt(el.groupName)<25&&parseInt(el.groupName)%2==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '小单'){if(parseInt(el.groupName)<25&&parseInt(el.groupName)%2==1){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '大双'){if(parseInt(el.groupName)>25&&parseInt(el.groupName)%2==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '大单'){if(parseInt(el.groupName)>25&&parseInt(el.groupName)%2==1){el.betAmt = this.queryBet;el.select = true;break}}

                        if(i == '合单'){if((parseInt(el.groupName)%10 +Math.floor(parseInt(el.groupName)/10))%2==1){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '合双'){if((parseInt(el.groupName)%10 +Math.floor(parseInt(el.groupName)/10))%2==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '合大'){if((parseInt(el.groupName)%10 +Math.floor(parseInt(el.groupName)/10))>6){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '合小'){if((parseInt(el.groupName)%10 +Math.floor(parseInt(el.groupName)/10))<7){el.betAmt = this.queryBet;el.select = true;break}}
                        
                        if(i == '0头'){if(Math.floor(parseInt(el.groupName)/10)==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '1头'){if(Math.floor(parseInt(el.groupName)/10)==1){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '2头'){if(Math.floor(parseInt(el.groupName)/10)==2){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '3头'){if(Math.floor(parseInt(el.groupName)/10)==3){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '4头'){if(Math.floor(parseInt(el.groupName)/10)==4){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '0尾'){if((parseInt(el.groupName)%10)==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '1尾'){if((parseInt(el.groupName)%10)==1){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '2尾'){if((parseInt(el.groupName)%10)==2){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '3尾'){if((parseInt(el.groupName)%10)==3){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '4尾'){if((parseInt(el.groupName)%10)==4){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '5尾'){if((parseInt(el.groupName)%10)==5){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '6尾'){if((parseInt(el.groupName)%10)==6){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '7尾'){if((parseInt(el.groupName)%10)==7){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '8尾'){if((parseInt(el.groupName)%10)==8){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '9尾'){if((parseInt(el.groupName)%10)==9){el.betAmt = this.queryBet;el.select = true;break}}

                        if(i == '红'){if(el.color == 'red'){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '红单'){if(el.color == 'red'&&parseInt(el.groupName)%2==1){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '红双'){if(el.color == 'red'&&parseInt(el.groupName)%2==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '红大'){if(el.color == 'red'&&parseInt(el.groupName)>24){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '红小'){if(el.color == 'red'&&parseInt(el.groupName)<25){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '蓝'){if(el.color == 'blue'){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '蓝单'){if(el.color == 'blue'&&parseInt(el.groupName)%2==1){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '蓝双'){if(el.color == 'blue'&&parseInt(el.groupName)%2==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '蓝大'){if(el.color == 'blue'&&parseInt(el.groupName)>24){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '蓝小'){if(el.color == 'blue'&&parseInt(el.groupName)<25){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '绿'){if(el.color == 'green'){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '绿单'){if(el.color == 'green'&&parseInt(el.groupName)%2==1){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '绿双'){if(el.color == 'green'&&parseInt(el.groupName)%2==0){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '绿大'){if(el.color == 'green'&&parseInt(el.groupName)>24){el.betAmt = this.queryBet;el.select = true;break}}
                        if(i == '绿小'){if(el.color == 'green'&&parseInt(el.groupName)<25){el.betAmt = this.queryBet;el.select = true;break}}

                        if(el.zoo == i){el.betAmt = this.queryBet;el.select = true}

                    }
                    return el
                })
            }
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