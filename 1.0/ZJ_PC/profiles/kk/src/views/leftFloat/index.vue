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
        <img src="/static_pc/images/float_left.png">
        <!-- <a class="disb click1" @click="lxqq"></a>
        <a class="disb click2" @click="onlineKefu"></a> -->
        <a class="disb click3">
            <vueQR :text="urlIos" :margin="10" style="height: 100px; width: 100px;margin: auto"></vueQR>
        </a>
        <a class="disb click5">
            <vueQR :text="urlAnd" :margin="10" style="height: 100px; width: 100px;margin: auto"></vueQR>
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
            urlAnd:function(){
                return this.$store.state.homeUrlObj.and||location.origin
            },
            urlIos:function(){
                return this.$store.state.homeUrlObj.ios||location.origin
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
            width: 100%;
            height: 60px;       
            top: 128px;
    }

    .click2 {
        height: 35px;
        width: 100%;
        top: 203px;
    }

    .click3 {
        height: 100px;
        width: 100%;
        top: 173px;
    }
    .click5 {
        height: 100px;
        width: 100%;
        top: 306px;
    }

    .click4 {
        height: 37px;
        width: 37px;
        top:49px;
       left: 72%;
    }
    .click6 {
        height: 37px;
        width: 100%;
        top: 274px;
    }
    .click7 {
        height: 37px;
        width: 100%;
        top: 322px;
    }
    .click8 {
        height: 37px;
        width: 100%;
        top: 370px;
    }
    .click9{
        height: 24px;
        width: 100%;
        top: 241px;
        text-align: center;
        color: #FDE562;
    }
</style>
