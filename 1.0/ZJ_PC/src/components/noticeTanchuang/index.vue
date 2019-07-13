<template>
  <div v-if="isShowNotice">
    <div
      tabindex="0"
      style="opacity: 0.7; background: rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; user-select: none; z-index: 1000;"
      class="ui-popup-backdrop"
    ></div>
    <div class="ui-popup ui-popup-modal ui-popup-show ui-popup-focus notice">
      <div class="ui-dialog dialog-notice" style="display:block">
        <div class="ui-dialog-arrow-a"></div>
        <div class="ui-dialog-arrow-b"></div>
        <table class="ui-dialog-grid" style="width:100%">
          <tbody>
            <tr>
              <td class="ui-dialog-header">
                <button class="ui-dialog-close" title="取消" @click="isShowNotice=false">×</button>
                <div class="ui-dialog-title" id="title:tpl-message">平台公告</div>
              </td>
            </tr>
            <tr>
              <td class="ui-dialog-body">
                <div class="ui-dialog-content" style="width: 100%;">
                  <div id="DIALOG-VM" style="display: block;">
                    <div id="notice_pop_frame">
                      <div>
                        <div class="side_left">
                          <div class="side_item" v-for="(item,index) in list" :key="index">
                            <a
                              href="javascript:;"
                              @click="activeIndex=index"
                              :class="activeIndex==index?'active':''"
                            >
                              <span>{{item.title}}</span>
                            </a>
                          </div>
                        </div>
                        <div class="notice_main">
                          <div class="notice_title">
                            <h1>{{htmlTitle[activeIndex]}}</h1>
                          </div>
                          <div class="notice_text">
                            <div
                              class="fleft notice_item"
                              style="text-align:left;word-break:break-all;"
                              v-html="htmlContent[activeIndex]"
                            ></div>
                            <div class="fright">
                              <span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="ui-dialog-footer">
                <div  class="ui-dialog-statusbar" style="display: none;"></div>
                <div  class="ui-dialog-button">
                  <button type="button"  class="ui-dialog-autofocus" @click="hideOneMin">1分钟内不再提示</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
@import "./index.css";
.notice {
  position: fixed;
  width: 1000px;
  height: auto;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 300ms linear;
}
</style>
<script>
  export default {
    data() {
      return {
        list: [],
        activeIndex: 0,
        isShowNotice: false,
        htmlContent: [],
        htmlTitle: []
      };
    },
    methods: {
      getPopupNotice() {
        let that = this;
        let timeOld=sessionStorage.getItem("timeNow") || 0
        let timeNow=new Date().getTime()
        
        if(timeNow-timeOld>60000){
         sessionStorage.clear("timeNow")
         this.$http.get("/getPopupNotice").then(function(data) {          
          if (data.data.list != null && data.data.list != undefined) {
            that.list = data.data.list;
            that.list.forEach((m, k) => {
              console.log(m, k);
              that.htmlContent[k] = m.content;
              that.htmlTitle[k] = m.title;
              that.isShowNotice = true;
            });
          } else {
            that.isShowNotice = false;
          }
        });
        }
        
      },
      hideOneMin(){        
        let timeNow=new Date().getTime()
        sessionStorage.setItem("timeNow",timeNow)
        this.isShowNotice = false;
      }
    },
    created() {     
      this.getPopupNotice();
    }
  };
</script>
