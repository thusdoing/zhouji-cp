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
    <div id="rightscroller" class="fixed flag-show" :style="'z-index: 1001; top: 50%; transform: translateY(-50%) scale(1); transition: transform 300ms linear; right: '+10+'px;'">
        <img src="/static/piaofupingguo.png">
        <a class="disb click1"  href="tencent://message/?uin=815883333&Site=在线客服&Menu=yes"></a>
        <a class="disb click2" href="https://www.dwylz.com"></a>
        <a class="disb click3">
            <div :margin="10" style="height: auto; width: 91px;margin: auto">
                <img src="/static/ios.jpg" alt="">
            </div>
        </a>
        <a class="disb click4" @click="remove"></a>
    </div>
</template>

<script>
    import vueQR from 'vue-qr';
    export default {
        // props: ['left'],
        components: { vueQR },
        data() {
            return {
            }
        },
        methods: {
            remove() {
                this.$el.style.display = 'none'
            },
            onlikf() {
                if (!this.KeFu) {
                    return
                }
                window.open(this.KeFu, "", 'width=620,height=555')
            },
            onlijc() {
                if (!this.line) {
                    return
                }
                window.open(this.line)
            }
        },
        computed: {
            lleft: function () {
                return parseInt(this.left) + 1000 + 90;
            },
            KeFu: function(){
                return "234569"
            },
            line: function(){
                return "https://www.dwylz.com"
            },
            url:function(){
                return "http://1234589.com"
            },
        },
        mounted() {
        }
    }

</script>

<style>
</style>