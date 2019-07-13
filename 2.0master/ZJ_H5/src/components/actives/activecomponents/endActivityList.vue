<template>
    <div>
        <imgRowItem v-for="(item,index) in listnotice" :key="index" :title="item.title" :imgUrl="item.imgUrl" :flag="item.flag" path="/dsjflksdjfl"></imgRowItem>
    </div>
</template>
<script>
import imgRowItem from '@/components/extend/imgRowItem';
export default {
    components : {
        imgRowItem
    },
    data () {
        return {
            listnotice : [
                    {title:"XXXX活动",imgUrl:'http://192.168.0.174/images/5fe1f1ce-f8c6-43ca-ae55-59ea125cca2c.png',flag:true},
                    {title:"XXXX活动",imgUrl:'http://192.168.0.174/images/5fe1f1ce-f8c6-43ca-ae55-59ea125cca2c.png',flag:true},
                    {title:"XXXX活动",imgUrl:'http://192.168.0.174/images/5fe1f1ce-f8c6-43ca-ae55-59ea125cca2c.png',flag:true}
                ]
        }
    } 
}
</script>

