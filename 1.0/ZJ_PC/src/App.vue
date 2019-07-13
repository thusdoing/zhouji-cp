<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        components: {},
        data() { return { crypto: {} }; },
        websock: null,
        name: 'App',
        methods : {
            threadPoxi(){  // 实际调用的方法
                //参数
                const agentData = this.$store.state.userInfo.custNo;
                //若是ws开启状态
                if (this.websock.readyState === this.websock.OPEN) {
                    this.websocketsend(agentData)
                }
                // 若是 正在开启状态，则等待300毫秒
                else if (this.websock.readyState === this.websock.CONNECTING) {
                    let that = this;//保存当前对象this
                    setTimeout(function () {
                        that.websocketsend(agentData)
                    }, 300);
                }
                // 若未开启 ，则等待500毫秒
                else {
                    this.initWebSocket();
                    let that = this;//保存当前对象this
                    setTimeout(function () {
                        that.websocketsend(agentData)
                    }, 500);
                }
            },
            initWebSocket(){ //初始化weosocket
                //ws地址
                //const wsuri = "wss://" + window.location.host + "/webSocketServer";
                 let wsurl = "";
                if(window.location.protocol == 'http:') {
                    wsurl = "ws://" + window.location.host + "/webSocketServer";
                } else{
                    wsurl = "wss://" + window.location.host + "/webSocketServer";
                }
                this.websock = new WebSocket(wsurl);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;
                this.websock.onerror = (...args) => {}
                this.threadPoxi();
            },
            websocketonmessage(e){ //数据接收
                let obj = JSON.parse(e.data);
                if(obj.msgType == '4'){
                    localStorage.clear();
                    sessionStorage.clear();
                    this.$router.push('/');
                }
                if(obj.msgType == '1'||obj.msgType == '2'){
                    this.$Notice.destroy();
                    this.$Notice.success({
                        title: "系统提示",
                        desc:  obj.msgBody ? obj.msgBody : '',
                        duration: 5
                    });
                    this.$store.commit('yu_e')
                }
            },
            websocketsend(agentData){//数据发送
                this.websock.send(agentData);
            },
            websocketclose(e){  //关闭
            },
            keepalive(){
                this.websocketsend(agentData);
            }
        },
        computed:{
            setUserInfo:function(data){
                return this.$store.state.userInfo;
            }
        },
        watch:{
            crypto: {
                immediate: true,
                handler() {
                    if (this.crypto && !Object.keys(this.crypto).length) return;
                    const { modulus, exponent } = this.crypto;
                    this.$tools.fetch.registerRSA(exponent, modulus);
                }
            },
            // setUserInfo:function(a,b){
            //     if(a.custNo != undefined&&a.custNo!=null){
            //         if(this.websock!=""){
            //             this.initWebSocket();
            //         }
            //     }
            // }
        },
        mounted() {
        
        },
        created() {
            if (localStorage && localStorage.getItem('component.App')) {
                try {
                    this.crypto = (JSON.parse(localStorage.getItem(component.App)) || {}).crypto || {}
                } catch (error) {}
            }

            this.getCrypto = async() => {
                const rsp = await this.$tools.fetch('/api/crypto/getCrypto').get();
                if (!rsp.success) {
                    await this.$tools.delay(1000);
                    return this.getCrypto();
                }
                if (localStorage && localStorage.setItem) localStorage.setItem('component.App', JSON.stringify({crypto: rsp.data}));
                const { modulus, exponent } = rsp.data;
                this.crypto = { modulus, exponent };
            }

           this.getCrypto();
        }
    }
</script>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
</style>
