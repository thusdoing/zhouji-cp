<style scoped>
    /* .flag-show {
        display: none;
    }; */
   .fixed{
       position: fixed
    };
    @media only screen and (min-width: 1345px) {
        .flag-show {
            display: block;
        }
    }
</style>
<template>
    <div id="leftscroller" class="fixed flag-show" :style="'z-index: 1001; top: 50%; transform: translateY(-50%) scale(1); transition: all 300ms linear; left:' +10+ 'px;'">
        <img src="/static/piaofuanzhuo.png">
        <a class="disb click1" href="tencent://message/?uin=815883333&Site=在线客服&Menu=yes"></a>
        <a class="disb click2"></a>
        <a class="disb click3">
            <div  :margin="10" style="height: 91px; width: 91px;margin: auto">
                <img src="/static/anzhuo.jpg" alt="">
            </div>
        </a>
        <a class="disb click4" @click="remove"></a>
    </div>
</template>

<script>

    import vueQR from 'vue-qr';
    export default {
        components: { vueQR },
        // props: ['left'],
        data() {
            return {
                width: 131,
                lleft: 230,
                url:"http://123.com",
                qqKeFu:"12345"
            }
        },
        computed:{
            // qqKeFu:function(){
            //     return this.$store.state.homeUrlObj.qqKeFu
            // },
            // url:function(){
            //     return this.$store.state.homeUrlObj.and||location.origin
            // },
        },
        created() {

        },
        methods: {
            remove() {
                this.$el.style.display = 'none'
            },
            lxqq() {
                if (!this.qqKeFu) {
                    return
                }
                window.open(this.qqKeFu)
            }
        },
        mounted() {
        }
    }

</script>

<style>
    .disb {
        display: block;
        position: absolute;
    }

    .click1 {
        height: 37px;
        width: 100%;
        top: 25px;
    }

    .click2 {
        height: 37px;
        width: 100%;
        top: 70px;
    }

    .click3 {
        height: 104px;
        width: 100%;
        top: 124px;
    }

    .click4 {
        height: 26px;
        width: 100%;
        top: 280px;
    }
    img{
        width: 100%
    }
</style>
