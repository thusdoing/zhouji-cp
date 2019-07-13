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
    <div id="leftscroller" class="fixed flag-show" :style="'z-index: 1001; top: 50%; transform: translateY(-50%) scale(1); transition: all 300ms linear; left:' +10+ 'px;'">
        <img src="/static_pc/images/float_left.gif">
        <a class="disb click1" @click="lxqq"></a>
        <a class="disb click2" @click="onlineKefu"></a>
        <a class="disb click3">
            <vueQR :text="url" :margin="10" style="height: 64px; width: 64px;margin: auto"></vueQR>
        </a>
        <a class="disb click4" @click="remove"></a>
    </div>
</template>

<script>

    import vueQR from 'vue-qr';
    export default {
        components: { vueQR },
        props: ['left'],
        data() {
            return {
                width: 131,
                lleft: 230,
            }
        },
        computed:{
            qqKeFu:function(){
                return this.$store.state.homeUrlObj.qqKeFu
            },
            url:function(){
                return this.$store.state.homeUrlObj.and||location.origin
            },
            KeFu:function(){
                return this.$store.state.homeUrlObj.KeFu
            },
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
            },
            onlineKefu(){
                if (!this.KeFu) {
                    return
                }
                window.open(this.KeFu, "", 'width=620,height=555')
                
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
        height: 24px;
        width: 100%;
        top: 280px;
    }

    .click2 {
        height: 24px;
        width: 100%;
        top: 308px;
    }

    .click3 {
        height: 64px;
        width: 100%;
        top: 368px;
    }

    .click4 {
        height: 10px;
        width: 100%;
        top: 457px;
    }
</style>
