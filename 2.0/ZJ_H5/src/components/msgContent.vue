<style scoped>
@import '../assets/header.css';
</style>
<template>
    <div style="height:100%;background:#fff;">
        <div class="header custom-header">
            <wv-flex>
                <wv-flex-item class="custom-left">
                    <div @click="$router.go(-1)" class="brack-icon">
                        <i class="el-icon-arrow-left" slot="icon"></i>
                    </div>
                    <div class="w-20" slot="right"></div>
                </wv-flex-item>
                <wv-flex-item flex="2">
                    <div class="custom-center">
                        <div v-html="titles"></div>
                    </div>
                </wv-flex-item>
                <wv-flex-item>
                    <div class="custom-right"></div>
                </wv-flex-item>
            </wv-flex>
        </div>
        <div class="index-main" style="background:#fff;">
            <div v-html="contents"></div>
            <wv-flex>
                <wv-flex-item>
                    <div v-if="date != null" class="custom-right">发布时间：{{ $Date(date) }}</div>
                </wv-flex-item>
            </wv-flex>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            titles:'',
            contents : '',
            date : ''
        }
    },
    mounted() {
        this.titles = this.$route.params.title;
        this.contents = this.$route.params.content;
        this.date = this.$route.params.date;
    }
}
</script>

