<style lang='less'>

</style>
<template>
    <div>
        <div v-if='current==null' class="container">
            <p class="_1LCMk">您的位置 :<span class="fw6">优惠活动</span></p>
            <ul>
                <li v-if='getData.length==0'>
                    <h1 class="_3qY80 ellipsis" style="height: 200px;line-height: 200px;text-align: center">暂无活动</h1>
                </li>
                <li v-for='(item,index) in getData' :key="index">
                    <div class="_2mUPN cf">
                        <div class="_3ffUJ" :style="'background-image: url('+item.activityPicture+');'">
                            <img class="_3pzDX" :src="$imgPath(item.activityPicture)">
                        </div>
                        <div class="overflow-hidden">
                            <h1 class="_3qY80 ellipsis">{{item.activityName}}</h1>
                            <p class="_3-UQM">{{item.activityTitle}}</p>
                            <button class="_3NPSs" @click="current = index">了解详情</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if='current!=null' class="container">
            <div>
                <div>
                    <aside class="_4q-OG">
                        <h2 class="vfRlk">优惠活动</h2>
                        <ul>
                            <li v-for='(item,index) in getData' @click="current = index" :key="'a'+index" :class="index==current? '_1SVoE _2wf24': '_1SVoE'">
                                <p class="_24zRE">{{item.activityName}}</p>
                            </li>
                        </ul>
                    </aside>
                    <article class="overflow-hidden">
                        <p class="_2e5ip">您的位置 : 优惠活动 &gt;<span class="_2wf24">{{getData[current].activityName}}</span></p>
                        <div class="_2SfUd _1ptXe cf">
                            <div class="ql-editor" v-html="getData[current].activityContentPicture">
                            </div>
                            <div class="FleBv"></div>
                            <div class="mt30 mb10 tc">
                                <button class="_3NPSs undefined" type="button" @click="current = null">返回</button>
                                <div v-if="getData[current].hadJoin" class="dib"><button class="_3NPSs TcGXd" type="button">已参加</button></div>
                                <div v-if="$store.state.userInfo.custName && !getData[current].hadJoin" class="dib"><button @click="joinInActivity(getData[current].activityId)" class="_3NPSs _2b8Of" type="button">立即参加</button></div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vueQR from 'vue-qr';
    import headerBet from '@/views/betHeader/index.vue'
    import '../../assets/css/quill/quill.core.css'
    import '../../assets/css/quill/quill.snow.css'
    import '../../assets/css/quill/quill.bubble.css'
    import axios from 'axios'
    export default {
        data() {
            return {
                getData: [],
                arr: null,
                flag: true,
                url: 'http://www.lm699.com',
                current: null,
            }
        },
        components: {
            headerBet,
            vueQR
        },
        created() {
            this.getActivity()
        },
        watch: {},
        methods: {
            getActivity() {
                let _this = this;
                axios.get('/activity/getActivity').then(function(data) {
                    if (data.data.success) {
                        if (data.data.list != null && data.data.list != undefined) {
                            _this.getData = data.data.list
                        }
                    }
                });
            },
            joinInActivity(id) {
                axios.post('/activity/joinIn', {
                    activityId: id
                }).then((data) => {
                    if (data.data.success) {
                        this.$Modal.success({
                            title: '系统提示',
                            content: '活动参加成功'
                        })
                    } else {
                        this.$Modal.error({
                            title: '系统提示',
                            content: data.data.msg,
                        })
                    }
                });
            },
        },
    }
</script>
