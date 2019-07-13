<style lang='less'>
    .ivu-page-item-active{
        background-color:#c60a0a;
    }
    .msgStatus{color:#c60a0a;}
</style>
<style scoped>
._3VqNJ{
    bottom: initial;
}
</style>
<template>
<div>
<div class="fl mb12 _2WJqO" style="width: 840px;">
    <p>站内信
    </p>
</div>
        <div v-if='reading==null' class="_3wioq fl" style="width: 840px;">
    <div class="Ptq1T">
        <table width="100%" cellspacing="0" cellpadding="0">
            <thead class="_3zNxB">
                <tr>
                    <th>主题</th>
                    <th>发件人</th>
                    <th>时间</th>
                </tr>
            </thead>
            <tbody class="xnDlg">
                        <tr v-if="getData.length==0">
                            <td class="_32waq" colspan="8">
                                <article class="_1dJVz">
                                    <div class="absolute center-margin"><img class="_1VUC8" src="/static_pc/images/ku.png">
                                        <p>暂无记录</p>
                                    </div>
                                </article>
                            </td>
                        </tr>
                <tr v-for="(item,index) in getData" :key="index+'msg'">
                    <td class="ellipsis"  style="text-indent: 33px"><span @click="readMsg(item.tableKey,index)" class="_3CDhe _34NEG _1VYLm" :class="item.msgStatus=='1'?'msgStatus':''">{{item.msgStatus=='0'?'[已读] ':'[未读] '}}{{item.msgTitle}}</span></td>
                    <td>{{item.sender}}</td>
                    <td>{{item.createTime}}</td>
                </tr>
            </tbody>
        </table>
        <Page v-if="total>10"  @on-change='changPage' style="text-align: right;margin: 10px" :total="total" size="small" show-elevator></Page>

    </div>
    </div>


        <div v-else class="_3wioq fl" style="width: 840px;">
            <div class="Ptq1T">
                <div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody class="_1NmMb">
                            <tr>
                                <td>主题 :</td>
                                <td>
                                    <p style="word-break: break-all;">{{getData[reading].msgTitle}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>发件人 :</td>
                                <td>{{getData[reading].sender}}</td>
                            </tr>
                            <tr>
                                <td>时间 :</td>
                                <td>{{getData[reading].createTime}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="_2Bk7D">
                        <div class="_3I8OC cf">
                            <div style="word-break: break-all;">
                                <p>{{getData[reading].msgBody}}</p>
                            </div>
                        </div><button class="_1sc4M _3VqNJ" type="button" @click='back'>返回</button></div>
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
                getData:[],
                formData:{
                    pageNo:1,
                    pageSize:10
                },
                total:0,
                reading:null
            }
        },
        components: {

        },
        created(){
            this.getMsg()
        },
        watch:{
        },
        methods:{
            getMsg(){
                let _this = this;
                axios({
                        method: 'get',
                        url: '/getMsg',
                        params:_this.formData,
                    }).then(function(data){
                        if(data.data.success){
                            if(data.data.list != null && data.data.list != undefined){
                                _this.getData = data.data.list;
                                _this.total = data.data.totalSize;
                            }
                    }
                });
            },
            readMsg(key,index){
                let _this = this;
                _this.reading = index;
                    if(this.getData[index].msgStatus=='1'){
                        axios({
                            method: 'get',
                            url: '/readMsg',
                            params:{msgId:key,msgStatus:'0'},
                        }).then((data)=>{
                            if(data.data.success){
                                _this.$store.commit('setmsg',_this.$store.state.msg-1)
                            }
                        }
                    );
                }
            },
            back(){
                if(this.getData[this.reading].msgStatus=='1'){
                    this.getMsg();
                }
                this.reading = null;
            },
            changPage(page){
                this.formData.pageNo=page;
                this.getMsg();
            }

        },
        mounted(){

        }

    }
</script>
