<template>
    <div class="container" style="padding-top: 30px">
        <div v-for="(item,index) in gameMenuData" :key="item.ganmeType" style="padding-top: 20px">
            <h1 class="listtitile"><span>{{item.gameTypeName}}</span><label style="float: right;margin-top: -20px;color: #e11616;
                cursor: pointer;margin-right: 10px;" @click="showmore(index)" ref="moretext" >更多</label></h1>
            <div ref="more" style="overflow: hidden;transition: all 2s;"  class="heightshow350">
                
                <div v-for="item2 in item.gameSetting" :key="item2.gameNo" class="hbr-item" style="border: 1px solid #ddd;
                 width: 230px;margin: 15px 10px 5px;float: left;padding: 28px 0;text-align: center">
                    <h5 class="hbr-name" style="margin-bottom: 20px">
                        <span style="font-size: 24px;font-weight: normal;color: #e11616;cursor: pointer">{{item2.gameName}}</span>
                    </h5>
                    <div class="hbr-term" style="color: rgb(153, 153, 153);font-size: 14px;line-height: 28px">
                        <em style="font-style:normal ">第 <span style="color: #d04d06">{{item2.openGameNumber}}</span>
                            期
                        </em>
                    </div>
                    <div class="hbr-total" style="margin: 8px 0;line-height: 28px;color: rgb(153, 153, 153);font-size: 15px;">
                        开奖号码：
                        <p class="clearfix" style="margin: 25px 0">
                            <em v-for="item3 in item2.openNo.split(',')" style="font-weight: 400;font-style: normal;background-color:#f23f4b;color:#fff;font-size:18px;padding:4px 8px;border-radius:3px;margin-left:5px;">{{item3}}</em>
                            
                        </p>
                    </div>
                    <ul class="hbr-info" style="overflow: hidden;margin: 0px 0px 20px;line-height: 24px;color: rgb(153, 153, 153);font-size: 14px;">
                        <li style="float: left;width: 48%;">和值：<span class="text-orange">0</span></li>
                        <li style="float: left;width: 48%;">形态：<span class="text-orange">--</span><span class="text-orange">--</span></li>
                    </ul>
                    <a class="hbr-bidding ohh" href="http://k3cpp.com/index.php/common/index/game?lottery_type=jsold"> <i></i><span>立即购买</span></a>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                gameMenuData:[]
            }
        },
        created(){
            this.getGameAll()
        },
        methods:{
            showmore(i){
                if(this.$refs.more[i].className.length>0){
                    this.$refs.more[i].className = ""
                    this.$refs.moretext[i].innerText = "收起"
                }else{
                    this.$refs.more[i].className = "heightshow350"
                    this.$refs.moretext[i].innerText = "更多"
                }
                
            },
            getGameAll(){
                let _this = this;
                this.$http.get('/getGameAll',{params:{isOpenNo:'true'}}).then(function(data){
                    if(data.data.success){
                        if(data.data.list != null && data.data.list != undefined){
                            _this.gameMenuData = data.data.list
                        }else{
                            _this.gameMenuData = [];
                        }
                    }
                });
            },
        }
    }
</script>

<style lang="less">
.listtitile{
    border-bottom: 3px solid #e11616;
    span {
        font-size: 16px;
        display: block;
        width:116px;
        height: 36px;
        color: #ffffff;
        font-size: 16px;
        letter-spacing: 10px;
        line-height: 36px;
        text-align: center;
        text-indent: 10px;
        background: #e11616;
        border-radius: 8px 8px 0 0;
    }
}
#user-base .image, #user-base .image img { display: block; width: 24px; height: 24px; overflow: hidden; }
#user-base .image { padding: 2px;  width: 24px;float:left}
#user-base {  height: 32px; line-height: 32px; left: 0px; top: 0px; }
.fll{float:left;margin-left:10px;}
.flr{float:right;margin-right:10px;}
.tj_hy{margin-right:10px;margin-top:2px;font-size:13px; }
.tj_hy em{color:rgb(220,0,0);}
.user-recharge span,.user-recharge label{margin-left:10px;font-size:14px;}
.user-recharge span a {border:1px solid #ddd;border-radius:2px;height:30px;line-height:28px}
.hb-slide { position: relative; z-index: 1; float: left; width: 206px; height: 355px; }
.hb-slide::before { content: ""; position: absolute; top: 0px; right: -4px; width: 0px; height: 0px; border-style: solid; border-width: 4px 0px 0px 4px; border-color: transparent transparent transparent rgb(185, 84, 43); }
.hb-slide::after { content: ""; position: absolute; bottom: 0px; right: -4px; width: 0px; height: 0px; border-style: solid; border-width: 4px 4px 0px 0px; border-color: rgb(185, 84, 43) transparent transparent; }
.hbs-name { margin: 20px 20px 4px; color: rgb(255, 255, 255); font-size: 28px; line-height: 40px; }
.hbs-expl { height: 72px; margin: 0px 20px; color: rgb(255, 255, 255); line-height: 24px; }
.hbs-link { display: block; margin: 0px 0px 12px; font-size: 0px; line-height: 0; }
.hbs-link:hover { text-decoration: none; }
.hbs-link span { display: inline-block; width: 103px; height: 36px; margin: 0px 0px 0px 15px; border-radius: 5px 0px 0px 5px; border-right: 1px solid rgb(238, 238, 238); padding: 0px 0px 0px 33px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; line-height: 36px; font-size: 16px; color: rgb(255, 116, 60); vertical-align: middle; }
.hbs-link:hover i { background-position: -8px -300px; }
.hb-right { position: relative; z-index: 0; float: left; height: 345px; width: 758px; margin: 4px 0px 0px; border-width: 1px 1px 1px 0px; border-style: solid; border-color:#ddd; -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none; background: rgb(255, 255, 255) none repeat scroll 0% 0%; text-align: center; }
.hb-right .issue{color:#d04d06;}
.hbr-name {margin: 0px 0px 20px;font-size: 24px;color: rgb(51, 51, 51);}
.hbr-rate { position: relative; display: inline-block; font-family: Arial,"Microsoft Yahei"; white-space: nowrap; }
.hbr-term { line-height: 28px; color: rgb(153, 153, 153); font-size: 16px; }
.hbr-bidding { position: relative; display: block; width: 168px; height: 38px; margin: 0px auto; border-radius: 3px; border: 1px solid rgb(255, 133, 14); line-height: 38px; font-size: 14px; color: rgb(255, 133, 14); }
.hbr-bidding.off { border: 1px solid #3ab7bc; color: #3ab7bc; }
.hbr-bidding.ogg { border: 1px solid #28d258; color: #28d258; }
.hbr-bidding.ohh {border: 1px solid #e11616;color: #e11616;}
.hbr-bidding:hover { text-decoration: none; color: rgb(255, 255, 255); }
.hbr-bidding i { position: absolute; left: 0px; top: 0px; z-index: 0; height: 38px; width: 0px; border-radius: 3px; background: rgb(255, 133, 14) none repeat scroll 0% 0%; transition: all 0.2s ease 0s; }
.hbr-bidding.off i { background: #3ab7bc none repeat scroll 0% 0%; }
.hbr-bidding.ogg i { background: #28d258 none repeat scroll 0% 0%; }
.hbr-bidding.ohh i { background: #e11616 none repeat scroll 0% 0%; }
.hbr-bidding:hover i { width: 100%; }
.hbr-bidding span { position: relative; z-index: 1; }
.hbr-foot { border-top: 1px solid rgb(224, 224, 224); text-align: center; }
.hbr-more { line-height: 42px; }
.hbs-link-tips { visibility: hidden; position: absolute; left: 8px; right: 8px; bottom: 75px; border-radius: 5px; padding: 8px 7px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; transform: scale(0.85); transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s; opacity: 0; font-size: 12px; box-shadow: 0px -1px 8px rgba(0, 0, 0, 0.2); }
.hbs-link-tips i { position: absolute; left: 50%; bottom: -10px; border-color: rgb(255, 255, 255) transparent transparent; border-style: solid; border-width: 5px; font-size: 0px; line-height: 0; }

.hbr-rate-add { position: absolute; bottom: 4px; left: 100%; margin: 0px 0px 0px 4px; font-size: 18px; }
.hbr-rate-title { margin:20px 0px 30px 0px;color: rgb(153, 153, 153);font-size:14px;}
.hbr-rate-title em{background-color:rgb(255, 133, 14) ;color:#fff;font-size:20px;padding:12px 15px;border-radius:2px;margin-left:5px;}
.hbr-info { overflow: hidden; margin: 0px 0px 20px; }
.hbr-info li { float: left; width: 48%; line-height: 24px; color: rgb(153, 153, 153); font-size: 14px; }
.hbr-info li span { line-height: 30px; font-size: 16px; color: rgb(102, 102, 102); }
.hbr-info li span em { font-size: 22px; color: rgb(51, 51, 51); font-weight: 400; }
.hbr-info li span.text-orange  { color: rgb(255, 255, 255); background-color:rgb(255, 133, 14);padding:1px 4px;;margin-left:2px;border-radius:3px;}
.heightshow350{height: 353px;}
</style>