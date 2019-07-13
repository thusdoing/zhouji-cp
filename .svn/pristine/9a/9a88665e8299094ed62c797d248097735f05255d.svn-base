<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>资金管理 - 额度转换</p>
        </div>
        <div class="_3wioq fl" style="width: 840px;">
            <div class="react-tabs" data-tabs="true">
                <ul class="react-tabs__tab-list" role="tablist">
                    <li class="react-tabs__tab" :class="{'react-tabs__tab--selected':tab==1}" @click="tab=1">额度转换</li>
                    <li class="react-tabs__tab" :class="{'react-tabs__tab--selected':tab==2}" @click="tab=2;tiem='d1';getPurseChangeRecodes(1)">转换记录</li>
                </ul>
                <div v-if="tab==1" class="react-tabs__tab-panel">
                    <div>
                        <div class="sc-imDdex eUKOfX">
                            <div class="sc-lffWgi fHsnSc">
                                <div class="sc-fGSyRc jVMwmo">
                                    <div class="sc-huKLiJ jUOAwv">主钱包</div>
                                    <div size="16" title="可投注彩票类游戏" fill="currentColor" style="display: inline-flex; justify-content: center; align-items: center; color: rgb(255, 180, 12);">
                                        <svg fill="currentColor" height="16" width="16" viewBox="0 0 512 512" style="display: inline-block; vertical-align: middle;">
                                            <title>可投注彩票类游戏</title>
                                            <g>
                                                <path d="M480,253C478.3,129.3,376.7,30.4,253,32S30.4,135.3,32,259c1.7,123.7,103.3,222.6,227,221C382.7,478.3,481.7,376.7,480,253
                                                z M256,111.9c17.7,0,32,14.3,32,32s-14.3,32-32,32c-17.7,0-32-14.3-32-32S238.3,111.9,256,111.9z M300,395h-88v-11h22V224h-22v-12
                                                h66v172h22V395z">
                                                    <path d="M480,253C478.3,129.3,376.7,30.4,253,32S30.4,135.3,32,259c1.7,123.7,103.3,222.6,227,221C382.7,478.3,481.7,376.7,480,253
                                                z M256,111.9c17.7,0,32,14.3,32,32s-14.3,32-32,32c-17.7,0-32-14.3-32-32S238.3,111.9,256,111.9z M300,395h-88v-11h22V224h-22v-12
                                                h66v172h22V395z"></path>
                                                </path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                                <div class="sc-fguZLD fmuBuz">
                                    <div font-size="24px" class="sc-faQXZc bEkJHw">{{userPurseBo.acctPurseMoney.toFixed(4)}}</div>
                                    <div width="70" class="sc-bQmweE bxlHCI" style="text-align: center;" @click="onkeyChange">一键转入
                                        <br>主钱包</div>
                                </div>
                            </div>
                            <div class="sc-ewMkZo cNMcxe">
                                <div width="85" class="sc-dCVVYJ ihFaBL sc-bQmweE" @click="refreshAcct">
                                    <div size="14" fill="currentColor" style="display: inline-flex; justify-content: center; align-items: center;">
                                        <svg fill="currentColor" height="14" width="14" viewBox="0 0 512 512" style="display: inline-block; vertical-align: middle;">
                                            <g>
                                                <path d="M256,388c-72.597,0-132-59.405-132-132c0-72.601,59.403-132,132-132c36.3,0,69.299,15.4,92.406,39.601L278,234h154V80
                                                l-51.698,51.702C348.406,99.798,304.406,80,256,80c-96.797,0-176,79.203-176,176s78.094,176,176,176
                                                c81.045,0,148.287-54.134,169.401-128H378.85C360.105,353.561,311.712,388,256,388z">
                                                    <path d="M256,388c-72.597,0-132-59.405-132-132c0-72.601,59.403-132,132-132c36.3,0,69.299,15.4,92.406,39.601L278,234h154V80
                                                l-51.698,51.702C348.406,99.798,304.406,80,256,80c-96.797,0-176,79.203-176,176s78.094,176,176,176
                                                c81.045,0,148.287-54.134,169.401-128H378.85C360.105,353.561,311.712,388,256,388z"></path>
                                                </path>
                                            </g>
                                        </svg>
                                    </div>
                                    一键刷新
                                </div>
                                <button type="button" class="sc-jFpLkX kceXJZ" @click="$router.push('/deposit')">充值</button>
                            </div>
                        </div>

                        <div class="sc-lmrgJh kgVOvh">
                            <div class="sc-dzQEYZ jwVqRs" v-for="(item, index) in userPurseBo.salvePurseBoList" :key="index">
                                <div class="sc-bpubUI dmubhu">{{item.platPurseName}}</div>
                                <div class="sc-eXsVQl dHCMxY">
                                    <div font-size="20px" class="sc-jkPxnQ fyDNjY">{{item.platPurseBalance.toFixed(4)}}</div>
                                    <div width="60" class="sc-bQmweE jOEIwa" style="text-align: center;" @click="rechangQipai(item.platNo)">一键转入
                                        <br>{{item.platPurseName}}</div>
                                </div>
                            </div>
                            <div>
                                <div class="sc-juQqkt blyqXs">
                                    <div class="sc-sVRsr hUNSQb">转出钱包:</div>
                                    <div class="sc-boCWhm hIQEOU">
                                        <Select placeholder="请选择转出钱包" v-model="walletOut" clearable style="width:200px">
                                            <Option v-for="item in walletList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div class="sc-juQqkt blyqXs">
                                    <div class="sc-sVRsr hUNSQb">转入钱包:</div>
                                    <div class="sc-boCWhm hIQEOU">
                                        <Select placeholder="请选择转入钱包" v-model="walletIn" clearable style="width:200px">
                                            <Option v-for="item in walletList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div class="sc-juQqkt blyqXs">
                                    <div class="sc-sVRsr hUNSQb">转账金额:</div>
                                    <input v-model="formData.jine" type="text" size="5" placeholder="请输入转账金额" disabled="" class="sc-fjdPjP brChln" value="" style="width: 215px; height: 30px; margin-right: 6px;">
                                    <div width="50" class="sc-bQmweE NUeY" @click="maxJine">最大值</div>
                                </div>
                                <div class="sc-bkCOcH bYNHVf">
                                    <div class="sc-ekQYnd gHAbqn">
                                        <div width="50" class="sc-bQmweE NUeY" @click="formData.jine=item" v-for="(item, index) in j1" :key="index">{{item}}</div>
                                    </div>
                                    <div class="sc-ekQYnd gHAbqn">
                                        <div width="50" class="sc-bQmweE NUeY" @click="formData.jine=item" v-for="(item, index) in j2" :key="index">{{item}}</div>
                                    </div>
                                </div>
                                <div class="sc-bkCOcH bYNHVf">
                                    <div class="sc-bvODop kjLwVa" :class="{dCrrMk:goflag}" @click="rechangQipai()">确认</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-if="tab==2" class="react-tabs__tab-panel">
                    <div class="sc-hqGPoI fpTbFF">
                        <div>
                            <span class="sc-imAxmJ dsMtto">时间：</span>
                            <div class="sc-hPeUyl ieNWXh" :class="{dzqcsT:tiem=='d1'}" @click="tiem='d1';getPurseChangeRecodes(1)">今天</div>
                            <div class="sc-hPeUyl ieNWXh" :class="{dzqcsT:tiem=='d2'}" @click="tiem='d2';getPurseChangeRecodes(2)">昨天</div>
                            <div class="sc-hPeUyl ieNWXh" :class="{dzqcsT:tiem=='d7'}" @click="tiem='d7';getPurseChangeRecodes(7)">七天</div>
                        </div>
                    </div>
                    
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <thead class="_3apNX">
                            <tr>
                                <th>转账时间</th>
                                <th>转账金额</th>
                                <th>转账项目</th>
                            </tr>
                        </thead>
                        <tbody class="-QUHL">
                            <tr v-if="recordList.length==0">
                                <td class="_32waq" colspan="8">
                                    <div v-if="loading" class="_1dJVz">
                                            <div class="absolute center-margin"><img class="_1VUC8" src="/static_pc/images/loading.gif"></div>
                                    </div>
                                    <article v-if="!loading" class="_1dJVz">
                                        <div class="absolute center-margin"><img class="_1VUC8" src="/static_pc/images/ku.png">
                                            <p>暂无记录</p>
                                        </div>
                                    </article>
                                </td>
                            </tr>
                            <tr v-else v-for="item in recordList" :key="item.tableKey">
                                <td v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:item.trandTime}"></td>
                                <td>{{item.trandAmt}}</td>
                                <td>{{item.trandProj}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="cf">
                        <Page v-if="total>10"  @on-change='changPage' style="text-align: right;margin: 10px" :current="recodeForm.pageNO" :total="total" size="small" show-elevator></Page>
                    </div>
                    <div class="Vxtwm _1Hs7s">
                        <p><img class="v-sub mr5" src="/static_pc/images/wr.svg" width="14" height="14"> 温馨提示：投注记录最多只保留7天。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
            walletList: [{ value: 'main', label: '主钱包' }],
            j1: [10, 20, 50, 100, 200],
            j2: [500, 1000, 2000, 3000, 5000],
            formData: {
                walletOut: '',
                walletIn: '',
                jine: ''
            },
            walletOut: '',
            walletIn: '',
            tab: 1,
            recordList: [],
            loading: false,
            userPurseBo:{
                acctPurseMoney: 0,
                custName: "",
                custNo: '',
                salvePurseBoList:[]
            },
            recodeForm:{
                pageNo:1,
                pageSize:10,
                trandDateStart:'',
                trandDateEnd:''
            },
            tiem:'d1',
            total:0
        }
    },
    components: {},
    created() {
		
    },

    /*
    POST /getPurse额度转换查询
    POST /changePurseAcct额度转换 masterTosalve:(true 主钱包转 游戏钱包 false 游戏钱包转主钱包); platId:游戏平台id changeBalance：要转换的金额
    POST /getPurseChangeRecodes额度转换记录 pageNO，pageSize ,trandDateStart:转换开始时间，trandDateEnd：转换结束时间
    GET /api/chess/getPlateGameAll     棋牌游戏
    GET /api/chess/enter       进入游戏         Param:  plateId（平台ID），gameId（游戏ID）
    GET /api/chess/refreshAcct         刷新账户

    */
    watch: {
        walletOut(n){
            if(n==this.walletIn){
                this.walletIn=''
            }
            if(n!='main'){
                this.walletIn='main'
            }
        },
        walletIn(n){
            
            if(n==this.walletOut){
                this.walletOut=''
            }
            if(n!='main'){
                this.walletOut='main'
            }
        }
    },
    computed: {
        goflag: function () {
            return this.walletOut && this.walletIn && this.formData.jine
        }
    },
    methods: {
        getPurse() {
            axios.post('/getPurse').then((res) => {
                if (res.data.success) {
                    this.userPurseBo = res.data.t
                    let arr = []
                    res.data.t.salvePurseBoList&&res.data.t.salvePurseBoList.map(el=>{
                        arr.push({value:el.platNo,label:el.platPurseName}) 
                    })
                    this.walletList = [{ value: 'main', label: '主钱包' }].concat(arr)
                }
            });
        },
        async rechangQipai(Id){
            if(!Id){
                if(!this.goflag) return false;
            }
            let masterTosalve,platId
            if(this.walletOut=="main"){
                masterTosalve=true
                platId = this.walletIn
            }else{
                masterTosalve=false
                platId = this.walletOut
            }
            let form = {platId,masterTosalve,changeBalance:this.formData.jine}
            if(Id){
                form={platId:Id,masterTosalve:true,changeBalance:this.userPurseBo.acctPurseMoney}
            }
            this.$Spin.show()
            const res = await this.$tools.fetch('/crypto/changePurseAcct').setCrypto().post(form)
            this.$Spin.hide()
            if(res.success){
                this.$Modal.success({
                    title: '提示',
                    content: res.data.message||res.data.msg||'转换成功！',
                });
                this.getPlateAcct()
                this.formData.jine = 0
            }else{
                this.$Modal.error({
                    title: '提示',
                    content: res.data.message||res.data.msg||'转换失败！',
                });
            }
        },
        maxJine(){
            if(this.walletOut=="main"){
                this.formData.jine = this.userPurseBo.acctPurseMoney
            }else{
                this.userPurseBo.salvePurseBoList.forEach(el => {
                    if(el.platNo==this.walletOut){
                        this.formData.jine = el.platPurseBalance
                    }
                });
            }
            
        },
        refreshAcct(){
            this.$Spin.show();
            axios.get('/api/chess/refreshAcct').then((res) => {
                this.$Spin.hide();
                if (res.data.success) {
                    this.userPurseBo = res.data.t
                    let arr = []
                    res.data.t.salvePurseBoList&&res.data.t.salvePurseBoList.map(el=>{
                        arr.push({value:el.platNo,label:el.platPurseName}) 
                    })
                    this.walletList = [{ value: 'main', label: '主钱包' }].concat(arr)
                }else{
                    this.$Modal.error({
                        title: '提示',
                        content: res.data.message||res.data.msg||'查询失败！',
                    })
                }
            });
        },
        getPlateAcct(){
            this.$Spin.show();
            axios.get('/api/chess/getPlateAcct').then((res) => {
                this.$Spin.hide();
                if (res.data.success) {
                    this.userPurseBo = res.data.t
                    let arr = []
                    res.data.t.salvePurseBoList&&res.data.t.salvePurseBoList.map(el=>{
                        arr.push({value:el.platNo,label:el.platPurseName}) 
                    })
                    this.walletList = [{ value: 'main', label: '主钱包' }].concat(arr)
                }else{
                    this.$Modal.error({
                        title: '提示',
                        content: res.data.message||res.data.msg||'查询失败！',
                    })
                }
            });
        },
        //POST /getPurseChangeRecodes额度转换记录 pageNO，pageSize ,trandDateStart:转换开始时间，trandDateEnd：转换结束时间
        getPurseChangeRecodes(day){
            this.recodeForm.trandDateStart = this.$date(Date.now()-((day-1)*86400000),'yyyy-MM-dd') + ' 00:00:00'
            this.recodeForm.trandDateEnd = this.$date(Date.now()+86400000,'yyyy-MM-dd') + ' 00:00:00'
            axios.post('/getPurseChangeRecodes',this.recodeForm).then((res) => {
                if (res.data.success) {
                    this.recordList = res.data.list||[]
                    this.total = res.data.totalSize
                }else{
                    this.$Modal.error({
                        title: '提示',
                        content: res.data.message||res.data.msg||'查询失败！',
                    })
                }
            });
        },
        async onkeyChange(){
            this.$Spin.show()
            const res = await this.$tools.fetch('/crypto/onkeyChange').setCrypto().post({f:1})
            this.$Spin.hide()
            if (res.success) {
                this.$Modal.success({
                    title: '提示',
                    content: res.message||res.msg||'刷新成功！',
                })
                this.getPurse()
            }else{
                this.$Modal.error({
                    title: '提示',
                    content: res.message||res.msg||'刷新失败！',
                })
            }
            
            // axios({url:'/onkeyChange',method:'post',headers: {'X-Requested-With': "application/x-www-form-urlencoded"},params:{f:1}}).then((res) => {
            //     this.$Spin.hide()
            //     if (res.data.success) {
            //         this.$Modal.success({
            //             title: '提示',
            //             content: res.data.message||res.data.msg||'刷新成功！',
            //         })
            //         this.getPurse()
            //     }else{
            //         this.$Modal.error({
            //             title: '提示',
            //             content: res.data.message||res.data.msg||'刷新失败！',
            //         })
            //     }
            // });
        },
        
        changPage(page){
            this.recodeForm.pageNo=page;
            if(this.tiem=='d1') return this.getPurseChangeRecodes(1);
            if(this.tiem=='d2') return this.getPurseChangeRecodes(2);
            if(this.tiem=='d7') return this.getPurseChangeRecodes(7);
        }
    },
    mounted() {
        this.getPurse()
        this.refreshAcct()
    }

  }

</script>
<style>
.eUKOfX {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-top: 10px;
    background: rgb(243, 243, 243);
    font-size: 12px;
}
.fHsnSc {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    flex: 0 0 360px;
}
.cNMcxe {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 15px;
}
.jVMwmo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.fmuBuz {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.jUOAwv {
    font-size: 14px;
    color: rgb(0, 0, 0);
}
.jVMwmo > :first-child {
    margin-right: 5px;
}
.bEkJHw {
    font-size: 24px;
    color: rgb(200, 23, 34);
    font-weight: 300;
}
.fmuBuz > :first-child {
    margin-right: 10px;
}
.bxlHCI {
    background-color: rgb(255, 255, 255);
    color: rgb(74, 74, 74);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 70px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    border-image: initial;
}
.kceXJZ {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 30px;
    color: rgb(255, 255, 255);
    width: 70px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    outline: 0px;
    background: none rgb(200, 23, 34);
    padding: 0px;
}
.ihFaBL {
    color: rgb(74, 74, 74);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 85px;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    border-image: initial;
}
.cNMcxe > :first-child {
    margin-right: 10px;
}
.cNMcxe div {
    margin-right: 5px;
}
.kgVOvh {
    margin: 10px 0px 0px 15px;
    font-size: 12px;
}
.jwVqRs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    border-image: initial;
}
.dmubhu {
    font-size: 12px;
    color: rgb(102, 102, 102);
    letter-spacing: 0.3px;
}
.jwVqRs > :first-child {
    margin-left: 15px;
}
.dHCMxY {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
}
.fyDNjY {
    font-size: 20px;
    color: rgb(200, 23, 34);
    font-weight: 300;
}
.dHCMxY > :first-child {
    margin-right: 10px;
}
.blyqXs {
    display: flex;
    width: 45%;
    align-items: center;
    margin: 10px 0px 20px 5px;
}
.hUNSQb {
    font-size: 12px;
    letter-spacing: 1.63265px;
    color: rgb(74, 74, 74);
    flex: 0 0 75px;
}
.jOEIwa {
    background-color: rgb(255, 255, 255);
    color: rgb(74, 74, 74);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 60px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    border-image: initial;
}
.brChln {
    box-sizing: border-box;
    width: 233px;
    height: 32px;
    outline: none;
    padding: 2px 4px 2px 8px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(230, 230, 230);
    border-image: initial;
}
.NUeY {
    background-color: rgb(255, 255, 255);
    color: rgb(74, 74, 74);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 50px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    border-image: initial;
}
.sc-bQmweE:hover{
    border-color: #4AA9DB
}
.bYNHVf {
    width: 290px;
    margin-left: 80px;
}
.bYNHVf:last-child {
    margin-top: 25px;
}
.kjLwVa {
    width: 58px;
    height: 32px;
    font-size: 14px;
    background-color: rgb(216, 216, 216);
    color: rgb(255, 255, 255);
    line-height: 32px;
    text-align: center;
    cursor: pointer;
}
.dCrrMk {
    width: 58px;
    height: 32px;
    font-size: 14px;
    background-color: rgb(228, 57, 60);
    color: rgb(255, 255, 255);
    line-height: 32px;
    text-align: center;
    cursor: pointer;
}
.gHAbqn {
    display: inline-flex;
    margin-bottom: 10px;
}
.gHAbqn > * {
    margin-right: 5px;
}
.fpTbFF {
    display: flex;
    height: 50px;
    background: rgb(248, 248, 248);
    border-bottom: 1px solid rgb(227, 227, 227);
}
.dsMtto {
    font-size: 14px;
    color: rgb(0, 0, 0);
    display: inline-block;
    line-height: 50px;
    padding-left: 20px;
}
.ieNWXh {
    display: inline-block;
    font-size: 12px;
    color: rgb(102, 102, 102);
    background-color: rgb(255, 255, 255);
    margin-right: 5px;
    line-height: 28px;
    cursor: pointer;
    padding: 0px 11px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    border-image: initial;
}
.dzqcsT {
    display: inline-block;
    font-size: 12px;
    color: rgb(102, 102, 102);
    background-color: rgb(255, 255, 255);
    margin-right: 5px;
    line-height: 28px;
    cursor: pointer;
    padding: 0px 11px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(74, 169, 219);
    border-image: initial;
}


</style>