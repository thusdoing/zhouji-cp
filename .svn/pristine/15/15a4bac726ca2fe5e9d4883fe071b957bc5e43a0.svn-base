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
        <a class="disb click1" @click="lxqq"></a>
        <p class="disb click9" @click="lxqq">QQ{{qqKeFu.match( new RegExp('uin=(.*?)&Site'))[1]}}</p>
        <a class="disb click2" @click="onlineKefu"></a>
        <a class="disb click3">
            <vueQR :text="urlIos" :margin="10" style="height: 90px; width: 90px;margin: auto"></vueQR>
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
            lxqq() {
                 if (!this.qqKeFu) {
                    return
                }
                window.open(this.qqKeFu)
            },
            urlAnd:function(){
                return this.$store.state.homeUrlObj.and||location.origin
            },
            urlIos:function(){
                return this.$store.state.homeUrlObj.ios||location.origin
            },
            onlineKefu() {
                if (!this.KeFu) {
                    return
                }
                window.open(this.KeFu, "", 'width=620,height=555')
            }
        },
        computed: {
            lleft: function () {
                return parseInt(this.left) + 1000 + 90;
            },
            KeFu: function(){
                return this.$store.state.homeUrlObj.KeFu
            },
            qqKeFu: function(){                  
                return this.$store.state.homeUrlObj.qqKeFu 
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