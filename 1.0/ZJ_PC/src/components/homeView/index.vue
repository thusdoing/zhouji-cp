<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col mr10 _2rkm8" style="width: 240px; height: 580px;"></div>
                <div class="col mt10 _2rkm8" style="width: 750px; height: 250px;">
                    <div class="_1U-nD h-100">
                        <swiper v-if="bannerList.length>0" :options="swiperOption" ref="mySwiper">
                            <!-- slides -->
                            <swiper-slide v-for="(item,index) in bannerList" :key="index">
                                <a v-if="item.url" :href="item.url" target="_black">
                                    <img class="pointer" :src="$imgPath(item.imgPath)">
                                </a>
                                <img v-else class="pointer" :src="$imgPath(item.imgPath)">
                            </swiper-slide>
                            <!-- Optional controls -->
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </div>
                </div>
                <div class="col mt10" style="width: 750px; height: 40px;">
                    <div class="_1Nh4P">
                        <div class="_3TYe_">
                            <img class="w-auto" src="/static_pc/images/75572855de1e63b990afca30b61c395f.png" height="40">
                            <span class="_3thax">最新公告</span>
                        </div>
                        <div class="_120LF">
                            <div class="_15fFJ">
                                <!-- <marquee class="_2jjg7 _2_oM1" :style="`padding-left: 633px; animation-duration: ${10 * (getNoticeList.length || 1)}s;`"> -->
                                <marquee >
                                    <span class="_2gGRV" v-for="(item,index) in getNoticeList" :key="index" v-text="item.noticeContent"></span>
                                    <!-- <span class="_2gGRV" v-for="(item,index) in getNoticeList" :key="index + 10" v-text="item.noticeContent"></span> -->
                                    <!-- <span class="_2gGRV" v-for="(item,index) in getNoticeList" :key="index + 20" v-text="item.noticeContent"></span> -->
                                </marquee>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col mt10 mr10" style="width: 495px; height: 265px;">
                    <Tabs :animated="false" @on-click="ffk3" v-if="cathectic.length>0">

                        <TabPane :label="cathectic[0].gameName" :name="cathectic[0].gameNo">
                            <div v-if="nextT == null">
                                    <h1 style="line-height: 230px;text-align: center">彩种已停售...请耐心等待开盘</h1>
                            </div>
                            <div v-else class="_3lEaO">
                                <div class="cf">
                                    <div class="fr">
                                        <button class="_2N-6F gLbfS mr4" type="button" @click="gotobet(cathectic[0])">手动选号</button>
                                        <button class="_2N-6F gLbfS" type="button" @click="onOpenQST(cathectic[0].gameNo)">走势图</button>
                                    </div>
                                    <div class="_2g9N- overflow-hidden" v-if="nextOpen!=null">
                                        <p class="fl">第
                                            <span class="_3hVrp ph5">{{nextOpen}}</span>期截止：
                                        </p>
                                        <p class="_2g9N- v-mid" v-html="stopDate"></p>
                                    </div>
                                    <div class="_2g9N- overflow-hidden" v-else>
                                        <p class="fl">当前彩票暂停销售</p>
                                    </div>
                                </div>
                                <div class="_36MYR">
                                    <div style="min-height: 102px;">
                                        <p class="pv13">和值</p>
                                        <div class="pb15">
                                            <span :class="[('_2oYSo'),('_'+changeYardFt[0]+'sz')]" style="background-image: url(../../../static_pc/images/saizi/bigS0.png);"></span>
                                            <span class="xyBT4">+</span>
                                            <span :class="[('_2oYSo'),('_'+changeYardFt[1]+'sz')]" style="background-image: url(../../../static_pc/images/saizi/bigS0.png);"></span>
                                            <span class="xyBT4">+</span>
                                            <span :class="[('_2oYSo'),('_'+changeYardFt[2]+'sz')]" style="background-image: url(../../../static_pc/images/saizi/bigS0.png);"></span>
                                            <span class="xyBT4">=</span>
                                            <span class="x2CVt">
                            {{changeYardFt[0]+changeYardFt[1]+changeYardFt[2]}}
                          </span>
                                        </div>
                                    </div>
                                    <div class="f6 pb10">
                                        <button class="_2N-6F _3jnQW" type="button" @click="subtraction">
                          <img src="/static_pc/images/subtract.svg" class="absolute center-margin"
                            width="10" height="10">
                        </button>
                                        <input type="number" max="1000000" class="_3J8Dp" :value="bet">
                                        <button class="_2N-6F _3jnQW" type="button" @click="add">
                          <img src="/static_pc/images/add.svg" class="absolute center-margin"
                            width="10" height="10">
                        </button>
                                        <p class="dib v-mid ml10">倍, 共
                                            <span class="_3hVrp ph3">{{result}}</span>元</p>
                                    </div>
                                </div>
                                <div class="tc mt10">
                                    <button class="_2N-6F _35qE8 mr20" type="button" @click="changeYard('ft',3)">
                        <img src="/static_pc/images/29324fbdbf09da21e86803c26dbdf884.svg" class="mr10"
                          width="21" height="20">
                        <span class="v-mid">换一注</span>
                      </button>
                                    <button class="_2N-6F _35qE8 _1o49v" type="button" @click="onFTBet">立即投注</button>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane :label="cathectic[1].gameName" :name="cathectic[1].gameNo">
                            <div v-if="nextT == null">
                                <h1 style="line-height: 230px;text-align: center">彩种已停售...请耐心等待开盘</h1>
                            </div>
                            <div v-else class="_3lEaO">
                                <div class="cf">
                                    <div class="fr">
                                        <button class="_2N-6F gLbfS mr4" type="button" @click="gotobet(cathectic[1])">手动选号</button>
                                        <button class="_2N-6F gLbfS" type="button" @click="onOpenQST(cathectic[1].gameNo)">走势图</button>
                                    </div>
                                    <div class="_2g9N- overflow-hidden" v-if="nextOpen != null">
                                        <p class="fl">
                                            第<span class="_3hVrp ph5">{{nextOpen}}</span>期截止：
                                        </p>
                                        <p class="_2g9N- v-mid" v-html="stopDate"></p>
                                    </div>
                                    <div class="_2g9N- overflow-hidden" v-else>
                                        <p class="fl">当前彩票暂停销售</p>
                                    </div>
                                </div>
                                <div class="_36MYR">
                                    <div style="min-height: 102px;">
                                        <p class="pv13">五星直选</p>
                                        <div class="pb15">
                                            <span class="_31zSF" v-for="(item,index) in changeYardSsc" :key="index" v-text="item"></span>
                                        </div>
                                    </div>
                                    <div class="f6 pb10">
                                        <button class="_2N-6F _3jnQW" type="button" @click="subtraction">
                          <img src="/static_pc/images/subtract.svg" class="absolute center-margin"
                            width="10" height="10">
                        </button>
                                        <input type="number" max="1000000" class="_3J8Dp" :value="bet">
                                        <button class="_2N-6F _3jnQW" type="button" @click="add">
                          <img src="/static_pc/images/add.svg" class="absolute center-margin"
                            width="10" height="10">
                        </button>
                                        <p class="dib v-mid ml10">倍, 共
                                            <span class="_3hVrp ph3">{{result}}</span>元</p>
                                    </div>
                                </div>
                                <div class="tc mt10">
                                    <button class="_2N-6F _35qE8 mr20" type="button" @click="changeYard('ssc',5)">
                        <img src="/static_pc/images/29324fbdbf09da21e86803c26dbdf884.svg" class="mr10"
                          width="21" height="20">
                        <span class="v-mid">换一注</span>
                      </button>
                                    <button class="_2N-6F _35qE8 _1o49v" type="button" @click="sscOnBet">立即投注</button>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane :label="cathectic[2].gameName" :name="cathectic[2].gameNo">
                                <div v-if="nextT == null">
                                        <h1 style="line-height: 230px;text-align: center">彩种已停售...请耐心等待开盘</h1>
                                </div>
                                <div v-else class="_3lEaO">
                                    <div class="cf">
                                        <div class="fr">
                                            <button class="_2N-6F gLbfS mr4" type="button" @click="gotobet(cathectic[2])">手动选号</button>
                                            <button class="_2N-6F gLbfS" type="button" @click="onOpenQST(cathectic[2].gameNo)">走势图</button>
                                        </div>
                                        <div class="_2g9N- overflow-hidden" v-if="nextOpen!=null">
                                            <p class="fl">第
                                                <span class="_3hVrp ph5">{{nextOpen}}</span>期截止：
                                            </p>
                                            <p class="_2g9N- v-mid" v-html="stopDate"></p>
                                        </div>
                                        <div class="_2g9N- overflow-hidden" v-else>
                                            <p class="fl">当前彩票暂停销售</p>
                                        </div>
                                    </div>
                                    <div class="_36MYR">
                                        <div style="min-height: 102px;">
                                            <p class="pv13">和值</p>
                                            <div class="pb15">
                                                <span :class="[('_2oYSo'),('_'+changeYardFt[0]+'sz')]" style="background-image: url(../../../static_pc/images/saizi/bigS0.png);"></span>
                                                <span class="xyBT4">+</span>
                                                <span :class="[('_2oYSo'),('_'+changeYardFt[1]+'sz')]" style="background-image: url(../../../static_pc/images/saizi/bigS0.png);"></span>
                                                <span class="xyBT4">+</span>
                                                <span :class="[('_2oYSo'),('_'+changeYardFt[2]+'sz')]" style="background-image: url(../../../static_pc/images/saizi/bigS0.png);"></span>
                                                <span class="xyBT4">=</span>
                                                <span class="x2CVt">
                                {{changeYardFt[0]+changeYardFt[1]+changeYardFt[2]}}
                              </span>
                                            </div>
                                        </div>
                                        <div class="f6 pb10">
                                            <button class="_2N-6F _3jnQW" type="button" @click="subtraction">
                              <img src="/static_pc/images/subtract.svg" class="absolute center-margin"
                                width="10" height="10">
                            </button>
                                            <input type="number" max="1000000" class="_3J8Dp" :value="bet">
                                            <button class="_2N-6F _3jnQW" type="button" @click="add">
                              <img src="/static_pc/images/add.svg" class="absolute center-margin"
                                width="10" height="10">
                            </button>
                                            <p class="dib v-mid ml10">倍, 共
                                                <span class="_3hVrp ph3">{{result}}</span>元</p>
                                        </div>
                                    </div>
                                    <div class="tc mt10">
                                        <button class="_2N-6F _35qE8 mr20" type="button" @click="changeYard('ft',3)">
                            <img src="/static_pc/images/29324fbdbf09da21e86803c26dbdf884.svg" class="mr10"
                              width="21" height="20">
                            <span class="v-mid">换一注</span>
                          </button>
                                        <button class="_2N-6F _35qE8 _1o49v" type="button" @click="jsks">立即投注</button>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane :label="cathectic[3].gameName" :name="cathectic[3].gameNo">
                                    <div v-if="nextT == null">
                                        <h1 style="line-height: 230px;text-align: center">彩种已停售...请耐心等待开盘</h1>
                                    </div>
                                    <div v-else class="_3lEaO">
                                        <div class="cf">
                                            <div class="fr">
                                                <button class="_2N-6F gLbfS mr4" type="button" @click="gotobet(cathectic[3])">手动选号</button>
                                                <button class="_2N-6F gLbfS" type="button" @click="onOpenQST(cathectic[3].gameNo)">走势图</button>
                                            </div>
                                            <div class="_2g9N- overflow-hidden" v-if="nextOpen != null">
                                                <p class="fl">
                                                    第<span class="_3hVrp ph5">{{nextOpen}}</span>期截止：
                                                </p>
                                                <p class="_2g9N- v-mid" v-html="stopDate"></p>
                                            </div>
                                            <div class="_2g9N- overflow-hidden" v-else>
                                                <p class="fl">当前彩票暂停销售</p>
                                            </div>
                                        </div>
                                        <div class="_36MYR">
                                            <div style="min-height: 102px;">
                                                <p class="pv13">前三码不定位</p>
                                                <div class="pb15">
                                                    <span class="_31zSF" v-for="(item,index) in changeYardSyx5" :key="index" v-text="item"></span>
                                                </div>
                                            </div>
                                            <div class="f6 pb10">
                                                <button class="_2N-6F _3jnQW" type="button" @click="subtraction">
                                  <img src="/static_pc/images/subtract.svg" class="absolute center-margin"
                                    width="10" height="10">
                                </button>
                                                <input type="number" max="1000000" class="_3J8Dp" :value="bet">
                                                <button class="_2N-6F _3jnQW" type="button" @click="add">
                                  <img src="/static_pc/images/add.svg" class="absolute center-margin"
                                    width="10" height="10">
                                </button>
                                                <p class="dib v-mid ml10">倍, 共
                                                    <span class="_3hVrp ph3">{{result}}</span>元</p>
                                            </div>
                                        </div>
                                        <div class="tc mt10">
                                            <button class="_2N-6F _35qE8 mr20" type="button" @click="changeYard('syx5',3)">
                                <img src="/static_pc/images/29324fbdbf09da21e86803c26dbdf884.svg" class="mr10"
                                  width="21" height="20">
                                <span class="v-mid">换一注</span>
                              </button>
                                            <button class="_2N-6F _35qE8 _1o49v" type="button" @click="syx5bet">立即投注</button>
                                        </div>
                                    </div>
                                </TabPane>
                    </Tabs>
                    <!-- <quickbet :data="data"></quickbet> -->
                </div>
                <div class="col mt10" style="width: 245px; height: 130px;">
                    <div class="_1s-2H">
                        <h2 class="_2eDzo before-vertical">
                            <img class="mr10 ml11 w-auto" src="/static_pc/images/fb1bcc1cc1f088f826ed6565e574df16.png" height="20">
                            <span class="v-mid">手机客户端下载 扫一扫轻松中大奖</span>
                        </h2>
                        <div class="pt9 pl11 pr9">
                            <div class="N_I8z">
                                <div class="relative">
                                    <!-- <img src="/static_pc/images/app_icon_image_152030317020.png" class="absolute center-margin h-auto" width="24"> -->
                                    <vueQR :text="erweima" :margin="0" style="height: 80px; width: 80px;"></vueQR>
                                </div>
                            </div>
                            <div class="overflow-hidden">
                                <a class="_24jdT _3C7LT before-vertical" :href="and" target="_black">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAAXNSR0IArs4c6QAAANpJREFUKBWdkjsKwkAQhhMJapVGEDsLxXto4x0Uj+E1vIOdlTbewD5WCQhqI4iPQrDRQojf4M6SRAPqwMc/j3922RDHSUQcxx2oQBNa4EM3YXG8ZEHuwx6Kpv9AByZPCyf14AIT0JiTnKGfdlPRDNT1QQNd8Bi2KXawgFAHGb3ia9Cry8k3mMIW8uLEQDz3AltlQ+bQt1J8JVn4Kf5aGHPF7ItrxCPeV/CgZd6L6a/UZ5VmFYZmaYQKEtKrqdH+Gq7ryqeLzGCjBjRidtDaLpjGGj2KydSSS8/GE5lj1ZEZ7k7hAAAAAElFTkSuQmCC"
                                        alt="true">
                                    <span class="v-mid ml9">安卓版火热下载</span>
                                </a>
                                <a class="_24jdT _3qPyB before-vertical" :href="ios" target="_black">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAAXNSR0IArs4c6QAAALJJREFUKBWNj60KAkEURndki2Iy+TKLVbQbDIsPYPQZrAaTIL6C2dUkGNy6VUE0a9M6nm9B1jLcvXDg/py5MxNFgfDep7APjKs2Uh8U66obyJA2sIPOv9JQQbMHGTxgS+sON8ipLzCHWGICH7BiLFkbrVhxS/mEl2UyH8jVm2MlRrQ1l1wYosZTtjclH2rICU4meQnvGgeOpcMVM+OTBfOW+22kWJBP4Awn6MIQnjByzl2/DM7m4vs9fpMAAAAASUVORK5CYII="
                                        alt="true">
                                    <span class="v-mid ml9">iOS 版抢先下载</span>
                                </a>
                                <span class="_1FUk_" @click="$router.push('/mobilePurchase')">更多方式&gt;&gt;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col mt10" style="width: 245px; height: 125px;">
                    <Tabs class="UjiAo" :animated="false" @on-click="getAnnouncement">
                        <TabPane label="官方公告" name="Announcement">
                            <div>
                                <ul class="mt3">
                                    <li class="_1V_Yl ellipsis" v-for="(item,index) in announcement" :key="index" @click='toNotice(index)'>
                                        {{item.noticeTitle}}
                                    </li>
                                </ul>
                            </div>
                        </TabPane>
                        <TabPane label="新手指导">
                            <div>
                                <ul class="mt3">
                                    <li class="_1V_Yl ellipsis" @click="$router.push({name:'help',query:{title:`如何注册成为${$ENV.VUE_APP_NAME}会员？`,id:0}})">
                                        如何注册成为{{$ENV.VUE_APP_NAME}}会员？
                                    </li>
                                    <li class="_1V_Yl ellipsis" @click="$router.push({name:'help',query:{title:'忘记登录密码了怎么办？',id:1}})">
                                        忘记登录密码了怎么办？
                                    </li>
                                </ul>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <template v-if="tuiguangList.length>1">
                    <div class="col mv10 mr10" style="width: 495px; height: 120px;">
                        <div class="_3uw8R">
                            <img class="hOYU9 pointer" :src="$imgPath(tuiguangList[0].imgPath)">
                        </div>
                    </div>
                    <div class="col mv10" style="width: 495px; height: 120px;">
                        <div class="_3uw8R">
                            <img class="hOYU9 pointer" :src="$imgPath(tuiguangList[1].imgPath)">
                        </div>
                    </div>
                </template>
                <template v-else><h1 style="height: 10px;clear: both;"></h1></template>
                <div class="col w-100">
                    <div class="row">
                        <div class="col mr10" style="height: 490px; width: 240px;">
                            <div class="_12yR2">
                                <h2 class="_2AYqN before-vertical">
                                    <img class="_1Ho2U" src="/static_pc/images/f7636ef02f52e56efefc2b928de09f8c.svg">
                                    <span class="v-mid">中奖排行榜</span>
                                </h2>
                                <div class="_1aoTx">
                                    <div class="_13J6Y">
                                        <span class="_33Oib">排行</span>
                                        <span class="_33Oib">用户名</span>
                                        <span class="_33Oib">奖金</span>
                                    </div>
                                    <div class="relative overflow-hidden" style="height: 424px;">
                                        <div class="absolute left-0 w-100" style="top: -3px; bottom: 0px;">
                                            <vueSeamlessScroll v-if="DatagetRank.length>0" :data="DatagetRank" :class-option="ScrollOption">
                                                <div class="_oTNX" v-for="(item,index) in DatagetRank" :key="index">
                                                    <span class="wK2hb">
                                <i :class="[('_390eI'),{'_AT-Z':index<10}]">{{index+1}}</i>
                              </span>
                                                    <span class="wK2hb" v-text="item.name"></span>
                                                    <span class="wK2hb">{{item.amt}}</span>
                                                </div>
                                            </vueSeamlessScroll>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col mr10" style="width: 495px; height: 490px;">
                            <div class="row">
                                <div class="col w-100 mb10" style="height: 360px;">
                                    <div class="_1lql1">
                                        <h1 class="_3302f">热门新闻</h1>
                                        <div class="_1clcZ" id="new">
                                            <ul>
                                                <li class="mW6CN" v-for="(item,index) in newsContent" :key="index" @click="toNews(item)">
                                                    <time class="fr" v-if="index%6!=0">{{item.newsTime}}</time>
                                                    <p class="ellipsis pr10">{{item.newsTitle}}</p>
                                                </li>
                                            </ul>
                                            <!-- <span class="DZWfr">更多 &gt;&gt;</span> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="col w-100" style="height: 120px;">
                                    <div class="qGAr6">
                                        <h1 class="eNSVM">专家预测</h1>
                                        <div class="_3Qlzo">
                                            <ul>
                                                <li class="KtPE8" v-for="(item,index) in forecast" :key="index" @click="toNews(item)" v-if="index<4">
                                                    <time class="fr">{{item.newsTime}}</time>
                                                    <p class="ellipsis pr10">{{item.newsTitle}}</p>
                                                </li>
                                            </ul>
                                            <!-- <span class="uTb-g">更多 &gt;&gt;</span> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col" style="width: 245px; height: 490px;">
                            <div class="_2IE8j">
                                <Tabs :animated="false" @on-click="highFrequency">
                                    <TabPane label="高频开奖" name="freq">
                                        <ul class="_1iBh6">
                                            <li class="_2Nfjf" v-for="(item,index) in frequency" :key="index">
                                                <span>{{item.gameName}}</span>
                                                <time class="fr">
                              {{new Date(item.gameOpenDt).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.gameOpenDt).toTimeString().substr(0, 8)}}
                            </time>
                                                <p class="_2R9Mq">{{item.gameNumber}}</p>
                                                <div class="d225A">
                                                    <div class="_2GHx3">
                                                        <div class="vqO7q">
                                                            <div class="_3BSs9" :class="{'_3MXCq':item.gameType=='55','KDERw':item.gameType=='66','_31II3':item.gameType=='66'&&ball[sub-1].color=='red','DeDsp':item.gameType=='66'&&ball[sub-1].color=='green','_3fDrS':item.gameType=='66'&&ball[sub-1].color=='blue'}" v-for="(sub,num) in (item.gameOpenNo).split(',')" :key="num">
                                                                {{sub}}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tc">
                                                    <button class="_5tBsi _2WBNe mr8" @click="$router.push(`/bet/${item.gameType}/${item.gameNo}/${$ENV.IS_OFFICIAL?'official':'credit'}`)">投注</button>
                                                    <button class="_5tBsi _1NdqB" @click="onOpenQST(item.gameNo)">走势图</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </TabPane>
                                    <!-- <TabPane label="低频开奖" name="lows">
                                        <ul class="_1iBh6">
                                            <li class="_2Nfjf" v-for="(item,index) in lows" :key="index">
                                                <span>{{item.gameName}}</span>
                                                <time class="fr">
                              {{new Date(item.gameOpenDt).toLocaleDateString().replace(/\//g, "-") + " " + new Date(item.gameOpenDt).toTimeString().substr(0, 8)}}
                            </time>
                                                <p class="_2R9Mq">{{item.gameNumber}}</p>
                                                <div class="d225A">
                                                    <div class="_2GHx3">
                                                        <div class="vqO7q">
                                                            <div class="_3BSs9" v-for="(items,num) in (item.gameOpenNo).split(',')" :key="num">
                                                                {{items}}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tc">
                                                    <button class="_5tBsi _2WBNe mr8" @click="$router.push(`/bet/${item.gameType}/${item.gameNo}/official`)">投注</button>
                                                    <button class="_5tBsi _1NdqB" @click="onOpenQST(item.gameNo)">走势图</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </TabPane> -->
                                </Tabs>
                                <!-- <span class="_36Hs0 _3BttN" @click="$router.push('/openNum')">更多 &gt;&gt;</span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
    </div>
</template>

<script>
    import index from "./index.js";
    export default {
        ...index
    };
</script>

<style lang="less" scoped>
    @import "./index.less";
    ._1U-nD .swiper-slide img{
        width: 750px;
        height: 250px;
    }
</style>
