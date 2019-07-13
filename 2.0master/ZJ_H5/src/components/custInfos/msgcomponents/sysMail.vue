<template>
    <div>
        <gridRowItem :class="item.msgStatus=='0'?'yidu':''" v-for="(item,index) in listnotice" :item="item" :key="index" :title="item.msgTitle" :msgTow="item.createTime" @click="to_messageContent(item)" :msgDiscount="item.msgBody"></gridRowItem>
    </div>
</template>
<script>
import gridRowItem from '@/components/extend/gridRowItem';
export default {
    components : {
        gridRowItem
    },
    data () {
        return {
            listnotice : [],
            loadMessageParam : {
                pageNo : 1,
                pageSize : 20
            }
        }
    },
    methods : {
        loadingSysMessage(custNo){
            this.$api.get("getMsg",this.loadMessageParam).then((data) => {
                this.listnotice = data.list;
            });
        },
        to_messageContent(item){
            let param = {};
            param["title"] = item.msgTitle;
            param['content'] = item.msgBody;
            param['date'] = item.createTime;
            this.$router.push({name:'msgContentview',params:param});
            this.readMsg(item)
        },
        readMsg(item){
            if(item.msgStatus=='1'){
                this.$api.get("readMsg",{msgId:item.tableKey,msgStatus:'0'})
            }
        },
    },
    mounted() {
        this.loadingSysMessage();
    } 
}
</script>
