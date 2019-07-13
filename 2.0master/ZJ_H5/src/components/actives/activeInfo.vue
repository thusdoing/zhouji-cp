<style scoped>
@import '../../assets/header.css';
.active-banner img{height: 150px;width: 100%;margin: auto;line-height: 0px;}
.active-item{margin: 1px auto;}
.active-item>>>.el-card__body{text-align: right;padding: 10px;display: flex;font-size: 10px;color: #c9c9c9;align-items: center;}
.active-item img{width: 45px;height: 45px;float: left;}
.active-item-small-info{margin-left: 10px;flex: 1;}
.active-item-name{font-size: 14px;color: #5E5E5E;display: flex;}
.active-item-info{color: #9b9b9b;font-size: 10px;display: flex;}
</style>
<template>
    <div>
        <wv-header title="发现" class="header" ></wv-header>
        <el-main class="index-main">
            <!-- <el-row class="active-banner" style="height:150px;">
                <img src="http://10.10.15.208/images/5fe1f1ce-f8c6-43ca-ae55-59ea125cca2c.png" />
            </el-row> -->
            <el-row>
                <!-- <el-col :span="24" class="active-item">
                    <div @click="to_page('activityview')">
                        <el-card  shadow="never">
                            <img src="/static/activity.png"/>
                            <div class="active-item-small-info">
                                <div class="active-item-name">
                                    <div>
                                        <span class="item-name">活动中心</span>
                                    </div>
                                    <div class="active-item-flag"></div>
                                </div>
                                <div class="active-item-info">
                                    <div>彩票活动进行中...</div>
                                </div>
                            </div>
                            <i class="el-icon-arrow-right"></i>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="24" class="active-item">
                    <div @click="to_page('newsview')">
                        <el-card shadow="never">
                            <img src="/static/news.png"/>
                            <div class="active-item-small-info">
                                <div class="active-item-name">
                                    <div>
                                        <span class="item-name">新闻</span>
                                    </div>
                                    <div class="active-item-flag"></div>
                                </div>
                                <div class="active-item-info">
                                    <div>彩票动态实时查询</div>
                                </div>
                            </div>
                            <i class="el-icon-arrow-right"></i>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="24" class="active-item">
                    <div @click="to_page('gameIntroduce')">
                        <el-card shadow="never">
                            <img src="/static/gameRules.png"/>
                            <div class="active-item-small-info">
                                <div class="active-item-name">
                                    <div>
                                        <span class="item-name">玩法介绍</span>
                                    </div>
                                    <div class="active-item-flag"></div>
                                </div>
                                <div class="active-item-info">
                                    <div>各种彩种玩法详细解说</div>
                                </div>
                            </div>
                            <i class="el-icon-arrow-right"></i>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="24" class="active-item">
                    <div @click="to_page('trendChart')">
                        <el-card shadow="never">
                            <img src="/static/trend.png"/>
                            <div class="active-item-small-info">
                                <div class="active-item-name">
                                    <div>
                                        <span class="item-name">走势图</span>
                                    </div>
                                    <div class="active-item-flag"></div>
                                </div>
                                <div class="active-item-info">
                                    <div>每期开奖号码记录</div>
                                </div>
                            </div>
                            <i class="el-icon-arrow-right"></i>
                        </el-card>
                    </div>
                </el-col> -->
                <el-col :span="24" class="active-item">
                    <el-card shadow="never" >
                        <img src="/static/flat.png"/>
                        <div class="active-item-small-info" @click="sleAI">
                            <div class="active-item-name">
                                <div>
                                    <span class="item-name">手机客户端下载</span>
                                </div>
                                <div class="active-item-flag"></div>
                            </div>
                            <div class="active-item-info">
                                <div>手机便捷下注</div>
                            </div>
                        </div>
                        <i class="el-icon-arrow-right"></i>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
        <wv-tabbar :fixed="true" class="footers">
            <wv-tabbar-item @click="to_page('home')" >
                <i class="iconfont icon-shouye" slot="icon"></i>
                首页
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('openLotteryList')">
                <i class="iconfont icon-1672jiang" slot="icon"></i>
                开奖
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('activeInfo')" is-on>
                <i class="iconfont icon-faxian" slot="icon"></i>
                发现
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custService')">
                <i class="iconfont icon-lianxikefu" slot="icon"></i>
                客服
            </wv-tabbar-item>
            <wv-tabbar-item @click="to_page('custInfos')">
                <i class="iconfont icon-wode" slot="icon"></i>
                我的
            </wv-tabbar-item>
        </wv-tabbar>
        <wv-popup :visible.sync="sio">
            <wv-group>
                <a style="color: #333" @click='dowand'><wv-cell title="安卓下载" value="点击下载" is-link/></a>
                <a style="color: #333" @click='dowios'><wv-cell title="苹果下载" value="点击下载" is-link/></a>
            </wv-group>
        </wv-popup>
    </div>
</template>
<script>
export default {
    data () {
        return {
            shows:"activeInfo",
            sio:false,
            and:'',
            ios:''
        }
    },
    created() {
        this.getHomeConfig()
    },
    methods: {
        dowios(){
            if(this.ios){
                window.open(this.ios)
            }else{
                this.$dialog({title: '系统提示',message: 'App正在升级维护，敬请期待。。。',skin: 'ios'})
            }
        },
        
        dowand(){
            if(this.and){
                window.open(this.and)
            }else{
                this.$dialog({title: '系统提示',message: 'App正在升级维护，敬请期待。。。',skin: 'ios'})
            }
        },
        to_page(active){
            this.$router.push({name:active});
        },
        sleAI(){
            this.sio=true
        },
        getHomeConfig() {
            if (sessionStorage.homeUrlObj) {
                this.homeUrlObj = JSON.parse(sessionStorage.homeUrlObj)
                return
            }
            this.$http({
                method: 'get',
                url: '/getHomeConfig',
            }).then(res => {
                if (res.data.success) {
                    this.and = res.data.list.find(el => { return el.codeKey == 'qrCodeUrl_android' }).codeValue || location.origin
                    this.ios = res.data.list.find(el => { return el.codeKey == 'qrCodeUrl_ios' }).codeValue || ""
                }
            });

        },
    }
}
</script>