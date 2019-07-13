<style scoped>
    .flag-show {
        display: none;
    }

    @media only screen and (min-width: 1345px) {
        .flag-show {
            display: block;
        }
    }
</style>
<template>
    <div id="rightscroller" class="fixed flag-show" :style="'z-index: 1001; top: 50%; transform: translateY(-50%) scale(1); transition: transform 300ms linear; right: '+10+'px;'">
        <img src="/static_pc/images/float_right.png">
        <a class="disb click1" @click="onlikf"></a>
        <a class="disb click2" @click="onlijc"></a>
        <a class="disb click3">
            <vueQR :text="url" :margin="10" style="height: 104px; width: 104px;margin: auto"></vueQR>
        </a>
        <a class="disb click4" @click="remove"></a>
    </div>
</template>

<script>
    import vueQR from 'vue-qr';
    export default {
        props: ['left'],
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
                return this.$store.state.homeUrlObj.KeFu
            },
            line: function(){
                return this.$store.state.homeUrlObj.line
            },
            url:function(){
                return this.$store.state.homeUrlObj.ios||location.origin
            },
        },
        mounted() {
        }
    }

</script>

<style>
</style>