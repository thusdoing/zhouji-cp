import headerCop from '@/views/header/index.vue';
import footerCop from '@/views/footer/index.vue';
import leftFloat from '@/views/leftFloat/index.vue';
import rightFloat from '@/views/rightFloat/index.vue';
import countDownTime from '@/components/countDownTime/index.vue';
import { ball } from '@/views/betCtTimeHead/ball.js'
import { newslist } from './news'
import { cathectic } from './tuijiancaizhong'
import rank from './rank'
import axios from 'axios';
import vueSeamlessScroll from 'vue-seamless-scroll';
import vueQR from 'vue-qr';
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

// 是否已首屏通知
let isShowFirstScreenNotice = false;

export default {
    components: {
        headerCop,
        footerCop,
        swiper,
        swiperSlide,
        vueQR,
        vueSeamlessScroll,
        leftFloat,
        rightFloat,
        countDownTime,
    },
    data() {
        return {
            swiperOption: {
                loop: true,
                autoplay: {
                    delay: 3000, //5秒切换一次
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
            },
            bannerList: [],
            tuiguangList:[],
            getNoticeList: [],
            DatagetRank: [],
            changeYardSsc: [1, 2, 3, 4, 5],//换一注 时时彩
            changeYardFt: [1, 2, 3],//换一注 快3
            changeYardSyx5: ['05', '06', '07'],
            data: [{
                name: '分分快3',
                render: (h) => {
                    return h('div', {
                        slot: 'name-of-slot',
                    }, [
                            h('span', '标签一')
                        ])
                },
            },
            {
                name: '新疆时时彩'
            }
            ],
            url: 'http://www.lmflc.com/lmyl.html',
            bet: 1,
            magnification: 1,
            result: 1,
            newsContent: [],
            forecast: [],
            frequency: [],
            Fnumber: [],
            lows: [],
            nextOpen: 1,
            endTime: 0,
            wacther: Date.parse(new Date()),
            cathectic: [],
            stopDate: '',
            announcement: [],
            GameWinnersList: [],
            nextT: {},
            ball: ball,
        }
    },
    mounted() {

        this.changeYard('ssc', 5);
        this.changeYard('ft', 3);
        this.changeYard('syx5', 3);

        this.getAnnouncement("Announcement");

        let self = this;
        this.$ENV.NEWS_OPEN_STATUS && axios({ method: 'get', url: '/getNews', params:{pageSize:12} }).then(function(data){
         if (data.data.list && data.data.list.length) {
            localStorage.setItem('app.pc.newsList', JSON.stringify(data.data.list));
            self.newsContent = data.data.list
            self.forecast = data.data.map.ycNewsLst
         }
        });
        //首页推荐彩票
        // axios({
        //   method: 'get',
        //   url: '/getGameTypeAll',
        // }).then(function(data){
        //   self.cathectic = data.data.list.map((item)=>{
        //     return item.gameSetting[0]
        //   })
        //   self.reciprocalTime(self.cathectic[0].gameNo)
        // });
        self.cathectic = cathectic
        self.reciprocalTime(self.cathectic[0].gameNo)





        self.highFrequency("freq");
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        ImgRoot() {
            return this.$store.state.ImgRoot
        },
        ScrollOption() {
            return {
                step: 0.5,
                limitMoveNum: 2
            }
        },
        erweima:function(){
            return this.$store.state.homeUrlObj.dow||location.origin
        },
        and:function(){
            return this.$store.state.homeUrlObj.and
        },
        ios:function(){
            return this.$store.state.homeUrlObj.ios
        }
    },
    created() {
        // sessionStorage.setItem('interval','time')
        this.toShowFirstScreenNotice();
        this.getBannerConfig();
        this.getNotice();
        // this.getBetRank();
        // this.getGameWinners()
        let newsList = null;
        if (this.$ENV.NEWS_OPEN_STATUS && localStorage && localStorage.getItem('app.pc.newsList')) {
            try {
                newsList = JSON.parse(localStorage.getItem('app.pc.newsList'));
            } catch(e) {
                newsList = null;
            }
        }
        this.DatagetRank = rank
        this.newsContent = newsList || newslist.list
        this.forecast = newslist.map.ycNewsLst
    },
    methods: {
       // 首屏通知
      async toShowFirstScreenNotice() {
        if (isShowFirstScreenNotice) return -1;
        isShowFirstScreenNotice = true;
        const rsp = await this.$http({url: "/getNotice?type=notice", method: 'get'}).then(data => ({success: true, data}), (error) => ({success: false, error}));
        if (!rsp.success) return (isShowFirstScreenNotice = false);
        if (!(rsp.data && rsp.data.list && rsp.data.list.length > 0)) return (isShowFirstScreenNotice = false);
        const data = rsp.data.list[0];
        const title = data.noticeTitle;
        const content = data.noticeContent;
        this.$notice(title, content);
      },
        //换一注
        changeYard(play, num) {
            if (play == 'ft') { //快3
                this.changeYardFt = this.$asmd.createRandom(num, 1, 7);
            } else if (play == 'ssc') { //时时彩
                this.changeYardSsc = this.$asmd.createRandom(num, 0, 10);
            } else if (play == 'syx5') {
                this.changeYardSyx5 = this.$asmd.createRandom(num, 1, 12).map((item) => {
                    if (item >= 10) {
                        return item + ""
                    } else {
                        return "0" + item
                    }
                });
            }
        },
        // 查询首页中奖
        getGameWinners() {
            this.$http({
                method: 'get',
                url: '/game/getGameWinners?size=20',
            }).then((res) => {
                let data = res.data;
                if (data.success) {
                    this.GameWinnersList = data.list
                }
            });
        },

        //查询banner的log、和背景图配置
        getBannerConfig() {
            if (sessionStorage.banner) {
                this.bannerList = JSON.parse(sessionStorage.banner).filter((item) => {
                    if (item.imgType == '010402') {
                        return item
                    };
                });
                this.tuiguangList =JSON.parse(sessionStorage.banner).filter((item) => {
                    if (item.imgType == '010403') {
                        return item
                    };
                });
                return
            }
            this.$http({
                method: 'get',
                url: '/getBannerConfig',
            }).then((res) => {
                let data = res.data;
                if (data.success) {
                    sessionStorage.setItem('banner', JSON.stringify(data.list))
                    this.bannerList = data.list.filter((item) => {
                        if (item.imgType == '010402') {
                            return item
                        };
                    });
                    this.tuiguangList = data.list.filter((item) => {
                        if (item.imgType == '010403') {
                            return item
                        };
                    });
                }
            });
        },
        //查询当天以前的公告
        getNotice() {
            // this.$http({  method: 'get',  url: '/getNotice', })
            this.$store.dispatch("debounce/fetchNotice").then((res) => {
                let data = res.data;
                if (data.success) {
                    this.getNoticeList = data.list;
                    // this.getNoticeList =
                    //     ["1异步错误如何捕获, websocket, - CNode技术社区1异步错误如何捕获, websocket, - CNode技术社区1异步错误如何捕获, websocket, - CNode技术社区", "2异步错误如何捕获, websocket, - CNode技术社区", "3异步错误如何捕获, websocket, - CNode技术社区"]
                    //     .map(noticeContent => ({noticeContent}))
                    // console.log('222', this.getNoticeList);
                }
            });
        },
        //获取投注金额排行榜
        getBetRank() {
            this.$http({
                method: 'get',
                url: '/getBetRank',
            }).then((res) => {
                let data = res.data;
                if (data.length > 0) {
                    this.DatagetRank = data;
                }
            });
        },
        add: function () {
            this.bet = this.bet + 1
            this.result = this.bet * this.magnification
        },
        subtraction: function () {
            if (this.bet > 1) {
                this.bet = this.bet - 1
                this.result = this.bet * this.magnification
            }
        },
        toNews: function (item) {
            sessionStorage.setItem('newsId', item.newsId);
            sessionStorage.setItem('newsTitle', item.newsTitle);
            sessionStorage.setItem('newsobj', item.newDetail || '');
            this.$router.push({ name: 'news', params: { item: item }, query: {newsId: item.newsId, type: Boolean(item.newDetail || 'd') ? 1 : 0} });
        },
        highFrequency: function (name) {
            let self = this;
            if (name == "freq") {
                axios.get('/gameOpenNo/getGameLatestOpenNos', { params: { showHigh: "1" } }).then(function (data) {
                    self.frequency = data.data.list;
                });
            } else {
                axios.get('/gameOpenNo/getGameLatestOpenNos', { params: { gameType: '99' } }).then(function (data) {
                    self.lows = data.data.list;
                });
            }
        },
        endTimeFun: function () { },
        ffk3(name) {
            this.changeYard('ssc', 5);
            this.changeYard('ft', 3);
            this.changeYard('syx5', 3);
            this.reciprocalTime(name)
        },
        reciprocalTime: function (game) {
            if (!game) return;
            let self = this;
            self.bet = 1;
            self.magnification = 1;
            self.result = self.bet * self.magnification;
            axios.get(
                '/gameOpenNo/getGameNextOpenNo',
                { params: { gameNo: game } }
            ).then(function (data) {
                self.nextOpen = data.data.t ? data.data.t.gameNumber : "";
                self.nextT = data.data.t
                if (data.data.t == null) return
                self.lookTime(data.data.t.restTime, game);
            });
        },
        onOpenQST(no) {
            window.open('/static_pc/cpRecode/index.html?game=' + no + '030001')
        },
        sscOnBet() {
            this.$store.commit('setCurSel', {
                betTimes: this.bet,
                groupClassNo: '5500',
                groupNo: this.cathectic[1].gameNo + '55001122',
                codeAry: this.changeYardSsc
            })

            this.$router.push(`/bet/${this.cathectic[1].gameType}/${this.cathectic[1].gameNo}/official`)
        },
        syx5bet() {
            this.$store.commit('setCurSel', {
                betTimes: this.bet,
                groupClassNo: '1100',
                groupNo: this.cathectic[3].gameNo + '11001122',
                codeAry: this.changeYardSyx5
            })

            this.$router.push(`/bet/${this.cathectic[3].gameType}/${this.cathectic[3].gameNo}/official`)
        },
        jsks() {
            this.$store.commit('setCurSel', {
                betTimes: this.bet,
                groupClassNo: '2200',
                groupNo: this.cathectic[2].gameNo + '220011',
                codeAry: this.changeYardFt.reduce((x, y) => x + y, 0)
            })

            this.$router.push(`/bet/${this.cathectic[2].gameType}/${this.cathectic[2].gameNo}/official`)
        },
        onFTBet() {
            this.$store.commit('setCurSel', {
                betTimes: this.bet,
                groupClassNo: '2200',
                groupNo: this.cathectic[0].gameNo + '220011',
                codeAry: this.changeYardFt.reduce((x, y) => x + y, 0)
            })

            this.$router.push(`/bet/${this.cathectic[0].gameType}/${this.cathectic[0].gameNo}/official`)
        },
        lookTime: function (Rtime, Jname) {
            let self = this;
            window.clearInterval(sessionStorage.getItem('interval') || 0);
            self.endTime = Rtime;
            let inter = window.setInterval(() => {
                if (--self.endTime <= 0) {
                    window.clearInterval(sessionStorage.getItem('interval') || 0);
                    self.stopDate = "正在开奖";
                    // self.ffk3(Jname);
                } else {
                    let time = self.endTime;
                    let days = Math.floor(time / 1440 / 60);
                    let hours = Math.floor((time - days * 1440 * 60) / 3600);
                    let minutes = Math.floor((time - days * 1440 * 60 - hours * 3600) / 60);
                    let seconds = (time - days * 1440 * 60 - hours * 3600 - minutes * 60);
                    self.stopDate = "<span class='_3hVrp ph3'>" + days + "</span>日<span class='_3hVrp ph3'>"
                        + hours + "</span>时<span class='_3hVrp ph3'>" + minutes + "</span>分<span class='_3hVrp ph3'>" + seconds + "</span>秒";
                }
            }, 1000);
            sessionStorage.setItem('interval', inter)
        },
        getAnnouncement(uname) {
            let self = this;
            if (uname == "Announcement") {
                // axios({  method: 'get',  url: '/getNotice' })
                this.$store.dispatch("debounce/fetchNotice").then(function (data) {
                    self.announcement = data.data.list
                });
            }
        },
        toNotice(index) {
            sessionStorage.setItem('notice', index);
            this.$router.push('/notice');
        },
        gotobet(data) {
            let path = '/bet/' + data.gameType + '/' + data.gameNo
            this.$router.push(path)
        },

    },
    beforeDestroy() {

        window.clearInterval(sessionStorage.getItem('interval') || 0);


    },
}
