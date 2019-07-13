<template>
  <div v-if="isShowNotice">
    <div
      tabindex="0"
      style="opacity: 0.7; background: rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; user-select: none; z-index: 1000;"
      class="ui-popup-backdrop">
    </div>
    <div class="pop_out">
      <div class="pop_content">
        <p>平台公告</p>
        <div class="close-btn">
          <img src="./photo_2019-07-06_14-42-25.jpg" alt="" @click="off">
        </div>
        <load-more v-if="loading" tip="正在加载..."></load-more>
        <group style="width:100%;background-color:#f4f5f7" v-for="(item,i) in list" :key="i">
          <cell :title="item.title" @click.native="showBox(i)"
          style="background-color:#f4f5f7;font-size:1.6rem;font-weight:bold;padding-left:1.5rem;width:100%;box-sizing: border-box;">
          <div slot="icon" style="display:block;margin-right:0.8rem;border-radius:50%;background:#ec2829;width:1rem;height:1rem;"></div>
          </cell>
          <template>
            <div v-if="item.open" class="contentbox">
              <p v-html="item.content" class="box-item"></p>
            </div>
            <div class="border"></div>
          </template>
        </group>
      </div>
      <div class="off-btn">
        <div class="ept-box">
          <img src="./jojo.png">        
        </div>
      </div>  
    </div>
  </div>
</template>
<style lang="less" scoped>
.pop_out /deep/ .weui-cells,.vux-no-group-title{
  margin-top:0;
}
.pop_content .close-btn{
  position: absolute;
  top:-0.5rem;
  right:-0.35rem;
  width:2.5rem;
  height: 2.5rem;
  >img{
    width: 100%;
    border-radius: 50%;
  }
}
.border{
  width: 90%;
  height: 1px;
  background-image: linear-gradient(to right, #bebfc1 0%, #bebfc1 75%, transparent 25%);
  background-size: 15px 1px;
  background-repeat: repeat-x;
  margin:0 auto;
}
.pop_out{
  width: 80%;
  position:absolute;
  z-index:2000;
  left:10%;
  top:15%;
  height:auto;
}
.pop_content{
  background: url("./pop_back.png") no-repeat;
  background-size: 101% auto;
  height:auto;
  min-height: 20rem;
  >p:first-child{
    color:#fff;
    text-align: center;
    font-size: 2rem;
    line-height: 6rem;
    height: 6rem;
    margin-bottom:1rem;
  }
}
div.off-btn{
  width:100%;
  position:relative;
}
div.ept-box{
  content:"";
  height:5rem;
  width:100%;
  background:#f4f5f7;
  border-radius:0 0 20px 20px;
  >img{
    float:right;
    margin-right:1rem;
    margin-bottom:1rem;
    width:5rem;
  }
}
.contentbox{
  background-color:#f4f5f7;
  padding-bottom:1rem;
  height:auto;
  word-break:break-word;
  position:relative;
  top:0;
  z-index:3000;
  >p.box-item{
    border:1px solid #bebfc1;
    width:85%;
    background-color:#fff;
    margin:0 auto;
    font-size:1.2rem!important;
    color:#000!important;
    word-break:break-word;
    padding:0.5rem;
    overflow:hidden;
    height:auto;
    img.rich-img{
      width:100%!important;
      height: auto!important;
    }
  }
}
</style>
<script>
import {Cell,Group,LoadMore} from 'vux'
export default {
  data(){
    return{
      isShowNotice:false,
      list:[],
      dateNow:0,
      loading:false
    }
  },
  methods:{
    off(){
      this.isShowNotice = false
      sessionStorage.setItem("timeSign",new Date().getTime())
    },
    async getPopUpInfo(){
      let that = this
      that.loading = true
      let data = await this.$tools.fetch("/getPopupNotice").get()
      that.loading = false
      if(data.success&&data.data.list.length>0){
        that.isShowNotice = true
        that.list = data.data.list
        that.list.forEach((item,i)=>{
          item.open = false
          item.content = item.content.replace(/\<img/gi,   '<img class="rich-img" ' );
        })
      }else{
        that.isShowNotice = false
      }
    },
    async getPopUpNotice(){
      this.dateNow = new Date().getTime()
      let dateSign = Number(sessionStorage.getItem("timeSign")) || 0
      if(this.dateNow-dateSign>60000){
        sessionStorage.clear("timeSign")
        this.getPopUpInfo()

      }else{
        this.isShowNotice = false
      }
    },
    showBox(i){
      this.list[i].open = !this.list[i].open
      this.$forceUpdate()
    }
  },
  computed:{
    
  },
  components:{
    Cell,Group
  },
  created(){
    this.getPopUpNotice()
  }
}
</script>


