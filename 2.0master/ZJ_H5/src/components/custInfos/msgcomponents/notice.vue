<template>
    <div>
        <gridRowItem v-for="(item,index) in noticeData" :item="item" :key="index" :title="item.noticeTitle" :msgTow="$Date(item.releaseDate)" :msgDiscount="item.noticeContent" @click="to_messageContent(item)"></gridRowItem>
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
            noticeData : [],
            loadNoticeParam : {
                pageNo : 1,
                pageSize : 20
            }
        }
    },
    methods : {
        loadlingNotice(){
            this.$api.get("getNotice",this.loadNoticeParam).then((data) => {
                if(data.success){
                    this.noticeData = data.list;
                }else{
                    this.$dialog({title: '提示信息',message: data.msg,skin: 'ios'});
                }
            });
        },
        to_messageContent(item){
            let param = {};
            param["title"] = item.noticeTitle;
            param['content'] = item.noticeContent;
            param['date'] = item.releaseDate;
            this.$router.push({name:'msgContentview',params:param});
        }
    },
    mounted() {
        this.loadlingNotice();
    } 
}
</script>

