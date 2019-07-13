<template>
  <div id="app" style="height:100%" v-if="hasCrypto">
    <router-view/>
  </div>
</template>

<script>
  import {
    Component,
    Vue,
    Watch,
    State,
    createStorage
  } from 'core/decorators';
  const storage = createStorage('App', ['crypto'], []);
  export default {
    name: 'app',
    websock: null,
    storage,
    data() {
      return {
        crypto: {}
      };
    },
    methods: {
      async getCrypto() {
        const rsp = await this.$tools.fetch('/api/crypto/getCrypto').get();
        if (!rsp.success) {
          await this.$tools.delay(1000);
          return this.getCrypto();
          // if (await this.$vux.confirm({ content: rsp.message, title: '操作提示', confirmText: '重试', cancelText: '刷新' })) {
          //   return this.getCrypto();
          // } else {
          //   window.location.reload(true);
          // }
          // return;
        }
        const {
          modulus,
          exponent
        } = rsp.data;
        this.crypto = {
          modulus,
          exponent
        };
      },
      threadPoxi() { // 实际调用的方法
        //参数
        const agentData = this.$store.state.sessionUser.custNo;
        //若是ws开启状态
        if (this.websock.readyState === this.websock.OPEN) {
          this.websocketsend(agentData)
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING) {
          let that = this; //保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
          this.initWebSocket();
          let that = this; //保存当前对象this
          setTimeout(function () {
            that.websocketsend(agentData)
          }, 500);
        }
      },
      initWebSocket() { //初始化weosocket
        //ws地址
        //const wsuri = "wss://" + window.location.host + "/webSocketServer";
        let wsurl = "";
        if (window.location.protocol == 'http:') {
          wsurl = "ws://" + window.location.host + "/webSocketServer";
        } else {
          wsurl = "wss://" + window.location.host + "/webSocketServer";
        }
        this.websock = new WebSocket(wsurl);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        this.threadPoxi();
      },
      websocketonmessage(e) { //数据接收
        let obj = JSON.parse(e.data);
        if (obj.msgType == '4') {
          sessionStorage.custInfo == null;
          this.$router.push('/loginview');
        }
        if (obj.msgType == '1' || obj.msgType == '2') {
          this.$dialog({
            title: "系统提示",
            message: obj.msgBody,
            skin: 'ios'
          });
        }
      },
      websocketsend(agentData) { //数据发送
        this.websock.send(agentData);
      },
      websocketclose(e) { //关闭
      },
      keepalive() {
        this.websocketsend(agentData);
      },
      checkVersion() {
        let oldversion = window.version
        this.$api.get('/info2.json?' + Date.now()).then(data => {
          if (data.version == oldversion) return
          window.location.reload(true)
        })
      }
    },
    created() {
        this.crypto = { ...this.crypto };
        this.getCrypto().catch(() => {});   
        this.$watch('crypto', () => {
            if (!Object.keys(this.crypto).length) return;
                const { modulus, exponent } = this.crypto;
                this.$tools.fetch.registerRSA(exponent, modulus);
                if (document.getElementById('containerloading')) document.getElementById('containerloading').style.display = 'none';
        }, {immediate: true});
    },
    computed: {
      hasCrypto() {
        return Object.keys(this.crypto).length;
      },
      setUserInfo: function (data) {
        return this.$store.state.sessionUser;
      }
    },
    watch: {
      
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #efeff4;
  }

  .weui-dialog {
    left: 50% !important;
    top: 50% !important;
    right: unset !important;
    bottom: unset !important;
  }

  /* .vux-x-dialog > .weui-dialog {
    left: 0!important;
    top: 0!important;
    right: 0!important;
    bottom: 0!important;
    transform: none!important;
} */
  .weui-tabbar__item>i.iconfont {
    position: relative;
    top: -4px;
  }

  .el-main {
    font-size: 16px;
  }

</style>
